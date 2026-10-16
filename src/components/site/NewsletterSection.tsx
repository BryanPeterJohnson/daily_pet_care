import { Check } from "lucide-react";
import { getSettings } from "@/lib/settings";
import { LogoMark } from "@/components/Logo";
import { NewsletterForm } from "./NewsletterForm";
import { PawPattern } from "./PawPattern";

const PERKS = ["Seasonal care reminders", "Product safety alerts", "Our newest guides first"];

export async function NewsletterSection({ source = "section" }: { source?: string }) {
  const s = await getSettings();
  return (
    <section id="newsletter" className="container-x mt-20 scroll-mt-24 sm:mt-28">
      <div className="relative overflow-hidden rounded-[2rem] bg-ink px-6 py-12 text-white sm:px-12 md:py-16 lg:px-16">
        <PawPattern className="text-white/[0.06]" />
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-coral/30 blur-3xl" aria-hidden="true" />
        <div className="absolute -bottom-28 left-1/3 h-72 w-72 rounded-full bg-ball/20 blur-3xl" aria-hidden="true" />
        <div className="relative grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow text-ball">Free weekly newsletter</p>
            <h2 className="mt-3 text-3xl leading-[1.05] font-extrabold tracking-tight text-balance sm:text-[2.6rem]">{s.newsletter_title}</h2>
            <p className="mt-4 max-w-xl font-serif text-lg text-white/75">{s.newsletter_text}</p>
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-white/90">
              {PERKS.map((p) => (
                <li key={p} className="inline-flex items-center gap-2">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-ball text-ink"><Check size={13} strokeWidth={3} /></span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8 max-w-lg"><NewsletterForm source={source} dark /></div>
          </div>
          <div className="relative hidden lg:col-span-5 lg:block">
            <div className="mx-auto grid aspect-square max-w-xs place-items-center rounded-full bg-ball/95 shadow-lift">
              <LogoMark className="h-40 w-40 animate-float text-ink [--r:-8deg]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
