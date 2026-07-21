import { z } from "zod";

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
export const postFrontmatterSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z
    .string()
    .min(1, "description is required")
    .max(200, "description should be under ~200 characters for SEO"),
  date: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
    message: "date must be a valid ISO 8601 date string",
  }),
  updated: z
    .string()
    .refine((val) => !Number.isNaN(Date.parse(val)), {
      message: "updated must be a valid ISO 8601 date string",
    })
    .optional(),
  category: z.string().min(1, "category is required"),
  tags: z.array(z.string()).default([]),
  series: z.string().optional(),
  seriesOrder: z.number().int().positive().optional(),
  coverImage: z.string().optional(),
  draft: z.boolean().default(false),
  canonicalUrl: z.string().url().optional(),
});

export type ValidatedPostFrontmatter = z.infer<typeof postFrontmatterSchema>;

export const resourceFrontmatterSchema = z.object({
  title: z.string().min(1, "title is required"),
  description: z.string().min(1, "description is required"),
  url: z.string().url("url must be a valid URL"),
  category: z.string().min(1, "category is required"),
  tags: z.array(z.string()).default([]),
  pricing: z.enum(["free", "paid", "freemium"]).optional(),
  addedDate: z.string().refine((val) => !Number.isNaN(Date.parse(val)), {
    message: "addedDate must be a valid ISO 8601 date string",
  }),
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
