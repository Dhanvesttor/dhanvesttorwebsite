import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHead } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ContactBand } from "@/components/sections/ContactBand";
import { Disclaimer } from "@/components/sections/Disclaimer";
import { disclaimers } from "@/content/disclaimers";
import Link from "next/link";

type Props = {
  parent: { name: string; path: string }; slug: string; eyebrow: string; title: string; lede: string;
  items: readonly (readonly [string, string])[]; itemsTitle: React.ReactNode; side: { title: React.ReactNode; list: readonly string[] };
  siblings: { name: string; path: string }[]; path: "insurance" | "bonds";
};

export function ProtectPage(p: Props) {
  return (
    <Shell>
      <PageHero crumbs={[p.parent, { name: p.title, path: `${p.parent.path}/${p.slug}` }]} eyebrow={p.eyebrow} title={p.title} lede={p.lede}
        actions={<Button href="#contact">Ask us about {p.title.toLowerCase()}</Button>} />
      <Section>
        <SectionHead eyebrow="What's covered" title={p.itemsTitle} />
        <div className="grid gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {p.items.map(([t, b]) => <div key={t} className="border-t border-line pt-5"><h3 className="text-[1.4rem]">{t}</h3><p className="mt-2 text-[15px] text-[#3f3d5c]">{b}</p></div>)}
        </div>
        <p className="mt-10 text-[13.5px] text-mist">Products, issuers and terms available to you are confirmed in your first conversation.</p>
      </Section>
      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <h2 className="text-[2.2rem]">{p.side.title}</h2>
          <ul className="grid gap-4">{p.side.list.map((x) => <li key={x} className="flex gap-3 text-[1.02rem]"><span className="text-raspberry">—</span>{x}</li>)}</ul>
        </div>
      </Section>
      <Section tone="sand" tight>
        <p className="eyebrow mb-5">Also in {p.parent.name}</p>
        <ul className="flex flex-wrap gap-3">{p.siblings.map((s) => <li key={s.path}><Link href={s.path} className="inline-block rounded-full border border-ink/15 bg-ivory px-4 py-2 text-[14px] hover:border-indigo hover:text-indigo">{s.name}</Link></li>)}</ul>
      </Section>
      <ContactBand defaultPath={p.path} paths={[p.path, "mf", "pms"]} />
      <Disclaimer text={disclaimers.insuranceBonds} />
    </Shell>
  );
}
