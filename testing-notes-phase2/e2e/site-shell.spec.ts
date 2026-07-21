import { expect, test } from "@playwright/test";

test.describe("Site shell", () => {
  test("home page loads with correct title and nav", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Testing Notes/);
    await expect(
      page.getByRole("heading", { level: 1, name: "Testing Notes" })
    ).toBeVisible();

    const nav = page.getByRole("navigation", { name: "Primary" });
    await expect(nav.getByRole("link", { name: "Blog" })).toBeVisible();
  });

  test("skip-to-content link is the first focusable element", async ({
    page,
  }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByText("Skip to content")).toBeFocused();
  });

  test("theme toggle switches between light and dark", async ({ page }) => {
    await page.goto("/");
    const html = page.locator("html");

    await page.getByRole("button", { name: "Toggle theme" }).click();
    await page.getByRole("menuitem", { name: "Dark" }).click();
    await expect(html).toHaveClass(/dark/);

    await page.getByRole("button", { name: "Toggle theme" }).click();
    await page.getByRole("menuitem", { name: "Light" }).click();
    await expect(html).not.toHaveClass(/dark/);
  });

  test("mobile nav opens via hamburger menu", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");

    await page.getByRole("button", { name: "Open menu" }).click();
    const mobileNav = page.getByRole("navigation", { name: "Mobile" });
    await expect(
      mobileNav.getByRole("link", { name: "Resources" })
    ).toBeVisible();
  });

  test("unknown route renders the 404 page", async ({ page }) => {
    await page.goto("/this-route-does-not-exist");
    await expect(
      page.getByRole("heading", { name: "Page not found" })
    ).toBeVisible();
  });
});
