import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { contentRepository } from "@/lib/content";
import { humanize } from "@/lib/format";
import { TaxonomyPostList } from "@/components/blog/taxonomy-post-list";

export async function generateStaticParams() {
  const series = await contentRepository.getAllSeries();
  return series.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: `${humanize(slug)} — Series` };
}

export default async function SeriesPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const posts = await contentRepository.getPostsBySeries(slug);

  if (posts.length === 0) notFound();

  return (
    <TaxonomyPostList eyebrow="Series" title={humanize(slug)} posts={posts} />
  );
}
