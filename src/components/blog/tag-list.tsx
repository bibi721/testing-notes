import Link from "next/link";

export function TagList({
  tags,
  validTags,
}: {
  tags: string[];
  /** When provided, only tags in this set are rendered as links -
   *  others render as plain text. Omit to always link (post pages,
   *  where every tag necessarily belongs to at least the post itself). */
  validTags?: Set<string>;
}) {
  if (tags.length === 0) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const isLinkable = !validTags || validTags.has(tag);
        return (
          <li key={tag}>
            {isLinkable ? (
              <Link
                href={`/tag/${tag}`}
                className="text-muted-foreground hover:text-foreground text-xs transition-colors"
              >
                #{tag}
              </Link>
            ) : (
              <span className="text-muted-foreground text-xs">#{tag}</span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
