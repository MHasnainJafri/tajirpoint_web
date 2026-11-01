import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";

/**
 * Everything public is crawlable — search engines and AI search/answer
 * crawlers alike (OAI-SearchBot, Claude-SearchBot, PerplexityBot,
 * Google-Extended…) fall under `*`, because being cited in AI answers is
 * reach the owner wants. Only machine endpoints are kept out. The marketing
 * site has no logged-in area (the app is app.tajirpoint.com, its own host).
 *
 * Do NOT disallow /_next/: Google renders pages with their CSS and JS.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
