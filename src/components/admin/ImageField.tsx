"use client";

import { useRef, useState } from "react";
import { Image as ImageIcon, Trash2, Upload } from "lucide-react";
import { uploadImage } from "./upload";
import { MediaPicker } from "./MediaPicker";

export function ImageField({ name, label, defaultValue, hint, onAlt }: { name: string; label: string; defaultValue?: string | null; hint?: string; onAlt?: (alt: string) => void }) {
  const [url, setUrl] = useState(defaultValue || "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [picking, setPicking] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function onFile(file?: File) {
    if (!file) return;
    setBusy(true); setError("");
    try { setUrl(await uploadImage(file)); }
    catch (e) { setError((e as Error).message); }
    finally { setBusy(false); if (fileRef.current) fileRef.current.value = ""; }
  }

  return (
    <div>
      <span className="label">{label}</span>
      <input type="hidden" name={name} value={url} />
      {url ? (
        <div className="overflow-hidden rounded-xl border border-line">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="" className="aspect-[16/9] w-full bg-fog object-cover" />
          <div className="flex gap-2 p-2">
            <button type="button" onClick={() => fileRef.current?.click()} className="btn btn-ghost flex-1 px-3 py-1.5">Replace</button>
            <button type="button" onClick={() => setUrl("")} className="btn btn-ghost px-3 py-1.5" aria-label="Remove image"><Trash2 size={16} /></button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); onFile(e.dataTransfer.files?.[0]); }}
          className="flex flex-col items-center gap-3 rounded-xl border-2 border-dashed border-line px-4 py-6 text-center"
        >
          <ImageIcon size={28} className="text-muted" />
          <p className="text-sm text-muted">{busy ? "Uploading…" : "Drop an image here, or"}</p>
          <div className="flex flex-wrap justify-center gap-2">
            <button type="button" disabled={busy} onClick={() => fileRef.current?.click()} className="btn btn-ink px-4 py-1.5"><Upload size={15} />Upload</button>
            <button type="button" onClick={() => setPicking(true)} className="btn btn-ghost px-4 py-1.5">Choose from library</button>
          </div>
        </div>
      )}
      <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif,image/avif" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      {error && <p className="mt-1.5 text-sm text-alert" role="alert">{error}</p>}
      {hint && <p className="hint">{hint}</p>}
      {picking && <MediaPicker onClose={() => setPicking(false)} onPick={(m) => { setUrl(m.url); if (m.alt) onAlt?.(m.alt); setPicking(false); }} />}
    </div>
  );
}
