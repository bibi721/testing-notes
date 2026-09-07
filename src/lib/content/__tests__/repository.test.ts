import path from "node:path";
import { fileURLToPath } from "node:url";

import { describe, expect, it } from "vitest";
import { FileSystemContentRepository } from "@/lib/content/filesystem-repository";

const fixturesDir = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "fixtures"
);

function makeRepository() {
  return new FileSystemContentRepository(
    path.join(fixturesDir, "posts"),
    path.join(fixturesDir, "resources")
  );
}

describe("FileSystemContentRepository", () => {
  describe("getAllPosts", () => {
    it("excludes drafts by default", async () => {
      const repo = makeRepository();
      const posts = await repo.getAllPosts();
      expect(posts.find((p) => p.slug === "draft-post")).toBeUndefined();
      expect(posts).toHaveLength(3);
    });

    it("includes drafts when explicitly requested", async () => {
      const repo = makeRepository();
      const posts = await repo.getAllPosts({ includeDrafts: true });
      expect(posts.find((p) => p.slug === "draft-post")).toBeDefined();
      expect(posts).toHaveLength(4);
    });

    it("sorts posts newest first", async () => {
      const repo = makeRepository();
      const posts = await repo.getAllPosts();
      expect(posts.map((p) => p.slug)).toEqual([
        "gamma-post",
        "beta-post",
        "alpha-post",
      ]);
    });

    it("computes reading time for each post", async () => {
      const repo = makeRepository();
      const posts = await repo.getAllPosts();
      expect(posts.every((p) => p.readingTimeMinutes >= 1)).toBe(true);
    });
  });

  describe("getPostBySlug", () => {
    it("returns the matching post", async () => {
      const repo = makeRepository();
      const post = await repo.getPostBySlug("alpha-post");
      expect(post?.title).toBe("Alpha Post");
    });

    it("returns null for an unknown slug", async () => {
      const repo = makeRepository();
      expect(await repo.getPostBySlug("does-not-exist")).toBeNull();
    });
  });

  describe("getPostsByCategory", () => {
    it("filters by category slug", async () => {
      const repo = makeRepository();
      const posts = await repo.getPostsByCategory("test-automation");
      expect(posts.map((p) => p.slug).sort()).toEqual([
        "beta-post",
        "gamma-post",
      ]);
    });
  });

  describe("getPostsByTag", () => {
    it("filters by tag slug", async () => {
      const repo = makeRepository();
      const posts = await repo.getPostsByTag("playwright");
      expect(posts).toHaveLength(2);
    });
  });

  describe("getPostsBySeries", () => {
    it("returns posts ordered by seriesOrder", async () => {
      const repo = makeRepository();
      const posts = await repo.getPostsBySeries("fixture-series");
      expect(posts.map((p) => p.slug)).toEqual(["beta-post", "gamma-post"]);
    });
  });

  describe("getRelatedPosts", () => {
    it("ranks same-category and shared-tag posts above unrelated ones", async () => {
      const repo = makeRepository();
      const beta = await repo.getPostBySlug("beta-post");
      const related = await repo.getRelatedPosts(beta!);

      // gamma shares both category and a tag with beta - should rank first.
      expect(related[0]?.slug).toBe("gamma-post");
      // alpha shares neither category nor tags - should be excluded.
      expect(related.find((p) => p.slug === "alpha-post")).toBeUndefined();
    });
  });

  describe("getAllCategories / getAllTags / getAllSeries", () => {
    it("derives unique categories from published posts", async () => {
      const repo = makeRepository();
      const categories = await repo.getAllCategories();
      expect(categories.map((c) => c.slug).sort()).toEqual([
        "manual-testing",
        "test-automation",
      ]);
    });

    it("derives unique tags from published posts", async () => {
      const repo = makeRepository();
      const tags = await repo.getAllTags();
      expect(tags.map((t) => t.slug).sort()).toEqual([
        "ci-cd",
        "exploratory-testing",
        "playwright",
        "testing-fundamentals",
      ]);
    });

    it("derives series with a computed length", async () => {
      const repo = makeRepository();
      const series = await repo.getAllSeries();
      expect(series).toEqual([
        { slug: "fixture-series", name: "Fixture Series", plannedLength: 2 },
      ]);
    });
  });

  describe("resources", () => {
    it("loads and validates resource entries", async () => {
      const repo = makeRepository();
      const resources = await repo.getAllResources();
      expect(resources).toHaveLength(1);
      expect(resources[0].title).toBe("Fixture Tool");
    });

    it("filters resources by category", async () => {
      const repo = makeRepository();
      const resources = await repo.getResourcesByCategory("test-automation");
      expect(resources).toHaveLength(1);
      expect(
        await repo.getResourcesByCategory("nonexistent-category")
      ).toHaveLength(0);
    });
  });
});
