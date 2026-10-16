import Link from "next/link";

export function PageHeader({ title, description, actions, back }: { title: string; description?: string; actions?: React.ReactNode; back?: { href: string; label: string } }) {
  return (
    <header className="flex flex-col gap-4 border-b border-line bg-paper px-5 py-6 sm:flex-row sm:items-end sm:justify-between lg:px-10">
      <div>
        {back && <Link href={back.href} className="mb-2 inline-block text-sm font-medium text-muted hover:text-ink">{back.label}</Link>}
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 text-[15px] text-muted">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </header>
  );
}

export function Body({ children, narrow = false }: { children: React.ReactNode; narrow?: boolean }) {
  return <div className={`px-5 py-8 lg:px-10 ${narrow ? "max-w-3xl" : ""}`}>{children}</div>;
}

export function Panel({ title, children, actions, className = "" }: { title?: string; children: React.ReactNode; actions?: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-line bg-paper ${className}`}>
      {title && (
        <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-3.5">
          <h2 className="font-bold">{title}</h2>
          {actions}
        </div>
      )}
      <div className="p-5">{children}</div>
    </section>
  );
}

const STATUS_STYLE: Record<string, string> = {
  PUBLISHED: "bg-tint-3 text-ok",
  SCHEDULED: "bg-tint-1 text-collar-dark",
  PENDING: "bg-tint-4 text-[#8a6d00]",
  DRAFT: "bg-fog text-muted",
};
const STATUS_LABEL: Record<string, string> = { PUBLISHED: "Published", SCHEDULED: "Scheduled", PENDING: "In review", DRAFT: "Draft" };

export function StatusBadge({ status, publishedAt }: { status: string; publishedAt?: Date | string | null }) {
  const s = status === "PUBLISHED" && publishedAt && new Date(publishedAt).getTime() > Date.now() ? "SCHEDULED" : status;
  return <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLE[s]}`}>{STATUS_LABEL[s]}</span>;
}

export function Empty({ title, text, action }: { title: string; text: string; action?: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-paper px-6 py-14 text-center">
      <p className="text-lg font-bold">{title}</p>
      <p className="mx-auto mt-1 max-w-md text-muted">{text}</p>
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
