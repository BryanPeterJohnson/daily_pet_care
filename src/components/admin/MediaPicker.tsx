"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";

type Item = { id: number; url: string; alt: string | null; filename: string };

export function MediaPicker({ onPick, onClose }: { onPick: (item: Item) => void; onClose: () => void }) {
  const [items, setItems] = useState<Item[] | null>(null);
  const [error, setError] = useState("");
  useEffect(() => {
    fetch("/api/admin/media").then((r) => r.json()).then((j) => setItems(j.items || [])).catch(() => setError("Couldn't load the media library."));
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 p-4" role="dialog" aria-modal="true" aria-label="Choose an image" onClick={onClose}>
      <div className="max-h-[85vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-paper" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <h2 className="font-bold">Choose from media library</h2>
          <button type="button" onClick={onClose} aria-label="Close" className="grid h-9 w-9 place-items-center rounded-full hover:bg-fog"><X size={18} /></button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto p-5">
          {error && <p className="text-alert">{error}</p>}
          {!items && !error && <p className="text-muted">Loading…</p>}
          {items?.length === 0 && <p className="text-muted">No images yet. Upload one from the post form or the Media library page.</p>}
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {items?.map((m) => (
              <li key={m.id}>
                <button type="button" onClick={() => onPick(m)} className="block aspect-square w-full overflow-hidden rounded-xl ring-collar hover:ring-2 focus-visible:ring-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={m.url} alt={m.alt || m.filename} className="h-full w-full object-cover" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
