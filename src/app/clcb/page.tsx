import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHead } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { StatBand } from "@/components/sections/StatBand";
import { EventList } from "@/components/sections/EventList";
import { FaqList } from "@/components/sections/FaqList";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { CTA } from "@/components/ui/CTA";
import { buildMetadata } from "@/lib/seo";
import { cms } from "@/lib/cms";
import { programmes } from "@/content/clcb";
import { photos } from "@/content/images";
import { TODO } from "@/content/todo";

export const metadata = buildMetadata({ title: "CLCB: Free Financial Literacy Workshops for Women", description: "Co-Learning & Community Building (CLCB) by Dhanvesttor: free money workshops, learning circles and masterclasses for women in Kolkata, across Bengal and online.", path: "/clcb" });
export const revalidate = 600;

export default async function Clcb() {
  const [events, faqs] = await Promise.all([cms.getEvents({ upcoming: true }), cms.getFaqs("clcb")]);
  const prod = process.env.NODE_ENV === "production";
  return (
    <Shell>
      <PageHero tone="sand" crumbs={[{ name: "CLCB", path: "/clcb" }]} eyebrow="Co-Learning & Community Building" title={<>Every woman deserves to <em>understand</em> her money.</>}
        lede="CLCB is our purpose in action. Free workshops, learning circles and masterclasses where no question is too basic, no one is selling, and you leave with one thing you can do tomorrow."
        actions={<><Button href="/clcb/join">Join the community</Button><Button href="/clcb/events" variant="ghost">Upcoming sessions</Button></>}
        image={photos.clcbWorkshop.label} />
      <StatBand tone="ivory" stats={[
        ...(TODO.clcbReachConfirmed || !prod ? [{ value: TODO.clcbReach, label: "women and girls reached", flag: TODO.clcbReachConfirmed ? undefined : "⚠ confirm" }] : []),
        { value: "₹0", label: "cost to attend, always" },
        { value: "6", label: "programme formats, beginner to advanced" },
        { value: "2 lakh", label: "women we aim to reach next, across North and West India" },
      ]} />
      <Section>
        <SectionHead align="split" eyebrow="Why CLCB exists" title={<>Not a class. <em>A community.</em></>}
          lede="Most women in India have been left out of their own financial conversations, by language, by complexity, by assumption. A woman unsure about investing resists a pitch, but readily joins a room of women asking the same questions. CLCB is that room." />
        <div className="grid gap-8 md:grid-cols-4">
          {[["Non-judgemental", "The only foolish question is the one you didn't ask."], ["For every stage", "From a first savings account to a family portfolio."], ["Real-world", "Every session ends with one specific action."], ["No pitch", "Many participants never invest with us. That is fine."]].map(([t, b]) => <div key={t} className="border-t-2 border-terracotta pt-5"><h3 className="text-[1.4rem]">{t}</h3><p className="mt-2 text-[15px] text-[#3f3d5c]">{b}</p></div>)}
        </div>
      </Section>
      <Section tone="paper">
        <SectionHead align="split" eyebrow="Programmes" title={<>Six ways <em>in.</em></>} />
        <ServiceGrid columns={3} items={programmes.map((p) => ({ title: p.name, blurb: p.text, href: `/clcb/programmes#${p.slug}`, meta: p.who }))} />
      </Section>
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div className="grid grid-cols-2 gap-4 self-start"><ImagePlaceholder label={photos.clcbCircle.label} ratio="3/4" /><ImagePlaceholder label={photos.clcbQuestion.label} ratio="3/4" className="mt-12" /></div>
          <div><div className="mb-6 flex items-end justify-between gap-4"><div><p className="eyebrow mb-2">Calendar</p><h2 className="text-[2.2rem]">Next <em>sessions.</em></h2></div><Button href="/clcb/events" variant="link">All events →</Button></div><EventList events={events.slice(0, 3)} /></div>
        </div>
      </Section>
      <Section tone="sand"><div className="mx-auto max-w-[860px]"><p className="eyebrow mb-3">Questions</p><h2 className="mb-8 text-[2.2rem]">Before you <em>come.</em></h2><FaqList items={faqs} /></div></Section>
      <CTA tone="indigo" eyebrow="Her Money, Her Growth" title={<>Bring a friend, a sister, <em>your mother.</em></>} lede="Sessions are free and open to anyone who wants to understand money better." primary={{ label: "Join the community", href: "/clcb/join" }} secondary={{ label: "Partner with us", href: "/clcb/partners" }} />
    </Shell>
  );
}
