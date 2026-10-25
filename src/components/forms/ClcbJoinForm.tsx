"use client";
import { Field } from "./Field";
import { Button } from "@/components/ui/Button";
import { useFormSubmit } from "./useFormSubmit";

export function ClcbJoinForm() {
  const { busy, failed, onSubmit, err } = useFormSubmit("/api/clcb", "clcb");
  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl bg-white p-6 ring-1 ring-line sm:p-8" noValidate>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" name="name" required autoComplete="name" error={err("name")} />
        <Field label="City" name="city" required autoComplete="address-level2" error={err("city")} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email" name="email" type="email" required autoComplete="email" error={err("email")} />
        <Field label="Phone (WhatsApp)" name="phone" type="tel" required autoComplete="tel" error={err("phone")} />
      </div>
      <Field label="Where are you with money right now?" name="stage" as="select" required options={[{ value: "starting", label: "Starting from zero" }, { value: "some", label: "I invest a little, want to understand more" }, { value: "experienced", label: "Experienced, want a community" }]} error={err("stage")} />
      <Field label="What would you like to learn? (optional)" name="interests" as="textarea" rows={3} error={err("interests")} />
      <label className="flex items-start gap-3 text-[13px] text-[#3f3d5c]"><input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 accent-raspberry" /><span>Keep me posted about CLCB sessions. No sales calls.</span></label>
      {failed && <p className="text-[13px] text-raspberry" role="alert">Something went wrong. Please try again.</p>}
      <Button type="submit" disabled={busy} className="justify-self-start">{busy ? "Sending…" : "Join the community"}</Button>
    </form>
  );
}
