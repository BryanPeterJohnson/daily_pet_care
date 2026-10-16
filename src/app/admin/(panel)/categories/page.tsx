import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { Body, PageHeader, Panel } from "@/components/admin/ui";
import { CategoryForm, EditCategory } from "@/components/admin/CategoryForm";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { deleteCategory } from "../../_actions/content";

export const metadata = { title: "Categories" };

export default async function CategoriesPage() {
  await requireUser(["ADMIN", "EDITOR"]);
  const cats = await query<{ id: number; name: string; slug: string; description: string | null; image: string | null; sort_order: number; n: number }>(
    "SELECT c.*, (SELECT COUNT(*) FROM posts p WHERE p.category_id = c.id) AS n FROM categories c ORDER BY c.sort_order, c.name",
  );
  return (
    <>
      <PageHeader title="Categories" description="Topics that organize your posts and appear in the site menu." />
      <Body>
        <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
          <Panel title={`${cats.length} categories`}>
            <ul className="divide-y divide-line">
              {cats.map((c) => (
                <li key={c.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-semibold">{c.name} <span className="font-normal text-muted">/{c.slug}</span></p>
                      {c.description && <p className="mt-0.5 line-clamp-2 text-sm text-muted">{c.description}</p>}
                      <Link href={`/admin/posts?category=${c.id}`} className="mt-1 inline-block text-sm text-collar">{c.n} {Number(c.n) === 1 ? "post" : "posts"}</Link>
                    </div>
                    <form action={deleteCategory} className="shrink-0">
                      <input type="hidden" name="id" value={c.id} />
                      <ConfirmButton message={`Delete “${c.name}”? Its posts stay published without a category.`} className="rounded-lg px-2.5 py-1 text-sm font-semibold text-alert hover:bg-tint-2">Delete</ConfirmButton>
                    </form>
                  </div>
                  <EditCategory category={c} />
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Add a category" className="xl:self-start"><CategoryForm /></Panel>
        </div>
      </Body>
    </>
  );
}
