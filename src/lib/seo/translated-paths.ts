/**
 * Which paths have their body copy in Urdu and Arabic, without pulling in any
 * page content, so the header (a client component) can use it too.
 *
 * `TRANSLATED_STATIC_PATHS` is the source for `TRANSLATED_PATHS` in
 * lib/seo/metadata.ts (which adds every /business/<slug>). Add a path here the
 * day its body copy is translated.
 */
export const TRANSLATED_STATIC_PATHS: readonly string[] = [
  "/",
  "/pricing",
  "/extensions",
  // Business pages: Urdu + Arabic copy in src/content/i18n/businesses.{ur,ar}.ts.
  "/business",
  // Feature + lead pages: copy in src/content/i18n/{features,lead-pages}.
  "/features/khata",
  "/features/accounting",
  "/features/e-invoicing",
  "/features/offline",
  "/features/van-sales",
  "/book-demo",
  "/get-a-call",
  "/contact",
  "/about",
];

/** Page families whose generated pages are translated (business types, add-ons). */
const TRANSLATED_FAMILIES: readonly string[] = ["/business/", "/extensions/"];

const STATIC = new Set(TRANSLATED_STATIC_PATHS);

/**
 * Cheap check for menus: true when `path` is a translated page or belongs to a
 * translated family. `isTranslated` in metadata.ts is the exact check (it
 * knows which add-on slugs have translations); this one is for links.
 */
export function looksTranslated(path: string): boolean {
  return STATIC.has(path) || TRANSLATED_FAMILIES.some((prefix) => path.startsWith(prefix));
}

/**
 * The locale a site link should point at from a `locale` page: the page's own
 * when the target is translated, else English, so a translated page never
 * links to an /ur/… or /ar/… copy whose canonical is the English page.
 */
export function linkLocale(href: string, locale: string): string {
  if (locale === "en" || !href.startsWith("/")) return locale;
  const path = href.split(/[?#]/)[0] || "/";
  return looksTranslated(path) ? locale : "en";
}
