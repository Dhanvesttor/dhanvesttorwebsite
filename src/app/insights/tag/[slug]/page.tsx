import { notFound } from "next/navigation";
import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { PostGrid } from "@/components/sections/PostGrid";
import { buildMetadata } from "@/lib/seo";
import { cms } from "@/lib/cms";

const toSlug = (t: string) => t.toLowerCase().replace(/\s+/g, "-");
export const revalidate = 300;
export async function generateStaticParams() {
  const tags = new Set((await cms.getPosts()).flatMap((p) => p.tags.map(toSlug)));
  return [...tags].map((slug) => ({ slug: encodeURIComponent(slug) }));
}
async function find(slug: string) {
  const posts = await cms.getPosts();
  const s = decodeURIComponent(slug);
  const name = posts.flatMap((p) => p.tags).find((t) => toSlug(t) === s);
  return name ? { name, posts: posts.filter((p) => p.tags.includes(name)) } : null;
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const r = await find((await params).slug);
  return r ? buildMetadata({ title: `${r.name} Articles`, description: `Dhanvesttor articles tagged ${r.name}.`, path: `/insights/tag/${toSlug(r.name)}`, noIndex: true }) : {};
}
export default async function Tag({ params }: { params: Promise<{ slug: string }> }) {
  const r = await find((await params).slug);
  if (!r) notFound();
  return (
    <Shell>
      <PageHero compact crumbs={[{ name: "Insights", path: "/insights" }, { name: r.name, path: `/insights/tag/${toSlug(r.name)}` }]} eyebrow="Tag" title={r.name} />
      <Section><PostGrid posts={r.posts} /></Section>
    </Shell>
  );
}
