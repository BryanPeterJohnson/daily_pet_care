"use client";

import { useActionState } from "react";
import { keepFormSubmit } from "@/components/useKeepFormSubmit";
import { runSetup, type SetupState } from "./actions";

export function SetupForm() {
  const [state, action, pending] = useActionState<SetupState, FormData>(runSetup, null);
  return (
    <form onSubmit={keepFormSubmit(action)} className="space-y-4">
      <div><label htmlFor="s-name" className="label">Your name</label><input id="s-name" name="name" required className="input" autoComplete="name" /></div>
      <div><label htmlFor="s-email" className="label">Email</label><input id="s-email" name="email" type="email" required className="input" autoComplete="username" /></div>
      <div><label htmlFor="s-pass" className="label">Password</label><input id="s-pass" name="password" type="password" required minLength={10} className="input" autoComplete="new-password" /><p className="hint">At least 10 characters.</p></div>
      <div><label htmlFor="s-confirm" className="label">Repeat password</label><input id="s-confirm" name="confirm" type="password" required minLength={10} className="input" autoComplete="new-password" /></div>
      <label className="flex items-start gap-3 rounded-xl bg-fog p-3 text-sm">
        <input type="checkbox" name="starter" value="1" defaultChecked className="mt-0.5 h-4 w-4 accent-collar" />
        <span><strong>Add starter content</strong><br /><span className="text-muted">8 categories plus 24 ready-to-publish U.S. pet care articles (15 SEO guides) you can edit or delete.</span></span>
      </label>
      {state?.error && <p className="rounded-xl bg-tint-2 px-4 py-3 text-sm font-medium text-alert" role="alert">{state.error}</p>}
      <button className="btn btn-ink w-full py-3" disabled={pending}>{pending ? "Installing…" : "Install and create admin account"}</button>
    </form>
  );
}
