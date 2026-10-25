import { MfCategoryPage } from "@/components/sections/MfCategoryPage";
import { getMfCategory } from "@/content/mfCategories";
import { buildMetadata } from "@/lib/seo";

const c = getMfCategory("index-etf");
export const metadata = buildMetadata({ title: c.seoTitle, description: c.description, path: "/mutual-funds/index-etf" });
export default function Page() { return <MfCategoryPage c={c} />; }
