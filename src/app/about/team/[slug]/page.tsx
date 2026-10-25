import { notFound } from "next/navigation";
import { Shell } from "@/components/layout/Shell";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Hairline } from "@/components/ui/Hairline";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { TeamGrid } from "@/components/sections/TeamGrid";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, personJsonLd } from "@/lib/seo";
import { team, getMember } from "@/content/team";

export const dynamicParams = false;
export function generateStaticParams() { return team.map((m) => ({ slug: m.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const m = getMember((await params).slug);
  return m ? buildMetadata({ title: `${m.name}, ${m.role}`, description: `${m.name} is ${m.role} at Dhanvesttor. ${m.short}`, path: `/about/team/${m.slug}` }) : {};
}

export default async function Member({ params }: { params: Promise<{ slug: string }> }) {
  const m = getMember((await params).slug);
  if (!m) notFound();
  return (
    <Shell>
      <JsonLd data={personJsonLd(m)} />
      <section className="border-b border-line">
        <Container className="py-14 sm:py-20">
          <Breadcrumbs crumbs={[{ name: "About", path: "/about" }, { name: "Team", path: "/about/team" }, { name: m.name, path: `/about/team/${m.slug}` }]} className="mb-10" />
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
            <ImagePlaceholder label={`${m.name}, portrait`} src={m.photo} alt={m.name} ratio="4/5" priority />
            <div>
              <Hairline className="mb-6" />
              <p className="eyebrow">{m.role}</p>
              <h1 className="mt-3 text-[2.75rem] sm:text-[3.5rem]">{m.name}</h1>
              <div className="prose-dv mt-8">{m.bio.map((p) => <p key={p}>{p}</p>)}</div>
              {m.education && <div className="mt-8"><p className="eyebrow mb-3">Education</p><ul className="grid gap-1.5 text-[15px]">{m.education.map((e) => <li key={e}>{e}</li>)}</ul></div>}
              {m.linkedin && <a href={m.linkedin} target="_blank" rel="noopener" className="mt-8 inline-block text-[14px] font-medium text-raspberry underline underline-offset-4">LinkedIn ↗</a>}
            </div>
          </div>
        </Container>
      </section>
      <Section tone="paper"><h2 className="mb-10 text-[2rem]">The rest of the <em>team</em></h2><TeamGrid members={team.filter((t) => t.slug !== m.slug)} columns={4} /></Section>
    </Shell>
  );
}
