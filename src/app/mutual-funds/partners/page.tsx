import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { LogoWall } from "@/components/sections/LogoWall";
import { CTA } from "@/components/ui/CTA";
import { Disclaimer } from "@/components/sections/Disclaimer";
import { buildMetadata } from "@/lib/seo";
import { amcs } from "@/content/amcs";
import { disclaimers } from "@/content/disclaimers";

export const metadata = buildMetadata({ title: "Partner Mutual Fund Houses (AMCs)", description: "Dhanvesttor distributes mutual funds from 20+ fund houses including ICICI Prudential, HDFC, Kotak, Motilal Oswal, UTI, Nippon India, Aditya Birla Sun Life, Axis, Mirae Asset and more.", path: "/mutual-funds/partners" });

export default function Partners() {
  return (
    <Shell>
      <PageHero crumbs={[{ name: "Mutual Funds", path: "/mutual-funds" }, { name: "Partner fund houses", path: "/mutual-funds/partners" }]} eyebrow="Partner fund houses" title={<>Access to India&apos;s major fund houses, <em>without the noise.</em></>}
        lede="We are empanelled with more than twenty asset management companies. That breadth means we can choose the right fund for each part of your plan, instead of the right fund from one house." />
      <Section><LogoWall items={amcs} /><p className="mt-8 text-[14px] text-mist">And many more. If you hold funds from a house not listed here, we can still review and include them in your plan.</p></Section>
      <CTA title={<>One plan across <em>every</em> fund house.</>} primary={{ label: "Start a conversation", href: "/contact" }} secondary={{ label: "How we select", href: "/mutual-funds/how-we-select" }} />
      <Disclaimer text={disclaimers.mutualFunds} />
    </Shell>
  );
}
