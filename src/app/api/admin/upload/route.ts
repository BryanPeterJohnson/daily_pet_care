import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { execute } from "@/lib/db";
import { saveUpload } from "@/lib/uploads";

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ error: "Sign in again to upload." }, { status: 401 });
  try {
    const form = await req.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "Choose an image to upload." }, { status: 400 });
    const saved = await saveUpload(file);
    const alt = String(form.get("alt") || "").slice(0, 255) || null;
    const r = await execute("INSERT INTO media (url, filename, mime, size, alt, uploaded_by) VALUES (?, ?, ?, ?, ?, ?)", [
      saved.url, saved.filename, saved.mime, saved.size, alt, user.id,
    ]);
    return NextResponse.json({ id: r.insertId, url: saved.url });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message || "Upload failed." }, { status: 400 });
  }
}
