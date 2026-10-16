import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import { LegalPage } from "@/components/site/LegalPage";

export const metadata: Metadata = { title: "Terms of use", alternates: { canonical: "/terms" } };

export default async function TermsPage() {
  const s = await getSettings();
  return (
    <LegalPage title="Terms of use" updated="October 2026">
      <p>By using {s.site_name} you agree to these terms. If you don't agree, please don't use the site.</p>
      <h2>Informational content only</h2>
      <p>Our guides are for general education. They are not veterinary, legal or professional advice, and they don't create a veterinarian–client–patient relationship. Always consult a licensed veterinarian about your pet's health.</p>
      <h2>Intellectual property</h2>
      <p>Text, graphics and logos on this site belong to {s.site_name} or its licensors. You may share links and short quotes with attribution, but you may not republish full articles without written permission.</p>
      <h2>Third-party links and services</h2>
      <p>We may link to products, providers and other websites. We aren't responsible for their content, prices, or the services they provide. Hire any pet care provider at your own discretion.</p>
      <h2>Limitation of liability</h2>
      <p>To the fullest extent permitted by law, {s.site_name} is not liable for any loss or damage arising from your use of the site or reliance on its content.</p>
      <h2>Contact</h2>
      <p>Questions about these terms? Email <a href={`mailto:${s.contact_email}`}>{s.contact_email}</a>.</p>
    </LegalPage>
  );
}
