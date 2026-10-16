import { getCurrentUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { can } from "@/lib/permissions";

export async function GET() {
  const user = await getCurrentUser();
  if (!user || !can.manageSubscribers(user)) return new Response("Forbidden", { status: 403 });
  const rows = await query<{ email: string; active: number; source: string | null; created_at: Date }>(
    "SELECT email, active, source, created_at FROM subscribers ORDER BY created_at DESC",
  );
  const esc = (v: string) => `"${v.replace(/"/g, '""')}"`;
  const csv = ["email,status,source,subscribed_at", ...rows.map((r) =>
    [esc(r.email), r.active ? "active" : "unsubscribed", esc(r.source || ""), new Date(r.created_at).toISOString()].join(","),
  )].join("\n");
  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="subscribers-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
