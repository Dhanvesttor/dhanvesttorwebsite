import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import { cms } from "@/lib/cms";
import { formatDate } from "@/lib/utils";
import { site } from "@/content/site";

export const metadata = buildMetadata({ title: "Press & Media", description: "Dhanvesttor in the news: coverage in Mint, Harper's Bazaar India, Cafemutual, Business India and more. Media enquiries and press kit.", path: "/media" });
export const revalidate = 3600;

export default async function Media() {
  const press = await cms.getPress();
  return (
    <Shell>
      <PageHero crumbs={[{ name: "Media", path: "/media" }]} eyebrow="Press & media" title={<>In the <em>conversation.</em></>} lede="Coverage of Dhanvesttor, our founder and our work on women's financial participation."
        actions={<><Button href="/media/kit">Media kit</Button><Button href={`mailto:${site.email}?subject=Media%20enquiry`} variant="ghost">Media enquiries</Button></>} />
      <Section>
        <ul className="divide-y divide-line border-y border-line">
          {press.map((p) => (
            <li key={p.url}><a href={p.url} target="_blank" rel="noopener" className="group grid gap-2 py-6 md:grid-cols-[200px_1fr_120px] md:items-baseline">
              <span className="font-display text-[1.2rem] text-indigo">{p.outlet}</span>
              <span className="text-[1.05rem] group-hover:text-raspberry">{p.title} <span aria-hidden>↗</span></span>
              <span className="text-[13px] text-mist md:text-right">{p.date ? formatDate(p.date) : ""}</span>
            </a></li>
          ))}
        </ul>
      </Section>
    </Shell>
  );
}
