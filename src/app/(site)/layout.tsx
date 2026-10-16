import Script from "next/script";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { getSettings } from "@/lib/settings";
import { getCategories } from "@/lib/queries";

export const revalidate = 300;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, categories] = await Promise.all([getSettings(), getCategories(false)]);
  const ga = settings.ga_measurement_id?.trim();
  return (
    <>
      <SiteHeader siteName={settings.site_name} categories={categories} />
      <main id="main">{children}</main>
      <SiteFooter settings={settings} categories={categories} />
      {ga && /^G-[A-Z0-9]+$/.test(ga) && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${ga}`} strategy="afterInteractive" />
          <Script id="ga" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`}
          </Script>
        </>
      )}
    </>
  );
}
