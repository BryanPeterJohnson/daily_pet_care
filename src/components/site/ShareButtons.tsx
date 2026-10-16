"use client";

import { useState } from "react";
import { Check, Link2, Mail } from "lucide-react";

export function ShareButtons({ url, title, image }: { url: string; title: string; image?: string | null }) {
  const [copied, setCopied] = useState(false);
  const u = encodeURIComponent(url);
  const t = encodeURIComponent(title);
  const links = [
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${u}`, text: "Facebook" },
    { label: "Save to Pinterest", href: `https://pinterest.com/pin/create/button/?url=${u}&description=${t}${image ? `&media=${encodeURIComponent(image)}` : ""}`, text: "Pinterest" },
    { label: "Share on X", href: `https://x.com/intent/post?url=${u}&text=${t}`, text: "X" },
  ];
  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-bold">Share this guide</span>
      {links.map((l) => (
        <a key={l.text} href={l.href} target="_blank" rel="noopener noreferrer" aria-label={l.label} className="rounded-full bg-paper px-3.5 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-line transition-colors hover:bg-ball">
          {l.text}
        </a>
      ))}
      <a href={`mailto:?subject=${t}&body=${u}`} aria-label="Share by email" className="grid h-8 w-8 place-items-center rounded-full bg-paper shadow-sm ring-1 ring-line transition-colors hover:bg-ball"><Mail size={15} /></a>
      <button onClick={copy} aria-label="Copy link" className="inline-flex items-center gap-1.5 rounded-full bg-paper px-3.5 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-line transition-colors hover:bg-ball">
        {copied ? <><Check size={15} /> Copied</> : <><Link2 size={15} /> Copy link</>}
      </button>
    </div>
  );
}
