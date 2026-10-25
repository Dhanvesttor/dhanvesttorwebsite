import { cn } from "@/lib/utils";
export function Eyebrow({ children, className, light }: { children: React.ReactNode; className?: string; light?: boolean }) {
  return <p className={cn("eyebrow", light && "text-marigold", className)}>{children}</p>;
}
