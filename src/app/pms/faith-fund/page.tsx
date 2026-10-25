import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHead } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Table } from "@/components/ui/Table";
import { PerformanceTable } from "@/components/sections/PerformanceTable";
import { ContactBand } from "@/components/sections/ContactBand";
import { Disclaimer } from "@/components/sections/Disclaimer";
import { FaithLetters } from "@/components/home/FaithLetters";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { pms } from "@/content/pms";
import { disclaimers } from "@/content/disclaimers";

export const metadata = buildMetadata({ title: "Dhanvesttor FAITH Fund: Flexi-Cap PMS Strategy", description: "The Dhanvesttor FAITH Fund is a discretionary flexi-cap PMS strategy benchmarked to BSE 500 TRI. Investment framework, fees, performance and fund manager.", path: "/pms/faith-fund" });

const facts: [string, string][] = [
  ["Strategy", `${pms.strategy}, ${pms.type}`], ["Category", pms.category], ["Inception", pms.inception], ["Benchmark", pms.benchmark],
  ["Fund manager", `${pms.fundManager} (also Principal Officer)`], ["Custodian & fund accountant", pms.custodian], ["Minimum investment", pms.minimum], ["Mode of investment", pms.mode],
  ["Fixed fee", `${pms.fees.fixedPct}% a year, charged monthly`], ["Performance fee", `${pms.fees.performancePct}% above a ${pms.fees.hurdlePct}% hurdle, with high-water mark`], ["Exit load", `${pms.fees.exitLoadPct}% on ${pms.fees.exitLoadWindow}`], ["Operating expenses", `Up to ${pms.fees.operatingPct}%`],
];

export default function FaithFund() {
  return (
    <Shell>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "InvestmentFund", name: pms.fundName, provider: { "@id": "https://dhanvesttor.com/#organization" }, feesAndCommissionsSpecification: "2% fixed, 20% above 10% hurdle with high-water mark", url: "https://dhanvesttor.com/pms/faith-fund" }} />
      <PageHero tone="indigo" crumbs={[{ name: "PMS", path: "/pms" }, { name: "FAITH Fund", path: "/pms/faith-fund" }]} eyebrow="Dhanvesttor FAITH Fund" title={<>A flexi-cap strategy with <em>five non-negotiables.</em></>}
        lede="FAITH can own large, mid or small companies, across any sector, wherever the best opportunities sit. What it cannot do is buy a business that fails any of its five tests."
        actions={<><Button href="/contact" variant="raspberry">Request the presentation</Button><Button href="/regulatory/disclosure-document" variant="light">Disclosure document</Button></>} />

      <Section tone="indigo" className="grain">
        <FaithLetters />
      </Section>

      <Section>
        <SectionHead align="split" eyebrow="Fund facts" title={<>Everything on <em>one page.</em></>} lede="These terms are set out in full in the Disclosure Document and your client agreement." />
        <Table head={["", "Detail"]} rows={facts.map(([k, v]) => [k, v])} />
      </Section>

      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow mb-3">We look for</p>
            <h2 className="text-[2.25rem]">What gets a company <em>in.</em></h2>
            <ul className="mt-6 grid gap-3">{pms.dos.map((d) => <li key={d} className="flex gap-3 text-[1.05rem]"><span className="text-raspberry">✓</span>{d}</li>)}</ul>
          </div>
          <div>
            <p className="eyebrow mb-3">The negative list</p>
            <h2 className="text-[2.25rem]">What keeps a company <em>out.</em></h2>
            <ul className="mt-6 grid gap-3">{pms.donts.map((d) => <li key={d} className="flex gap-3 text-[1.05rem]"><span className="text-mist">✕</span>{d}</li>)}</ul>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead align="split" eyebrow="Performance" title={<>Shown the way <em>SEBI requires.</em></>}
          lede={<>Returns are time-weighted, net of fees, and always shown against the benchmark. FY26 was a difficult year for Indian equities and FAITH posted negative returns, as most PMS strategies did. We would rather you hear that from us first.</>} />
        <PerformanceTable />
        <p className="mt-6 text-[14.5px] text-[#3f3d5c]">For the latest month&apos;s figures, the sector and market-cap allocation, and the full factsheet, <a href="/contact" className="text-raspberry underline underline-offset-4">ask us for the current presentation</a>. Stock-level holdings are disclosed to clients every month.</p>
      </Section>

      <Section tone="sand">
        <div className="grid gap-10 md:grid-cols-[1fr_1.4fr] md:items-center">
          <div><p className="eyebrow mb-3">Fund manager</p><h2 className="text-[2.4rem]">Ishan Daga</h2><p className="mt-2 text-mist">Fund Manager & Principal Officer</p></div>
          <div className="text-[1.0625rem] text-[#3f3d5c]">
            <p>Nineteen years in financial research and fund management. Chancellor&apos;s Gold Medallist in M.Com and PGDM (Finance). Ranked top analyst by Bloomberg ANR for every stock under his coverage, and nominated for the Zee Business and Thomson Reuters analyst awards.</p>
            <p className="mt-4">Supported by P. G. Singha, Senior Research Analyst, with seventeen years in equity research and portfolio management.</p>
            <Button href="/about/team/ishan-daga" variant="link" className="mt-6">Full profile →</Button>
          </div>
        </div>
      </Section>

      <ContactBand defaultPath="pms" paths={["pms"]} heading={<>See the <em>current</em> portfolio picture.</>} lede="We will send the latest presentation and walk you through it, including the months that did not go our way." />
      <Disclaimer text={disclaimers.pmsPerformance + " " + disclaimers.general} />
    </Shell>
  );
}
