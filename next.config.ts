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

      // Legacy locale-prefixed URLs. The pre-redesign site ran five locales
      // (en, ur, ar, nl, es) with `localePrefix: "always"` and submitted every
      // /:locale/:page combination in its sitemap, so Google still holds them.
      //
      // Today `localePrefix: "never"` means next-intl answers /ar, /en/about &c
      // with a **307 temporary** redirect, which tells Google to keep the old
      // URL indexed and keep re-crawling it — that is the 18 "Page with
      // redirect" rows in Search Console. The dropped nl/es prefixes are worse:
      // they are not locales any more, so they 404 outright.
      //
      // Config redirects are evaluated at step 2 of the routing pipeline,
      // before proxy/middleware at step 3, so these 308s pre-empt next-intl's
      // 307 and let Google consolidate the old URLs into the canonical ones.
      // Ordering matters: the bare-prefix rule must come first, otherwise
      // `:path*` (zero-or-more) swallows it.
      { source: "/:locale(en|ur|ar|nl|es)", destination: "/", permanent: true },
      {
        source: "/:locale(en|ur|ar|nl|es)/:path*",
        destination: "/:path*",
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
