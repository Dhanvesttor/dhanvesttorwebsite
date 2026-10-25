import { cn } from "@/lib/utils";

export function ResultCard({ headline, headlineLabel, rows, note, className }: { headline: string; headlineLabel: string; rows: { label: string; value: string; swatch?: "indigo" | "raspberry" | "marigold" | "sand" }[]; note?: string; className?: string }) {
  const sw = { indigo: "bg-indigo", raspberry: "bg-raspberry", marigold: "bg-marigold", sand: "bg-sand" };
  return (
    <div className={cn("rounded-2xl bg-indigo p-7 text-ivory", className)}>
      <p className="eyebrow text-marigold">{headlineLabel}</p>
      <p aria-live="polite" className="mt-3 font-display text-[2.75rem] font-light leading-none sm:text-[3.25rem]">{headline}</p>
      <dl className="mt-7 grid gap-3 border-t border-ivory/15 pt-5 text-[14px]">
        {rows.map((r) => (
          <div key={r.label} className="flex items-center justify-between gap-4">
            <dt className="flex items-center gap-2 text-ivory/75">{r.swatch && <span className={cn("h-2.5 w-2.5 rounded-sm", sw[r.swatch])} />}{r.label}</dt>
            <dd className="font-medium">{r.value}</dd>
          </div>
        ))}
      </dl>
      {note && <p className="mt-5 text-[12px] leading-relaxed text-ivory/60">{note}</p>}
    </div>
  );
}
