import { Header } from "./Header";
import { Footer } from "./Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd } from "@/lib/seo";

export function Shell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <Header />
      <main id="main" className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
