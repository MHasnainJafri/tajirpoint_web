import type { AddonStatus } from "@/lib/marketing/addon-status";
import type { LabelLocale, LocationPage, LocationSlug } from "./types";
import { LOCATION_SLUGS } from "./types";
import pakistan from "./pakistan";
import lahore from "./lahore";
import karachi from "./karachi";
import islamabadRawalpindi from "./islamabad-rawalpindi";
import faisalabad from "./faisalabad";
import uk from "./uk";

export type * from "./types";
export { LOCATION_SLUGS } from "./types";

/** Every location page, in the order the hub and footer list them. */
export const LOCATIONS: readonly LocationPage[] = [
  pakistan,
  lahore,
  karachi,
  islamabadRawalpindi,
  faisalabad,
  uk,
];

const BY_SLUG = new Map<string, LocationPage>(LOCATIONS.map((l) => [l.slug, l]));

export function getLocation(slug: string): LocationPage | undefined {
  return BY_SLUG.get(slug);
}

export function isLocationSlug(value: string): value is LocationSlug {
  return (LOCATION_SLUGS as readonly string[]).includes(value);
}

export function locationPath(slug: LocationSlug): string {
  return `/pos/${slug}`;
}

/** The hub page (/pos). */
export const LOCATIONS_HUB = {
  path: "/pos",
  updated: "2026-11-02",
  seo: {
    title: "POS System for Pakistan and the UK",
    description:
      "Where TajirPoint POS fits: Pakistani cities and UK takeaways. Currency, tax authority and our honest status, payments and languages for each place.",
    keywords: ["pos system pakistan", "takeaway epos uk", "pos by city", "pos software locations"],
  },
  og: {
    eyebrow: "TajirPoint by location",
    title: "What TajirPoint does where you are.",
    sub: "Pakistan and its main cities, and UK takeaways: tax, payments and languages, honestly.",
    pills: ["Pakistan", "Lahore", "Karachi", "UK"],
  },
  hero: {
    eyebrow: "TajirPoint by location",
    headline: "What TajirPoint does where you are.",
    sub: "Tax, payments, language and power are different in every place. Pick yours to see what works today, what is coming, and what we have not built yet.",
  },
  gulf: {
    heading: "The UAE and Saudi Arabia: not ready yet",
    paragraphs: [
      "The app works in Arabic, a shop can trade in dirhams or riyals, and Stripe supports businesses in the UAE. But we have not built UAE e-invoicing, and we do not issue Saudi ZATCA (FATOORA) e-invoices. A VAT-registered business in Saudi Arabia needs ZATCA-compliant invoices, so TajirPoint is not the right choice there today.",
      "If you are in the Gulf and want to talk it through, message us. We will tell you honestly whether TajirPoint fits.",
    ],
  },
  elsewhere: {
    heading: "Somewhere else?",
    paragraphs: [
      "TajirPoint runs in the browser, as a Windows app and on Android, so it works in most countries. Set your own currency and tax rates. Country-specific tax reporting is not built outside the places above, so check with us first if you must report invoices to a tax authority.",
    ],
  },
  faqs: [
    {
      q: "Can I use TajirPoint outside Pakistan and the UK?",
      a: "Yes. It works in most countries with your own currency and tax rates, but tax-authority reporting (FBR, ZATCA, UAE e-invoicing, Making Tax Digital) is not built yet.",
    },
    {
      q: "Do you have offices in these cities?",
      a: "No. TajirPoint is operated from Islamabad, Pakistan, and there are no city offices. Setup, training and support are done over WhatsApp, email and video call.",
    },
  ],
} as const;

/** Footer column heading, per site locale. */
export const LOCATIONS_HEADING: Record<LabelLocale, string> = {
  en: "Locations",
  ur: "مقامات",
  ar: "المواقع",
};

/** The footer's "all locations" link, per site locale. */
export const ALL_LOCATIONS_LABEL: Record<LabelLocale, string> = {
  en: "All locations",
  ur: "تمام مقامات",
  ar: "كل المواقع",
};

export function labelLocale(locale: string): LabelLocale {
  return locale === "ur" || locale === "ar" ? locale : "en";
}

/** How a FAQ answer names an add-on's live status, mid-sentence. */
export const STATUS_PHRASE: Record<AddonStatus, string> = {
  active: "available now",
  contact_us: "set up by our team on request",
  coming_soon: "coming soon",
  unavailable: "not available at the moment",
};
