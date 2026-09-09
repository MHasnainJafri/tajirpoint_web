import type { NextConfig } from "next";
import bundleAnalyzer from "@next/bundle-analyzer";
import createNextIntlPlugin from "next-intl/plugin";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
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
  async redirects() {
    return [
      // /developers was a single marketing page; the reference now lives under
      // /docs. Keep the old URL working — it is linked from the app, the
      // footer, and whatever anyone has already bookmarked.
      { source: "/developers", destination: "/docs", permanent: true },
      { source: "/developers/:path*", destination: "/docs/:path*", permanent: true },

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
      // `en` stays, because as-needed keeps English on the bare path — /en is
      // a duplicate. `nl` and `es` stay because they are no longer locales at
      // all and would otherwise 404.
      //
      // Ordering matters: the bare-prefix rule must come first, otherwise
      // `:path*` (zero-or-more) swallows it.
      { source: "/:locale(en|nl|es)", destination: "/", permanent: true },
      {
        source: "/:locale(en|nl|es)/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
