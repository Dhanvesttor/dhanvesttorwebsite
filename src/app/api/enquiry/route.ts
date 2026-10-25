import { NextResponse } from "next/server";
import { enquirySchema, formDataToObject, pathLabel } from "@/lib/forms";
import { send, table } from "@/lib/mail";

export async function POST(req: Request) {
  const data = formDataToObject(await req.formData());
  const parsed = enquirySchema.safeParse(data);
  if (!parsed.success) return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  if (parsed.data.website) return NextResponse.json({ ok: true }); // honeypot: pretend success
  const d = parsed.data;
  await send({
    subject: `Website enquiry · ${pathLabel[d.path]} · ${d.name}`,
    replyTo: d.email,
    html: `<h2 style="font:400 20px Georgia">New enquiry</h2>${table([["Name", d.name], ["Email", d.email], ["Phone", d.phone], ["Interested in", pathLabel[d.path]], ["Amount", d.amount], ["How they found us", d.source], ["Message", d.message]])}`,
  });
  return NextResponse.json({ ok: true });
}
