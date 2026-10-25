import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHead } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { StepList } from "@/components/sections/StepList";
import { SplitFeature } from "@/components/sections/SplitFeature";
import { FaqList } from "@/components/sections/FaqList";
import { ContactBand } from "@/components/sections/ContactBand";
import { Disclaimer } from "@/components/sections/Disclaimer";
import { FaithLetters } from "@/components/home/FaithLetters";
import { buildMetadata } from "@/lib/seo";
import { cms } from "@/lib/cms";
import { pms } from "@/content/pms";
import { photos } from "@/content/images";
import { disclaimers } from "@/content/disclaimers";

export const metadata = buildMetadata({ title: "Portfolio Management Services (PMS) in Kolkata", description: "Dhanvesttor's SEBI-registered portfolio management service: a focused flexi-cap portfolio held in your own name, run under the FAITH framework. Minimum ₹50 lakh.", path: "/pms" });

export default async function PmsPage() {
  const faqs = (await cms.getFaqs("pms")).slice(0, 5);
  return (
    <Shell>
      <PageHero crumbs={[{ name: "PMS", path: "/pms" }]} eyebrow="Portfolio Management Services" title={<>Your own portfolio. <em>Explained</em>, then managed.</>}
        lede="With PMS you own the shares directly, in a demat account in your name. A named fund manager runs a focused strategy, and every month you see exactly what you own and why."
        actions={<><Button href="/contact">Talk to us about PMS</Button><Button href="/pms/faith-fund" variant="ghost">The FAITH Fund</Button></>}
        image={photos.research.label} imageSrc={photos.research.src} />

      <Section>
        <SectionHead align="split" eyebrow="How it differs" title={<>A mutual fund is a pool. <em>PMS is yours.</em></>}
          lede="Both are good ways to own Indian companies. PMS suits a larger, longer-term allocation where you want concentration, direct ownership and a manager you can speak to." />
        <ServiceGrid columns={4} items={[
          { title: "You own the shares", blurb: "Holdings sit in a dedicated demat account in your name, with Kotak Mahindra Bank as custodian.", href: "/pms/faqs", meta: "Ownership" },
          { title: "15 to 30 companies", blurb: "A focused portfolio where every position has to earn its place under FAITH.", href: "/pms/philosophy", meta: "Concentration" },
          { title: "Monthly transparency", blurb: "Statements show every holding and trade. Quarterly reviews with the team.", href: "/pms/faqs", meta: "Reporting" },
          { title: "Fees aligned to you", blurb: "2% fixed, and 20% only on returns above a 10% hurdle with a high-water mark.", href: "/pms/fees", meta: "Fees" },
        ]} />
      </Section>

      <Section tone="indigo" className="grain">
        <SectionHead light align="split" eyebrow="The FAITH framework" title={<>Five questions. <em>No exceptions.</em></>} lede="Fundamentals, Allocation of capital, Intrinsic value, Top management and moat, High principles." />
        <Reveal><FaithLetters /></Reveal>
      </Section>

      <Section>
        <SplitFeature eyebrow="The Dhanvesttor way" title={<>Dream, Depend, <em>Develop</em>, Deliver.</>} image={photos.conversation.label} imageSrc={photos.conversation.src} imageAlt={photos.conversation.alt}
          lede="Our client process has four stages. It starts with what you want your money to do, not with a product.">
          <ul className="grid gap-4">
            {pms.fourDs.map((d) => <li key={d.title} className="border-l-2 border-raspberry pl-4"><p className="font-display text-[1.35rem]">{d.title}</p><p className="text-[15px] text-[#3f3d5c]">{d.text}</p></li>)}
          </ul>
        </SplitFeature>
      </Section>

      <Section tone="paper">
        <SectionHead eyebrow="Getting started" title={<>From first call to first trade, <em>about ten days.</em></>} />
        <StepList steps={[
          { title: "Conversation", text: "We understand your goals, existing investments, liquidity needs and risk comfort. No forms yet." },
          { title: "Disclosures", text: "You receive the Disclosure Document and client agreement to read before anything is signed." },
          { title: "Onboarding", text: "Our Compliance Officer opens your custody and dedicated PMS demat account with Kotak. 7 to 10 working days." },
          { title: "Investing", text: "You transfer funds or shares. The portfolio is built in tranches. Monthly reporting begins." },
        ]} />
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div><p className="eyebrow mb-3">Common questions</p><h2 className="text-[2.4rem]">What people ask <em>first.</em></h2><Button href="/pms/faqs" variant="link" className="mt-6">All PMS FAQs →</Button></div>
          <FaqList items={faqs} />
        </div>
      </Section>

      <ContactBand defaultPath="pms" paths={["pms", "mf"]} heading={<>Is PMS right for you <em>now?</em></>} lede="Sometimes the honest answer is 'not yet'. A first conversation costs nothing and commits you to nothing." />
      <Disclaimer text={disclaimers.general} />
    </Shell>
  );
}
