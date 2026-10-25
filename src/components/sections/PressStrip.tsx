import { cn } from "@/lib/utils";

const DEFAULT = ["Mint", "Fortune India", "The Economic Times", "Business Insider", "Harper's Bazaar", "Cafemutual", "Business India"];

export function PressStrip({ outlets = DEFAULT, className, light }: { outlets?: string[]; className?: string; light?: boolean }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-8 gap-y-3 border-b border-line px-4 py-6 sm:px-8", className)}>
      <span className={cn("eyebrow", light && "text-marigold")}>As featured in</span>
      {outlets.map((o) => <span key={o} className={cn("font-display text-[1.1rem]", light ? "text-ivory/70" : "text-mist")}>{o}</span>)}
    </div>
  );
}
