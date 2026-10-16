import { query, queryOne } from "./db";
import type { Category, PostCard, PostFull, Tag } from "./types";

/** Public-visible = published and publish date reached (future dates are scheduled). */
export const VISIBLE = "p.status = 'PUBLISHED' AND p.published_at IS NOT NULL AND p.published_at <= UTC_TIMESTAMP()";

const CARD_COLUMNS = `
  p.id, p.title, p.slug, p.excerpt, p.cover_image, p.cover_alt, p.published_at, p.reading_time, p.views, p.featured,
  c.name AS category_name, c.slug AS category_slug,
  u.name AS author_name, u.slug AS author_slug, u.avatar AS author_avatar`;

const CARD_FROM = `FROM posts p
  JOIN users u ON u.id = p.author_id
  LEFT JOIN categories c ON c.id = p.category_id`;

/** Never let a missing/unreachable DB crash a public page — log and render empty. */
async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (e) {
    console.error("[db]", (e as Error).message);
    return fallback;
  }
}

export interface PostFilter {
  page?: number;
  perPage?: number;
  categoryId?: number;
  tagId?: number;
  authorId?: number;
  q?: string;
  featured?: boolean;
  excludeIds?: number[];
  orderBy?: "recent" | "popular";
}

export async function getPosts(f: PostFilter = {}): Promise<{ posts: PostCard[]; total: number }> {
  return safe(async () => {
    const where: string[] = [VISIBLE];
    const params: unknown[] = [];
    let join = "";
    if (f.categoryId) { where.push("p.category_id = ?"); params.push(f.categoryId); }
    if (f.authorId) { where.push("p.author_id = ?"); params.push(f.authorId); }
    if (f.featured) where.push("p.featured = 1");
    if (f.tagId) { join = "JOIN post_tags pt ON pt.post_id = p.id AND pt.tag_id = ?"; params.unshift(f.tagId); }
    if (f.excludeIds?.length) { where.push(`p.id NOT IN (${f.excludeIds.map(() => "?").join(",")})`); params.push(...f.excludeIds); }
    if (f.q) {
      where.push("(p.title LIKE ? OR p.excerpt LIKE ? OR c.name LIKE ?)");
      const like = `%${f.q.replace(/[%_]/g, "")}%`;
      params.push(like, like, like);
    }
    const perPage = Math.min(f.perPage ?? 9, 50);
    const page = Math.max(1, f.page ?? 1);
    const order = f.orderBy === "popular" ? "p.views DESC, p.published_at DESC" : "p.published_at DESC";
    const whereSql = where.join(" AND ");
    const posts = await query<PostCard>(
      `SELECT ${CARD_COLUMNS} ${CARD_FROM} ${join} WHERE ${whereSql} ORDER BY ${order} LIMIT ? OFFSET ?`,
      [...params, perPage, (page - 1) * perPage],
    );
    const totalRow = await queryOne<{ n: number }>(`SELECT COUNT(*) AS n ${CARD_FROM} ${join} WHERE ${whereSql}`, params);
    return { posts, total: Number(totalRow?.n ?? 0) };
  }, { posts: [], total: 0 });
}

export async function getPostBySlug(slug: string): Promise<(PostFull & { tags: Tag[] }) | null> {
  return safe(async () => {
    const post = await queryOne<PostFull>(
      `SELECT ${CARD_COLUMNS}, p.content, p.meta_title, p.meta_description, p.updated_at, p.category_id, p.author_id, u.bio AS author_bio
       ${CARD_FROM} WHERE p.slug = ? AND ${VISIBLE}`,
      [slug],
    );
    if (!post) return null;
    const tags = await query<Tag>(
      "SELECT t.id, t.name, t.slug FROM tags t JOIN post_tags pt ON pt.tag_id = t.id WHERE pt.post_id = ? ORDER BY t.name",
      [post.id],
    );
    return { ...post, tags };
  }, null);
}

export async function getRelatedPosts(postId: number, categoryId: number | null, limit = 3): Promise<PostCard[]> {
  return safe(async () => {
    const rows = await query<PostCard>(
      `SELECT ${CARD_COLUMNS} ${CARD_FROM} WHERE ${VISIBLE} AND p.id <> ?
       ORDER BY (p.category_id <=> ?) DESC, p.published_at DESC LIMIT ?`,
      [postId, categoryId, limit],
    );
    return rows;
  }, []);
}

export async function getCategories(withCounts = true): Promise<Category[]> {
  return safe(async () => {
    if (!withCounts) return query<Category>("SELECT * FROM categories ORDER BY sort_order, name");
    return query<Category>(
      `SELECT c.*, (SELECT COUNT(*) FROM posts p WHERE p.category_id = c.id AND ${VISIBLE}) AS post_count
       FROM categories c ORDER BY c.sort_order, c.name`,
    );
  }, []);
}

/** One representative cover photo per category (featured, then most read), for topic tiles and banners. */
export async function getCategoryCovers(): Promise<Record<number, string>> {
  return safe(async () => {
    const rows = await query<{ category_id: number; cover_image: string }>(
      `SELECT p.category_id, p.cover_image FROM posts p
       WHERE ${VISIBLE} AND p.category_id IS NOT NULL AND p.cover_image IS NOT NULL AND p.cover_image <> ''
       ORDER BY p.featured DESC, p.views DESC, p.published_at DESC`,
    );
    const out: Record<number, string> = {};
    for (const r of rows) if (!(r.category_id in out)) out[r.category_id] = r.cover_image;
    return out;
  }, {});
}

export async function getCategoryBySlug(slug: string) {
  return safe(() => queryOne<Category>("SELECT * FROM categories WHERE slug = ?", [slug]), null);
}

export async function getTagBySlug(slug: string) {
  return safe(() => queryOne<Tag>("SELECT * FROM tags WHERE slug = ?", [slug]), null);
}

export async function getPopularTags(limit = 16) {
  return safe(
    () =>
      query<Tag & { n: number }>(
        `SELECT t.id, t.name, t.slug, COUNT(*) AS n FROM tags t
         JOIN post_tags pt ON pt.tag_id = t.id JOIN posts p ON p.id = pt.post_id
         WHERE ${VISIBLE} GROUP BY t.id ORDER BY n DESC, t.name LIMIT ?`,
        [limit],
      ),
    [],
  );
}

export async function getAuthorBySlug(slug: string) {
  return safe(
    () =>
      queryOne<{ id: number; name: string; slug: string; bio: string | null; avatar: string | null; role: string }>(
        "SELECT id, name, slug, bio, avatar, role FROM users WHERE slug = ? AND active = 1",
        [slug],
      ),
    null,
  );
}

export async function getSitemapData() {
  return safe(async () => {
    const posts = await query<{ slug: string; updated_at: Date }>(
      `SELECT p.slug, p.updated_at FROM posts p WHERE ${VISIBLE} ORDER BY p.published_at DESC`,
    );
    const categories = await query<{ slug: string }>("SELECT slug FROM categories");
    const authors = await query<{ slug: string }>(
      `SELECT DISTINCT u.slug FROM users u JOIN posts p ON p.author_id = u.id WHERE ${VISIBLE}`,
    );
    return { posts, categories, authors };
  }, { posts: [], categories: [], authors: [] });
}
