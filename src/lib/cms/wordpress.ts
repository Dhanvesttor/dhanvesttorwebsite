import { GraphQLClient, gql } from "graphql-request";
import type { CmsSource, Post, Category, Author, Job, Event, PressItem, Faq } from "./types";
import { readingMinutes } from "./types";

type WpNode = Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

const client = () => new GraphQLClient(process.env.WORDPRESS_GRAPHQL_URL!, { fetch: (u, i) => fetch(u, { ...i, next: { revalidate: 300 } }) });

const POST_FIELDS = gql`
  fragment PostFields on Post {
    slug title excerpt content date modified
    author { node { slug name description avatar { url } } }
    categories { nodes { slug name description } }
    tags { nodes { name } }
    featuredImage { node { sourceUrl altText } }
    dvSeo { title metaDesc }
  }
`;

const mapAuthor = (n: WpNode): Author => ({ slug: n?.slug ?? "team", name: n?.name ?? "Dhanvesttor", role: "", bio: n?.description ?? "", photo: n?.avatar?.url });
const mapCategory = (n: WpNode): Category => ({ slug: n?.slug ?? "markets", name: n?.name ?? "Markets", description: n?.description ?? "" });
const mapPost = (n: WpNode): Post => ({
  slug: n.slug,
  title: n.title,
  excerpt: (n.excerpt ?? "").replace(/<[^>]+>/g, "").trim(),
  html: n.content ?? "",
  date: n.date,
  modified: n.modified,
  author: mapAuthor(n.author?.node),
  category: mapCategory(n.categories?.nodes?.[0]),
  tags: (n.tags?.nodes ?? []).map((t: WpNode) => t.name),
  cover: n.featuredImage?.node?.sourceUrl,
  coverAlt: n.featuredImage?.node?.altText,
  readingMinutes: readingMinutes(n.content ?? ""),
  seo: { title: n.dvSeo?.title, description: n.dvSeo?.metaDesc },
});

export const wordpress: CmsSource = {
  async getPosts(opts = {}) {
    const where: string[] = [];
    if (opts.category) where.push(`categoryName: "${opts.category}"`);
    if (opts.tag) where.push(`tag: "${opts.tag}"`);
    if (opts.author) where.push(`authorName: "${opts.author}"`);
    const q = gql`${POST_FIELDS} query Posts($first: Int!) { posts(first: $first, where: { ${where.join(", ")} orderby: { field: DATE, order: DESC } }) { nodes { ...PostFields } } }`;
    const d = await client().request<{ posts: { nodes: WpNode[] } }>(q, { first: opts.limit ?? 100 });
    return d.posts.nodes.map(mapPost);
  },
  async getPost(slug) {
    const q = gql`${POST_FIELDS} query Post($slug: ID!) { post(id: $slug, idType: SLUG) { ...PostFields } }`;
    const d = await client().request<{ post: WpNode | null }>(q, { slug });
    return d.post ? mapPost(d.post) : null;
  },
  async getCategories() {
    const d = await client().request<{ categories: { nodes: WpNode[] } }>(gql`{ categories(first: 50) { nodes { slug name description } } }`);
    return d.categories.nodes.map(mapCategory);
  },
  async getAuthors() {
    const d = await client().request<{ users: { nodes: WpNode[] } }>(gql`{ users(first: 50, where: { hasPublishedPosts: [POST] }) { nodes { slug name description avatar { url } } } }`);
    return d.users.nodes.map(mapAuthor);
  },
  async getJobs(opts = {}) {
    const d = await client().request<{ jobs: { nodes: WpNode[] } }>(gql`{ jobs(first: 100) { nodes { slug title content jobMeta { department location jobType summary applyEmail isOpen } date } } }`);
    const jobs: Job[] = d.jobs.nodes.map((n) => ({
      slug: n.slug, title: n.title, html: n.content ?? "", postedAt: n.date,
      department: n.jobMeta?.department ?? "", location: n.jobMeta?.location ?? "Kolkata",
      type: (n.jobMeta?.jobType ?? "Full-time") as Job["type"], summary: n.jobMeta?.summary ?? "",
      applyEmail: n.jobMeta?.applyEmail ?? "ho@dhanvesttor.com", open: n.jobMeta?.isOpen ?? true,
    }));
    return opts.openOnly ? jobs.filter((j) => j.open) : jobs;
  },
  async getJob(slug) {
    const jobs = await wordpress.getJobs();
    return jobs.find((j) => j.slug === slug) ?? null;
  },
  async getEvents(opts = {}) {
    const d = await client().request<{ events: { nodes: WpNode[] } }>(gql`{ events(first: 100) { nodes { slug title eventMeta { eventDate city mode summary registerUrl } } } }`);
    const now = Date.now();
    const events: Event[] = d.events.nodes.map((n) => ({
      slug: n.slug, title: n.title, date: n.eventMeta?.eventDate ?? "", city: n.eventMeta?.city ?? "Kolkata",
      mode: (n.eventMeta?.mode ?? "In person") as Event["mode"], summary: n.eventMeta?.summary ?? "",
      registerUrl: n.eventMeta?.registerUrl, past: new Date(n.eventMeta?.eventDate ?? 0).getTime() < now,
    })).sort((a, b) => (a.date < b.date ? 1 : -1));
    if (opts.upcoming === true) return events.filter((e) => !e.past).reverse();
    if (opts.upcoming === false) return events.filter((e) => e.past);
    return events;
  },
  async getPress() {
    const d = await client().request<{ pressItems: { nodes: WpNode[] } }>(gql`{ pressItems(first: 100) { nodes { title pressMeta { outlet url publishedOn } } } }`);
    return d.pressItems.nodes.map((n): PressItem => ({ title: n.title, outlet: n.pressMeta?.outlet ?? "", url: n.pressMeta?.url ?? "#", date: n.pressMeta?.publishedOn ?? "" }));
  },
  async getFaqs(group) {
    const d = await client().request<{ faqs: { nodes: WpNode[] } }>(gql`{ faqs(first: 200) { nodes { title content faqMeta { faqGroup } } } }`);
    const faqs = d.faqs.nodes.map((n): Faq => ({ q: n.title, a: (n.content ?? "").replace(/<[^>]+>/g, "").trim(), group: n.faqMeta?.faqGroup ?? "general" }));
    return group ? faqs.filter((f) => f.group === group) : faqs;
  },
};
