import { NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth";
import { query } from "@/lib/db";

export async function GET(req: Request) {
  if (!(await getCurrentUser())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const page = Math.max(1, Number(new URL(req.url).searchParams.get("page")) || 1);
  const items = await query<{ id: number; url: string; alt: string | null; filename: string }>(
    "SELECT id, url, alt, filename FROM media ORDER BY created_at DESC LIMIT 40 OFFSET ?",
    [(page - 1) * 40],
  );
  return NextResponse.json({ items });
}
