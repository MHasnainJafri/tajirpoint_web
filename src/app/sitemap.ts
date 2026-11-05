import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { isPageShown } from "@/lib/config/pages";
import { isTranslated, localeUrl } from "@/lib/seo/metadata";
import { RESOURCES } from "@/lib/docs/nav";
import { SHOWN_BUSINESS_SLUGS } from "@/lib/marketing/businesses";
import { getAddonCatalogue } from "@/lib/marketing/addons";
import { COMPARISONS } from "@/content/compare";
import { LOCATIONS, LOCATIONS_HUB, locationPath } from "@/content/locations";
import { GUIDES, GUIDES_HUB } from "@/content/guides";
import { TOOL_SLUGS } from "@/content/tools/tools";
import { CHANGELOG_UPDATED } from "@/content/changelog/entries";

// The add-on pages come from the backend catalogue; refresh with it.
export const revalidate = 600;

type Page = {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  /**
   * The date the page's CONTENT last changed (copy, structured data, links) —
   * not the deploy date. Google only trusts <lastmod> when it is consistently
   * true, so a build-time `new Date()` on every page would teach it to ignore
   * the field. Bump the date in the same commit that changes the page.
   */
  updated: string;
};

const DOCS_UPDATED = "2026-09-10";

/** Every docs page is its own indexable URL. */
const DOCS_PAGES: Page[] = [
  { path: "/docs", priority: 0.6, changeFrequency: "monthly", updated: DOCS_UPDATED },
  ...["authentication", "pagination", "errors", "idempotency", "webhooks"].map(
    (slug): Page => ({
      path: `/docs/${slug}`,
      priority: 0.5,
      changeFrequency: "monthly",
      updated: DOCS_UPDATED,
    })
  ),
  ...RESOURCES.map(
    (r): Page => ({
      path: `/docs/${r.slug}`,
      priority: 0.5,
      changeFrequency: "monthly",
      updated: DOCS_UPDATED,
    })
  ),
];

const BUSINESS_PAGES: Page[] = [
  { path: "/business", priority: 0.9, changeFrequency: "weekly", updated: "2026-11-02" },
  ...SHOWN_BUSINESS_SLUGS.map(
    (slug): Page => ({
      path: `/business/${slug}`,
      priority: 0.9,
      changeFrequency: "monthly",
      updated: "2026-11-02",
    })
  ),
];

const FEATURE_PAGES: Page[] = ["khata", "offline", "accounting", "van-sales", "e-invoicing"].map(
  (slug): Page => ({
    path: `/features/${slug}`,
    priority: 0.8,
    changeFrequency: "monthly",
    updated: "2026-11-02",
  })
);

/** /compare and one page per comparison (src/content/compare). */
const COMPARE_PAGES: Page[] = [
  { path: "/compare", priority: 0.7, changeFrequency: "monthly", updated: "2026-11-05" },
  ...COMPARISONS.map(
    (c): Page => ({
      path: `/compare/${c.slug}`,
      priority: 0.7,
      changeFrequency: "monthly",
      // A comparison re-checked later than the 2 Nov launch carries its own date.
      updated: c.checked?.iso ?? "2026-11-02",
    })
  ),
];

/** Location pages: the /pos hub, then one page per country or city. */
const LOCATION_PAGES: Page[] = [
  {
    path: LOCATIONS_HUB.path,
    priority: 0.7,
    changeFrequency: "monthly",
    updated: LOCATIONS_HUB.updated,
  },
  ...LOCATIONS.map(
    (l): Page => ({
      path: locationPath(l.slug),
      priority: 0.7,
      changeFrequency: "monthly",
      updated: l.updated,
    })
  ),
];

const GUIDE_PAGES: Page[] = [
  { path: GUIDES_HUB.path, priority: 0.7, changeFrequency: "weekly", updated: GUIDES_HUB.updated },
  ...GUIDES.map(
    (g): Page => ({
      path: `/guides/${g.slug}`,
      priority: 0.7,
      changeFrequency: "monthly",
      updated: g.dateModified,
    })
  ),
];

/** The free tools hub and each tool. */
const TOOL_PAGES: Page[] = [
  { path: "/tools", priority: 0.7, changeFrequency: "monthly", updated: "2026-11-02" },
  ...TOOL_SLUGS.map(
    (slug): Page => ({
      path: `/tools/${slug}`,
      priority: 0.7,
      changeFrequency: "monthly",
      updated: "2026-11-02",
    })
  ),
];

const PAGES: Page[] = [
  { path: "/", priority: 1.0, changeFrequency: "weekly", updated: "2026-11-01" },
  { path: "/pricing", priority: 0.9, changeFrequency: "monthly", updated: "2026-11-01" },
  { path: "/book-demo", priority: 0.8, changeFrequency: "monthly", updated: "2026-11-02" },
  { path: "/get-a-call", priority: 0.8, changeFrequency: "monthly", updated: "2026-11-02" },
  ...BUSINESS_PAGES,
  { path: "/extensions", priority: 0.8, changeFrequency: "monthly", updated: "2026-09-10" },
  ...FEATURE_PAGES,
  ...COMPARE_PAGES,
  ...LOCATION_PAGES,
  ...GUIDE_PAGES,
  ...TOOL_PAGES,
  ...DOCS_PAGES,
  { path: "/partners", priority: 0.6, changeFrequency: "monthly", updated: "2026-11-02" },
  { path: "/changelog", priority: 0.5, changeFrequency: "weekly", updated: CHANGELOG_UPDATED },
  { path: "/about", priority: 0.6, changeFrequency: "monthly", updated: "2026-11-02" },
  { path: "/contact", priority: 0.6, changeFrequency: "monthly", updated: "2026-11-02" },
  { path: "/security", priority: 0.4, changeFrequency: "yearly", updated: "2026-10-11" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly", updated: "2026-10-11" },
  { path: "/terms", priority: 0.3, changeFrequency: "yearly", updated: "2026-10-11" },
  { path: "/cookies", priority: 0.2, changeFrequency: "yearly", updated: "2026-10-12" },
  { path: "/refund-policy", priority: 0.2, changeFrequency: "yearly", updated: "2026-10-11" },
  { path: "/delete-account", priority: 0.2, changeFrequency: "yearly", updated: "2026-10-15" },
];

/** One page per add-on in the backend catalogue (snapshot if the API is down). */
async function addonPages(): Promise<Page[]> {
  const { addons } = await getAddonCatalogue();
  return addons.map(
    (a): Page => ({
      path: `/extensions/${a.slug}`,
      // Pages a shop can act on today rank above the roadmap.
      priority: a.status === "coming_soon" || a.status === "unavailable" ? 0.6 : 0.7,
      changeFrequency: "monthly",
      // Urdu + Arabic write-ups added 2 Nov 2026 (TP-490); translated slugs
      // are listed once per language with their hreflang cluster below.
      updated: "2026-11-02",
    })
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Only the pages this build has (src/lib/config/pages.ts).
  const pages = [...PAGES, ...(await addonPages())].filter((p) => isPageShown(p.path));
  // Only canonical URLs. A translated page is listed once per language, each
  // entry carrying the full hreflang cluster. An untranslated page is listed
  // once, in English: its /ur and /ar copies canonicalise to the English URL
  // (see TRANSLATED_PATHS), and a sitemap must not list non-canonical URLs.
  //
  // `priority` and `changefreq` are ignored by Google; Bing still reads them.
  return pages.flatMap(({ path, priority, changeFrequency, updated }) => {
    const lastModified = new Date(`${updated}T00:00:00Z`);
    if (!isTranslated(path)) {
      return [
        { url: localeUrl(path, routing.defaultLocale), lastModified, changeFrequency, priority },
      ];
    }
    const languages = Object.fromEntries([
      ...routing.locales.map((l) => [l, localeUrl(path, l)]),
      ["x-default", localeUrl(path, routing.defaultLocale)],
    ]);
    return routing.locales.map((locale) => ({
      url: localeUrl(path, locale),
      lastModified,
      changeFrequency,
      // Non-default locales rank slightly below their English counterpart so
      // the English URL stays the preferred entry point of each cluster.
      priority: locale === routing.defaultLocale ? priority : Math.max(0.1, priority - 0.1),
      alternates: { languages },
    }));
  });
}
