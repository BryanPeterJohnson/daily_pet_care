import path from "node:path";
import fs from "node:fs/promises";
import crypto from "node:crypto";

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024; // 5 MB

export const MIME_EXT: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

export function uploadRoot(): string {
  return path.resolve(process.cwd(), process.env.UPLOAD_DIR || "uploads");
}

/** Checks magic bytes so a renamed file can't pretend to be an image. */
function sniff(buf: Buffer): string | null {
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "image/jpeg";
  if (buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "image/png";
  if (buf.subarray(0, 4).toString("ascii") === "RIFF" && buf.subarray(8, 12).toString("ascii") === "WEBP") return "image/webp";
  if (buf.subarray(0, 3).toString("ascii") === "GIF") return "image/gif";
  if (buf.subarray(4, 12).toString("ascii").startsWith("ftypavi")) return "image/avif";
  return null;
}

export async function saveUpload(file: File): Promise<{ url: string; filename: string; mime: string; size: number }> {
  if (file.size > MAX_UPLOAD_BYTES) throw new Error("Image is larger than 5 MB. Resize it and try again.");
  const buf = Buffer.from(await file.arrayBuffer());
  const mime = sniff(buf);
  if (!mime || !MIME_EXT[mime]) throw new Error("Upload a JPG, PNG, WebP, GIF or AVIF image.");
  const now = new Date();
  const sub = path.join(String(now.getUTCFullYear()), String(now.getUTCMonth() + 1).padStart(2, "0"));
  const base = file.name.replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 60) || "image";
  const filename = `${base}-${crypto.randomBytes(4).toString("hex")}.${MIME_EXT[mime]}`;
  const dir = path.join(uploadRoot(), sub);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(path.join(dir, filename), buf);
  return { url: `/uploads/${sub.split(path.sep).join("/")}/${filename}`, filename, mime, size: buf.length };
}

export async function deleteUploadFile(url: string) {
  if (!url.startsWith("/uploads/")) return;
  const full = path.resolve(uploadRoot(), url.slice("/uploads/".length));
  if (!full.startsWith(uploadRoot() + path.sep)) return;
  await fs.unlink(full).catch(() => {});
}
