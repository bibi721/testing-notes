import { unified } from "unified";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";
import GithubSlugger from "github-slugger";
import type { Heading, Root, Text } from "mdast";

export interface TocEntry {
  id: string;
  text: string;
  depth: 2 | 3;
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

    const text = node.children
      .filter((child): child is Text => child.type === "text")
      .map((child) => child.value)
      .join("");

    if (!text) return;

    entries.push({
      id: slugger.slug(text),
      text,
      depth: node.depth as 2 | 3,
    });
  });

  return entries;
}
