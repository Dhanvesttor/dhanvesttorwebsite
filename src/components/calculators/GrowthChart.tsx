"use client";
import { useState } from "react";
import { inrShort } from "@/lib/calc/format";

type Point = { x: number; a: number; b: number };

/**
 * Two-series area chart in SVG: `a` (e.g. invested, sand) under `b` (e.g. value, indigo).
 * Hover/focus shows the year's figures. No chart library.
 */
export function GrowthChart({ points, aLabel = "Invested", bLabel = "Value", xLabel = (x: number) => `Yr ${x}` }: { points: Point[]; aLabel?: string; bLabel?: string; xLabel?: (x: number) => string }) {
  const [hover, setHover] = useState<number | null>(null);
  if (points.length < 2) return <div className="grid h-56 place-items-center rounded-2xl border border-dashed border-line text-[13px] text-mist">Enter values to see the chart</div>;
  const W = 640, H = 260, P = { l: 56, r: 12, t: 16, b: 28 };
  const max = Math.max(...points.map((p) => Math.max(p.a, p.b))) || 1;
  const x = (i: number) => P.l + (i / (points.length - 1)) * (W - P.l - P.r);
  const y = (v: number) => H - P.b - (v / max) * (H - P.t - P.b);
  const area = (k: "a" | "b") => `M${x(0)},${H - P.b} ` + points.map((p, i) => `L${x(i)},${y(p[k])}`).join(" ") + ` L${x(points.length - 1)},${H - P.b} Z`;
  const line = (k: "a" | "b") => points.map((p, i) => `${i ? "L" : "M"}${x(i)},${y(p[k])}`).join(" ");
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * max);
  const every = Math.ceil(points.length / 8);
  const h = hover ?? points.length - 1;
  return (
    <figure className="rounded-2xl border border-line bg-white p-4 sm:p-5">
      <figcaption className="mb-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-[12.5px] text-mist">
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-sand ring-1 ring-terracotta/40" />{aLabel}</span>
        <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-sm bg-indigo" />{bLabel}</span>
        <span className="ml-auto font-medium text-ink">{xLabel(points[h].x)} · {aLabel} {inrShort(points[h].a)} · {bLabel} {inrShort(points[h].b)}</span>
      </figcaption>
      <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`${bLabel} grows to ${inrShort(points[points.length - 1].b)} against ${aLabel.toLowerCase()} of ${inrShort(points[points.length - 1].a)}`}
        onMouseLeave={() => setHover(null)}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={P.l} x2={W - P.r} y1={y(t)} y2={y(t)} stroke="rgba(29,27,58,.08)" />
            <text x={P.l - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#6E6C86">{inrShort(t)}</text>
          </g>
        ))}
        <path d={area("b")} fill="rgba(46,42,110,.14)" />
        <path d={line("b")} fill="none" stroke="#2E2A6E" strokeWidth="2.25" />
        <path d={area("a")} fill="#E9DCC7" opacity=".9" />
        <path d={line("a")} fill="none" stroke="#C8876A" strokeWidth="1.5" />
        {points.map((p, i) => (
          <g key={i}>
            {i % every === 0 && <text x={x(i)} y={H - 8} textAnchor="middle" fontSize="11" fill="#6E6C86">{xLabel(p.x)}</text>}
            <rect x={x(i) - (W - P.l - P.r) / points.length / 2} y={P.t} width={(W - P.l - P.r) / points.length} height={H - P.t - P.b} fill="transparent" onMouseEnter={() => setHover(i)} />
          </g>
        ))}
        <line x1={x(h)} x2={x(h)} y1={P.t} y2={H - P.b} stroke="#DE4D7A" strokeDasharray="3 3" />
        <circle cx={x(h)} cy={y(points[h].b)} r="4.5" fill="#DE4D7A" stroke="#fff" strokeWidth="2" />
      </svg>
    </figure>
  );
}
