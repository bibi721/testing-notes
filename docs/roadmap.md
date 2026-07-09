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

## Phase 2 — Content Layer (Next)

- [ ] `FileSystemContentRepository`: gray-matter + `next-mdx-remote`
      pipeline implementing `ContentRepository`
- [ ] Zod schema validation for post frontmatter
- [ ] Blog index page (`/blog`) with pagination
- [ ] Single post page (`/blog/[slug]`) with MDX rendering, code
      syntax highlighting, table of contents
- [ ] Category pages (`/category/[slug]`)
- [ ] Tag pages (`/tag/[slug]`)
- [ ] Series pages and in-post series navigation
- [ ] Resource Library data model + listing page (`/resources`)
- [ ] Reading time calculation
- [ ] Related posts logic
- [ ] Seed content (3–5 real posts) to validate the pipeline end to end

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
