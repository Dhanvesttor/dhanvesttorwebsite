/** Indian digit grouping: 1234567 -> ₹12,34,567 */
export function inr(n: number, opts: { decimals?: number; symbol?: boolean } = {}): string {
  if (!Number.isFinite(n)) n = 0;
  const { decimals = 0, symbol = true } = opts;
  const s = Math.abs(n).toLocaleString("en-IN", { maximumFractionDigits: decimals, minimumFractionDigits: decimals });
  return `${n < 0 ? "−" : ""}${symbol ? "₹" : ""}${s}`;
}

/** Short form for chart labels and big results: ₹23.2 L, ₹1.4 Cr */
export function inrShort(n: number): string {
  if (!Number.isFinite(n)) n = 0;
  const a = Math.abs(n), sign = n < 0 ? "−" : "";
  if (a >= 1e7) return `${sign}₹${(a / 1e7).toFixed(a >= 1e9 ? 0 : 2)} Cr`;
  if (a >= 1e5) return `${sign}₹${(a / 1e5).toFixed(2)} L`;
  if (a >= 1e3) return `${sign}₹${(a / 1e3).toFixed(1)} K`;
  return `${sign}₹${Math.round(a)}`;
}

export const pct = (n: number, d = 1) => `${Number.isFinite(n) ? n.toFixed(d) : "0"}%`;

/** Coerce any input (string from a form, NaN, negative) to a safe non-negative number. */
export const safe = (v: unknown): number => {
  const n = typeof v === "string" ? parseFloat(v) : Number(v);
  return Number.isFinite(n) && n > 0 ? n : 0;
};
