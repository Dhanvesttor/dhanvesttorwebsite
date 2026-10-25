import { cn } from "@/lib/utils";
export function StepList({ steps, light, columns = 4 }: { steps: { title: string; text: string }[]; light?: boolean; columns?: 3 | 4 | 5 }) {
  const cols = { 3: "md:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4", 5: "md:grid-cols-3 lg:grid-cols-5" }[columns];
  return (
    <ol className={cn("grid gap-6", cols)}>
      {steps.map((s, i) => (
        <li key={i} className={cn("border-t pt-5", light ? "border-ivory/20" : "border-line")}>
          <span className="font-display text-[1.25rem] text-raspberry">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="mt-3 text-[1.35rem] leading-tight">{s.title}</h3>
          <p className={cn("mt-2 text-[14.5px]", light ? "text-ivory/80" : "text-[#3f3d5c]")}>{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
