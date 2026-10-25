import Link from "next/link";
import { cn } from "@/lib/utils";

export function Card({ children, className, href, tone = "white" }: { children: React.ReactNode; className?: string; href?: string; tone?: "white" | "sand" | "indigo" | "transparent" }) {
  const t = { white: "bg-white border border-line", sand: "bg-sand/60 border border-line", indigo: "bg-indigo text-ivory", transparent: "border border-line" }[tone];
  const base = cn("rounded-2xl p-6 sm:p-7 transition-[transform,box-shadow] duration-300 ease-[var(--ease-out-soft)]", t, href && "hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]", className);
  if (href) return <Link href={href} className={cn(base, "block")}>{children}</Link>;
  return <div className={base}>{children}</div>;
}
