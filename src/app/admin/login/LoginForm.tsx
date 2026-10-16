"use client";

import { keepFormSubmit } from "@/components/useKeepFormSubmit";
import { useActionState, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { login, type LoginState } from "../_actions/auth";

export function LoginForm({ next }: { next?: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, null);
  const [show, setShow] = useState(false);
  return (
    <form onSubmit={keepFormSubmit(action)} className="space-y-5">
      <input type="hidden" name="next" value={next || ""} />
      <div>
        <label htmlFor="email" className="label">Email</label>
        <input id="email" name="email" type="email" required autoComplete="username" autoFocus className="input" />
      </div>
      <div>
        <label htmlFor="password" className="label">Password</label>
        <div className="relative">
          <input id="password" name="password" type={show ? "text" : "password"} required autoComplete="current-password" className="input pr-11" />
          <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"}
            className="absolute top-1/2 right-2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-muted hover:bg-fog">
            {show ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>
      </div>
      {state?.error && <p className="rounded-xl bg-tint-2 px-4 py-3 text-sm font-medium text-alert" role="alert">{state.error}</p>}
      <button className="btn btn-ink w-full py-3" disabled={pending}>{pending ? "Signing in…" : "Sign in"}</button>
    </form>
  );
}
