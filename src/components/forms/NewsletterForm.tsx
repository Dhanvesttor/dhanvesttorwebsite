"use client";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function NewsletterForm({ dark, className }: { dark?: boolean; className?: string }) {
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setState("busy");
    const res = await fetch("/api/newsletter", { method: "POST", body: new FormData(e.currentTarget) }).catch(() => null);
    setState(res?.ok ? "done" : "error");
  }
  if (state === "done") return <p className={cn("text-[14px]", dark ? "text-ivory/80" : "text-[#3f3d5c]")}>Thank you. The next letter is on its way.</p>;
  return (
    <form onSubmit={onSubmit} className={cn("flex max-w-md gap-2", className)}>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <label htmlFor="nl-email" className="sr-only">Email</label>
      <input id="nl-email" name="email" type="email" required placeholder="you@example.com" autoComplete="email"
        className={cn("min-w-0 flex-1 rounded-full border px-4 py-2.5 text-[14px] focus:outline-none focus-visible:ring-2 focus-visible:ring-raspberry/60", dark ? "border-ivory/20 bg-ivory/5 text-ivory placeholder:text-ivory/40" : "border-line bg-white text-ink")} />
      <button type="submit" disabled={state === "busy"} className={cn("rounded-full px-4 py-2.5 text-[13px] font-medium", dark ? "bg-raspberry text-ivory" : "bg-indigo text-ivory")}>{state === "busy" ? "…" : "Subscribe"}</button>
      {state === "error" && <p className="text-[12px] text-raspberry" role="alert">Try again.</p>}
    </form>
  );
}
