import { notFound } from "next/navigation";
import { Shell } from "@/components/layout/Shell";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { PostGrid } from "@/components/sections/PostGrid";
import { buildMetadata } from "@/lib/seo";
import { cms } from "@/lib/cms";

export const revalidate = 300;
export async function generateStaticParams() { return (await cms.getAuthors()).map((a) => ({ slug: a.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const a = (await cms.getAuthors()).find((x) => x.slug === slug);
  return a ? buildMetadata({ title: `Articles by ${a.name}`, description: a.bio, path: `/insights/author/${a.slug}` }) : {};
}
export default async function Author({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const a = (await cms.getAuthors()).find((x) => x.slug === slug);
  if (!a) notFound();
  const posts = await cms.getPosts({ author: slug });
  return (
    <Shell>
      <PageHero compact crumbs={[{ name: "Insights", path: "/insights" }, { name: a.name, path: `/insights/author/${slug}` }]} eyebrow={a.role || "Author"} title={a.name} lede={a.bio} />
      <Section><PostGrid posts={posts} /></Section>
    </Shell>
  );
}
