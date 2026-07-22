export const POSTS_PER_PAGE = 8;

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export function paginate<T>(
  items: T[],
  page: number,
  perPage: number = POSTS_PER_PAGE
): { pageItems: T[]; pagination: PaginationInfo } {
  const totalPages = Math.max(1, Math.ceil(items.length / perPage));
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const start = (currentPage - 1) * perPage;

  return {
    pageItems: items.slice(start, start + perPage),
    pagination: {
      currentPage,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    },
  };
}
