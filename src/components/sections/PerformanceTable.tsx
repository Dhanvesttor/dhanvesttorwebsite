import { performance } from "@/content/performance";
import { disclaimers } from "@/content/disclaimers";
import { cn } from "@/lib/utils";

const cell = (v: number | null) => v === null ? <span className="text-mist">—</span> : <span className={cn(v < 0 && "text-raspberry-deep")}>{v > 0 ? "" : ""}{v.toFixed(2)}%</span>;

/** The only component that renders PMS returns. Always shows benchmark, period, method and the SEBI disclaimer. */
export function PerformanceTable() {
  return (
    <div>
      <div className="overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full text-[15px]">
          <caption className="px-5 pt-5 text-left">
            <span className="eyebrow">FAITH Fund vs BSE 500 TRI</span>
            <span className="mt-1 block text-[13px] text-mist">As of {performance.asOf} · {performance.source}</span>
          </caption>
          <thead>
            <tr className="border-b border-line text-left text-[12px] uppercase tracking-[.14em] text-mist">
              <th className="px-5 py-3 font-medium">Period</th><th className="px-5 py-3 font-medium">FAITH Fund</th><th className="px-5 py-3 font-medium">BSE 500 TRI</th><th className="px-5 py-3 font-medium">Difference</th>
            </tr>
          </thead>
          <tbody>
            {performance.rows.map((r) => (
              <tr key={r.period} className="border-b border-line last:border-0">
                <td className="px-5 py-3.5 font-medium text-ink">{r.period}</td>
                <td className="px-5 py-3.5 font-display text-[1.15rem] text-indigo">{cell(r.fund)}</td>
                <td className="px-5 py-3.5 font-display text-[1.15rem]">{cell(r.benchmark)}</td>
                <td className="px-5 py-3.5">{r.fund !== null && r.benchmark !== null ? cell(+(r.fund - r.benchmark).toFixed(2)) : <span className="text-mist">—</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-[12.5px] leading-relaxed text-mist">{disclaimers.pmsPerformance}</p>
    </div>
  );
}
