import { cn } from "@/lib/utils";
export function Prose({ html, children, className }: { html?: string; children?: React.ReactNode; className?: string }) {
  if (html) return <div className={cn("prose-dv", className)} dangerouslySetInnerHTML={{ __html: html }} />;
  return <div className={cn("prose-dv", className)}>{children}</div>;
}
