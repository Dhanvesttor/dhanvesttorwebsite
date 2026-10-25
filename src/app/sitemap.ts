import type { MetadataRoute } from "next";
import { staticRoutes } from "@/content/routes";
import { team } from "@/content/team";
import { cms } from "@/lib/cms";

const BASE = "https://dhanvesttor.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, jobs, categories, authors] = await Promise.all([
    cms.getPosts(), cms.getJobs({ openOnly: true }), cms.getCategories(), cms.getAuthors(),
  ]);
  return [
    ...staticRoutes.map((r) => ({ url: `${BASE}${r.path}`, priority: r.priority, changeFrequency: r.changeFrequency, lastModified: new Date() })),
    ...team.map((m) => ({ url: `${BASE}/about/team/${m.slug}`, priority: 0.5, changeFrequency: "yearly" as const })),
    ...posts.map((p) => ({ url: `${BASE}/insights/${p.slug}`, priority: 0.7, changeFrequency: "monthly" as const, lastModified: new Date(p.modified ?? p.date) })),
    ...categories.map((c) => ({ url: `${BASE}/insights/category/${c.slug}`, priority: 0.5, changeFrequency: "weekly" as const })),
    ...authors.map((a) => ({ url: `${BASE}/insights/author/${a.slug}`, priority: 0.4, changeFrequency: "monthly" as const })),
    ...jobs.map((j) => ({ url: `${BASE}/careers/roles/${j.slug}`, priority: 0.5, changeFrequency: "weekly" as const })),
  ];
}
