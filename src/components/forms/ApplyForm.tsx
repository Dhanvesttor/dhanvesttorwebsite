"use client";
import { Field } from "./Field";
import { Button } from "@/components/ui/Button";
import { useFormSubmit } from "./useFormSubmit";

export function ApplyForm({ role, department }: { role?: string; department?: string }) {
  const { busy, failed, onSubmit, err } = useFormSubmit("/api/apply", "apply");
  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-2xl bg-white p-6 ring-1 ring-line sm:p-8" noValidate encType="multipart/form-data">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Your name" name="name" required autoComplete="name" error={err("name")} />
        <Field label="Phone" name="phone" type="tel" required autoComplete="tel" error={err("phone")} />
      </div>
      <Field label="Email" name="email" type="email" required autoComplete="email" error={err("email")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Role you're applying for" name="role" required defaultValue={role} error={err("role")} />
        <Field label="Department" name="department" as="select" defaultValue={department ?? ""} options={["", "Sales", "Finance", "Marketing", "Accounts", "HR & Admin", "CLCB", "Compliance", "Other"].map((d) => ({ value: d, label: d || "Choose one" }))} />
      </div>
      <Field label="LinkedIn (optional)" name="linkedin" type="url" placeholder="https://linkedin.com/in/…" error={err("linkedin")} />
      <Field label="CV (PDF or Word, under 5 MB)" name="cv" type="file" accept=".pdf,.doc,.docx" error={err("cv")} />
      <Field label="A few lines about why Dhanvesttor" name="note" as="textarea" rows={4} error={err("note")} />
      <label className="flex items-start gap-3 text-[13px] text-[#3f3d5c]"><input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 accent-raspberry" /><span>I agree to Dhanvesttor storing my application for recruitment purposes.</span></label>
      {failed && <p className="text-[13px] text-raspberry" role="alert">Something went wrong. Please email your CV to ho@dhanvesttor.com.</p>}
      <Button type="submit" disabled={busy} className="justify-self-start">{busy ? "Sending…" : "Send application"}</Button>
    </form>
  );
}
