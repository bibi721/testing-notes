import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

import type { ContentRepository } from "./repository";
import {
  parseFrontmatter,
  postFrontmatterSchema,
  resourceFrontmatterSchema,
} from "./schema";
import { calculateReadingTime } from "./reading-time";
import { humanize } from "@/lib/format";
import type { Category, Post, Resource, Series, Tag } from "@/types/content";

const DEFAULT_POSTS_DIR = path.join(process.cwd(), "content", "posts");
const DEFAULT_RESOURCES_DIR = path.join(process.cwd(), "content", "resources");

function readMdxFiles(dir: string): { slug: string; raw: string }[] {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ""),
      raw: fs.readFileSync(path.join(dir, file), "utf-8"),
    }));
}

export class FileSystemContentRepository implements ContentRepository {
  private postsDir: string;
  private resourcesDir: string;
  private postsCache: Post[] | null = null;
  private resourcesCache: Resource[] | null = null;

  constructor(
    postsDir: string = DEFAULT_POSTS_DIR,
    resourcesDir: string = DEFAULT_RESOURCES_DIR
  ) {
    this.postsDir = postsDir;
    this.resourcesDir = resourcesDir;
  }

  private loadAllPosts(): Post[] {
    if (this.postsCache) return this.postsCache;

    const posts = readMdxFiles(this.postsDir).map(({ slug, raw }) => {
      const { data, content } = matter(raw);
      const filePath = path.join(this.postsDir, `${slug}.mdx`);
      const frontmatter = parseFrontmatter(
        postFrontmatterSchema,
        data,
        filePath
      );

      return {
        ...frontmatter,
        slug,
        content,
        readingTimeMinutes: calculateReadingTime(content),
      } satisfies Post;
    });

    posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
    this.postsCache = posts;
    return posts;
  }

  private loadAllResources(): Resource[] {
    if (this.resourcesCache) return this.resourcesCache;

    const resources = readMdxFiles(this.resourcesDir).map(({ slug, raw }) => {
      const { data } = matter(raw);
      const filePath = path.join(this.resourcesDir, `${slug}.mdx`);
      const frontmatter = parseFrontmatter(
        resourceFrontmatterSchema,
        data,
        filePath
      );

      return { ...frontmatter, slug } satisfies Resource;
    });

    resources.sort((a, b) => Date.parse(b.addedDate) - Date.parse(a.addedDate));
    this.resourcesCache = resources;
    return resources;
  }

  async getAllPosts({ includeDrafts = false } = {}): Promise<Post[]> {
    const posts = this.loadAllPosts();
    return includeDrafts ? posts : posts.filter((post) => !post.draft);
  }

  async getPostBySlug(slug: string): Promise<Post | null> {
    const posts = this.loadAllPosts();
    return posts.find((post) => post.slug === slug) ?? null;
  }

  async getPostsByCategory(categorySlug: string): Promise<Post[]> {
    const posts = await this.getAllPosts();
    return posts.filter((post) => post.category === categorySlug);
  }

  async getPostsByTag(tagSlug: string): Promise<Post[]> {
    const posts = await this.getAllPosts();
    return posts.filter((post) => post.tags.includes(tagSlug));
  }

  async getPostsBySeries(seriesSlug: string): Promise<Post[]> {
    const posts = await this.getAllPosts();
    return posts
      .filter((post) => post.series === seriesSlug)
      .sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0));
  }

  async getRelatedPosts(post: Post, limit = 3): Promise<Post[]> {
    const posts = await this.getAllPosts();

    const scored = posts
      .filter((candidate) => candidate.slug !== post.slug)
      .map((candidate) => {
        let score = 0;
        if (candidate.category === post.category) score += 2;
        score += candidate.tags.filter((tag) => post.tags.includes(tag)).length;
        return { candidate, score };
      })
      .filter(({ score }) => score > 0)
      .sort((a, b) => b.score - a.score);

    return scored.slice(0, limit).map(({ candidate }) => candidate);
  }

  async getAllCategories(): Promise<Category[]> {
    const posts = await this.getAllPosts();
    const slugs = Array.from(new Set(posts.map((post) => post.category)));
    return slugs.map((slug) => ({ slug, name: humanize(slug) }));
  }

  async getAllTags(): Promise<Tag[]> {
    const posts = await this.getAllPosts();
    const slugs = Array.from(new Set(posts.flatMap((post) => post.tags)));
    return slugs.map((slug) => ({ slug, name: humanize(slug) }));
  }

  async getAllSeries(): Promise<Series[]> {
    const posts = await this.getAllPosts();
    const slugs = Array.from(
      new Set(
        posts
          .map((post) => post.series)
          .filter((series): series is string => Boolean(series))
      )
    );
    return slugs.map((slug) => {
      const postsInSeries = posts.filter((post) => post.series === slug);
      return {
        slug,
        name: humanize(slug),
        plannedLength: postsInSeries.length,
      };
    });
  }

  async getAllResources(): Promise<Resource[]> {
    return this.loadAllResources();
  }

  async getResourcesByCategory(categorySlug: string): Promise<Resource[]> {
    const resources = await this.getAllResources();
    return resources.filter((resource) => resource.category === categorySlug);
  }
}
