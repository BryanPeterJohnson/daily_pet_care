import type { MetadataRoute } from "next";
import { getSitemapData } from "@/lib/queries";
import { siteUrl } from "@/lib/format";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { posts, categories, authors } = await getSitemapData();
  const now = new Date();
  const staticPages = ["", "/blog", "/about", "/contact", "/privacy-policy", "/terms", "/disclaimer"].map((p) => ({
    url: siteUrl(p || "/"), lastModified: now, changeFrequency: p === "" || p === "/blog" ? ("daily" as const) : ("yearly" as const), priority: p === "" ? 1 : 0.5,
  }));
  return [
    ...staticPages,
    ...categories.map((c) => ({ url: siteUrl(`/category/${c.slug}`), lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...posts.map((p) => ({ url: siteUrl(`/blog/${p.slug}`), lastModified: new Date(p.updated_at), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...authors.map((a) => ({ url: siteUrl(`/author/${a.slug}`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.3 })),
  ];
}
