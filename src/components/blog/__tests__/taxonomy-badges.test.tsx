import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";

import { CategoryBadge } from "@/components/blog/category-badge";
import { TagList } from "@/components/blog/tag-list";

describe("CategoryBadge", () => {
  it("renders as a link by default", () => {
    render(<CategoryBadge slug="test-automation" name="Test Automation" />);
    const link = screen.getByRole("link", { name: "Test Automation" });
    expect(link).toHaveAttribute("href", "/category/test-automation");
  });

  it("renders as plain text when linked is false", () => {
    // Regression test: a resource whose category has zero blog posts
    // would otherwise link to a /category/[slug] page that 404s.
    render(
      <CategoryBadge
        slug="accessibility-testing"
        name="Accessibility Testing"
        linked={false}
      />
    );
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("Accessibility Testing")).toBeInTheDocument();
  });
});

describe("TagList", () => {
  it("links every tag when validTags is not provided", () => {
    render(<TagList tags={["playwright"]} />);
    expect(screen.getByRole("link", { name: "#playwright" })).toHaveAttribute(
      "href",
      "/tag/playwright"
    );
  });

  it("only links tags present in validTags", () => {
    render(
      <TagList
        tags={["playwright", "load-testing"]}
        validTags={new Set(["playwright"])}
      />
    );
    expect(
      screen.getByRole("link", { name: "#playwright" })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("link", { name: "#load-testing" })
    ).not.toBeInTheDocument();
    expect(screen.getByText("#load-testing")).toBeInTheDocument();
  });
});
