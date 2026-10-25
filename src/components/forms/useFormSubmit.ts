"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function useFormSubmit(endpoint: string, thankYouFor: string) {
  const [busy, setBusy] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [failed, setFailed] = useState(false);
  const router = useRouter();
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true); setFailed(false); setErrors({});
    try {
      const res = await fetch(endpoint, { method: "POST", body: new FormData(e.currentTarget) });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json.ok) { router.push(`/thank-you?for=${thankYouFor}`); return; }
      setErrors(json.errors ?? {}); if (!json.errors) setFailed(true);
    } catch { setFailed(true); } finally { setBusy(false); }
  }
  return { busy, errors, failed, onSubmit, err: (k: string) => errors[k]?.[0] };
}
