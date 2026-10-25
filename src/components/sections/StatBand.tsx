import { Stat } from "@/components/ui/Stat";
import { cn } from "@/lib/utils";

export function StatBand({ stats, tone = "paper", className }: { stats: { value: string; label: string; flag?: string }[]; tone?: "paper" | "indigo" | "ivory"; className?: string }) {
  const light = tone === "indigo";
  return (
    <div className={cn("grid grid-cols-2 border-y border-line lg:grid-cols-4", tone === "paper" ? "bg-paper" : tone === "indigo" ? "bg-indigo" : "bg-ivory", className)}>
      {stats.map((s, i) => (
        <div key={i} className={cn("border-line p-7 sm:p-9", i % 2 === 0 && "border-r", i < 2 && "border-b lg:border-b-0", i < 3 && "lg:border-r", light && "border-ivory/10")}>
          <Stat value={s.value} label={s.label} flag={s.flag} light={light} />
        </div>
      ))}
    </div>
  );
}
