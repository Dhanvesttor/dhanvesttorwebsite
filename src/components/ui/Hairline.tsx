import { cn } from "@/lib/utils";
export function Hairline({ className }: { className?: string }) {
  return <div aria-hidden className={cn("hairline", className)} />;
}
