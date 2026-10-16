import sanitizeHtml from "sanitize-html";
import { slugify } from "./slug";

/** Allow-list for post bodies written in the admin editor. */
export function sanitizePostHtml(dirty: string): string {
  return sanitizeHtml(dirty, {
    allowedTags: [
      "h2", "h3", "h4", "p", "br", "hr", "strong", "b", "em", "i", "u", "s", "mark", "code", "pre",
      "blockquote", "ul", "ol", "li", "a", "img", "figure", "figcaption", "table", "thead", "tbody",
      "tr", "th", "td", "iframe",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      img: ["src", "alt", "title", "width", "height", "loading"],
      iframe: ["src", "width", "height", "allow", "allowfullscreen", "frameborder", "title"],
      th: ["colspan", "rowspan"],
      td: ["colspan", "rowspan"],
      "*": ["class"],
    },
    allowedSchemes: ["http", "https", "mailto", "tel"],
    allowedSchemesAppliedToAttributes: ["href", "src"],
    allowProtocolRelative: false,
    // Only YouTube / Vimeo embeds.
    allowedIframeHostnames: ["www.youtube.com", "www.youtube-nocookie.com", "player.vimeo.com"],
    transformTags: {
      a: (tagName, attribs) => {
        const href = attribs.href || "";
        const external = /^https?:\/\//i.test(href) && !href.startsWith(process.env.NEXT_PUBLIC_SITE_URL || "~");
        return {
          tagName,
          attribs: external ? { ...attribs, target: "_blank", rel: "noopener noreferrer" } : attribs,
        };
      },
    },
  });
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

export function readingTime(html: string): number {
  const words = stripHtml(html).split(" ").filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function makeExcerpt(html: string, max = 180): string {
  const text = stripHtml(html);
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(" ", max)).trim() + "…";
}

export interface TocItem { id: string; text: string; level: 2 | 3 }

/** Adds stable id="" anchors to h2/h3 and returns a table of contents. */
export function withHeadingAnchors(html: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const used = new Set<string>();
  const out = html.replace(/<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi, (_m, lvl: string, attrs: string, inner: string) => {
    const text = stripHtml(inner).replace(/&amp;/g, "&");
    let id = slugify(text) || "section";
    let n = 2;
    while (used.has(id)) id = `${slugify(text)}-${n++}`;
    used.add(id);
    toc.push({ id, text, level: Number(lvl) as 2 | 3 });
    const cleanAttrs = attrs.replace(/\sid="[^"]*"/i, "");
    return `<h${lvl}${cleanAttrs} id="${id}">${inner}</h${lvl}>`;
  });
  return { html: out, toc };
}

/** Turns the editor's [video:URL] markers into privacy-friendly embeds (YouTube/Vimeo only). */
export function renderEmbeds(html: string): string {
  return html.replace(/<p>\[video:(https:\/\/(?:www\.youtube-nocookie\.com\/embed\/[\w-]{11}|player\.vimeo\.com\/video\/\d+))\]<\/p>/g,
    (_m, src: string) => `<div class="not-prose my-8 aspect-video overflow-hidden rounded-2xl bg-fog"><iframe src="${src}" title="Embedded video" class="h-full w-full" loading="lazy" allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen" allowfullscreen></iframe></div>`);
}
