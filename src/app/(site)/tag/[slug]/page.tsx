import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPosts, getTagBySlug } from "@/lib/queries";
import { ArchiveHeader } from "@/components/site/ArchiveHeader";
import { PostGrid } from "@/components/site/PostGrid";
import { Pagination } from "@/components/Pagination";

const PER_PAGE = 12;
type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ page?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = await getTagBySlug((await params).slug);
  if (!tag) return {};
  return { title: `${tag.name} guides`, alternates: { canonical: `/tag/${tag.slug}` }, robots: { index: false, follow: true } };
}

export default async function TagPage({ params, searchParams }: Props) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  const tag = await getTagBySlug(slug);
  if (!tag) notFound();
  const page = Math.max(1, Number(sp.page) || 1);
  const { posts, total } = await getPosts({ tagId: tag.id, page, perPage: PER_PAGE });
  return (
    <>
      <ArchiveHeader eyebrow="Tag" title={`Guides about ${tag.name.toLowerCase()}`} description={`${total} ${total === 1 ? "guide" : "guides"} tagged ${tag.name}.`} />
      <div className="container-x">
        <PostGrid posts={posts} />
        <Pagination page={page} totalPages={Math.ceil(total / PER_PAGE)} basePath={`/tag/${tag.slug}`} />
      </div>
    </>
  );
}
