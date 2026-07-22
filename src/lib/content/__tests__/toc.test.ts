import { describe, expect, it } from "vitest";
import { extractTableOfContents } from "@/lib/content/toc";

describe("extractTableOfContents", () => {
  it("extracts h2 and h3 headings in document order", () => {
    const content = `
# Post Title

Some intro text.

## First Section

Content.

### A Subsection

More content.

## Second Section
`;
    const toc = extractTableOfContents(content);

    expect(toc).toEqual([
      { id: "first-section", text: "First Section", depth: 2 },
      { id: "a-subsection", text: "A Subsection", depth: 3 },
      { id: "second-section", text: "Second Section", depth: 2 },
    ]);
  });

  it("excludes h1 and h4+ headings", () => {
    const content = `
# Title

## Included

#### Not included
`;
    const toc = extractTableOfContents(content);

    expect(toc).toHaveLength(1);
    expect(toc[0].text).toBe("Included");
  });

  it("de-duplicates slugs for repeated heading text, matching github-slugger", () => {
    const content = `
## Overview

## Overview
`;
    const toc = extractTableOfContents(content);

    expect(toc[0].id).toBe("overview");
    expect(toc[1].id).toBe("overview-1");
  });

  it("returns an empty array for content with no headings", () => {
    expect(extractTableOfContents("Just plain prose.")).toEqual([]);
  });
});
