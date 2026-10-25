import type { CmsSource } from "./types";
import { local } from "./local";
import { wordpress } from "./wordpress";

let warned = false;

/** Wraps a WordPress call so a CMS outage degrades to seed content instead of a 500. */
function withFallback<K extends keyof CmsSource>(key: K): CmsSource[K] {
  return (async (...args: unknown[]) => {
    if (!process.env.WORDPRESS_GRAPHQL_URL) return (local[key] as (...a: unknown[]) => unknown)(...args);
    try {
      return await (wordpress[key] as (...a: unknown[]) => unknown)(...args);
    } catch (err) {
      if (!warned) {
        warned = true;
        console.error("[cms] WordPress unreachable, serving local seed content.", err instanceof Error ? err.message : err);
      }
      return (local[key] as (...a: unknown[]) => unknown)(...args);
    }
  }) as CmsSource[K];
}

export const cms: CmsSource = {
  getPosts: withFallback("getPosts"),
  getPost: withFallback("getPost"),
  getCategories: withFallback("getCategories"),
  getAuthors: withFallback("getAuthors"),
  getJobs: withFallback("getJobs"),
  getJob: withFallback("getJob"),
  getEvents: withFallback("getEvents"),
  getPress: withFallback("getPress"),
  getFaqs: withFallback("getFaqs"),
};

export type * from "./types";
