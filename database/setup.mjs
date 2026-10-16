#!/usr/bin/env node
/**
 * Creates the tables and seeds starter content.
 *   npm run db:setup     → create tables (safe to re-run) + seed if empty
 *   npm run db:seed      → seed only
 * Reads DATABASE_URL and SEED_ADMIN_* from .env (or the environment).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { categories, posts } from "./seed-content.mjs";
import { seoArticles } from "./article-pack.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");

for (const f of [".env.local", ".env"]) {
  const p = path.join(root, f);
  if (fs.existsSync(p)) try { process.loadEnvFile(p); } catch {}
}

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("✗ DATABASE_URL is not set. Copy .env.example to .env and fill it in.");
  process.exit(1);
}

const seedOnly = process.argv.includes("--seed-only");
const articlesOnly = process.argv.includes("--articles");
const conn = await mysql.createConnection({ uri: url, multipleStatements: true, timezone: "Z", charset: "utf8mb4" });
await conn.query("SET time_zone = '+00:00'");

const slugify = (s) =>
  s.toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const strip = (h) => h.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
const readingTime = (h) => Math.max(1, Math.ceil(strip(h).split(" ").length / 200));

try {
  if (!seedOnly && !articlesOnly) {
    const sql = fs.readFileSync(path.join(here, "schema.sql"), "utf8");
    await conn.query(sql);
    console.log("✓ Tables created / verified");
  }

  // ── Admin user ──
  const email = (process.env.SEED_ADMIN_EMAIL || "admin@example.com").toLowerCase();
  const password = process.env.SEED_ADMIN_PASSWORD || "ChangeMe!2026";
  const name = process.env.SEED_ADMIN_NAME || "Site Admin";
  const [[existingAdmin]] = await conn.query("SELECT id FROM users WHERE email = ?", [email]);
  let adminId = existingAdmin?.id;
  if (!adminId) {
    const hash = await bcrypt.hash(password, 12);
    const [r] = await conn.query(
      "INSERT INTO users (name, email, slug, password_hash, role, bio) VALUES (?, ?, ?, ?, 'ADMIN', ?)",
      [name, email, slugify(name) || "admin", hash, "The editorial team behind our pet care guides."],
    );
    adminId = r.insertId;
    console.log(`✓ Admin user created: ${email}`);
  } else {
    console.log(`• Admin user already exists: ${email}`);
  }

  // ── Categories ──
  for (const c of categories) {
    await conn.query(
      "INSERT IGNORE INTO categories (name, slug, description, sort_order) VALUES (?, ?, ?, ?)",
      [c.name, c.slug, c.description, c.sort],
    );
  }
  console.log(`✓ ${categories.length} categories ready`);

  // ── Articles: starter posts + SEO pack ──
  // First install: add everything. With --articles: add only pack articles whose slug isn't on the site yet.
  // Earlier versions shipped a placeholder draft on a slug the pack now uses; remove it only if untouched.
  await conn.query("DELETE FROM posts WHERE slug = 'how-often-should-you-bathe-your-dog' AND status = 'DRAFT' AND title = 'How Often Should You Bathe Your Dog? (Draft)'");
  const [[{ n }]] = await conn.query("SELECT COUNT(*) AS n FROM posts");
  const list = articlesOnly ? seoArticles : Number(n) === 0 ? [...posts, ...seoArticles] : [];
  if (!list.length) console.log("• Posts already exist — skipped articles (run `npm run db:articles` to add missing SEO articles)");
  const [cats] = await conn.query("SELECT id, slug FROM categories");
  const catId = Object.fromEntries(cats.map((c) => [c.slug, c.id]));
  let added = 0;
  for (const p of list) {
    const status = p.status || "PUBLISHED";
    const published = status === "PUBLISHED" ? new Date(Date.now() - p.daysAgo * 86400000) : null;
    const [r] = await conn.query(
      `INSERT IGNORE INTO posts (title, slug, excerpt, content, status, featured, reading_time, views, published_at, updated_at, created_at, author_id, category_id, meta_title, meta_description)
       VALUES (?, ?, ?, ?, ?, ?, ?, 0, ?, ?, ?, ?, ?, ?, ?)`,
      [p.title, p.slug, p.excerpt, p.content, status, p.featured ? 1 : 0, readingTime(p.content), published, published ?? new Date(), published ?? new Date(), adminId,
        catId[p.category] ?? null, p.metaTitle ?? null, p.metaDescription ?? p.excerpt],
    );
    if (!r.insertId) continue;
    added++;
    for (const t of p.tags || []) {
      await conn.query("INSERT IGNORE INTO tags (name, slug) VALUES (?, ?)", [t, slugify(t)]);
      await conn.query("INSERT IGNORE INTO post_tags (post_id, tag_id) SELECT ?, id FROM tags WHERE slug = ?", [r.insertId, slugify(t)]);
    }
  }
  if (list.length) console.log(`✓ ${added} articles added (${list.length - added} already existed)`);

  console.log("\nDone. Log in at /admin/login");
  if (!existingAdmin) console.log(`  Email: ${email}\n  Password: (the SEED_ADMIN_PASSWORD you set) — change it after first login.`);
} catch (e) {
  console.error("✗ Setup failed:", e.message);
  process.exitCode = 1;
} finally {
  await conn.end();
}
