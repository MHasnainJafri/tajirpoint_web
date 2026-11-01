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

/** A configured profile URL, or "" when the variable is unset or not https. */
function profileUrl(value: string | undefined): string {
  const v = value?.trim() ?? "";
  return /^https:\/\/[^\s"<>]+$/.test(v) ? v : "";
}

/** An X (Twitter) handle such as "@tajirpoint", or "" when unset or malformed. */
function xHandle(value: string | undefined): string {
  const v = value?.trim().replace(/^@?/, "@") ?? "";
  return /^@[A-Za-z0-9_]{1,15}$/.test(v) ? v : "";
}

// Single source of truth for brand, URLs and social.
export const siteConfig = {
  /**
   * The brand as it is written everywhere else — the domain, the app names on
   * Google Play ("TajirPoint POS"), the copy and every page title. The spaced
   * form is kept as an alternate name in the Organization markup so a search
   * for "Tajir Point" still resolves to the same entity.
   */
  name: "TajirPoint",
  alternateNames: ["Tajir Point", "Tajir Point POS", "TajirPoint POS"],
  url: resolvedUrl,
  description:
    "Point of sale, inventory, customer credit and accounting for stores, restaurants and distributors. Multi-currency support on web, desktop and Android. Free for 3 months.",
  tagline: "Run your shop. Everywhere.",
  locale: "en",

  ogImage: "/og.png",
  /** Raster logo for structured data and the web manifest (generated from the mark SVG). */
  logo: "/brand/png/logo-512.png",

  // External links
  dashboardUrl: "https://app.tajirpoint.com",
  /** The POS web app's public sign-up route (Tajir-Point-Web `/register`). */
  signupUrl: "https://app.tajirpoint.com/register",
  /** Our own booking form. `/demo` redirects here with the query string. */
  demoPath: "/book-demo",
  docsUrl: "/docs",
  contactEmail: legal.email,

  /**
   * Official social profiles — Organization `sameAs` and the `twitter:site`
   * tag. Set ONLY to profiles the business actually owns, in the hosting
   * environment (see .env.example); unset ones are left out.
   *
   * There are deliberately no defaults. On 1 Nov 2026 the hard-coded ones
   * were checked: youtube.com/@tajirpoint is somebody else's channel,
   * x.com/tajirpoint does not exist, and the Facebook, Instagram and TikTok
   * handles could not be confirmed as ours. `sameAs` tells Google "this
   * profile is us", so a wrong one is worse than none.
   */
  social: {
    facebook: profileUrl(process.env.SOCIAL_FACEBOOK_URL),
    instagram: profileUrl(process.env.SOCIAL_INSTAGRAM_URL),
    linkedin: profileUrl(process.env.SOCIAL_LINKEDIN_URL),
    youtube: profileUrl(process.env.SOCIAL_YOUTUBE_URL),
    tiktok: profileUrl(process.env.SOCIAL_TIKTOK_URL),
    x: xHandle(process.env.SOCIAL_X_HANDLE)
      ? `https://x.com/${xHandle(process.env.SOCIAL_X_HANDLE).slice(1)}`
      : "",
  },
  /** `twitter:site` — only when a real X account is configured. */
  twitterHandle: xHandle(process.env.SOCIAL_X_HANDLE),
} as const;

/** The configured social profile URLs, for `sameAs`. */
export function socialProfiles(): string[] {
  return Object.values(siteConfig.social).filter(Boolean);
}

export type SiteConfig = typeof siteConfig;

/** `wa.me` link with an optional prefilled message. */
export function whatsappLink(text?: string): string {
  return text ? `${legal.whatsappUrl}?text=${encodeURIComponent(text)}` : legal.whatsappUrl;
}
