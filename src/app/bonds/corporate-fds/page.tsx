import { ProtectPage } from "@/components/sections/ProtectPage";
import { bondPages } from "@/content/protect";
import { buildMetadata } from "@/lib/seo";

const d = bondPages["corporate-fds"];
export const metadata = buildMetadata({ title: d.seoTitle, description: d.description, path: "/bonds/corporate-fds" });
export default function Page() {
  return <ProtectPage parent={{ name: "Bonds & fixed income", path: "/bonds" }} slug="corporate-fds" path="bonds" eyebrow="Fixed income" title={d.title} lede={d.lede}
    items={d.items} itemsTitle={<>What you can <em>invest in.</em></>} side={{ title: <>The risks, <em>plainly.</em></>, list: d.risks }}
    siblings={[{ name: "Fixed income overview", path: "/bonds" }, { name: "Bonds & NCDs", path: "/bonds/bonds-ncds" }, { name: "Corporate FDs", path: "/bonds/corporate-fds" }, { name: "Structured products", path: "/bonds/structured-products" }].filter((s) => !s.path.endsWith("/corporate-fds"))} />;
}
