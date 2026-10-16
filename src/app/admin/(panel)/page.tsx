import Link from "next/link";
import { Plus } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { query, queryOne } from "@/lib/db";
import { compactNumber, formatDate } from "@/lib/format";
import { Body, PageHeader, Panel, StatusBadge } from "@/components/admin/ui";
import { logout } from "../_actions/auth";

export const metadata = { title: "Dashboard" };

type Row = { id: number; title: string; status: string; published_at: Date | null; updated_at: Date; views: number; author_name: string };

export default async function Dashboard({ searchParams }: { searchParams: Promise<{ denied?: string; welcome?: string }> }) {
  const user = await requireUser();
  const { denied, welcome } = await searchParams;
  const mine = user.role === "AUTHOR";
  const scope = mine ? "WHERE p.author_id = ?" : "";
  const sp = mine ? [user.id] : [];

  const [stats, recent, pending, top, messages] = await Promise.all([
    queryOne<{ published: number; drafts: number; pending: number; views: number; subs: number; subs30: number }>(
      `SELECT
        (SELECT COUNT(*) FROM posts p ${scope ? scope + " AND" : "WHERE"} p.status='PUBLISHED') AS published,
        (SELECT COUNT(*) FROM posts p ${scope ? scope + " AND" : "WHERE"} p.status='DRAFT') AS drafts,
        (SELECT COUNT(*) FROM posts p ${scope ? scope + " AND" : "WHERE"} p.status='PENDING') AS pending,
        (SELECT COALESCE(SUM(views),0) FROM posts p ${scope}) AS views,
        (SELECT COUNT(*) FROM subscribers WHERE active=1) AS subs,
        (SELECT COUNT(*) FROM subscribers WHERE active=1 AND created_at > UTC_TIMESTAMP() - INTERVAL 30 DAY) AS subs30`,
      [...sp, ...sp, ...sp, ...sp],
    ),
    query<Row>(`SELECT p.id, p.title, p.status, p.published_at, p.updated_at, p.views, u.name AS author_name FROM posts p JOIN users u ON u.id=p.author_id ${scope} ORDER BY p.updated_at DESC LIMIT 6`, sp),
    mine ? Promise.resolve([] as Row[]) : query<Row>("SELECT p.id, p.title, p.status, p.published_at, p.updated_at, p.views, u.name AS author_name FROM posts p JOIN users u ON u.id=p.author_id WHERE p.status='PENDING' ORDER BY p.updated_at DESC LIMIT 5"),
    query<Row>(`SELECT p.id, p.title, p.status, p.published_at, p.updated_at, p.views, u.name AS author_name FROM posts p JOIN users u ON u.id=p.author_id ${scope ? scope + " AND" : "WHERE"} p.status='PUBLISHED' ORDER BY p.views DESC LIMIT 5`, sp),
    mine ? Promise.resolve([]) : query<{ id: number; name: string; subject: string | null; created_at: Date; is_read: number }>("SELECT id, name, subject, created_at, is_read FROM contact_messages ORDER BY created_at DESC LIMIT 4"),
  ]);

  const cards = [
    { label: "Published posts", value: stats?.published ?? 0, href: "/admin/posts?status=PUBLISHED" },
    { label: mine ? "Your drafts" : "Drafts", value: stats?.drafts ?? 0, href: "/admin/posts?status=DRAFT" },
    { label: "Waiting for review", value: stats?.pending ?? 0, href: "/admin/posts?status=PENDING" },
    { label: "Total post views", value: stats?.views ?? 0 },
    ...(!mine ? [{ label: `Subscribers (+${stats?.subs30 ?? 0} in 30 days)`, value: stats?.subs ?? 0, href: "/admin/subscribers" }] : []),
  ];

  return (
    <>
      <PageHeader
        title={`Hi, ${user.name.split(" ")[0]}`}
        description="Here's what's happening on your site."
        actions={
          <>
            <Link href="/admin/posts/new" className="btn btn-primary"><Plus size={17} />New post</Link>
            <form action={logout}><button className="btn btn-ghost">Sign out</button></form>
          </>
        }
      />
      <Body>
        {welcome && <p className="mb-6 rounded-xl bg-ball px-4 py-3 text-[15px] font-semibold">Your site is installed. Next: open Site settings to set your brand, then write your first post.</p>}
        {denied && <p className="mb-6 rounded-xl bg-tint-2 px-4 py-3 text-sm font-medium text-alert">Your role doesn't have access to that page.</p>}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
          {cards.map((c) => {
            const inner = (
              <>
                <p className="text-3xl font-extrabold tabular-nums">{compactNumber(Number(c.value))}</p>
                <p className="mt-1 text-sm text-muted">{c.label}</p>
              </>
            );
            return c.href ? (
              <Link key={c.label} href={c.href} className="rounded-2xl border border-line bg-paper p-5 hover:border-collar">{inner}</Link>
            ) : (
              <div key={c.label} className="rounded-2xl border border-line bg-paper p-5">{inner}</div>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          {pending.length > 0 && (
            <Panel title="Waiting for your review" className="xl:col-span-2" actions={<Link href="/admin/posts?status=PENDING" className="text-sm font-semibold text-collar">See all</Link>}>
              <ul className="divide-y divide-line">
                {pending.map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                    <div className="min-w-0"><Link href={`/admin/posts/${p.id}`} className="font-semibold hover:text-collar">{p.title}</Link><p className="text-sm text-muted">by {p.author_name}, {formatDate(p.updated_at, { month: "short", day: "numeric" })}</p></div>
                    <Link href={`/admin/posts/${p.id}`} className="btn btn-ghost shrink-0 px-4 py-1.5">Review</Link>
                  </li>
                ))}
              </ul>
            </Panel>
          )}
          <Panel title="Recently edited" actions={<Link href="/admin/posts" className="text-sm font-semibold text-collar">All posts</Link>}>
            {recent.length ? (
              <ul className="divide-y divide-line">
                {recent.map((p) => (
                  <li key={p.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                    <div className="min-w-0"><Link href={`/admin/posts/${p.id}`} className="line-clamp-1 font-semibold hover:text-collar">{p.title}</Link><p className="text-sm text-muted">Edited {formatDate(p.updated_at, { month: "short", day: "numeric" })}</p></div>
                    <StatusBadge status={p.status} publishedAt={p.published_at} />
                  </li>
                ))}
              </ul>
            ) : <p className="text-muted">No posts yet. <Link href="/admin/posts/new" className="font-semibold text-collar">Write your first post</Link>.</p>}
          </Panel>
          <Panel title="Most viewed">
            {top.length ? (
              <ol className="divide-y divide-line">
                {top.map((p, i) => (
                  <li key={p.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                    <span className="w-5 text-lg font-extrabold text-collar tabular-nums">{i + 1}</span>
                    <Link href={`/admin/posts/${p.id}`} className="line-clamp-1 flex-1 font-semibold hover:text-collar">{p.title}</Link>
                    <span className="text-sm text-muted tabular-nums">{compactNumber(p.views)} views</span>
                  </li>
                ))}
              </ol>
            ) : <p className="text-muted">Views appear once posts are published and visited.</p>}
          </Panel>
          {!mine && (
            <Panel title="Latest messages" actions={<Link href="/admin/messages" className="text-sm font-semibold text-collar">Inbox</Link>}>
              {messages.length ? (
                <ul className="divide-y divide-line">
                  {messages.map((m) => (
                    <li key={m.id} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                      <div className="min-w-0"><p className={`line-clamp-1 ${m.is_read ? "" : "font-bold"}`}>{m.subject || "(no subject)"}</p><p className="text-sm text-muted">{m.name}</p></div>
                      <span className="shrink-0 text-sm text-muted">{formatDate(m.created_at, { month: "short", day: "numeric" })}</span>
                    </li>
                  ))}
                </ul>
              ) : <p className="text-muted">Messages from the contact form show up here.</p>}
            </Panel>
          )}
        </div>
      </Body>
    </>
  );
}
