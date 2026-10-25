import { notFound } from "next/navigation";
import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { PostGrid } from "@/components/sections/PostGrid";
import { buildMetadata } from "@/lib/seo";
import { cms } from "@/lib/cms";

export const revalidate = 300;
export async function generateStaticParams() { return (await cms.getCategories()).map((c) => ({ slug: c.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const c = (await cms.getCategories()).find((x) => x.slug === slug);
  return c ? buildMetadata({ title: `${c.name} Articles`, description: c.description, path: `/insights/category/${c.slug}` }) : {};
}
export default async function Category({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const c = (await cms.getCategories()).find((x) => x.slug === slug);
  if (!c) notFound();
  const posts = await cms.getPosts({ category: slug });
  return (
    <Shell>
      <PageHero compact crumbs={[{ name: "Insights", path: "/insights" }, { name: c.name, path: `/insights/category/${slug}` }]} eyebrow="Insights" title={c.name} lede={c.description} />
      <Section><PostGrid posts={posts} /></Section>
    </Shell>
  );
}
