import { notFound } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { queryOne } from "@/lib/db";
import { Body, PageHeader, Panel } from "@/components/admin/ui";
import { UserForm } from "@/components/admin/UserForm";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { deleteUser } from "../../../_actions/users";
import type { Role } from "@/lib/types";

export const metadata = { title: "Edit user" };

export default async function EditUserPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  const me = await requireUser(["ADMIN"]);
  const [{ id }, { saved }] = await Promise.all([params, searchParams]);
  const u = await queryOne<{ id: number; name: string; email: string; role: Role; bio: string | null; avatar: string | null; active: number }>(
    "SELECT id, name, email, role, bio, avatar, active FROM users WHERE id = ?", [Number(id)]);
  if (!u) notFound();
  return (
    <>
      <PageHeader title={u.name} back={{ href: "/admin/users", label: "Users" }}
        actions={u.id !== me.id ? (
          <form action={deleteUser}><input type="hidden" name="id" value={u.id} />
            <ConfirmButton message={`Delete ${u.name}? Their posts will be reassigned to you.`} className="btn btn-ghost text-alert">Delete user</ConfirmButton>
          </form>
        ) : undefined} />
      <Body narrow><Panel><UserForm key={u.id} saved={!!saved} user={{ ...u, active: !!u.active }} /></Panel></Body>
    </>
  );
}
