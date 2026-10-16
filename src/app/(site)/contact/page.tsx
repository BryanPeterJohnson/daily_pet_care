import type { Metadata } from "next";
import { getSettings } from "@/lib/settings";
import { ContactForm } from "@/components/site/ContactForm";

export const metadata: Metadata = { title: "Contact us", description: "Questions, corrections or partnership ideas? Get in touch.", alternates: { canonical: "/contact" } };

export default async function ContactPage() {
  const s = await getSettings();
  return (
    <div className="container-x grid gap-12 pt-12 md:pt-16 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Contact us</h1>
        <p className="mt-5 max-w-md font-serif text-xl text-ink-soft">Questions about a guide, a correction, or a partnership idea? We usually reply within two business days.</p>
        <p className="mt-8 text-[15px] text-muted">Prefer email? Write to <a href={`mailto:${s.contact_email}`} className="font-semibold text-collar">{s.contact_email}</a></p>
        <p className="mt-6 rounded-2xl bg-fog p-5 text-[15px] text-ink-soft">
          <strong className="text-ink">Pet emergency?</strong> We can't give medical advice. Call your veterinarian or the nearest 24-hour animal hospital right away.
        </p>
      </div>
      <div className="lg:col-span-7"><ContactForm /></div>
    </div>
  );
}
