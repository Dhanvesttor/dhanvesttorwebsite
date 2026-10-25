import { describe, it, expect } from "vitest";
import { sip, stepUpSip, lumpsum, swp, stp, goal, retirement, childEducation, cagr, inflation, pmsFee } from "@/lib/calc";
import { inr, inrShort, safe } from "@/lib/calc/format";

const near = (a: number, b: number, tolPct = 1) => Math.abs(a - b) / b * 100 < tolPct;

describe("formatting", () => {
  it("groups Indian style", () => expect(inr(1234567)).toBe("₹12,34,567"));
  it("short form", () => { expect(inrShort(2323391)).toBe("₹23.23 L"); expect(inrShort(15000000)).toBe("₹1.50 Cr"); });
  it("safe coerces junk", () => { expect(safe("")).toBe(0); expect(safe(-5)).toBe(0); expect(safe("abc")).toBe(0); expect(safe("12.5")).toBe(12.5); });
});

describe("calculators", () => {
  it("sip 10k / 12% / 10y ≈ ₹23.2L", () => {
    const r = sip({ monthly: 10000, annualRatePct: 12, years: 10 });
    expect(r.invested).toBe(1200000);
    expect(near(r.value, 2_270_000, 3)).toBe(true);
    expect(r.series).toHaveLength(10);
  });
  it("lumpsum 1L / 10% / 5y = 1,61,051", () => expect(Math.round(lumpsum({ amount: 100000, annualRatePct: 10, years: 5 }).value)).toBe(161051));
  it("step-up beats flat sip", () => expect(stepUpSip({ monthly: 10000, stepUpPct: 10, annualRatePct: 12, years: 10 }).value).toBeGreaterThan(sip({ monthly: 10000, annualRatePct: 12, years: 10 }).value));
  it("swp runs out when withdrawal is too high", () => { const r = swp({ corpus: 1000000, monthlyWithdrawal: 50000, annualRatePct: 8, years: 10 }); expect(r.monthsLasted).toBeLessThan(120); expect(r.endValue).toBe(0); });
  it("stp moves everything across", () => { const r = stp({ amount: 600000, monthlyTransfer: 50000, sourceRatePct: 6, targetRatePct: 12, months: 12 }); expect(r.transferred).toBe(600000); expect(r.sourceEnd).toBeGreaterThan(0); expect(r.sourceEnd).toBeLessThan(600000 * 0.05); });
  it("goal sip reaches target", () => {
    const g = goal({ target: 1000000, years: 10, annualRatePct: 12, inflationPct: 0 });
    expect(near(sip({ monthly: g.monthlySip, annualRatePct: 12, years: 10 }).value, 1000000, 0.5)).toBe(true);
  });
  it("retirement produces a positive sip", () => { const r = retirement({ age: 30, retireAge: 60, lifeExpectancy: 85, monthlyExpense: 50000, inflationPct: 6, preReturnPct: 12, postReturnPct: 7 }); expect(r.corpusNeeded).toBeGreaterThan(0); expect(r.monthlySip).toBeGreaterThan(0); });
  it("child education years from ages", () => expect(childEducation({ childAge: 5, goalAge: 18, costToday: 2000000, educationInflationPct: 8, annualRatePct: 12 }).years).toBe(13));
  it("cagr doubling in 6y ≈ 12.2%", () => expect(cagr({ start: 100, end: 200, years: 6 }).cagrPct).toBeCloseTo(12.246, 2));
  it("inflation halves power at ~12y/6%", () => expect(inflation({ amount: 100, inflationPct: 6, years: 12 }).purchasingPower).toBeCloseTo(49.7, 0));
  it("pms fee: no perf fee below hurdle", () => { const r = pmsFee({ corpus: 5_000_000, years: 1, grossReturnPct: 8 }); expect(r.series[0].perfFee).toBe(0); expect(r.netValue).toBeLessThan(r.grossValue); });
  it("pms fee: perf fee above hurdle", () => expect(pmsFee({ corpus: 5_000_000, years: 1, grossReturnPct: 25 }).series[0].perfFee).toBeGreaterThan(0));
  it("pms fee: high-water mark blocks perf fee in recovery year", () => {
    const r = pmsFee({ corpus: 5_000_000, years: 2, grossReturnPct: 0 });
    expect(r.series.every((y) => y.perfFee === 0)).toBe(true);
  });

  it("zero, negative and junk inputs never yield NaN", () => {
    const all = [
      sip({ monthly: 0, annualRatePct: 12, years: 10 }), sip({ monthly: -1, annualRatePct: -5, years: -3 }),
      sip({ monthly: NaN, annualRatePct: NaN, years: NaN }), lumpsum({ amount: 0, annualRatePct: 0, years: 0 }),
      stepUpSip({ monthly: 0, stepUpPct: 0, annualRatePct: 0, years: 0 }),
    ];
    for (const r of all) { expect(r.value).toBe(0); expect(Number.isNaN(r.gain)).toBe(false); }
    expect(goal({ target: 0, years: 0, annualRatePct: 0, inflationPct: 0 }).monthlySip).toBe(0);
    expect(goal({ target: 100000, years: 5, annualRatePct: 0, inflationPct: 0 }).monthlySip).toBeCloseTo(100000 / 60, 0);
    expect(cagr({ start: 0, end: 0, years: 0 }).cagrPct).toBe(0);
    expect(pmsFee({ corpus: 0, years: 0, grossReturnPct: NaN }).netValue).toBe(0);
    expect(Number.isNaN(retirement({ age: 60, retireAge: 30, lifeExpectancy: 20, monthlyExpense: 0, inflationPct: 0, preReturnPct: 0, postReturnPct: 0 }).monthlySip)).toBe(false);
  });
});
