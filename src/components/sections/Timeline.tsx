export function Timeline({ items, light }: { items: { when: string; title: string; text?: string }[]; light?: boolean }) {
  return (
    <ol className="relative grid gap-10 border-l border-line pl-8 sm:pl-10">
      {items.map((it, i) => (
        <li key={i} className="relative">
          <span aria-hidden className="absolute -left-[41px] top-1.5 h-3 w-3 rounded-full bg-raspberry ring-4 ring-ivory sm:-left-[49px]" />
          <p className={light ? "eyebrow text-marigold" : "eyebrow"}>{it.when}</p>
          <h3 className="mt-2 text-[1.5rem]">{it.title}</h3>
          {it.text && <p className={light ? "mt-2 max-w-[56ch] text-ivory/80" : "mt-2 max-w-[56ch] text-[#3f3d5c]"}>{it.text}</p>}
        </li>
      ))}
    </ol>
  );
}
