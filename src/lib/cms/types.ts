export type Category = { slug: string; name: string; description: string };
export type Author = { slug: string; name: string; role: string; bio: string; photo?: string };
export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  html: string;
  date: string; // ISO
  modified?: string;
  author: Author;
  category: Category;
  tags: string[];
  cover?: string;
  coverAlt?: string;
  readingMinutes: number;
  seo: { title?: string; description?: string };
};
export type Job = {
  slug: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Internship" | "Contract";
  summary: string;
  html: string;
  applyEmail: string;
  postedAt: string;
  open: boolean;
};
export type Event = {
  slug: string;
  title: string;
  date: string; // ISO
  city: string;
  mode: "In person" | "Online" | "Hybrid";
  summary: string;
  registerUrl?: string;
  past: boolean;
};
export type PressItem = { outlet: string; title: string; url: string; date: string };
export type Faq = { q: string; a: string; group: string };

export interface CmsSource {
  getPosts(opts?: { category?: string; tag?: string; author?: string; limit?: number }): Promise<Post[]>;
  getPost(slug: string): Promise<Post | null>;
  getCategories(): Promise<Category[]>;
  getAuthors(): Promise<Author[]>;
  getJobs(opts?: { openOnly?: boolean }): Promise<Job[]>;
  getJob(slug: string): Promise<Job | null>;
  getEvents(opts?: { upcoming?: boolean }): Promise<Event[]>;
  getPress(): Promise<PressItem[]>;
  getFaqs(group?: string): Promise<Faq[]>;
}

export const readingMinutes = (html: string) =>
  Math.max(1, Math.round(html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length / 220));
