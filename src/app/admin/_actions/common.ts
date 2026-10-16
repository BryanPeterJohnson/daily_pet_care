import { revalidatePath } from "next/cache";

export type ActionResult = { ok: boolean; message: string; id?: number } | null;

/** Refresh every cached public page after content changes. */
export function refreshSite() {
  revalidatePath("/", "layout");
}

export function fail(message: string): ActionResult {
  return { ok: false, message };
}

export function isDuplicate(e: unknown) {
  return (e as { code?: string })?.code === "ER_DUP_ENTRY";
}
