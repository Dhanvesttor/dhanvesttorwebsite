import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section, SectionHead } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { StepList } from "@/components/sections/StepList";
import { ContactBand } from "@/components/sections/ContactBand";
import { Disclaimer } from "@/components/sections/Disclaimer";
import { buildMetadata } from "@/lib/seo";
import { disclaimers } from "@/content/disclaimers";
import { TODO } from "@/content/todo";
import { photos } from "@/content/images";

export const metadata = buildMetadata({ title: "Insurance: Health, Property, Motor & Business Cover", description: "Insurance through Dhanvesttor: health, home, motor, business and group cover compared across insurers, explained plainly, with claims support.", path: "/insurance" });

export default function Insurance() {
  return (
    <Shell>
      <PageHero crumbs={[{ name: "Insurance", path: "/insurance" }]} eyebrow="Insurance" title={<>Protection first. <em>Then</em> growth.</>}
        lede="Before we talk about returns, we ask what happens if something goes wrong. The right cover, compared across insurers and explained in plain words, is what lets the rest of your plan hold."
        actions={<><Button href="#contact">Review my cover</Button><Button href="/insurance/health" variant="ghost">Start with health</Button></>}
        image={photos.conversation.label} imageSrc={photos.conversation.src} />
      <Section>
        <SectionHead align="split" eyebrow="What we cover" title={<>Cover for your life, <em>your home</em> and your business.</>} />
        <ServiceGrid columns={3} items={[
          { title: "Health", blurb: "Individual, family floater, senior citizen, critical illness and top-ups.", href: "/insurance/health", meta: "Personal" },
          { title: "Property & motor", blurb: "Home, shop, office, car and two-wheeler.", href: "/insurance/property-motor", meta: "Assets" },
          { title: "Business & group", blurb: "Liability, cyber, marine, engineering, and employee health cover.", href: "/insurance/business", meta: "Business" },
        ]} />
      </Section>
      <Section tone="paper">
        <SectionHead eyebrow="How we work" title={<>Independent advice, <em>start to claim.</em></>} />
        <StepList steps={[
          { title: "Assess", text: "We look at what you already have, including employer cover, and where the gaps are." },
          { title: "Compare", text: "Options across insurers, with the exclusions and waiting periods side by side." },
          { title: "Place", text: "We handle the paperwork and make sure the proposal form is complete and accurate." },
          { title: "Stand by", text: "Renewal reminders, policy changes, and support when you need to claim." },
        ]} />
      </Section>
      <ContactBand defaultPath="insurance" paths={["insurance", "mf", "pms"]} heading={<>Not sure what you&apos;re <em>covered</em> for?</>} lede="Send us your existing policies. We'll read them and tell you, in plain words, what they do and don't cover." />
      <Disclaimer text={(TODO.insuranceLicence ? TODO.insuranceLicence + ". " : "") + disclaimers.insuranceBonds} />
    </Shell>
  );
}
