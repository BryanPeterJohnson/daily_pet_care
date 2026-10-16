import type { Metadata } from "next";
import Link from "next/link";
import { getSettings } from "@/lib/settings";
import { LegalPage } from "@/components/site/LegalPage";
import { NewsletterSection } from "@/components/site/NewsletterSection";

export const metadata: Metadata = { title: "About us", alternates: { canonical: "/about" } };

export default async function AboutPage() {
  const s = await getSettings();
  return (
    <>
      <LegalPage title={`About ${s.site_name}`}>
        <p className="lead">{s.site_description}</p>
        <h2>Why we exist</h2>
        <p>Pet parents across the U.S. make dozens of care decisions every year: which vaccines are due, whether a groomer is safe, what a fair price for a dog walker looks like, how to help a rescue settle in. Good answers are often buried in forums or sales pages. We write clear, practical guides so you can make those decisions with confidence.</p>
        <h2>How we write our guides</h2>
        <ul>
          <li>We base health and safety content on guidance from veterinary organizations and published research, and we link to sources where it helps.</li>
          <li>We review and update guides when recommendations change, and show the updated date on each article.</li>
          <li>We never present our content as a replacement for your veterinarian. When something sounds urgent, we tell you to call one.</li>
        </ul>
        <h2>Advertising and affiliate links</h2>
        <p>Some pages may include ads or affiliate links. They never decide what we recommend. Read our <Link href="/disclaimer">disclaimer</Link> for details.</p>
        <h2>Get in touch</h2>
        <p>Have a question, correction or story idea? <Link href="/contact">Send us a message</Link>, we read every one.</p>
      </LegalPage>
      <NewsletterSection source="about" />
    </>
  );
}
