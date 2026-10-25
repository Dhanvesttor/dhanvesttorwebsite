import { NextResponse } from "next/server";
import { newsletterSchema, formDataToObject } from "@/lib/forms";
import { send, table } from "@/lib/mail";

export async function POST(req: Request) {
  const parsed = newsletterSchema.safeParse(formDataToObject(await req.formData()));
  if (!parsed.success) return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ ok: true });
  await send({ subject: `Newsletter signup · ${parsed.data.email}`, html: table([["Email", parsed.data.email], ["Name", parsed.data.name]]) });
  return NextResponse.json({ ok: true });
}
