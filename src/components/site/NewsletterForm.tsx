"use client";

import { keepFormSubmit } from "@/components/useKeepFormSubmit";
import { useActionState } from "react";
import { subscribe, type FormState } from "@/app/actions";

export function NewsletterForm({ source = "site", dark = false }: { source?: string; dark?: boolean }) {
  const [state, action, pending] = useActionState<FormState, FormData>(subscribe, null);
  if (state?.ok) {
    return <p className={`rounded-2xl px-4 py-3 font-semibold ${dark ? "bg-white/10" : "bg-white"}`} role="status">{state.message}</p>;
  }
  return (
    <form onSubmit={keepFormSubmit(action)} className="w-full">
      <div className="flex flex-col gap-2 sm:flex-row">
        <label htmlFor={`nl-${source}`} className="sr-only">Email address</label>
        <input id={`nl-${source}`} name="email" type="email" required autoComplete="email" placeholder="you@example.com" className="input flex-1 rounded-full px-5" />
        <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
        <input type="hidden" name="source" value={source} />
        <button className={`btn ${dark ? "btn-ball" : "btn-ink"} px-6`} disabled={pending}>{pending ? "Subscribing…" : "Subscribe"}</button>
      </div>
      {state && !state.ok && <p className="mt-2 text-sm font-medium text-alert" role="alert">{state.message}</p>}
    </form>
  );
}
