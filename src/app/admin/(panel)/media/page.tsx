import { requireUser } from "@/lib/auth";
import { query, queryOne } from "@/lib/db";
import { can } from "@/lib/permissions";
import { formatDate } from "@/lib/format";
import { Body, Empty, PageHeader } from "@/components/admin/ui";
import { CopyUrl, MediaUploader } from "@/components/admin/MediaUploader";
import { ConfirmButton } from "@/components/admin/ConfirmButton";
import { Pagination } from "@/components/Pagination";
import { deleteMedia, updateMediaAlt } from "../../_actions/content";

export const metadata = { title: "Media library" };
const PER_PAGE = 30;

export default async function MediaPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const user = await requireUser();
  const page = Math.max(1, Number((await searchParams).page) || 1);
  const [items, total] = await Promise.all([
    query<{ id: number; url: string; filename: string; size: number; alt: string | null; created_at: Date }>(
      "SELECT id, url, filename, size, alt, created_at FROM media ORDER BY created_at DESC LIMIT ? OFFSET ?", [PER_PAGE, (page - 1) * PER_PAGE]),
    queryOne<{ n: number }>("SELECT COUNT(*) AS n FROM media"),
  ]);
  return (
    <>
      <PageHeader title="Media library" description="JPG, PNG, WebP, GIF or AVIF up to 5 MB. Compress large photos before uploading to keep pages fast." actions={<MediaUploader />} />
      <Body>
        {items.length === 0 ? (
          <Empty title="No images yet" text="Upload photos here, or straight from the post editor." />
        ) : (
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
            {items.map((m) => (
              <li key={m.id} className="overflow-hidden rounded-2xl border border-line bg-paper">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.url} alt={m.alt || ""} loading="lazy" className="aspect-[4/3] w-full bg-fog object-cover" />
                <div className="p-3">
                  <p className="truncate text-sm font-semibold" title={m.filename}>{m.filename}</p>
                  <p className="text-xs text-muted">{Math.round(m.size / 1024)} KB, {formatDate(m.created_at, { month: "short", day: "numeric" })}</p>
                  <form action={updateMediaAlt} className="mt-2 flex gap-1">
                    <input type="hidden" name="id" value={m.id} />
                    <input name="alt" defaultValue={m.alt || ""} placeholder="Alt text" aria-label="Alt text" className="input px-2 py-1 text-xs" />
                    <button className="rounded-lg bg-fog px-2 text-xs font-semibold hover:bg-line">Save</button>
                  </form>
                  <div className="mt-2 flex justify-between">
                    <CopyUrl url={m.url} />
                    {can.manageCategories(user) && (
                      <form action={deleteMedia}><input type="hidden" name="id" value={m.id} />
                        <ConfirmButton message="Delete this image? Posts using it will show a broken image." className="rounded-lg px-2 py-1 text-xs font-semibold text-alert hover:bg-tint-2">Delete</ConfirmButton>
                      </form>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        <Pagination page={page} totalPages={Math.ceil(Number(total?.n || 0) / PER_PAGE)} basePath="/admin/media" />
      </Body>
    </>
  );
}
