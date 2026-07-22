import type { Metadata } from "next";

import { contentRepository } from "@/lib/content";
import { ResourceCard } from "@/components/resources/resource-card";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "A growing library of tools, communities, and references for software testers.",
};

export default async function ResourcesPage() {
  const resources = await contentRepository.getAllResources();

  return (
    <section className="mx-auto max-w-4xl px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">
        Resource Library
      </h1>
      <p className="text-muted-foreground mt-2">
        {resources.length} tools, communities, and references worth knowing
        about — added to as I find them.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {resources.map((resource) => (
          <ResourceCard key={resource.slug} resource={resource} />
        ))}
      </div>
    </section>
  );
}
