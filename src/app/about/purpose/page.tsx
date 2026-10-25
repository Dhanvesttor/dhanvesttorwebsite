import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHead } from "@/components/ui/Section";
import { CTA } from "@/components/ui/CTA";
import { buildMetadata } from "@/lib/seo";
import { pms } from "@/content/pms";

export const metadata = buildMetadata({ title: "Our Purpose & Values", description: "Dhanvesttor's mission, vision and values: a women-inclusive financial ecosystem where people understand and own their wealth.", path: "/about/purpose" });

export default function Purpose() {
  return (
    <Shell>
      <PageHero tone="indigo" crumbs={[{ name: "About", path: "/about" }, { name: "Purpose & values", path: "/about/purpose" }]} eyebrow="Purpose" title={<>Make financial independence <em>accessible</em> at every income level.</>}
        lede="For one woman, that means managing an investment portfolio. For another, it means understanding her savings, asking the right question, or making her first independent financial decision. Both are greater control over her future." />
      <Section>
        <div className="grid gap-12 md:grid-cols-2">
          <div className="border-t-2 border-raspberry pt-6"><p className="eyebrow">Mission</p><p className="mt-4 font-display text-[1.75rem] font-light leading-snug">To establish a women-inclusive financial ecosystem that encourages people to attain their financial dreams.</p></div>
          <div className="border-t-2 border-marigold pt-6"><p className="eyebrow">Vision</p><p className="mt-4 font-display text-[1.75rem] font-light leading-snug">Women in control of their financial futures, not only maximising their wealth but becoming genuinely finance-confident.</p></div>
        </div>
      </Section>
      <Section tone="paper">
        <SectionHead eyebrow="What we will always do" title={<>Our <em>commitments.</em></>} />
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[["Start with the person", "Your goals, responsibilities and comfort with risk come before any product."], ["Explain before we invest", "If we can't explain it in plain words, we won't recommend it."], ["Tell the truth about performance", "Including the months that went badly, in SEBI's format, against the benchmark."], ["Earn when you earn", "Our PMS performance fee applies only above a hurdle and a high-water mark."], ["Teach beyond our clients", "Part of what we earn funds free financial education through CLCB."], ["Invest in high principles", "A strict negative list keeps poor governance and harmful practices out of the portfolio."]].map(([t, b]) => <div key={t}><h3 className="text-[1.45rem]">{t}</h3><p className="mt-2 text-[15px] text-[#3f3d5c]">{b}</p></div>)}
        </div>
      </Section>
      <Section>
        <SectionHead eyebrow="The 4 D's" title={<>How we work with <em>every</em> client.</>} />
        <div className="grid gap-8 md:grid-cols-4">{pms.fourDs.map((d, i) => <div key={d.title} className="border-t border-line pt-5"><span className="font-display text-raspberry">{String(i + 1).padStart(2, "0")}</span><h3 className="mt-2 text-[1.6rem]">{d.title}</h3><p className="mt-2 text-[15px] text-[#3f3d5c]">{d.text}</p></div>)}</div>
      </Section>
      <CTA title={<>Purpose is what you <em>do</em>, not what you say.</>} primary={{ label: "See CLCB in action", href: "/clcb" }} secondary={{ label: "Meet the team", href: "/about/team" }} />
    </Shell>
  );
}
