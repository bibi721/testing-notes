const WORDS_PER_MINUTE = 200;

/**
 * Estimates reading time from raw MDX source. Strips code blocks and
 * frontmatter delimiters first, since code isn't read at prose speed
 * and would otherwise inflate the estimate.
 */
export function calculateReadingTime(rawContent: string): number {
  const withoutCodeBlocks = rawContent.replace(/```[\s\S]*?```/g, "");
  const withoutInlineCode = withoutCodeBlocks.replace(/`[^`]*`/g, "");
  const wordCount = withoutInlineCode
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}
