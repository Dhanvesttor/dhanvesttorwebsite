import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import type { TeamMember } from "@/content/team";

export function TeamGrid({ members, columns = 3 }: { members: TeamMember[]; columns?: 2 | 3 | 4 }) {
  const cols = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];
  return (
    <ul className={`grid gap-8 ${cols}`}>
      {members.map((m) => (
        <li key={m.slug}>
          <Link href={`/about/team/${m.slug}`} className="group block">
            <ImagePlaceholder label={`${m.name}, portrait`} src={m.photo} alt={m.name} ratio="4/5" className="transition-transform duration-500 group-hover:-translate-y-1" />
            <h3 className="mt-5 text-[1.4rem] leading-tight group-hover:text-indigo">{m.name}</h3>
            <p className="mt-1 text-[13px] uppercase tracking-[.14em] text-raspberry">{m.role}</p>
            <p className="mt-3 text-[14.5px] text-[#3f3d5c]">{m.short}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
