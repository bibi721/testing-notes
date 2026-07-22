import type { Post } from "@/types/content";
import { PostCard } from "@/components/blog/post-card";

export function TaxonomyPostList({
  eyebrow,
  title,
  posts,
}: {
  eyebrow: string;
  title: string;
  posts: Post[];
}) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-muted-foreground text-sm font-medium">{eyebrow}</p>
      <h1 className="mt-1 text-3xl font-semibold tracking-tight">{title}</h1>
      <p className="text-muted-foreground mt-2">
        {posts.length} post{posts.length === 1 ? "" : "s"}
      </p>

      <div className="mt-10">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </section>
  );
}
