import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./src/tests/setup.ts"],
    globals: true,
    // E2E specs under src/tests/e2e are Playwright — run them with
    // `playwright test`, not vitest. Pass when there are no unit tests yet.
    exclude: ["**/node_modules/**", "**/dist/**", "**/.next/**", "src/tests/e2e/**"],
    passWithNoTests: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
