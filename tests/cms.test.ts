import { describe, it, expect, beforeEach, vi } from "vitest";

describe("cms adapter", () => {
  beforeEach(() => { vi.resetModules(); delete process.env.WORDPRESS_GRAPHQL_URL; });

  it("local getPosts returns seed posts sorted by date desc", async () => {
    const { cms } = await import("@/lib/cms");
    const posts = await cms.getPosts();
    expect(posts.length).toBe(6);
    for (let i = 1; i < posts.length; i++) expect(posts[i - 1].date >= posts[i].date).toBe(true);
    expect(posts[0].readingMinutes).toBeGreaterThan(0);
    expect(posts[0].html).toContain("<p>");
  });

  it("getPost returns null for a missing slug", async () => {
    const { cms } = await import("@/lib/cms");
    expect(await cms.getPost("does-not-exist")).toBeNull();
  });

  it("filters by category", async () => {
    const { cms } = await import("@/lib/cms");
    const posts = await cms.getPosts({ category: "pms" });
    expect(posts.every((p) => p.category.slug === "pms")).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
  });

  it("falls back to local when WordPress is unreachable", async () => {
    process.env.WORDPRESS_GRAPHQL_URL = "http://127.0.0.1:9/graphql";
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    const { cms } = await import("@/lib/cms");
    const posts = await cms.getPosts();
    expect(posts.length).toBe(6);
    const jobs = await cms.getJobs({ openOnly: true });
    expect(jobs.length).toBe(3);
    expect(spy).toHaveBeenCalledTimes(1);
    spy.mockRestore();
  });

  it("events split upcoming and past", async () => {
    const { cms } = await import("@/lib/cms");
    expect((await cms.getEvents({ upcoming: true })).every((e) => !e.past)).toBe(true);
    expect((await cms.getEvents({ upcoming: false })).every((e) => e.past)).toBe(true);
  });
});
