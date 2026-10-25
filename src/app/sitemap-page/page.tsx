import Link from "next/link";
import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";
import { nav, footerNav } from "@/content/nav";

export const metadata = buildMetadata({ title: "Site Map", description: "Every page on the Dhanvesttor website.", path: "/sitemap-page" });

export default function SiteMapPage() {
  return (
    <Shell>
      <PageHero compact eyebrow="Site map" title="Every page, in one place." crumbs={[{ name: "Site map", path: "/sitemap-page" }]} />
      <Section>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {nav.filter((g) => g.children).map((g) => (
            <div key={g.label}><h2 className="mb-4 text-[1.5rem]"><Link href={g.href}>{g.label}</Link></h2>
              <ul className="grid gap-2 text-[14.5px]">{g.children!.map((c) => <li key={c.href}><Link href={c.href} className="text-[#3f3d5c] hover:text-raspberry">{c.label}</Link></li>)}</ul></div>
          ))}
          <div><h2 className="mb-4 text-[1.5rem]"><Link href="/insights">Insights</Link></h2><ul className="grid gap-2 text-[14.5px]"><li><Link href="/insights/newsletter" className="text-[#3f3d5c] hover:text-raspberry">Newsletter</Link></li></ul></div>
          <div><h2 className="mb-4 text-[1.5rem]">Regulatory</h2><ul className="grid gap-2 text-[14.5px]">{footerNav[3].links.map(([l, h]) => <li key={h}><Link href={h} className="text-[#3f3d5c] hover:text-raspberry">{l}</Link></li>)}</ul></div>
        </div>
      </Section>
    </Shell>
  );
}
