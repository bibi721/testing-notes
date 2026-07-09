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

## Content Components

Not yet built — land in Phase 2 alongside the MDX pipeline:
`PostCard`, `PostHeader`, `TableOfContents`, `RelatedPosts`,
`SeriesNav`, `CategoryBadge`, `TagList`, `ResourceCard`.

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
