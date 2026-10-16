import type { Connection, Pool, PoolConnection } from "mysql2/promise";
import { slugify } from "./slug";
import { readingTime } from "./html";
import { categories, posts as starterPosts } from "../../database/seed-content.mjs";
import { seoArticles } from "../../database/article-pack.mjs";

type Db = Pool | PoolConnection | Connection;
type Article = (typeof seoArticles)[number];

export const ARTICLE_PACK = seoArticles;
export const STARTER_POSTS = starterPosts;

async function rows<T>(db: Db, sql: string, params: unknown[] = []): Promise<T[]> {
  const [r] = await db.query(sql, params);
  return r as T[];
}

/** Ensures the default categories exist (never overwrites edits). */
export async function ensureCategories(db: Db) {
  for (const c of categories) {
    await db.query("INSERT IGNORE INTO categories (name, slug, description, sort_order) VALUES (?, ?, ?, ?)", [c.name, c.slug, c.description, c.sort]);
  }
}

const PLACEHOLDER_WHERE =
  "slug = 'how-often-should-you-bathe-your-dog' AND status = 'DRAFT' AND title = 'How Often Should You Bathe Your Dog? (Draft)'";

/** Earlier versions shipped a placeholder draft on a slug the pack now uses. Remove it only if still untouched. */
async function removeOldPlaceholder(db: Db) {
  await db.query(`DELETE FROM posts WHERE ${PLACEHOLDER_WHERE}`);
}

/** Slugs from the pack that aren't on the site yet. */
export async function missingSlugs(db: Db, list: Article[] = seoArticles): Promise<string[]> {
  const existing = new Set(
    (await rows<{ slug: string }>(db, `SELECT slug FROM posts WHERE NOT (${PLACEHOLDER_WHERE})`)).map((r) => r.slug),
  );
  return list.filter((a) => !existing.has(a.slug)).map((a) => a.slug);
}

/**
 * Inserts articles whose slug doesn't exist yet. Safe to run repeatedly:
 * posts you already have (or edited) are never touched.
 */
export async function importArticles(db: Db, authorId: number, list: Article[]): Promise<{ added: number; skipped: number }> {
  await ensureCategories(db);
  await removeOldPlaceholder(db);
  const catId = Object.fromEntries((await rows<{ id: number; slug: string }>(db, "SELECT id, slug FROM categories")).map((c) => [c.slug, c.id]));
  const missing = new Set(await missingSlugs(db, list));
  let added = 0;
  for (const a of list) {
    if (!missing.has(a.slug)) continue;
    const status = a.status || "PUBLISHED";
    const publishedAt = status === "PUBLISHED" ? new Date(Date.now() - a.daysAgo * 86400000) : null;
    const [r] = await db.query(
      `INSERT IGNORE INTO posts (title, slug, excerpt, content, status, featured, reading_time, published_at, updated_at, created_at, author_id, category_id, meta_title, meta_description)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [a.title, a.slug, a.excerpt, a.content, status, a.featured ? 1 : 0, readingTime(a.content), publishedAt, publishedAt ?? new Date(), publishedAt ?? new Date(), authorId,
        catId[a.category] ?? null, a.metaTitle ?? null, a.metaDescription ?? a.excerpt],
    );
    const postId = (r as { insertId: number }).insertId;
    if (!postId) continue;
    added++;
    for (const t of a.tags || []) {
      await db.query("INSERT IGNORE INTO tags (name, slug) VALUES (?, ?)", [t, slugify(t)]);
      await db.query("INSERT IGNORE INTO post_tags (post_id, tag_id) SELECT ?, id FROM tags WHERE slug = ?", [postId, slugify(t)]);
    }
  }
  return { added, skipped: list.length - added };
}
