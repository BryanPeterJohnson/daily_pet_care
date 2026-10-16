"use server";

import { requireUser } from "@/lib/auth";
import { getPool } from "@/lib/db";
import { ARTICLE_PACK, importArticles } from "@/lib/article-pack";
import { refreshSite, type ActionResult } from "./common";

export async function importArticlePack(_prev: ActionResult, _fd: FormData): Promise<ActionResult> {
  const me = await requireUser(["ADMIN"]);
  try {
    const { added } = await importArticles(getPool(), me.id, ARTICLE_PACK);
    refreshSite();
    return added
      ? { ok: true, message: `Added ${added} ${added === 1 ? "article" : "articles"}. They're live now — review them in Posts.` }
      : { ok: true, message: "All articles from the pack are already on your site." };
  } catch (e) {
    console.error(e);
    return { ok: false, message: "Couldn't import the articles. Check the server logs." };
  }
}
