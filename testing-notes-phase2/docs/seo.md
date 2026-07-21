# SEO

_Implementation lands in Phase 3. This document tracks the plan and
will be updated with specifics as each piece ships._

## Strategy

Testing Notes is a content site — organic search is the primary
acquisition channel, so SEO is treated as a first-class requirement,
not an afterthought bolted on before launch.

## Planned Implementation (Phase 3)

- **Metadata API** — every route exports proper `title`, `description`,
  Open Graph, and Twitter Card metadata via Next.js's `generateMetadata`.
  Site-wide defaults live in `src/config/site.ts`; pages override as
  needed.
- **Structured data (JSON-LD)** — `Article` schema on posts (headline,
  datePublished, dateModified, author), `BreadcrumbList` on category/
  tag/series pages, `WebSite` schema with `SearchAction` on the home
  page.
- **Sitemap** — `src/app/sitemap.ts`, generated from the
  `ContentRepository`, covering all posts, categories, tags, series,
  and static pages.
- **Robots** — `src/app/robots.ts`, allowing all crawlers, pointing to
  the sitemap.
- **RSS feed** — `/rss.xml`, generated from the latest posts.
- **Canonical URLs** — every post supports an optional
  `canonicalUrl` frontmatter field for cross-posted content.
- **Semantic HTML** — proper heading hierarchy (single `h1` per page),
  `<article>` for post content, `<time dateTime>` for dates.
- **Image optimization** — `next/image` throughout; cover images
  require descriptive `alt` text in frontmatter validation.
- **Performance as SEO** — Core Web Vitals directly affect ranking;
  see the performance checklist in Phase 4 notes.

## Content Guidelines for SEO

Covered in `docs/content-guide.md` once written (Phase 2): frontmatter
requirements (title length, meta description length), internal linking
between related posts/series, and heading structure conventions.
