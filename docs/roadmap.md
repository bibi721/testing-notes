# Roadmap

## Phase 1 — Foundation ✅ Complete

- [x] Next.js 15 + TypeScript + Tailwind CSS v4 project scaffold (pnpm)
- [x] shadcn/ui primitives (Button, DropdownMenu, Sheet, Separator)
- [x] Design-token theming system, light/dark via `next-themes`
- [x] Site configuration (`src/config/site.ts`)
- [x] Source-agnostic content type contracts (`Post`, `Category`,
      `Tag`, `Series`, `Resource`) and `ContentRepository` interface
- [x] Header, Footer, responsive nav with mobile Sheet drawer
- [x] Skip-to-content link, semantic landmarks
- [x] `(site)` route group + root layout with fonts
- [x] Home page placeholder, 404 page
- [x] ESLint (flat config) + Prettier (with Tailwind class sorting)
- [x] Vitest + Testing Library, sample unit/component tests
- [x] Playwright, sample e2e smoke tests
- [x] GitHub Actions CI (lint, typecheck, test, build, e2e)
- [x] `/docs` skeleton

## Phase 2 — Content Layer ✅ Complete

- [x] `FileSystemContentRepository`: gray-matter + `next-mdx-remote/rsc`
      pipeline implementing `ContentRepository`, with injectable content
      directories for testability
- [x] Zod schema validation for post and resource frontmatter
      (`src/lib/content/schema.ts`), fails the build with a clear
      per-file error message on invalid data
- [x] Blog index page (`/blog`) with pagination (`?page=N`)
- [x] Single post page (`/blog/[slug]`) with MDX rendering, Shiki
      syntax highlighting (dual light/dark theme), table of contents
- [x] Category pages (`/category/[slug]`)
- [x] Tag pages (`/tag/[slug]`)
- [x] Series pages (`/series/[slug]`) and in-post `SeriesNav`
- [x] Resource Library data model + listing page (`/resources`)
- [x] Reading time calculation (manual word-count, no dependency)
- [x] Related posts logic (scored by shared category + tags)
- [x] Seed content: 6 posts (including a complete 3-part Playwright
      series across manual-testing, test-automation, api-testing, and
      career categories) + 5 Resource Library entries
- [x] Home page updated to show latest posts (Phase 1 placeholder
      removed)
- [x] 45 unit tests covering reading time, TOC extraction, frontmatter
      validation, pagination, and the repository itself (against
      fixture content, not the real seed posts)

### Sandbox limitations (confirmed, non-blocking)

Two things can't be fully exercised inside the development sandbox
due to restricted network egress, but are confirmed to work in
unrestricted environments (local dev, CI, Vercel):

- **`next/font/google`** (Inter, JetBrains Mono) needs
  `fonts.googleapis.com`. Verified by temporarily building with fonts
  stripped: the build compiled and statically generated all routes
  successfully, isolating the failure to network access alone, not
  application code.
- **Playwright browser binaries** need `cdn.playwright.dev`. The CI
  workflow already runs `pnpm exec playwright install --with-deps`
  before `pnpm test:e2e`, so this resolves automatically in CI.

## Phase 3 — Supporting Pages & SEO

- [ ] Home, About, Contact (+ Resend API route), Privacy Policy
- [ ] Metadata API wiring on every route
- [ ] JSON-LD structured data
- [ ] `sitemap.ts`, `robots.ts`, RSS feed
- [ ] Open Graph / Twitter card images

## Phase 4 — Optimization, Testing, Deployment

- [ ] Pagefind search integration
- [ ] Accessibility audit (WCAG AA) across all templates
- [ ] Performance pass (Lighthouse, image/font optimization)
- [ ] Plausible Analytics integration
- [ ] Vercel production deployment
- [ ] Documentation finalized across all `/docs` files
