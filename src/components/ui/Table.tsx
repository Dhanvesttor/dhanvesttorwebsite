import { cn } from "@/lib/utils";
export function Table({ head, rows, className, caption }: { head: React.ReactNode[]; rows: React.ReactNode[][]; className?: string; caption?: string }) {
  return (
    <div className={cn("overflow-x-auto rounded-2xl border border-line bg-white", className)}>
      <table className="w-full text-[15px]">
        {caption && <caption className="px-5 py-3 text-left text-[12px] uppercase tracking-[.16em] text-mist">{caption}</caption>}
        <thead><tr className="border-b border-line bg-paper/70 text-left text-[12px] uppercase tracking-[.14em] text-mist">{head.map((h, i) => <th key={i} className="px-5 py-3 font-medium">{h}</th>)}</tr></thead>
        <tbody>{rows.map((r, i) => <tr key={i} className="border-b border-line last:border-0">{r.map((c, j) => <td key={j} className={cn("px-5 py-3.5 align-top", j === 0 && "font-medium text-ink")}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}
