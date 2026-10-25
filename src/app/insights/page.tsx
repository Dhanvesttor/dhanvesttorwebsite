import Link from "next/link";
import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { PostGrid } from "@/components/sections/PostGrid";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { buildMetadata } from "@/lib/seo";
import { cms } from "@/lib/cms";

export const metadata = buildMetadata({ title: "Insights: Markets, Mutual Funds, PMS & Women and Money", description: "Plain-language articles from Dhanvesttor on markets, mutual funds, portfolio management, women and money, and notes from our CLCB community.", path: "/insights" });
export const revalidate = 300;

export default async function Insights() {
  const [posts, categories] = await Promise.all([cms.getPosts(), cms.getCategories()]);
  return (
    <Shell>
      <PageHero compact crumbs={[{ name: "Insights", path: "/insights" }]} eyebrow="Insights" title={<>Read before you <em>invest.</em></>} lede="Plain-language writing from our fund manager, founder and research desk. No tips, no noise." />
      <section className="sticky top-[72px] z-30 border-b border-line bg-ivory/90 backdrop-blur-md lg:top-[88px]">
        <nav aria-label="Categories" className="mx-auto flex max-w-[1180px] gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/insights" className="shrink-0 rounded-full bg-indigo px-4 py-1.5 text-[13px] font-medium text-ivory">All</Link>
          {categories.map((c) => <Link key={c.slug} href={`/insights/category/${c.slug}`} className="shrink-0 rounded-full border border-line px-4 py-1.5 text-[13px] hover:border-indigo hover:text-indigo">{c.name}</Link>)}
        </nav>
      </section>
      <Section><PostGrid posts={posts} featured /></Section>
      <Section tone="sand" tight>
        <div className="grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-center">
          <div><p className="eyebrow mb-2">Monthly letter</p><h2 className="text-[2rem]">One email a month. <em>Never a pitch.</em></h2></div>
          <NewsletterForm />
        </div>
      </Section>
    </Shell>
  );
}
