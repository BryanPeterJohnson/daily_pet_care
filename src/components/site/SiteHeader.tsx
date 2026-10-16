import Link from "next/link";
import { Search } from "lucide-react";
import { Logo } from "@/components/Logo";
import type { Category } from "@/lib/types";
import { MobileMenu } from "./MobileMenu";

const PRIMARY = ["dog-care", "cat-care", "pet-health", "grooming", "pet-services"];

export function SiteHeader({ siteName, categories }: { siteName: string; categories: Category[] }) {
  const primary = PRIMARY.map((s) => categories.find((c) => c.slug === s)).filter(Boolean) as Category[];
  const nav = (primary.length ? primary : categories.slice(0, 5)).map((c) => ({ href: `/category/${c.slug}`, label: c.name }));
  const allLinks = [
    { href: "/blog", label: "All guides" },
    ...categories.map((c) => ({ href: `/category/${c.slug}`, label: c.name })),
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-cream/85 backdrop-blur-md supports-[backdrop-filter]:bg-cream/75">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-white">
        Skip to content
      </a>
      <div className="container-x flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
        <Link href="/" aria-label={`${siteName} home`} className="transition-transform hover:-rotate-2">
          <Logo name={siteName} />
        </Link>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {nav.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-full px-3 py-2 text-sm font-semibold whitespace-nowrap text-ink-soft transition-colors hover:bg-paper hover:text-ink xl:px-3.5 xl:text-[15px]">
              {l.label}
            </Link>
          ))}
          <Link href="/blog" className="rounded-full px-3 py-2 text-sm font-semibold whitespace-nowrap text-collar transition-colors hover:bg-paper xl:px-3.5 xl:text-[15px]">All guides →</Link>
        </nav>
        <div className="flex items-center gap-1.5">
          <form action="/blog" className="relative hidden 2xl:block">
            <label htmlFor="h-search" className="sr-only">Search guides</label>
            <Search size={16} className="absolute top-1/2 left-3.5 -translate-y-1/2 text-muted" />
            <input id="h-search" name="q" placeholder="Search guides" className="input w-52 rounded-full border-transparent bg-paper py-2 pl-9 text-sm shadow-sm" />
          </form>
          <Link href="/blog" className="grid h-10 w-10 place-items-center rounded-full bg-paper shadow-sm ring-1 ring-line/70 transition-colors hover:bg-ball 2xl:hidden" aria-label="Search guides">
            <Search size={18} />
          </Link>
          <Link href="#newsletter" className="btn btn-primary ml-1 hidden whitespace-nowrap shadow-sm sm:inline-flex lg:hidden xl:inline-flex">Get free tips</Link>
          <MobileMenu links={allLinks} />
        </div>
      </div>
    </header>
  );
}
