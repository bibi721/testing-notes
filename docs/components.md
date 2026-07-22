# Components

This document is a living inventory of components as they're built.
Updated at the end of each phase.

## Layout (`src/components/layout/`)

| Component | Purpose                                                                                                         |
| --------- | --------------------------------------------------------------------------------------------------------------- |
| `Header`  | Sticky site header. Desktop nav, mobile Sheet-based nav, theme toggle. Active-link detection via `usePathname`. |
| `Footer`  | Site footer with legal links, RSS link, and social icons.                                                       |

## Shared (`src/components/shared/`)

| Component       | Purpose                                                                                          |
| --------------- | ------------------------------------------------------------------------------------------------ |
| `ThemeProvider` | Wraps `next-themes`; applies theme via `class` on `<html>`.                                      |
| `ThemeToggle`   | Dropdown (Light / Dark / System). Hydration-safe — renders a disabled placeholder until mounted. |

## UI Primitives (`src/components/ui/`)

Hand-authored shadcn/ui components (see `docs/architecture.md` for
why). Each matches the standard shadcn output so `npx shadcn add`
continues to work for any future primitive.

| Component      | Built on                        | Used by                               |
| -------------- | ------------------------------- | ------------------------------------- |
| `Button`       | `@radix-ui/react-slot`, `cva`   | Everywhere                            |
| `DropdownMenu` | `@radix-ui/react-dropdown-menu` | `ThemeToggle`                         |
| `Sheet`        | `@radix-ui/react-dialog`        | `Header` (mobile nav)                 |
| `Separator`    | `@radix-ui/react-separator`     | Reserved for content pages (Phase 2+) |

## Content Components (`src/components/blog/`)

| Component            | Purpose                                                                                                                           |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `PostCard`           | Summary card (title, date, reading time, description, category badge) used on the blog index, home page, and every taxonomy page. |
| `PostHeader`         | Full post metadata block on the post detail page: title, description, dates, reading time, tags.                                  |
| `MdxContent`         | Renders a post's compiled MDX body via `next-mdx-remote/rsc`, wrapped in `@tailwindcss/typography`'s `.prose` styling.            |
| `TableOfContents`    | Renders headings extracted server-side by `lib/content/toc.ts` as anchor links.                                                   |
| `SeriesNav`          | In-post navigation showing all parts of a series and the reader's current position.                                               |
| `RelatedPosts`       | Links to posts scored by shared category/tags (`getRelatedPosts` in the repository).                                              |
| `CategoryBadge`      | Small pill linking to a category page. Used by `PostCard`, `PostHeader`, `ResourceCard`.                                          |
| `TagList`            | List of `#tag` links to tag pages.                                                                                                |
| `PaginationControls` | Previous/Next controls for the paginated blog index.                                                                              |
| `TaxonomyPostList`   | Shared list layout for category, tag, and series pages (eyebrow label + title + post list).                                       |

## Resource Components (`src/components/resources/`)

| Component      | Purpose                                                                                                |
| -------------- | ------------------------------------------------------------------------------------------------------ |
| `ResourceCard` | Entry in the Resource Library grid: title (external link), description, pricing badge, category, tags. |

## Conventions

- One component per file, named exports (not default), matching
  shadcn/ui convention for the `ui/` folder.
- Client components are marked `"use client"` only when they need
  interactivity (state, effects, event handlers, browser APIs) —
  everything else stays a Server Component by default.
- Components consume `cn()` from `@/lib/utils` for conditional/merged
  class names, never manual string concatenation.
- Accessibility is not optional: every interactive component needs an
  accessible name (visible text or `aria-label`) and correct
  keyboard behavior, verified by a component or e2e test.
