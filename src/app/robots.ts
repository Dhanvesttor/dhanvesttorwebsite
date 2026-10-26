import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // A Vercel deploy not yet on dhanvesttor.com is a review copy: keep it out of search engines.
  const reviewCopy = !!process.env.VERCEL && !process.env.VERCEL_PROJECT_PRODUCTION_URL?.endsWith("dhanvesttor.com");
  if (reviewCopy) return { rules: [{ userAgent: "*", disallow: "/" }] };

  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/", "/thank-you"] }],
    sitemap: "https://dhanvesttor.com/sitemap.xml",
    host: "https://dhanvesttor.com",
  };
}
