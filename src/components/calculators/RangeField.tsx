"use client";
import { useId } from "react";

/** Number input paired with a slider. Typing and sliding stay in sync; empty input means 0. */
export function RangeField({ label, value, onChange, min, max, step = 1, prefix, suffix, hint }: {
  label: string; value: number; onChange: (v: number) => void; min: number; max: number; step?: number; prefix?: string; suffix?: string; hint?: string;
}) {
  const id = useId();
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <label htmlFor={id} className="text-[14px] font-medium text-ink">{label}</label>
        <div className="flex items-center rounded-lg border border-line bg-white px-3 py-1.5 focus-within:ring-2 focus-within:ring-raspberry/50">
          {prefix && <span className="mr-1 text-[14px] text-mist">{prefix}</span>}
          <input id={id} inputMode="decimal" value={Number.isFinite(value) ? String(value) : ""}
            onChange={(e) => { const n = parseFloat(e.target.value.replace(/[^\d.]/g, "")); onChange(Number.isFinite(n) ? n : 0); }}
            className="w-24 bg-transparent text-right text-[15px] font-medium text-indigo outline-none" />
          {suffix && <span className="ml-1 text-[14px] text-mist">{suffix}</span>}
        </div>
      </div>
      <input type="range" aria-label={label} min={min} max={max} step={step} value={Math.min(max, Math.max(min, value || 0))} onChange={(e) => onChange(parseFloat(e.target.value))}
        className="mt-3 h-1.5 w-full cursor-pointer appearance-none rounded-full accent-raspberry"
        style={{ background: `linear-gradient(90deg, var(--color-raspberry) ${pct}%, var(--color-sand) ${pct}%)` }} />
      {hint && <p className="mt-1.5 text-[12px] text-mist">{hint}</p>}
    </div>
  );
}
