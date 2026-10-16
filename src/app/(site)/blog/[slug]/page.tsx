import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostBySlug, getRelatedPosts } from "@/lib/queries";
import { getSettings } from "@/lib/settings";
import { renderEmbeds, withHeadingAnchors } from "@/lib/html";
import { formatDate, siteUrl } from "@/lib/format";
import { CoverArt } from "@/components/CoverArt";
import { Avatar } from "@/components/Avatar";
import { PostCard } from "@/components/PostCard";
import { ShareButtons } from "@/components/site/ShareButtons";
import { TableOfContents } from "@/components/site/TableOfContents";
import { ViewTracker } from "@/components/site/ViewTracker";
import { NewsletterSection } from "@/components/site/NewsletterSection";
import { ReadingProgress } from "@/components/site/ReadingProgress";
import { PawPattern } from "@/components/site/PawPattern";
import { categoryIcon } from "@/components/CategoryIcon";
import { ArrowRight, ChevronRight, Clock, Info } from "lucide-react";

export const revalidate = 300;
export async function generateStaticParams() { return []; } // render on first visit, then cache

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug((await params).slug);
  if (!post) return { title: "Guide not found" };
  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt || undefined;
  const images = post.cover_image ? [{ url: post.cover_image, alt: post.cover_alt || post.title }] : undefined;
  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    authors: [{ name: post.author_name, url: siteUrl(`/author/${post.author_slug}`) }],
    openGraph: {
      type: "article", title, description, url: siteUrl(`/blog/${post.slug}`), images,
      publishedTime: new Date(post.published_at).toISOString(), modifiedTime: new Date(post.updated_at).toISOString(),
      authors: [post.author_name], section: post.category_name || undefined, tags: post.tags.map((t) => t.name),
    },
    twitter: { card: images ? "summary_large_image" : "summary", title, description },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const [post, settings] = await Promise.all([getPostBySlug(slug), getSettings()]);
  if (!post) notFound();
  const related = await getRelatedPosts(post.id, post.category_id, 3);
  const { html, toc } = withHeadingAnchors(renderEmbeds(post.content));
  const url = siteUrl(`/blog/${post.slug}`);
  const cover = post.cover_image ? (post.cover_image.startsWith("http") ? post.cover_image : siteUrl(post.cover_image)) : null;
  const updated = new Date(post.updated_at).getTime() - new Date(post.published_at).getTime() > 86400000;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.meta_description || post.excerpt,
      image: cover ? [cover] : undefined,
      datePublished: new Date(post.published_at).toISOString(),
      dateModified: new Date(post.updated_at).toISOString(),
      author: { "@type": "Person", name: post.author_name, url: siteUrl(`/author/${post.author_slug}`) },
      publisher: { "@type": "Organization", name: settings.site_name, logo: { "@type": "ImageObject", url: siteUrl("/icon.svg") } },
      mainEntityOfPage: url,
      articleSection: post.category_name,
      keywords: post.tags.map((t) => t.name).join(", "),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl("/") },
        ...(post.category_slug ? [{ "@type": "ListItem", position: 2, name: post.category_name, item: siteUrl(`/category/${post.category_slug}`) }] : []),
        { "@type": "ListItem", position: post.category_slug ? 3 : 2, name: post.title, item: url },
      ],
    },
  ];

  const Icon = categoryIcon(post.category_slug);
  const W = "container-x 2xl:max-w-[1280px] 3xl:max-w-[1360px]";

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\u003c") }} />
      <ViewTracker slug={post.slug} />
      <ReadingProgress />

      <header className="relative isolate overflow-hidden">
        <PawPattern />
        <div className="absolute -top-32 -right-24 -z-10 h-80 w-80 rounded-full bg-ball/25 blur-3xl" aria-hidden="true" />
        <div className={`${W} pt-8 md:pt-12`}>
          <nav aria-label="Breadcrumb" className="text-sm font-medium text-muted">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:text-collar">Home</Link></li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              {post.category_slug && (
                <>
                  <li><Link href={`/category/${post.category_slug}`} className="hover:text-collar">{post.category_name}</Link></li>
                  <li aria-hidden="true"><ChevronRight size={14} /></li>
                </>
              )}
              <li aria-current="page" className="max-w-[24ch] truncate text-ink">{post.title}</li>
            </ol>
          </nav>
          <div className="mt-6 max-w-4xl">
            {post.category_slug && (
              <Link href={`/category/${post.category_slug}`} className="chip"><Icon size={15} className="text-collar" />{post.category_name}</Link>
            )}
            <h1 className="mt-5 text-[2.3rem] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance sm:text-5xl lg:text-[3.7rem]">{post.title}</h1>
            {post.excerpt && <p className="mt-5 max-w-[62ch] font-serif text-xl leading-relaxed text-ink-soft">{post.excerpt}</p>}
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
            <Link href={`/author/${post.author_slug}`} className="flex items-center gap-3 hover:text-collar">
              <Avatar name={post.author_name} src={post.author_avatar} size={42} />
              <span>
                <span className="block font-bold">{post.author_name}</span>
                <span className="block text-muted">
                  {updated ? <>Updated <time dateTime={new Date(post.updated_at).toISOString()}>{formatDate(post.updated_at)}</time></> : <time dateTime={new Date(post.published_at).toISOString()}>{formatDate(post.published_at)}</time>}
                </span>
              </span>
            </Link>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3.5 py-1.5 font-semibold shadow-sm ring-1 ring-line/70"><Clock size={15} className="text-collar" />{post.reading_time} min read</span>
          </div>
        </div>

        {post.cover_image && (
          <figure className={`${W} mt-8 md:mt-10`}>
            <div className="aspect-[4/3] overflow-hidden rounded-[1.75rem] shadow-lift sm:aspect-[16/9] sm:rounded-[2rem] lg:aspect-[16/8]">
              <CoverArt src={post.cover_image} alt={post.cover_alt || post.title} width={1600} priority />
            </div>
            {post.cover_alt && <figcaption className="mt-3 text-sm text-muted">{post.cover_alt}</figcaption>}
          </figure>
        )}
      </header>

      <div className={`${W} mt-10 grid gap-12 sm:mt-12 lg:grid-cols-12 xl:gap-16`}>
        <div className="min-w-0 lg:col-span-8 lg:col-start-1">
          <div className="lg:hidden"><TableOfContents items={toc} collapsible /></div>
          <div className="prose prose-lg article-body mt-8 max-w-[68ch] lg:mt-0 2xl:prose-xl" dangerouslySetInnerHTML={{ __html: html }} />

          <aside className="mt-12 flex max-w-[68ch] gap-3 rounded-2xl bg-fog p-5 text-sm leading-relaxed text-muted">
            <Info size={18} className="mt-0.5 shrink-0 text-collar" />
            <p>{settings.disclosure_text}</p>
          </aside>

          {post.tags.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Tags">
              {post.tags.map((t) => <li key={t.id}><Link href={`/tag/${t.slug}`} className="chip py-1.5 text-[13px]">#{t.name}</Link></li>)}
            </ul>
          )}

          <div className="mt-8 max-w-[68ch] border-t border-line pt-8"><ShareButtons url={url} title={post.title} image={cover} /></div>

          <section className="card mt-10 flex max-w-[68ch] flex-col gap-5 p-6 sm:flex-row sm:p-7" aria-label="About the author">
            <Avatar name={post.author_name} src={post.author_avatar} size={72} />
            <div>
              <p className="eyebrow">Written by</p>
              <Link href={`/author/${post.author_slug}`} className="mt-1 block text-xl font-extrabold hover:text-collar">{post.author_name}</Link>
              {post.author_bio && <p className="mt-2 font-serif text-ink-soft">{post.author_bio}</p>}
              <Link href={`/author/${post.author_slug}`} className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-collar hover:underline">More from {post.author_name} <ArrowRight size={15} /></Link>
            </div>
          </section>
        </div>

        <aside className="hidden lg:col-span-4 lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-7rem)] space-y-6 overflow-y-auto overscroll-contain p-1 [scrollbar-width:thin]">
            <TableOfContents items={toc} />
            <div className="relative isolate overflow-hidden rounded-3xl bg-ink p-6 text-white">
              <PawPattern className="text-white/[0.06]" />
              <p className="eyebrow text-ball">Free weekly tips</p>
              <p className="mt-2 text-xl leading-snug font-extrabold">Get guides like this in your inbox</p>
              <p className="mt-2 text-sm text-white/70">One short email a week. Unsubscribe anytime.</p>
              <Link href="#newsletter" className="btn btn-ball mt-5 w-full">Subscribe free</Link>
            </div>
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className={`${W} mt-20 sm:mt-24`}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Keep reading</p>
              <h2 className="section-title mt-2">You might also like</h2>
            </div>
            {post.category_slug && (
              <Link href={`/category/${post.category_slug}`} className="btn btn-ghost">More {post.category_name} guides <ArrowRight size={16} /></Link>
            )}
          </div>
          <div className="mt-8 grid gap-5 xs:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-5 lg:gap-7">{related.map((p) => <PostCard key={p.id} post={p} />)}</div>
        </section>
      )}

      <NewsletterSection source={`post:${post.slug}`} />
    </article>
  );
}
