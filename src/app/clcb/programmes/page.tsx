import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { CTA } from "@/components/ui/CTA";
import { buildMetadata } from "@/lib/seo";
import { programmes } from "@/content/clcb";

export const metadata = buildMetadata({ title: "CLCB Programmes: Workshops, Circles & Masterclasses", description: "Dhanvesttor's CLCB financial education programmes for women: Money Basics Circles, investing workshops, masterclasses, learning circles, campus sessions and community outreach.", path: "/clcb/programmes" });

export default function Programmes() {
  return (
    <Shell>
      <PageHero crumbs={[{ name: "CLCB", path: "/clcb" }, { name: "Programmes", path: "/clcb/programmes" }]} eyebrow="Programmes" title={<>From your first question to your <em>hundredth.</em></>} lede="Every programme is free, run by people who do this work every day, and designed so you leave knowing what to do next." />
      <Section>
        <div className="grid gap-20">
          {programmes.map((p, i) => (
            <article key={p.slug} id={p.slug} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2">
              <div className={i % 2 ? "lg:order-2" : ""}>
                <span className="font-display text-[1.25rem] text-terracotta">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="mt-3 text-[2.25rem]">{p.name}</h2>
                <p className="mt-3 text-[12.5px] uppercase tracking-[.14em] text-raspberry">{p.format}</p>
                <p className="mt-4 text-[1.0625rem] text-[#3f3d5c]">{p.text}</p>
                <p className="mt-4 text-[14px] text-mist"><span className="font-medium text-ink">For:</span> {p.who}</p>
              </div>
              <ImagePlaceholder label={`CLCB · ${p.name}`} ratio="3/2" className={i % 2 ? "lg:order-1" : ""} />
            </article>
          ))}
        </div>
      </Section>
      <CTA title={<>Find a session <em>near you.</em></>} primary={{ label: "Upcoming events", href: "/clcb/events" }} secondary={{ label: "Join the community", href: "/clcb/join" }} />
    </Shell>
  );
}
