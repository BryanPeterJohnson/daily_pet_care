"use client";

import { useEffect, useState } from "react";

/** Thin coral bar under the header that fills as the reader scrolls through the article. */
export function ReadingProgress() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = document.documentElement;
        const max = el.scrollHeight - el.clientHeight;
        setPct(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-1 bg-transparent" aria-hidden="true">
      <div className="h-full origin-left bg-gradient-to-r from-ball to-coral" style={{ transform: `scaleX(${pct / 100})` }} />
    </div>
  );
}
