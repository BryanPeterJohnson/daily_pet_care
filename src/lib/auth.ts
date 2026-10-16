import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { queryOne } from "./db";
import type { Role, SessionUser } from "./types";

export const SESSION_COOKIE = "dpc_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function secretKey() {
  const s = process.env.AUTH_SECRET;
  if (!s || s.length < 32) throw new Error("AUTH_SECRET must be set (32+ characters).");
  return new TextEncoder().encode(s);
}

export async function signSession(userId: number, role: Role) {
  return new SignJWT({ role })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(userId))
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE}s`)
    .sign(secretKey());
}

export async function verifySessionToken(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return { userId: Number(payload.sub), role: payload.role as Role };
  } catch {
    return null;
  }
}

export async function createSession(userId: number, role: Role) {
  const token = await signSession(userId, role);
  const jar = await cookies();
  jar.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
}

/** Current logged-in user (re-checked against the DB so disabled users lose access immediately). */
export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const jar = await cookies();
  const session = await verifySessionToken(jar.get(SESSION_COOKIE)?.value);
  if (!session) return null;
  const user = await queryOne<SessionUser & { active: number }>(
    "SELECT id, name, email, role, avatar, slug, active FROM users WHERE id = ?",
    [session.userId],
  );
  if (!user || !user.active) return null;
  return { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar, slug: user.slug };
});

/** Use at the top of admin pages / server actions. */
export async function requireUser(roles?: Role[]): Promise<SessionUser> {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/login");
  if (roles && !roles.includes(user.role)) redirect("/admin?denied=1");
  return user;
}
