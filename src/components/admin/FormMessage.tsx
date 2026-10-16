"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";

export function FormMessage({ state }: { state: { ok: boolean; message: string } | null }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setVisible(true);
    if (state?.ok) {
      const t = setTimeout(() => setVisible(false), 4000);
      return () => clearTimeout(t);
    }
  }, [state]);
  if (!state || !visible) return null;
  return (
    <p role={state.ok ? "status" : "alert"}
      className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${state.ok ? "bg-tint-3 text-ok" : "bg-tint-2 text-alert"}`}>
      {state.ok && <Check size={16} />}{state.message}
    </p>
  );
}
