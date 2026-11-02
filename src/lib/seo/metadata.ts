import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";
import { routing } from "@/i18n/routing";
import { ogImageForPath, OG_IMAGE_SIZE } from "@/lib/seo/og-cards";
import { BUSINESS_SLUGS } from "@/lib/marketing/businesses";
import { TRANSLATED_ADDON_SLUGS } from "@/content/addons/i18n";
import { TRANSLATED_STATIC_PATHS } from "@/lib/seo/translated-paths";

/** Open Graph locale per site locale (language_TERRITORY, as Facebook expects). */
export const OG_LOCALE_MAP: Record<string, string> = {
  en: "en_US",
  ur: "ur_PK",
  ar: "ar_AE",
};

/**
 * Pages whose main content is actually translated into Urdu and Arabic.
 *
 * Every page is reachable at /ur/… and /ar/… (the nav and footer are
 * translated everywhere), but on the rest the body copy is English. Calling
 * those copies "the Urdu version" in hreflang tells Google there are three
 * languages of the same page when there are three near-identical English
 * pages — duplicate content, and Google picks which one ranks. So an
 * untranslated page has ONE canonical URL, the English one: its /ur and /ar
 * copies point their canonical there, carry no hreflang cluster, and stay out
 * of the sitemap. Add a path here the day its body copy is translated.
 */
export const TRANSLATED_PATHS: ReadonlySet<string> = new Set([
  // The fixed list lives in translated-paths.ts so the header can share it.
  ...TRANSLATED_STATIC_PATHS,
  // Business pages: Urdu + Arabic copy in src/content/i18n/businesses.{ur,ar}.ts.
  ...BUSINESS_SLUGS.map((slug) => `/business/${slug}`),
]);

/**
 * Translated page families: a path `<prefix><slug>` counts as translated when
 * `slug` is in the set. Used for pages generated from data, like the add-on
 * pages, where only the slugs that have translations qualify.
 */
export const TRANSLATED_PREFIXES: ReadonlyArray<
  readonly [prefix: string, slugs: ReadonlySet<string>]
> = [["/extensions/", TRANSLATED_ADDON_SLUGS]];

export function isTranslated(path: string): boolean {
  if (TRANSLATED_PATHS.has(path)) return true;
  for (const [prefix, slugs] of TRANSLATED_PREFIXES) {
    if (path.startsWith(prefix) && slugs.has(path.slice(prefix.length))) return true;
  }
  return false;
}

/**
 * Builds the absolute URL for `path` in `locale`.
 * English keeps the bare path under `localePrefix: "as-needed"`.
 */
export function localeUrl(path: string, locale: string): string {
  const clean = path === "/" ? "" : path;
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${siteConfig.url}${prefix}${clean}` || `${siteConfig.url}/`;
}

/** The canonical URL of `path` as seen from `locale` (English unless the page is translated). */
export function canonicalUrl(path: string, locale: string): string {
  return localeUrl(path, isTranslated(path) ? locale : routing.defaultLocale);
}

/**
 * Canonical + hreflang cluster for one page.
 *
 * Translated pages: each language is its own canonical URL and all of them
 * list each other (self-reference included) plus `x-default` → English, the
 * locale served on the bare path. Untranslated pages: the English URL is the
 * only canonical; the /ur and /ar copies point at it and carry no hreflang,
 * because hreflang on a non-canonical URL is ignored at best.
 */
export function localeAlternates(path: string, locale: string): Metadata["alternates"] {
  const canonical = canonicalUrl(path, locale);
  if (!isTranslated(path)) {
    return locale === routing.defaultLocale
      ? { canonical, languages: { en: canonical, "x-default": canonical } }
      : { canonical };
  }

  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = localeUrl(path, l);
  }
  languages["x-default"] = localeUrl(path, routing.defaultLocale);
  return { canonical, languages };
}

/** " | TajirPoint" — appended to a page title when it still fits. */
export const TITLE_SUFFIX = ` | ${siteConfig.name}`;
/** Google shows roughly 60 characters of a title before cutting it. */
export const TITLE_MAX = 60;
/** Google shows roughly 155–160 characters of a description. */
export const DESCRIPTION_MAX = 160;

/**
 * The full <title>: the page title plus " | TajirPoint" when the two fit in
 * 60 characters, else the page title alone (the brand is in og:site_name and
 * the Organization markup either way, and a cut-off title loses the keyword
 * at its end, not the brand at its start).
 */
export function fullTitle(title: string, absolute = false): string {
  if (absolute) return title;
  const withBrand = `${title}${TITLE_SUFFIX}`;
  return withBrand.length <= TITLE_MAX ? withBrand : title;
}

/**
 * Joins sentences into a description, skipping any that would push it past
 * 160 characters — so a plan list read from the API can never
 * produce a snippet Google cuts mid-sentence.
 */
export function fitDescription(...sentences: Array<string | null | undefined | false>): string {
  let out = "";
  for (const s of sentences) {
    if (!s) continue;
    const next = out ? `${out} ${s}` : s;
    // Too long: skip it and try the next (shorter) one.
    if (next.length > DESCRIPTION_MAX && out) continue;
    out = next;
  }
  return out;
}

interface BuildMetadataOptions {
  title: string;
  description?: string;
  path?: string;
  /** Share image path or URL. Defaults to the page's own card (see og-cards.ts), else /og.png. */
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  keywords?: string[];
  locale?: string;
  /**
   * Render `title` verbatim instead of appending " | TajirPoint". The
   * homepage needs this: its title already opens with the brand.
   */
  absoluteTitle?: boolean;
}

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image,
  imageAlt,
  type = "website",
  noIndex = false,
  keywords,
  locale = routing.defaultLocale,
  absoluteTitle = false,
}: BuildMetadataOptions): Metadata {
  const translated = isTranslated(path);
  const url = canonicalUrl(path, locale);
  const src = image ?? ogImageForPath(path) ?? siteConfig.ogImage;
  const imageUrl = src.startsWith("http") ? src : `${siteConfig.url}${src}`;
  // The content language decides og:locale — an untranslated page is English
  // whichever URL it was shared from.
  const contentLocale = translated ? locale : routing.defaultLocale;
  const ogLocale = OG_LOCALE_MAP[contentLocale] ?? "en_US";
  const alternateLocale = translated
    ? routing.locales.filter((l) => l !== locale).map((l) => OG_LOCALE_MAP[l] ?? "en_US")
    : [];
  const alt = imageAlt ?? `${title} — ${siteConfig.name}`;
  const pageTitle = fullTitle(title, absoluteTitle);

  if (process.env.NODE_ENV === "development") {
    if (pageTitle.length > TITLE_MAX)
      console.warn(`[seo] title > ${TITLE_MAX}: ${path} "${pageTitle}"`);
    if (description.length > DESCRIPTION_MAX || description.length < 120)
      console.warn(`[seo] description ${description.length} chars (want 120–160): ${path}`);
  }

  return {
    title: { absolute: pageTitle },
    description,
    ...(keywords && { keywords }),
    alternates: localeAlternates(path, locale),
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type,
      locale: ogLocale,
      ...(alternateLocale.length && { alternateLocale }),
      images: [
        {
          url: imageUrl,
          secureUrl: imageUrl,
          width: OG_IMAGE_SIZE.width,
          height: OG_IMAGE_SIZE.height,
          type: "image/png",
          alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(siteConfig.twitterHandle && {
        site: siteConfig.twitterHandle,
        creator: siteConfig.twitterHandle,
      }),
      images: [{ url: imageUrl, alt }],
    },
    // Pages left indexable inherit the root layout's robots (index, follow,
    // large image previews). A no-index page still lets links be followed.
    ...(noIndex && { robots: { index: false, follow: true } }),
  };
}
