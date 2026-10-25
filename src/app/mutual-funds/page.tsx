import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHead } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { StepList } from "@/components/sections/StepList";
import { LogoWall } from "@/components/sections/LogoWall";
import { SipCalculator } from "@/components/calculators/calculators";
import { ContactBand } from "@/components/sections/ContactBand";
import { Disclaimer } from "@/components/sections/Disclaimer";
import { buildMetadata } from "@/lib/seo";
import { mfCategories } from "@/content/mfCategories";
import { amcs } from "@/content/amcs";
import { photos } from "@/content/images";
import { disclaimers } from "@/content/disclaimers";

export const metadata = buildMetadata({ title: "Mutual Fund Investment in Kolkata: SIP from ₹5,000", description: "Invest in mutual funds with Dhanvesttor: goal-based plans, curated funds from 20+ fund houses including ICICI Prudential, HDFC, Kotak and Motilal Oswal. SIPs from ₹5,000.", path: "/mutual-funds" });

export default function MutualFunds() {
  return (
    <Shell>
      <PageHero crumbs={[{ name: "Mutual Funds", path: "/mutual-funds" }]} eyebrow="Mutual funds" title={<>Twenty fund houses. <em>One shortlist</em> built around you.</>}
        lede="We begin with your goals, not a list of funds. Then we choose from more than twenty partner fund houses, set up your SIPs, and keep you invested through the moments that tempt everyone to stop."
        actions={<><Button href="/contact">Start from ₹5,000 a month</Button><Button href="/mutual-funds/how-we-select" variant="ghost">How we select funds</Button></>}
        image={photos.desk.label} imageSrc={photos.desk.src} />
      <Section>
        <SectionHead align="split" eyebrow="Why invest through us" title={<>The fee isn't for the buy button. <em>It's for the stop button.</em></>} lede="Anyone can buy a fund. What helps is a plan that fits your life, a shortlist you can trust, and someone to call when markets fall." />
        <ServiceGrid columns={4} items={[
          { title: "Goal-based plans", blurb: "Every rupee has a job and a date: emergency, home, education, retirement.", href: "/calculators/goal", meta: "Plan" },
          { title: "Curated selection", blurb: "We read factsheets from twenty houses and shortlist on process, not last year's return.", href: "/mutual-funds/how-we-select", meta: "Select" },
          { title: "Digital onboarding", blurb: "KYC, bank mandate and first SIP, usually within a day or two.", href: "/mutual-funds/faqs", meta: "Start" },
          { title: "A person to call", blurb: "A dedicated relationship manager and reviews when your life or the market changes.", href: "/contact", meta: "Stay" },
        ]} />
      </Section>
      <Section tone="paper">
        <SectionHead align="split" eyebrow="Fund categories" title={<>Match the fund to the <em>time</em> you have.</>} lede="Short-term money and long-term money need different homes. Start here." />
        <ServiceGrid columns={3} items={mfCategories.map((c) => ({ title: c.name, blurb: c.lede.split(". ")[0] + ".", href: `/mutual-funds/${c.slug}`, meta: c.horizon }))} />
      </Section>
      <Section>
        <SectionHead align="split" eyebrow="Ways to invest" title={<>Monthly, all at once, <em>or gradually.</em></>} />
        <StepList columns={4} steps={[
          { title: "SIP", text: "A fixed amount every month. For salaried investors building without a large corpus." },
          { title: "Lumpsum", text: "A single investment, for a bonus, an inheritance or idle cash." },
          { title: "STP", text: "Park a lumpsum in debt and move it into equity month by month." },
          { title: "SWP", text: "Draw a regular income from a corpus while the rest stays invested." },
        ]} />
        <div className="mt-10 flex flex-wrap gap-3"><Button href="/mutual-funds/sip" variant="ghost">All about SIPs</Button><Button href="/mutual-funds/stp-swp" variant="ghost">STP & SWP explained</Button></div>
      </Section>
      <Section tone="sand">
        <SectionHead align="split" eyebrow="Try it" title={<>What does ₹10,000 a month <em>become?</em></>} />
        <SipCalculator compact />
      </Section>
      <Section>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6"><div><p className="eyebrow mb-3">Partners</p><h2 className="text-[2.4rem]">Fund houses we <em>work with.</em></h2></div><Button href="/mutual-funds/partners" variant="ghost">All partners</Button></div>
        <LogoWall items={amcs.slice(0, 10)} compact />
      </Section>
      <ContactBand defaultPath="mf" paths={["mf", "pms", "clcb"]} heading={<>Start with one SIP. <em>We'll do the rest.</em></>} />
      <Disclaimer text={disclaimers.mutualFunds} />
    </Shell>
  );
}
