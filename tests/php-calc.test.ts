import { describe, it, expect } from "vitest";
import * as next from "@/lib/calc";
import * as nextFmt from "@/lib/calc/format";
import * as php from "../php/public/assets/js/calc.js";

/** Deterministic pseudo-random numbers so failures are reproducible. */
function rng(seed: number) {
  return () => ((seed = (seed * 1664525 + 1013904223) % 4294967296) / 4294967296);
}

const cases = (n: number, make: (r: () => number) => Record<string, number>) => {
  const r = rng(42);
  return Array.from({ length: n }, () => make(r));
};
const pick = (r: () => number, min: number, max: number) => Math.round((min + r() * (max - min)) * 4) / 4;

describe("PHP site calculators give exactly the same results as the Next.js site", () => {
  const fns: [string, (r: () => number) => Record<string, number>][] = [
    ["sip", (r) => ({ monthly: pick(r, 0, 200000), annualRatePct: pick(r, 0, 20), years: pick(r, 0, 40) })],
    ["stepUpSip", (r) => ({ monthly: pick(r, 0, 200000), stepUpPct: pick(r, 0, 30), annualRatePct: pick(r, 0, 20), years: pick(r, 0, 40) })],
    ["lumpsum", (r) => ({ amount: pick(r, 0, 5e7), annualRatePct: pick(r, 0, 20), years: pick(r, 0, 40) })],
    ["swp", (r) => ({ corpus: pick(r, 0, 1e8), monthlyWithdrawal: pick(r, 0, 1e6), annualRatePct: pick(r, 0, 15), years: pick(r, 0, 40) })],
    ["stp", (r) => ({ amount: pick(r, 0, 5e7), monthlyTransfer: pick(r, 0, 5e6), sourceRatePct: pick(r, 0, 10), targetRatePct: pick(r, 0, 20), months: pick(r, 0, 60) })],
    ["goal", (r) => ({ target: pick(r, 0, 1e8), years: pick(r, 0, 40), annualRatePct: pick(r, 0, 20), inflationPct: pick(r, 0, 12), existing: pick(r, 0, 5e7) })],
    ["retirement", (r) => ({ age: pick(r, 18, 70), retireAge: pick(r, 40, 75), lifeExpectancy: pick(r, 70, 100), monthlyExpense: pick(r, 0, 1e6), inflationPct: pick(r, 0, 12), preReturnPct: pick(r, 0, 18), postReturnPct: pick(r, 0, 12), existing: pick(r, 0, 1e8) })],
    ["childEducation", (r) => ({ childAge: pick(r, 0, 17), goalAge: pick(r, 15, 25), costToday: pick(r, 0, 3e7), educationInflationPct: pick(r, 0, 15), annualRatePct: pick(r, 0, 18), existing: pick(r, 0, 1e7) })],
    ["cagr", (r) => ({ start: pick(r, 0, 1e8), end: pick(r, 0, 1e8), years: pick(r, 0, 40) })],
    ["inflation", (r) => ({ amount: pick(r, 0, 5e7), inflationPct: pick(r, 0, 15), years: pick(r, 0, 40) })],
    ["pmsFee", (r) => ({ corpus: pick(r, 0, 5e8), years: pick(r, 0, 15), grossReturnPct: pick(r, -20, 40) })],
  ];
  for (const [name, make] of fns) {
    it(`${name}: 200 random inputs`, () => {
      for (const input of cases(200, make)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        expect((php as any)[name](input)).toEqual((next as any)[name](input));
      }
    });
  }

  it("formatting matches", () => {
    for (const n of [0, 1, 999, 1000, 99999, 100000, 2323391, 15000000, 1.5e9, -2500, NaN, Infinity]) {
      expect(php.inr(n)).toBe(nextFmt.inr(n));
      expect(php.inrShort(n)).toBe(nextFmt.inrShort(n));
      expect(php.pct(n, 2)).toBe(nextFmt.pct(n, 2));
    }
    expect(php.inr(1234567)).toBe("₹12,34,567");
    expect(php.inrShort(2323391)).toBe("₹23.23 L");
  });
});
