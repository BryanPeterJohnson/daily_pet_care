"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { execute, query, queryOne, transaction } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { can } from "@/lib/permissions";
import { makeExcerpt, readingTime, sanitizePostHtml } from "@/lib/html";
import { slugify } from "@/lib/slug";
import { fail, isDuplicate, refreshSite, type ActionResult } from "./common";

const schema = z.object({
  id: z.coerce.number().int().optional(),
  title: z.string().trim().min(3, "Add a title (at least 3 characters).").max(255),
  slug: z.string().trim().max(180).optional(),
  excerpt: z.string().trim().max(500).optional(),
  content: z.string().max(2_000_000),
  coverImage: z.string().trim().max(500).optional(),
  coverAlt: z.string().trim().max(255).optional(),
  categoryId: z.coerce.number().int().optional(),
  tags: z.string().max(1000).optional(),
  featured: z.string().optional(),
  metaTitle: z.string().trim().max(255).optional(),
  metaDescription: z.string().trim().max(500).optional(),
  publishedAt: z.string().optional(),
  intent: z.enum(["draft", "publish", "submit", "unpublish"]),
});

export async function savePost(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const user = await requireUser();
  const raw = Object.fromEntries(formData);
  for (const k of Object.keys(raw)) if (raw[k] === "") delete raw[k];
  const parsed = schema.safeParse(raw);
  if (!parsed.success) return fail(parsed.error.issues[0]?.message || "Check the form and try again.");
  const d = parsed.data;

  let existing: { id: number; author_id: number; status: string; published_at: Date | null } | null = null;
  if (d.id) {
    existing = await queryOne("SELECT id, author_id, status, published_at FROM posts WHERE id = ?", [d.id]);
    if (!existing) return fail("This post no longer exists.");
    if (!can.editPost(user, existing.author_id)) return fail("You can only edit your own posts.");
    if (!can.publish(user) && existing.status === "PUBLISHED") return fail("This post is published. Ask an editor to make changes.");
  }

  // Status from intent + role. Authors can never publish directly.
  let status: "DRAFT" | "PENDING" | "PUBLISHED";
  if (d.intent === "publish") status = can.publish(user) ? "PUBLISHED" : "PENDING";
  else if (d.intent === "submit") status = "PENDING";
  else status = "DRAFT";

  const content = sanitizePostHtml(d.content || "");
  if (status !== "DRAFT" && content.replace(/<[^>]+>/g, "").trim().length < 50) {
    return fail("Write a bit more before publishing — the body is nearly empty.");
  }
  const slug = slugify(d.slug || d.title);
  let publishedAt: Date | null = existing?.published_at ?? null;
  if (d.publishedAt) {
    const dt = new Date(d.publishedAt);
    if (!Number.isNaN(dt.getTime())) publishedAt = dt;
  }
  if (status === "PUBLISHED" && !publishedAt) publishedAt = new Date();

  const values = {
    title: d.title,
    slug,
    excerpt: d.excerpt || makeExcerpt(content),
    content,
    cover_image: d.coverImage || null,
    cover_alt: d.coverAlt || null,
    status,
    featured: d.featured && can.publish(user) ? 1 : 0,
    meta_title: d.metaTitle || null,
    meta_description: d.metaDescription || null,
    reading_time: readingTime(content),
    published_at: publishedAt,
    category_id: d.categoryId || null,
  };

  const tagNames = Array.from(new Set((d.tags || "").split(",").map((t) => t.trim()).filter(Boolean))).slice(0, 15);

  let id = d.id;
  try {
    await transaction(async (conn) => {
      if (id) {
        await conn.query("UPDATE posts SET ? WHERE id = ?", [values, id]);
      } else {
        const [r] = await conn.query("INSERT INTO posts SET ?", [{ ...values, author_id: user.id }]);
        id = (r as { insertId: number }).insertId;
      }
      await conn.query("DELETE FROM post_tags WHERE post_id = ?", [id]);
      for (const name of tagNames) {
        const tslug = slugify(name);
        await conn.query("INSERT IGNORE INTO tags (name, slug) VALUES (?, ?)", [name.slice(0, 120), tslug]);
        await conn.query("INSERT IGNORE INTO post_tags (post_id, tag_id) SELECT ?, id FROM tags WHERE slug = ?", [id, tslug]);
      }
    });
  } catch (e) {
    if (isDuplicate(e)) return fail(`The URL slug “${slug}” is already used by another post. Change the slug.`);
    console.error(e);
    return fail("Couldn't save the post. Check the server logs.");
  }

  refreshSite();
  const scheduled = status === "PUBLISHED" && publishedAt && publishedAt.getTime() > Date.now();
  const message =
    status === "PUBLISHED" ? (scheduled ? "Scheduled." : existing?.status === "PUBLISHED" ? "Post updated." : "Published.")
    : status === "PENDING" ? "Submitted for review. An editor will publish it."
    : "Draft saved.";
  if (!d.id) redirect(`/admin/posts/${id}?saved=${encodeURIComponent(message)}`);
  return { ok: true, message, id };
}

export async function deletePost(formData: FormData) {
  const user = await requireUser();
  const id = Number(formData.get("id"));
  const post = await queryOne<{ author_id: number; status: string }>("SELECT author_id, status FROM posts WHERE id = ?", [id]);
  if (!post) return;
  if (!can.editAnyPost(user) && !(post.author_id === user.id && post.status !== "PUBLISHED")) return;
  await execute("DELETE FROM posts WHERE id = ?", [id]);
  refreshSite();
  redirect("/admin/posts?deleted=1");
}

export async function quickSetStatus(formData: FormData) {
  const user = await requireUser(["ADMIN", "EDITOR"]);
  const id = Number(formData.get("id"));
  const status = String(formData.get("status"));
  if (!["DRAFT", "PUBLISHED"].includes(status)) return;
  await execute(
    "UPDATE posts SET status = ?, published_at = IF(? = 'PUBLISHED' AND published_at IS NULL, UTC_TIMESTAMP(), published_at) WHERE id = ?",
    [status, status, id],
  );
  void user;
  refreshSite();
}

export async function searchTags(q: string) {
  await requireUser();
  return query<{ name: string }>("SELECT name FROM tags WHERE name LIKE ? ORDER BY name LIMIT 10", [`%${q.replace(/[%_]/g, "")}%`]);
}
