"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { z } from "zod";
import { execute, queryOne } from "@/lib/db";
import { createSession, destroySession } from "@/lib/auth";
import { rateLimit } from "@/lib/rate-limit";
import { clientIp } from "@/lib/request";
import type { Role } from "@/lib/types";

export type LoginState = { error?: string } | null;

const schema = z.object({ email: z.string().trim().toLowerCase().email(), password: z.string().min(1) });

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = schema.safeParse({ email: formData.get("email"), password: formData.get("password") });
  if (!parsed.success) return { error: "Enter your email and password." };
  const ip = await clientIp();
  if (!rateLimit(`login:${ip}`, 8, 15 * 60_000) || !rateLimit(`login:${parsed.data.email}`, 8, 15 * 60_000)) {
    return { error: "Too many sign-in attempts. Wait 15 minutes and try again." };
  }
  const user = await queryOne<{ id: number; password_hash: string; role: Role; active: number }>(
    "SELECT id, password_hash, role, active FROM users WHERE email = ?",
    [parsed.data.email],
  );
  // Compare against a dummy hash when the user doesn't exist so timing doesn't leak which emails are registered.
  const hash = user?.password_hash ?? "$2b$12$4PcffjFjwksd.gGbrpJWDONIMuR2j4wUig4NF0K3JFZJEcV2MwiSS";
  const ok = await bcrypt.compare(parsed.data.password, hash);
  if (!user || !ok) return { error: "That email and password don't match an account." };
  if (!user.active) return { error: "This account is disabled. Ask an admin to re-enable it." };
  await execute("UPDATE users SET last_login_at = UTC_TIMESTAMP() WHERE id = ?", [user.id]);
  await createSession(user.id, user.role);
  const next = String(formData.get("next") || "");
  redirect(next.startsWith("/admin") && !next.startsWith("//") ? next : "/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}
