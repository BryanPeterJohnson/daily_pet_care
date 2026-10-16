import { requireUser } from "@/lib/auth";
import { query } from "@/lib/db";
import { can } from "@/lib/permissions";
import { siteUrl } from "@/lib/format";
import { Body, PageHeader } from "@/components/admin/ui";
import { PostForm } from "@/components/admin/PostForm";

export const metadata = { title: "New post" };

export default async function NewPostPage() {
  const user = await requireUser();
  const categories = await query<{ id: number; name: string }>("SELECT id, name FROM categories ORDER BY sort_order, name");
  return (
    <>
      <PageHeader title="New post" back={{ href: "/admin/posts", label: "Posts" }} />
      <Body>
        <PostForm
          canPublish={can.publish(user)}
          categories={categories}
          siteUrl={siteUrl()}
          post={{ title: "", slug: "", excerpt: "", content: "", cover_image: null, cover_alt: null, status: "DRAFT", featured: false, meta_title: "", meta_description: "", published_at: null, category_id: null, tags: "" }}
        />
      </Body>
    </>
  );
}
