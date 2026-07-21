import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { contentRepository } from "@/lib/content";
import { humanize } from "@/lib/format";
import { TaxonomyPostList } from "@/components/blog/taxonomy-post-list";

export async function generateStaticParams() {
  const categories = await contentRepository.getAllCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${humanize(slug)} — Category` };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await contentRepository.getPostsByCategory(slug);

  if (posts.length === 0) notFound();

  return (
    <TaxonomyPostList eyebrow="Category" title={humanize(slug)} posts={posts} />
  );
}
