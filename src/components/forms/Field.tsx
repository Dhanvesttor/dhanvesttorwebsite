import { cn } from "@/lib/utils";

const base = "w-full rounded-xl border bg-white/90 px-4 py-3 text-[15px] text-ink placeholder:text-mist/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-raspberry/60";

export function Field({ label, name, type = "text", required, placeholder, light, error, as, options, rows = 4, autoComplete, hint, defaultValue, accept }: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string; light?: boolean; error?: string;
  as?: "textarea" | "select"; options?: { value: string; label: string }[]; rows?: number; autoComplete?: string; hint?: string; defaultValue?: string; accept?: string;
}) {
  const id = `f-${name}`;
  const cls = cn(base, light ? "border-ivory/20 bg-white" : "border-line", error && "border-raspberry");
  return (
    <div>
      <label htmlFor={id} className={cn("mb-1.5 block text-[13px] font-medium", light ? "text-ivory/90" : "text-ink")}>{label}{required && <span className="text-raspberry"> *</span>}</label>
      {as === "textarea" ? <textarea id={id} name={name} rows={rows} required={required} placeholder={placeholder} className={cls} defaultValue={defaultValue} />
        : as === "select" ? <select id={id} name={name} required={required} className={cls} defaultValue={defaultValue}>{options?.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}</select>
        : <input id={id} name={name} type={type} required={required} placeholder={placeholder} className={cls} autoComplete={autoComplete} defaultValue={defaultValue} accept={accept} />}
      {hint && !error && <p className={cn("mt-1 text-[12px]", light ? "text-ivory/60" : "text-mist")}>{hint}</p>}
      {error && <p className="mt-1 text-[12px] text-raspberry" role="alert">{error}</p>}
    </div>
  );
}
