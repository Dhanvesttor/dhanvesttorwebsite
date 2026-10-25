import { LegalPage } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata = buildMetadata({ title: "Privacy Policy", description: "How Dhanvesttor collects, uses, stores and protects your personal data, in line with India's Digital Personal Data Protection Act.", path: "/regulatory/privacy" });

export default function Privacy() {
  return (
    <LegalPage title="Privacy policy" path="/regulatory/privacy" lede="We collect only what we need, use it only for the reason you gave it to us, and never sell it." updated="October 2026">
      <h2>What we collect</h2>
      <ul><li>Details you give us through forms: name, email, phone, city, the service you're interested in, and anything you choose to tell us.</li><li>For clients: KYC and account information required by law, shared with our custodian and registrars.</li><li>For applicants: your CV and the details in your application.</li><li>Basic, aggregated website analytics. We do not use advertising trackers.</li></ul>
      <h2>How we use it</h2>
      <ul><li>To reply to you and provide the service you asked about.</li><li>To meet our regulatory obligations to SEBI and other authorities.</li><li>To send our monthly letter or CLCB updates, only if you asked for them. Every message has an unsubscribe link.</li></ul>
      <h2>Who we share it with</h2>
      <p>Only with service providers who help us deliver the service (custodian, registrars, fund houses, insurers, email provider) and with regulators when required by law. Never with advertisers.</p>
      <h2>How long we keep it</h2>
      <p>Client records are kept for the period required by SEBI and other regulations. Enquiries and applications are deleted when no longer needed, or on request.</p>
      <h2>Your rights</h2>
      <p>You may ask to see, correct or delete the personal data we hold about you, or withdraw consent, by writing to {site.email}. We respond within 30 days.</p>
      <h2>Contact</h2>
      <p>Grievance Officer for data protection: Neha Verma, {site.email}, {site.address.line1}, {site.address.line2}, {site.address.city} {site.address.pin}.</p>
    </LegalPage>
  );
}
