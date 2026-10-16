"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { ArrowRight, Menu, Search, X } from "lucide-react";

export function MobileMenu({ links }: { links: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Rendered into <body>: the header's backdrop blur would otherwise trap this fixed panel inside the 64px header.
  const panel = (
    <div className="fixed inset-0 z-[60] flex h-dvh flex-col bg-cream" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-line/70 px-5">
        <p className="text-sm font-bold tracking-[0.14em] text-collar uppercase">Menu</p>
        <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white" aria-label="Close menu" autoFocus>
          <X size={20} />
        </button>
      </div>
      <form action="/blog" className="shrink-0 px-5 pt-4" onSubmit={() => setOpen(false)}>
        <label htmlFor="m-search" className="sr-only">Search guides</label>
        <div className="relative">
          <Search size={18} className="absolute top-1/2 left-4 -translate-y-1/2 text-muted" />
          <input id="m-search" name="q" placeholder="Search guides" className="input h-12 rounded-full pl-11" />
        </div>
      </form>
      <nav className="mt-4 min-h-0 flex-1 overflow-y-auto overscroll-contain px-5 pb-[max(2.5rem,env(safe-area-inset-bottom))]" aria-label="Mobile">
        <ul className="space-y-2">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={`flex items-center justify-between rounded-2xl px-5 py-4 text-lg font-bold shadow-sm ring-1 ring-line/60 transition-colors active:bg-ball ${active ? "bg-ball" : "bg-paper"}`}
                >
                  {l.label}
                  <ArrowRight size={18} className="text-collar" />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );

  return (
    <div className="xl:hidden">
      <button onClick={() => setOpen(true)} className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white transition-colors hover:bg-ink-soft" aria-label="Open menu" aria-expanded={open}>
        <Menu size={20} />
      </button>
      {open && mounted && createPortal(panel, document.body)}
    </div>
  );
}
