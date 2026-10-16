import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { query, queryOne } from "@/lib/db";
import { can } from "@/lib/permissions";
import { compactNumber, formatDate } from "@/lib/format";
import { Body, Empty, PageHeader, StatusBadge } from "@/components/admin/ui";
import { Pagination } from "@/components/Pagination";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { deletePost, quickSetStatus } from "../../_actions/posts";

export const metadata = { title: "Posts" };
const PER_PAGE = 20;

type Sp = { status?: string; q?: string; category?: string; page?: string; deleted?: string };

export default async function PostsPage({ searchParams }: { searchParams: Promise<Sp> }) {
  const user = await requireUser();
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);
  const where: string[] = [];
  const params: unknown[] = [];
  if (!can.editAnyPost(user)) { where.push("p.author_id = ?"); params.push(user.id); }
  if (sp.status === "SCHEDULED") where.push("p.status = 'PUBLISHED' AND p.published_at > UTC_TIMESTAMP()");
  else if (sp.status && ["DRAFT", "PENDING", "PUBLISHED"].includes(sp.status)) { where.push("p.status = ?"); params.push(sp.status); }
  if (sp.category) { where.push("p.category_id = ?"); params.push(Number(sp.category)); }
  if (sp.q) { where.push("p.title LIKE ?"); params.push(`%${sp.q.replace(/[%_]/g, "")}%`); }
  const w = where.length ? `WHERE ${where.join(" AND ")}` : "";

  const [rows, total, cats, counts] = await Promise.all([
    query<{ id: number; title: string; slug: string; status: string; featured: number; published_at: Date | null; updated_at: Date; views: number; author_name: string; author_id: number; category_name: string | null }>(
      `SELECT p.id, p.title, p.slug, p.status, p.featured, p.published_at, p.updated_at, p.views, p.author_id, u.name AS author_name, c.name AS category_name
       FROM posts p JOIN users u ON u.id = p.author_id LEFT JOIN categories c ON c.id = p.category_id ${w}
       ORDER BY p.updated_at DESC LIMIT ? OFFSET ?`,
      [...params, PER_PAGE, (page - 1) * PER_PAGE],
    ),
    queryOne<{ n: number }>(`SELECT COUNT(*) AS n FROM posts p ${w}`, params),
    query<{ id: number; name: string }>("SELECT id, name FROM categories ORDER BY sort_order, name"),
    queryOne<Record<string, number>>(
      `SELECT COUNT(*) AS all_n, SUM(status='PUBLISHED' AND published_at <= UTC_TIMESTAMP()) AS pub, SUM(status='PUBLISHED' AND published_at > UTC_TIMESTAMP()) AS sch,
       SUM(status='PENDING') AS pen, SUM(status='DRAFT') AS dra FROM posts ${can.editAnyPost(user) ? "" : "WHERE author_id = ?"}`,
      can.editAnyPost(user) ? [] : [user.id],
    ),
  ]);

  const tabs = [
    { key: "", label: "All", n: counts?.all_n },
    { key: "PUBLISHED", label: "Published", n: counts?.pub },
    { key: "SCHEDULED", label: "Scheduled", n: counts?.sch },
    { key: "PENDING", label: "In review", n: counts?.pen },
    { key: "DRAFT", label: "Drafts", n: counts?.dra },
  ];
  const tabHref = (k: string) => {
    const s = new URLSearchParams();
    if (k) s.set("status", k);
    if (sp.q) s.set("q", sp.q);
    if (sp.category) s.set("category", sp.category);
    return `/admin/posts${s.toString() ? `?${s}` : ""}`;
  };

  return (
    <>
      <PageHeader title="Posts" description={can.editAnyPost(user) ? "Every post on the site." : "Posts you've written."} actions={<Link href="/admin/posts/new" className="btn btn-primary"><Plus size={17} />New post</Link>} />
      <Body>
        {sp.deleted && <p className="mb-5 rounded-xl bg-tint-3 px-4 py-3 text-sm font-semibold text-ok" role="status">Post deleted.</p>}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <nav className="-mx-1 flex gap-1 overflow-x-auto px-1" aria-label="Filter by status">
            {tabs.map((t) => {
              const active = (sp.status || "") === t.key;
              return (
                <Link key={t.key} href={tabHref(t.key)} aria-current={active ? "page" : undefined}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-semibold ${active ? "bg-ink text-white" : "bg-paper text-ink-soft hover:bg-line"}`}>
                  {t.label} <span className={active ? "text-white/60" : "text-muted"}>{Number(t.n || 0)}</span>
                </Link>
              );
            })}
          </nav>
          <form className="flex gap-2">
            {sp.status && <input type="hidden" name="status" value={sp.status} />}
            <select name="category" defaultValue={sp.category || ""} className="input w-auto py-2 text-sm" aria-label="Filter by category">
              <option value="">All categories</option>
              {cats.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <div className="relative">
              <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-muted" />
              <input name="q" defaultValue={sp.q} placeholder="Search titles" aria-label="Search titles" className="input w-48 py-2 pl-9 text-sm" />
            </div>
            <button className="btn btn-ghost py-2">Filter</button>
          </form>
        </div>

        <div className="mt-6">
          {rows.length === 0 ? (
            <Empty title="No posts match" text="Try a different filter, or write something new." action={<Link href="/admin/posts/new" className="btn btn-primary">Write a post</Link>} />
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-line bg-paper">
              <table className="w-full min-w-[760px] text-left text-[15px]">
                <thead className="border-b border-line text-sm text-muted">
                  <tr>
                    <th className="px-5 py-3 font-semibold">Title</th>
                    <th className="px-3 py-3 font-semibold">Status</th>
                    <th className="px-3 py-3 font-semibold">Category</th>
                    <th className="px-3 py-3 font-semibold">Date</th>
                    <th className="px-3 py-3 text-right font-semibold">Views</th>
                    <th className="px-5 py-3"><span className="sr-only">Actions</span></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {rows.map((p) => {
                    const editable = can.editPost(user, p.author_id) && (can.publish(user) || p.status !== "PUBLISHED");
                    return (
                      <tr key={p.id} className="align-top hover:bg-fog/50">
                        <td className="px-5 py-3.5">
                          <Link href={`/admin/posts/${p.id}`} className="font-semibold hover:text-collar">{p.title}</Link>
                          {!!p.featured && <span className="ml-2 rounded-full bg-ball px-2 py-0.5 text-xs font-semibold">Featured</span>}
                          <p className="mt-0.5 text-sm text-muted">by {p.author_name}</p>
                        </td>
                        <td className="px-3 py-3.5"><StatusBadge status={p.status} publishedAt={p.published_at} /></td>
                        <td className="px-3 py-3.5 text-ink-soft">{p.category_name || <span className="text-muted">None</span>}</td>
                        <td className="px-3 py-3.5 text-sm whitespace-nowrap text-muted">{formatDate(p.published_at || p.updated_at, { month: "short", day: "numeric", year: "numeric" })}</td>
                        <td className="px-3 py-3.5 text-right text-ink-soft tabular-nums">{compactNumber(p.views)}</td>
                        <td className="px-5 py-3.5">
                          <div className="flex justify-end gap-1.5 whitespace-nowrap">
                            {editable && <Link href={`/admin/posts/${p.id}`} className="rounded-lg px-2.5 py-1 text-sm font-semibold text-collar hover:bg-tint-1">Edit</Link>}
                            {p.status === "PUBLISHED" && <a href={`/blog/${p.slug}`} target="_blank" className="rounded-lg px-2.5 py-1 text-sm font-semibold hover:bg-fog">View</a>}
                            {can.publish(user) && p.status === "PENDING" && (
                              <form action={quickSetStatus}><input type="hidden" name="id" value={p.id} /><input type="hidden" name="status" value="PUBLISHED" /><button className="rounded-lg px-2.5 py-1 text-sm font-semibold text-ok hover:bg-tint-3">Approve</button></form>
                            )}
                            {(can.editAnyPost(user) || (p.author_id === user.id && p.status !== "PUBLISHED")) && (
                              <form action={deletePost}><input type="hidden" name="id" value={p.id} />
                                <ConfirmButton message={`Delete “${p.title}”? This can't be undone.`} className="rounded-lg px-2.5 py-1 text-sm font-semibold text-alert hover:bg-tint-2">Delete</ConfirmButton>
                              </form>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          <Pagination page={page} totalPages={Math.ceil(Number(total?.n || 0) / PER_PAGE)} basePath="/admin/posts" query={{ status: sp.status, q: sp.q, category: sp.category }} />
        </div>
      </Body>
    </>
  );
}
