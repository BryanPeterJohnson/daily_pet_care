import { execute } from "@/lib/db";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    const { slug } = (await req.json()) as { slug?: string };
    if (!slug || typeof slug !== "string" || slug.length > 191) return new Response(null, { status: 400 });
    const ip = (req.headers.get("x-forwarded-for") || "local").split(",")[0].trim();
    if (rateLimit(`view:${ip}:${slug}`, 1, 30 * 60_000)) {
      await execute("UPDATE posts SET views = views + 1, updated_at = updated_at WHERE slug = ? AND status = 'PUBLISHED'", [slug]);
    }
    return new Response(null, { status: 204 });
  } catch {
    return new Response(null, { status: 204 });
  }
}
