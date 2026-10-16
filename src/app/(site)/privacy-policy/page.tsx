import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import { LegalPage } from "@/components/site/LegalPage";

export const metadata: Metadata = { title: "Privacy policy", alternates: { canonical: "/privacy-policy" } };

export default async function PrivacyPage() {
  const s = await getSettings();
  return (
    <LegalPage title="Privacy policy" updated="October 2026">
      <p>This policy explains what information {s.site_name} collects, how we use it, and the choices you have. Have it reviewed by a qualified professional for your business before relying on it.</p>
      <h2>Information we collect</h2>
      <ul>
        <li><strong>Newsletter:</strong> your email address when you subscribe.</li>
        <li><strong>Contact form:</strong> your name, email and the message you send.</li>
        <li><strong>Usage data:</strong> anonymous page view counts, and, if enabled, analytics data such as device type, approximate location and pages visited, collected through cookies by services like Google Analytics.</li>
      </ul>
      <h2>How we use it</h2>
      <p>We use your information to send the newsletter you asked for, reply to your messages, understand which guides are useful, and keep the site secure. We do not sell your personal information.</p>
      <h2>Cookies and third parties</h2>
      <p>Analytics and advertising partners may set cookies to measure traffic or show relevant ads. You can block or delete cookies in your browser settings, and opt out of Google Analytics with Google's browser add-on.</p>
      <h2>Your rights</h2>
      <p>Depending on where you live, including California (CCPA/CPRA) and other U.S. states with privacy laws, you may have the right to know, access, correct or delete your personal information, and to opt out of its sale or sharing. To make a request, email <a href={`mailto:${s.contact_email}`}>{s.contact_email}</a>. You can unsubscribe from the newsletter at any time.</p>
      <h2>Children</h2>
      <p>This site is not directed to children under 13, and we do not knowingly collect their personal information.</p>
      <h2>Changes</h2>
      <p>We'll post any changes to this policy on this page and update the date above.</p>
    </LegalPage>
  );
}
