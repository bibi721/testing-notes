import type { Metadata } from "next";

import { contentRepository } from "@/lib/content";
import { paginate } from "@/lib/pagination";
import { PostCard } from "@/components/blog/post-card";
import { PaginationControls } from "@/components/blog/pagination-controls";

export const metadata: Metadata = {
  title: "Blog",
  description: "All posts on manual testing, automation, APIs, and QA careers.",
};

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page } = await searchParams;
  const posts = await contentRepository.getAllPosts();
  const { pageItems, pagination } = paginate(posts, Number(page) || 1);

  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Blog</h1>
      <p className="text-muted-foreground mt-2">
        {posts.length} post{posts.length === 1 ? "" : "s"} on manual testing,
        automation, APIs, and QA careers.
      </p>

      <div className="mt-10">
        {pageItems.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>

      <PaginationControls pagination={pagination} basePath="/blog" />
    </section>
  );
}
