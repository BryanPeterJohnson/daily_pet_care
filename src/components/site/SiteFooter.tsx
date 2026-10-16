import Link from "next/link";
import { Logo } from "@/components/Logo";
import type { Settings } from "@/lib/settings";
import type { Category } from "@/lib/types";
import { SocialIcons } from "@/components/SocialIcons";
import { categoryIcon } from "@/components/CategoryIcon";

export function SiteFooter({ settings, categories }: { settings: Settings; categories: Category[] }) {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-line bg-paper sm:mt-28">
      <div className="container-x grid gap-12 py-14 md:grid-cols-12 md:py-16">
        <div className="md:col-span-5">
          <Logo name={settings.site_name} />
          <p className="mt-4 max-w-sm font-serif text-[1.05rem] leading-relaxed text-ink-soft">{settings.footer_about}</p>
          <SocialIcons settings={settings} className="mt-6" />
        </div>
        <nav className="md:col-span-4" aria-label="Topics">
          <h2 className="eyebrow">Topics</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-[15px] font-medium">
            {categories.map((c) => {
              const Icon = categoryIcon(c.slug);
              return (
                <li key={c.id}>
                  <Link href={`/category/${c.slug}`} className="group inline-flex items-center gap-2 text-ink-soft hover:text-collar">
                    <Icon size={15} className="text-muted group-hover:text-collar" />{c.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <nav className="md:col-span-3" aria-label="Company">
          <h2 className="eyebrow">{settings.site_name}</h2>
          <ul className="mt-4 space-y-3 text-[15px] font-medium text-ink-soft">
            <li><Link href="/about" className="hover:text-collar">About us</Link></li>
            <li><Link href="/contact" className="hover:text-collar">Contact</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-collar">Privacy policy</Link></li>
            <li><Link href="/terms" className="hover:text-collar">Terms of use</Link></li>
            <li><Link href="/disclaimer" className="hover:text-collar">Disclaimer</Link></li>
            <li><a href="/feed.xml" className="hover:text-collar">RSS feed</a></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-3 py-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <p>© {year} {settings.site_name}. Made with love for pets everywhere.</p>
          <p className="max-w-2xl md:text-right">Our content is for general information only and isn&apos;t a substitute for advice from your veterinarian.</p>
        </div>
      </div>
    </footer>
  );
}
