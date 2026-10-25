import Link from "next/link";
import { notFound } from "next/navigation";
import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { FaqList } from "@/components/sections/FaqList";
import { CTA } from "@/components/ui/CTA";
import { CalculatorBySlug } from "@/components/calculators/registry";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { calculators, getCalc } from "@/content/calculators";

export const dynamicParams = false;
export function generateStaticParams() { return calculators.map((c) => ({ slug: c.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCalc((await params).slug);
  if (!c) return {};
  return buildMetadata({ title: `${c.title} | Free Online Calculator`, description: c.description, path: `/calculators/${c.slug}` });
}

export default async function CalculatorPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCalc((await params).slug);
  if (!c) notFound();
  const related = calculators.filter((x) => x.slug !== c.slug && x.group === c.group).slice(0, 4);
  return (
    <Shell>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebApplication", name: `${c.title} by Dhanvesttor`, applicationCategory: "FinanceApplication", operatingSystem: "Any", offers: { "@type": "Offer", price: "0", priceCurrency: "INR" }, url: `https://dhanvesttor.com/calculators/${c.slug}` }} />
      <PageHero compact crumbs={[{ name: "Calculators", path: "/calculators" }, { name: c.name, path: `/calculators/${c.slug}` }]} eyebrow={`Calculator · ${c.group}`} title={c.title} lede={c.blurb} />
      <Section tone="paper"><CalculatorBySlug slug={c.slug} /></Section>
      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.3fr_1fr]">
          <div><p className="eyebrow mb-3">How it works</p><div className="prose-dv">{c.explainer.map((p) => <p key={p}>{p}</p>)}</div>
            {c.faqs.length > 0 && <div className="mt-12"><h2 className="mb-6 text-[2rem]">Questions</h2><FaqList items={c.faqs} /></div>}</div>
          <aside className="self-start rounded-2xl border border-line bg-white p-6 lg:sticky lg:top-28">
            <p className="eyebrow mb-4">Related calculators</p>
            <ul className="grid gap-2">{related.map((r) => <li key={r.slug}><Link href={`/calculators/${r.slug}`} className="block rounded-lg px-3 py-2 hover:bg-paper"><span className="font-medium">{r.name}</span><span className="block text-[13px] text-mist">{r.blurb}</span></Link></li>)}</ul>
            <Link href="/calculators" className="mt-4 inline-block text-[13.5px] font-medium text-raspberry underline underline-offset-4">All calculators →</Link>
          </aside>
        </div>
      </Section>
      <CTA title={<>A calculator gives a number. <em>A plan</em> gives a path.</>} primary={{ label: "Build a plan with us", href: "/contact" }} />
    </Shell>
  );
}
