import Link from "next/link";
import { Plus } from "lucide-react";
import { requireUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { ROLE_LABELS } from "@/lib/permissions";
import { formatDate } from "@/lib/format";
import { Body, PageHeader } from "@/components/admin/ui";
import { Avatar } from "@/components/Avatar";
import type { Role } from "@/lib/types";

export const metadata = { title: "Users" };

export default async function UsersPage() {
  await requireUser(["ADMIN"]);
  const users = await query<{ id: number; name: string; email: string; role: Role; avatar: string | null; active: number; last_login_at: Date | null; n: number }>(
    "SELECT u.*, (SELECT COUNT(*) FROM posts p WHERE p.author_id = u.id) AS n FROM users u ORDER BY FIELD(u.role,'ADMIN','EDITOR','AUTHOR'), u.name",
  );
  return (
    <>
      <PageHeader title="Users" description="Invite writers and editors, and control what each person can do." actions={<Link href="/admin/users/new" className="btn btn-primary"><Plus size={17} />Add user</Link>} />
      <Body>
        <div className="overflow-x-auto rounded-2xl border border-line bg-paper">
          <table className="w-full min-w-[640px] text-left text-[15px]">
            <thead className="border-b border-line text-sm text-muted"><tr><th className="px-5 py-3">Name</th><th className="px-3 py-3">Role</th><th className="px-3 py-3">Posts</th><th className="px-3 py-3">Last sign-in</th><th className="px-5 py-3"><span className="sr-only">Actions</span></th></tr></thead>
            <tbody className="divide-y divide-line">
              {users.map((u) => (
                <tr key={u.id} className={u.active ? "" : "opacity-60"}>
                  <td className="px-5 py-3"><div className="flex items-center gap-3"><Avatar name={u.name} src={u.avatar} size={36} /><div><p className="font-semibold">{u.name}{!u.active && <span className="ml-2 text-xs text-alert">Disabled</span>}</p><p className="text-sm text-muted">{u.email}</p></div></div></td>
                  <td className="px-3 py-3">{ROLE_LABELS[u.role]}</td>
                  <td className="px-3 py-3 tabular-nums">{u.n}</td>
                  <td className="px-3 py-3 text-sm text-muted">{u.last_login_at ? formatDate(u.last_login_at, { month: "short", day: "numeric", year: "numeric" }) : "Never"}</td>
                  <td className="px-5 py-3 text-right"><Link href={`/admin/users/${u.id}`} className="rounded-lg px-2.5 py-1 text-sm font-semibold text-collar hover:bg-tint-1">Edit</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Body>
    </>
  );
}
