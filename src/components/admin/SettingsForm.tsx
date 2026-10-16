"use client";

import { keepFormSubmit } from "@/components/useKeepFormSubmit";
import { useActionState } from "react";
import { saveSettings } from "@/app/admin/_actions/users";
import type { ActionResult } from "@/app/admin/_actions/common";
import type { Settings } from "@/lib/settings";
import { FormMessage } from "./FormMessage";

type Field = { key: keyof Settings; label: string; hint?: string; long?: boolean; placeholder?: string };
const GROUPS: { title: string; description: string; fields: Field[] }[] = [
  { title: "Brand", description: "How the site introduces itself.", fields: [
    { key: "site_name", label: "Site name" },
    { key: "tagline", label: "Tagline", hint: "Appears in the browser tab on the homepage." },
    { key: "site_description", label: "Site description", long: true, hint: "Default meta description for search engines (120–160 characters)." },
    { key: "contact_email", label: "Public contact email" },
  ] },
  { title: "Homepage", description: "The first thing visitors read.", fields: [
    { key: "hero_title", label: "Hero headline" },
    { key: "hero_subtitle", label: "Hero intro", long: true },
    { key: "newsletter_title", label: "Newsletter heading" },
    { key: "newsletter_text", label: "Newsletter text", long: true },
  ] },
  { title: "Footer and disclosures", description: "Shown on every page and under every post.", fields: [
    { key: "footer_about", label: "Footer about text", long: true },
    { key: "disclosure_text", label: "Post disclosure", long: true, hint: "Shown under each post. Keep an affiliate disclosure here if you use affiliate links (FTC requirement)." },
  ] },
  { title: "Social profiles", description: "Leave a field empty to hide that icon.", fields: [
    { key: "social_facebook", label: "Facebook URL", placeholder: "https://facebook.com/yourpage" },
    { key: "social_instagram", label: "Instagram URL", placeholder: "https://instagram.com/yourhandle" },
    { key: "social_pinterest", label: "Pinterest URL", placeholder: "https://pinterest.com/yourhandle" },
    { key: "social_youtube", label: "YouTube URL", placeholder: "https://youtube.com/@yourchannel" },
    { key: "social_x", label: "X URL", placeholder: "https://x.com/yourhandle" },
  ] },
  { title: "Analytics", description: "Track visitors with Google Analytics 4.", fields: [
    { key: "ga_measurement_id", label: "GA4 measurement ID", placeholder: "G-XXXXXXXXXX", hint: "Find it in Google Analytics under Admin, Data streams." },
  ] },
];

export function SettingsForm({ settings }: { settings: Settings }) {
  const [state, action, pending] = useActionState<ActionResult, FormData>(saveSettings, null);
  return (
    <form onSubmit={keepFormSubmit(action)} className="space-y-6">
      {GROUPS.map((g) => (
        <section key={g.title} className="grid gap-6 rounded-2xl border border-line bg-paper p-6 lg:grid-cols-[240px_1fr]">
          <div><h2 className="font-bold">{g.title}</h2><p className="mt-1 text-sm text-muted">{g.description}</p></div>
          <div className="space-y-4">
            {g.fields.map((f) => (
              <div key={f.key}>
                <label htmlFor={f.key} className="label">{f.label}</label>
                {f.long
                  ? <textarea id={f.key} name={f.key} rows={3} defaultValue={settings[f.key]} className="input" />
                  : <input id={f.key} name={f.key} defaultValue={settings[f.key]} placeholder={f.placeholder} className="input" />}
                {f.hint && <p className="hint">{f.hint}</p>}
              </div>
            ))}
          </div>
        </section>
      ))}
      <div className="sticky bottom-0 -mx-1 flex items-center gap-4 border-t border-line bg-fog/95 px-1 py-4 backdrop-blur">
        <button className="btn btn-primary" disabled={pending}>{pending ? "Saving…" : "Save settings"}</button>
        <FormMessage state={state} />
      </div>
    </form>
  );
}
