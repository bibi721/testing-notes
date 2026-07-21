# Content Guide

## Adding a new post

Create a new `.mdx` file in `content/posts/`. The filename (minus
`.mdx`) becomes the URL slug, e.g. `content/posts/my-post.mdx` →
`/blog/my-post`.

```mdx
---
title: "Your Post Title"
description: "One or two sentences, under 200 characters."
date: "2026-03-01"
category: "manual-testing"
tags: ["testing-fundamentals"]
---

Your MDX content starts here.

## A Section Heading

Regular Markdown, plus tables, code blocks, and task lists via GFM.
```

The build validates frontmatter against a Zod schema
(`src/lib/content/schema.ts`) and fails with a clear error naming the
file and field if something's wrong — invalid dates, a missing title,
a description over 200 characters, etc.

## Frontmatter reference

| Field          | Required | Notes                                                                                                                                         |
| -------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `title`        | Yes      |                                                                                                                                               |
| `description`  | Yes      | Under ~200 characters — used for SEO meta description and post cards.                                                                         |
| `date`         | Yes      | ISO 8601, e.g. `"2026-03-01"`.                                                                                                                |
| `updated`      | No       | ISO 8601. Set when meaningfully revising a published post.                                                                                    |
| `category`     | Yes      | A single slug, e.g. `"api-testing"`. New categories need no separate registration — they're derived automatically from posts that use them.   |
| `tags`         | No       | Array of slugs. Same auto-derivation as categories.                                                                                           |
| `series`       | No       | Slug grouping posts into an ordered series.                                                                                                   |
| `seriesOrder`  | No       | Required if `series` is set — 1-indexed position.                                                                                             |
| `coverImage`   | No       | Path under `/public`.                                                                                                                         |
| `draft`        | No       | Defaults to `false`. `true` excludes the post from `getAllPosts()` by default (still viewable via `getPostBySlug` for local preview tooling). |
| `canonicalUrl` | No       | Full URL, for cross-posted content.                                                                                                           |

## Adding a category, tag, or series

Nothing to register separately — `getAllCategories()`,
`getAllTags()`, and `getAllSeries()` derive their lists directly from
whatever posts currently reference them. Use consistent slugs (lowercase,
hyphenated) across posts meant to share a taxonomy entry.

For a **series**, every post that's part of it needs both `series`
(the same slug on every part) and `seriesOrder` (1, 2, 3, ...). The
in-post `SeriesNav` component and the `/series/[slug]` page both read
from `getPostsBySeries()`, which sorts by `seriesOrder` automatically.

## Adding a Resource Library entry

Create a `.mdx` file in `content/resources/`. No body content is
needed — resources are frontmatter-only:

```mdx
---
title: "Tool Name"
description: "One sentence on what it is and why it's useful."
url: "https://example.com"
category: "test-automation"
tags: ["playwright"]
pricing: "free"
addedDate: "2026-03-01"
---
```

`pricing` is one of `"free"`, `"paid"`, or `"freemium"`.

## MDX authoring notes

- **Code blocks**: fence with a language tag (` ```ts `, ` ```bash `,
  etc.) for syntax highlighting. Highlighting is applied at build
  time (Shiki via `rehype-pretty-code`) — no client-side JS cost.
- **Headings**: use `##` and `###` (h2/h3). These automatically get
  anchor IDs and appear in the post's table of contents. `#` (h1) is
  reserved for the post title itself — don't use it in the body.
- **Tables, strikethrough, task lists**: supported via GitHub
  Flavored Markdown (`remark-gfm`).
- **Internal links**: use relative paths, e.g.
  `[Part 2](/blog/other-post-slug)`.
- **Draft workflow**: set `draft: true` while writing. The post is
  excluded from `getAllPosts()` (and therefore the blog index,
  category/tag/series pages, and the sitemap once that lands in
  Phase 3) but still resolves at its direct URL for local review.

## SEO checklist per post

See `docs/seo.md` for the full strategy. Per post:

- `title`: specific and under ~60 characters where possible (avoids
  truncation in search results).
- `description`: the actual meta description — write it for a reader
  in a search results page, not as a generic summary.
- Add a `canonicalUrl` if the post is also published elsewhere.
- If a `coverImage` is set, it needs to exist under `/public` with a
  reasonable file size (SEO and Core Web Vitals both care about
  image weight).
