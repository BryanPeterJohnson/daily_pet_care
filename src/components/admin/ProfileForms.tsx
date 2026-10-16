"use client";

import { keepFormSubmit } from "@/components/useKeepFormSubmit";
import { useActionState, useEffect, useRef } from "react";
import { changePassword, saveProfile } from "@/app/admin/_actions/users";
import type { ActionResult } from "@/app/admin/_actions/common";
import { FormMessage } from "./FormMessage";
import { ImageField } from "./ImageField";

export function ProfileForm({ name, bio, avatar }: { name: string; bio: string | null; avatar: string | null }) {
  const [state, action, pending] = useActionState<ActionResult, FormData>(saveProfile, null);
  return (
    <form onSubmit={keepFormSubmit(action)} className="space-y-4">
      <div><label htmlFor="p-name" className="label">Display name</label><input id="p-name" name="name" required defaultValue={name} className="input" /></div>
      <div><label htmlFor="p-bio" className="label">Bio</label><textarea id="p-bio" name="bio" rows={3} defaultValue={bio || ""} className="input" placeholder="A sentence or two about your pet care experience. Readers and Google both look for this." /></div>
      <div className="max-w-xs"><ImageField name="avatar" label="Photo" defaultValue={avatar} /></div>
      <FormMessage state={state} />
      <button className="btn btn-primary" disabled={pending}>{pending ? "Saving…" : "Save profile"}</button>
    </form>
  );
}

export function PasswordForm() {
  const [state, action, pending] = useActionState<ActionResult, FormData>(changePassword, null);
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => { if (state?.ok) ref.current?.reset(); }, [state]);
  return (
    <form ref={ref} onSubmit={keepFormSubmit(action)} className="space-y-4">
      <div><label htmlFor="pw-c" className="label">Current password</label><input id="pw-c" name="current" type="password" required autoComplete="current-password" className="input" /></div>
      <div><label htmlFor="pw-n" className="label">New password</label><input id="pw-n" name="next" type="password" required minLength={10} autoComplete="new-password" className="input" /><p className="hint">At least 10 characters.</p></div>
      <div><label htmlFor="pw-r" className="label">Repeat new password</label><input id="pw-r" name="confirm" type="password" required minLength={10} autoComplete="new-password" className="input" /></div>
      <FormMessage state={state} />
      <button className="btn btn-ink" disabled={pending}>{pending ? "Changing…" : "Change password"}</button>
    </form>
  );
}
