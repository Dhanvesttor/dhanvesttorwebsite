import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHead } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { SipCalculator } from "@/components/calculators/calculators";
import { FaqList } from "@/components/sections/FaqList";
import { ContactBand } from "@/components/sections/ContactBand";
import { Disclaimer } from "@/components/sections/Disclaimer";
import { buildMetadata } from "@/lib/seo";
import { disclaimers } from "@/content/disclaimers";

export const metadata = buildMetadata({ title: "SIP (Systematic Investment Plan): Start from ₹5,000", description: "What a SIP is, how rupee-cost averaging works, how much to start with, step-up SIPs, and how to begin a SIP with Dhanvesttor.", path: "/mutual-funds/sip" });

export default function Sip() {
  return (
    <Shell>
      <PageHero crumbs={[{ name: "Mutual Funds", path: "/mutual-funds" }, { name: "SIP", path: "/mutual-funds/sip" }]} eyebrow="Systematic investment plan" title={<>The decision you make <em>once.</em></>}
        lede="A SIP invests a fixed amount in a mutual fund every month, automatically. You stop deciding whether this is a good month to invest. That is the whole trick, and it works."
        actions={<><Button href="/contact">Start a SIP</Button><Button href="/calculators/step-up-sip" variant="ghost">Step-up SIP calculator</Button></>} />
      <Section>
        <div className="grid gap-10 md:grid-cols-3">
          {[["Rupee-cost averaging", "The same amount buys more units when prices fall and fewer when they rise. Over time you pay a lower average price than the average market price."], ["Compounding", "Gains earn gains. The curve looks flat for years, then steepens. Most of the value of a 20-year SIP arrives in the last eight."], ["Discipline", "An auto-debit on salary day removes the hardest part of investing: deciding to do it again."]].map(([t, b]) => <div key={t} className="border-t border-line pt-6"><h3 className="text-[1.6rem]">{t}</h3><p className="mt-3 text-[#3f3d5c]">{b}</p></div>)}
        </div>
      </Section>
      <Section tone="paper"><SectionHead align="split" eyebrow="Calculator" title={<>See it <em>compound.</em></>} /><SipCalculator /></Section>
      <Section>
        <div className="mx-auto max-w-[860px]"><p className="eyebrow mb-3">Questions</p><h2 className="mb-8 text-[2.2rem]">SIP, <em>simply.</em></h2>
          <FaqList items={[
            { q: "How much should I start with?", a: "Whatever you will not miss. ₹5,000 a month that continues for ten years beats ₹50,000 that stops after two. You can raise it every year." },
            { q: "Which date is best?", a: "The date doesn't matter over the long run. Pick a day just after your salary arrives." },
            { q: "What happens if I miss an instalment?", a: "Nothing dramatic. The fund house may retry; after three consecutive misses the SIP may be cancelled. Your existing units stay invested." },
            { q: "Can I stop a SIP?", a: "Yes, any time, without penalty, except that ELSS instalments stay locked for three years each." },
          ]} /></div>
      </Section>
      <ContactBand defaultPath="mf" paths={["mf"]} heading={<>Set up your first SIP <em>this week.</em></>} />
      <Disclaimer text={disclaimers.mutualFunds + " " + disclaimers.calculators} />
    </Shell>
  );
}
