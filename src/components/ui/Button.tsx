import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "ghost" | "light" | "raspberry" | "link";
const styles: Record<Variant, string> = {
  primary: "bg-indigo text-ivory shadow-[0_12px_28px_-12px_rgba(46,42,110,.6)] hover:bg-indigo-deep",
  raspberry: "bg-raspberry text-ivory hover:bg-raspberry-deep",
  ghost: "border border-line text-ink hover:border-ink/40 bg-transparent",
  light: "border border-ivory/40 text-ivory hover:bg-ivory/10 bg-transparent",
  link: "text-raspberry underline underline-offset-4 px-0 py-0 hover:text-raspberry-deep",
};

export function Button({
  href, children, variant = "primary", className, external, size = "md", ...rest
}: { href?: string; children: React.ReactNode; variant?: Variant; className?: string; external?: boolean; size?: "sm" | "md" | "lg" } & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const base = cn(
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-[transform,background-color,box-shadow] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 focus-visible:-translate-y-0.5",
    variant !== "link" && (size === "sm" ? "px-4 py-2 text-[13px]" : size === "lg" ? "px-7 py-4 text-[15px]" : "px-6 py-3.5 text-sm"),
    styles[variant], className,
  );
  if (href) {
    if (external) return <a href={href} target="_blank" rel="noopener" className={base}>{children}<span aria-hidden>↗</span></a>;
    return <Link href={href} className={base}>{children}</Link>;
  }
  return <button className={base} {...rest}>{children}</button>;
}
