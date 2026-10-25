"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { pms } from "@/content/pms";
import { cn } from "@/lib/utils";

/** The five FAITH letters as large serif type; hover or tap reveals each principle. */
export function FaithLetters({ light = true }: { light?: boolean }) {
  const [i, setI] = useState(0);
  const f = pms.faith[i];
  return (
    <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-end">
      <div role="tablist" aria-label="FAITH principles" className="flex justify-between gap-2">
        {pms.faith.map((p, k) => (
          <button key={p.letter} role="tab" aria-selected={i === k} onMouseEnter={() => setI(k)} onFocus={() => setI(k)} onClick={() => setI(k)}
            className={cn("font-display text-[5rem] font-light leading-none transition-colors duration-300 sm:text-[8rem] lg:text-[10rem]", i === k ? (light ? "text-marigold" : "text-raspberry") : light ? "text-ivory/25 hover:text-ivory/60" : "text-indigo/20 hover:text-indigo/50")}>
            {p.letter}
          </button>
        ))}
      </div>
      <motion.div key={f.letter} role="tabpanel" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <p className={cn("eyebrow", light && "text-marigold")}>{f.letter} · {i + 1} of 5</p>
        <h3 className="mt-3 text-[2rem]">{f.title}</h3>
        <p className={cn("mt-3 text-[1.0625rem]", light ? "text-ivory/80" : "text-[#3f3d5c]")}>{f.text}</p>
      </motion.div>
    </div>
  );
}
