"use client";

import { keepFormSubmit } from "@/components/useKeepFormSubmit";
import { useActionState } from "react";
import { sendContact, type FormState } from "@/app/actions";

export function ContactForm() {
  const [state, action, pending] = useActionState<FormState, FormData>(sendContact, null);
  if (state?.ok) return <p className="rounded-2xl bg-ball px-5 py-4 text-lg font-semibold" role="status">{state.message}</p>;
  return (
    <form onSubmit={keepFormSubmit(action)} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div><label htmlFor="c-name" className="label">Your name</label><input id="c-name" name="name" required minLength={2} autoComplete="name" className="input" /></div>
        <div><label htmlFor="c-email" className="label">Email</label><input id="c-email" name="email" type="email" required autoComplete="email" className="input" /></div>
      </div>
      <div><label htmlFor="c-subject" className="label">Subject <span className="font-normal text-muted">(optional)</span></label><input id="c-subject" name="subject" className="input" /></div>
      <div><label htmlFor="c-message" className="label">Message</label><textarea id="c-message" name="message" rows={6} required minLength={10} className="input" /></div>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      {state && !state.ok && <p className="text-sm font-medium text-alert" role="alert">{state.message}</p>}
      <button className="btn btn-primary px-7" disabled={pending}>{pending ? "Sending…" : "Send message"}</button>
    </form>
  );
}
