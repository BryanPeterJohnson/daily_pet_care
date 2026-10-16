"use client";

import { keepFormSubmit } from "@/components/useKeepFormSubmit";
import { useActionState, useEffect, useRef } from "react";
import { addSubscriber } from "@/app/admin/_actions/content";
import type { ActionResult } from "@/app/admin/_actions/common";
import { FormMessage } from "./FormMessage";

export function AddSubscriber() {
  const [state, action, pending] = useActionState<ActionResult, FormData>(addSubscriber, null);
  const ref = useRef<HTMLFormElement>(null);
  useEffect(() => { if (state?.ok) ref.current?.reset(); }, [state]);
  return (
    <form ref={ref} onSubmit={keepFormSubmit(action)} className="space-y-3">
      <div className="flex gap-2">
        <label htmlFor="add-sub" className="sr-only">Email</label>
        <input id="add-sub" name="email" type="email" required placeholder="name@example.com" className="input" />
        <button className="btn btn-ink shrink-0" disabled={pending}>Add</button>
      </div>
      <FormMessage state={state} />
    </form>
  );
}
