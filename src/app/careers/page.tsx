import Link from "next/link";
import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHead } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ApplyForm } from "@/components/forms/ApplyForm";
import { buildMetadata } from "@/lib/seo";
import { cms } from "@/lib/cms";
import { photos } from "@/content/images";

export const metadata = buildMetadata({ title: "Careers at Dhanvesttor, Kolkata", description: "Work at Dhanvesttor: open roles in relationship management, research, CLCB programmes, marketing and operations at a women-first wealth firm in Kolkata.", path: "/careers" });
export const revalidate = 300;

export default async function Careers() {
  const jobs = await cms.getJobs({ openOnly: true });
  return (
    <Shell>
      <PageHero crumbs={[{ name: "Careers", path: "/careers" }]} eyebrow="Careers" title={<>Help make finance feel <em>like it was built for everyone.</em></>}
        lede="We are a small team in Kolkata building a wealth firm that explains before it sells. If that sentence makes you want to work harder, read on."
        actions={<><Button href="#roles">See open roles</Button><Button href="/careers/life-at-dhanvesttor" variant="ghost">Life at Dhanvesttor</Button></>}
        image={photos.team.label} />
      <Section id="roles">
        <SectionHead align="split" eyebrow="Open roles" title={<>Where we need <em>you.</em></>} lede={`${jobs.length} open ${jobs.length === 1 ? "role" : "roles"}. Don't see a fit? Send a general application below.`} />
        <ul className="divide-y divide-line border-y border-line">
          {jobs.map((j) => (
            <li key={j.slug}>
              <Link href={`/careers/roles/${j.slug}`} className="group grid gap-3 py-7 md:grid-cols-[1.4fr_1fr_auto] md:items-center">
                <div><h3 className="text-[1.6rem] group-hover:text-indigo">{j.title}</h3><p className="mt-1 text-[14.5px] text-[#3f3d5c]">{j.summary}</p></div>
                <p className="text-[13px] uppercase tracking-[.14em] text-mist">{j.department} · {j.location} · {j.type}</p>
                <span aria-hidden className="text-raspberry transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <Section tone="paper">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div><p className="eyebrow mb-3">General application</p><h2 className="text-[2.2rem]">Tell us <em>who you are.</em></h2><p className="mt-4 text-[#3f3d5c]">We read every application ourselves. Choose the department that fits you best and attach your CV.</p></div>
          <ApplyForm />
        </div>
      </Section>
    </Shell>
  );
}
