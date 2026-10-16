"use server";

import fs from "node:fs/promises";
import path from "node:path";
import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createSession } from "@/lib/auth";
import { slugify } from "@/lib/slug";
import { ARTICLE_PACK, STARTER_POSTS, ensureCategories, importArticles } from "@/lib/article-pack";
import { refreshSite } from "../_actions/common";
import { isInstalled } from "@/lib/install";

export type SetupState = { error?: string } | null;

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(120),
  email: z.string().trim().toLowerCase().email("Enter a valid email."),
  password: z.string().min(10, "Use at least 10 characters for the password."),
  confirm: z.string(),
  starter: z.string().optional(),
});

export async function runSetup(_prev: SetupState, formData: FormData): Promise<SetupState> {
  if (!process.env.DATABASE_URL) return { error: "DATABASE_URL isn't set. Add it in your hosting environment variables, redeploy, then reload this page." };
  if (!process.env.AUTH_SECRET || process.env.AUTH_SECRET.length < 32) return { error: "AUTH_SECRET is missing or shorter than 32 characters. Add it in your environment variables and redeploy." };
  const p = schema.safeParse(Object.fromEntries(formData));
  if (!p.success) return { error: p.error.issues[0]?.message };
  if (p.data.password !== p.data.confirm) return { error: "The passwords don't match." };

  let conn: mysql.Connection;
  try {
    conn = await mysql.createConnection({ uri: process.env.DATABASE_URL, multipleStatements: true, timezone: "Z", charset: "utf8mb4" });
  } catch (e) {
    return { error: `Couldn't connect to the database: ${(e as Error).message}. Check DATABASE_URL (host is usually localhost on Hostinger).` };
  }
  let adminId = 0;
  try {
    await conn.query("SET time_zone = '+00:00'");
    if (await isInstalled()) return { error: "Setup has already been completed. Sign in instead." };
    const sql = await fs.readFile(path.join(process.cwd(), "database", "schema.sql"), "utf8");
    await conn.query(sql);

    const hash = await bcrypt.hash(p.data.password, 12);
    const [r] = await conn.query(
      "INSERT INTO users (name, email, slug, password_hash, role, bio) VALUES (?, ?, ?, ?, 'ADMIN', ?)",
      [p.data.name, p.data.email, slugify(p.data.name), hash, "The editorial team behind our pet care guides."],
    );
    adminId = (r as { insertId: number }).insertId;

    await ensureCategories(conn);
    if (p.data.starter) await importArticles(conn, adminId, [...STARTER_POSTS, ...ARTICLE_PACK]);
  } catch (e) {
    return { error: `Setup failed: ${(e as Error).message}` };
  } finally {
    await conn.end();
  }
  await createSession(adminId, "ADMIN");
  refreshSite();
  redirect("/admin?welcome=1");
}
