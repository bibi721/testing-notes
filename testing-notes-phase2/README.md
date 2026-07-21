# Testing Notes

A personal software testing learning journey blog. Content-first,
minimal, fast, and built to grow — see [`docs/`](./docs) for full
architecture, component, deployment, SEO, content, and roadmap
documentation.

## Tech Stack

Next.js 15 · TypeScript · Tailwind CSS · shadcn/ui · Lucide · MDX ·
Pagefind · Resend · Vitest · Playwright · pnpm · Vercel

## Getting Started

```bash
pnpm install
cp .env.example .env.local   # fill in real values
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script                               | Purpose                          |
| ------------------------------------ | -------------------------------- |
| `pnpm dev`                           | Start the dev server (Turbopack) |
| `pnpm build`                         | Production build                 |
| `pnpm start`                         | Serve the production build       |
| `pnpm lint` / `pnpm lint:fix`        | ESLint                           |
| `pnpm typecheck`                     | `tsc --noEmit`                   |
| `pnpm format` / `pnpm format:check`  | Prettier                         |
| `pnpm test` / `pnpm test:watch`      | Vitest unit/component tests      |
| `pnpm test:coverage`                 | Vitest with coverage report      |
| `pnpm test:e2e` / `pnpm test:e2e:ui` | Playwright e2e tests             |

## Project Structure

```
content/          MDX content (posts, resources) - added in Phase 2
src/
  app/            Next.js App Router routes
  components/     UI (shadcn primitives), layout, shared components
  config/         Site-wide configuration (nav, metadata defaults)
  lib/            Content repository, utilities
  types/          Shared TypeScript contracts
docs/             Architecture, components, deployment, SEO, content,
                  and roadmap documentation
e2e/              Playwright end-to-end tests
```

See [`docs/architecture.md`](./docs/architecture.md) for the full
rationale behind these decisions, especially the `ContentRepository`
abstraction that keeps the content source swappable.

## CI/CD

GitHub Actions runs lint, typecheck, unit tests, a production build,
and Playwright e2e tests on every push and pull request. See
[`.github/workflows/ci.yml`](./.github/workflows/ci.yml) and
[`docs/deployment.md`](./docs/deployment.md).

## Status

Currently in **Phase 1 (Foundation)** — see
[`docs/roadmap.md`](./docs/roadmap.md) for progress and what's next.
