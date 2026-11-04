import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";
import createNextIntlPlugin from "next-intl/plugin";
import { LEGACY_SOLUTION_REDIRECTS } from "./src/lib/marketing/businesses";
import { indexNowKey, securityHeaders as buildSecurityHeaders } from "./src/lib/security/headers";
import { brand } from "./src/lib/config/brand";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// Security headers incl. a report-only Content-Security-Policy; the source
// list and why each host is allowed are in src/lib/security/headers.ts.
const securityHeaders = buildSecurityHeaders({
  apiUrl: process.env.NEXT_PUBLIC_API_URL,
  reportUri: process.env.CSP_REPORT_URI,
  dev: process.env.NODE_ENV === "development",
});

// IndexNow (Bing, Yandex, Seznam…): the key file must be served at
// /<key>.txt. Only when INDEXNOW_KEY is set; see scripts/indexnow-ping.mjs.
const INDEXNOW_KEY = indexNowKey(process.env.INDEXNOW_KEY);

/** One permanent redirect per move, for the bare path and its /ur and /ar copies. */
function pageMoves(moves: ReadonlyArray<readonly [string, string]>) {
  return moves.flatMap(([from, to]) => [
    { source: from, destination: to, permanent: true },
    { source: `/:locale(ur|ar)${from}`, destination: `/:locale${to}`, permanent: true },
  ]);
}

const nextConfig: NextConfig = {
  // No "X-Powered-By: Next.js" on every response: a few bytes, and no need to
  // advertise the stack.
  poweredByHeader: false,

  images: {
    formats: ["image/avif", "image/webp"],
    // Optimised images (/_next/image) are cached for a week instead of the
    // 4-hour default: the sources in /public and the add-on icons rarely
    // change, and each re-optimisation costs the server CPU. Same week as the
    // /public cache header below.
    minimumCacheTTL: 604800,
    // Add-on icons come from the backend catalogue (`icon_url`), hosted on
    // the brand's media host. Only that host: next/image refuses everything else.
    remotePatterns: [{ protocol: "https", hostname: brand.mediaHost, pathname: "/**" }],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // Long-cache the static assets served from /public (favicon, brand
        // marks, icons, fonts). Their paths are stable across deploys, so a
        // week of edge/browser caching is safe; Cloudflare honours this
        // Cache-Control directly. The `(?!_next/)` guard leaves Next's own
        // hashed /_next/static/* assets untouched — those are already served
        // `immutable` and cannot be overridden here.
        source: "/((?!_next/).*)\\.(svg|png|jpg|jpeg|gif|webp|avif|ico|woff|woff2|ttf|otf|eot)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, stale-while-revalidate=86400",
          },
        ],
      },
    ];
  },
  async rewrites() {
    // A dotted path, so the locale proxy skips it; the route answers with the
    // key (src/app/indexnow-key.txt/route.ts).
    return INDEXNOW_KEY
      ? [{ source: `/${INDEXNOW_KEY}.txt`, destination: "/indexnow-key.txt" }]
      : [];
  },
  async redirects() {
    return [
      // /developers was a single marketing page; the reference now lives under
      // /docs. Keep the old URL working — it is linked from the app, the
      // footer, and whatever anyone has already bookmarked.
      { source: "/developers", destination: "/docs", permanent: true },
      { source: "/developers/:path*", destination: "/docs/:path*", permanent: true },

      // Marketing relaunch (Oct 2026). Page moves, not locale rules: each one
      // also matches the /ur and /ar copies of the same page so a shared
      // Urdu or Arabic link lands on the new Urdu or Arabic URL. Query strings
      // pass through untouched (Next keeps them on redirects), which is what
      // keeps a Facebook ad's utm_* tags alive across /demo → /book-demo.
      ...pageMoves([
        // The thin /solutions/* pages became catalog-driven /business/* pages.
        ...Object.entries(LEGACY_SOLUTION_REDIRECTS).map(
          ([from, to]) => [`/solutions/${from}`, `/business/${to}`] as const
        ),
        ["/solutions", "/business"],
        // The two legal duplicates were folded into Privacy and Security.
        ["/data-privacy", "/privacy"],
        ["/data-security", "/security"],
        // Short link for ads and WhatsApp messages.
        ["/demo", "/book-demo"],
      ]),

      // Legacy locale prefixes from the pre-redesign site, which ran five
      // locales (en, ur, ar, nl, es) with `localePrefix: "always"` and
      // submitted every /:locale/:page combination in its sitemap, so Google
      // still holds them. Config redirects run at step 2 of the routing
      // pipeline, before proxy/middleware at step 3, so these 308s pre-empt
      // next-intl's 307 and let Google consolidate the old URLs.
      //
      // **`ur` and `ar` are deliberately NOT in this list any more.** Under
      // `localePrefix: "as-needed"` they are real, canonical, indexable URLs.
      // Redirecting them was what broke the language switcher: next-intl
      // navigates to /ur to change locale, and this rule 308'd it back to /
      // before the middleware could ever see it.
      //
      // Ordering matters: the bare-prefix rule must come first, otherwise
      // `:path*` (zero-or-more) swallows it.
      //
      // `en` is here too: next-intl strips the default prefix with a 307
      // (temporary); a 308 tells Google the bare URL is the one to keep.
      { source: "/:locale(nl|es|en)", destination: "/", permanent: true },
      {
        source: "/:locale(nl|es|en)/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
