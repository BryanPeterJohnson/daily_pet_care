import { requireUser } from "@/lib/auth";
import { getSettings } from "@/lib/settings";
import { Body, PageHeader } from "@/components/admin/ui";
import { SettingsForm } from "@/components/admin/SettingsForm";
import { ArticlePackPanel } from "@/components/admin/ArticlePackPanel";
import { ARTICLE_PACK, missingSlugs } from "@/lib/article-pack";
import { getPool } from "@/lib/db";

export const metadata = { title: "Site settings" };

export default async function SettingsPage() {
  await requireUser(["ADMIN"]);
  const missing = await missingSlugs(getPool());
  const missingTitles = ARTICLE_PACK.filter((a) => missing.includes(a.slug)).map((a) => a.title);
  return (
    <>
      <PageHeader title="Site settings" description="Changes appear on the live site within a few seconds." />
      <Body><div className="max-w-5xl space-y-6"><ArticlePackPanel total={ARTICLE_PACK.length} missing={missing.length} titles={missingTitles} /><SettingsForm settings={await getSettings()} /></div></Body>
    </>
  );
}
