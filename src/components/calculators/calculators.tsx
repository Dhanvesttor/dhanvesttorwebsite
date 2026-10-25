"use client";
import { useState } from "react";
import Link from "next/link";
import { RangeField } from "./RangeField";
import { ResultCard } from "./ResultCard";
import { GrowthChart } from "./GrowthChart";
import { CalculatorShell } from "./CalculatorShell";
import { sip, stepUpSip, lumpsum, swp, stp, goal, retirement, childEducation, cagr, inflation, pmsFee } from "@/lib/calc";
import { inr, inrShort, pct } from "@/lib/calc/format";

const series = (s: { year: number; invested: number; value: number }[]) => s.map((p) => ({ x: p.year, a: p.invested, b: p.value }));

export function SipCalculator({ compact }: { compact?: boolean }) {
  const [m, setM] = useState(10000), [r, setR] = useState(12), [y, setY] = useState(10);
  const res = sip({ monthly: m, annualRatePct: r, years: y });
  const inputs = (<>
    <RangeField label="Monthly investment" value={m} onChange={setM} min={500} max={200000} step={500} prefix="₹" />
    <RangeField label="Expected return (a year)" value={r} onChange={setR} min={1} max={20} step={0.5} suffix="%" />
    <RangeField label="Time period" value={y} onChange={setY} min={1} max={40} suffix="yrs" />
  </>);
  const result = <ResultCard headlineLabel="Estimated value" headline={inrShort(res.value)} rows={[{ label: "You invest", value: inr(res.invested), swatch: "sand" }, { label: "Estimated gain", value: inr(res.gain), swatch: "indigo" }, { label: "Total value", value: inr(res.value) }]} />;
  if (compact) return <div className="grid gap-6 lg:grid-cols-2"><div className="grid content-start gap-7 rounded-2xl border border-line bg-white p-6">{inputs}<Link href="/calculators" className="text-[13px] font-medium text-raspberry underline underline-offset-4">Eleven more calculators →</Link></div>{result}</div>;
  return <CalculatorShell inputs={inputs} result={result} chart={<GrowthChart points={series(res.series)} />} />;
}

export function StepUpSipCalculator() {
  const [m, setM] = useState(10000), [s, setS] = useState(10), [r, setR] = useState(12), [y, setY] = useState(15);
  const res = stepUpSip({ monthly: m, stepUpPct: s, annualRatePct: r, years: y });
  const flat = sip({ monthly: m, annualRatePct: r, years: y });
  return <CalculatorShell
    inputs={<>
      <RangeField label="Starting monthly investment" value={m} onChange={setM} min={500} max={200000} step={500} prefix="₹" />
      <RangeField label="Increase every year" value={s} onChange={setS} min={0} max={30} suffix="%" hint="Most people raise their SIP in line with their salary." />
      <RangeField label="Expected return (a year)" value={r} onChange={setR} min={1} max={20} step={0.5} suffix="%" />
      <RangeField label="Time period" value={y} onChange={setY} min={1} max={40} suffix="yrs" />
    </>}
    result={<ResultCard headlineLabel="Estimated value" headline={inrShort(res.value)} rows={[{ label: "You invest", value: inr(res.invested), swatch: "sand" }, { label: "Estimated gain", value: inr(res.gain), swatch: "indigo" }, { label: "Without the step-up", value: inr(flat.value) }, { label: "Extra from stepping up", value: inr(res.value - flat.value) }]} />}
    chart={<GrowthChart points={series(res.series)} />} />;
}

export function LumpsumCalculator() {
  const [a, setA] = useState(500000), [r, setR] = useState(12), [y, setY] = useState(10);
  const res = lumpsum({ amount: a, annualRatePct: r, years: y });
  return <CalculatorShell
    inputs={<>
      <RangeField label="One-time investment" value={a} onChange={setA} min={5000} max={50000000} step={5000} prefix="₹" />
      <RangeField label="Expected return (a year)" value={r} onChange={setR} min={1} max={20} step={0.5} suffix="%" />
      <RangeField label="Time period" value={y} onChange={setY} min={1} max={40} suffix="yrs" />
    </>}
    result={<ResultCard headlineLabel="Estimated value" headline={inrShort(res.value)} rows={[{ label: "You invest", value: inr(res.invested), swatch: "sand" }, { label: "Estimated gain", value: inr(res.gain), swatch: "indigo" }]} />}
    chart={<GrowthChart points={series(res.series)} />} />;
}

export function SwpCalculator() {
  const [c, setC] = useState(10000000), [w, setW] = useState(60000), [r, setR] = useState(8), [y, setY] = useState(20);
  const res = swp({ corpus: c, monthlyWithdrawal: w, annualRatePct: r, years: y });
  const lasted = res.monthsLasted < y * 12 ? `Runs out after ${Math.floor(res.monthsLasted / 12)} yrs ${res.monthsLasted % 12} mths` : `Lasts the full ${y} years`;
  return <CalculatorShell
    inputs={<>
      <RangeField label="Corpus today" value={c} onChange={setC} min={100000} max={100000000} step={100000} prefix="₹" />
      <RangeField label="Monthly withdrawal" value={w} onChange={setW} min={1000} max={1000000} step={1000} prefix="₹" />
      <RangeField label="Expected return (a year)" value={r} onChange={setR} min={1} max={15} step={0.5} suffix="%" />
      <RangeField label="Withdraw for" value={y} onChange={setY} min={1} max={40} suffix="yrs" />
    </>}
    result={<ResultCard headlineLabel="Left at the end" headline={inrShort(res.endValue)} rows={[{ label: "Total withdrawn", value: inr(res.totalWithdrawn), swatch: "sand" }, { label: "Corpus remaining", value: inr(res.endValue), swatch: "indigo" }, { label: "Outcome", value: lasted }]} />}
    chart={<GrowthChart points={res.series.map((p) => ({ x: p.year, a: p.withdrawn, b: p.value }))} aLabel="Withdrawn so far" bLabel="Corpus left" />} />;
}

export function StpCalculator() {
  const [a, setA] = useState(1200000), [t, setT] = useState(100000), [rs, setRs] = useState(6.5), [rt, setRt] = useState(12), [n, setN] = useState(12);
  const res = stp({ amount: a, monthlyTransfer: t, sourceRatePct: rs, targetRatePct: rt, months: n });
  return <CalculatorShell
    inputs={<>
      <RangeField label="Amount parked in a debt fund" value={a} onChange={setA} min={100000} max={50000000} step={50000} prefix="₹" />
      <RangeField label="Monthly transfer to equity" value={t} onChange={setT} min={5000} max={5000000} step={5000} prefix="₹" />
      <RangeField label="Debt fund return" value={rs} onChange={setRs} min={1} max={10} step={0.25} suffix="%" />
      <RangeField label="Equity fund return" value={rt} onChange={setRt} min={1} max={20} step={0.5} suffix="%" />
      <RangeField label="Transfer for" value={n} onChange={setN} min={1} max={60} suffix="mths" />
    </>}
    result={<ResultCard headlineLabel="Total after the transfer period" headline={inrShort(res.totalEnd)} rows={[{ label: "In the equity fund", value: inr(res.targetEnd), swatch: "indigo" }, { label: "Still in the debt fund", value: inr(res.sourceEnd), swatch: "sand" }, { label: "Transferred", value: inr(res.transferred) }]} />}
    chart={<GrowthChart points={res.series.map((p) => ({ x: p.month, a: p.source, b: p.target }))} aLabel="Debt fund" bLabel="Equity fund" xLabel={(x) => `M${x}`} />} />;
}

export function GoalCalculator() {
  const [g, setG] = useState(5000000), [y, setY] = useState(10), [r, setR] = useState(12), [i, setI] = useState(6), [e, setE] = useState(0);
  const res = goal({ target: g, years: y, annualRatePct: r, inflationPct: i, existing: e });
  return <CalculatorShell
    inputs={<>
      <RangeField label="What the goal costs today" value={g} onChange={setG} min={50000} max={100000000} step={50000} prefix="₹" />
      <RangeField label="Years until you need it" value={y} onChange={setY} min={1} max={40} suffix="yrs" />
      <RangeField label="Inflation" value={i} onChange={setI} min={0} max={12} step={0.5} suffix="%" />
      <RangeField label="Expected return (a year)" value={r} onChange={setR} min={1} max={20} step={0.5} suffix="%" />
      <RangeField label="Already saved towards it" value={e} onChange={setE} min={0} max={50000000} step={10000} prefix="₹" />
    </>}
    result={<ResultCard headlineLabel="Monthly SIP needed" headline={inr(Math.ceil(res.monthlySip))} rows={[{ label: "Goal cost in the future", value: inr(res.futureTarget) }, { label: "Your savings will grow to", value: inr(res.fromExisting) }, { label: "Or invest once today", value: inr(Math.ceil(res.lumpsumToday)) }]} />} />;
}

export function RetirementCalculator() {
  const [age, setAge] = useState(35), [ra, setRa] = useState(60), [le, setLe] = useState(85), [exp, setExp] = useState(60000), [inf, setInf] = useState(6), [pre, setPre] = useState(12), [post, setPost] = useState(7), [ex, setEx] = useState(0);
  const res = retirement({ age, retireAge: ra, lifeExpectancy: le, monthlyExpense: exp, inflationPct: inf, preReturnPct: pre, postReturnPct: post, existing: ex });
  return <CalculatorShell
    inputs={<>
      <div className="grid gap-8 sm:grid-cols-3">
        <RangeField label="Age now" value={age} onChange={setAge} min={18} max={70} />
        <RangeField label="Retire at" value={ra} onChange={setRa} min={40} max={75} />
        <RangeField label="Plan until" value={le} onChange={setLe} min={70} max={100} />
      </div>
      <RangeField label="Monthly expenses today" value={exp} onChange={setExp} min={10000} max={1000000} step={5000} prefix="₹" />
      <RangeField label="Inflation" value={inf} onChange={setInf} min={0} max={12} step={0.5} suffix="%" />
      <RangeField label="Return before retirement" value={pre} onChange={setPre} min={1} max={18} step={0.5} suffix="%" />
      <RangeField label="Return after retirement" value={post} onChange={setPost} min={1} max={12} step={0.5} suffix="%" />
      <RangeField label="Retirement savings so far" value={ex} onChange={setEx} min={0} max={100000000} step={50000} prefix="₹" />
    </>}
    result={<ResultCard headlineLabel="Corpus you'll need" headline={inrShort(res.corpusNeeded)} rows={[{ label: "Monthly expenses at retirement", value: inr(res.expenseAtRetirement) }, { label: "Years to retirement", value: `${res.yearsTo}` }, { label: "Years in retirement", value: `${res.yearsIn}` }, { label: "Savings will grow to", value: inr(res.fromExisting) }, { label: "Monthly SIP needed", value: inr(Math.ceil(res.monthlySip)) }]} />} />;
}

export function ChildEducationCalculator() {
  const [ca, setCa] = useState(5), [ga, setGa] = useState(18), [cost, setCost] = useState(2500000), [inf, setInf] = useState(9), [r, setR] = useState(12), [e, setE] = useState(0);
  const res = childEducation({ childAge: ca, goalAge: ga, costToday: cost, educationInflationPct: inf, annualRatePct: r, existing: e });
  return <CalculatorShell
    inputs={<>
      <div className="grid gap-8 sm:grid-cols-2">
        <RangeField label="Child's age now" value={ca} onChange={setCa} min={0} max={17} />
        <RangeField label="Age at college" value={ga} onChange={setGa} min={15} max={25} />
      </div>
      <RangeField label="Course cost today" value={cost} onChange={setCost} min={100000} max={30000000} step={50000} prefix="₹" hint="Indian undergraduate degrees range widely; overseas master's often exceed ₹50 lakh." />
      <RangeField label="Education inflation" value={inf} onChange={setInf} min={0} max={15} step={0.5} suffix="%" hint="Education costs have historically risen faster than general inflation." />
      <RangeField label="Expected return (a year)" value={r} onChange={setR} min={1} max={18} step={0.5} suffix="%" />
      <RangeField label="Already saved" value={e} onChange={setE} min={0} max={10000000} step={10000} prefix="₹" />
    </>}
    result={<ResultCard headlineLabel="Monthly SIP needed" headline={inr(Math.ceil(res.monthlySip))} rows={[{ label: "Years to go", value: `${res.years}` }, { label: "Cost when she starts", value: inr(res.futureTarget) }, { label: "Or invest once today", value: inr(Math.ceil(res.lumpsumToday)) }]} />} />;
}

export function CagrCalculator() {
  const [s, setS] = useState(100000), [e, setE] = useState(250000), [y, setY] = useState(7);
  const res = cagr({ start: s, end: e, years: y });
  return <CalculatorShell
    inputs={<>
      <RangeField label="Starting value" value={s} onChange={setS} min={1000} max={100000000} step={1000} prefix="₹" />
      <RangeField label="Ending value" value={e} onChange={setE} min={1000} max={100000000} step={1000} prefix="₹" />
      <RangeField label="Years held" value={y} onChange={setY} min={1} max={40} step={0.5} suffix="yrs" />
    </>}
    result={<ResultCard headlineLabel="Compound annual growth rate" headline={pct(res.cagrPct, 2)} rows={[{ label: "Absolute return", value: pct(res.absolutePct, 1) }, { label: "Gain", value: inr(Math.max(0, e - s)) }]} note="CAGR smooths the path into a single yearly rate. It does not show the ups and downs in between." />} />;
}

export function InflationCalculator() {
  const [a, setA] = useState(100000), [r, setR] = useState(6), [y, setY] = useState(15);
  const res = inflation({ amount: a, inflationPct: r, years: y });
  return <CalculatorShell
    inputs={<>
      <RangeField label="Amount today" value={a} onChange={setA} min={1000} max={50000000} step={1000} prefix="₹" />
      <RangeField label="Inflation" value={r} onChange={setR} min={1} max={15} step={0.5} suffix="%" />
      <RangeField label="Years" value={y} onChange={setY} min={1} max={40} suffix="yrs" />
    </>}
    result={<ResultCard headlineLabel={`What ${inrShort(a)} of today costs in ${y} years`} headline={inrShort(res.futureCost)} rows={[{ label: "Future cost", value: inr(res.futureCost), swatch: "indigo" }, { label: `Today's ${inrShort(a)} will buy`, value: inr(res.purchasingPower), swatch: "sand" }]} note="A savings account paying less than inflation loses purchasing power every year, quietly." />}
    chart={<GrowthChart points={res.series.map((p) => ({ x: p.year, a: p.power, b: p.cost }))} aLabel="Purchasing power" bLabel="Future cost" />} />;
}

export function PmsFeeCalculator() {
  const [c, setC] = useState(5000000), [y, setY] = useState(5), [g, setG] = useState(15);
  const res = pmsFee({ corpus: c, years: y, grossReturnPct: g });
  return <CalculatorShell
    inputs={<>
      <RangeField label="Investment" value={c} onChange={setC} min={5000000} max={500000000} step={500000} prefix="₹" hint="The SEBI minimum for PMS is ₹50 lakh." />
      <RangeField label="Gross portfolio return (a year)" value={g} onChange={setG} min={-20} max={40} step={1} suffix="%" hint="Before any fees. Try a low year and a high year." />
      <RangeField label="Years" value={y} onChange={setY} min={1} max={15} suffix="yrs" />
      <div className="rounded-xl bg-paper p-4 text-[13.5px] text-[#3f3d5c]">
        <p className="font-medium text-ink">Fee structure used</p>
        <p className="mt-1">2% a year fixed, charged monthly · 20% of returns above a 10% hurdle, with a high-water mark · 0.1% operating expenses · 1.5% exit load in year one only.</p>
      </div>
    </>}
    result={<ResultCard headlineLabel="Value after fees" headline={inrShort(res.netValue)} rows={[{ label: "Value before fees", value: inr(res.grossValue) }, { label: "Total fees", value: inr(res.totalFees) }, { label: "Fees as % a year (effective)", value: pct(res.effectiveAnnualFeePct, 2) }]} note="Illustration only. Your actual fee depends on daily portfolio values, inflows and outflows, and the terms of your client agreement." />}
    chart={<GrowthChart points={res.series.map((p) => ({ x: p.year, a: p.net, b: p.gross }))} aLabel="After fees" bLabel="Before fees" />} />;
}
