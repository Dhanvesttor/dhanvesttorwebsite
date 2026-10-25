export type MfCategory = {
  slug: string; name: string; title: string; seoTitle: string; description: string; lede: string;
  horizon: string; risk: "Low" | "Low to moderate" | "Moderate" | "Moderately high" | "High" | "Very high"; suits: string;
  types: { name: string; text: string }[]; consider: string[]; tax: string; calc?: { label: string; href: string };
  faqs: { q: string; a: string }[];
};

export const mfCategories: MfCategory[] = [
  {
    slug: "equity", name: "Equity funds", title: "Equity funds: owning a slice of India's businesses", seoTitle: "Equity Mutual Funds: Large, Mid, Small & Flexi Cap", description: "Equity mutual funds explained: large cap, mid cap, small cap, flexi cap, multi cap, sectoral and focused funds, with horizons, risks and taxation.",
    lede: "Equity funds invest mainly in shares. Over long periods they have been the most reliable way to grow wealth faster than inflation, and the most uncomfortable to hold in a bad year.",
    horizon: "7 years or more", risk: "Very high", suits: "Long-term goals: retirement, a child's education, financial independence.",
    types: [
      { name: "Large cap", text: "India's 100 largest companies. Steadier, lower expected returns than smaller companies." },
      { name: "Mid cap", text: "Companies ranked 101 to 250. More growth potential and more volatility." },
      { name: "Small cap", text: "Companies beyond the top 250. The highest potential and the sharpest falls; hold 10 years or more." },
      { name: "Flexi cap", text: "The manager moves freely across sizes. A sensible core holding for most investors." },
      { name: "Multi cap", text: "At least 25% each in large, mid and small caps, by rule." },
      { name: "Focused", text: "At most 30 stocks. Higher conviction, higher dispersion of outcomes." },
      { name: "Sectoral & thematic", text: "One sector or theme. A tactical bet, not a core holding." },
      { name: "Value & contra", text: "Buys out-of-favour companies trading below estimated value." },
    ],
    consider: ["Hold at least five to seven years; ten for small caps.", "Two or three equity funds across styles are usually enough.", "Expect at least one year in five to be negative.", "Compare against the right benchmark, not against last year's winner."],
    tax: "Gains on units held more than 12 months are long-term capital gains, taxed above the annual exemption. Gains within 12 months are short-term and taxed at a higher rate. Rules change; we keep clients informed.",
    calc: { label: "SIP calculator", href: "/calculators/sip" },
    faqs: [{ q: "How many equity funds should I own?", a: "For most people, two to four across different styles. More funds usually means more overlap, not more diversification." }, { q: "Are small caps worth it?", a: "For a small portion of a long-term portfolio, yes, if you can hold through falls of 40% or more without selling." }],
  },
  {
    slug: "debt", name: "Debt funds", title: "Debt funds: steadier money for nearer goals", seoTitle: "Debt Mutual Funds: Liquid, Short Duration, Corporate Bond & Gilt", description: "Debt mutual funds explained: liquid, ultra-short, short duration, corporate bond, banking & PSU, gilt and dynamic bond funds, with risks and taxation.",
    lede: "Debt funds lend money to governments and companies and earn interest. They are for money you need in the next few years, for emergencies, and for the steady part of a long-term portfolio.",
    horizon: "A day to 3 years", risk: "Low to moderate", suits: "Emergency funds, near-term goals, parking money before investing in equity.",
    types: [
      { name: "Liquid & overnight", text: "Very short-term government and corporate paper. For emergency money you might need tomorrow." },
      { name: "Ultra-short & low duration", text: "A few months to a year. Slightly higher yield than liquid funds." },
      { name: "Short duration", text: "One to three years. A good home for goals two to three years away." },
      { name: "Corporate bond", text: "At least 80% in the highest-rated corporate bonds." },
      { name: "Banking & PSU", text: "Lends to banks and public-sector companies. High quality, modest yield." },
      { name: "Gilt", text: "Government securities only. No credit risk, but sensitive to interest-rate moves." },
      { name: "Dynamic bond", text: "The manager changes duration with the rate cycle." },
    ],
    consider: ["Match the fund's duration to when you need the money.", "Credit quality matters more than an extra 0.5% of yield.", "Longer-duration funds can fall when interest rates rise.", "Debt funds are not fixed deposits; returns are not guaranteed."],
    tax: "Gains on debt funds are generally taxed at your income slab rate, regardless of holding period, under current rules.",
    calc: { label: "Goal planner", href: "/calculators/goal" },
    faqs: [{ q: "Are debt funds safe?", a: "Safer than equity, not risk-free. The main risks are credit (a borrower defaults) and interest rates (bond prices fall when rates rise). We favour high-quality funds." }, { q: "Debt fund or FD?", a: "Debt funds offer liquidity and potentially better post-tax returns in some situations; FDs offer certainty. Many people use both." }],
  },
  {
    slug: "hybrid", name: "Hybrid funds", title: "Hybrid funds: a middle path", seoTitle: "Hybrid Mutual Funds: Balanced Advantage, Aggressive, Multi-Asset", description: "Hybrid mutual funds explained: aggressive hybrid, balanced advantage, conservative hybrid, multi-asset, arbitrage and equity savings funds.",
    lede: "Hybrid funds hold equity and debt, and sometimes gold, in one fund. They rebalance for you, which makes them a calm first step into markets and a good home for medium-term goals.",
    horizon: "3 to 7 years", risk: "Moderate", suits: "First-time investors, medium-term goals, people who want a smoother ride.",
    types: [
      { name: "Aggressive hybrid", text: "65% to 80% equity. Growth with a cushion." },
      { name: "Balanced advantage", text: "Moves between equity and debt based on valuations. Automatically buys low and sells high." },
      { name: "Conservative hybrid", text: "Mostly debt, with 10% to 25% equity for a little growth." },
      { name: "Multi-asset", text: "At least three asset classes, often including gold." },
      { name: "Equity savings", text: "Equity, arbitrage and debt. Low volatility with equity-style taxation." },
      { name: "Arbitrage", text: "Earns the gap between cash and futures prices. Close to debt-like returns." },
    ],
    consider: ["Check how much equity the fund can hold at its maximum.", "Balanced advantage funds behave very differently from one house to another.", "Hybrid funds can still fall; they fall less."],
    tax: "Taxation depends on the fund's equity share. Funds with 65% or more in equity are taxed like equity funds.",
    calc: { label: "Lumpsum calculator", href: "/calculators/lumpsum" },
    faqs: [{ q: "Is a hybrid fund good for a beginner?", a: "Often, yes. It gives exposure to equity with less volatility, and the fund rebalances for you." }],
  },
  {
    slug: "index-etf", name: "Index funds & ETFs", title: "Index funds & ETFs: the market, at low cost", seoTitle: "Index Funds & ETFs in India: Nifty 50, Sensex, Gold ETF", description: "Index funds and exchange-traded funds explained: Nifty 50, Next 50, Sensex, gold and international index funds, costs, tracking error and when to use them.",
    lede: "Index funds and ETFs copy an index rather than trying to beat it. They are cheap, transparent and hard to argue with as part of a long-term portfolio.",
    horizon: "7 years or more", risk: "Very high", suits: "Low-cost core equity exposure, investors who prefer simplicity.",
    types: [
      { name: "Nifty 50 / Sensex", text: "India's largest companies in one fund." },
      { name: "Nifty Next 50", text: "The 50 companies just below the Nifty 50. Higher growth, higher volatility." },
      { name: "Mid & small cap indices", text: "Passive exposure to smaller companies." },
      { name: "Gold ETFs & funds", text: "Gold without lockers or making charges." },
      { name: "International index", text: "US and global markets, subject to RBI limits." },
    ],
    consider: ["Compare tracking error, not just expense ratio.", "ETFs need a demat account and trade like shares; index funds do not.", "Passive does not mean safe; you get all of the market's falls too."],
    tax: "Equity index funds and ETFs are taxed like equity funds. Gold and international funds follow different rules.",
    faqs: [{ q: "Active or passive?", a: "In large caps, many active funds struggle to beat the index after fees, so a Nifty 50 index fund is a sensible core. In mid and small caps, good active managers have more room to add value." }],
  },
  {
    slug: "elss", name: "ELSS", title: "ELSS: tax saving with a three-year lock", seoTitle: "ELSS Tax Saving Mutual Funds: Section 80C", description: "ELSS (equity-linked savings scheme) funds explained: Section 80C deduction, three-year lock-in, how they compare with PPF and tax-saving FDs.",
    lede: "Equity-linked savings schemes are equity funds that qualify for a tax deduction under the old tax regime, with the shortest lock-in of any 80C option.",
    horizon: "3 years minimum, 7 years ideal", risk: "Very high", suits: "Taxpayers on the old regime who want equity growth with their deduction.",
    types: [{ name: "How it works", text: "Each investment, including each SIP instalment, is locked for three years from its own date." }, { name: "The deduction", text: "Up to ₹1.5 lakh a year under Section 80C, under the old tax regime only." }],
    consider: ["Check whether you are on the old or new tax regime before investing for the deduction.", "A SIP in ELSS means the last instalment unlocks three years after it is made.", "Treat ELSS as a long-term equity fund that happens to save tax."],
    tax: "Gains on redemption are taxed as long-term capital gains like other equity funds.",
    calc: { label: "SIP calculator", href: "/calculators/sip" },
    faqs: [{ q: "ELSS or PPF?", a: "PPF is guaranteed and tax-free, with a 15-year lock-in. ELSS is market-linked with a 3-year lock-in and higher expected long-term returns. Many people use both." }],
  },
  {
    slug: "solution-oriented", name: "Solution-oriented funds", title: "Solution-oriented funds: retirement and children's goals", seoTitle: "Retirement & Children's Mutual Funds (Solution-Oriented)", description: "Solution-oriented mutual funds for retirement and children's education explained: five-year lock-in, asset mix, and when they make sense.",
    lede: "Retirement and children's funds come with a five-year lock-in or until the goal age. The lock-in is the feature: it protects long-term money from short-term decisions.",
    horizon: "5 years or more", risk: "Moderately high", suits: "Investors who want a built-in commitment device for one specific goal.",
    types: [{ name: "Retirement funds", text: "Locked until 60 or five years, whichever is earlier. Equity, hybrid or debt-oriented variants." }, { name: "Children's funds", text: "Locked until the child turns 18 or five years, whichever is earlier." }],
    consider: ["A diversified equity SIP with a written plan can do the same job without the lock-in.", "Look at the underlying asset mix, not the label."],
    tax: "Taxed according to the fund's equity share, like other mutual funds.",
    calc: { label: "Retirement calculator", href: "/calculators/retirement" },
    faqs: [{ q: "Do I need a special fund for my child's education?", a: "No. What you need is a plan: a target, a date, and a SIP. A children's fund adds a lock-in, which some families find helpful." }],
  },
];

export const getMfCategory = (slug: string) => mfCategories.find((c) => c.slug === slug)!;
