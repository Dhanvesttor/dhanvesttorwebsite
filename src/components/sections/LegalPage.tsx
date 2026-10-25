import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import Link from "next/link";

const links = [["Regulatory information", "/regulatory"], ["Disclosure document", "/regulatory/disclosure-document"], ["Investor charter", "/regulatory/investor-charter"], ["Grievance redressal", "/regulatory/grievance"], ["Complaints data", "/regulatory/complaints-data"], ["Privacy", "/regulatory/privacy"], ["Disclaimer", "/regulatory/disclaimer"], ["Accessibility", "/regulatory/accessibility"]];

export function LegalPage({ title, path, lede, updated, children }: { title: string; path: string; lede?: string; updated?: string; children: React.ReactNode }) {
  return (
    <Shell>
      <PageHero compact crumbs={path === "/regulatory" ? [{ name: "Regulatory", path }] : [{ name: "Regulatory", path: "/regulatory" }, { name: title, path }]} eyebrow="Regulatory" title={title} lede={lede} />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
          <nav aria-label="Regulatory pages" className="self-start lg:sticky lg:top-28">
            <ul className="grid gap-1 text-[14px]">{links.map(([l, h]) => <li key={h}><Link href={h} aria-current={h === path ? "page" : undefined} className={h === path ? "block rounded-lg bg-paper px-3 py-2 font-medium text-indigo" : "block rounded-lg px-3 py-2 text-[#3f3d5c] hover:bg-paper"}>{l}</Link></li>)}</ul>
          </nav>
          <div className="prose-dv min-w-0 max-w-[76ch]">{children}{updated && <p className="!mt-12 text-[13px] text-mist">Last updated: {updated}</p>}</div>
        </div>
      </Section>
    </Shell>
  );
}
