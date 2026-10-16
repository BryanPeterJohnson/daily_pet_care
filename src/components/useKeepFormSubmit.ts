"use client";

import { startTransition, type FormEvent } from "react";

/**
 * React 19 resets a <form action={...}> after every submission, wiping what the user typed
 * even when validation fails. Submitting through onSubmit keeps their input; forms that
 * should clear on success reset themselves explicitly.
 */
export function keepFormSubmit(dispatch: (fd: FormData) => void) {
  return (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    if (submitter?.name) fd.set(submitter.name, submitter.value);
    startTransition(() => dispatch(fd));
  };
}
