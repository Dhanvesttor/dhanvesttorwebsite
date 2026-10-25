import Link from "next/link";
import { notFound } from "next/navigation";
import { Shell } from "@/components/layout/Shell";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Hairline } from "@/components/ui/Hairline";
import { ImagePlaceholder } from "@/components/ui/ImagePlaceholder";
import { Prose } from "@/components/ui/Prose";
import { Section } from "@/components/ui/Section";
import { PostGrid } from "@/components/sections/PostGrid";
import { CTA } from "@/components/ui/CTA";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata, articleJsonLd } from "@/lib/seo";
import { cms } from "@/lib/cms";
import { formatDate } from "@/lib/utils";
import { disclaimers } from "@/content/disclaimers";

export const revalidate = 300;
export async function generateStaticParams() { return (await cms.getPosts()).map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const p = await cms.getPost((await params).slug);
  if (!p) return buildMetadata({ title: "Article not found", description: "", path: "/insights", noIndex: true });
  return buildMetadata({ title: p.seo.title?.replace(/\s*\|\s*Dhanvesttor$/, "") ?? p.title, description: p.seo.description ?? p.excerpt, path: `/insights/${p.slug}`, image: p.cover, type: "article", publishedTime: p.date, authors: [p.author.name] });
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const post = await cms.getPost((await params).slug);
  if (!post) notFound();
  const related = (await cms.getPosts({ category: post.category.slug })).filter((p) => p.slug !== post.slug).slice(0, 3);
  const more = related.length ? related : (await cms.getPosts({ limit: 4 })).filter((p) => p.slug !== post.slug).slice(0, 3);
  return (
    <Shell>
      <JsonLd data={articleJsonLd(post)} />
      <article>
        <header className="border-b border-line">
          <Container className="py-14 sm:py-20">
            <Breadcrumbs crumbs={[{ name: "Insights", path: "/insights" }, { name: post.category.name, path: `/insights/category/${post.category.slug}` }, { name: post.title, path: `/insights/${post.slug}` }]} className="mb-8" />
            <div className="max-w-[860px]">
              <Hairline className="mb-6" />
              <Link href={`/insights/category/${post.category.slug}`} className="eyebrow">{post.category.name}</Link>
              <h1 className="mt-4 text-[2.5rem] leading-[1.04] sm:text-[3.5rem]">{post.title}</h1>
              <p className="mt-6 text-[1.2rem] text-[#3f3d5c]">{post.excerpt}</p>
              <p className="mt-8 text-[13.5px] text-mist">
                By <Link href={`/insights/author/${post.author.slug}`} className="font-medium text-ink hover:text-raspberry">{post.author.name}</Link> · <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readingMinutes} min read
              </p>
            </div>
          </Container>
        </header>
        {post.cover && <Container className="pt-12"><ImagePlaceholder label={post.coverAlt ?? post.title} src={post.cover} alt={post.coverAlt ?? ""} ratio="21/9" priority /></Container>}
        <Container className="py-14">
          <div className="grid gap-12 lg:grid-cols-[1fr_260px]">
            <Prose html={post.html} className="mx-auto lg:mx-0" />
            <aside className="self-start lg:sticky lg:top-28">
              <div className="rounded-2xl border border-line bg-white p-5">
                <p className="eyebrow mb-2">Written by</p>
                <p className="font-display text-[1.25rem]">{post.author.name}</p>
                {post.author.role && <p className="text-[13px] text-mist">{post.author.role}</p>}
                <p className="mt-3 text-[13.5px] text-[#3f3d5c]">{post.author.bio}</p>
              </div>
              {post.tags.length > 0 && <ul className="mt-5 flex flex-wrap gap-2">{post.tags.map((t) => <li key={t}><Link href={`/insights/tag/${encodeURIComponent(t.toLowerCase().replace(/\s+/g, "-"))}`} className="inline-block rounded-full border border-line px-3 py-1 text-[12.5px] hover:border-indigo">{t}</Link></li>)}</ul>}
            </aside>
          </div>
          <p className="mt-14 max-w-[68ch] border-t border-line pt-6 text-[12.5px] text-mist">{disclaimers.general}</p>
        </Container>
      </article>
      {more.length > 0 && <Section tone="paper"><h2 className="mb-10 text-[2.2rem]">Keep <em>reading.</em></h2><PostGrid posts={more} /></Section>}
      <CTA title={<>Questions after reading? <em>Ask a person.</em></>} primary={{ label: "Start a conversation", href: "/contact" }} secondary={{ label: "Join CLCB", href: "/clcb/join" }} />
    </Shell>
  );
}
