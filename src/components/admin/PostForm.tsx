"use client";

import { keepFormSubmit } from "@/components/useKeepFormSubmit";
import { useActionState, useMemo, useState } from "react";
import Link from "next/link";
import { savePost } from "@/app/admin/_actions/posts";
import type { ActionResult } from "@/app/admin/_actions/common";
import { RichEditor } from "./RichEditor";
import { ImageField } from "./ImageField";
import { FormMessage } from "./FormMessage";
import { StatusBadge } from "./ui";
import { slugify } from "@/lib/slug";

export interface PostFormData {
  id?: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image: string | null;
  cover_alt: string | null;
  status: "DRAFT" | "PENDING" | "PUBLISHED";
  featured: boolean;
  meta_title: string;
  meta_description: string;
  published_at: string | null; // ISO
  category_id: number | null;
  tags: string;
}

function toLocalInput(iso: string | null) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function Counter({ value, ideal }: { value: number; ideal: [number, number] }) {
  const good = value >= ideal[0] && value <= ideal[1];
  return <span className={`text-xs tabular-nums ${value === 0 ? "text-muted" : good ? "text-ok" : "text-alert"}`}>{value} / {ideal[1]}</span>;
}

export function PostForm({
  post, categories, canPublish, siteUrl, savedMessage,
}: {
  post: PostFormData; categories: { id: number; name: string }[]; canPublish: boolean; siteUrl: string; savedMessage?: string;
}) {
  const [state, action, pending] = useActionState<ActionResult, FormData>(savePost, savedMessage ? { ok: true, message: savedMessage } : null);
  const [title, setTitle] = useState(post.title);
  const [slug, setSlug] = useState(post.slug);
  const [slugTouched, setSlugTouched] = useState(Boolean(post.id));
  const [excerpt, setExcerpt] = useState(post.excerpt);
  const [metaTitle, setMetaTitle] = useState(post.meta_title);
  const [metaDesc, setMetaDesc] = useState(post.meta_description);
  const [coverAlt, setCoverAlt] = useState(post.cover_alt || "");
  const [localDate, setLocalDate] = useState(toLocalInput(post.published_at));
  const [words, setWords] = useState(0);

  const effectiveSlug = slugTouched ? slug : slugify(title || "") ;
  const isoDate = useMemo(() => (localDate ? new Date(localDate).toISOString() : ""), [localDate]);
  const scheduled = isoDate && new Date(isoDate).getTime() > Date.now();
  const isPublished = post.status === "PUBLISHED";
  const lockedForAuthor = !canPublish && isPublished;

  const previewTitle = metaTitle || title || "Your post title";
  const previewDesc = metaDesc || excerpt || "Add a meta description to control the snippet Google shows under your title.";

  return (
    <form onSubmit={keepFormSubmit(action)} className="grid gap-8 xl:grid-cols-[1fr_340px]">
      {post.id && <input type="hidden" name="id" value={post.id} />}
      <input type="hidden" name="publishedAt" value={isoDate} />

      <div className="min-w-0 space-y-6">
        {lockedForAuthor && (
          <p className="rounded-xl bg-tint-4 px-4 py-3 text-sm font-medium">This post is live. Only editors and admins can change published posts.</p>
        )}
        <div>
          <label htmlFor="title" className="sr-only">Title</label>
          <input id="title" name="title" value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Post title"
            className="w-full rounded-2xl border border-line bg-paper px-5 py-4 text-2xl font-extrabold tracking-tight placeholder:text-muted/50 focus:border-collar focus:ring-2 focus:ring-collar/20 focus:outline-none sm:text-3xl" />
          <div className="mt-2 flex flex-wrap items-center gap-1 text-sm text-muted">
            <span>{siteUrl}/blog/</span>
            <label htmlFor="slug" className="sr-only">URL slug</label>
            <input id="slug" name="slug" value={effectiveSlug} onChange={(e) => { setSlugTouched(true); setSlug(e.target.value); }}
              className="min-w-0 flex-1 rounded-md border border-transparent bg-transparent px-1 py-0.5 font-medium text-ink hover:border-line focus:border-collar focus:outline-none" />
          </div>
        </div>

        <RichEditor name="content" defaultValue={post.content} onWords={setWords} />
        <p className="-mt-4 text-sm text-muted">{words} words, about {Math.max(1, Math.ceil(words / 200))} min read. In-depth guides of 1,200+ words usually rank best.</p>

        <div className="rounded-2xl border border-line bg-paper p-5">
          <div className="flex items-center justify-between">
            <label htmlFor="excerpt" className="label mb-0">Excerpt</label>
            <Counter value={excerpt.length} ideal={[80, 200]} />
          </div>
          <textarea id="excerpt" name="excerpt" rows={3} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="input mt-2" placeholder="One or two sentences shown on cards and under the title." />
        </div>

        <div className="rounded-2xl border border-line bg-paper p-5">
          <h2 className="font-bold">Search engine listing</h2>
          <div className="mt-4 rounded-xl bg-fog p-4">
            <p className="truncate text-sm text-[#1a7f37]">{siteUrl.replace(/^https?:\/\//, "")} › blog › {effectiveSlug || "post-url"}</p>
            <p className="mt-0.5 line-clamp-1 text-lg text-[#1a0dab]">{previewTitle}</p>
            <p className="mt-0.5 line-clamp-2 text-sm text-[#4d5156]">{previewDesc}</p>
          </div>
          <div className="mt-5 space-y-4">
            <div>
              <div className="flex items-center justify-between"><label htmlFor="metaTitle" className="label">SEO title <span className="font-normal text-muted">(optional)</span></label><Counter value={metaTitle.length} ideal={[30, 60]} /></div>
              <input id="metaTitle" name="metaTitle" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className="input" placeholder={title} />
            </div>
            <div>
              <div className="flex items-center justify-between"><label htmlFor="metaDescription" className="label">Meta description</label><Counter value={metaDesc.length} ideal={[120, 160]} /></div>
              <textarea id="metaDescription" name="metaDescription" rows={3} value={metaDesc} onChange={(e) => setMetaDesc(e.target.value)} className="input" placeholder="Aim for 120–160 characters that make people want to click." />
            </div>
          </div>
        </div>
      </div>

      <aside className="space-y-5 xl:sticky xl:top-6 xl:self-start">
        <div className="rounded-2xl border border-line bg-paper p-5">
          <div className="flex items-center justify-between">
            <h2 className="font-bold">Publish</h2>
            {post.id && <StatusBadge status={post.status} publishedAt={post.published_at} />}
          </div>
          {canPublish && (
            <div className="mt-4">
              <label htmlFor="pubdate" className="label">Publish date</label>
              <input id="pubdate" type="datetime-local" value={localDate} onChange={(e) => setLocalDate(e.target.value)} className="input" />
              <p className="hint">{scheduled ? "Set in the future: the post goes live automatically at this time." : "Leave empty to publish immediately."}</p>
            </div>
          )}
          <div className="mt-5"><FormMessage state={state} /></div>
          <div className="mt-3 flex flex-col gap-2">
            {canPublish ? (
              <button name="intent" value="publish" className="btn btn-primary w-full" disabled={pending}>
                {pending ? "Saving…" : isPublished ? "Update post" : scheduled ? "Schedule post" : "Publish now"}
              </button>
            ) : (
              <button name="intent" value="submit" className="btn btn-primary w-full" disabled={pending || lockedForAuthor}>
                {pending ? "Saving…" : "Submit for review"}
              </button>
            )}
            <button name="intent" value="draft" className="btn btn-ghost w-full" disabled={pending || lockedForAuthor}>
              {isPublished ? "Switch to draft" : "Save draft"}
            </button>
            {post.id && isPublished && !scheduled && (
              <Link href={`/blog/${post.slug}`} target="_blank" className="btn btn-ghost w-full">View post</Link>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-line bg-paper p-5 space-y-4">
          <div>
            <label htmlFor="categoryId" className="label">Category</label>
            <select id="categoryId" name="categoryId" defaultValue={post.category_id ?? ""} className="input">
              <option value="">No category</option>
              {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="tags" className="label">Tags</label>
            <input id="tags" name="tags" defaultValue={post.tags} className="input" placeholder="Dogs, Grooming, Hiring tips" />
            <p className="hint">Separate with commas.</p>
          </div>
          {canPublish && (
            <label className="flex items-start gap-3 rounded-xl bg-fog p-3 text-sm">
              <input type="checkbox" name="featured" value="1" defaultChecked={post.featured} className="mt-0.5 h-4 w-4 accent-collar" />
              <span><strong>Feature on homepage</strong><br /><span className="text-muted">The newest featured post fills the hero.</span></span>
            </label>
          )}
        </div>

        <div className="rounded-2xl border border-line bg-paper p-5 space-y-4">
          <ImageField name="coverImage" label="Cover image" defaultValue={post.cover_image} hint="Landscape, at least 1600×900. Used on cards and when shared on social media." onAlt={(a) => !coverAlt && setCoverAlt(a)} />
          <div>
            <label htmlFor="coverAlt" className="label">Image description (alt text)</label>
            <input id="coverAlt" name="coverAlt" value={coverAlt} onChange={(e) => setCoverAlt(e.target.value)} className="input" placeholder="Golden retriever being brushed at a grooming salon" />
          </div>
        </div>
      </aside>
    </form>
  );
}
