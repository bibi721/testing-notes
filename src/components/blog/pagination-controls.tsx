import Link from "next/link";

import type { PaginationInfo } from "@/lib/pagination";
import { Button } from "@/components/ui/button";

export function PaginationControls({
  pagination,
  basePath,
}: {
  pagination: PaginationInfo;
  basePath: string;
}) {
  const { currentPage, totalPages, hasNextPage, hasPreviousPage } = pagination;

  if (totalPages <= 1) return null;

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 flex items-center justify-between"
    >
      <Button variant="outline" size="sm" asChild disabled={!hasPreviousPage}>
        {hasPreviousPage ? (
          <Link
            href={
              currentPage - 1 === 1
                ? basePath
                : `${basePath}?page=${currentPage - 1}`
            }
          >
            Previous
          </Link>
        ) : (
          <span aria-disabled="true">Previous</span>
        )}
      </Button>

      <p className="text-muted-foreground text-sm">
        Page {currentPage} of {totalPages}
      </p>

      <Button variant="outline" size="sm" asChild disabled={!hasNextPage}>
        {hasNextPage ? (
          <Link href={`${basePath}?page=${currentPage + 1}`}>Next</Link>
        ) : (
          <span aria-disabled="true">Next</span>
        )}
      </Button>
    </nav>
  );
}
