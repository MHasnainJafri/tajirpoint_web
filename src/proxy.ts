import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

/**
 * Locale routing.
 *
 * Named `proxy.ts`, not `middleware.ts`: Next.js 16 deprecated the `middleware`
 * file convention in favour of `proxy` (the build warned on every run). The
 * `proxy` runtime is nodejs and is not configurable.
 *
 * Under `localePrefix: "as-needed"` this rewrites the bare path to the default
 * locale (`/pricing` → `/en/pricing` internally, URL unchanged) and lets
 * `/ur/*` and `/ar/*` through as the real URLs they now are.
 */
export default createMiddleware(routing);

export const config = {
  // Skips Next internals, the API, and anything with a file extension. Paths
  // with a dot fall through to the app router, where the `[locale]` layout
  // 404s unknown locales — that guard is what stops `/anything.txt` rendering
  // the homepage with a 200.
  // NOTE the doubled backslash: this is a TS string, so `\\.` is what puts a
  // literal `\.` (an escaped dot) into the regex. A single `\.` here collapses
  // to `.` and the alternative becomes `.*..*`, which matches every non-empty
  // path — the lookahead then excludes the whole site from the proxy and every
  // bare path except `/` 404s.
  matcher: ["/((?!_next|_vercel|api|.*\\..*).*)"],
};
