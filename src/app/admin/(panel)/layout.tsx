import { requireUser } from "@/lib/auth";
import { queryOne } from "@/lib/db";
import { getSettings } from "@/lib/settings";
import { AdminNav } from "@/components/admin/AdminNav";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  const [s, counts] = await Promise.all([
    getSettings(),
    queryOne<{ pending: number; unread: number }>(
      "SELECT (SELECT COUNT(*) FROM posts WHERE status = 'PENDING') AS pending, (SELECT COUNT(*) FROM contact_messages WHERE is_read = 0) AS unread",
    ),
  ]);
  return (
    <AdminNav role={user.role} siteName={s.site_name} pending={Number(counts?.pending || 0)} unread={user.role === "AUTHOR" ? 0 : Number(counts?.unread || 0)}>
      {children}
    </AdminNav>
  );
}
