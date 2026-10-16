import path from "node:path";
import fs from "node:fs/promises";
import { MIME_EXT, uploadRoot } from "@/lib/uploads";

const EXT_MIME = Object.fromEntries(Object.entries(MIME_EXT).map(([m, e]) => [e, m]));

export async function GET(_req: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const parts = (await params).path;
  const root = uploadRoot();
  const full = path.resolve(root, ...parts);
  if (!full.startsWith(root + path.sep)) return new Response("Not found", { status: 404 });
  const mime = EXT_MIME[path.extname(full).slice(1).toLowerCase()];
  if (!mime) return new Response("Not found", { status: 404 });
  try {
    const data = await fs.readFile(full);
    return new Response(new Uint8Array(data), {
      headers: {
        "Content-Type": mime,
        "Cache-Control": "public, max-age=31536000, immutable",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch {
    return new Response("Not found", { status: 404 });
  }
}
