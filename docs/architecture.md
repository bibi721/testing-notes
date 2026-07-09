# Architecture

## Overview

Testing Notes is a statically-generated, content-first blog. There is
no database and no authentication layer — content lives as MDX files
in the repository, and the entire public site is pre-rendered at build
time (with ISR available if content needs to update without a full
redeploy).

This is a deliberate choice, not a limitation: nothing in the product
requires dynamic, per-user state, so the simplest architecture that
satisfies the requirements is a static site with a couple of small
serverless functions (contact form).

## Rendering Strategy

- **Next.js 15, App Router, React Server Components by default.**
  Client components (`"use client"`) are used only where interactivity
  requires it: theme toggle, mobile nav sheet, search dialog (Phase 4).
- **Static generation** for all content routes via
  `generateStaticParams`. Blog posts, category pages, tag pages, and
  series pages are all known at build time.
- **Route groups**: `(site)` wraps every public page in a shared
  layout (header, footer, skip link) without adding a URL segment.

## Content Architecture

### The `ContentRepository` abstraction

This is the single most important architectural decision in the
project. Pages and components **never** import `fs`, `gray-matter`, or
any MDX parsing library directly. Instead, everything goes through the
`ContentRepository` interface defined in
`src/lib/content/repository.ts`:

```ts
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
```

Phase 2 ships `FileSystemContentRepository`, which implements this
interface by reading `.mdx` files from `/content` and parsing
frontmatter with `gray-matter`. If a headless CMS (Sanity, Contentful,
Payload, etc.) is introduced later, it becomes a **second
implementation of the same interface** — a new file, not a rewrite.
Every page that currently calls `getAllPosts()` keeps working
unchanged.

### Why gray-matter over Velite

Velite offers build-time Zod validation "for free," but it's another
build-time dependency and abstraction layer to learn and maintain.
Since we're hand-writing the `ContentRepository` interface anyway, we
get equivalent type safety by validating frontmatter against a Zod
schema _inside_ the repository implementation — same guarantees, one
fewer framework dependency, and the validation logic is code we own
and can evolve freely.

### Content types

Defined in `src/types/content.ts`:

- **Post** — an article. Has a category (one), tags (many), and
  optionally belongs to a series with an order.
- **Category** — primary top-level grouping.
- **Tag** — free-form, many-per-post label.
- **Series** — an ordered sequence of posts meant to be read in order
  (e.g. a multi-part walkthrough).
- **Resource** — an entry in the Resource Library (tools, links,
  guides), independent of the blog post content model.

## Styling & Design System

- **Tailwind CSS v4** with CSS-variable-based design tokens
  (`globals.css`), following the shadcn/ui token convention
  (`--background`, `--foreground`, `--primary`, etc.) so light/dark
  theming is a single class swap (`.dark`) rather than duplicated
  utility classes.
- **shadcn/ui** primitives are hand-authored under
  `src/components/ui/` rather than pulled via the CLI, because this
  sandbox's network policy blocks `ui.shadcn.com`. `components.json`
  is configured correctly, so `npx shadcn add <component>` works
  normally in any environment with unrestricted network access (local
  dev, CI, Vercel).
- **Fonts**: Inter (body/UI) and JetBrains Mono (code), loaded via
  `next/font/google` for zero layout shift and automatic
  self-hosting.

## Testing Strategy

- **Vitest + React Testing Library** for unit and component tests —
  fast, jsdom-based, colocated with source in `__tests__/` folders.
- **Playwright** for end-to-end tests in `/e2e` — real browser
  testing across Chromium, WebKit, and a mobile viewport, covering
  navigation, theming, accessibility basics, and (in later phases)
  full user flows like reading a post or submitting the contact form.
- Both are gated in CI before deploy (see `deployment.md`).

## Accessibility

- Skip-to-content link, visible on keyboard focus.
- All interactive shadcn/ui primitives are built on Radix, which
  handles focus trapping, ARIA roles, and keyboard navigation
  correctly out of the box.
- Focus rings are never suppressed (`:focus-visible` styled
  explicitly in `globals.css`).
- Semantic landmarks (`<header>`, `<nav aria-label>`, `<main>`,
  `<footer>`) throughout.

## Future CMS Migration Path

Should the project outgrow file-based MDX (e.g. multiple authors, a
non-technical editor, scheduled publishing UI), the migration path is:

1. Implement a new class satisfying `ContentRepository` backed by the
   chosen CMS's API/SDK.
2. Swap the implementation used at the composition root (wherever
   `ContentRepository` is currently instantiated).
3. No page or component code changes, because none of them depend on
   the content _source_ — only the `Post`/`Category`/`Tag`/`Series`/
   `Resource` types and the repository interface.

This is why the interface was defined in Phase 1, before any actual
MDX parsing existed — the contract had to exist first so Phase 2 is
implemented _against_ it, not the other way around.
