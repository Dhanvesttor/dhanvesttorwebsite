import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHead } from "@/components/ui/Section";
import { StatBand } from "@/components/sections/StatBand";
import { CTA } from "@/components/ui/CTA";
import { buildMetadata } from "@/lib/seo";
import { stories } from "@/content/clcb";
import { TODO } from "@/content/todo";

export const metadata = buildMetadata({ title: "CLCB Stories & Impact", description: "What changes when women learn the language of money: stories and impact from Dhanvesttor's CLCB financial education programme.", path: "/clcb/stories" });

export default function Stories() {
  const prod = process.env.NODE_ENV === "production";
  return (
    <Shell>
      <PageHero crumbs={[{ name: "CLCB", path: "/clcb" }, { name: "Stories & impact", path: "/clcb/stories" }]} eyebrow="Stories & impact" title={<>The milestone that matters most is when <em>learning becomes action.</em></>}
        lede="A woman starts asking questions, understands her options, and makes a financial decision for herself. Here are a few of those moments." />
      <Section>
        <div className="grid gap-8 md:grid-cols-3">
          {stories.map((s) => (
            <figure key={s.quote} className="flex flex-col justify-between rounded-2xl border border-line bg-white p-7">
              <blockquote className="font-display text-[1.4rem] font-light leading-snug">“{s.quote}”</blockquote>
              <figcaption className="mt-6 text-[13.5px] text-mist">{s.name} · {s.place}</figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-6 text-[12.5px] text-mist">Shared with permission; names withheld at participants&apos; request.</p>
      </Section>
      <Section tone="paper">
        <SectionHead align="split" eyebrow="Impact" title={<>Measuring what <em>changes.</em></>} lede="We track participation, what people learn, and what they do afterwards: an account opened, a statement read, a first SIP, a policy checked. We will publish the full impact report here." />
        <StatBand tone="ivory" stats={[
          ...(TODO.clcbReachConfirmed || !prod ? [{ value: TODO.clcbReach, label: "women and girls reached", flag: TODO.clcbReachConfirmed ? undefined : "⚠ confirm" }] : []),
          { value: TODO.clcbWorkshops ?? "—", label: "sessions held", flag: TODO.clcbWorkshops || prod ? undefined : "⚠ add" },
          { value: TODO.clcbCities ?? "—", label: "cities and towns", flag: TODO.clcbCities || prod ? undefined : "⚠ add" },
          { value: "2 lakh", label: "our next target, in 12 to 18 months" },
        ]} />
      </Section>
      <CTA title={<>Write the <em>next</em> story.</>} primary={{ label: "Join the community", href: "/clcb/join" }} />
    </Shell>
  );
}
