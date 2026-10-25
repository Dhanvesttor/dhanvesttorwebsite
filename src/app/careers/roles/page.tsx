import Link from "next/link";
import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { CTA } from "@/components/ui/CTA";
import { buildMetadata } from "@/lib/seo";
import { cms } from "@/lib/cms";
import { formatDate } from "@/lib/utils";

export const metadata = buildMetadata({ title: "Open Roles", description: "Current job openings at Dhanvesttor, Kolkata.", path: "/careers/roles" });
export const revalidate = 300;

export default async function Roles() {
  const jobs = await cms.getJobs({ openOnly: true });
  const depts = [...new Set(jobs.map((j) => j.department))];
  return (
    <Shell>
      <PageHero compact crumbs={[{ name: "Careers", path: "/careers" }, { name: "Open roles", path: "/careers/roles" }]} eyebrow="Open roles" title={<>{jobs.length} {jobs.length === 1 ? "role" : "roles"}, <em>one standard.</em></>} />
      {depts.map((d, i) => (
        <Section key={d} tone={i % 2 ? "paper" : "ivory"} tight>
          <h2 className="mb-6 text-[1.9rem]">{d}</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {jobs.filter((j) => j.department === d).map((j) => (
              <li key={j.slug}><Link href={`/careers/roles/${j.slug}`} className="block h-full rounded-2xl border border-line bg-white p-6 transition-transform hover:-translate-y-0.5">
                <p className="eyebrow">{j.type} · {j.location}</p><h3 className="mt-2 text-[1.5rem]">{j.title}</h3><p className="mt-2 text-[14.5px] text-[#3f3d5c]">{j.summary}</p><p className="mt-4 text-[12.5px] text-mist">Posted {formatDate(j.postedAt)}</p>
              </Link></li>
            ))}
          </ul>
        </Section>
      ))}
      <CTA title={<>No fit yet? <em>Write to us anyway.</em></>} primary={{ label: "General application", href: "/careers#roles" }} />
    </Shell>
  );
}
