import { test, expect } from "@playwright/test";

test("home page renders the hero and its two CTAs", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const hero = page.locator('[data-track="hero"]');
  await expect(hero.getByRole("link", { name: /Start free — 3 months/ })).toHaveAttribute(
    "href",
    "https://app.tajirpoint.com/register"
  );
  await expect(hero.getByRole("link", { name: "Book a demo" })).toHaveAttribute("href", "/book-demo");
});

test("main navigation is labelled", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Main navigation" }).first()).toBeAttached();
});

test("find-your-business grid links to every business page", async ({ page }) => {
  await page.goto("/");
  const grid = page.locator("#businesses");
  await expect(grid.getByRole("link", { name: /Restaurants/ })).toHaveAttribute("href", "/business/restaurants");
  await expect(grid.locator('a[href^="/business/"]')).toHaveCount(10);
});

test("no free-forever copy anywhere on the home page", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("body")).not.toContainText(/forever/i);
});

for (const locale of ["ur", "ar"]) {
  test(`${locale} home page renders right-to-left`, async ({ page }) => {
    await page.goto(`/${locale}`);
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.locator("html")).toHaveAttribute("lang", locale);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
}
