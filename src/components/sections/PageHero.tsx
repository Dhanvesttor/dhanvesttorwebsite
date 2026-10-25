import { Container } from "@/components/ui/Container";
import { Hairline } from "@/components/ui/Hairline";
import { Breadcrumbs, type Crumb } from "@/components/ui/Breadcrumbs";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { cn } from "@/lib/utils";

/**
 * Standard inner-page hero: eyebrow, title, lede, optional image on the right.
 * `tone="indigo"` for dark sections (FAITH, regulatory).
 */
export function PageHero({
  eyebrow, title, lede, crumbs, actions, image, imageSrc, tone = "ivory", compact,
}: { eyebrow?: string; title: React.ReactNode; lede?: React.ReactNode; crumbs?: Crumb[]; actions?: React.ReactNode; image?: string; imageSrc?: string; tone?: "ivory" | "indigo" | "sand"; compact?: boolean }) {
  const light = tone === "indigo";
  return (
    <section className={cn(tone === "indigo" ? "bg-indigo text-ivory" : tone === "sand" ? "bg-sand" : "bg-ivory", "border-b border-line")}>
      <Container className={cn(compact ? "py-14 sm:py-16" : "py-16 sm:py-24", image && "grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center")}>
        <div>
          {crumbs && <Breadcrumbs crumbs={crumbs} light={light} className="mb-8" />}
          <Hairline className="mb-6" />
          {eyebrow && <p className={cn("eyebrow mb-4", light && "text-marigold")}>{eyebrow}</p>}
          <h1 className={cn("max-w-[18ch] text-[2.75rem] sm:text-[3.5rem] lg:text-[4.25rem]", light && "[&_em]:text-marigold")}>{title}</h1>
          {lede && <div className={cn("mt-6 max-w-[56ch] text-[1.125rem] sm:text-[1.25rem]", light ? "text-ivory/80" : "text-[#3f3d5c]")}>{lede}</div>}
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
        {image && <ImagePlaceholder label={image} src={imageSrc} ratio="4/5" priority className="lg:max-h-[560px]" />}
      </Container>
    </section>
  );
}
