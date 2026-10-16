import { getPosts } from "@/lib/queries";
import { getSettings } from "@/lib/settings";
import { siteUrl } from "@/lib/format";

export const revalidate = 1800;

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  const [{ posts }, s] = await Promise.all([getPosts({ perPage: 30 }), getSettings()]);
  const items = posts.map((p) => `
    <item>
      <title>${esc(p.title)}</title>
      <link>${siteUrl(`/blog/${p.slug}`)}</link>
      <guid isPermaLink="true">${siteUrl(`/blog/${p.slug}`)}</guid>
      <pubDate>${new Date(p.published_at).toUTCString()}</pubDate>
      ${p.category_name ? `<category>${esc(p.category_name)}</category>` : ""}
      <description>${esc(p.excerpt || "")}</description>
    </item>`).join("");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(s.site_name)}</title>
    <link>${siteUrl("/")}</link>
    <description>${esc(s.site_description)}</description>
    <language>en-us</language>
    <atom:link href="${siteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />${items}
  </channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
