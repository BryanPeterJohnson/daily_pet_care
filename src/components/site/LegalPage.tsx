export function LegalPage({ title, updated, children }: { title: string; updated?: string; children: React.ReactNode }) {
  return (
    <div className="container-x pt-12 md:pt-16">
      <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
      {updated && <p className="mt-3 text-sm text-muted">Last updated {updated}</p>}
      <div className="prose prose-lg article-body mt-10 max-w-[68ch]">{children}</div>
    </div>
  );
}
