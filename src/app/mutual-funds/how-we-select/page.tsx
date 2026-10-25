import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHead } from "@/components/ui/Section";
import { StepList } from "@/components/sections/StepList";
import { CTA } from "@/components/ui/CTA";
import { Disclaimer } from "@/components/sections/Disclaimer";
import { buildMetadata } from "@/lib/seo";
import { disclaimers } from "@/content/disclaimers";

export const metadata = buildMetadata({ title: "How We Select Mutual Funds", description: "Dhanvesttor's mutual fund selection process: asset allocation first, then fund selection on process, consistency, risk, cost and manager tenure across 20+ fund houses.", path: "/mutual-funds/how-we-select" });

export default function HowWeSelect() {
  return (
    <Shell>
      <PageHero crumbs={[{ name: "Mutual Funds", path: "/mutual-funds" }, { name: "How we select", path: "/mutual-funds/how-we-select" }]} eyebrow="Fund selection" title={<>Allocation first. <em>Funds second.</em></>}
        lede="How your money is split between equity, debt and gold drives most of your outcome. Which fund you pick within each slice matters, but less. We work in that order." />
      <Section>
        <SectionHead eyebrow="The process" title={<>Five filters between <em>2,000 schemes</em> and your shortlist.</>} />
        <StepList columns={5} steps={[
          { title: "Your allocation", text: "Goals and horizons set the equity, debt and gold split. Short-term money goes to debt; long-term to equity." },
          { title: "Category fit", text: "Within each slice we choose categories: flexi cap for a core, a mid cap for growth, short duration for a near goal." },
          { title: "Consistency", text: "Rolling returns over three and five years against the benchmark, not a single point-to-point figure." },
          { title: "Risk & process", text: "Drawdowns, portfolio concentration, credit quality for debt, and whether the manager does what the label says." },
          { title: "Cost & tenure", text: "Expense ratio, fund size at the extremes, and how long the current manager has run the fund." },
        ]} />
      </Section>
      <Section tone="paper">
        <SectionHead align="split" eyebrow="What we avoid" title={<>Things that look good and <em>aren't.</em></>} />
        <div className="grid gap-6 md:grid-cols-3">
          {[["Last year's winner", "Top performers in one year rarely repeat. We look at five years of rolling returns."], ["Too many funds", "Eight funds that own the same 50 stocks is not diversification. Most people need three to five."], ["Chasing themes", "Sector and thematic funds are tactical bets. They have a place, but rarely at the core."]].map(([t, b]) => <div key={t} className="rounded-2xl border border-line bg-white p-6"><h3 className="text-[1.35rem]">{t}</h3><p className="mt-2 text-[15px] text-[#3f3d5c]">{b}</p></div>)}
        </div>
      </Section>
      <Section>
        <SectionHead align="split" eyebrow="After you invest" title={<>Reviews, <em>not reactions.</em></>} lede="We review your portfolio when your life changes and at least once a year. We replace a fund when its process changes, its manager leaves, or it persistently lags its category, not because of one bad quarter." />
      </Section>
      <CTA title={<>Bring your existing funds. <em>We'll review them</em> with you.</>} primary={{ label: "Book a portfolio review", href: "/contact" }} secondary={{ label: "Partner fund houses", href: "/mutual-funds/partners" }} />
      <Disclaimer text={disclaimers.mutualFunds} />
    </Shell>
  );
}
