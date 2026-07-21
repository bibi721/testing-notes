# Deployment

## Hosting

Deployed to **Vercel**, connected to the GitHub repository for
automatic preview deployments on every PR and production deploys on
merge to `main`.

## CI Pipeline (GitHub Actions)

Defined in `.github/workflows/ci.yml`. Runs on every push and pull
request:

1. **Install** — `pnpm install --frozen-lockfile`
2. **Lint** — `pnpm lint`
3. **Typecheck** — `pnpm typecheck`
4. **Unit/component tests** — `pnpm test`
5. **Build** — `pnpm build` (catches build-time errors, e.g. broken
   MDX frontmatter, before they reach Vercel)
6. **E2E tests** — `pnpm test:e2e` (Playwright, against the production
   build)

All steps must pass before a PR can merge (branch protection should
require this CI check). Vercel's own deploy is a separate step and
only proceeds once the branch is green.

## Environment Variables

Set in Vercel's project settings (Production, Preview, and
Development environments as appropriate). See `.env.example` for the
full list. Never commit `.env.local`.

| Variable                       | Required       | Notes                                              |
| ------------------------------ | -------------- | -------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`         | Yes            | No trailing slash. Used in metadata, sitemap, RSS. |
| `RESEND_API_KEY`               | Yes (Phase 3+) | Contact form email delivery.                       |
| `CONTACT_EMAIL_TO`             | Yes (Phase 3+) | Inbox that receives submissions.                   |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No             | Leave blank to disable analytics.                  |

## Local Development

```bash
pnpm install
cp .env.example .env.local   # fill in real values
pnpm dev
```

## Release Process

1. Merge to `main` after CI passes.
2. Vercel auto-deploys `main` to production.
3. Spot-check the production URL (home page, one blog post, contact
   form) after deploy.

_Playwright browser binaries (`npx playwright install`) must be
present in the CI runner — see the workflow file for the install
step. They are not committed to the repo._
