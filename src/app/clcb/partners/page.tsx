import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHead } from "@/components/ui/Section";
import { ContactBand } from "@/components/sections/ContactBand";
import { buildMetadata } from "@/lib/seo";
import { TODO } from "@/content/todo";

export const metadata = buildMetadata({ title: "Partner with CLCB: Institutions, NGOs & Speakers", description: "Bring Dhanvesttor's free CLCB financial literacy sessions to your college, company, NGO or community. Speakers and partner organisations welcome.", path: "/clcb/partners" });

export default function Partners() {
  return (
    <Shell>
      <PageHero crumbs={[{ name: "CLCB", path: "/clcb" }, { name: "Partner with us", path: "/clcb/partners" }]} eyebrow="Partner with us" title={<>Take financial education <em>beyond</em> investment circles.</>}
        lede="We work with colleges, employers, NGOs and government programmes to bring free, practical money sessions to the women they serve." />
      <Section>
        <SectionHead eyebrow="Who we work with" title={<>Four kinds of <em>partner.</em></>} />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[["Colleges & universities", "Campus sessions for final-year students and young alumni."], ["Employers", "Lunch-and-learn sessions and women's network programmes for staff."], ["NGOs & self-help groups", "Vernacular sessions on saving, safe banking, insurance and fraud."], ["Government & institutions", "Structured programmes with measurable participation and outcomes."]].map(([t, b]) => <div key={t} className="rounded-2xl border border-line bg-white p-6"><h3 className="text-[1.35rem]">{t}</h3><p className="mt-2 text-[15px] text-[#3f3d5c]">{b}</p></div>)}
        </div>
        {TODO.clcbPartners.length > 0 && <p className="mt-10 text-[15px] text-mist">Partners include {TODO.clcbPartners.join(", ")}.</p>}
      </Section>
      <ContactBand tone="sand" defaultPath="clcb" paths={["clcb"]} heading={<>Let&apos;s plan a <em>session.</em></>} lede="Tell us about your organisation, the audience, and the city. Sessions are free." />
    </Shell>
  );
}
