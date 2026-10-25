import { ProtectPage } from "@/components/sections/ProtectPage";
import { insurancePages } from "@/content/protect";
import { buildMetadata } from "@/lib/seo";

const d = insurancePages["health"];
export const metadata = buildMetadata({ title: d.seoTitle, description: d.description, path: "/insurance/health" });
export default function Page() {
  return <ProtectPage parent={{ name: "Insurance", path: "/insurance" }} slug="health" path="insurance" eyebrow="Insurance" title={d.title} lede={d.lede}
    items={d.covers} itemsTitle={<>Cover we help you <em>choose.</em></>} side={{ title: <>Questions we make sure <em>you ask.</em></>, list: d.ask }}
    siblings={[{ name: "Insurance overview", path: "/insurance" }, { name: "Health", path: "/insurance/health" }, { name: "Property & motor", path: "/insurance/property-motor" }, { name: "Business & group", path: "/insurance/business" }].filter((s) => !s.path.endsWith("/health"))} />;
}
