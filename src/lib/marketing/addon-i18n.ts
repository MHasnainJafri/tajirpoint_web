import { ADDON_CONTENT, type AddonContent } from "@/content/addons";
import { addonChrome, getAddonTranslation, type AddonChrome } from "@/content/addons/i18n";
import { routing } from "@/i18n/routing";
import { LIGHT_PLAN_ADDONS, type Addon } from "./addons";

/**
 * Add-on pages in Urdu and Arabic (Crew TP-490, part 3).
 *
 * The catalogue (`getAddonCatalogue`) stays English: names, status and price
 * come from the API. This layer swaps the site's write-up for its
 * translation, field by field, and turns the price and group words into the
 * page's language. Add-on names are never translated.
 */

const CONTENT_FIELDS = [
  "seoTitle",
  "seoDescription",
  "keywords",
  "schemaSubCategory",
  "headline",
  "overview",
  "whoFor",
  "problems",
  "features",
  "howItWorks",
  "needs",
  "setup",
  "faqs",
  "comingSoonNote",
] as const satisfies ReadonlyArray<keyof AddonContent>;

/**
 * "Free" / "Ask us" / "$12/month" / "$40 one-time" (see `priceLabel`) in the
 * chrome's words. The amount keeps the API's currency format; anything
 * unexpected is shown as it came.
 */
export function localizePrice(price: string, chrome: AddonChrome): string {
  if (price === "Free") return chrome.free;
  if (price === "Ask us") return chrome.askUs;
  if (price.endsWith("/month")) return chrome.perMonth(price.slice(0, -"/month".length));
  if (price.endsWith(" one-time")) return chrome.oneTime(price.slice(0, -" one-time".length));
  return price;
}

/** "Included with the free Light plan" / "Needs the Shop plan or above", per locale. */
export function planLineFor(slug: string, locale: string): string {
  const chrome = addonChrome(locale);
  return LIGHT_PLAN_ADDONS.includes(slug) ? chrome.planLight : chrome.planShop;
}

/**
 * The add-on as shown on a `locale` page. English is returned untouched.
 *
 * A field the admin overrode through the API's `marketing` object keeps the
 * admin's English: the override may correct a fact the translation still
 * repeats, and a correct English line beats a wrong Urdu one. Fields are
 * compared by reference with the site's English write-up, which
 * `applyMarketing` leaves in place when it does not override them.
 */
export function localizeAddon(addon: Addon, locale: string): Addon {
  if (locale === routing.defaultLocale) return addon;
  const chrome = addonChrome(locale);
  const base = ADDON_CONTENT[addon.slug];
  const t = base ? getAddonTranslation(addon.slug, locale) : undefined;

  let content = addon.content;
  let summary = addon.summary;
  if (base && t) {
    const next: Record<string, unknown> = { ...addon.content };
    for (const key of CONTENT_FIELDS) {
      const value = t[key];
      if (value === undefined || addon.content[key] !== base[key]) continue;
      next[key] = value;
    }
    content = next as unknown as AddonContent;
    if (t.headline && addon.summary === base.headline) summary = t.headline;
  }

  return {
    ...addon,
    content,
    summary,
    price: localizePrice(addon.price, chrome),
    group: { ...addon.group, label: chrome.groups[addon.group.id] ?? addon.group.label },
  };
}
