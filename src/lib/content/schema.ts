import { z } from "zod";

/**
 * `Date.parse` is too lenient for frontmatter validation: it silently
 * normalizes impossible calendar dates instead of rejecting them -
 * e.g. `Date.parse("2026-02-30")` succeeds and produces March 2nd.
 * For date-only strings (the format every date field in this project
 * uses), this checks the parsed UTC year/month/day actually match
 * what was written, catching a typo'd date before it publishes under
 * the wrong day.
 */
function isValidCalendarDate(value: string): boolean {
  if (Number.isNaN(Date.parse(value))) return false;

  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return true; // Not a plain date-only string; trust Date.parse.

  const [, year, month, day] = match;
  const date = new Date(value);
  return (
    date.getUTCFullYear() === Number(year) &&
    date.getUTCMonth() + 1 === Number(month) &&
    date.getUTCDate() === Number(day)
  );
}

const isoDateString = (message: string) =>
  z.string().refine(isValidCalendarDate, { message });

/**
 * Runtime validation for post frontmatter. This is the equivalent
 * safety net Velite would have given us via its build-time schema,
 * but owned as plain code we can evolve without a framework
 * dependency (see docs/architecture.md for the full rationale).
 *
 * A broken frontmatter field fails the build with a clear message
 * naming the file and field, rather than surfacing as a confusing
 * runtime error or silent `undefined` deep in a page component.
 */
export const postFrontmatterSchema = z
  .object({
    title: z.string().min(1, "title is required"),
    description: z
      .string()
      .min(1, "description is required")
      .max(200, "description should be under ~200 characters for SEO"),
    date: isoDateString("date must be a valid ISO 8601 calendar date"),
    updated: isoDateString(
      "updated must be a valid ISO 8601 calendar date"
    ).optional(),
    category: z.string().min(1, "category is required"),
    tags: z.array(z.string()).default([]),
    series: z.string().optional(),
    seriesOrder: z.number().int().positive().optional(),
    coverImage: z.string().optional(),
    draft: z.boolean().default(false),
    canonicalUrl: z.string().url().optional(),
  })
  .refine((data) => !data.series || data.seriesOrder !== undefined, {
    message: "seriesOrder is required whenever series is set",
    path: ["seriesOrder"],
  });

export type ValidatedPostFrontmatter = z.infer<typeof postFrontmatterSchema>;

export const resourceFrontmatterSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  url: z.string().url("url must be a valid URL"),
  category: z.string().min(1, "category is required"),
  tags: z.array(z.string()).default([]),
  pricing: z.enum(["free", "paid", "freemium"]).optional(),
  addedDate: isoDateString("addedDate must be a valid ISO 8601 calendar date"),
});

export type ValidatedResourceFrontmatter = z.infer<
  typeof resourceFrontmatterSchema
>;

/**
 * Validates frontmatter and throws a descriptive error identifying
 * the source file if validation fails - surfaced at build time.
 */
export function parseFrontmatter<T extends z.ZodTypeAny>(
  schema: T,
  data: unknown,
  filePath: string
): z.infer<T> {
  const result = schema.safeParse(data);
  if (!result.success) {
    const issues = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(
      `Invalid frontmatter in ${filePath}:\n${issues}\n\nFix the frontmatter in this file before building.`
    );
  }
  return result.data;
}
