import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

// Next.js's core-web-vitals already wires up jsx-a11y with strict rules,
// so we don't need to register it again.
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts", "node_modules/**"]),
  {
    rules: {
      // Apostrophes / quotes in marketing copy render correctly in JSX; this
      // rule is pure noise on a content-heavy site. Turning it off so lint
      // surfaces real problems instead of 26 false positives.
      "react/no-unescaped-entities": "off",
    },
  },
]);

export default eslintConfig;
