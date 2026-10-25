import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(6).max(20),
  path: z.enum(["pms", "mf", "clcb", "insurance", "bonds", "other"]),
  amount: z.string().max(60).optional().or(z.literal("")),
  message: z.string().max(2000).optional().or(z.literal("")),
  source: z.string().max(60).optional().or(z.literal("")),
  consent: z.literal("on", { message: "Please agree to be contacted." }),
  website: z.string().max(0).optional(), // honeypot
});

export const clcbSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(6).max(20),
  city: z.string().min(2).max(80),
  stage: z.enum(["starting", "some", "experienced"]),
  interests: z.string().max(400).optional().or(z.literal("")),
  consent: z.literal("on"),
  website: z.string().max(0).optional(),
});

export const applySchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  phone: z.string().min(6).max(20),
  role: z.string().min(2).max(120),
  department: z.string().max(60).optional().or(z.literal("")),
  linkedin: z.string().max(200).optional().or(z.literal("")),
  note: z.string().max(2000).optional().or(z.literal("")),
  consent: z.literal("on"),
  website: z.string().max(0).optional(),
});

export const newsletterSchema = z.object({ email: z.string().email(), name: z.string().max(120).optional().or(z.literal("")), website: z.string().max(0).optional() });

export const pathLabel: Record<string, string> = { pms: "Portfolio Management (₹50 lakh+)", mf: "Mutual Funds (₹5,000+)", clcb: "CLCB community", insurance: "Insurance", bonds: "Bonds & fixed income", other: "Something else" };

export function formDataToObject(fd: FormData) {
  const o: Record<string, string> = {};
  fd.forEach((v, k) => { if (typeof v === "string") o[k] = v; });
  return o;
}
