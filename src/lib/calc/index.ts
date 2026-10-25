import { safe } from "./format";

export type YearPoint = { year: number; invested: number; value: number };
export type GrowthResult = { invested: number; value: number; gain: number; series: YearPoint[] };

const zero = (): GrowthResult => ({ invested: 0, value: 0, gain: 0, series: [] });
const monthlyRate = (annualPct: number) => Math.pow(1 + annualPct / 100, 1 / 12) - 1;

/** SIP with payments at the start of each month (annuity due), monthly compounding from an effective annual rate. */
export function sip(input: { monthly: number; annualRatePct: number; years: number }): GrowthResult {
  const m = safe(input.monthly), r = safe(input.annualRatePct), y = Math.floor(safe(input.years));
  if (!m || !y) return zero();
  const i = monthlyRate(r);
  let value = 0, invested = 0; const series: YearPoint[] = [];
  for (let month = 1; month <= y * 12; month++) {
    value = (value + m) * (1 + i); invested += m;
    if (month % 12 === 0) series.push({ year: month / 12, invested, value });
  }
  return { invested, value, gain: value - invested, series };
}

/** SIP whose monthly amount rises by `stepUpPct` every 12 months. */
export function stepUpSip(input: { monthly: number; stepUpPct: number; annualRatePct: number; years: number }): GrowthResult {
  const m0 = safe(input.monthly), s = safe(input.stepUpPct), r = safe(input.annualRatePct), y = Math.floor(safe(input.years));
  if (!m0 || !y) return zero();
  const i = monthlyRate(r);
  let value = 0, invested = 0, m = m0; const series: YearPoint[] = [];
  for (let month = 1; month <= y * 12; month++) {
    value = (value + m) * (1 + i); invested += m;
    if (month % 12 === 0) { series.push({ year: month / 12, invested, value }); m = m * (1 + s / 100); }
  }
  return { invested, value, gain: value - invested, series };
}

export function lumpsum(input: { amount: number; annualRatePct: number; years: number }): GrowthResult {
  const a = safe(input.amount), r = safe(input.annualRatePct), y = Math.floor(safe(input.years));
  if (!a || !y) return zero();
  const series: YearPoint[] = [];
  for (let k = 1; k <= y; k++) series.push({ year: k, invested: a, value: a * Math.pow(1 + r / 100, k) });
  const value = series[series.length - 1].value;
  return { invested: a, value, gain: value - a, series };
}

export type SwpResult = { totalWithdrawn: number; endValue: number; monthsLasted: number; series: { year: number; withdrawn: number; value: number }[] };

/** Systematic withdrawal: corpus grows monthly, a fixed amount is withdrawn at the start of each month. */
export function swp(input: { corpus: number; monthlyWithdrawal: number; annualRatePct: number; years: number }): SwpResult {
  const c = safe(input.corpus), w = safe(input.monthlyWithdrawal), r = safe(input.annualRatePct), y = Math.floor(safe(input.years));
  if (!c || !y) return { totalWithdrawn: 0, endValue: 0, monthsLasted: 0, series: [] };
  const i = monthlyRate(r);
  let value = c, withdrawn = 0, months = 0; const series: SwpResult["series"] = [];
  for (let month = 1; month <= y * 12; month++) {
    if (value <= 0) break;
    const take = Math.min(w, value);
    value = (value - take) * (1 + i); withdrawn += take; months = month;
    if (month % 12 === 0) series.push({ year: month / 12, withdrawn, value });
  }
  return { totalWithdrawn: withdrawn, endValue: Math.max(0, value), monthsLasted: months, series };
}

export type StpResult = { sourceEnd: number; targetEnd: number; totalEnd: number; transferred: number; series: { month: number; source: number; target: number }[] };

/** Systematic transfer from a debt fund (source) to an equity fund (target) over `months`, then both held to `horizonMonths`. */
export function stp(input: { amount: number; monthlyTransfer: number; sourceRatePct: number; targetRatePct: number; months: number }): StpResult {
  const a = safe(input.amount), t = safe(input.monthlyTransfer), rs = safe(input.sourceRatePct), rt = safe(input.targetRatePct), n = Math.floor(safe(input.months));
  if (!a || !n) return { sourceEnd: 0, targetEnd: 0, totalEnd: 0, transferred: 0, series: [] };
  const is = monthlyRate(rs), it = monthlyRate(rt);
  let src = a, tgt = 0, moved = 0; const series: StpResult["series"] = [];
  for (let m = 1; m <= n; m++) {
    const x = Math.min(t, src); src -= x; tgt += x; moved += x;
    src *= 1 + is; tgt *= 1 + it;
    series.push({ month: m, source: src, target: tgt });
  }
  return { sourceEnd: src, targetEnd: tgt, totalEnd: src + tgt, transferred: moved, series };
}

/** Monthly SIP needed to reach `target` (in today's money, inflated) in `years`. */
export function goal(input: { target: number; years: number; annualRatePct: number; inflationPct: number; existing?: number }) {
  const tgt0 = safe(input.target), y = Math.floor(safe(input.years)), r = safe(input.annualRatePct), inf = safe(input.inflationPct), ex = safe(input.existing);
  if (!tgt0 || !y) return { futureTarget: 0, fromExisting: 0, gap: 0, monthlySip: 0, lumpsumToday: 0 };
  const futureTarget = tgt0 * Math.pow(1 + inf / 100, y);
  const fromExisting = ex * Math.pow(1 + r / 100, y);
  const gap = Math.max(0, futureTarget - fromExisting);
  const i = monthlyRate(r), n = y * 12;
  const factor = i === 0 ? n : ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  return { futureTarget, fromExisting, gap, monthlySip: gap / factor, lumpsumToday: gap / Math.pow(1 + r / 100, y) };
}

/** Corpus needed at retirement to fund inflation-rising expenses for `yearsInRetirement`, and the SIP to get there. */
export function retirement(input: { age: number; retireAge: number; lifeExpectancy: number; monthlyExpense: number; inflationPct: number; preReturnPct: number; postReturnPct: number; existing?: number }) {
  const age = safe(input.age), ra = safe(input.retireAge), le = safe(input.lifeExpectancy), exp = safe(input.monthlyExpense);
  const inf = safe(input.inflationPct), pre = safe(input.preReturnPct), post = safe(input.postReturnPct), ex = safe(input.existing);
  const yearsTo = Math.max(0, Math.floor(ra - age)), yearsIn = Math.max(0, Math.floor(le - ra));
  if (!exp || !yearsTo || !yearsIn) return { yearsTo, yearsIn, expenseAtRetirement: 0, corpusNeeded: 0, fromExisting: 0, monthlySip: 0 };
  const expenseAtRetirement = exp * Math.pow(1 + inf / 100, yearsTo);
  // Present value at retirement of a growing annuity (annual, paid at start of year).
  const annual = expenseAtRetirement * 12, g = inf / 100, rr = post / 100;
  const corpusNeeded = Math.abs(rr - g) < 1e-9 ? annual * yearsIn : annual * (1 - Math.pow((1 + g) / (1 + rr), yearsIn)) / (rr - g) * (1 + rr);
  const fromExisting = ex * Math.pow(1 + pre / 100, yearsTo);
  const gap = Math.max(0, corpusNeeded - fromExisting);
  const i = monthlyRate(pre), n = yearsTo * 12;
  const factor = i === 0 ? n : ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
  return { yearsTo, yearsIn, expenseAtRetirement, corpusNeeded, fromExisting, monthlySip: gap / factor };
}

export function childEducation(input: { childAge: number; goalAge: number; costToday: number; educationInflationPct: number; annualRatePct: number; existing?: number }) {
  const years = Math.max(0, Math.floor(safe(input.goalAge) - safe(input.childAge)));
  const g = goal({ target: input.costToday, years, annualRatePct: input.annualRatePct, inflationPct: input.educationInflationPct, existing: input.existing });
  return { years, ...g };
}

export function cagr(input: { start: number; end: number; years: number }) {
  const s = safe(input.start), e = safe(input.end), y = safe(input.years);
  if (!s || !e || !y) return { cagrPct: 0, absolutePct: 0 };
  return { cagrPct: (Math.pow(e / s, 1 / y) - 1) * 100, absolutePct: (e / s - 1) * 100 };
}

export function inflation(input: { amount: number; inflationPct: number; years: number }) {
  const a = safe(input.amount), r = safe(input.inflationPct), y = Math.floor(safe(input.years));
  if (!a || !y) return { futureCost: 0, purchasingPower: 0, series: [] as { year: number; cost: number; power: number }[] };
  const series = Array.from({ length: y }, (_, k) => ({ year: k + 1, cost: a * Math.pow(1 + r / 100, k + 1), power: a / Math.pow(1 + r / 100, k + 1) }));
  return { futureCost: series[y - 1].cost, purchasingPower: series[y - 1].power, series };
}

export type PmsFeeYear = { year: number; gross: number; fixedFee: number; perfFee: number; net: number; highWater: number };

/**
 * Illustrates Dhanvesttor's PMS fee: fixed fee charged monthly on portfolio value,
 * performance fee on returns above the hurdle, with a high-water mark, settled annually.
 * Exit load applies only if `exitInYearOne`. Operating expenses as an annual % of value.
 */
export function pmsFee(input: { corpus: number; years: number; grossReturnPct: number; fixedPct?: number; perfPct?: number; hurdlePct?: number; operatingPct?: number; exitInYearOne?: boolean; exitLoadPct?: number }) {
  const c = safe(input.corpus), y = Math.floor(safe(input.years)), gr = Number.isFinite(input.grossReturnPct) ? input.grossReturnPct : 0;
  const fixed = input.fixedPct ?? 2, perf = input.perfPct ?? 20, hurdle = input.hurdlePct ?? 10, op = input.operatingPct ?? 0.1, exitLoad = input.exitLoadPct ?? 1.5;
  if (!c || !y) return { netValue: 0, grossValue: 0, totalFees: 0, effectiveAnnualFeePct: 0, series: [] as PmsFeeYear[] };
  const gm = Math.pow(1 + gr / 100, 1 / 12) - 1;
  let value = c, grossOnly = c, hwm = c, totalFees = 0; const series: PmsFeeYear[] = [];
  for (let k = 1; k <= y; k++) {
    const start = value; let fixedFee = 0;
    for (let m = 0; m < 12; m++) {
      value *= 1 + gm; grossOnly *= 1 + gm;
      const f = value * (fixed / 100 / 12) + value * (op / 100 / 12);
      value -= f; fixedFee += f;
    }
    const hurdleLevel = Math.max(hwm, start) * (1 + hurdle / 100);
    const perfFee = value > hurdleLevel ? (value - hurdleLevel) * (perf / 100) : 0;
    value -= perfFee; if (value > hwm) hwm = value;
    totalFees += fixedFee + perfFee;
    series.push({ year: k, gross: grossOnly, fixedFee, perfFee, net: value, highWater: hwm });
  }
  if (input.exitInYearOne && y === 1) { const l = value * exitLoad / 100; value -= l; totalFees += l; }
  const netCagr = Math.pow(value / c, 1 / y) - 1, grossCagr = Math.pow(grossOnly / c, 1 / y) - 1;
  return { netValue: value, grossValue: grossOnly, totalFees, effectiveAnnualFeePct: (grossCagr - netCagr) * 100, series };
}
