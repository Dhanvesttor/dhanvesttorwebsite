import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { EventList } from "@/components/sections/EventList";
import { CTA } from "@/components/ui/CTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { cms } from "@/lib/cms";

export const metadata = buildMetadata({ title: "CLCB Events: Upcoming Money Workshops for Women", description: "Upcoming Dhanvesttor CLCB financial literacy sessions, workshops and masterclasses in Kolkata and online. Free to attend.", path: "/clcb/events" });
export const revalidate = 300;

export default async function Events() {
  const [upcoming, past] = await Promise.all([cms.getEvents({ upcoming: true }), cms.getEvents({ upcoming: false })]);
  return (
    <Shell>
      <JsonLd data={upcoming.map((e) => ({ "@context": "https://schema.org", "@type": "Event", name: e.title, startDate: e.date, description: e.summary, eventAttendanceMode: e.mode === "Online" ? "https://schema.org/OnlineEventAttendanceMode" : "https://schema.org/OfflineEventAttendanceMode", location: e.mode === "Online" ? { "@type": "VirtualLocation", url: "https://dhanvesttor.com/clcb/events" } : { "@type": "Place", name: e.city, address: e.city }, organizer: { "@id": "https://dhanvesttor.com/#organization" }, isAccessibleForFree: true }))} />
      <PageHero compact crumbs={[{ name: "CLCB", path: "/clcb" }, { name: "Events", path: "/clcb/events" }]} eyebrow="Events" title={<>Come as you are. <em>Leave with a plan.</em></>} lede="All sessions are free. Register to hold a seat; in-person circles are kept small." />
      <Section><h2 className="mb-8 text-[2rem]">Upcoming</h2><EventList events={upcoming} /></Section>
      <Section tone="paper"><h2 className="mb-8 text-[2rem]">Recently held</h2><EventList events={past} emptyText="Past sessions will appear here." /></Section>
      <CTA title={<>Want a session for <em>your</em> organisation?</>} primary={{ label: "Partner with us", href: "/clcb/partners" }} secondary={{ label: "Join the community", href: "/clcb/join" }} />
    </Shell>
  );
}
