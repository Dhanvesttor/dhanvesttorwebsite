import Link from "next/link";
import { cn } from "@/lib/utils";

export type ServiceItem = { title: string; blurb: string; href: string; meta?: string; index?: string };

/** Quiet panels that lift on hover. Used for "What we do" and for sub-section hubs. */
export function ServiceGrid({ items, columns = 3, className }: { items: ServiceItem[]; columns?: 2 | 3 | 4 | 5; className?: string }) {
  const cols = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4", 5: "md:grid-cols-2 lg:grid-cols-5" }[columns];
  return (
    <ul className={cn("grid gap-4", cols, className)}>
      {items.map((it, i) => (
        <li key={it.href}>
          <Link href={it.href} className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-white p-6 transition-[transform,box-shadow,border-color] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-1 hover:border-indigo/30 hover:shadow-[var(--shadow-soft)]">
            <div>
              <span className="font-display text-[1.1rem] text-raspberry">{it.index ?? String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 text-[1.5rem] leading-tight text-ink group-hover:text-indigo">{it.title}</h3>
              <p className="mt-3 text-[14.5px] text-[#3f3d5c]">{it.blurb}</p>
            </div>
            <div className="mt-6 flex items-center justify-between text-[12.5px] uppercase tracking-[.14em] text-mist">
              <span>{it.meta}</span><span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
