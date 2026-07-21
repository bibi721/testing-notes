import Link from "next/link";

import { contentRepository } from "@/lib/content";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/blog/post-card";

const LATEST_POSTS_COUNT = 5;

export default async function HomePage() {
  const posts = await contentRepository.getAllPosts();
  const latestPosts = posts.slice(0, LATEST_POSTS_COUNT);

  return (
    <>
      <section className="mx-auto max-w-3xl px-4 py-20 sm:py-28">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          {siteConfig.name}
        </h1>
        <p className="text-muted-foreground mt-4 max-w-2xl text-lg">
          {siteConfig.description}
        </p>
        <div className="mt-8 flex gap-3">
          <Button asChild>
            <Link href="/blog">Read the blog</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/resources">Browse resources</Link>
          </Button>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 pb-20">
        <div className="flex items-baseline justify-between">
          <h2 className="text-xl font-semibold tracking-tight">Latest posts</h2>
          <Link
            href="/blog"
            className="text-muted-foreground hover:text-foreground text-sm"
          >
            View all
          </Link>
        </div>

        <div className="mt-6">
          {latestPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
