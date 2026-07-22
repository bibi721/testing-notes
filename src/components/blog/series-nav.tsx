import Link from "next/link";

import type { Post, Series } from "@/types/content";
import { cn } from "@/lib/utils";

export function SeriesNav({
  series,
  posts,
  currentSlug,
}: {
  series: Series;
  posts: Post[];
  currentSlug: string;
}) {
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug);

  return (
    <aside className="border-border bg-secondary/40 rounded-lg border p-4">
      <p className="text-sm font-medium">
        Part of the{" "}
        <Link href={`/series/${series.slug}`} className="underline">
          {series.name}
        </Link>{" "}
        series
      </p>
      <ol className="mt-3 space-y-2">
        {posts.map((post, index) => {
          const isCurrent = post.slug === currentSlug;
          return (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                aria-current={isCurrent ? "page" : undefined}
                className={cn(
                  "hover:text-foreground flex items-start gap-2 text-sm transition-colors",
                  isCurrent
                    ? "text-foreground font-medium"
                    : "text-muted-foreground"
                )}
              >
                <span className="mt-0.5 shrink-0 tabular-nums">
                  {index + 1}.
                </span>
                <span>{post.title}</span>
              </Link>
            </li>
          );
        })}
      </ol>
      {currentIndex >= 0 && (
        <p className="text-muted-foreground mt-3 text-xs">
          Part {currentIndex + 1} of {posts.length}
        </p>
      )}
    </aside>
  );
}
