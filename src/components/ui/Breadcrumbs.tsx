import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export type Crumb = { name: string; path: string };

export function Breadcrumbs({ crumbs, light, className }: { crumbs: Crumb[]; light?: boolean; className?: string }) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <nav aria-label="Breadcrumb" className={cn("text-[12px] tracking-wide", light ? "text-ivory/60" : "text-mist", className)}>
      <JsonLd data={breadcrumbJsonLd(all)} />
      <ol className="flex flex-wrap items-center gap-2">
        {all.map((c, i) => (
          <li key={c.path} className="flex items-center gap-2">
            {i < all.length - 1 ? <Link href={c.path} className="hover:text-raspberry">{c.name}</Link> : <span aria-current="page">{c.name}</span>}
            {i < all.length - 1 && <span aria-hidden>/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
