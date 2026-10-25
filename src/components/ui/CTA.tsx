import { Button } from "./Button";
import { Section } from "./Section";
import { Hairline } from "./Hairline";

export function CTA({ eyebrow = "Next step", title, lede, primary, secondary, tone = "indigo" }: { eyebrow?: string; title: React.ReactNode; lede?: string; primary: { label: string; href: string }; secondary?: { label: string; href: string }; tone?: "indigo" | "sand" | "ivory" }) {
  const light = tone === "indigo";
  return (
    <Section tone={tone} tight>
      <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
        <div>
          <Hairline className="mb-6" />
          <p className={light ? "eyebrow text-marigold mb-3" : "eyebrow mb-3"}>{eyebrow}</p>
          <h2 className="text-[2rem] sm:text-[2.5rem]">{title}</h2>
          {lede && <p className={light ? "mt-4 max-w-[52ch] text-ivory/80" : "mt-4 max-w-[52ch] text-[#3f3d5c]"}>{lede}</p>}
        </div>
        <div className="flex flex-wrap gap-3 md:justify-end">
          <Button href={primary.href} variant={light ? "raspberry" : "primary"}>{primary.label}</Button>
          {secondary && <Button href={secondary.href} variant={light ? "light" : "ghost"}>{secondary.label}</Button>}
        </div>
      </div>
    </Section>
  );
}
