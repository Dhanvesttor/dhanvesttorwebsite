import Link from "next/link";
import { Shell } from "@/components/layout/Shell";
import { Hero } from "@/components/home/Hero";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { FaithLetters } from "@/components/home/FaithLetters";
import { Section, SectionHead } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Hairline } from "@/components/ui/Hairline";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { StatBand } from "@/components/sections/StatBand";
import { PressStrip } from "@/components/sections/PressStrip";
import { PostGrid } from "@/components/sections/PostGrid";
import { EventList } from "@/components/sections/EventList";
import { ContactBand } from "@/components/sections/ContactBand";
import { SipCalculator } from "@/components/calculators/calculators";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, webPageJsonLd } from "@/lib/seo";
import { cms } from "@/lib/cms";
import { TODO } from "@/content/todo";
import { photos } from "@/content/images";
import { site } from "@/content/site";

export const revalidate = 300;

const description = "Dhanvesttor is a SEBI-registered portfolio manager in Kolkata. Personal portfolios through the FAITH Fund, curated mutual funds from 20+ fund houses, insurance, bonds, and CLCB financial education.";
export const metadata = buildMetadata({ title: "Dhanvesttor | Wealth you understand. Wealth you own.", description, path: "/" });

export default async function Home() {
  const [posts, events] = await Promise.all([cms.getPosts({ limit: 3 }), cms.getEvents({ upcoming: true })]);
  return (
    <Shell>
      <JsonLd data={webPageJsonLd("Dhanvesttor", "/", description)} />
      <Hero />

      {/* 02 Trust band */}
      <section aria-label="Why people trust us">
        <StatBand stats={[
          TODO.clcbReachConfirmed || process.env.NODE_ENV !== "production"
            ? { value: TODO.clcbReach, label: "women and girls reached through our financial education", flag: TODO.clcbReachConfirmed ? undefined : "⚠ confirm" }
            : { value: "Free", label: "financial education through CLCB, open to every woman" },
          { value: "20+", label: "partner mutual fund houses, one curated shortlist" },
          { value: "19 yrs", label: "fund manager experience; Bloomberg-ranked analyst" },
          { value: "2024", label: `SEBI portfolio manager registration, ${site.sebiReg}` },
        ]} />
        <PressStrip className="bg-paper" />
      </section>

      {/* 03 What we do */}
      <Section>
        <SectionHead align="split" eyebrow="What we do" title={<>One firm for the <em>whole</em> of your money.</>}
          lede="Some clients start with a ₹5,000 SIP. Some bring a family portfolio. Many start at a CLCB session with a question they were embarrassed to ask anywhere else. Every path is explained before anything is invested." />
        <Reveal><WhatWeDo /></Reveal>
      </Section>

      {/* 04 FAITH */}
      <Section tone="indigo" className="grain">
        <SectionHead light align="split" eyebrow="The FAITH strategy" title={<>Five questions every company <em>must answer.</em></>}
          lede="Our flagship PMS strategy is flexi-cap: it can own large, mid or small companies. What it cannot do is skip a question. Every holding has to pass all five." />
        <Reveal><FaithLetters /></Reveal>
        <div className="mt-14 flex flex-wrap items-center gap-4 border-t border-ivory/15 pt-8">
          <Button href="/pms/faith-fund" variant="raspberry">See the FAITH Fund</Button>
          <Button href="/pms/philosophy" variant="light">Our philosophy & process</Button>
          <span className="text-[13px] text-ivory/60">Benchmark: BSE 500 TRI · Minimum ₹50 lakh · Managed by Ishan Daga</span>
        </div>
      </Section>

      {/* 05 Founder's note */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          <Reveal><ImagePlaceholder label={photos.founder.label} src={photos.founder.src} alt={photos.founder.alt} ratio="4/5" /></Reveal>
          <Reveal delay={0.1}>
            <Hairline className="mb-6" />
            <p className="eyebrow mb-4">Why we exist</p>
            <blockquote className="font-display text-[1.9rem] font-light leading-snug text-ink sm:text-[2.4rem]">
              “I kept meeting women who ran households, teams and companies, and still left money to someone else. Not because they couldn&apos;t. Because no one had made room for their questions. <em>Dhanvesttor is that room.</em>”
            </blockquote>
            <p className="mt-6 text-[14px] text-mist"><span className="font-medium text-ink">Anooshka Soham Bathwal</span> · Founder & CEO · M.Sc. (LSE)</p>
            <div className="mt-8 flex flex-wrap gap-3"><Button href="/about" variant="ghost">Our story</Button><Button href="/about/team" variant="link">Meet the team →</Button></div>
          </Reveal>
        </div>
      </Section>

      {/* 06 CLCB */}
      <Section tone="sand">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <Hairline className="mb-6" />
            <p className="eyebrow mb-3 text-terracotta">Co-Learning & Community Building</p>
            <h2 className="text-[2.4rem] sm:text-[3rem]">The room where <em>no question</em> is too basic.</h2>
            <p className="mt-5 max-w-[50ch] text-lg text-[#3f3d5c]">CLCB is free and carries no sales pitch. Workshops, learning circles and masterclasses across Bengal and online, for anyone starting out and anyone who wants to go deeper.</p>
            <div className="mt-8 grid grid-cols-2 gap-4">
              <ImagePlaceholder label={photos.clcbWorkshop.label} ratio="4/5" />
              <ImagePlaceholder label={photos.clcbCircle.label} ratio="4/5" className="mt-10" />
            </div>
          </div>
          <div>
            <div className="mb-6 flex items-end justify-between gap-4"><h3 className="text-[1.75rem]">Next sessions</h3><Link href="/clcb/events" className="text-[13.5px] font-medium text-raspberry underline underline-offset-4">All events →</Link></div>
            <EventList events={events.slice(0, 2)} />
            <div className="mt-8 flex flex-wrap gap-3"><Button href="/clcb/join">Join the community</Button><Button href="/clcb" variant="ghost">What CLCB is</Button></div>
          </div>
        </div>
      </Section>

      {/* 07 Calculators */}
      <Section>
        <SectionHead align="split" eyebrow="Calculators" title={<>Run the numbers <em>yourself.</em></>}
          lede="Twelve calculators, no sign-up. Start with a SIP: change the amount, the rate and the years, and see what patience does." />
        <Reveal><SipCalculator compact /></Reveal>
      </Section>

      {/* 08 Insights */}
      <Section tone="paper">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div><p className="eyebrow mb-3">Insights</p><h2 className="text-[2.4rem] sm:text-[3rem]">Read before you <em>invest.</em></h2></div>
          <Button href="/insights" variant="ghost">All insights</Button>
        </div>
        <PostGrid posts={posts} />
      </Section>

      {/* 09 Contact */}
      <ContactBand paths={["pms", "mf", "clcb", "insurance", "bonds"]} />
    </Shell>
  );
}
