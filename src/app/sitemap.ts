import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";
import { RESOURCES } from "@/lib/docs/nav";

type Page = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
};

/** Every docs page is its own indexable URL — that is the whole point of
 *  splitting the reference out of one long marketing page. */
const DOCS_PAGES: Page[] = [
  { path: "/docs", priority: 0.8, changeFrequency: "monthly" },
  ...["authentication", "pagination", "errors", "idempotency", "webhooks"].map(
    (slug): Page => ({
      path: `/docs/${slug}`,
      priority: 0.7,
      changeFrequency: "monthly",
    })
  ),
  ...RESOURCES.map(
    (r): Page => ({
      path: `/docs/${r.slug}`,
      priority: 0.7,
      changeFrequency: "monthly",
    })
  ),
];

const PAGES: Page[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly" },
  { path: "/solutions", priority: 0.9, changeFrequency: "weekly" },
  { path: "/solutions/general-retail", priority: 0.8, changeFrequency: "monthly" },
  { path: "/solutions/restaurants", priority: 0.8, changeFrequency: "monthly" },
  { path: "/solutions/electronics", priority: 0.8, changeFrequency: "monthly" },
  { path: "/solutions/services", priority: 0.8, changeFrequency: "monthly" },
  { path: "/solutions/distributors", priority: 0.8, changeFrequency: "monthly" },
  { path: "/extensions", priority: 0.8, changeFrequency: "monthly" },
  { path: "/features/khata", priority: 0.8, changeFrequency: "monthly" },
  { path: "/features/offline", priority: 0.8, changeFrequency: "monthly" },
  { path: "/features/accounting", priority: 0.8, changeFrequency: "monthly" },
  { path: "/features/van-sales", priority: 0.8, changeFrequency: "monthly" },
  { path: "/features/e-invoicing", priority: 0.8, changeFrequency: "monthly" },
  ...DOCS_PAGES,
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
  { path: "/book-demo", priority: 0.6, changeFrequency: "monthly" },
  { path: "/security", priority: 0.5, changeFrequency: "monthly" },
  { path: "/data-security", priority: 0.5, changeFrequency: "monthly" },
  { path: "/data-privacy", priority: 0.5, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.4, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.4, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ["en", "ur", "ar"];
  const now = new Date();

  return PAGES.map(({ path, priority, changeFrequency }) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
    // With localePrefix: "never" all locales share the same URL.
    // Emit hreflang alternates so Google can deduplicate per language.
    alternates: {
      languages: Object.fromEntries(
        [...locales, "x-default"].map((locale) => [locale, `${siteConfig.url}${path}`])
      ),
    },
  }));
}
