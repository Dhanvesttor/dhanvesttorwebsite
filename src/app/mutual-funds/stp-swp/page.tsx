import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHead } from "@/components/ui/Section";
import { Tabs } from "@/components/ui/Tabs";
import { StpCalculator, SwpCalculator } from "@/components/calculators/calculators";
import { CTA } from "@/components/ui/CTA";
import { Disclaimer } from "@/components/sections/Disclaimer";
import { buildMetadata } from "@/lib/seo";
import { disclaimers } from "@/content/disclaimers";

export const metadata = buildMetadata({ title: "STP & SWP: Systematic Transfer and Withdrawal Plans", description: "How a systematic transfer plan phases a lumpsum into equity, and how a systematic withdrawal plan turns a corpus into a monthly income. With calculators.", path: "/mutual-funds/stp-swp" });

export default function StpSwp() {
  return (
    <Shell>
      <PageHero crumbs={[{ name: "Mutual Funds", path: "/mutual-funds" }, { name: "STP & SWP", path: "/mutual-funds/stp-swp" }]} eyebrow="STP & SWP" title={<>Moving in slowly. <em>Drawing out steadily.</em></>}
        lede="Two tools for the moments a SIP doesn't cover: when you have a large sum to invest, and when you need your investments to pay you." />
      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <div className="border-t border-line pt-6"><p className="eyebrow">STP · Systematic transfer plan</p><h2 className="mt-3 text-[2rem]">For a lumpsum you&apos;re <em>nervous</em> about.</h2><p className="mt-4 text-[#3f3d5c]">Park the money in a liquid or short-duration debt fund. Each month, a fixed amount moves into your chosen equity fund. You earn debt returns while you wait and avoid investing everything on the worst possible day.</p></div>
          <div className="border-t border-line pt-6"><p className="eyebrow">SWP · Systematic withdrawal plan</p><h2 className="mt-3 text-[2rem]">For an income that <em>keeps growing.</em></h2><p className="mt-4 text-[#3f3d5c]">Withdraw a fixed amount every month from a fund while the rest stays invested. Popular with retirees, because only the gain portion of each withdrawal is taxed.</p></div>
        </div>
      </Section>
      <Section tone="paper">
        <SectionHead eyebrow="Calculators" title={<>Try <em>both.</em></>} />
        <Tabs tabs={[{ label: "STP calculator", content: <StpCalculator /> }, { label: "SWP calculator", content: <SwpCalculator /> }]} />
      </Section>
      <CTA title={<>Planning a large investment, or <em>retirement income?</em></>} primary={{ label: "Talk to us", href: "/contact" }} secondary={{ label: "Retirement calculator", href: "/calculators/retirement" }} />
      <Disclaimer text={disclaimers.mutualFunds + " " + disclaimers.calculators} />
    </Shell>
  );
}
