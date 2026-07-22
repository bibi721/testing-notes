/** Formats an ISO date string for display, e.g. "January 12, 2026". */
export function formatDate(isoDate: string): string {
  return new Date(isoDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
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
