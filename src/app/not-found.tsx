import { Shell } from "@/components/layout/Shell";
import { Section } from "@/components/ui/Section";
import { Hairline } from "@/components/ui/Hairline";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Shell>
      <Section className="min-h-[60vh]">
        <div className="max-w-[60ch]">
          <Hairline className="mb-6" />
          <p className="eyebrow mb-4">404</p>
          <h1 className="text-[2.5rem] sm:text-[3.5rem]">This page has <em>moved on.</em></h1>
          <p className="mt-6 text-lg text-[#3f3d5c]">The link may be old, or the page may have been renamed when we rebuilt the site. The map below should get you where you were going.</p>
          <div className="mt-8 flex flex-wrap gap-3"><Button href="/">Home</Button><Button href="/sitemap-page" variant="ghost">Site map</Button><Button href="/contact" variant="ghost">Contact</Button></div>
        </div>
      </Section>
    </Shell>
  );
}
