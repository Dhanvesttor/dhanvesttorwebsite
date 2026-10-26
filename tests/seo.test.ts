import { describe, it, expect, vi, afterEach } from "vitest";
import { buildMetadata, faqJsonLd, breadcrumbJsonLd, organizationJsonLd } from "@/lib/seo";
import robots from "@/app/robots";

describe("robots", () => {
  afterEach(() => vi.unstubAllEnvs());
  it("allows crawling off Vercel", () => {
    vi.stubEnv("VERCEL", "");
    expect(robots().rules).toEqual([{ userAgent: "*", allow: "/", disallow: ["/api/", "/thank-you"] }]);
  });
  it("blocks crawling on a vercel.app review copy", () => {
    vi.stubEnv("VERCEL", "1");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "dhanvesttorwebsite.vercel.app");
    expect(robots().rules).toEqual([{ userAgent: "*", disallow: "/" }]);
  });
  it("allows crawling once Vercel serves dhanvesttor.com", () => {
    vi.stubEnv("VERCEL", "1");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "dhanvesttor.com");
    expect(robots().sitemap).toBe("https://dhanvesttor.com/sitemap.xml");
  });
});

describe("seo helpers", () => {
  it("builds canonical and titled metadata", () => {
    const m = buildMetadata({ title: "PMS", description: "x", path: "/pms" });
    expect(m.alternates?.canonical).toBe("https://dhanvesttor.com/pms");
    expect((m.title as { absolute: string }).absolute).toBe("PMS | Dhanvesttor");
    expect(m.openGraph?.url).toBe("https://dhanvesttor.com/pms");
  });
  it("home title has no suffix", () => {
    const m = buildMetadata({ title: "Dhanvesttor", description: "x", path: "/" });
    expect((m.title as { absolute: string }).absolute).toBe("Dhanvesttor");
  });
  it("faq json-ld", () => {
    const j = faqJsonLd([{ q: "Q?", a: "A." }]);
    expect(j["@type"]).toBe("FAQPage");
    expect(j.mainEntity[0].acceptedAnswer.text).toBe("A.");
  });
  it("breadcrumb and organization json-ld", () => {
    expect(breadcrumbJsonLd([{ name: "Home", path: "/" }]).itemListElement[0].item).toBe("https://dhanvesttor.com/");
    expect(organizationJsonLd().identifier.value).toBe("INP000008570");
  });
});
