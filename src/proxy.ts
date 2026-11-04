import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";
import { isTranslated } from "./lib/seo/metadata";

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
const intl = createMiddleware(routing);

const PREFIXED = /^\/(ur|ar)(\/.*)?$/;

/**
 * An Urdu or Arabic URL for a page with no Urdu or Arabic copy (a guide, a
 * comparison, a tool, the docs, the legal pages) 308s to the English page.
 * Rendered, it showed English text in a right-to-left shell under a second
 * URL, which Google filed as a duplicate of the English page.
 */
export default function proxy(request: NextRequest) {
  const match = PREFIXED.exec(request.nextUrl.pathname);
  if (match && (routing.locales as readonly string[]).includes(match[1]!)) {
    const path = (match[2] ?? "/").replace(/(.)\/$/, "$1");
    if (!isTranslated(path)) {
      const url = request.nextUrl.clone();
      url.pathname = path;
      return NextResponse.redirect(url, 308);
    }
  }
  return intl(request);
}

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
