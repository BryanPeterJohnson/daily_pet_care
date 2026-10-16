import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import { LegalPage } from "@/components/site/LegalPage";

export const metadata: Metadata = { title: "Disclaimer and affiliate disclosure", alternates: { canonical: "/disclaimer" } };

export default async function DisclaimerPage() {
  const s = await getSettings();
  return (
    <LegalPage title="Disclaimer and affiliate disclosure" updated="October 2026">
      <h2>Veterinary disclaimer</h2>
      <p>Content on {s.site_name} is for general information and is not a substitute for professional veterinary advice, diagnosis or treatment. If your pet is ill or injured, contact your veterinarian or an emergency animal hospital immediately.</p>
      <h2>Affiliate disclosure</h2>
      <p>In line with the U.S. Federal Trade Commission's guidance, we disclose that some links on this site are affiliate links. If you buy through them, we may earn a commission at no extra cost to you. This never changes which products or services we recommend.</p>
      <h2>Advertising</h2>
      <p>We may display ads from third-party networks. Ads are clearly separated from editorial content, and advertisers have no say in what we write.</p>
      <h2>Pricing information</h2>
      <p>Prices for pet services and products vary by location and change over time. Figures in our guides are typical ranges, not quotes. Confirm current pricing directly with providers.</p>
    </LegalPage>
  );
}
