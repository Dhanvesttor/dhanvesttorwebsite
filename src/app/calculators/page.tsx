import Link from "next/link";
import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { buildMetadata } from "@/lib/seo";
import { calculators } from "@/content/calculators";

export const metadata = buildMetadata({ title: "Financial Calculators: SIP, SWP, Retirement, Goal & More", description: "Free financial calculators from Dhanvesttor: SIP, step-up SIP, lumpsum, SWP, STP, goal planner, retirement, child education, CAGR, inflation and PMS fee illustration.", path: "/calculators" });

export default function Calculators() {
  const groups = ["Grow", "Plan", "Understand"] as const;
  const blurb = { Grow: "See what investing regularly or all at once can become.", Plan: "Work back from a goal, a retirement, or an income you need.", Understand: "Decode the numbers behind returns, inflation and fees." };
  return (
    <Shell>
      <PageHero eyebrow="Calculators" crumbs={[{ name: "Calculators", path: "/calculators" }]} title={<>Run the numbers <em>yourself.</em></>} lede="Eleven calculators, no sign-up, no email required. Each one explains its assumptions in plain words, because a number without context is just a guess." />
      {groups.map((g, gi) => (
        <Section key={g} tone={gi % 2 ? "paper" : "ivory"} tight>
          <div className="grid gap-8 lg:grid-cols-[1fr_2.2fr]">
            <div><p className="eyebrow mb-2">{String(gi + 1).padStart(2, "0")}</p><h2 className="text-[2.4rem]">{g}</h2><p className="mt-3 text-[#3f3d5c]">{blurb[g]}</p></div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {calculators.filter((c) => c.group === g).map((c) => (
                <li key={c.slug}><Link href={`/calculators/${c.slug}`} className="group flex h-full items-start justify-between gap-4 rounded-2xl border border-line bg-white p-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-soft)]">
                  <span><span className="block font-display text-[1.4rem] leading-tight group-hover:text-indigo">{c.name}</span><span className="mt-1 block text-[14px] text-[#3f3d5c]">{c.blurb}</span></span>
                  <span aria-hidden className="text-raspberry transition-transform group-hover:translate-x-1">→</span>
                </Link></li>
              ))}
            </ul>
          </div>
        </Section>
      ))}
    </Shell>
  );
}
