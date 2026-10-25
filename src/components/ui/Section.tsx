import { cn } from "@/lib/utils";
import { Container } from "./Container";

export type Tone = "ivory" | "sand" | "paper" | "indigo" | "ink" | "terracotta";

const tones: Record<Tone, string> = {
  ivory: "bg-ivory text-ink",
  paper: "bg-paper text-ink",
  sand: "bg-sand text-ink",
  indigo: "bg-indigo text-ivory",
  ink: "bg-ink text-ivory",
  terracotta: "bg-terracotta text-ivory",
};

export function Section({
  tone = "ivory", className, children, id, wide, tight, as: Tag = "section",
}: { tone?: Tone; className?: string; children: React.ReactNode; id?: string; wide?: boolean; tight?: boolean; as?: "section" | "div" | "article" }) {
  return (
    <Tag id={id} className={cn(tones[tone], tight ? "py-12 sm:py-16" : "py-20 sm:py-28", className)}>
      <Container wide={wide}>{children}</Container>
    </Tag>
  );
}

export function SectionHead({
  eyebrow, title, lede, align = "left", light = false, className,
}: { eyebrow?: string; title: React.ReactNode; lede?: React.ReactNode; align?: "left" | "center" | "split"; light?: boolean; className?: string }) {
  if (align === "split") {
    return (
      <div className={cn("grid gap-6 md:grid-cols-[1fr_1.6fr] md:gap-12 mb-12 sm:mb-16", className)}>
        <div>
          {eyebrow && <p className={cn("eyebrow mb-3", light && "text-marigold")}>{eyebrow}</p>}
          <h2 className="text-[2.25rem] sm:text-[2.75rem] lg:text-[3.25rem]">{title}</h2>
        </div>
        {lede && <div className={cn("text-[1.0625rem] sm:text-lg max-w-[56ch] self-end", light ? "text-ivory/80" : "text-[#3f3d5c]")}>{lede}</div>}
      </div>
    );
  }
  return (
    <div className={cn("mb-12 sm:mb-16", align === "center" && "text-center mx-auto max-w-[62ch]", className)}>
      {eyebrow && <p className={cn("eyebrow mb-3", light && "text-marigold")}>{eyebrow}</p>}
      <h2 className="text-[2.25rem] sm:text-[2.75rem] lg:text-[3.25rem]">{title}</h2>
      {lede && <div className={cn("mt-5 text-[1.0625rem] sm:text-lg max-w-[56ch]", align === "center" && "mx-auto", light ? "text-ivory/80" : "text-[#3f3d5c]")}>{lede}</div>}
    </div>
  );
}
