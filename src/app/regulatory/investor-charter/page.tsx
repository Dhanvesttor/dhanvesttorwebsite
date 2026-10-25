import { LegalPage } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Investor Charter for Portfolio Management Services", description: "The investor charter for PMS clients of Dhanvesttor: our vision and mission, the services we provide, your rights, and your responsibilities.", path: "/regulatory/investor-charter" });

export default function Charter() {
  return (
    <LegalPage title="Investor charter" path="/regulatory/investor-charter" lede="A summary of what you can expect from us as a portfolio manager, and what we ask of you. The full SEBI-prescribed charter is available on request and on SEBI's website." updated="October 2026">
      <h2>Our vision and mission</h2>
      <p>To give investors access to professional portfolio management with fairness, transparency and the highest standards of conduct, and to help them understand and own their financial decisions.</p>
      <h2>Services we provide</h2>
      <ul><li>Discretionary portfolio management under the FAITH investment approach.</li><li>Onboarding, including disclosure of all fees and risks before you sign.</li><li>Monthly statements, periodic performance reporting and an annual audited statement.</li><li>Grievance redressal within the timelines set by SEBI.</li></ul>
      <h2>Your rights</h2>
      <ul><li>To receive the Disclosure Document and client agreement before investing.</li><li>To hold securities in your own name in a dedicated demat account.</li><li>To receive regular, accurate statements of your portfolio, fees and transactions.</li><li>To have your complaints acknowledged and resolved within the prescribed time, and to escalate to SEBI SCORES and Online Dispute Resolution.</li><li>To withdraw your portfolio, subject to the terms of your agreement.</li></ul>
      <h2>Your responsibilities</h2>
      <ul><li>Read the Disclosure Document and client agreement carefully.</li><li>Provide accurate KYC information and keep it updated.</li><li>Fill in the negative list declaration yourself.</li><li>Review your statements and raise any discrepancy promptly.</li><li>Never share passwords or OTPs with anyone, including people claiming to represent us.</li></ul>
      <p>The SEBI investor charter for portfolio managers is published at <a href="https://www.sebi.gov.in" target="_blank" rel="noopener">sebi.gov.in</a>.</p>
    </LegalPage>
  );
}
