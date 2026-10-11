import { defineConfig, devices } from "@playwright/test";

// E2E_BASE_URL points the suite at a server that is already running (for
// example `pnpm start -p 3017`); without it Playwright starts `pnpm start`.
const external = process.env.E2E_BASE_URL;

export default defineConfig({
  testDir: "./src/tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? "html" : "list",
  use: {
    baseURL: external ?? "http://localhost:3000",
    trace: "on-first-retry",
    // Optional: reuse a Chromium already on the machine when the bundled
    // revision is not downloaded (E2E_CHROMIUM_PATH=/path/to/chrome-headless-shell).
    ...(process.env.E2E_CHROMIUM_PATH
      ? { launchOptions: { executablePath: process.env.E2E_CHROMIUM_PATH } }
      : {}),
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  ...(external
    ? {}
    : {
        webServer: {
          command: "pnpm start",
          url: "http://localhost:3000",
          reuseExistingServer: !process.env.CI,
        },
      }),
});
