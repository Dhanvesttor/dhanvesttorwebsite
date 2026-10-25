import type { Metadata } from "next";
import { site } from "@/content/site";
import type { Post } from "@/lib/cms/types";
import type { TeamMember } from "@/content/team";

const BASE = "https://dhanvesttor.com";

export type MetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  publishedTime?: string;
  authors?: string[];
};

export function buildMetadata(input: MetaInput): Metadata {
  const url = `${BASE}${input.path}`;
  const image = input.image ?? `${BASE}/og-default.png`;
  const title = input.path === "/" ? input.title : `${input.title} | Dhanvesttor`;
  return {
    title: { absolute: title },
    description: input.description,
    alternates: { canonical: url },
    robots: input.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: input.type ?? "website",
      url,
      title,
      description: input.description,
      siteName: site.name,
      locale: "en_IN",
      images: [{ url: image, width: 1200, height: 630, alt: input.title }],
      ...(input.type === "article" ? { publishedTime: input.publishedTime, authors: input.authors } : {}),
    },
    twitter: { card: "summary_large_image", title, description: input.description, images: [image] },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "@id": `${BASE}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: BASE,
    logo: `${BASE}/brand/logo.svg`,
    slogan: site.tagline,
    telephone: "+91-33-2280-0152",
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${site.address.line1}, ${site.address.line2}`,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      postalCode: site.address.pin,
      addressCountry: "IN",
    },
    sameAs: Object.values(site.socials),
    areaServed: "IN",
    identifier: { "@type": "PropertyValue", name: "SEBI Portfolio Manager Registration", value: site.sebiReg },
  };
}

export function breadcrumbJsonLd(crumbs: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: `${BASE}${c.path}` })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
}

export function articleJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.modified ?? post.date,
    image: post.cover ? [post.cover] : undefined,
    author: { "@type": "Person", name: post.author.name, url: `${BASE}/insights/author/${post.author.slug}` },
    publisher: { "@id": `${BASE}/#organization` },
    mainEntityOfPage: `${BASE}/insights/${post.slug}`,
  };
}

export function personJsonLd(m: TeamMember) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: m.name,
    jobTitle: m.role,
    worksFor: { "@id": `${BASE}/#organization` },
    url: `${BASE}/about/team/${m.slug}`,
    sameAs: m.linkedin ? [m.linkedin] : undefined,
  };
}

export function webPageJsonLd(name: string, path: string, description: string) {
  return { "@context": "https://schema.org", "@type": "WebPage", name, url: `${BASE}${path}`, description, isPartOf: { "@id": `${BASE}/#organization` } };
}
