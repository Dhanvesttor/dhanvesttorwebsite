import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHead } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { FaqList } from "@/components/sections/FaqList";
import { ContactBand } from "@/components/sections/ContactBand";
import { Disclaimer } from "@/components/sections/Disclaimer";
import { mfCategories, type MfCategory } from "@/content/mfCategories";
import { disclaimers } from "@/content/disclaimers";
import Link from "next/link";

export function MfCategoryPage({ c }: { c: MfCategory }) {
  const others = mfCategories.filter((o) => o.slug !== c.slug);
  return (
    <Shell>
      <PageHero crumbs={[{ name: "Mutual Funds", path: "/mutual-funds" }, { name: c.name, path: `/mutual-funds/${c.slug}` }]} eyebrow={c.name} title={c.title} lede={c.lede}
        actions={<><Button href="/contact">Build a plan with us</Button>{c.calc && <Button href={c.calc.href} variant="ghost">{c.calc.label}</Button>}</>} />
      <section className="border-b border-line bg-paper">
        <div className="mx-auto grid max-w-[1180px] gap-px px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[["Typical horizon", c.horizon], ["Risk", c.risk], ["Suits", c.suits]].map(([k, v]) => (
            <div key={k} className="py-6 sm:px-6 sm:first:pl-0"><p className="eyebrow">{k}</p><p className="mt-2 text-[15px] text-ink">{v}</p></div>
          ))}
        </div>
      </section>
      <Section>
        <SectionHead eyebrow="Types" title={<>What sits <em>inside</em> this category.</>} />
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {c.types.map((t) => <div key={t.name} className="border-t border-line pt-5"><h3 className="text-[1.45rem]">{t.name}</h3><p className="mt-2 text-[15.5px] text-[#3f3d5c]">{t.text}</p></div>)}
        </div>
      </Section>
      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-2">
          <div><p className="eyebrow mb-3">Before you invest</p><h2 className="text-[2.2rem]">What to <em>keep in mind.</em></h2>
            <ul className="mt-6 grid gap-3">{c.consider.map((x) => <li key={x} className="flex gap-3 text-[1.02rem]"><span className="text-raspberry">—</span>{x}</li>)}</ul></div>
          <div><p className="eyebrow mb-3">Tax</p><h2 className="text-[2.2rem]">How gains are <em>taxed.</em></h2><p className="mt-6 text-[1.02rem] text-[#3f3d5c]">{c.tax}</p><p className="mt-3 text-[13px] text-mist">Tax rules change. Please consult your tax adviser for your situation.</p></div>
        </div>
      </Section>
      {c.faqs.length > 0 && <Section><div className="mx-auto max-w-[860px]"><p className="eyebrow mb-3">Questions</p><h2 className="mb-8 text-[2.2rem]">Asked <em>often.</em></h2><FaqList items={c.faqs} /></div></Section>}
      <Section tone="sand" tight>
        <p className="eyebrow mb-5">Other categories</p>
        <ul className="flex flex-wrap gap-3">{others.map((o) => <li key={o.slug}><Link href={`/mutual-funds/${o.slug}`} className="inline-block rounded-full border border-ink/15 bg-ivory px-4 py-2 text-[14px] hover:border-indigo hover:text-indigo">{o.name}</Link></li>)}</ul>
      </Section>
      <ContactBand defaultPath="mf" paths={["mf", "pms"]} />
      <Disclaimer text={disclaimers.mutualFunds} />
    </Shell>
  );
}
