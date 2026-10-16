"use server";

import { z } from "zod";
import { execute, queryOne } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { slugify } from "@/lib/slug";
import { deleteUploadFile } from "@/lib/uploads";
import { fail, isDuplicate, refreshSite, type ActionResult } from "./common";

/* ── Categories ─────────────────────────────────────────── */

const catSchema = z.object({
  id: z.coerce.number().int().optional(),
  name: z.string().trim().min(2, "Name needs at least 2 characters.").max(120),
  slug: z.string().trim().max(180).optional(),
  description: z.string().trim().max(1000).optional(),
  image: z.string().trim().max(500).optional(),
  sortOrder: z.coerce.number().int().min(0).max(9999).optional(),
});

export async function saveCategory(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireUser(["ADMIN", "EDITOR"]);
  const raw = Object.fromEntries(formData);
  for (const k of Object.keys(raw)) if (raw[k] === "") delete raw[k];
  const p = catSchema.safeParse(raw);
  if (!p.success) return fail(p.error.issues[0]?.message || "Check the form.");
  const d = p.data;
  const row = { name: d.name, slug: slugify(d.slug || d.name), description: d.description || null, image: d.image || null, sort_order: d.sortOrder ?? 0 };
  try {
    if (d.id) await execute("UPDATE categories SET ? WHERE id = ?", [row, d.id]);
    else await execute("INSERT INTO categories SET ?", [row]);
  } catch (e) {
    if (isDuplicate(e)) return fail(`A category with the slug “${row.slug}” already exists.`);
    throw e;
  }
  refreshSite();
  return { ok: true, message: d.id ? "Category updated." : "Category added." };
}

export async function deleteCategory(formData: FormData) {
  await requireUser(["ADMIN", "EDITOR"]);
  await execute("DELETE FROM categories WHERE id = ?", [Number(formData.get("id"))]);
  refreshSite();
}

/* ── Media ──────────────────────────────────────────────── */

export async function deleteMedia(formData: FormData) {
  await requireUser(["ADMIN", "EDITOR"]);
  const id = Number(formData.get("id"));
  const m = await queryOne<{ url: string }>("SELECT url FROM media WHERE id = ?", [id]);
  if (!m) return;
  await execute("DELETE FROM media WHERE id = ?", [id]);
  await deleteUploadFile(m.url);
}

export async function updateMediaAlt(formData: FormData) {
  await requireUser();
  await execute("UPDATE media SET alt = ? WHERE id = ?", [String(formData.get("alt") || "").slice(0, 255), Number(formData.get("id"))]);
}

/* ── Subscribers & messages ─────────────────────────────── */

export async function toggleSubscriber(formData: FormData) {
  await requireUser(["ADMIN", "EDITOR"]);
  await execute("UPDATE subscribers SET active = 1 - active WHERE id = ?", [Number(formData.get("id"))]);
}

export async function deleteSubscriber(formData: FormData) {
  await requireUser(["ADMIN", "EDITOR"]);
  await execute("DELETE FROM subscribers WHERE id = ?", [Number(formData.get("id"))]);
}

export async function addSubscriber(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireUser(["ADMIN", "EDITOR"]);
  const email = z.string().trim().toLowerCase().email().safeParse(formData.get("email"));
  if (!email.success) return fail("Enter a valid email address.");
  await execute("INSERT INTO subscribers (email, source) VALUES (?, 'admin') ON DUPLICATE KEY UPDATE active = 1", [email.data]);
  return { ok: true, message: "Subscriber added." };
}

export async function setMessageRead(formData: FormData) {
  await requireUser(["ADMIN", "EDITOR"]);
  await execute("UPDATE contact_messages SET is_read = ? WHERE id = ?", [formData.get("read") === "1" ? 1 : 0, Number(formData.get("id"))]);
}

export async function deleteMessage(formData: FormData) {
  await requireUser(["ADMIN", "EDITOR"]);
  await execute("DELETE FROM contact_messages WHERE id = ?", [Number(formData.get("id"))]);
}
