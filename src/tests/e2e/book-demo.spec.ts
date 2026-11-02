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

  await expect(page.locator("form").getByRole("alert")).toContainText(
    "Please check the highlighted fields"
  );
  await expect(page.getByText("Please enter your name.")).toBeVisible();
  await expect(
    page.getByText("Choose your country code and enter your number (7–15 digits).")
  ).toBeVisible();
  await expect(page.getByText("Please check your email address.")).toBeVisible();
  await expect(page.getByLabel(/Your name/)).toHaveAttribute("aria-invalid", "true");
  await expect(page.getByLabel("City")).toHaveValue("Lahore");
});

test("a pasted international number switches the country picker", async ({ page }) => {
  await page.goto("/book-demo");
  const phone = page.getByLabel("WhatsApp number");
  await phone.focus();
  await page.evaluate(() => {
    const el = document.activeElement as HTMLInputElement;
    const data = new DataTransfer();
    data.setData("text", "+44 20 7946 0123");
    el.dispatchEvent(
      new ClipboardEvent("paste", { clipboardData: data, bubbles: true, cancelable: true })
    );
  });
  await expect(
    page.getByRole("button", { name: /Country code: United Kingdom \+44/ })
  ).toBeVisible();
  await expect(phone).toHaveValue("2079460123");
  await expect(page.locator('input[type="hidden"][name="phone"]')).toHaveValue("+442079460123");
  await expect(page.locator('input[type="hidden"][name="country"]')).toHaveValue("GB");
});

test("the call-back page has its form", async ({ page }) => {
  await page.goto("/get-a-call");
  await expect(page.getByRole("form", { name: "Ask for a call back" })).toBeVisible();
  await page.getByRole("button", { name: "Call me back" }).click();
  await expect(page.getByText("Please enter your business name.")).toBeVisible();
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

test("the Urdu demo page and its errors are in Urdu, right to left", async ({ page }) => {
  await page.goto("/ur/book-demo");
  await expect(page.locator("section[lang='ur'][dir='rtl']").first()).toBeVisible();
  await expect(page.locator("link[rel='canonical']")).toHaveAttribute("href", /\/ur\/book-demo$/);
  await page.getByRole("button", { name: "میرا مفت ڈیمو بک کریں" }).click();
  await expect(page.locator("form").getByRole("alert")).toContainText("نشان زدہ خانے");
  await expect(page.getByText("براہِ کرم اپنا نام لکھیں۔")).toBeVisible();
  // The code picker + number row stays left to right.
  await expect(page.getByRole("group", { name: "واٹس ایپ نمبر" })).toHaveAttribute("dir", "ltr");
});

test("the Arabic khata page is translated and canonical to itself", async ({ page }) => {
  await page.goto("/ar/features/khata");
  await expect(page.locator("h1")).toContainText("دفتر الآجل");
  await expect(page.locator("link[rel='canonical']")).toHaveAttribute(
    "href",
    /\/ar\/features\/khata$/
  );
});
