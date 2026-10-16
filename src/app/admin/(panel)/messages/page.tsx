import { requireUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { formatDate } from "@/lib/format";
import { Body, Empty, PageHeader } from "@/components/admin/ui";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { deleteMessage, setMessageRead } from "../../_actions/content";

export const metadata = { title: "Messages" };

export default async function MessagesPage() {
  await requireUser(["ADMIN", "EDITOR"]);
  const rows = await query<{ id: number; name: string; email: string; subject: string | null; message: string; is_read: number; created_at: Date }>(
    "SELECT * FROM contact_messages ORDER BY is_read ASC, created_at DESC LIMIT 200",
  );
  return (
    <>
      <PageHeader title="Messages" description="Sent through the contact form. Reply from your own email." />
      <Body narrow>
        {rows.length === 0 ? <Empty title="Inbox is empty" text="New messages from the contact page land here." /> : (
          <ul className="space-y-3">
            {rows.map((m) => (
              <li key={m.id}>
                <details className={`group rounded-2xl border bg-paper ${m.is_read ? "border-line" : "border-collar"}`} open={!m.is_read}>
                  <summary className="flex cursor-pointer list-none items-start justify-between gap-4 p-5">
                    <div className="min-w-0">
                      <p className={`line-clamp-1 ${m.is_read ? "font-medium" : "font-bold"}`}>{m.subject || "(no subject)"}</p>
                      <p className="text-sm text-muted">{m.name}, {m.email}</p>
                    </div>
                    <span className="shrink-0 text-sm text-muted">{formatDate(m.created_at, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}</span>
                  </summary>
                  <div className="border-t border-line px-5 pt-4 pb-5">
                    <p className="font-serif whitespace-pre-wrap text-ink-soft">{m.message}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      <a href={`mailto:${m.email}?subject=${encodeURIComponent("Re: " + (m.subject || "Your message"))}`} className="btn btn-primary py-2">Reply by email</a>
                      <form action={setMessageRead}><input type="hidden" name="id" value={m.id} /><input type="hidden" name="read" value={m.is_read ? "0" : "1"} /><button className="btn btn-ghost py-2">{m.is_read ? "Mark unread" : "Mark read"}</button></form>
                      <form action={deleteMessage}><input type="hidden" name="id" value={m.id} /><ConfirmButton message="Delete this message?" className="btn btn-ghost py-2 text-alert">Delete</ConfirmButton></form>
                    </div>
                  </div>
                </details>
              </li>
            ))}
          </ul>
        )}
      </Body>
    </>
  );
}
