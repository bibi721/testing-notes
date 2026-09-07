import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { contentRepository } from "@/lib/content";
import { humanize } from "@/lib/format";
import { TaxonomyPostList } from "@/components/blog/taxonomy-post-list";

export async function generateStaticParams() {
  const tags = await contentRepository.getAllTags();
  return tags.map((tag) => ({ slug: tag.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: `#${slug} — Tag` };
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await contentRepository.getPostsByTag(slug);

  if (posts.length === 0) notFound();

  return (
    <TaxonomyPostList
      eyebrow="Tag"
      title={`#${humanize(slug).toLowerCase()}`}
      posts={posts}
    />
  );
}
