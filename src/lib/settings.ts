import { cache } from "react";
import { query } from "./db";

export const DEFAULT_SETTINGS = {
  site_name: "Daily Pet Care",
  tagline: "Trusted pet care guides for American pet parents",
  site_description:
    "Vet-informed guides on dog and cat care, grooming, nutrition, training, and finding the right pet services near you.",
  hero_title: "Happier pets start with better care.",
  hero_subtitle:
    "Practical, research-backed advice on health, grooming, training and choosing pet services you can trust — written for pet parents across the U.S.",
  contact_email: "hello@yourdomain.com",
  footer_about:
    "Daily Pet Care helps pet parents make confident decisions about health, nutrition, grooming, boarding, and everyday care.",
  social_facebook: "",
  social_instagram: "",
  social_pinterest: "",
  social_youtube: "",
  social_x: "",
  ga_measurement_id: "",
  newsletter_title: "Get the weekly Pet Care Digest",
  newsletter_text: "One email a week with seasonal tips, product safety alerts and our newest guides. No spam.",
  disclosure_text:
    "Some links on this site may be affiliate links. If you buy through them we may earn a small commission at no extra cost to you. Content is for general information and is not a substitute for advice from your veterinarian.",
};

export type SettingKey = keyof typeof DEFAULT_SETTINGS;
export type Settings = Record<SettingKey, string>;

export const getSettings = cache(async (): Promise<Settings> => {
  try {
    const rows = await query<{ key: string; value: string }>("SELECT `key`, `value` FROM settings");
    const out = { ...DEFAULT_SETTINGS } as Settings;
    for (const r of rows) if (r.key in out) out[r.key as SettingKey] = r.value;
    return out;
  } catch (e) {
    console.error("[settings] falling back to defaults:", (e as Error).message);
    return { ...DEFAULT_SETTINGS };
  }
});
