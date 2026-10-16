"use client";

import { keepFormSubmit } from "@/components/useKeepFormSubmit";
import { useActionState } from "react";
import { saveUser } from "@/app/admin/_actions/users";
import type { ActionResult } from "@/app/admin/_actions/common";
import { ROLE_DESCRIPTIONS, ROLE_LABELS } from "@/lib/permissions";
import type { Role } from "@/lib/types";
import { FormMessage } from "./FormMessage";
import { ImageField } from "./ImageField";

type U = { id?: number; name: string; email: string; role: Role; bio: string | null; avatar: string | null; active: boolean };

export function UserForm({ user, saved }: { user: U; saved?: boolean }) {
  const [state, action, pending] = useActionState<ActionResult, FormData>(saveUser, saved ? { ok: true, message: "User created." } : null);
  return (
    <form onSubmit={keepFormSubmit(action)} className="space-y-5">
      {user.id && <input type="hidden" name="id" value={user.id} />}
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label htmlFor="u-name" className="label">Full name</label><input id="u-name" name="name" required defaultValue={user.name} className="input" /></div>
        <div><label htmlFor="u-email" className="label">Email</label><input id="u-email" name="email" type="email" required defaultValue={user.email} className="input" /></div>
      </div>
      <fieldset>
        <legend className="label">Role</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {(["AUTHOR", "EDITOR", "ADMIN"] as Role[]).map((r) => (
            <label key={r} className="flex cursor-pointer gap-3 rounded-xl border border-line p-3 has-[:checked]:border-collar has-[:checked]:bg-tint-1">
              <input type="radio" name="role" value={r} defaultChecked={user.role === r} className="mt-1 accent-collar" />
              <span><span className="font-semibold">{ROLE_LABELS[r]}</span><br /><span className="text-sm text-muted">{ROLE_DESCRIPTIONS[r]}</span></span>
            </label>
          ))}
        </div>
      </fieldset>
      <div>
        <label htmlFor="u-pass" className="label">{user.id ? "Set a new password" : "Password"}</label>
        <input id="u-pass" name="password" type="password" minLength={10} autoComplete="new-password" required={!user.id} className="input" placeholder={user.id ? "Leave empty to keep the current password" : "At least 10 characters"} />
        <p className="hint">Share it with the person securely and ask them to change it from My profile.</p>
      </div>
      <div><label htmlFor="u-bio" className="label">Author bio</label><textarea id="u-bio" name="bio" rows={3} defaultValue={user.bio || ""} className="input" placeholder="Shown under their posts. Mention relevant experience, e.g. “Certified professional groomer with 10 years in Austin, TX.”" /></div>
      <div className="max-w-xs"><ImageField name="avatar" label="Photo" defaultValue={user.avatar} /></div>
      <label className="flex items-center gap-3 text-[15px]">
        <input type="checkbox" name="active" value="1" defaultChecked={user.active} className="h-4 w-4 accent-collar" />
        Account active (unchecked users can't sign in)
      </label>
      <FormMessage state={state} />
      <button className="btn btn-primary" disabled={pending}>{pending ? "Saving…" : user.id ? "Save user" : "Create user"}</button>
    </form>
  );
}
