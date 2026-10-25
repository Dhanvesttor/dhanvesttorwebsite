import { disclaimers } from "@/content/disclaimers";

/** Two-column layout: inputs on the left, result and chart on the right. */
export function CalculatorShell({ inputs, result, chart }: { inputs: React.ReactNode; result: React.ReactNode; chart?: React.ReactNode }) {
  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        <div className="grid content-start gap-8 rounded-2xl border border-line bg-white p-6 sm:p-8">{inputs}</div>
        <div className="grid content-start gap-6">{result}{chart}</div>
      </div>
      <p className="mt-6 max-w-[90ch] text-[12px] leading-relaxed text-mist">{disclaimers.calculators}</p>
    </div>
  );
}
