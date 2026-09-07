import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { contentRepository } from "@/lib/content";
import { extractTableOfContents } from "@/lib/content/toc";
import { PostHeader } from "@/components/blog/post-header";
import { MdxContent } from "@/components/blog/mdx-content";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { SeriesNav } from "@/components/blog/series-nav";
import { RelatedPosts } from "@/components/blog/related-posts";

export async function generateStaticParams() {
  const posts = await contentRepository.getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await contentRepository.getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: post.canonicalUrl
      ? { canonical: post.canonicalUrl }
      : undefined,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await contentRepository.getPostBySlug(slug);

  // Drafts are excluded from generateStaticParams and getAllPosts()
  // by default, but getPostBySlug() still resolves them directly so
  // they can be reviewed locally before publishing. Only block that
  // direct access in production - blocking it in dev too would make
  // the documented draft preview workflow impossible.
  const isDraftBlocked = post?.draft && process.env.NODE_ENV === "production";

  if (!post || isDraftBlocked) {
    notFound();
  }

  const toc = extractTableOfContents(post.content);
  const relatedPosts = await contentRepository.getRelatedPosts(post);
  const seriesPosts = post.series
    ? await contentRepository.getPostsBySeries(post.series)
    : [];
  const seriesInfo = post.series
    ? (await contentRepository.getAllSeries()).find(
        (series) => series.slug === post.series
      )
    : undefined;

  return (
    <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-4 py-16 lg:grid-cols-[minmax(0,1fr)_240px]">
      <article className="min-w-0">
        <PostHeader post={post} />

        {seriesInfo && (
          <div className="mb-8">
            <SeriesNav
              series={seriesInfo}
              posts={seriesPosts}
              currentSlug={post.slug}
            />
          </div>
        )}

        <MdxContent source={post.content} />

        <div className="border-border mt-12 border-t pt-8">
          <RelatedPosts posts={relatedPosts} />
        </div>
      </article>

      <aside className="hidden lg:block">
        <div className="sticky top-20">
          <TableOfContents entries={toc} />
        </div>
      </aside>
    </div>
  );
}
