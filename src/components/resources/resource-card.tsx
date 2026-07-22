import type { Resource } from "@/types/content";
import { humanize } from "@/lib/format";
import { CategoryBadge } from "@/components/blog/category-badge";
import { TagList } from "@/components/blog/tag-list";

const PRICING_LABEL: Record<NonNullable<Resource["pricing"]>, string> = {
  free: "Free",
  paid: "Paid",
  freemium: "Freemium",
};

export function ResourceCard({ resource }: { resource: Resource }) {
  return (
    <article className="border-border rounded-lg border p-5">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-semibold tracking-tight">
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            {resource.title}
          </a>
        </h3>
        {resource.pricing && (
          <span className="bg-muted text-muted-foreground shrink-0 rounded-full px-2 py-0.5 text-xs font-medium">
            {PRICING_LABEL[resource.pricing]}
          </span>
        )}
      </div>

      <p className="text-muted-foreground mt-2 text-sm">
        {resource.description}
      </p>

      <div className="mt-4 flex items-center justify-between gap-3">
        <CategoryBadge
          slug={resource.category}
          name={humanize(resource.category)}
        />
        <TagList tags={resource.tags} />
      </div>
    </article>
  );
}
