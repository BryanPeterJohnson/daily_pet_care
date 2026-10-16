"use client";

import { keepFormSubmit } from "@/components/useKeepFormSubmit";
import { useActionState, useEffect, useRef } from "react";
import { saveCategory } from "@/app/admin/_actions/content";
import type { ActionResult } from "@/app/admin/_actions/common";
import { FormMessage } from "./FormMessage";
import { ImageField } from "./ImageField";

type Cat = { id: number; name: string; slug: string; description: string | null; image: string | null; sort_order: number };

export function CategoryForm({ category, onDone }: { category?: Cat; onDone?: () => void }) {
  const [state, action, pending] = useActionState<ActionResult, FormData>(saveCategory, null);
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (state?.ok) { if (!category) ref.current?.reset(); onDone?.(); }
  }, [state, category, onDone]);
  return (
    <form ref={ref} onSubmit={keepFormSubmit(action)} className="space-y-4">
      {category && <input type="hidden" name="id" value={category.id} />}
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label className="label" htmlFor={`n-${category?.id ?? "new"}`}>Name</label><input id={`n-${category?.id ?? "new"}`} name="name" required defaultValue={category?.name} className="input" /></div>
        <div><label className="label" htmlFor={`s-${category?.id ?? "new"}`}>URL slug</label><input id={`s-${category?.id ?? "new"}`} name="slug" defaultValue={category?.slug} placeholder="Generated from name" className="input" /></div>
      </div>
      <div><label className="label" htmlFor={`d-${category?.id ?? "new"}`}>Description</label><textarea id={`d-${category?.id ?? "new"}`} name="description" rows={2} defaultValue={category?.description || ""} className="input" placeholder="Shown at the top of the category page and in search results." /></div>
      <div className="grid gap-4 sm:grid-cols-[1fr_140px]">
        <ImageField name="image" label="Image (optional)" defaultValue={category?.image} />
        <div><label className="label" htmlFor={`o-${category?.id ?? "new"}`}>Menu order</label><input id={`o-${category?.id ?? "new"}`} name="sortOrder" type="number" min={0} defaultValue={category?.sort_order ?? 0} className="input" /><p className="hint">Lower numbers appear first.</p></div>
      </div>
      <FormMessage state={state} />
      <button className="btn btn-primary" disabled={pending}>{pending ? "Saving…" : category ? "Save category" : "Add category"}</button>
    </form>
  );
}

export function EditCategory({ category }: { category: Cat }) {
  return (
    <details className="group">
      <summary className="cursor-pointer list-none rounded-lg px-2.5 py-1 text-sm font-semibold text-collar hover:bg-tint-1">Edit</summary>
      <div className="mt-4 rounded-xl bg-fog p-4"><CategoryForm category={category} /></div>
    </details>
  );
}
