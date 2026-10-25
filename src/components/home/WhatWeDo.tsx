"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const items = [
  { key: "pms", title: "Portfolio Management", short: "PMS", href: "/pms", meta: "From ₹50 lakh", body: "A focused portfolio of 15 to 30 companies, held in your own name and run by a named fund manager under our FAITH framework. Monthly statements show every holding.", links: [["The FAITH Fund", "/pms/faith-fund"], ["Fees", "/pms/fees"], ["PMS vs mutual funds", "/pms/pms-vs-mutual-funds"]] },
  { key: "mf", title: "Mutual Funds", short: "MF", href: "/mutual-funds", meta: "From ₹5,000 a month", body: "Twenty partner fund houses, one curated shortlist. We build a goal-based plan, set up your SIPs and keep you invested through the cycles that tempt everyone to stop.", links: [["How we select", "/mutual-funds/how-we-select"], ["Partner fund houses", "/mutual-funds/partners"], ["SIP calculator", "/calculators/sip"]] },
  { key: "clcb", title: "Co-Learning & Community", short: "CLCB", href: "/clcb", meta: "Free, always", body: "Workshops, learning circles and masterclasses where no question is too basic. CLCB is where many of our clients started, and where many who never invest with us still learn.", links: [["Upcoming sessions", "/clcb/events"], ["Programmes", "/clcb/programmes"], ["Join", "/clcb/join"]] },
  { key: "ins", title: "Insurance", short: "Protect", href: "/insurance", meta: "Health, property, business", body: "Cover that matches your life, compared across insurers and explained in plain words, with someone beside you if you ever need to claim.", links: [["Health", "/insurance/health"], ["Property & motor", "/insurance/property-motor"], ["Business & group", "/insurance/business"]] },
  { key: "bonds", title: "Bonds & Fixed Income", short: "Income", href: "/bonds", meta: "Predictable income", body: "Government and corporate bonds, NCDs and rated corporate deposits for the part of your money that needs to arrive on a known date.", links: [["Bonds & NCDs", "/bonds/bonds-ncds"], ["Corporate FDs", "/bonds/corporate-fds"], ["Structured products", "/bonds/structured-products"]] },
] as const;

/** Five quiet panels. On desktop the hovered one widens; on mobile they stack as an accordion. */
export function WhatWeDo() {
  const [active, setActive] = useState(0);
  return (
    <>
      <div className="hidden h-[460px] gap-3 lg:flex" onMouseLeave={() => setActive(0)}>
        {items.map((it, i) => (
          <motion.div key={it.key} layout onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}
            animate={{ flex: active === i ? 3.2 : 1 }} transition={{ duration: 0.55, ease: [0.2, 0.7, 0.2, 1] }}
            className={cn("relative flex min-w-0 flex-col justify-between overflow-hidden rounded-2xl border p-7 transition-colors duration-500", active === i ? "border-indigo bg-indigo text-ivory" : "border-line bg-white text-ink")}>
            <div className="flex items-start justify-between gap-4">
              <span className={cn("font-display text-[1.1rem]", active === i ? "text-marigold" : "text-raspberry")}>{String(i + 1).padStart(2, "0")}</span>
              <span className={cn("text-[11px] uppercase tracking-[.16em]", active === i ? "text-ivory/60" : "text-mist")}>{it.short}</span>
            </div>
            <div>
              <h3 className={cn("text-[1.6rem] leading-tight", active !== i && "[writing-mode:vertical-rl] rotate-180 self-start text-[1.35rem]")}>{it.title}</h3>
              <AnimatePresence>
                {active === i && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
                    <p className="mt-2 text-[12px] uppercase tracking-[.16em] text-marigold">{it.meta}</p>
                    <p className="mt-4 max-w-[44ch] text-[15px] text-ivory/85">{it.body}</p>
                    <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-[13.5px]">
                      {it.links.map(([l, h]) => <li key={h}><Link href={h} className="underline decoration-ivory/30 underline-offset-4 hover:decoration-ivory">{l}</Link></li>)}
                    </ul>
                    <Link href={it.href} className="mt-7 inline-flex items-center gap-2 rounded-full bg-ivory px-5 py-2.5 text-[13px] font-medium text-indigo">Explore {it.short} →</Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
      <ul className="grid gap-3 lg:hidden">
        {items.map((it, i) => (
          <li key={it.key} className="rounded-2xl border border-line bg-white p-6">
            <div className="flex items-baseline justify-between gap-4"><span className="font-display text-raspberry">{String(i + 1).padStart(2, "0")}</span><span className="text-[11px] uppercase tracking-[.16em] text-mist">{it.meta}</span></div>
            <h3 className="mt-3 text-[1.6rem]">{it.title}</h3>
            <p className="mt-3 text-[15px] text-[#3f3d5c]">{it.body}</p>
            <Link href={it.href} className="mt-4 inline-block text-[14px] font-medium text-raspberry underline underline-offset-4">Explore {it.short} →</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
