import { CoverArt } from "@/components/CoverArt";
import { PawPattern } from "./PawPattern";

export function ArchiveHeader({
  title, description, eyebrow, image, children,
}: {
  title: string; description?: string | null; eyebrow?: string; image?: string | null; children?: React.ReactNode;
}) {
  // Photo banner (used by topic pages that have a cover to show)
  if (image) {
    return (
      <header className="container-x pt-6 pb-10 md:pt-10 md:pb-12">
        <div className="relative isolate overflow-hidden rounded-[2rem] shadow-lift">
          <div className="absolute inset-0 -z-10">
            <CoverArt src={image} alt="" width={1600} priority />
          </div>
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/95 via-ink/75 to-ink/20" aria-hidden="true" />
          <div className="max-w-2xl px-6 py-12 text-white sm:px-10 sm:py-16 lg:px-14 lg:py-20">
            {eyebrow && <p className="eyebrow text-ball">{eyebrow}</p>}
            <h1 className="mt-3 text-4xl leading-[1.02] font-extrabold tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl">{title}</h1>
            {description && <p className="mt-4 max-w-[52ch] font-serif text-lg leading-relaxed text-white/80 sm:text-xl">{description}</p>}
            {children && <div className="mt-6">{children}</div>}
          </div>
        </div>
      </header>
    );
  }
  return (
    <header className="relative isolate overflow-hidden">
      <PawPattern />
      <div className="absolute -top-32 -left-24 -z-10 h-80 w-80 rounded-full bg-ball/25 blur-3xl" aria-hidden="true" />
      <div className="absolute -top-20 right-0 -z-10 h-72 w-72 rounded-full bg-coral/10 blur-3xl" aria-hidden="true" />
      <div className="container-x pt-12 pb-10 md:pt-16 md:pb-12">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-3 text-4xl leading-[1.02] font-extrabold tracking-[-0.03em] text-balance sm:text-5xl lg:text-6xl">{title}</h1>
        {description && <p className="mt-4 max-w-[60ch] font-serif text-xl leading-relaxed text-ink-soft">{description}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </header>
  );
}

export function EmptyState({ title, text, action }: { title: string; text: string; action?: React.ReactNode }) {
  return (
    <div className="card px-6 py-14 text-center">
      <p className="text-xl font-extrabold">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-muted">{text}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
