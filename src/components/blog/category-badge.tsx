import Link from "next/link";

import { cn } from "@/lib/utils";

export function CategoryBadge({
  slug,
  name,
  className,
}: {
  slug: string;
  name: string;
  className?: string;
}) {
  return (
    <Link
      href={`/category/${slug}`}
      className={cn(
        "bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
        className
      )}
    >
      {name}
    </Link>
  );
}
