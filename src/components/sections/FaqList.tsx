import { Accordion } from "@/components/ui/Accordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqJsonLd } from "@/lib/seo";
import type { Faq } from "@/lib/cms/types";

export function FaqList({ items, className }: { items: Pick<Faq, "q" | "a">[]; className?: string }) {
  if (!items.length) return null;
  return (
    <>
      <JsonLd data={faqJsonLd(items)} />
      <Accordion className={className} items={items.map((f) => ({ title: f.q, body: <p>{f.a}</p> }))} />
    </>
  );
}
