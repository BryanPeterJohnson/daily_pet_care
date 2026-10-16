import type { Metadata, Viewport } from "next";
import "./globals.css";
import { getSettings } from "@/lib/settings";
import { siteUrl } from "@/lib/format";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSettings();
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: `${s.site_name} — ${s.tagline}`, template: `%s | ${s.site_name}` },
    description: s.site_description,
    applicationName: s.site_name,
    alternates: { canonical: "/", types: { "application/rss+xml": "/feed.xml" } },
    openGraph: { type: "website", siteName: s.site_name, locale: "en_US", url: siteUrl() },
    twitter: { card: "summary_large_image" },
    robots: { index: true, follow: true },
    icons: { icon: "/icon.svg" },
  };
}

export const viewport: Viewport = { themeColor: "#fbf6ee", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
