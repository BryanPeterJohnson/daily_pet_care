"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Placeholder } from "@tiptap/extensions";
import { useRef, useState } from "react";
import {
  Bold, Code, Heading2, Heading3, Image as ImageIcon, Italic, Link as LinkIcon, List, ListOrdered, Minus, Quote, Redo2, Strikethrough, Undo2, Video,
} from "lucide-react";
import { uploadImage } from "./upload";
import { MediaPicker } from "./MediaPicker";

function Btn({ onClick, active, label, children, disabled }: { onClick: () => void; active?: boolean; label: string; children: React.ReactNode; disabled?: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} aria-label={label} title={label} aria-pressed={active}
      className={`grid h-9 w-9 place-items-center rounded-lg transition-colors disabled:opacity-40 ${active ? "bg-ink text-white" : "hover:bg-fog"}`}>
      {children}
    </button>
  );
}

function Toolbar({ editor, onImage }: { editor: Editor; onImage: () => void }) {
  const setLink = () => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("Link URL (leave empty to remove)", prev || "https://");
    if (url === null) return;
    if (url === "" || url === "https://") { editor.chain().focus().extendMarkRange("link").unsetLink().run(); return; }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };
  const addVideo = () => {
    const url = window.prompt("YouTube or Vimeo URL");
    if (!url) return;
    const yt = url.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/);
    const vm = url.match(/vimeo\.com\/(\d+)/);
    const src = yt ? `https://www.youtube-nocookie.com/embed/${yt[1]}` : vm ? `https://player.vimeo.com/video/${vm[1]}` : null;
    if (!src) { alert("Paste a YouTube or Vimeo link."); return; }
    editor.chain().focus().insertContent(`<p>[video:${src}]</p>`).run();
  };
  const s = 18;
  return (
    <div className="sticky top-0 z-10 flex flex-wrap gap-0.5 border-b border-line bg-paper/95 p-1.5 backdrop-blur">
      <Btn label="Heading 2" active={editor.isActive("heading", { level: 2 })} onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}><Heading2 size={s} /></Btn>
      <Btn label="Heading 3" active={editor.isActive("heading", { level: 3 })} onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}><Heading3 size={s} /></Btn>
      <span className="mx-1 w-px self-stretch bg-line" />
      <Btn label="Bold" active={editor.isActive("bold")} onClick={() => editor.chain().focus().toggleBold().run()}><Bold size={s} /></Btn>
      <Btn label="Italic" active={editor.isActive("italic")} onClick={() => editor.chain().focus().toggleItalic().run()}><Italic size={s} /></Btn>
      <Btn label="Strikethrough" active={editor.isActive("strike")} onClick={() => editor.chain().focus().toggleStrike().run()}><Strikethrough size={s} /></Btn>
      <Btn label="Inline code" active={editor.isActive("code")} onClick={() => editor.chain().focus().toggleCode().run()}><Code size={s} /></Btn>
      <Btn label="Link" active={editor.isActive("link")} onClick={setLink}><LinkIcon size={s} /></Btn>
      <span className="mx-1 w-px self-stretch bg-line" />
      <Btn label="Bulleted list" active={editor.isActive("bulletList")} onClick={() => editor.chain().focus().toggleBulletList().run()}><List size={s} /></Btn>
      <Btn label="Numbered list" active={editor.isActive("orderedList")} onClick={() => editor.chain().focus().toggleOrderedList().run()}><ListOrdered size={s} /></Btn>
      <Btn label="Quote or tip box" active={editor.isActive("blockquote")} onClick={() => editor.chain().focus().toggleBlockquote().run()}><Quote size={s} /></Btn>
      <Btn label="Divider" onClick={() => editor.chain().focus().setHorizontalRule().run()}><Minus size={s} /></Btn>
      <span className="mx-1 w-px self-stretch bg-line" />
      <Btn label="Insert image" onClick={onImage}><ImageIcon size={s} /></Btn>
      <Btn label="Embed video" onClick={addVideo}><Video size={s} /></Btn>
      <span className="ml-auto" />
      <Btn label="Undo" disabled={!editor.can().undo()} onClick={() => editor.chain().focus().undo().run()}><Undo2 size={s} /></Btn>
      <Btn label="Redo" disabled={!editor.can().redo()} onClick={() => editor.chain().focus().redo().run()}><Redo2 size={s} /></Btn>
    </div>
  );
}

/** Rich text editor that writes HTML into a hidden <input name={name}>. */
export function RichEditor({ name, defaultValue, onWords }: { name: string; defaultValue?: string; onWords?: (n: number) => void }) {
  const [html, setHtml] = useState(defaultValue || "");
  const [imgMenu, setImgMenu] = useState(false);
  const [picking, setPicking] = useState(false);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3, 4] }, link: { openOnClick: false, autolink: true } }),
      Image.configure({ HTMLAttributes: { loading: "lazy" } }),
      Placeholder.configure({ placeholder: "Start writing. Use Heading 2 for each main section — they build the table of contents." }),
    ],
    content: defaultValue || "",
    editorProps: { attributes: { class: "prose prose-lg article-body max-w-none", "aria-label": "Post content" } },
    onUpdate: ({ editor }) => {
      setHtml(editor.getHTML());
      onWords?.(editor.getText().split(/\s+/).filter(Boolean).length);
    },
    onCreate: ({ editor }) => onWords?.(editor.getText().split(/\s+/).filter(Boolean).length),
  });

  async function onFile(file?: File) {
    if (!file || !editor) return;
    const alt = window.prompt("Describe the image for screen readers and Google (alt text)", "") || "";
    setBusy(true);
    try {
      const url = await uploadImage(file, alt);
      editor.chain().focus().setImage({ src: url, alt }).run();
    } catch (e) { alert((e as Error).message); }
    finally { setBusy(false); setImgMenu(false); if (fileRef.current) fileRef.current.value = ""; }
  }

  return (
    <div className="editor-surface relative rounded-2xl border border-line bg-paper">
      <input type="hidden" name={name} value={html} />
      {editor ? <Toolbar editor={editor} onImage={() => setImgMenu((v) => !v)} /> : <div className="h-12 border-b border-line" />}
      {imgMenu && (
        <div className="absolute top-14 left-2 z-20 flex gap-2 rounded-xl border border-line bg-paper p-2 shadow-lg">
          <button type="button" disabled={busy} className="btn btn-ink px-3 py-1.5" onClick={() => fileRef.current?.click()}>{busy ? "Uploading…" : "Upload image"}</button>
          <button type="button" className="btn btn-ghost px-3 py-1.5" onClick={() => { setPicking(true); setImgMenu(false); }}>From library</button>
        </div>
      )}
      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files?.[0])} />
      <EditorContent editor={editor} />
      {picking && editor && (
        <MediaPicker onClose={() => setPicking(false)} onPick={(m) => { editor.chain().focus().setImage({ src: m.url, alt: m.alt || "" }).run(); setPicking(false); }} />
      )}
    </div>
  );
}
