import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { CTA } from "@/components/ui/CTA";
import { buildMetadata } from "@/lib/seo";
import { team } from "@/content/team";
import { TODO } from "@/content/todo";

export const metadata = buildMetadata({ title: "Our Team: Leadership, Investment & Compliance", description: "Meet Dhanvesttor's team: Founder & CEO Anooshka Soham Bathwal, Co-founder Soham Bathwal, Fund Manager Ishan Daga, Compliance Officer Neha Verma and our research desk.", path: "/about/team" });

const groups = [{ key: "leadership", name: "Leadership" }, { key: "investment", name: "Investment team" }, { key: "compliance", name: "Compliance" }] as const;

export default function Team() {
  return (
    <Shell>
      <PageHero compact crumbs={[{ name: "About", path: "/about" }, { name: "Team", path: "/about/team" }]} eyebrow="Team" title={<>Named people. <em>Reachable</em> people.</>} lede="Every client knows who manages their money, who keeps it compliant, and who to call." />
      {groups.map((g, i) => (
        <Section key={g.key} tone={i % 2 ? "paper" : "ivory"}>
          <h2 className="mb-10 text-[2.2rem]">{g.name}</h2>
          <TeamGrid members={team.filter((m) => m.group === g.key)} columns={3} />
        </Section>
      ))}
      {TODO.advisers.length > 0 && (
        <Section>
          <h2 className="mb-10 text-[2.2rem]">Board of Advisers</h2>
          <div className="grid gap-8 md:grid-cols-3">{TODO.advisers.map((a) => <div key={a.name} className="border-t border-line pt-5"><h3 className="text-[1.4rem]">{a.name}</h3><p className="text-[13px] uppercase tracking-[.14em] text-raspberry">{a.role}</p><p className="mt-2 text-[15px] text-[#3f3d5c]">{a.bio}</p></div>)}</div>
        </Section>
      )}
      <CTA title={<>Want to work with <em>these people?</em></>} primary={{ label: "Careers", href: "/careers" }} secondary={{ label: "Contact", href: "/contact" }} />
    </Shell>
  );
}
