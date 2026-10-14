import { test, expect } from "@playwright/test";

test.describe("desktop Businesses mega-menu", () => {
  test.use({ viewport: { width: 1280, height: 900 } });

  test("opens by keyboard, lists every business, closes on Escape", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main navigation" }).first();
    const trigger = nav.getByRole("button", { name: "Businesses" });
    await expect(trigger).toHaveAttribute("aria-expanded", "false");

    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");

    const panel = page.locator(`#${await trigger.getAttribute("aria-controls")}`);
    await expect(panel).toBeVisible();
    await expect(panel.locator('a[href^="/business/"]')).toHaveCount(12);
    await expect(panel.locator('a[href="/business"]')).toHaveCount(1); // "All businesses"
    await expect(panel.getByRole("link", { name: /Book a free demo/ })).toHaveAttribute(
      "href",
      "/book-demo"
    );

    // Tab moves into the open panel, not past it.
    await page.keyboard.press("Tab");
    const focusedHref = await page.evaluate(() => document.activeElement?.getAttribute("href"));
    expect(focusedHref).toMatch(/^\/business\//);

    await page.keyboard.press("Escape");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await expect(panel).toBeHidden();
    await expect(trigger).toBeFocused();
  });

  test("navigates to a business page", async ({ page }) => {
    await page.goto("/");
    const nav = page.getByRole("navigation", { name: "Main navigation" }).first();
    const trigger = nav.getByRole("button", { name: "Businesses" });
    await trigger.hover();
    await trigger.click(); // a click right after the hover keeps it open
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await nav.getByRole("link", { name: /^Pharmacies/ }).click();
    await expect(page).toHaveURL(/\/business\/pharmacy$/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});

test.describe("mobile drawer", () => {
  test.use({ viewport: { width: 375, height: 812 } });

  test("has the businesses accordion and both CTAs, without horizontal scroll", async ({
    page,
  }) => {
    await page.goto("/");
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow).toBeLessThanOrEqual(0);

    await page.getByRole("button", { name: "Open menu" }).click();
    const drawer = page.locator('[id$="-drawer"]');
    await expect(drawer).toBeVisible();
    const section = drawer.getByRole("button", { name: "Businesses" });
    await expect(section).toHaveAttribute("aria-expanded", "true");
    await expect(drawer.locator('a[href^="/business/"]')).toHaveCount(12);
    await expect(drawer.getByRole("link", { name: "Book a demo" })).toHaveAttribute(
      "href",
      "/book-demo"
    );
    await expect(drawer.getByRole("link", { name: /Start free/ })).toHaveAttribute(
      "href",
      "https://app.tajirpoint.com/register"
    );

    await section.click();
    await expect(section).toHaveAttribute("aria-expanded", "false");
  });
});

test("business pages have no horizontal scroll at 375px", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const path of [
    "/business/restaurants",
    "/book-demo",
    "/pricing",
    "/contact",
    // Right-to-left pages: anything parked far off to the left is scrollable there.
    "/ur",
    "/ar/business/pharmacy",
    "/ur/book-demo",
  ]) {
    await page.goto(path);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - window.innerWidth
    );
    expect(overflow, path).toBeLessThanOrEqual(0);
  }
});
