"use server";

import { z } from "zod";
import { execute } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";
import { clientIp } from "@/lib/request";

export type FormState = { ok: boolean; message: string } | null;

const emailSchema = z.string().trim().toLowerCase().email().max(191);

export async function subscribe(_prev: FormState, formData: FormData): Promise<FormState> {
  if (formData.get("website")) return { ok: true, message: "You're subscribed." }; // honeypot
  const parsed = emailSchema.safeParse(formData.get("email"));
  if (!parsed.success) return { ok: false, message: "Enter a valid email address." };
  if (!rateLimit(`sub:${await clientIp()}`, 5, 60_000)) return { ok: false, message: "Too many attempts. Try again in a minute." };
  try {
    await execute(
      "INSERT INTO subscribers (email, source) VALUES (?, ?) ON DUPLICATE KEY UPDATE active = 1",
      [parsed.data, String(formData.get("source") || "site").slice(0, 100)],
    );
    return { ok: true, message: "You're subscribed. Watch your inbox for the next digest." };
  } catch (e) {
    console.error(e);
    return { ok: false, message: "We couldn't save your email right now. Please try again later." };
  }
}

const contactSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(120),
  email: emailSchema,
  subject: z.string().trim().max(255).optional(),
  message: z.string().trim().min(10, "Your message needs at least 10 characters.").max(5000),
});

export async function sendContact(_prev: FormState, formData: FormData): Promise<FormState> {
  if (formData.get("website")) return { ok: true, message: "Message sent." };
  const parsed = contactSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, message: parsed.error.issues[0]?.message || "Check the form and try again." };
  if (!rateLimit(`contact:${await clientIp()}`, 3, 10 * 60_000)) {
    return { ok: false, message: "You've sent several messages recently. Try again in a few minutes." };
  }
  const { name, email, subject, message } = parsed.data;
  try {
    await execute("INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)", [name, email, subject || null, message]);
    return { ok: true, message: "Message sent. We usually reply within two business days." };
  } catch (e) {
    console.error(e);
    return { ok: false, message: "We couldn't send your message right now. Please email us instead." };
  }
}
