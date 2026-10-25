"use client";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { Hairline } from "@/components/ui/Hairline";
import { photos } from "@/content/images";
import { site } from "@/content/site";

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "12%"]);
  const rise = (d: number) => (reduce ? {} : { initial: { opacity: 0, y: 22 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: d, ease: [0.2, 0.7, 0.2, 1] as const } });

  return (
    <section ref={ref} className="relative grid min-h-[calc(100svh-84px)] overflow-hidden border-b border-line lg:grid-cols-[1.05fr_.95fr]">
      <div className="relative z-10 flex flex-col justify-center gap-7 px-4 pb-14 pt-12 sm:px-8 lg:py-20 lg:pl-[max(2rem,calc((100vw-1180px)/2+2rem))] lg:pr-14">
        <motion.div {...rise(0)}><Hairline /></motion.div>
        <motion.h1 {...rise(0.05)} className="max-w-[13ch] text-[3.1rem] leading-[0.98] sm:text-[4.25rem] lg:text-[5rem]">
          Wealth you <em>understand.</em><br />Wealth you own.
        </motion.h1>
        <motion.p {...rise(0.18)} className="max-w-[44ch] text-[1.125rem] text-[#3f3d5c] sm:text-[1.25rem]">
          A SEBI-registered portfolio manager that explains before it invests. Personal portfolios, curated mutual funds and a community that teaches the language of money.
        </motion.p>
        <motion.div {...rise(0.3)} className="flex flex-wrap gap-3">
          <Button href="/contact" size="lg">Start a conversation</Button>
          <Button href="/pms/faith-fund" variant="ghost" size="lg">Explore the FAITH strategy</Button>
        </motion.div>
        <motion.p {...rise(0.42)} className="mt-4 text-[11px] uppercase tracking-[.16em] text-mist">SEBI Registered Portfolio Manager · {site.sebiReg} · Kolkata</motion.p>
      </div>
      <div className="relative min-h-[420px] overflow-hidden bg-sand lg:min-h-0">
        <motion.div style={{ y: imgY }} className="absolute inset-0 -bottom-[12%]">
          <Image src={photos.hero.src!} alt={photos.hero.alt} fill priority sizes="(min-width:1024px) 48vw, 100vw" className="object-cover object-[60%_30%]" />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-[linear-gradient(90deg,rgba(251,247,240,.55),transparent_35%)] max-lg:bg-[linear-gradient(180deg,rgba(251,247,240,.4),transparent_30%)]" />
        <div aria-hidden className="absolute bottom-0 left-0 h-24 w-24 rounded-tr-[48px] bg-ivory max-lg:hidden" />
      </div>
    </section>
  );
}
