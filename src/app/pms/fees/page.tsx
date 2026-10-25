import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHead } from "@/components/ui/Section";
import { Table } from "@/components/ui/Table";
import { Accordion } from "@/components/ui/Accordion";
import { PmsFeeCalculator } from "@/components/calculators/calculators";
import { CTA } from "@/components/ui/CTA";
import { Disclaimer } from "@/components/sections/Disclaimer";
import { buildMetadata } from "@/lib/seo";
import { pms } from "@/content/pms";
import { disclaimers } from "@/content/disclaimers";

export const metadata = buildMetadata({ title: "PMS Fees: 2% Fixed, 20% Above a 10% Hurdle", description: "Dhanvesttor's PMS fee structure explained in plain language: fixed fee, performance fee, hurdle rate, high-water mark, exit load, with a fee illustration calculator.", path: "/pms/fees" });

export default function Fees() {
  const f = pms.fees;
  return (
    <Shell>
      <PageHero crumbs={[{ name: "PMS", path: "/pms" }, { name: "Fees", path: "/pms/fees" }]} eyebrow="Fees" title={<>We earn more <em>only when you do.</em></>}
        lede="Our fee has two parts. A modest fixed fee pays for the work. A performance fee applies only to returns above a 10% hurdle, and never twice on the same gains." />
      <Section>
        <Table head={["Component", "What it is", "What it means for you"]} rows={[
          ["Fixed management fee", `${f.fixedPct}% a year`, "Charged monthly on the portfolio value. Below the 2.5% to 3% common in the industry."],
          ["Performance fee", `${f.performancePct}% of returns above the hurdle`, "You pay nothing on the first 10% of returns each year, net of the fixed fee."],
          ["Hurdle rate", `${f.hurdlePct}% a year`, "The minimum return we must deliver before any performance fee."],
          ["High-water mark", "Yes", "After a fall, no performance fee until the portfolio has recovered past its previous high."],
          ["Exit load", `${f.exitLoadPct}%`, "Only if you withdraw within the first year. Nothing after that."],
          ["Operating expenses", `Up to ${f.operatingPct}%`, "Custody, fund accounting, audit. Shown on your statement."],
        ]} />
      </Section>
      <Section tone="paper">
        <SectionHead align="split" eyebrow="Fee illustration" title={<>Try a bad year. <em>Then a good one.</em></>} lede="SEBI asks portfolio managers to show how fees behave across returns. Move the gross return and watch what you keep." />
        <PmsFeeCalculator />
      </Section>
      <Section>
        <SectionHead eyebrow="In plain words" title={<>Three terms, <em>decoded.</em></>} />
        <Accordion items={[
          { title: "Hurdle rate", body: <p>The minimum return we must deliver before we charge you any performance fee. If your portfolio earns 9% after the fixed fee, there is no performance fee at all.</p> },
          { title: "High-water mark", body: <p>The highest value your portfolio has reached. If it falls from ₹60 lakh to ₹55 lakh, we earn no performance fee until it has climbed back above ₹60 lakh and cleared the hurdle. You never pay twice for the same gains.</p> },
          { title: "Why not a fixed fee only?", body: <p>A fixed-only fee pays the manager the same whatever your returns. A variable fee ties our income to yours. Speak to us if you would like to discuss the alternatives.</p> },
        ]} />
      </Section>
      <CTA title={<>Questions about fees are <em>welcome questions.</em></>} primary={{ label: "Ask us", href: "/contact" }} secondary={{ label: "PMS FAQs", href: "/pms/faqs" }} />
      <Disclaimer text={disclaimers.calculators + " " + disclaimers.general} />
    </Shell>
  );
}
