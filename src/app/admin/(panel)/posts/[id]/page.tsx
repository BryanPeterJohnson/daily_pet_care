import { notFound, redirect } from "next/navigation";
import { requireUser } from "@/lib/auth";
import { query, queryOne } from "@/lib/db";
import { can } from "@/lib/permissions";
import { siteUrl } from "@/lib/format";
import { Body, PageHeader } from "@/components/admin/ui";
import { PostForm } from "@/components/admin/PostForm";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { deletePost } from "../../../_actions/posts";

export const metadata = { title: "Edit post" };

export default async function EditPostPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ saved?: string }> }) {
  const user = await requireUser();
  const [{ id }, { saved }] = await Promise.all([params, searchParams]);
  const post = await queryOne<{
    id: number; title: string; slug: string; excerpt: string | null; content: string; cover_image: string | null; cover_alt: string | null;
    status: "DRAFT" | "PENDING" | "PUBLISHED"; featured: number; meta_title: string | null; meta_description: string | null;
    published_at: Date | null; category_id: number | null; author_id: number;
  }>("SELECT * FROM posts WHERE id = ?", [Number(id)]);
  if (!post) notFound();
  if (!can.editPost(user, post.author_id)) redirect("/admin/posts");
  const [categories, tags] = await Promise.all([
    query<{ id: number; name: string }>("SELECT id, name FROM categories ORDER BY sort_order, name"),
    query<{ name: string }>("SELECT t.name FROM tags t JOIN post_tags pt ON pt.tag_id = t.id WHERE pt.post_id = ? ORDER BY t.name", [post.id]),
  ]);
  const canDelete = can.editAnyPost(user) || post.status !== "PUBLISHED";

  return (
    <>
      <PageHeader
        title="Edit post"
        back={{ href: "/admin/posts", label: "Posts" }}
        actions={canDelete ? (
          <form action={deletePost}><input type="hidden" name="id" value={post.id} />
            <ConfirmButton message="Delete this post permanently?" className="btn btn-ghost text-alert">Delete post</ConfirmButton>
          </form>
        ) : undefined}
      />
      <Body>
        <PostForm
          key={post.id}
          canPublish={can.publish(user)}
          categories={categories}
          siteUrl={siteUrl()}
          savedMessage={saved}
          post={{
            id: post.id, title: post.title, slug: post.slug, excerpt: post.excerpt || "", content: post.content,
            cover_image: post.cover_image, cover_alt: post.cover_alt, status: post.status, featured: !!post.featured,
            meta_title: post.meta_title || "", meta_description: post.meta_description || "",
            published_at: post.published_at ? new Date(post.published_at).toISOString() : null,
            category_id: post.category_id, tags: tags.map((t) => t.name).join(", "),
          }}
        />
      </Body>
    </>
  );
}
