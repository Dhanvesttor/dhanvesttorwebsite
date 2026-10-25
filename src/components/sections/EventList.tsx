import { Button } from "@/components/ui/Button";
import { formatDateTime } from "@/lib/utils";
import type { Event } from "@/lib/cms/types";

export function EventList({ events, emptyText = "No sessions scheduled right now. Join the community and we will let you know first." }: { events: Event[]; emptyText?: string }) {
  if (!events.length) return <p className="rounded-2xl border border-dashed border-line p-8 text-center text-mist">{emptyText}</p>;
  return (
    <ul className="divide-y divide-line border-y border-line">
      {events.map((e) => {
        const d = new Date(e.date);
        return (
          <li key={e.slug} className="grid gap-5 py-7 md:grid-cols-[120px_1fr_auto] md:items-center">
            <div className="font-display leading-none">
              <span className="block text-[2.75rem] text-indigo">{d.toLocaleDateString("en-IN", { day: "2-digit", timeZone: "Asia/Kolkata" })}</span>
              <span className="mt-1 block text-[13px] uppercase tracking-[.16em] text-mist">{d.toLocaleDateString("en-IN", { month: "short", year: "numeric", timeZone: "Asia/Kolkata" })}</span>
            </div>
            <div>
              <p className="eyebrow">{e.mode} · {e.city}</p>
              <h3 className="mt-2 text-[1.5rem] leading-tight">{e.title}</h3>
              <p className="mt-2 max-w-[60ch] text-[14.5px] text-[#3f3d5c]">{e.summary}</p>
              <p className="mt-2 text-[12.5px] text-mist">{formatDateTime(e.date)} IST</p>
            </div>
            {!e.past && <Button href={e.registerUrl ?? "/clcb/join"} variant="primary" size="sm">Register</Button>}
          </li>
        );
      })}
    </ul>
  );
}
