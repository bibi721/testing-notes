import type { Category, Post, Resource, Series, Tag } from "@/types/content";

/**
 * Contract for anything that can supply Testing Notes content.
 *
 * Phase 2 ships a `FileSystemContentRepository` (gray-matter + MDX
 * files under /content). If a headless CMS is introduced later, it
 * becomes a second implementation of this same interface — the app
 * layer (pages, components) only ever depends on this contract, so
 * swapping implementations is a one-file change, not a rewrite.
 */
export interface ContentRepository {
  getAllPosts(options?: { includeDrafts?: boolean }): Promise<Post[]>;
  getPostBySlug(slug: string): Promise<Post | null>;
  getPostsByCategory(categorySlug: string): Promise<Post[]>;
  getPostsByTag(tagSlug: string): Promise<Post[]>;
  getPostsBySeries(seriesSlug: string): Promise<Post[]>;
  getRelatedPosts(post: Post, limit?: number): Promise<Post[]>;

  getAllCategories(): Promise<Category[]>;
  getAllTags(): Promise<Tag[]>;
  getAllSeries(): Promise<Series[]>;

  getAllResources(): Promise<Resource[]>;
  getResourcesByCategory(categorySlug: string): Promise<Resource[]>;
}

// The concrete FileSystemContentRepository (gray-matter based) is
// implemented in Phase 2, once the content pipeline is in scope.
