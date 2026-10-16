"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload } from "lucide-react";
import { uploadImage } from "./upload";

export function MediaUploader() {
  const router = useRouter();
  const ref = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");
  async function onFiles(files: FileList | null) {
    if (!files?.length) return;
    let done = 0; const errors: string[] = [];
    for (const f of Array.from(files)) {
      setStatus(`Uploading ${done + 1} of ${files.length}…`);
      try { await uploadImage(f); done++; } catch (e) { errors.push(`${f.name}: ${(e as Error).message}`); }
    }
    setStatus(errors.length ? errors.join(" ") : `Uploaded ${done} ${done === 1 ? "image" : "images"}.`);
    if (ref.current) ref.current.value = "";
    router.refresh();
  }
  return (
    <div className="flex items-center gap-3">
      {status && <span className="text-sm text-muted" role="status">{status}</span>}
      <input ref={ref} type="file" multiple accept="image/jpeg,image/png,image/webp,image/gif,image/avif" className="hidden" onChange={(e) => onFiles(e.target.files)} />
      <button type="button" onClick={() => ref.current?.click()} className="btn btn-primary"><Upload size={17} />Upload images</button>
    </div>
  );
}

export function CopyUrl({ url }: { url: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button type="button" className="rounded-lg px-2 py-1 text-xs font-semibold text-collar hover:bg-tint-1"
      onClick={async () => { await navigator.clipboard.writeText(location.origin + url); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>
      {copied ? "Copied" : "Copy URL"}
    </button>
  );
}
