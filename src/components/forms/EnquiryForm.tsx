"use client";
import { Field } from "./Field";
import { Button } from "@/components/ui/Button";
import { useFormSubmit } from "./useFormSubmit";
import { pathLabel } from "@/lib/forms";
import { cn } from "@/lib/utils";

export type EnquiryPath = "pms" | "mf" | "clcb" | "insurance" | "bonds" | "other";

export function EnquiryForm({ paths = ["pms", "mf", "clcb"], defaultPath, light, className }: { paths?: EnquiryPath[]; defaultPath?: EnquiryPath; light?: boolean; className?: string }) {
  const { busy, failed, onSubmit, err } = useFormSubmit("/api/enquiry", "enquiry");
  return (
    <form onSubmit={onSubmit} className={cn("grid gap-4 rounded-2xl p-6 sm:p-8", light ? "bg-indigo-deep/60 ring-1 ring-ivory/10" : "bg-white ring-1 ring-line", className)} noValidate>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" name="name" required autoComplete="name" light={light} error={err("name")} />
        <Field label="Phone" name="phone" type="tel" required autoComplete="tel" light={light} error={err("phone")} />
      </div>
      <Field label="Email" name="email" type="email" required autoComplete="email" light={light} error={err("email")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="I'm interested in" name="path" as="select" required light={light} defaultValue={defaultPath ?? paths[0]} options={[...paths, "other"].map((p) => ({ value: p, label: pathLabel[p] }))} error={err("path")} />
        <Field label="Approximate amount (optional)" name="amount" placeholder="e.g. ₹10,000 a month or ₹1 crore" light={light} error={err("amount")} />
      </div>
      <Field label="Anything you'd like us to know" name="message" as="textarea" rows={3} light={light} error={err("message")} />
      <Field label="How did you find us?" name="source" as="select" light={light} options={[{ value: "", label: "Choose one" }, { value: "search", label: "Search engine" }, { value: "social", label: "Social media" }, { value: "word", label: "Word of mouth" }, { value: "clcb", label: "A CLCB session" }, { value: "press", label: "News or press" }, { value: "other", label: "Other" }]} />
      <label className={cn("flex items-start gap-3 text-[13px]", light ? "text-ivory/80" : "text-[#3f3d5c]")}>
        <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 accent-raspberry" />
        <span>I agree to be contacted by Dhanvesttor about my enquiry. We never share your details.</span>
      </label>
      {err("consent") && <p className="text-[12px] text-raspberry">{err("consent")}</p>}
      {failed && <p className="text-[13px] text-raspberry" role="alert">Something went wrong. Please try again or email ho@dhanvesttor.com.</p>}
      <Button type="submit" variant={light ? "raspberry" : "primary"} disabled={busy} className="justify-self-start">{busy ? "Sending…" : "Send enquiry"}</Button>
    </form>
  );
}
