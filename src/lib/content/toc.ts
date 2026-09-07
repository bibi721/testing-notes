import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";
import GithubSlugger from "github-slugger";
import type { Heading, PhrasingContent, Root } from "mdast";

export interface TocEntry {
  id: string;
  text: string;
  depth: 2 | 3;
}

/**
 * Recursively collects the plain text of a heading's inline content.
 * A heading like `## Using \`getByRole\`` has an `inlineCode` child
 * alongside plain text, and `## **Bold** or [linked](url) text` has
 * `strong`/`link` children wrapping their own text - all of these
 * have either a direct `value` (text, inlineCode) or nested
 * `children` (emphasis, strong, link, delete). Only reading direct
 * `text` children (the previous implementation) silently drops
 * everything else, producing a wrong or empty TOC label and a slug
 * that doesn't match what rehype-slug assigns to the rendered heading.
 */
function getPlainText(node: PhrasingContent): string {
  if ("value" in node && typeof node.value === "string") {
    return node.value;
  }
  if ("children" in node && Array.isArray(node.children)) {
    return node.children.map(getPlainText).join("");
  }
  return "";
}

/**
 * Extracts h2/h3 headings from raw MDX source and assigns slugs
 * using the same algorithm rehype-slug uses (github-slugger), so the
 * `id` values generated here exactly match the anchor IDs rehype-slug
 * puts on the rendered headings - TOC links land in the right place
 * without any client-side DOM scanning.
 *
 * h1 is excluded (that's the post title, rendered separately) and
 * h4+ are excluded to keep the TOC readable for a technical blog
 * where deeply nested headings are common in tutorials.
 */
export function extractTableOfContents(rawContent: string): TocEntry[] {
  const tree = unified().use(remarkParse).parse(rawContent) as Root;
  const slugger = new GithubSlugger();
  const entries: TocEntry[] = [];

  visit(tree, "heading", (node: Heading) => {
    if (node.depth !== 2 && node.depth !== 3) return;

    const text = node.children.map(getPlainText).join("");

    if (!text) return;

    entries.push({
      id: slugger.slug(text),
      text,
      depth: node.depth as 2 | 3,
    });
  });

  return entries;
}
