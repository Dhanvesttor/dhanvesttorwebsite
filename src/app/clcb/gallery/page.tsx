import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { CTA } from "@/components/ui/CTA";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "CLCB Gallery", description: "Photographs from Dhanvesttor CLCB workshops, learning circles and community events.", path: "/clcb/gallery" });

const slots: { label: string; ratio: "4/5" | "3/2" | "1/1" }[] = [
  { label: "Money Basics Circle, Kolkata", ratio: "4/5" }, { label: "Workshop whiteboard", ratio: "3/2" }, { label: "Participants in discussion", ratio: "1/1" },
  { label: "Masterclass with the fund manager", ratio: "3/2" }, { label: "Campus session", ratio: "4/5" }, { label: "Community outreach, Bengal", ratio: "1/1" },
  { label: "Learning circle", ratio: "4/5" }, { label: "Founder addressing a workshop", ratio: "3/2" }, { label: "Certificates and smiles", ratio: "1/1" },
];

export default function Gallery() {
  return (
    <Shell>
      <PageHero compact crumbs={[{ name: "CLCB", path: "/clcb" }, { name: "Gallery", path: "/clcb/gallery" }]} eyebrow="Gallery" title={<>Rooms full of <em>good questions.</em></>} />
      <Section>
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
          {slots.map((s) => <ImagePlaceholder key={s.label} label={s.label} ratio={s.ratio} />)}
        </div>
      </Section>
      <CTA tone="sand" title={<>Be in the <em>next</em> photograph.</>} primary={{ label: "Upcoming events", href: "/clcb/events" }} />
    </Shell>
  );
}
