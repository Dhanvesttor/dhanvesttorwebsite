import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { ContactBand } from "@/components/sections/ContactBand";
import { Section } from "@/components/ui/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/content/site";

export const metadata = buildMetadata({ title: "Contact Dhanvesttor, Elgin, Kolkata", description: "Contact Dhanvesttor: 8/1/2 Sir UN Brahmachari Sarani, Elgin, Kolkata 700017. Call 033 2280 0152 or email ho@dhanvesttor.com.", path: "/contact" });

export default function Contact() {
  return (
    <Shell>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ContactPage", url: "https://dhanvesttor.com/contact", mainEntity: { "@id": "https://dhanvesttor.com/#organization" } }} />
      <PageHero compact crumbs={[{ name: "Contact", path: "/contact" }]} eyebrow="Contact" title={<>Let&apos;s start with <em>your</em> questions.</>} lede="Whether you're thinking about PMS, starting a SIP, reviewing insurance, or just want to understand your money better, a person will reply within one working day." />
      <ContactBand tone="sand" paths={["pms", "mf", "clcb", "insurance", "bonds"]} heading={<>Write to us.</>} lede="Or call, WhatsApp, or visit. We'd love to meet you." />
      <Section>
        <div className="grid gap-10 md:grid-cols-3">
          <div><p className="eyebrow mb-2">Office</p><p className="text-[1.05rem]">{site.address.line1}<br />{site.address.line2}<br />{site.address.city} {site.address.pin}, {site.address.state}</p><a href="https://maps.google.com/?q=Surabhi+Apartments+8/1/2+Sir+UN+Brahmachari+Sarani+Elgin+Kolkata+700017" target="_blank" rel="noopener" className="mt-3 inline-block text-[14px] text-raspberry underline underline-offset-4">Open in Maps ↗</a></div>
          <div><p className="eyebrow mb-2">Hours</p>{site.hours.map((h) => <p key={h} className="text-[1.05rem]">{h}</p>)}</div>
          <div><p className="eyebrow mb-2">Report fraud</p><p className="text-[1.05rem]">If someone contacts you claiming to be from Dhanvesttor and asks for money or passwords, write to <a href={`mailto:${site.fraudEmail}`} className="text-raspberry underline underline-offset-4">{site.fraudEmail}</a>. We never ask for OTPs or passwords.</p></div>
        </div>
      </Section>
    </Shell>
  );
}
