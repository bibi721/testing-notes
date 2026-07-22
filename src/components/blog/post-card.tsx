import Link from "next/link";

import type { Post } from "@/types/content";
import { formatDate, humanize } from "@/lib/format";
import { CategoryBadge } from "./category-badge";

export function PostCard({ post }: { post: Post }) {
  return (
    <article className="group border-border/60 border-b py-6 first:pt-0 last:border-b-0">
      <div className="text-muted-foreground mb-2 flex items-center gap-3 text-xs">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{post.readingTimeMinutes} min read</span>
      </div>

      <h2 className="text-xl font-semibold tracking-tight">
        <Link
          href={`/blog/${post.slug}`}
          className="group-hover:text-muted-foreground transition-colors"
        >
          {post.title}
        </Link>
      </h2>

      <p className="text-muted-foreground mt-2">{post.description}</p>

      <div className="mt-4">
        <CategoryBadge slug={post.category} name={humanize(post.category)} />
      </div>
    </article>
  );
}
