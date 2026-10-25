import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHead } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { Timeline } from "@/components/sections/Timeline";
import { StatBand } from "@/components/sections/StatBand";
import { PressStrip } from "@/components/sections/PressStrip";
import { CTA } from "@/components/ui/CTA";
import { buildMetadata } from "@/lib/seo";
import { team } from "@/content/team";
import { photos } from "@/content/images";
import { site } from "@/content/site";

export const metadata = buildMetadata({ title: "About Dhanvesttor: Designed by Women, for Everyone", description: "The story of Dhanvesttor: why Anooshka Soham Bathwal founded a SEBI-registered wealth firm in Kolkata, our team, our milestones and what we stand for.", path: "/about" });

export default function About() {
  return (
    <Shell>
      <PageHero crumbs={[{ name: "About", path: "/about" }]} eyebrow="About Dhanvesttor" title={<>Real wealth isn&apos;t just built. <em>It&apos;s owned.</em></>}
        lede="Dhanvesttor exists because too many capable women were left out of decisions about their own money. Not for lack of interest. For lack of access, and trust." image={photos.office.label} />
      <Section>
        <SplitFeature flip eyebrow="Our story" title={<>A firm built from <em>an uncomfortable room.</em></>} image={photos.founder.label} ratio="3/4"
          lede={<>
            <p>Our founder, Anooshka Soham Bathwal, trained in finance at the London School of Economics and spent her early career in rooms full of men in suits. She found them intimidating, and she noticed that other women did too.</p>
            <p className="mt-4">She built Dhanvesttor as the opposite: a SEBI-registered portfolio manager where the conversation is a dialogue, not a pitch, and where learning comes before any product. What began as a women-focused PMS has grown into a firm with mutual fund distribution, insurance, fixed income, and a community programme that reaches women well beyond our client base.</p>
          </>}>
          <div className="flex flex-wrap gap-3"><Button href="/about/team/anooshka-soham-bathwal" variant="ghost">Anooshka&apos;s profile</Button><Button href="/about/purpose" variant="link">Purpose & values →</Button></div>
        </SplitFeature>
      </Section>
      <StatBand stats={[{ value: "2023", label: "Driv Drisht LLP incorporated" }, { value: "2024", label: `SEBI PMS registration ${site.sebiReg}` }, { value: "20+", label: "partner fund houses" }, { value: "19 yrs", label: "fund manager experience" }]} />
      <Section>
        <SectionHead align="split" eyebrow="Leadership" title={<>The people behind <em>your portfolio.</em></>} lede="A founder, a co-founder, a fund manager with nearly two decades in research, and a compliance officer who keeps every relationship within SEBI's rules." />
        <TeamGrid members={team} />
      </Section>
      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div><p className="eyebrow mb-3">Milestones</p><h2 className="text-[2.4rem]">How we <em>got here.</em></h2></div>
          <Timeline items={[
            { when: "May 2023", title: "Driv Drisht LLP incorporated", text: "Dhanvesttor is founded in Kolkata as a women-first wealth firm." },
            { when: "February 2024", title: "SEBI portfolio manager registration", text: "Registration No. INP000008570. The regulated investment business that funds our wider mission." },
            { when: "April 2024", title: "FAITH Fund launched", text: "Our flexi-cap PMS strategy, managed by Ishan Daga, benchmarked to BSE 500 TRI." },
            { when: "2024 – 2025", title: "CLCB grows into a movement", text: "Workshops, learning circles and community outreach across Bengal; recognised by Startup India and DPIIT." },
            { when: "2026", title: "Expanding to North and West India", text: "Insurance and fixed income join the platform; CLCB aims to reach two lakh more women." },
          ]} />
        </div>
      </Section>
      <section className="bg-ivory"><PressStrip /></section>
      <Section>
        <SectionHead eyebrow="Why clients trust us" title={<>Regulated, transparent, <em>reachable.</em></>} />
        <div className="grid gap-6 md:grid-cols-3">
          {[["Regulated", `SEBI Registered Portfolio Manager ${site.sebiReg}. Kotak Mahindra Bank as custodian. Monthly complaints data published.`], ["Transparent", "Stock-level monthly statements for PMS clients. Returns shown in SEBI's format, including the bad years."], ["Reachable", "A named relationship manager, a fund manager you can meet, and a founder who still runs workshops."]].map(([t, b]) => <div key={t} className="rounded-2xl border border-line bg-white p-6"><h3 className="text-[1.45rem]">{t}</h3><p className="mt-2 text-[15px] text-[#3f3d5c]">{b}</p></div>)}
        </div>
      </Section>
      <CTA eyebrow="Her Money, Her Growth" title={<>Come and <em>meet us.</em></>} lede="Our office is in Elgin, Kolkata. Tea is on us." primary={{ label: "Contact", href: "/contact" }} secondary={{ label: "Careers", href: "/careers" }} />
    </Shell>
  );
}
