import Link from "next/link";
import { Clock } from "lucide-react";
import { formatDate } from "@/lib/format";
import type { PostCard as PostCardType } from "@/lib/types";
import { CoverArt } from "./CoverArt";
import { categoryIcon } from "./CategoryIcon";

type Variant = "default" | "lead" | "row";

function CategoryBadge({ post, className = "" }: { post: PostCardType; className?: string }) {
  if (!post.category_name) return null;
  const Icon = categoryIcon(post.category_slug);
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full bg-paper/95 px-3 py-1 text-xs font-bold text-ink shadow-sm backdrop-blur ${className}`}>
      <Icon size={13} strokeWidth={2.2} className="text-collar" />
      {post.category_name}
    </span>
  );
}

export function PostCard({ post, variant = "default", priority = false }: { post: PostCardType; variant?: Variant; priority?: boolean }) {
  const href = `/blog/${post.slug}`;

  if (variant === "row") {
    return (
      <article className="group relative flex items-center gap-4">
        <div className="aspect-square w-20 shrink-0 overflow-hidden rounded-2xl sm:w-24">
          <CoverArt src={post.cover_image} alt={post.cover_alt} categorySlug={post.category_slug} iconSize={28} width={240} className="transition-transform duration-500 group-hover:scale-110" />
        </div>
        <div className="min-w-0">
          {post.category_name && <p className="text-xs font-bold tracking-wide text-collar uppercase">{post.category_name}</p>}
          <h3 className="mt-1 line-clamp-3 text-[1.02rem] leading-snug font-bold">
            <Link href={href} className="after:absolute after:inset-0 group-hover:text-collar">{post.title}</Link>
          </h3>
          <p className="mt-1 text-xs text-muted">{post.reading_time} min read</p>
        </div>
      </article>
    );
  }

  const lead = variant === "lead";
  return (
    <article className={`group relative flex flex-col overflow-hidden rounded-3xl bg-paper shadow-card ring-1 ring-line/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift ${lead ? "sm:col-span-2" : ""}`}>
      <div className={`relative overflow-hidden ${lead ? "aspect-[16/9]" : "aspect-[16/11]"}`}>
        <CoverArt
          src={post.cover_image}
          alt={post.cover_alt}
          categorySlug={post.category_slug}
          iconSize={lead ? 88 : 60}
          priority={priority}
          width={lead ? 1200 : 760}
          className="transition-transform duration-700 group-hover:scale-105"
        />
        <CategoryBadge post={post} className="absolute top-4 left-4" />
      </div>
      <div className="flex flex-1 flex-col p-5 sm:p-6 md:p-4 lg:p-6">
        <h3 className={`font-extrabold tracking-tight text-balance ${lead ? "text-2xl leading-tight sm:text-[1.9rem]" : "text-[1.25rem] leading-snug md:text-[1.08rem] lg:text-[1.25rem]"}`}>
          <Link href={href} className="after:absolute after:inset-0 group-hover:text-collar">{post.title}</Link>
        </h3>
        {post.excerpt && (
          <p className={`mt-2.5 font-serif text-ink-soft ${lead ? "text-lg line-clamp-3 max-w-[62ch]" : "text-[15px] leading-relaxed line-clamp-2"}`}>{post.excerpt}</p>
        )}
        <div className="mt-auto flex items-center gap-3 pt-5 text-sm text-muted md:gap-2 md:text-[13px] lg:gap-3 lg:text-sm">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-ball text-xs font-extrabold text-ink" aria-hidden="true">
            {post.author_name.slice(0, 1).toUpperCase()}
          </span>
          <span className="min-w-0 truncate">
            <span className="font-semibold text-ink">{post.author_name}</span> · {formatDate(post.published_at, { month: "short", day: "numeric" })}
          </span>
          <span className="ml-auto inline-flex shrink-0 items-center gap-1"><Clock size={14} />{post.reading_time} min</span>
        </div>
      </div>
    </article>
  );
}
