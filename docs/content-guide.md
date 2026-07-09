# Content Guide

_Full authoring guide lands in Phase 2 once the MDX pipeline exists.
This is a placeholder describing what will be documented._

## Planned Contents

- How to add a new post: file location (`content/posts/*.mdx`),
  required frontmatter fields, slug conventions.
- Frontmatter reference (mirrors `PostFrontmatter` in
  `src/types/content.ts`): `title`, `description`, `date`, `updated`,
  `category`, `tags`, `series`, `seriesOrder`, `coverImage`, `draft`,
  `canonicalUrl`.
- How to add a new category, tag, or series.
- How to add a Resource Library entry.
- MDX authoring conventions: code block language tags, callouts/admonitions,
  image handling, internal linking.
- Draft workflow: `draft: true` excludes a post from production builds
  while remaining previewable locally.
- SEO checklist per post (title/description length, alt text,
  canonical URL for cross-posts) — cross-referenced from `seo.md`.
