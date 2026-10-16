"use client";

import { useEffect } from "react";

/** Counts a view from the browser so cached (ISR) pages still record traffic. */
export function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    const key = `viewed:${slug}`;
    try { if (sessionStorage.getItem(key)) return; sessionStorage.setItem(key, "1"); } catch {}
    const body = JSON.stringify({ slug });
    if (navigator.sendBeacon) navigator.sendBeacon("/api/views", new Blob([body], { type: "application/json" }));
    else fetch("/api/views", { method: "POST", body, headers: { "content-type": "application/json" }, keepalive: true });
  }, [slug]);
  return null;
}
