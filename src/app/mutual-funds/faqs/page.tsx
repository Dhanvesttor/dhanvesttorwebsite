import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { FaqList } from "@/components/sections/FaqList";
import { CTA } from "@/components/ui/CTA";
import { Disclaimer } from "@/components/sections/Disclaimer";
import { buildMetadata } from "@/lib/seo";
import { cms } from "@/lib/cms";
import { disclaimers } from "@/content/disclaimers";

export const metadata = buildMetadata({ title: "Mutual Fund FAQs: KYC, Direct vs Regular, Tax", description: "Answers to common mutual fund questions: minimum investment, KYC documents, direct vs regular plans, taxation, pausing SIPs and more.", path: "/mutual-funds/faqs" });
export const revalidate = 3600;

export default async function MfFaqs() {
  const faqs = await cms.getFaqs("mf");
  return (
    <Shell>
      <PageHero compact crumbs={[{ name: "Mutual Funds", path: "/mutual-funds" }, { name: "FAQs", path: "/mutual-funds/faqs" }]} eyebrow="Mutual fund FAQs" title={<>The questions <em>everyone</em> has.</>} />
      <Section><div className="mx-auto max-w-[860px]"><FaqList items={faqs} /></div></Section>
      <CTA tone="sand" title={<>Still <em>wondering?</em></>} primary={{ label: "Ask us", href: "/contact" }} secondary={{ label: "PMS FAQs", href: "/pms/faqs" }} />
      <Disclaimer text={disclaimers.mutualFunds} />
    </Shell>
  );
}
