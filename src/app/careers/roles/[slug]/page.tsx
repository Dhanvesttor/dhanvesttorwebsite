import { notFound } from "next/navigation";
import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { ApplyForm } from "@/components/forms/ApplyForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { cms } from "@/lib/cms";
import { site } from "@/content/site";

export const revalidate = 300;
export async function generateStaticParams() { return (await cms.getJobs()).map((j) => ({ slug: j.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const j = await cms.getJob(slug);
  return j ? buildMetadata({ title: `${j.title}, ${j.location}`, description: j.summary, path: `/careers/roles/${j.slug}`, noIndex: !j.open }) : {};
}

export default async function Role({ params }: { params: Promise<{ slug: string }> }) {
  const job = await cms.getJob((await params).slug);
  if (!job) notFound();
  return (
    <Shell>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "JobPosting", title: job.title, description: job.html, datePosted: job.postedAt, employmentType: job.type === "Full-time" ? "FULL_TIME" : job.type === "Part-time" ? "PART_TIME" : job.type === "Internship" ? "INTERN" : "CONTRACTOR", hiringOrganization: { "@type": "Organization", name: site.name, sameAs: "https://dhanvesttor.com" }, jobLocation: { "@type": "Place", address: { "@type": "PostalAddress", addressLocality: "Kolkata", addressRegion: "West Bengal", addressCountry: "IN" } } }} />
      <PageHero compact crumbs={[{ name: "Careers", path: "/careers" }, { name: "Open roles", path: "/careers/roles" }, { name: job.title, path: `/careers/roles/${job.slug}` }]} eyebrow={`${job.department} · ${job.location} · ${job.type}`} title={job.title} lede={job.summary} />
      <Section>
        <div className="grid gap-14 lg:grid-cols-[1.2fr_1fr]">
          <Prose html={job.html} />
          <div className="self-start lg:sticky lg:top-28">
            {job.open ? <><p className="eyebrow mb-3">Apply</p><ApplyForm role={job.title} department={job.department} /></> : <p className="rounded-2xl border border-line p-6 text-mist">This role is now closed. See <a href="/careers/roles" className="text-raspberry underline">open roles</a>.</p>}
          </div>
        </div>
      </Section>
    </Shell>
  );
}
