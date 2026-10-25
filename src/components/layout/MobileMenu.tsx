"use client";
import Link from "next/link";
import { useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav } from "@/content/nav";
import { site } from "@/content/site";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[70] lg:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button aria-label="Close menu" onClick={onClose} className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />
          <motion.aside role="dialog" aria-modal="true" aria-label="Site menu"
            initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }} transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
            className="absolute inset-y-0 left-0 flex w-[min(92vw,420px)] flex-col overflow-y-auto bg-ivory px-6 pb-10 pt-5 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <span className="eyebrow">Menu</span>
              <button onClick={onClose} className="grid h-10 w-10 place-items-center rounded-full border border-line text-xl leading-none" aria-label="Close menu">×</button>
            </div>
            <nav className="divide-y divide-line">
              {nav.map((g) => (
                <div key={g.label} className="py-4">
                  <Link href={g.href} onClick={onClose} className="font-display text-[1.6rem] text-ink">{g.label}</Link>
                  {g.children && (
                    <ul className="mt-2 grid gap-1.5 pl-1">
                      {g.children.slice(1).map((c) => (
                        <li key={c.href}><Link href={c.href} onClick={onClose} className="block py-1 text-[15px] text-[#3f3d5c]">{c.label}</Link></li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </nav>
            <div className="mt-8 grid gap-3">
              <a href={site.loginUrl} target="_blank" rel="noopener" className="rounded-full bg-indigo px-5 py-3.5 text-center text-sm font-medium text-ivory">Investor login ↗</a>
              <a href={site.pmsLoginUrl} target="_blank" rel="noopener" className="rounded-full border border-line px-5 py-3.5 text-center text-sm font-medium">PMS login (Kotak) ↗</a>
              <Link href="/contact" onClick={onClose} className="text-center text-sm text-raspberry underline underline-offset-4">Start a conversation</Link>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
