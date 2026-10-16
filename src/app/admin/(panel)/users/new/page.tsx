import { requireUser } from "@/lib/auth";
import { Body, PageHeader, Panel } from "@/components/admin/ui";
import { UserForm } from "@/components/admin/UserForm";

export const metadata = { title: "Add user" };

export default async function NewUserPage() {
  await requireUser(["ADMIN"]);
  return (
    <>
      <PageHeader title="Add user" back={{ href: "/admin/users", label: "Users" }} />
      <Body narrow><Panel><UserForm user={{ name: "", email: "", role: "AUTHOR", bio: null, avatar: null, active: true }} /></Panel></Body>
    </>
  );
}
