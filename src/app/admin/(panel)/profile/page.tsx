import { requireUser } from "@/lib/auth";
import { queryOne } from "@/lib/db";
import { ROLE_LABELS } from "@/lib/permissions";
import { Body, PageHeader, Panel } from "@/components/admin/ui";
import { PasswordForm, ProfileForm } from "@/components/admin/ProfileForms";
import { logout } from "../../_actions/auth";

export const metadata = { title: "My profile" };

export default async function ProfilePage() {
  const me = await requireUser();
  const u = await queryOne<{ name: string; bio: string | null; avatar: string | null }>("SELECT name, bio, avatar FROM users WHERE id = ?", [me.id]);
  return (
    <>
      <PageHeader title="My profile" description={`${me.email}, ${ROLE_LABELS[me.role]}`} actions={<form action={logout}><button className="btn btn-ghost">Sign out</button></form>} />
      <Body>
        <div className="grid max-w-5xl gap-6 lg:grid-cols-2">
          <Panel title="Public author profile"><ProfileForm name={u?.name || ""} bio={u?.bio || null} avatar={u?.avatar || null} /></Panel>
          <Panel title="Password" className="lg:self-start"><PasswordForm /></Panel>
        </div>
      </Body>
    </>
  );
}
