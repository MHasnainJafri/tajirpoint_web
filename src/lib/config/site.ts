// The canonical origin. Every canonical tag, hreflang, OG url, JSON-LD `url`
// and sitemap <loc> is built from this, so it must NEVER silently fall back to
// localhost in a production build — that ships `<link rel="canonical"
// href="http://localhost:3000">` on every page and tells Google the whole site
// is a duplicate of an unreachable URL. Deploys should still set
// NEXT_PUBLIC_SITE_URL explicitly; this is the seatbelt for when they don't.
export const PRODUCTION_URL = "https://tajirpoint.com";

const resolvedUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "production" ? PRODUCTION_URL : "http://localhost:3000");

/**
 * Who operates TajirPoint, and how to reach them. ONE place for the legal
 * identity: the Terms, Privacy, Cookie and Refund policies, the contact page,
 * the footer and the Organization JSON-LD all read from here.
 *
 * Owner decision (10 Oct 2026): the operator is Anssol (SMC-Private) Limited,
 * Islamabad, Pakistan. No street address, no other offices, no certification
 * claims. Change a mailbox here only once it actually receives mail.
 */
export const legal = {
  /** The legal entity that provides the service. */
  operator: "Anssol (SMC-Private) Limited",
  operatorUrl: "https://anssol.com",
  city: "Islamabad",
  country: "Pakistan",
  /** The product name used in legal copy. */
  product: "TajirPoint",
  /** Every enquiry — sales, support, privacy, legal — goes to this mailbox. */
  email: "hello@tajirpoint.com",
  privacyEmail: "hello@tajirpoint.com",
  whatsappDisplay: "+92 344 6800893",
  whatsappE164: "+923446800893",
  whatsappUrl: "https://wa.me/923446800893",
  governingLaw: "the laws of Pakistan",
  courts: "the courts at Islamabad, Pakistan",
  /** Shown on every legal page. */
  lastUpdated: "10 October 2026",
  copyrightYear: 2026,
} as const;

// Single source of truth for brand, URLs and social.
export const siteConfig = {
  name: "Tajir Point",
  url: resolvedUrl,
  description:
    "POS, inventory, khata, online ordering and delivery for shops, restaurants and distributors — in English, Urdu and Arabic. Free for 3 months.",
  tagline: "Run your shop. Everywhere.",
  locale: "en",

  ogImage: "/og.png",
  twitterHandle: "@tajirpoint",

  // External links
  dashboardUrl: "https://app.tajirpoint.com",
  /** The POS web app's public sign-up route (Tajir-Point-Web `/register`). */
  signupUrl: "https://app.tajirpoint.com/register",
  /** Our own booking form. `/demo` redirects here with the query string. */
  demoPath: "/book-demo",
  docsUrl: "/docs",
  contactEmail: legal.email,

  social: {
    youtube: "https://youtube.com/@tajirpoint",
    whatsapp: legal.whatsappUrl,
    facebook: "https://facebook.com/tajirpoint",
    instagram: "https://instagram.com/tajirpoint",
    tiktok: "https://tiktok.com/@tajirpoint",
  },
} as const;

export type SiteConfig = typeof siteConfig;

/** `wa.me` link with an optional prefilled message. */
export function whatsappLink(text?: string): string {
  return text ? `${legal.whatsappUrl}?text=${encodeURIComponent(text)}` : legal.whatsappUrl;
}
