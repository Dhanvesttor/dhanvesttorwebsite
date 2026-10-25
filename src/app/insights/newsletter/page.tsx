import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { NewsletterForm } from "@/components/forms/NewsletterForm";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "The Monthly Letter", description: "Dhanvesttor's monthly letter: one short, plain-language email about markets, money and our community. Never a sales pitch.", path: "/insights/newsletter" });

export default function Newsletter() {
  return (
    <Shell>
      <PageHero compact crumbs={[{ name: "Insights", path: "/insights" }, { name: "Newsletter", path: "/insights/newsletter" }]} eyebrow="The monthly letter" title={<>One email a month. <em>Worth opening.</em></>}
        lede="What moved in markets and why it matters, one idea worth understanding, and what's coming up at CLCB. Five minutes to read. Unsubscribe in one click." />
      <Section><div className="max-w-xl"><NewsletterForm /></div></Section>
    </Shell>
  );
}
