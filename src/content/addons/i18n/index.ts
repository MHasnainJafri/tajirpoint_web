import type { AddonTranslation } from "./types";
import { ADDON_TRANSLATIONS_AR } from "./ar";
import { ADDON_TRANSLATIONS_UR } from "./ur";

/**
 * Urdu and Arabic write-ups for the add-on pages, keyed by locale, then slug.
 * English lives one folder up (`ADDON_CONTENT`); a missing field or slug
 * falls back to it.
 */
export const ADDON_TRANSLATIONS: Record<string, Record<string, AddonTranslation>> = {
  ur: ADDON_TRANSLATIONS_UR,
  ar: ADDON_TRANSLATIONS_AR,
};

export function getAddonTranslation(slug: string, locale: string): AddonTranslation | undefined {
  return ADDON_TRANSLATIONS[locale]?.[slug];
}

/**
 * Slugs whose page is translated into every non-English locale. Only these
 * count as translated for hreflang and the sitemap (`isTranslated` in
 * lib/seo/metadata.ts); an add-on the API adds later stays English-canonical
 * until its translations land.
 */
export const TRANSLATED_ADDON_SLUGS: ReadonlySet<string> = new Set(
  Object.keys(ADDON_TRANSLATIONS_UR).filter((slug) =>
    Object.values(ADDON_TRANSLATIONS).every((byLocale) => Boolean(byLocale[slug]))
  )
);

export { addonChrome, ADDON_CHROME } from "./chrome";
export type { AddonChrome, AddonTranslation } from "./types";
