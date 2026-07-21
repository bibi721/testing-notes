/**
 * These types describe the *shape* of content, not where it comes
 * from. Pages and components should only ever import these types plus
 * functions from `@/lib/content/repository` — never reach into the
 * filesystem or a parsing library directly. That indirection is what
 * lets the underlying source move from local MDX files to a headless
 * CMS later without touching a single page component.
 */

export interface Taxonomy {
  slug: string;
  name: string;
  description?: string;
}

/** A Category is a primary top-level grouping (e.g. "Test Automation"). */
export type Category = Taxonomy;

/** A Tag is a free-form, many-per-post label (e.g. "playwright", "ci-cd"). */
export type Tag = Taxonomy;

/**
 * A Series groups posts meant to be read in order (e.g. a 5-part
 * "Learning Playwright" walkthrough). `order` on each post determines
 * position within the series.
 */
export interface Series extends Taxonomy {
  /** Total number of posts planned for this series, if known upfront. */
  plannedLength?: number;
}

export interface Author {
  name: string;
  bio?: string;
  avatarUrl?: string;
}

/** Frontmatter fields every post MDX file must declare. */
export interface PostFrontmatter {
  title: string;
  description: string;
  date: string; // ISO 8601
  updated?: string; // ISO 8601, present if edited after publish
  category: string; // Category slug
  tags: string[]; // Tag slugs
  series?: string; // Series slug, if part of one
  seriesOrder?: number; // Position within the series (1-indexed)
  coverImage?: string;
  draft?: boolean;
  canonicalUrl?: string; // For cross-posted content
}

/** A fully-resolved post: frontmatter plus computed fields. */
export interface Post extends PostFrontmatter {
  slug: string;
  /** Rendered word count, used to derive reading time. */
  readingTimeMinutes: number;
  /** Raw MDX body, compiled by the page that renders it. */
  content: string;
}

/** A resource entry in the Resource Library (tools, links, guides). */
export interface Resource {
  slug: string;
  title: string;
  description: string;
  url: string;
  category: string;
  tags: string[];
  /** Free vs paid, useful for filtering in the UI. */
  pricing?: "free" | "paid" | "freemium";
  addedDate: string; // ISO 8601
}
