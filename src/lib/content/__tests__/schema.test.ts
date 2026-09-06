import { describe, expect, it } from "vitest";
import {
  parseFrontmatter,
  postFrontmatterSchema,
  resourceFrontmatterSchema,
} from "@/lib/content/schema";

describe("postFrontmatterSchema", () => {
  const validPost = {
    title: "A Test Post",
    description: "A short description.",
    date: "2026-01-01",
    category: "manual-testing",
    tags: ["testing-fundamentals"],
  };

  it("accepts valid frontmatter and defaults optional fields", () => {
    const result = postFrontmatterSchema.parse(validPost);
    expect(result.draft).toBe(false);
    expect(result.tags).toEqual(["testing-fundamentals"]);
  });

  it("rejects a missing title", () => {
    const { title: _title, ...rest } = validPost;
    expect(postFrontmatterSchema.safeParse(rest).success).toBe(false);
  });

  it("rejects an invalid date", () => {
    const result = postFrontmatterSchema.safeParse({
      ...validPost,
      date: "not-a-date",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a description over 200 characters", () => {
    const result = postFrontmatterSchema.safeParse({
      ...validPost,
      description: "x".repeat(201),
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid canonicalUrl", () => {
    const result = postFrontmatterSchema.safeParse({
      ...validPost,
      canonicalUrl: "not-a-url",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a series without a seriesOrder", () => {
    // Regression test: getPostsBySeries() sorts missing orders as 0,
    // so an unordered post would silently render first instead of
    // failing the build, contradicting the content guide's documented
    // requirement that seriesOrder is mandatory when series is set.
    const result = postFrontmatterSchema.safeParse({
      ...validPost,
      series: "some-series",
    });
    expect(result.success).toBe(false);
  });

  it("accepts a series with a seriesOrder", () => {
    const result = postFrontmatterSchema.safeParse({
      ...validPost,
      series: "some-series",
      seriesOrder: 1,
    });
    expect(result.success).toBe(true);
  });
});

describe("resourceFrontmatterSchema", () => {
  it("accepts valid resource frontmatter", () => {
    const result = resourceFrontmatterSchema.safeParse({
      title: "Playwright",
      description: "E2E testing framework.",
      url: "https://playwright.dev",
      category: "test-automation",
      tags: ["playwright"],
      addedDate: "2026-01-10",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid url", () => {
    const result = resourceFrontmatterSchema.safeParse({
      title: "Playwright",
      description: "E2E testing framework.",
      url: "not-a-url",
      category: "test-automation",
      addedDate: "2026-01-10",
    });
    expect(result.success).toBe(false);
  });
});

describe("parseFrontmatter", () => {
  it("throws a descriptive error identifying the file on invalid data", () => {
    expect(() =>
      parseFrontmatter(
        postFrontmatterSchema,
        { title: "" },
        "content/posts/broken.mdx"
      )
    ).toThrow(/content\/posts\/broken\.mdx/);
  });

  it("returns parsed data on success", () => {
    const result = parseFrontmatter(
      postFrontmatterSchema,
      {
        title: "OK",
        description: "Fine.",
        date: "2026-01-01",
        category: "manual-testing",
      },
      "content/posts/ok.mdx"
    );
    expect(result.title).toBe("OK");
  });
});
