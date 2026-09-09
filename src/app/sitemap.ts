import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { localeUrl } from "@/lib/seo/metadata";
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
  // One entry per page per locale, each carrying the full hreflang cluster.
  //
  // This is only possible because routing moved to `localePrefix: "as-needed"`.
  // Under the previous `"never"` all three languages resolved to a single URL,
  // so there was nothing to list and no valid cluster to annotate — Urdu and
  // Arabic were entirely absent from Google.
  //
  // Still no `lastModified`, deliberately. `new Date()` is evaluated at build
  // time, so every page would claim to have changed on every deploy; a sitemap
  // that always cries "just updated" trains Google to stop trusting the signal.
  // Better omitted than faked — restore it only with real per-page dates.
  return PAGES.flatMap(({ path, priority, changeFrequency }) =>
    routing.locales.map((locale) => ({
      url: localeUrl(path, locale),
      changeFrequency,
      // Non-default locales rank slightly below their English counterpart so
      // the English URL stays the preferred entry point of each cluster.
      priority: locale === routing.defaultLocale ? priority : Math.max(0.1, priority - 0.1),
      alternates: {
        languages: Object.fromEntries([
          ...routing.locales.map((l) => [l, localeUrl(path, l)]),
          ["x-default", localeUrl(path, routing.defaultLocale)],
        ]),
      },
    }))
  );
}
