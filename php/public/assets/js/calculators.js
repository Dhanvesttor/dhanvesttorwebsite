// Live calculators: keeps each number box and slider in sync, recomputes on every change and draws the
// growth chart. Results mirror src/components/calculators/calculators.tsx; the markup comes from app/lib/calculators.php.
import { sip, stepUpSip, lumpsum, swp, stp, goal, retirement, childEducation, cagr, inflation, pmsFee, inr, inrShort, pct } from "./calc.js";

const series = (s) => s.map((p) => ({ x: p.year, a: p.invested, b: p.value }));

/** slug -> (values) => { headline, rows, labels?, points?, xLabel? } */
const compute = {
  sip: (v) => {
    const r = sip({ monthly: v.m, annualRatePct: v.r, years: v.y });
    return { headline: inrShort(r.value), rows: { invested: inr(r.invested), gain: inr(r.gain), value: inr(r.value) }, points: series(r.series) };
  },
  "step-up-sip": (v) => {
    const r = stepUpSip({ monthly: v.m, stepUpPct: v.s, annualRatePct: v.r, years: v.y });
    const flat = sip({ monthly: v.m, annualRatePct: v.r, years: v.y });
    return { headline: inrShort(r.value), rows: { invested: inr(r.invested), gain: inr(r.gain), flat: inr(flat.value), extra: inr(r.value - flat.value) }, points: series(r.series) };
  },
  lumpsum: (v) => {
    const r = lumpsum({ amount: v.a, annualRatePct: v.r, years: v.y });
    return { headline: inrShort(r.value), rows: { invested: inr(r.invested), gain: inr(r.gain) }, points: series(r.series) };
  },
  swp: (v) => {
    const r = swp({ corpus: v.c, monthlyWithdrawal: v.w, annualRatePct: v.r, years: v.y });
    const lasted = r.monthsLasted < v.y * 12 ? `Runs out after ${Math.floor(r.monthsLasted / 12)} yrs ${r.monthsLasted % 12} mths` : `Lasts the full ${v.y} years`;
    return { headline: inrShort(r.endValue), rows: { withdrawn: inr(r.totalWithdrawn), remaining: inr(r.endValue), outcome: lasted },
      points: r.series.map((p) => ({ x: p.year, a: p.withdrawn, b: p.value })) };
  },
  stp: (v) => {
    const r = stp({ amount: v.a, monthlyTransfer: v.t, sourceRatePct: v.rs, targetRatePct: v.rt, months: v.n });
    return { headline: inrShort(r.totalEnd), rows: { target: inr(r.targetEnd), source: inr(r.sourceEnd), transferred: inr(r.transferred) },
      points: r.series.map((p) => ({ x: p.month, a: p.source, b: p.target })), xLabel: (x) => `M${x}` };
  },
  goal: (v) => {
    const r = goal({ target: v.g, years: v.y, annualRatePct: v.r, inflationPct: v.i, existing: v.e });
    return { headline: inr(Math.ceil(r.monthlySip)), rows: { future: inr(r.futureTarget), grow: inr(r.fromExisting), once: inr(Math.ceil(r.lumpsumToday)) } };
  },
  retirement: (v) => {
    const r = retirement({ age: v.age, retireAge: v.ra, lifeExpectancy: v.le, monthlyExpense: v.exp, inflationPct: v.inf, preReturnPct: v.pre, postReturnPct: v.post, existing: v.ex });
    return { headline: inrShort(r.corpusNeeded), rows: { expRet: inr(r.expenseAtRetirement), yearsTo: `${r.yearsTo}`, yearsIn: `${r.yearsIn}`, grow: inr(r.fromExisting), sip: inr(Math.ceil(r.monthlySip)) } };
  },
  "child-education": (v) => {
    const r = childEducation({ childAge: v.ca, goalAge: v.ga, costToday: v.cost, educationInflationPct: v.inf, annualRatePct: v.r, existing: v.e });
    return { headline: inr(Math.ceil(r.monthlySip)), rows: { years: `${r.years}`, future: inr(r.futureTarget), once: inr(Math.ceil(r.lumpsumToday)) } };
  },
  cagr: (v) => {
    const r = cagr({ start: v.s, end: v.e, years: v.y });
    return { headline: pct(r.cagrPct, 2), rows: { abs: pct(r.absolutePct, 1), gain: inr(Math.max(0, v.e - v.s)) } };
  },
  inflation: (v) => {
    const r = inflation({ amount: v.a, inflationPct: v.r, years: v.y });
    return { headline: inrShort(r.futureCost), rows: { cost: inr(r.futureCost), power: inr(r.purchasingPower) },
      labels: { headline: `What ${inrShort(v.a)} of today costs in ${v.y} years`, power: `Today's ${inrShort(v.a)} will buy` },
      points: r.series.map((p) => ({ x: p.year, a: p.power, b: p.cost })) };
  },
  "pms-fee": (v) => {
    const r = pmsFee({ corpus: v.c, years: v.y, grossReturnPct: v.g });
    return { headline: inrShort(r.netValue), rows: { gross: inr(r.grossValue), fees: inr(r.totalFees), eff: pct(r.effectiveAnnualFeePct, 2) },
      points: r.series.map((p) => ({ x: p.year, a: p.net, b: p.gross })) };
  },
};

/* ---------- Chart ---------- */

const W = 640, H = 260, P = { l: 56, r: 12, t: 16, b: 28 };

function drawChart(fig, points, xLabel = (x) => `Yr ${x}`) {
  const svg = fig.querySelector("[data-chart-svg]");
  const readout = fig.querySelector("[data-chart-readout]");
  const [aLabel, bLabel] = [...fig.querySelectorAll("figcaption > span:not([data-chart-readout])")].map((s) => s.textContent.trim());
  if (points.length < 2) {
    svg.innerHTML = `<text x="${W / 2}" y="${H / 2}" text-anchor="middle" font-size="13" fill="#6E6C86">Enter values to see the chart</text>`;
    readout.textContent = "";
    fig.onpointermove = fig.onpointerleave = null;
    return;
  }
  const max = Math.max(...points.map((p) => Math.max(p.a, p.b))) || 1;
  const x = (i) => P.l + (i / (points.length - 1)) * (W - P.l - P.r);
  const y = (v) => H - P.b - (v / max) * (H - P.t - P.b);
  const area = (k) => `M${x(0)},${H - P.b} ` + points.map((p, i) => `L${x(i)},${y(p[k])}`).join(" ") + ` L${x(points.length - 1)},${H - P.b} Z`;
  const line = (k) => points.map((p, i) => `${i ? "L" : "M"}${x(i)},${y(p[k])}`).join(" ");
  const every = Math.ceil(points.length / 8);
  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => t * max)
    .map((t) => `<line x1="${P.l}" x2="${W - P.r}" y1="${y(t)}" y2="${y(t)}" stroke="rgba(29,27,58,.08)"/><text x="${P.l - 8}" y="${y(t) + 4}" text-anchor="end" font-size="11" fill="#6E6C86">${inrShort(t)}</text>`).join("");
  const xs = points.map((p, i) => (i % every === 0 ? `<text x="${x(i)}" y="${H - 8}" text-anchor="middle" font-size="11" fill="#6E6C86">${xLabel(p.x)}</text>` : "")).join("");
  svg.innerHTML = ticks
    + `<path d="${area("b")}" fill="rgba(46,42,110,.14)"/><path d="${line("b")}" fill="none" stroke="#2E2A6E" stroke-width="2.25"/>`
    + `<path d="${area("a")}" fill="#E9DCC7" opacity=".9"/><path d="${line("a")}" fill="none" stroke="#C8876A" stroke-width="1.5"/>`
    + xs + `<line data-marker-line y1="${P.t}" y2="${H - P.b}" stroke="#DE4D7A" stroke-dasharray="3 3"/><circle data-marker-dot r="4.5" fill="#DE4D7A" stroke="#fff" stroke-width="2"/>`;
  const last = points[points.length - 1];
  svg.setAttribute("aria-label", `${bLabel} grows to ${inrShort(last.b)} against ${aLabel.toLowerCase()} of ${inrShort(last.a)}`);

  const mLine = svg.querySelector("[data-marker-line]"), mDot = svg.querySelector("[data-marker-dot]");
  const show = (h) => {
    const p = points[h];
    mLine.setAttribute("x1", x(h)); mLine.setAttribute("x2", x(h));
    mDot.setAttribute("cx", x(h)); mDot.setAttribute("cy", y(p.b));
    readout.textContent = `${xLabel(p.x)} · ${aLabel} ${inrShort(p.a)} · ${bLabel} ${inrShort(p.b)}`;
  };
  show(points.length - 1);
  // Hover with a mouse, or drag a finger across the chart, to read any year.
  svg.onpointermove = (e) => {
    const r = svg.getBoundingClientRect();
    const sx = ((e.clientX - r.left) / r.width) * W;
    show(Math.max(0, Math.min(points.length - 1, Math.round(((sx - P.l) / (W - P.l - P.r)) * (points.length - 1)))));
  };
  svg.onpointerleave = () => show(points.length - 1);
}

/* ---------- Inputs ---------- */

function bind(root) {
  const slug = root.dataset.calc;
  const fn = compute[slug];
  if (!fn) return;
  const values = {};
  const fields = [...root.querySelectorAll("[data-range]")].map((wrap) => {
    const key = wrap.dataset.range;
    const text = wrap.querySelector("input[inputmode]");
    const range = wrap.querySelector("input[type=range]");
    const min = parseFloat(range.min), max = parseFloat(range.max);
    const paint = () => {
      const v = Math.min(max, Math.max(min, values[key] || 0));
      range.value = String(v);
      const p = Math.min(100, Math.max(0, ((values[key] - min) / (max - min)) * 100));
      range.style.background = `linear-gradient(90deg,var(--color-raspberry) ${p}%,var(--color-sand) ${p}%)`;
    };
    values[key] = parseFloat(text.value) || 0;
    text.addEventListener("input", () => {
      const n = parseFloat(text.value.replace(min < 0 ? /[^\d.-]/g : /[^\d.]/g, ""));
      values[key] = Number.isFinite(n) ? Math.min(max * 10, n) : 0;
      paint(); update();
    });
    text.addEventListener("blur", () => { text.value = String(values[key]); });
    range.addEventListener("input", () => {
      values[key] = parseFloat(range.value);
      text.value = String(values[key]);
      paint(); update();
    });
    return paint;
  });

  const out = (key) => root.querySelector(`[data-out="${key}"]`);
  const label = (key) => root.querySelector(`[data-out-label="${key}"]`);
  const fig = root.querySelector("[data-chart]");
  function update() {
    const r = fn(values);
    out("headline").textContent = r.headline;
    for (const [k, v] of Object.entries(r.rows)) { const el = out(k); if (el) el.textContent = v; }
    for (const [k, v] of Object.entries(r.labels ?? {})) { const el = label(k); if (el) el.textContent = v; }
    if (fig && r.points) drawChart(fig, r.points, r.xLabel);
  }
  fields.forEach((paint) => paint());
  update();
}

document.querySelectorAll("[data-calc]").forEach(bind);
