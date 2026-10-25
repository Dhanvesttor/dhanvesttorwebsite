import { cn } from "@/lib/utils";

export function Accordion({ items, className }: { items: { title: string; body: React.ReactNode }[]; className?: string }) {
  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((it, i) => (
        <details key={i} className="group py-5">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-[1.35rem] leading-snug text-ink [&::-webkit-details-marker]:hidden">
            <span>{it.title}</span>
            <span aria-hidden className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-raspberry transition-transform duration-300 group-open:rotate-45">+</span>
          </summary>
          <div className="mt-3 max-w-[68ch] text-[1rem] text-[#3f3d5c]">{it.body}</div>
        </details>
      ))}
    </div>
  );
}
