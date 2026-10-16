"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";
import { execute, queryOne } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { slugify } from "@/lib/slug";
import { DEFAULT_SETTINGS } from "@/lib/settings";
import { fail, isDuplicate, refreshSite, type ActionResult } from "./common";

const password = z.string().min(10, "Passwords need at least 10 characters.").max(200);

const userSchema = z.object({
  id: z.coerce.number().int().optional(),
  name: z.string().trim().min(2, "Enter a name.").max(120),
  email: z.string().trim().toLowerCase().email("Enter a valid email."),
  role: z.enum(["ADMIN", "EDITOR", "AUTHOR"]),
  bio: z.string().trim().max(1000).optional(),
  avatar: z.string().trim().max(500).optional(),
  active: z.string().optional(),
  password: password.optional(),
});

export async function saveUser(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const me = await requireUser(["ADMIN"]);
  const raw = Object.fromEntries(formData);
  for (const k of Object.keys(raw)) if (raw[k] === "") delete raw[k];
  const p = userSchema.safeParse(raw);
  if (!p.success) return fail(p.error.issues[0]?.message || "Check the form.");
  const d = p.data;
  if (!d.id && !d.password) return fail("Set a password for the new user.");
  if (d.id === me.id && (d.role !== "ADMIN" || !d.active)) return fail("You can't remove your own admin access or disable your own account.");

  const row: Record<string, unknown> = {
    name: d.name, email: d.email, role: d.role, bio: d.bio || null, avatar: d.avatar || null, active: d.active ? 1 : 0,
  };
  if (d.password) row.password_hash = await bcrypt.hash(d.password, 12);

  try {
    if (d.id) {
      await execute("UPDATE users SET ? WHERE id = ?", [row, d.id]);
    } else {
      let slug = slugify(d.name);
      if (await queryOne("SELECT id FROM users WHERE slug = ?", [slug])) slug = `${slug}-${Date.now().toString(36).slice(-4)}`;
      const r = await execute("INSERT INTO users SET ?", [{ ...row, slug }]);
      refreshSite();
      redirect(`/admin/users/${r.insertId}?saved=1`);
    }
  } catch (e) {
    if (isDuplicate(e)) return fail("Another user already has that email address.");
    throw e;
  }
  refreshSite();
  return { ok: true, message: "User updated." };
}

export async function deleteUser(formData: FormData) {
  const me = await requireUser(["ADMIN"]);
  const id = Number(formData.get("id"));
  if (id === me.id) return;
  // Reassign their posts to the admin performing the delete so nothing is lost.
  await execute("UPDATE posts SET author_id = ? WHERE author_id = ?", [me.id, id]);
  await execute("DELETE FROM users WHERE id = ?", [id]);
  refreshSite();
  redirect("/admin/users");
}

const profileSchema = z.object({
  name: z.string().trim().min(2).max(120),
  bio: z.string().trim().max(1000).optional(),
  avatar: z.string().trim().max(500).optional(),
});

export async function saveProfile(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const me = await requireUser();
  const raw = Object.fromEntries(formData);
  for (const k of Object.keys(raw)) if (raw[k] === "") delete raw[k];
  const p = profileSchema.safeParse(raw);
  if (!p.success) return fail("Enter your name (at least 2 characters).");
  await execute("UPDATE users SET name = ?, bio = ?, avatar = ? WHERE id = ?", [p.data.name, p.data.bio || null, p.data.avatar || null, me.id]);
  refreshSite();
  return { ok: true, message: "Profile saved." };
}

export async function changePassword(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const me = await requireUser();
  const current = String(formData.get("current") || "");
  const next = password.safeParse(formData.get("next"));
  if (!next.success) return fail(next.error.issues[0].message);
  if (next.data !== formData.get("confirm")) return fail("The new passwords don't match.");
  const row = await queryOne<{ password_hash: string }>("SELECT password_hash FROM users WHERE id = ?", [me.id]);
  if (!row || !(await bcrypt.compare(current, row.password_hash))) return fail("Your current password is incorrect.");
  await execute("UPDATE users SET password_hash = ? WHERE id = ?", [await bcrypt.hash(next.data, 12), me.id]);
  return { ok: true, message: "Password changed." };
}

export async function saveSettings(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  await requireUser(["ADMIN"]);
  const keys = Object.keys(DEFAULT_SETTINGS);
  for (const key of keys) {
    if (!formData.has(key)) continue;
    const value = String(formData.get(key) ?? "").trim().slice(0, 5000);
    await execute("INSERT INTO settings (`key`, `value`) VALUES (?, ?) ON DUPLICATE KEY UPDATE `value` = VALUES(`value`)", [key, value]);
  }
  refreshSite();
  return { ok: true, message: "Settings saved." };
}
