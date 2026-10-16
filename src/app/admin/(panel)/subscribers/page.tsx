import { Download, Search } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { query, queryOne } from "@/lib/db";
import { formatDate } from "@/lib/format";
import { Body, Empty, PageHeader, Panel } from "@/components/admin/ui";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { AddSubscriber } from "@/components/admin/AddSubscriber";
import { Pagination } from "@/components/Pagination";
import { deleteSubscriber, toggleSubscriber } from "../../_actions/content";

export const metadata = { title: "Subscribers" };
const PER_PAGE = 50;

export default async function SubscribersPage({ searchParams }: { searchParams: Promise<{ q?: string; page?: string }> }) {
  await requireUser(["ADMIN", "EDITOR"]);
  const sp = await searchParams;
  const page = Math.max(1, Number(sp.page) || 1);
  const w = sp.q ? "WHERE email LIKE ?" : "";
  const p = sp.q ? [`%${sp.q.replace(/[%_]/g, "")}%`] : [];
  const [rows, total, stats] = await Promise.all([
    query<{ id: number; email: string; active: number; source: string | null; created_at: Date }>(`SELECT * FROM subscribers ${w} ORDER BY created_at DESC LIMIT ? OFFSET ?`, [...p, PER_PAGE, (page - 1) * PER_PAGE]),
    queryOne<{ n: number }>(`SELECT COUNT(*) AS n FROM subscribers ${w}`, p),
    queryOne<{ active: number; inactive: number }>("SELECT SUM(active=1) AS active, SUM(active=0) AS inactive FROM subscribers"),
  ]);
  return (
    <>
      <PageHeader
        title="Subscribers"
        description={`${Number(stats?.active || 0)} active, ${Number(stats?.inactive || 0)} unsubscribed. Export the list to import into Mailchimp, Brevo, ConvertKit or another email service.`}
        actions={<a href="/api/admin/subscribers" className="btn btn-ghost"><Download size={17} />Export CSV</a>}
      />
      <Body>
        <div className="grid gap-6 xl:grid-cols-[1fr_340px]">
          <div>
            <form className="relative mb-4 max-w-sm">
              <Search size={16} className="absolute top-1/2 left-3 -translate-y-1/2 text-muted" />
              <input name="q" defaultValue={sp.q} placeholder="Search emails" aria-label="Search emails" className="input py-2 pl-9 text-sm" />
            </form>
            {rows.length === 0 ? <Empty title="No subscribers yet" text="People who sign up through the newsletter forms appear here." /> : (
              <div className="overflow-x-auto rounded-2xl border border-line bg-paper">
                <table className="w-full min-w-[560px] text-left text-[15px]">
                  <thead className="border-b border-line text-sm text-muted"><tr><th className="px-5 py-3">Email</th><th className="px-3 py-3">Signed up from</th><th className="px-3 py-3">Date</th><th className="px-5 py-3"><span className="sr-only">Actions</span></th></tr></thead>
                  <tbody className="divide-y divide-line">
                    {rows.map((r) => (
                      <tr key={r.id}>
                        <td className="px-5 py-3"><span className={r.active ? "" : "text-muted line-through"}>{r.email}</span></td>
                        <td className="px-3 py-3 text-sm text-muted">{r.source || "site"}</td>
                        <td className="px-3 py-3 text-sm text-muted">{formatDate(r.created_at, { month: "short", day: "numeric", year: "numeric" })}</td>
                        <td className="px-5 py-3">
                          <div className="flex justify-end gap-1">
                            <form action={toggleSubscriber}><input type="hidden" name="id" value={r.id} /><button className="rounded-lg px-2.5 py-1 text-sm font-semibold hover:bg-fog">{r.active ? "Unsubscribe" : "Resubscribe"}</button></form>
                            <form action={deleteSubscriber}><input type="hidden" name="id" value={r.id} /><ConfirmButton message={`Remove ${r.email} permanently?`} className="rounded-lg px-2.5 py-1 text-sm font-semibold text-alert hover:bg-tint-2">Delete</ConfirmButton></form>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <Pagination page={page} totalPages={Math.ceil(Number(total?.n || 0) / PER_PAGE)} basePath="/admin/subscribers" query={{ q: sp.q }} />
          </div>
          <Panel title="Add a subscriber" className="xl:self-start"><AddSubscriber /></Panel>
        </div>
      </Body>
    </>
  );
}
