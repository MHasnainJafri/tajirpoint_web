import { test, expect } from "@playwright/test";

test("preselects the business type from ?type= and migration from ?migrate=1", async ({ page }) => {
  await page.goto("/book-demo?type=pharmacy&migrate=1&utm_source=facebook");
  await expect(page.getByLabel("Type of business")).toHaveValue("pharmacy");
  await expect(page.getByRole("checkbox", { name: /Move my data for me/ })).toBeChecked();
  // The first-touch campaign tags ride along in hidden fields.
  await expect(page.locator('input[type="hidden"][name="utm_source"]')).toHaveValue("facebook");
});

test("shows field errors and keeps what was typed", async ({ page }) => {
  await page.goto("/book-demo");
  await page.getByLabel("Email").fill("not-an-email");
  await page.getByLabel("City").fill("Lahore");
  await page.getByRole("button", { name: "Book my free demo" }).click();

  await expect(page.locator("form").getByRole("alert")).toContainText("Please check the highlighted fields");
  await expect(page.getByText("Please enter your name.")).toBeVisible();
  await expect(page.getByText("Please enter a WhatsApp or phone number we can reach.")).toBeVisible();
  await expect(page.getByText("Please check your email address.")).toBeVisible();
  await expect(page.getByLabel(/Your name/)).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByLabel("City")).toHaveValue("Lahore");
});

test("offers the next 14 days (no Sundays) and three times of day", async ({ page }) => {
  await page.goto("/book-demo");
  const days = page.getByLabel("Preferred day").locator("option");
  await expect(days).toHaveCount(13); // "Any day" + 12 working days
  await expect(page.getByLabel(/Preferred time/).locator("option")).toHaveCount(4);
});

test("/demo redirects to /book-demo and keeps the query string", async ({ request }) => {
  const res = await request.get("/demo?type=restaurants&utm_source=facebook", { maxRedirects: 0 });
  expect(res.status()).toBe(308);
  expect(res.headers()["location"]).toBe("/book-demo?type=restaurants&utm_source=facebook");
});

test("old solution pages redirect permanently", async ({ request }) => {
  for (const [from, to] of [
    ["/solutions/restaurants", "/business/restaurants"],
    ["/solutions/general-retail", "/business/grocery-kiryana"],
    ["/ur/solutions/services", "/ur/business/salons-services"],
    ["/data-privacy", "/privacy"],
    ["/data-security", "/security"],
  ] as const) {
    const res = await request.get(from, { maxRedirects: 0 });
    expect(res.status(), from).toBe(308);
    expect(res.headers()["location"], from).toBe(to);
  }
});
