import type { Metadata } from "next";
import { siteConfig } from "@/lib/config/site";
import { routing } from "@/i18n/routing";

const OG_LOCALE_MAP: Record<string, string> = {
  en: "en_US",
  ur: "ur_PK",
  ar: "ar_AE",
};

/**
 * Builds the absolute URL for `path` in `locale`.
 * English keeps the bare path under `localePrefix: "as-needed"`.
 */
export function localeUrl(path: string, locale: string): string {
  const clean = path === "/" ? "" : path;
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${siteConfig.url}${prefix}${clean}` || `${siteConfig.url}/`;
}

/**
 * Canonical + hreflang cluster for one page.
 *
 * This is only meaningful because routing moved to `localePrefix: "as-needed"`.
 * Under the previous `"never"` every locale resolved to the same URL, so the
 * cluster was self-referential and Google discarded it — and Googlebot crawls
 * cookieless from US IPs, so it only ever saw English regardless. Now each
 * language has its own crawlable URL and the annotation is real.
 *
 * `x-default` points at English, the locale served on the bare path.
 */
export function localeAlternates(path: string, locale: string): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = localeUrl(path, l);
  }
  languages["x-default"] = localeUrl(path, routing.defaultLocale);

  return {
    canonical: localeUrl(path, locale),
    languages,
  };
}

interface BuildMetadataOptions {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noIndex?: boolean;
  keywords?: string[];
  locale?: string;
  /**
   * Render `title` verbatim instead of running it through the
   * `%s | Tajir Point` template. The homepage needs this: its title already
   * opens with the brand, so the template produced
   * "TajirPoint — … | Tajir Point" — 76 characters, well past the ~60 Google
   * shows, with the brand in it twice.
   */
  absoluteTitle?: boolean;
}

export function buildMetadata({
  title,
  description = siteConfig.description,
  path = "/",
  image = siteConfig.ogImage,
  type = "website",
  noIndex = false,
  keywords,
  locale = routing.defaultLocale,
  absoluteTitle = false,
}: BuildMetadataOptions): Metadata {
  const url = localeUrl(path, locale);
  const imageUrl = image.startsWith("http") ? image : `${siteConfig.url}${image}`;
  const ogLocale = OG_LOCALE_MAP[locale] ?? "en_US";

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    ...(keywords && { keywords }),
    alternates: localeAlternates(path, locale),
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
      locale: ogLocale,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: siteConfig.twitterHandle,
      images: [imageUrl],
    },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}
