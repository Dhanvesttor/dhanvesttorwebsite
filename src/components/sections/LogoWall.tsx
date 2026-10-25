import type { Amc } from "@/content/amcs";

/** Partner fund houses as quiet type tiles (logo files can replace the names later). */
export function LogoWall({ items, compact }: { items: Amc[]; compact?: boolean }) {
  return (
    <ul className={compact ? "grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5" : "grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"}>
      {items.map((a) => (
        <li key={a.slug} id={a.slug} className="rounded-xl border border-line bg-white p-5">
          <p className="font-display text-[1.1rem] leading-tight text-indigo">{a.name}</p>
          {!compact && <p className="mt-2 text-[13.5px] text-[#3f3d5c]">{a.blurb}</p>}
        </li>
      ))}
    </ul>
  );
}
