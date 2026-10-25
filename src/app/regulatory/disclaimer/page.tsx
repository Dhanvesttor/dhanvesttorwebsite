import { LegalPage } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo";
import { disclaimers } from "@/content/disclaimers";

export const metadata = buildMetadata({ title: "Disclaimer", description: "Important information about the content on Dhanvesttor's website, investment risks and past performance.", path: "/regulatory/disclaimer" });

export default function Disclaimer() {
  return (
    <LegalPage title="Disclaimer" path="/regulatory/disclaimer" updated="October 2026">
      <h2>General</h2><p>{disclaimers.general}</p>
      <h2>Portfolio management</h2><p>{disclaimers.pmsPerformance}</p>
      <h2>Mutual funds</h2><p>{disclaimers.mutualFunds}</p>
      <h2>Calculators</h2><p>{disclaimers.calculators}</p>
      <h2>Insurance and fixed income</h2><p>{disclaimers.insuranceBonds}</p>
      <h2>Forward-looking statements</h2><p>This website may contain statements about future expectations. Actual results may differ materially due to risks, uncertainties or assumptions. Dhanvesttor takes no responsibility for updating such statements. Dhanvesttor, its partners, employees and clients may hold positions in securities discussed. Any dispute is subject to the jurisdiction of the courts of West Bengal.</p>
    </LegalPage>
  );
}
