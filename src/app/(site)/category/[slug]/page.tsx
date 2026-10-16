import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getCategoryBySlug, getCategoryCovers, getPosts } from "@/lib/queries";
import { ArchiveHeader, EmptyState } from "@/components/site/ArchiveHeader";
import { PostGrid } from "@/components/site/PostGrid";
import { Pagination } from "@/components/Pagination";
import { categoryIcon } from "@/components/CategoryIcon";
import { NewsletterSection } from "@/components/site/NewsletterSection";

const PER_PAGE = 12;
type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ page?: string }> };

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const [{ slug }, { page }] = await Promise.all([params, searchParams]);
  const cat = await getCategoryBySlug(slug);
  if (!cat) return {};
  return {
    title: page && page !== "1" ? `${cat.name} guides, page ${page}` : `${cat.name} guides and tips`,
    description: cat.description || `Expert ${cat.name.toLowerCase()} advice for pet parents.`,
    alternates: { canonical: `/category/${cat.slug}` },
    openGraph: cat.image ? { images: [cat.image] } : undefined,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  const cat = await getCategoryBySlug(slug);
  if (!cat) notFound();
  const page = Math.max(1, Number(sp.page) || 1);
  const [{ posts, total }, covers] = await Promise.all([getPosts({ categoryId: cat.id, page, perPage: PER_PAGE }), getCategoryCovers()]);
  const Icon = categoryIcon(cat.slug);

  return (
    <>
      <ArchiveHeader eyebrow="Pet care topic" title={cat.name} description={cat.description} image={cat.image || covers[cat.id]}>
        <span className="inline-flex items-center gap-2 rounded-full bg-ball px-4 py-2 text-sm font-extrabold text-ink"><Icon size={16} />{total} {total === 1 ? "guide" : "guides"}</span>
      </ArchiveHeader>
      <div className="container-x">
        {posts.length ? <PostGrid posts={posts} /> : (
          <EmptyState title="No guides in this topic yet" text="Check back soon, or browse everything we've published." action={<Link href="/blog" className="btn btn-ink">Browse all guides</Link>} />
        )}
        <Pagination page={page} totalPages={Math.ceil(total / PER_PAGE)} basePath={`/category/${cat.slug}`} />
      </div>
      <NewsletterSection source={`category:${cat.slug}`} />
    </>
  );
}
