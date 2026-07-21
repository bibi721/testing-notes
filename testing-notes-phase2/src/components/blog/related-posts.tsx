import Link from "next/link";

import type { Post } from "@/types/content";

export function RelatedPosts({ posts }: { posts: Post[] }) {
  if (posts.length === 0) return null;

  return (
    <section aria-labelledby="related-posts-heading">
      <h2
        id="related-posts-heading"
        className="text-lg font-semibold tracking-tight"
      >
        Related posts
      </h2>
      <ul className="mt-4 space-y-3">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
