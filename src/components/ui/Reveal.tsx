"use client";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export function Reveal({ children, className, delay = 0, as = "div", y = 18 }: { children: React.ReactNode; className?: string; delay?: number; as?: "div" | "section" | "li" | "article"; y?: number }) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={cn(className)}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] }}
    >
      {children}
    </M>
  );
}
