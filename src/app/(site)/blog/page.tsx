import type { Metadata } from "next";
import Link from "next/link";
import { Search } from "lucide-react";
import { getCategories, getPosts } from "@/lib/queries";
import { categoryIcon } from "@/components/CategoryIcon";
import { ArchiveHeader, EmptyState } from "@/components/site/ArchiveHeader";
import { PostGrid } from "@/components/site/PostGrid";
import { Pagination } from "@/components/Pagination";
import { NewsletterSection } from "@/components/site/NewsletterSection";

const PER_PAGE = 12;

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ q?: string; page?: string }> }): Promise<Metadata> {
  const { q, page } = await searchParams;
  if (q) return { title: `Search results for “${q}”`, robots: { index: false, follow: true } };
  return {
    title: page && page !== "1" ? `All pet care guides, page ${page}` : "All pet care guides",
    description: "Browse every guide on dog and cat care, pet health, grooming, nutrition, training and pet services.",
    alternates: { canonical: page && page !== "1" ? `/blog?page=${page}` : "/blog" },
  };
}

export default async function BlogIndex({ searchParams }: { searchParams: Promise<{ q?: string; page?: string }> }) {
  const sp = await searchParams;
  const q = (sp.q || "").trim().slice(0, 100);
  const page = Math.max(1, Number(sp.page) || 1);
  const [{ posts, total }, categories] = await Promise.all([getPosts({ q, page, perPage: PER_PAGE }), getCategories()]);
  const totalPages = Math.ceil(total / PER_PAGE);

  return (
    <>
      <ArchiveHeader
        eyebrow={q ? "Search" : "The Daily Pet Care library"}
        title={q ? `Results for “${q}”` : "All pet care guides"}
        description={q ? `${total} ${total === 1 ? "guide matches" : "guides match"} your search.` : "Practical advice for every stage of life with your dog or cat, plus how to find and vet the services you rely on."}
      />
      <div className="container-x">
        <form action="/blog" className="relative max-w-xl">
          <label htmlFor="blog-search" className="sr-only">Search guides</label>
          <Search size={18} className="absolute top-1/2 left-4 -translate-y-1/2 text-muted" />
          <input id="blog-search" name="q" defaultValue={q} placeholder="Search guides" className="input h-13 rounded-full border-transparent pl-11 text-base shadow-card" />
        </form>
        <ul className="mt-6 flex flex-wrap gap-2">
          {categories.map((c) => (
            <li key={c.id}>{(() => { const Icon = categoryIcon(c.slug); return <Link href={`/category/${c.slug}`} className="chip"><Icon size={15} className="text-collar" />{c.name}</Link>; })()}</li>
          ))}
        </ul>
        <div className="mt-10 sm:mt-12">
          {posts.length ? (
            <PostGrid posts={posts} />
          ) : (
            <EmptyState
              title={q ? "No guides match that search" : "No guides yet"}
              text={q ? "Try a broader word like “dog”, “cat”, “grooming” or “vaccines”." : "Published posts will appear here."}
              action={q ? <Link href="/blog" className="btn btn-ink">Clear search</Link> : undefined}
            />
          )}
          <Pagination page={page} totalPages={totalPages} basePath="/blog" query={{ q: q || undefined }} />
        </div>
      </div>
      <NewsletterSection source="blog" />
    </>
  );
}
