import Link from "next/link";

import { cn } from "@/lib/utils";

const badgeClassName =
  "bg-secondary text-secondary-foreground inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";

export function CategoryBadge({
  slug,
  name,
  linked = true,
  className,
}: {
  slug: string;
  name: string;
  /** Set to false when no post uses this category - rendering a link
   *  would point at a page with zero posts, which 404s. */
  linked?: boolean;
  className?: string;
}) {
  if (!linked) {
    return <span className={cn(badgeClassName, className)}>{name}</span>;
  }

  return (
    <Link
      href={`/category/${slug}`}
      className={cn(
        badgeClassName,
        "hover:bg-secondary/80 transition-colors",
        className
      )}
    >
      {name}
    </Link>
  );
}
