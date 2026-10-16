export async function uploadImage(file: File, alt = ""): Promise<string> {
  const fd = new FormData();
  fd.append("file", file);
  if (alt) fd.append("alt", alt);
  const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(json.error || "Upload failed.");
  return json.url as string;
}
