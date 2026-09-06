/** Formats an ISO date string for display, e.g. "January 12, 2026".
 *  Frontmatter dates are date-only ("2026-01-19"), which `new Date()`
 *  parses as UTC midnight. Formatting with the local timezone (the
 *  previous behavior) rolls that back to the previous calendar day for
 *  any reader west of UTC. Forcing `timeZone: "UTC"` in the formatter
 *  keeps the displayed date matching exactly what the author wrote,
 *  regardless of where the post is viewed from. */
export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

/** Turns a taxonomy slug into a readable display name.
 *  e.g. "test-automation" -> "Test Automation" */
export function humanize(slug: string): string {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
