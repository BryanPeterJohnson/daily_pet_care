import { ListOrdered } from "lucide-react";
import type { TocItem } from "@/lib/html";

export function TableOfContents({ items, collapsible = false }: { items: TocItem[]; collapsible?: boolean }) {
  const h2 = items.filter((i) => i.level === 2);
  if (h2.length < 3) return null;
  const list = (
    <ol className="mt-4 space-y-1 text-[15px]">
      {h2.map((i, n) => (
        <li key={i.id}>
          <a href={`#${i.id}`} className="group flex gap-3 rounded-xl px-2 py-1.5 leading-snug text-ink-soft transition-colors hover:bg-fog hover:text-ink">
            <span className="mt-px w-5 shrink-0 text-right text-xs font-extrabold text-collar tabular-nums">{String(n + 1).padStart(2, "0")}</span>
            <span>{i.text}</span>
          </a>
        </li>
      ))}
    </ol>
  );
  const heading = (
    <span className="flex items-center gap-2 font-extrabold">
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-ball text-ink"><ListOrdered size={16} /></span>
      In this guide
    </span>
  );
  if (collapsible) {
    return (
      <details className="group card p-4">
        <summary className="flex cursor-pointer list-none items-center justify-between">
          {heading}
          <span className="text-sm font-bold text-collar group-open:hidden">Show {h2.length} sections</span>
          <span className="hidden text-sm font-bold text-collar group-open:inline">Hide</span>
        </summary>
        {list}
      </details>
    );
  }
  return (
    <nav aria-label="In this guide" className="card p-5">
      <h2>{heading}</h2>
      {list}
    </nav>
  );
}
