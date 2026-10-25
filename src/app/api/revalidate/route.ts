import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/** Called by the WordPress plugin on publish: POST /api/revalidate?secret=...&type=post|job|event|press|faq */
export async function POST(req: Request) {
  const url = new URL(req.url);
  if (!process.env.REVALIDATE_SECRET || url.searchParams.get("secret") !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const type = url.searchParams.get("type") ?? "post";
  const map: Record<string, string[]> = {
    post: ["/insights", "/", "/sitemap.xml"],
    job: ["/careers", "/careers/roles", "/sitemap.xml"],
    event: ["/clcb/events", "/clcb", "/"],
    press: ["/media", "/about"],
    faq: ["/pms/faqs", "/mutual-funds/faqs", "/clcb"],
  };
  for (const p of map[type] ?? map.post) revalidatePath(p, "layout");
  return NextResponse.json({ ok: true, revalidated: map[type] ?? map.post });
}
