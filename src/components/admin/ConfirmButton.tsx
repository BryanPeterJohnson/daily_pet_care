"use client";

import { useFormStatus } from "react-dom";

/** Submit button that asks for confirmation first. Place inside a <form action={serverAction}>. */
export function ConfirmButton({ message, children, className = "" }: { message: string; children: React.ReactNode; className?: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={className}
      onClick={(e) => { if (!confirm(message)) e.preventDefault(); }}
    >
      {children}
    </button>
  );
}

export function SubmitButton({ children, pendingText, className = "btn btn-primary", name, value }: { children: React.ReactNode; pendingText?: string; className?: string; name?: string; value?: string }) {
  const { pending } = useFormStatus();
  return <button type="submit" className={className} disabled={pending} name={name} value={value}>{pending && pendingText ? pendingText : children}</button>;
}
