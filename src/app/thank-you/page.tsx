import Link from "next/link";
import { Shell } from "@/components/layout/Shell";
import { Section } from "@/components/ui/Section";
import { Hairline } from "@/components/ui/Hairline";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Thank you", description: "We have received your message.", path: "/thank-you", noIndex: true });

const copy: Record<string, { title: string; body: string; next: { label: string; href: string } }> = {
  enquiry: { title: "Thank you. We have your enquiry.", body: "A member of the team, not a bot, will reply within one working day. If it is urgent, call us on 033 2280 0152.", next: { label: "Read our insights while you wait", href: "/insights" } },
  clcb: { title: "Welcome to the community.", body: "You will hear from us before the next session. Bring questions, not spreadsheets.", next: { label: "See upcoming sessions", href: "/clcb/events" } },
  apply: { title: "Thank you for applying.", body: "Our HR team reads every application personally. If there is a fit, we will be in touch within two weeks.", next: { label: "Life at Dhanvesttor", href: "/careers/life-at-dhanvesttor" } },
  newsletter: { title: "You're on the list.", body: "The monthly letter is short, plain and never a sales pitch.", next: { label: "Back to home", href: "/" } },
};

export default async function ThankYou({ searchParams }: { searchParams: Promise<{ for?: string }> }) {
  const { for: f } = await searchParams;
  const c = copy[f ?? "enquiry"] ?? copy.enquiry;
  return (
    <Shell>
      <Section className="min-h-[60vh]">
        <div className="max-w-[60ch]">
          <Hairline className="mb-6" />
          <p className="eyebrow mb-4">Received</p>
          <h1 className="text-[2.5rem] sm:text-[3.5rem]">{c.title}</h1>
          <p className="mt-6 text-lg text-[#3f3d5c]">{c.body}</p>
          <div className="mt-8 flex flex-wrap gap-3"><Button href={c.next.href}>{c.next.label}</Button><Link href="/" className="inline-flex items-center px-2 text-sm text-raspberry underline underline-offset-4">Home</Link></div>
        </div>
      </Section>
    </Shell>
  );
}
