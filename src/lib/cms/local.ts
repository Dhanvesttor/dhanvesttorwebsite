import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import type { CmsSource, Post, Category, Author, Job, Event, PressItem, Faq } from "./types";
import { readingMinutes } from "./types";

const ROOT = path.join(process.cwd(), "content");
const json = <T,>(file: string): T => JSON.parse(readFileSync(path.join(ROOT, file), "utf8")) as T;

export const categories: Category[] = [
  { slug: "markets", name: "Markets", description: "What is moving, and what it means for a long-term investor." },
  { slug: "pms", name: "Portfolio Management", description: "How PMS works, how we run FAITH, and what to ask any manager." },
  { slug: "mutual-funds", name: "Mutual Funds", description: "Choosing, holding and reviewing funds without the noise." },
  { slug: "women-and-money", name: "Women & Money", description: "Ownership, confidence and the conversations that change outcomes." },
  { slug: "clcb", name: "CLCB", description: "Notes from our workshops and community." },
  { slug: "media", name: "News & Media", description: "Coverage, announcements and milestones." },
];

export const authors: Author[] = [
  { slug: "anooshka-soham-bathwal", name: "Anooshka Soham Bathwal", role: "Founder & CEO", bio: "Founder of Dhanvesttor. Writes about ownership, women and the long game." },
  { slug: "ishan-daga", name: "Ishan Daga", role: "Fund Manager", bio: "Manages the FAITH Fund. Writes about businesses, valuations and patience." },
  { slug: "dhanvesttor-research", name: "Dhanvesttor Research", role: "Research desk", bio: "The research and content team at Dhanvesttor." },
];

let postCache: Post[] | null = null;

function loadPosts(): Post[] {
  if (postCache) return postCache;
  const dir = path.join(ROOT, "posts");
  if (!existsSync(dir)) return (postCache = []);
  const posts = readdirSync(dir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => {
      const raw = readFileSync(path.join(dir, f), "utf8");
      const { data, content } = matter(raw);
      const html = marked.parse(content, { async: false }) as string;
      const category = categories.find((c) => c.slug === data.category) ?? categories[0];
      const author = authors.find((a) => a.slug === data.author) ?? authors[2];
      const slug = data.slug ?? f.replace(/\.md$/, "");
      return {
        slug,
        title: data.title,
        excerpt: data.excerpt ?? "",
        html,
        date: new Date(data.date).toISOString(),
        modified: data.modified ? new Date(data.modified).toISOString() : undefined,
        author,
        category,
        tags: data.tags ?? [],
        cover: data.cover,
        coverAlt: data.coverAlt,
        readingMinutes: readingMinutes(html),
        seo: { title: data.seoTitle, description: data.seoDescription ?? data.excerpt },
      } satisfies Post;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
  return (postCache = posts);
}

export const local: CmsSource = {
  async getPosts(opts = {}) {
    let posts = loadPosts();
    if (opts.category) posts = posts.filter((p) => p.category.slug === opts.category);
    if (opts.tag) posts = posts.filter((p) => p.tags.includes(opts.tag!));
    if (opts.author) posts = posts.filter((p) => p.author.slug === opts.author);
    if (opts.limit) posts = posts.slice(0, opts.limit);
    return posts;
  },
  async getPost(slug) {
    return loadPosts().find((p) => p.slug === slug) ?? null;
  },
  async getCategories() {
    return categories;
  },
  async getAuthors() {
    return authors;
  },
  async getJobs(opts = {}) {
    const jobs = json<Job[]>("jobs.json");
    return opts.openOnly ? jobs.filter((j) => j.open) : jobs;
  },
  async getJob(slug) {
    return json<Job[]>("jobs.json").find((j) => j.slug === slug) ?? null;
  },
  async getEvents(opts = {}) {
    const events = json<Event[]>("events.json").sort((a, b) => (a.date < b.date ? 1 : -1));
    if (opts.upcoming === true) return events.filter((e) => !e.past).reverse();
    if (opts.upcoming === false) return events.filter((e) => e.past);
    return events;
  },
  async getPress() {
    return json<PressItem[]>("press.json").sort((a, b) => (a.date < b.date ? 1 : -1));
  },
  async getFaqs(group) {
    const faqs = json<Faq[]>("faqs.json");
    return group ? faqs.filter((f) => f.group === group) : faqs;
  },
};
