import Link from "next/link";
import { ArrowRight, BookOpen, Clock, Flame, HeartPulse, Receipt, Search, Sparkles } from "lucide-react";
import { getCategories, getCategoryCovers, getPosts } from "@/lib/queries";
import { getSettings } from "@/lib/settings";
import { PostCard } from "@/components/PostCard";
import { CoverArt } from "@/components/CoverArt";
import { categoryIcon } from "@/components/CategoryIcon";
import { NewsletterSection } from "@/components/site/NewsletterSection";
import { PawPattern } from "@/components/site/PawPattern";
import { formatDate, siteUrl } from "@/lib/format";
import type { PostCard as PostCardType } from "@/lib/types";

export const revalidate = 300;

const VALUES = [
  { icon: BookOpen, title: "Practical how-tos", text: "Step-by-step help for everyday care at home." },
  { icon: Receipt, title: "Real U.S. cost guides", text: "What grooming, boarding and vet visits really cost." },
  { icon: HeartPulse, title: "Plain-English health info", text: "Know the signs, and when to call your vet." },
];

/** Highlights the last two words of the hero title with a sunflower marker stroke. */
function HeroTitle({ text }: { text: string }) {
  const words = text.trim().split(/\s+/);
  if (words.length < 4) return <>{text}</>;
  const tail = words.splice(-2).join(" ");
  return (
    <>
      {words.join(" ")}{" "}
      <span className="relative inline-block whitespace-nowrap">
        <span className="absolute inset-x-[-0.08em] bottom-[0.06em] -z-10 h-[0.38em] -rotate-1 rounded-full bg-ball" aria-hidden="true" />
        {tail}
      </span>
    </>
  );
}

export default async function HomePage() {
  const [settings, categories, covers, featuredRes, latestRes, popularRes] = await Promise.all([
    getSettings(),
    getCategories(),
    getCategoryCovers(),
    getPosts({ featured: true, perPage: 1 }),
    getPosts({ perPage: 8 }),
    getPosts({ perPage: 8, orderBy: "popular" }),
  ]);
  const hero = featuredRes.posts[0] ?? latestRes.posts[0];
  const trending = popularRes.posts.filter((p) => p.id !== hero?.id).slice(0, 4);
  const latest = latestRes.posts.filter((p) => p.id !== hero?.id).slice(0, 6);
  const services = await getPosts({ categoryId: categories.find((c) => c.slug === "pet-services")?.id ?? -1, perPage: 3 });

  // Three distinct photos for the hero collage, preferring posts not already featured below.
  const seen = new Set<number>(hero ? [hero.id] : []);
  const collage: PostCardType[] = [];
  for (const p of [...popularRes.posts, ...latestRes.posts]) {
    if (collage.length === 3) break;
    if (!p.cover_image || seen.has(p.id)) continue;
    seen.add(p.id);
    collage.push(p);
  }
  const mostRead = popularRes.posts[0];
  const topics = categories.filter((c) => (c.post_count ?? 0) > 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.site_name,
    url: siteUrl(),
    potentialAction: { "@type": "SearchAction", target: `${siteUrl("/blog")}?q={search_term_string}`, "query-input": "required name=search_term_string" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ───────── Hero ───────── */}
      <section className="relative isolate overflow-hidden">
        <PawPattern />
        <div className="absolute -top-40 -left-32 -z-10 h-[28rem] w-[28rem] rounded-full bg-ball/25 blur-3xl" aria-hidden="true" />
        <div className="absolute top-20 -right-40 -z-10 h-[30rem] w-[30rem] rounded-full bg-coral/15 blur-3xl" aria-hidden="true" />

        <div className="container-x grid items-center gap-12 pt-10 pb-14 md:grid-cols-12 md:gap-8 md:pt-14 lg:gap-10 lg:pb-20">
          <div className="md:col-span-7 lg:col-span-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-paper px-3.5 py-1.5 text-sm font-semibold text-ink shadow-sm ring-1 ring-line/70">
              <Sparkles size={15} className="text-collar" /> Your everyday pet care companion
            </p>
            <h1 className="relative z-0 mt-5 text-[2.6rem] leading-[1.02] font-extrabold tracking-[-0.035em] text-balance min-[400px]:text-5xl sm:text-6xl md:text-[3.1rem] lg:text-6xl xl:text-[4.4rem]">
              <HeroTitle text={settings.hero_title} />
            </h1>
            <p className="mt-5 max-w-[50ch] font-serif text-lg leading-relaxed text-ink-soft sm:text-xl md:text-lg lg:text-xl">{settings.hero_subtitle}</p>

            <form action="/blog" className="relative mt-7 max-w-lg">
              <label htmlFor="hero-search" className="sr-only">Search guides</label>
              <Search size={20} className="absolute top-1/2 left-5 -translate-y-1/2 text-muted" />
              <input id="hero-search" name="q" placeholder="Search pet care guides…" className="input h-14 rounded-full border-transparent pr-32 pl-12 text-base shadow-card" />
              <button className="btn btn-primary absolute top-1.5 right-1.5 h-11 px-6">Search</button>
            </form>

            {topics.length > 0 && (
              <nav className="mt-6 max-w-xl" aria-label="Popular topics">
                <ul className="flex flex-wrap gap-2">
                  {topics.slice(0, 6).map((c) => {
                    const Icon = categoryIcon(c.slug);
                    return (
                      <li key={c.id}>
                        <Link href={`/category/${c.slug}`} className="chip max-[399px]:px-3 max-[399px]:text-[13px]">
                          <Icon size={15} className="text-collar" />{c.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            )}

            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-sm md:gap-x-6 lg:gap-x-8">
              <div><dt className="sr-only">Guides</dt><dd><span className="text-2xl font-extrabold">{latestRes.total}</span> <span className="text-muted">in-depth guides</span></dd></div>
              <div><dt className="sr-only">Topics</dt><dd><span className="text-2xl font-extrabold">{topics.length}</span> <span className="text-muted">pet care topics</span></dd></div>
              <div><dt className="sr-only">Price</dt><dd><span className="text-2xl font-extrabold">100%</span> <span className="text-muted">free to read</span></dd></div>
            </dl>
          </div>

          {/* Photo collage */}
          {collage.length === 3 && (
            <div className="relative mx-auto w-full max-w-md sm:max-w-lg md:col-span-5 md:max-w-none lg:col-span-6">
              <div className="grid aspect-[1/0.92] grid-cols-5 grid-rows-6 gap-3 sm:gap-4 md:aspect-[1/1.35] md:gap-3 lg:aspect-[1/0.92] lg:gap-4">
                <Link href={`/blog/${collage[0].slug}`} className="group col-span-3 row-span-6 overflow-hidden rounded-[2rem] shadow-lift" aria-label={collage[0].title}>
                  <CoverArt src={collage[0].cover_image} alt={collage[0].cover_alt} width={900} priority className="transition-transform duration-700 group-hover:scale-105" />
                </Link>
                <Link href={`/blog/${collage[1].slug}`} className="group col-span-2 row-span-3 overflow-hidden rounded-[1.75rem] shadow-card" aria-label={collage[1].title}>
                  <CoverArt src={collage[1].cover_image} alt={collage[1].cover_alt} width={600} priority className="transition-transform duration-700 group-hover:scale-105" />
                </Link>
                <Link href={`/blog/${collage[2].slug}`} className="group col-span-2 row-span-3 overflow-hidden rounded-[1.75rem] shadow-card" aria-label={collage[2].title}>
                  <CoverArt src={collage[2].cover_image} alt={collage[2].cover_alt} width={600} priority className="transition-transform duration-700 group-hover:scale-105" />
                </Link>
              </div>

              {/* Floating "most read" sticker */}
              {mostRead && (
                <Link
                  href={`/blog/${mostRead.slug}`}
                  className="group absolute -bottom-6 left-3 flex max-w-[17rem] animate-float items-center gap-3 rounded-2xl bg-paper p-3 pr-4 shadow-lift ring-1 ring-line/60 [--r:-2deg] sm:-left-6 sm:max-w-xs md:left-2 md:max-w-[15rem] lg:-left-6 lg:max-w-xs"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-coral text-white"><Flame size={20} /></span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-bold tracking-[0.12em] text-collar uppercase">Most read</span>
                    <span className="line-clamp-2 text-sm leading-snug font-bold group-hover:text-collar">{mostRead.title}</span>
                  </span>
                </Link>
              )}
              <div className="absolute -top-4 right-2 grid h-24 w-24 rotate-12 place-items-center rounded-full bg-ball text-center shadow-lift sm:-right-4 sm:h-28 sm:w-28 md:-top-6 md:right-0 md:h-20 md:w-20 lg:-right-4 lg:h-28 lg:w-28" aria-hidden="true">
                <span className="text-[13px] leading-tight font-extrabold md:text-[11px] lg:text-[13px]">Free<br />weekly<br />tips</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ───────── What you'll find ───────── */}
      <section className="container-x" aria-label="What you'll find here">
        <ul className="grid gap-3 sm:grid-cols-3 sm:gap-4">
          {VALUES.map(({ icon: Icon, title, text }) => (
            <li key={title} className="card flex items-start gap-4 p-5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-tint-1 text-collar"><Icon size={21} /></span>
              <div>
                <p className="font-bold">{title}</p>
                <p className="mt-0.5 text-sm leading-snug text-muted">{text}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ───────── Editor's pick + trending ───────── */}
      {hero && (
        <section className="container-x mt-16 sm:mt-24">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
            <article className="group relative isolate overflow-hidden rounded-[2rem] shadow-lift lg:col-span-7">
              <div className="aspect-[4/5] min-[480px]:aspect-[4/3] sm:aspect-[16/11] md:aspect-[16/9] lg:aspect-auto lg:h-full lg:min-h-[34rem]">
                <CoverArt src={hero.cover_image} alt={hero.cover_alt} categorySlug={hero.category_slug} width={1400} className="transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/0" aria-hidden="true" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white sm:p-9">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-ball px-3 py-1 text-xs font-extrabold tracking-wide text-ink uppercase">Editor&apos;s pick</span>
                  {hero.category_name && <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold backdrop-blur">{hero.category_name}</span>}
                </div>
                <h2 className="mt-4 max-w-2xl text-[1.75rem] leading-[1.1] font-extrabold tracking-tight text-balance sm:text-4xl lg:text-[2.6rem]">
                  <Link href={`/blog/${hero.slug}`} className="after:absolute after:inset-0">{hero.title}</Link>
                </h2>
                {hero.excerpt && <p className="mt-3 line-clamp-2 max-w-xl font-serif text-base text-white/80 sm:text-lg">{hero.excerpt}</p>}
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-white/80">
                  <span className="inline-flex items-center gap-1.5"><Clock size={15} />{hero.reading_time} min read</span>
                  <span>{formatDate(hero.published_at, { month: "long", day: "numeric" })}</span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 font-bold text-ink transition-colors group-hover:bg-ball">
                    Read the guide <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </article>

            <aside className="card p-6 sm:p-7 lg:col-span-5">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-xl font-extrabold"><Flame size={20} className="text-coral" />Trending now</h2>
                <Link href="/blog" className="text-sm font-bold text-collar hover:underline">View all</Link>
              </div>
              <ol className="mt-5 grid gap-x-6 xs:grid-cols-2 lg:grid-cols-1">
                {trending.map((p, i) => (
                  <li key={p.id} className="group relative flex items-center gap-4 border-t border-line py-4 first:border-t-0 xs:[&:nth-child(2)]:border-t-0 lg:[&:nth-child(2)]:border-t lg:first:pt-0 lg:last:pb-0">
                    <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-2xl sm:w-24">
                      <CoverArt src={p.cover_image} alt={p.cover_alt} categorySlug={p.category_slug} width={240} iconSize={26} className="transition-transform duration-500 group-hover:scale-110" />
                      <span className="absolute top-1.5 left-1.5 grid h-7 w-7 place-items-center rounded-full bg-paper text-sm font-extrabold shadow">{i + 1}</span>
                    </div>
                    <div className="min-w-0">
                      {p.category_name && <p className="text-xs font-bold tracking-wide text-collar uppercase">{p.category_name}</p>}
                      <h3 className="mt-1 line-clamp-2 leading-snug font-bold sm:text-[1.05rem]">
                        <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0 group-hover:text-collar">{p.title}</Link>
                      </h3>
                      <p className="mt-1 text-xs text-muted">{p.reading_time} min read</p>
                    </div>
                  </li>
                ))}
              </ol>
            </aside>
          </div>
        </section>
      )}

      {/* ───────── Topics ───────── */}
      {topics.length > 0 && (
        <section className="container-x mt-16 sm:mt-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Explore by topic</p>
              <h2 className="section-title mt-2">Find answers for every pet need</h2>
            </div>
            <Link href="/blog" className="btn btn-ghost">Browse all guides <ArrowRight size={16} /></Link>
          </div>
          <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {topics.map((c) => {
              const Icon = categoryIcon(c.slug);
              return (
                <li key={c.id}>
                  <Link href={`/category/${c.slug}`} className="group relative isolate block aspect-square overflow-hidden rounded-3xl shadow-card sm:aspect-[5/4] md:aspect-[4/5] lg:aspect-[5/4]">
                    <CoverArt src={covers[c.id]} alt="" categorySlug={c.slug} width={600} iconSize={48} className="transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" aria-hidden="true" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-4 text-white sm:p-5">
                      <div className="min-w-0">
                        <span className="mb-2 grid h-9 w-9 place-items-center rounded-xl bg-ball text-ink transition-transform group-hover:-rotate-6 sm:h-10 sm:w-10"><Icon size={18} /></span>
                        <p className="text-base leading-tight font-extrabold sm:text-xl md:text-base lg:text-xl">{c.name}</p>
                        <p className="mt-0.5 text-xs text-white/75 sm:text-sm">{c.post_count} {c.post_count === 1 ? "guide" : "guides"}</p>
                      </div>
                      <span className="hidden h-9 w-9 shrink-0 place-items-center rounded-full bg-white/15 backdrop-blur transition-colors group-hover:bg-white group-hover:text-ink sm:grid md:hidden lg:grid"><ArrowRight size={16} /></span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {/* ───────── Latest ───────── */}
      <section className="container-x mt-16 sm:mt-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Fresh from the blog</p>
            <h2 className="section-title mt-2">Latest guides</h2>
          </div>
          <Link href="/blog" className="btn btn-ghost">See all guides <ArrowRight size={16} /></Link>
        </div>
        {latest.length ? (
          <div className="mt-8 grid gap-5 xs:grid-cols-2 sm:gap-6 md:grid-cols-3 md:gap-5 lg:gap-7">
            {latest.map((p) => <PostCard key={p.id} post={p} />)}
          </div>
        ) : (
          <p className="mt-8 rounded-2xl bg-fog p-8 text-muted">New guides are on the way. Publish your first post from the admin panel to see it here.</p>
        )}
      </section>

      {/* ───────── Pet services band ───────── */}
      {services.posts.length > 0 && (
        <section className="container-x mt-16 sm:mt-24">
          <div className="relative isolate overflow-hidden rounded-[2rem] bg-tint-1 px-5 py-10 sm:px-10 sm:py-14 lg:px-14">
            <PawPattern className="text-collar/[0.07]" />
            <div className="grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12">
              <div className="lg:col-span-4">
                <p className="eyebrow">Hiring help?</p>
                <h2 className="section-title mt-2">Walkers, sitters &amp; groomers</h2>
                <p className="mt-4 font-serif text-lg text-ink-soft">What to ask, what it costs, and the red flags to watch for before you trust someone with your pet.</p>
                <Link href="/category/pet-services" className="btn btn-primary btn-lg mt-6">Pet services guides <ArrowRight size={18} /></Link>
              </div>
              <ul className="grid gap-4 sm:grid-cols-3 lg:col-span-8">
                {services.posts.map((p) => (
                  <li key={p.id}>
                    <article className="group relative flex h-full overflow-hidden rounded-3xl bg-paper shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:flex-col">
                      <div className="w-28 shrink-0 overflow-hidden sm:aspect-[4/3] sm:w-auto">
                        <CoverArt src={p.cover_image} alt={p.cover_alt} categorySlug={p.category_slug} width={600} iconSize={40} className="transition-transform duration-700 group-hover:scale-105" />
                      </div>
                      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
                        <h3 className="leading-snug font-extrabold sm:text-lg">
                          <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0 group-hover:text-collar">{p.title}</Link>
                        </h3>
                        <p className="mt-auto inline-flex items-center gap-1.5 pt-3 text-sm text-muted"><Clock size={14} />{p.reading_time} min read</p>
                      </div>
                    </article>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      <NewsletterSection source="home" />
    </>
  );
}
