import type { AddonContent } from "../types";
import type { AddonStatus } from "@/lib/marketing/addon-status";

/**
 * One add-on's write-up in Urdu or Arabic (Crew TP-490, part 3).
 *
 * Every field is optional: a field left out falls back to the English
 * write-up in `src/content/addons/<slug>.ts`, so a page is never empty while a
 * translation is partial. Rules on top of the English ones (`../types.ts`):
 *
 * - Same facts as the English entry, nothing added. When the English copy
 *   changes, change the translations in the same commit (or delete the
 *   changed field here so it falls back to English).
 * - Product and add-on names stay as they are, in Latin letters
 *   ("TajirPoint", "Coupons & Discounts", "Stripe", "Light", "Shop").
 * - `keywords` are left in English on purpose (search engines ignore the
 *   keywords tag; the English phrases are what the API admin edits).
 * - Machine translation reviewed by us, not yet by a native speaker
 *   (owner to-do: native review).
 */
export type AddonTranslation = { slug: string } & Partial<Omit<AddonContent, "slug">>;

/** The fixed words around the write-up on an add-on page. */
export interface AddonChrome {
  home: string;
  addons: string;
  allAddons: string;
  relatedAddons: string;
  atAGlance: string;
  price: string;
  status: string;
  type: string;
  onThisPage: string;
  sections: {
    whatItIs: string;
    problems: string;
    features: string;
    howItWorks: string;
    pricing: string;
    faq: string;
  };
  keyFeatures: string;
  whoFor: string;
  whatYouNeed: string;
  /** "See all plans on the [pricing page]." in three pieces, link in the middle. */
  seePlans: [before: string, link: string, after: string];
  faqTitle: (name: string) => string;
  cta: {
    startTrial: string;
    askQuestion: string;
    askSetup: string;
    tellMeWhenReady: string;
    askAboutIt: string;
    whatsappUs: string;
  };
  whatsappMessage: (product: string, addonName: string) => string;
  finalTitle: Record<"active" | "coming_soon" | "other", (name: string) => string>;
  statusLabel: Record<AddonStatus, string>;
  statusHint: Record<AddonStatus, string>;
  /** Price words; amounts keep the API's currency format. */
  free: string;
  askUs: string;
  perMonth: (money: string) => string;
  oneTime: (money: string) => string;
  planLight: string;
  planShop: string;
  /** Group chip labels by group id (`groupFor` in lib/marketing/addons.ts). */
  groups: Record<string, string>;
  /** "→" in English, "←" in right-to-left languages. */
  arrow: string;
}
