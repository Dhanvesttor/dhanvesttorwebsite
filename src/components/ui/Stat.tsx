"use client";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/** Big number with label. If `value` is purely numeric it counts up once in view. */
export function Stat({ value, label, flag, light, className }: { value: string; label: string; flag?: string; light?: boolean; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const reduce = useReducedMotion();
  const numeric = /^\d+(\.\d+)?$/.test(value);
  const [shown, setShown] = useState(numeric ? "0" : value);
  useEffect(() => {
    if (!numeric || !inView) return;
    if (reduce) { setShown(value); return; }
    const target = parseFloat(value); const start = performance.now(); const dur = 1200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur); const eased = 1 - Math.pow(1 - p, 3);
      setShown((target * eased).toFixed(value.includes(".") ? 2 : 0));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, numeric, reduce, value]);
  return (
    <div ref={ref} className={cn("flex flex-col gap-2", className)}>
      <div className={cn("font-display font-light text-[2.5rem] sm:text-[3rem] leading-none", light ? "text-ivory" : "text-indigo")}>{shown}</div>
      <div className={cn("text-[13.5px] leading-snug", light ? "text-ivory/70" : "text-mist")}>
        {label}{flag && <span className="ml-1.5 text-raspberry text-[11px] font-medium">{flag}</span>}
      </div>
    </div>
  );
}
