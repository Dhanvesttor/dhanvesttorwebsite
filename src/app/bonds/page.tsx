import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHead } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { Table } from "@/components/ui/Table";
import { ContactBand } from "@/components/sections/ContactBand";
import { Disclaimer } from "@/components/sections/Disclaimer";
import { buildMetadata } from "@/lib/seo";
import { disclaimers } from "@/content/disclaimers";
import { photos } from "@/content/images";

export const metadata = buildMetadata({ title: "Bonds & Fixed Income: Bonds, NCDs, Corporate FDs", description: "Fixed income through Dhanvesttor: government and corporate bonds, NCDs, corporate fixed deposits and structured products for predictable income.", path: "/bonds" });

export default function Bonds() {
  return (
    <Shell>
      <PageHero crumbs={[{ name: "Bonds & fixed income", path: "/bonds" }]} eyebrow="Bonds & fixed income" title={<>For money that needs to arrive <em>on a known date.</em></>}
        lede="Equity is for growth over years. Fixed income is for the fees due next April, the income you draw every month, and the calm part of a portfolio that lets you hold the rest through a storm."
        actions={<><Button href="#contact">Talk to us</Button><Button href="/bonds/bonds-ncds" variant="ghost">Bonds & NCDs</Button></>}
        image={photos.desk.label} imageSrc={photos.desk.src} />
      <Section>
        <SectionHead align="split" eyebrow="What we offer" title={<>Three ways to <em>earn interest.</em></>} />
        <ServiceGrid columns={3} items={[
          { title: "Bonds & NCDs", blurb: "Government securities, corporate bonds and non-convertible debentures.", href: "/bonds/bonds-ncds", meta: "Fixed coupon" },
          { title: "Corporate FDs", blurb: "Deposits with well-rated companies and NBFCs.", href: "/bonds/corporate-fds", meta: "Fixed rate" },
          { title: "Structured products", blurb: "Market-linked payoffs for experienced investors.", href: "/bonds/structured-products", meta: "Advanced" },
        ]} />
      </Section>
      <Section tone="paper">
        <SectionHead align="split" eyebrow="Compared" title={<>Which fixed-income tool <em>when.</em></>} />
        <Table head={["", "Bank FD", "Debt mutual fund", "Bonds & NCDs", "Corporate FD"]} rows={[
          ["Return", "Fixed", "Market-linked", "Fixed coupon", "Fixed"],
          ["Liquidity", "Penalty to break", "Usually T+1", "Sell on exchange, if traded", "Restricted"],
          ["Credit risk", "Low; insured to ₹5 lakh", "Depends on fund", "Depends on issuer rating", "Depends on issuer rating"],
          ["Best for", "Certainty, small sums", "Flexible near-term goals", "Known income and dates", "Higher fixed rate"],
        ]} />
      </Section>
      <ContactBand defaultPath="bonds" paths={["bonds", "mf", "pms"]} />
      <Disclaimer text={disclaimers.insuranceBonds} />
    </Shell>
  );
}
