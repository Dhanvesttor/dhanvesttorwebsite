import { NextResponse } from "next/server";
import { clcbSchema, formDataToObject } from "@/lib/forms";
import { send, table } from "@/lib/mail";

export async function POST(req: Request) {
  const parsed = clcbSchema.safeParse(formDataToObject(await req.formData()));
  if (!parsed.success) return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ ok: true });
  const d = parsed.data;
  await send({ subject: `CLCB join request · ${d.name} · ${d.city}`, replyTo: d.email, html: `<h2 style="font:400 20px Georgia">CLCB join request</h2>${table([["Name", d.name], ["Email", d.email], ["Phone", d.phone], ["City", d.city], ["Stage", d.stage], ["Interests", d.interests]])}` });
  return NextResponse.json({ ok: true });
}
