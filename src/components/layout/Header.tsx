"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { nav } from "@/content/nav";
import { site } from "@/content/site";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { cn } from "@/lib/utils";

const left = nav.slice(0, 4);
const right = nav.slice(4);

export function Header() {
  const [open, setOpen] = useState<string | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => { setOpen(null); setMobile(false); }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const show = (label: string) => { if (timer.current) clearTimeout(timer.current); setOpen(label); };
  const hide = () => { timer.current = setTimeout(() => setOpen(null), 120); };
  const group = nav.find((g) => g.label === open);

  const Item = ({ g }: { g: (typeof nav)[number] }) => {
    const active = pathname === g.href || (g.href !== "/" && pathname.startsWith(g.href));
    return (
      <li onMouseEnter={() => g.children && show(g.label)} onMouseLeave={hide} className="relative">
        <Link href={g.href} aria-expanded={g.children ? open === g.label : undefined} onFocus={() => g.children && show(g.label)}
          className={cn("relative inline-flex items-center gap-1 py-2 text-[14px] font-medium text-ink/85 transition-colors hover:text-ink", active && "text-ink")}>
          {g.label}
          {active && <span aria-hidden className="absolute -bottom-0.5 left-0 h-[2px] w-5 rounded bg-raspberry" />}
        </Link>
      </li>
    );
  };

  return (
    <header className={cn("sticky top-0 z-50 border-b transition-[background-color,border-color,box-shadow] duration-300", scrolled ? "border-line bg-ivory/90 shadow-[0_10px_30px_-20px_rgba(29,27,58,.3)] backdrop-blur-md" : "border-transparent bg-ivory")}
      onMouseLeave={hide}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-indigo focus:px-4 focus:py-2 focus:text-ivory">Skip to content</a>
      <div className="mx-auto grid max-w-[1400px] grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:grid-cols-[1fr_auto_1fr] lg:px-8">
        {/* Mobile: menu button | logo | login */}
        <button type="button" onClick={() => setMobile(true)} aria-label="Open menu" className="grid h-10 w-10 place-items-center rounded-full border border-line lg:hidden">
          <span className="block h-[1.5px] w-4 bg-ink" /><span className="mt-1 block h-[1.5px] w-4 bg-ink" />
        </button>
        <ul className="hidden items-center gap-7 lg:flex">{left.map((g) => <Item key={g.label} g={g} />)}</ul>
        <div className="justify-self-center"><span className="lg:hidden"><Logo variant="compact" priority /></span><span className="hidden lg:inline-flex"><Logo variant="full" priority /></span></div>
        <div className="flex items-center justify-end gap-7">
          <ul className="hidden items-center gap-7 lg:flex">{right.map((g) => <Item key={g.label} g={g} />)}</ul>
          <a href={site.loginUrl} target="_blank" rel="noopener" className="inline-flex items-center gap-1.5 rounded-full border border-line px-3.5 py-2 text-[13px] font-medium text-ink transition-colors hover:border-ink/40 sm:px-4">
            <span className="hidden sm:inline">Investor login</span><span className="sm:hidden">Login</span><span aria-hidden>↗</span>
          </a>
        </div>
      </div>

      {/* Mega menu */}
      <AnimatePresence>
        {group?.children && (
          <motion.div key={group.label} onMouseEnter={() => show(group.label)} onMouseLeave={hide}
            initial={reduce ? false : { opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
            className="absolute inset-x-0 top-full hidden border-b border-line bg-ivory shadow-[0_30px_60px_-30px_rgba(29,27,58,.35)] lg:block">
            <div className="mx-auto grid max-w-[1180px] grid-cols-[1fr_2.4fr] gap-10 px-8 py-9">
              <div>
                <p className="eyebrow mb-3">{group.label}</p>
                <Link href={group.href} className="font-display text-[1.75rem] leading-tight text-ink hover:text-indigo">{group.children[0].label}</Link>
                <p className="mt-2 max-w-[30ch] text-[14px] text-mist">{group.children[0].blurb}</p>
                <Link href={group.href} className="mt-5 inline-block text-[13px] font-medium text-raspberry underline-offset-4 hover:underline">Overview →</Link>
              </div>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-1 xl:grid-cols-3">
                {group.children.slice(1).map((c) => (
                  <li key={c.href}>
                    <Link href={c.href} className="group block rounded-lg px-3 py-2.5 transition-colors hover:bg-paper">
                      <span className="block text-[14px] font-medium text-ink group-hover:text-indigo">{c.label}</span>
                      <span className="block text-[12.5px] text-mist">{c.blurb}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <MobileMenu open={mobile} onClose={() => setMobile(false)} />
    </header>
  );
}
