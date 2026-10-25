"use client";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

export function Tabs({ tabs, className }: { tabs: { label: string; content: React.ReactNode }[]; className?: string }) {
  const [i, setI] = useState(0);
  const id = useId();
  return (
    <div className={className}>
      <div role="tablist" className="flex flex-wrap gap-2 border-b border-line">
        {tabs.map((t, k) => (
          <button key={k} role="tab" id={`${id}-t${k}`} aria-selected={i === k} aria-controls={`${id}-p${k}`} onClick={() => setI(k)}
            className={cn("-mb-px border-b-2 px-4 py-3 text-sm font-medium transition-colors", i === k ? "border-raspberry text-ink" : "border-transparent text-mist hover:text-ink")}>
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t, k) => (
        <div key={k} role="tabpanel" id={`${id}-p${k}`} aria-labelledby={`${id}-t${k}`} hidden={i !== k} className="pt-8">{t.content}</div>
      ))}
    </div>
  );
}
