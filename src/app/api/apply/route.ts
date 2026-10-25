import { NextResponse } from "next/server";
import { applySchema, formDataToObject } from "@/lib/forms";
import { send, table } from "@/lib/mail";

const MAX = 5 * 1024 * 1024;
const TYPES = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];

export async function POST(req: Request) {
  const fd = await req.formData();
  const parsed = applySchema.safeParse(formDataToObject(fd));
  if (!parsed.success) return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ ok: true });
  const cv = fd.get("cv");
  const attachments: { filename: string; content: Buffer; contentType?: string }[] = [];
  if (cv instanceof File && cv.size > 0) {
    if (cv.size > MAX) return NextResponse.json({ ok: false, errors: { cv: ["CV must be under 5 MB"] } }, { status: 400 });
    if (!TYPES.includes(cv.type)) return NextResponse.json({ ok: false, errors: { cv: ["Please upload a PDF or Word document"] } }, { status: 400 });
    attachments.push({ filename: cv.name.replace(/[^\w.\-]+/g, "_"), content: Buffer.from(await cv.arrayBuffer()), contentType: cv.type });
  }
  const d = parsed.data;
  await send({ to: process.env.HR_MAIL_TO, subject: `Application · ${d.role} · ${d.name}`, replyTo: d.email, attachments, html: `<h2 style="font:400 20px Georgia">New application</h2>${table([["Name", d.name], ["Email", d.email], ["Phone", d.phone], ["Role", d.role], ["Department", d.department], ["LinkedIn", d.linkedin], ["Note", d.note]])}` });
  return NextResponse.json({ ok: true });
}
