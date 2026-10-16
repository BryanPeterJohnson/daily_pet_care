import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAuthorBySlug, getPosts } from "@/lib/queries";
import { PostGrid } from "@/components/site/PostGrid";
import { Pagination } from "@/components/Pagination";
import { Avatar } from "@/components/Avatar";

const PER_PAGE = 12;
type Props = { params: Promise<{ slug: string }>; searchParams: Promise<{ page?: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const a = await getAuthorBySlug((await params).slug);
  if (!a) return {};
  return { title: `${a.name}, author`, description: a.bio || undefined, alternates: { canonical: `/author/${a.slug}` } };
}

export default async function AuthorPage({ params, searchParams }: Props) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  const author = await getAuthorBySlug(slug);
  if (!author) notFound();
  const page = Math.max(1, Number(sp.page) || 1);
  const { posts, total } = await getPosts({ authorId: author.id, page, perPage: PER_PAGE });
  return (
    <>
      <header className="container-x pt-8 pb-10 md:pt-12 md:pb-12">
        <div className="card flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:p-10">
          <Avatar name={author.name} src={author.avatar} size={104} />
          <div>
            <p className="eyebrow">Author</p>
            <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">{author.name}</h1>
            {author.bio && <p className="mt-3 max-w-[60ch] font-serif text-lg text-ink-soft">{author.bio}</p>}
            <p className="mt-4 inline-flex rounded-full bg-ball px-4 py-1.5 text-sm font-extrabold">{total} published {total === 1 ? "guide" : "guides"}</p>
          </div>
        </div>
      </header>
      <div className="container-x">
        <PostGrid posts={posts} />
        <Pagination page={page} totalPages={Math.ceil(total / PER_PAGE)} basePath={`/author/${author.slug}`} />
      </div>
    </>
  );
}
