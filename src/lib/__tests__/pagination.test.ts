import { describe, expect, it } from "vitest";
import { paginate } from "@/lib/pagination";

describe("paginate", () => {
  const items = Array.from({ length: 20 }, (_, i) => i + 1);

  it("returns the correct slice for the first page", () => {
    const { pageItems } = paginate(items, 1, 8);
    expect(pageItems).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("returns the correct slice for a middle page", () => {
    const { pageItems } = paginate(items, 2, 8);
    expect(pageItems).toEqual([9, 10, 11, 12, 13, 14, 15, 16]);
  });

  it("returns a partial last page", () => {
    const { pageItems } = paginate(items, 3, 8);
    expect(pageItems).toEqual([17, 18, 19, 20]);
  });

  it("computes pagination metadata correctly", () => {
    const { pagination } = paginate(items, 2, 8);
    expect(pagination).toEqual({
      currentPage: 2,
      totalPages: 3,
      hasNextPage: true,
      hasPreviousPage: true,
    });
  });

  it("clamps a page number below 1 to page 1", () => {
    const { pagination } = paginate(items, 0, 8);
    expect(pagination.currentPage).toBe(1);
  });

  it("clamps a page number beyond the last page to the last page", () => {
    const { pagination } = paginate(items, 99, 8);
    expect(pagination.currentPage).toBe(3);
  });

  it("handles an empty item list without erroring", () => {
    const { pageItems, pagination } = paginate([], 1, 8);
    expect(pageItems).toEqual([]);
    expect(pagination).toEqual({
      currentPage: 1,
      totalPages: 1,
      hasNextPage: false,
      hasPreviousPage: false,
    });
  });
});
