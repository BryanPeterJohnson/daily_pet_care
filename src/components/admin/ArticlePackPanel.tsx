"use client";

import { useActionState } from "react";
import { importArticlePack } from "@/app/admin/_actions/articles";
import type { ActionResult } from "@/app/admin/_actions/common";
import { FormMessage } from "./FormMessage";
import { keepFormSubmit } from "@/components/useKeepFormSubmit";

export function ArticlePackPanel({ total, missing, titles }: { total: number; missing: number; titles: string[] }) {
  const [state, action, pending] = useActionState<ActionResult, FormData>(importArticlePack, null);
  const done = missing === 0 || state?.ok;
  return (
    <section className="grid gap-6 rounded-2xl border border-line bg-paper p-6 lg:grid-cols-[240px_1fr]">
      <div>
        <h2 className="font-bold">SEO article pack</h2>
        <p className="mt-1 text-sm text-muted">{total} in-depth U.S. pet care guides with SEO titles, meta descriptions, FAQs and internal links.</p>
      </div>
      <div>
        {done ? (
          <p className="text-[15px] text-ink-soft">All {total} articles are on your site. Edit them anytime from Posts.</p>
        ) : (
          <>
            <p className="text-[15px] text-ink-soft">{missing} of {total} articles aren&apos;t on your site yet. Importing publishes them right away and never changes posts you already have.</p>
            <details className="mt-3 text-sm">
              <summary className="cursor-pointer font-semibold text-collar">See the articles</summary>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-muted">{titles.map((t) => <li key={t}>{t}</li>)}</ul>
            </details>
            <form onSubmit={keepFormSubmit(action)} className="mt-4">
              <button className="btn btn-primary" disabled={pending}>{pending ? "Importing…" : `Import ${missing} ${missing === 1 ? "article" : "articles"}`}</button>
            </form>
          </>
        )}
        <div className="mt-3"><FormMessage state={state} /></div>
      </div>
    </section>
  );
}
