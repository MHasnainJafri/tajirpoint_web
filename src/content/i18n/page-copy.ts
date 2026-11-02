/**
 * Page copy in English, Urdu and Arabic, kept next to each other per page.
 *
 * The home, pricing and add-on pages read next-intl messages (messages/*.json).
 * The feature pages and the lead pages (book a demo, call back, contact,
 * about) keep their copy in typed files under src/content/i18n/ instead, so a
 * missing key is a type error, not a blank on the page. English is always
 * complete; a locale without its own copy falls back to English, and the page
 * then renders `lang="en" dir="ltr"` so screen readers and line direction stay
 * right.
 *
 * Urdu: natural Pakistani Urdu as a shopkeeper says it (کھاتہ، اُدھار، ڈیمو).
 * Arabic: Modern Standard Arabic. Owner to-do: a native speaker reads both.
 */
export type SiteLocale = "en" | "ur" | "ar";

export type Localized<T> = { en: T } & Partial<Record<Exclude<SiteLocale, "en">, T>>;

export interface PickedCopy<T> {
  t: T;
  /** The language the copy is actually in (English when it fell back). */
  lang: SiteLocale;
  dir: "ltr" | "rtl";
  rtl: boolean;
}

export function pickCopy<T>(copy: Localized<T>, locale: string): PickedCopy<T> {
  const lang: SiteLocale = (locale === "ur" || locale === "ar") && copy[locale] ? locale : "en";
  const rtl = lang !== "en";
  return { t: (copy[lang] ?? copy.en) as T, lang, dir: rtl ? "rtl" : "ltr", rtl };
}

/** Forward arrow for buttons: points the reading direction. */
export function forwardArrow(rtl: boolean): string {
  return rtl ? "←" : "→";
}

/** Back arrow for "← All businesses" style links. */
export function backArrow(rtl: boolean): string {
  return rtl ? "→" : "←";
}
