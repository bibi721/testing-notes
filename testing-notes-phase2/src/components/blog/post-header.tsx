import type { Post } from "@/types/content";
import { formatDate, humanize } from "@/lib/format";
import { CategoryBadge } from "./category-badge";
import { TagList } from "./tag-list";

export function PostHeader({ post }: { post: Post }) {
  return (
    <header className="mb-8">
      <div className="mb-3">
        <CategoryBadge slug={post.category} name={humanize(post.category)} />
      </div>

      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {post.title}
      </h1>

      <p className="text-muted-foreground mt-3 text-lg">{post.description}</p>

      <div className="text-muted-foreground mt-4 flex flex-wrap items-center gap-3 text-sm">
        <time dateTime={post.date}>Published {formatDate(post.date)}</time>
        {post.updated && (
          <>
            <span aria-hidden="true">·</span>
            <time dateTime={post.updated}>
              Updated {formatDate(post.updated)}
            </time>
          </>
        )}
        <span aria-hidden="true">·</span>
        <span>{post.readingTimeMinutes} min read</span>
      </div>

      <div className="mt-4">
        <TagList tags={post.tags} />
      </div>
    </header>
  );
}
