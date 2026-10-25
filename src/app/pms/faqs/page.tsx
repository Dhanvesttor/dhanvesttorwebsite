import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { FaqList } from "@/components/sections/FaqList";
import { CTA } from "@/components/ui/CTA";
import { buildMetadata } from "@/lib/seo";
import { cms } from "@/lib/cms";

export const metadata = buildMetadata({ title: "PMS FAQs: Minimum, Fees, Tax, Custody, Exit", description: "Answers to common questions about Dhanvesttor's portfolio management service: minimum investment, ownership, fees, taxation, reporting, onboarding and exits.", path: "/pms/faqs" });
export const revalidate = 3600;

export default async function PmsFaqs() {
  const faqs = await cms.getFaqs("pms");
  return (
    <Shell>
      <PageHero compact crumbs={[{ name: "PMS", path: "/pms" }, { name: "FAQs", path: "/pms/faqs" }]} eyebrow="PMS FAQs" title={<>Questions, <em>answered plainly.</em></>} />
      <Section><div className="mx-auto max-w-[860px]"><FaqList items={faqs} /></div></Section>
      <CTA title={<>Didn&apos;t find <em>your</em> question?</>} primary={{ label: "Ask us", href: "/contact" }} secondary={{ label: "Mutual fund FAQs", href: "/mutual-funds/faqs" }} tone="sand" />
    </Shell>
  );
}
