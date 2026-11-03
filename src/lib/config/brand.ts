/**
 * The brand layer: who this build of the marketing site is for.
 *
 * One codebase, several brands (owner, 2 Nov 2026). TajirPoint and a client
 * such as Hey Orders run the SAME source; only the name, logo, colours, hosts,
 * country and languages differ, and they come from build-time settings
 * (`NEXT_PUBLIC_BRAND_*` and friends). Never `if (brand === "…")` in a page:
 * add a setting here instead.
 *
 * Nothing set = TajirPoint exactly as it always was, so the tajirpoint.com
 * build does not change. A client build sets the variables in its env file
 * (see scripts/brands/*.env.example) and is built with
 * scripts/build-brand-site.sh, which also refuses output that still names us.
 *
 * Rules for this file:
 *  - No imports. next.config.ts and scripts load it, and scripts/media.mjs
 *    loads the business catalogue with Node's type stripping.
 *  - Every `process.env.NEXT_PUBLIC_*` is written out literally: Next only
 *    inlines literal reads into browser code.
 *
 * Variables (all optional, all build-time; rebuild after changing them):
 *   NEXT_PUBLIC_BRAND_NAME          display name ("Hey Orders")
 *   NEXT_PUBLIC_BRAND_ALT_NAMES     other spellings for structured data, "|"-separated
 *   NEXT_PUBLIC_BRAND_DESCRIPTION   default meta description
 *   NEXT_PUBLIC_BRAND_TAGLINE       short line ("Run your shop. Everywhere.")
 *   NEXT_PUBLIC_BRAND_LOGO          square mark for light surfaces (/public path or https URL)
 *   NEXT_PUBLIC_BRAND_LOGO_ON_DARK  mark for dark surfaces (defaults to the logo)
 *   NEXT_PUBLIC_BRAND_FAVICON       tab icon (defaults to the logo)
 *   NEXT_PUBLIC_BRAND_ICON          square PNG, 512 px: manifest, apple-touch, structured data
 *   NEXT_PUBLIC_BRAND_PRIMARY       the action colour (hex); hover, soft and text shades mix from it
 *   NEXT_PUBLIC_BRAND_INK           the text/chrome colour (hex)
 *   NEXT_PUBLIC_BRAND_WEBSITE       production origin; NEXT_PUBLIC_SITE_URL still wins when set
 *   NEXT_PUBLIC_APP_URL             the web app (sign in, sign up at /register)
 *   NEXT_PUBLIC_API_URL             the backend origin (forms, plans, add-ons); /api/v1 is added
 *   NEXT_PUBLIC_MEDIA_HOST          host of the add-on icons the backend catalogue links to
 *   NEXT_PUBLIC_BRAND_EMAIL         every enquiry (sales, support, legal)
 *   NEXT_PUBLIC_BRAND_PRIVACY_EMAIL privacy requests (defaults to the email)
 *   NEXT_PUBLIC_BRAND_WHATSAPP      WhatsApp number in E.164 ("+923446800893"); empty = no WhatsApp
 *   NEXT_PUBLIC_BRAND_LEGAL_NAME    the company that provides the service
 *   NEXT_PUBLIC_BRAND_LEGAL_URL     its website
 *   NEXT_PUBLIC_BRAND_COPYRIGHT     footer fine print (defaults to the catalogue's footer.copyright)
 *   NEXT_PUBLIC_BRAND_FOUNDED       founding year for structured data
 *   NEXT_PUBLIC_BRAND_ANDROID_APP_URL Play Store listing of the POS app (empty = no button)
 *   NEXT_PUBLIC_BRAND_API_PREFIX    env-variable prefix in the API docs' examples ("TAJIR")
 *   NEXT_PUBLIC_BRAND_CITY          where it is registered
 *   NEXT_PUBLIC_BRAND_COUNTRY       ISO country code ("PK", "GB"): the market the site sells to
 *   NEXT_PUBLIC_BRAND_GOVERNING_LAW "the laws of England and Wales" (defaults by country)
 *   NEXT_PUBLIC_BRAND_COURTS        "the courts of England and Wales" (defaults by country)
 *   NEXT_PUBLIC_LOCALES             languages, comma-separated, English first ("en" or "en,ur,ar")
 *   NEXT_PUBLIC_BUSINESS_TYPES      backend Shop.BusinessType values this server serves
 *                                   ("restaurant"); mirrors PLATFORM_BUSINESS_TYPES. Empty = all
 *   NEXT_PUBLIC_HIDDEN_PAGES        extra paths to leave out, comma-separated ("/partners,/changelog")
 *   NEXT_PUBLIC_BRAND_MESSAGES      copy overlay: messages/brands/<value>.<locale>.json (src/i18n/brand-messages.ts)
 */

/** A trimmed, non-empty value, or undefined. */
function pick(value: string | undefined): string | undefined {
  const v = value?.trim();
  return v ? v : undefined;
}

/** Like `pick`, but an explicitly empty value is kept: it means "none". */
function pickAllowEmpty(value: string | undefined): string | undefined {
  return typeof value === "string" ? value.trim() : undefined;
}

function list(value: string | undefined, sep = ","): string[] {
  return (value ?? "")
    .split(sep)
    .map((s) => s.trim())
    .filter(Boolean);
}

function stripSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

function hostOf(url: string): string {
  try {
    return new URL(url).host;
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/.*$/, "");
  }
}

/** Only a plain hex colour is accepted: it is written into a <style> and a manifest. */
function hex(value: string | undefined): string | undefined {
  const v = pick(value);
  return v && /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(v) ? v : undefined;
}

/** Relative luminance (WCAG) of a #rgb / #rrggbb colour. */
function luminance(colour: string): number {
  let h = colour.slice(1);
  if (h.length === 3) h = [...h].map((c) => c + c).join("");
  const [r, g, b] = [0, 2, 4].map((i) => {
    const c = parseInt(h.slice(i, i + 2), 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio of two hex colours. */
function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x) as [number, number];
  return (hi + 0.05) / (lo + 0.05);
}

/** Black or white, whichever reads better on `colour`. */
function onColour(colour: string): "#0a0a0a" | "#ffffff" {
  const l = luminance(colour);
  return (l + 0.05) / 0.0549 >= 1.05 / (l + 0.05) ? "#0a0a0a" : "#ffffff";
}

const env = {
  name: pick(process.env.NEXT_PUBLIC_BRAND_NAME),
  altNames: pick(process.env.NEXT_PUBLIC_BRAND_ALT_NAMES),
  description: pick(process.env.NEXT_PUBLIC_BRAND_DESCRIPTION),
  tagline: pick(process.env.NEXT_PUBLIC_BRAND_TAGLINE),
  logo: pick(process.env.NEXT_PUBLIC_BRAND_LOGO),
  logoOnDark: pick(process.env.NEXT_PUBLIC_BRAND_LOGO_ON_DARK),
  favicon: pick(process.env.NEXT_PUBLIC_BRAND_FAVICON),
  icon: pick(process.env.NEXT_PUBLIC_BRAND_ICON),
  primary: hex(process.env.NEXT_PUBLIC_BRAND_PRIMARY),
  ink: hex(process.env.NEXT_PUBLIC_BRAND_INK),
  website: pick(process.env.NEXT_PUBLIC_BRAND_WEBSITE),
  appUrl: pick(process.env.NEXT_PUBLIC_APP_URL),
  apiUrl: pick(process.env.NEXT_PUBLIC_API_URL),
  mediaHost: pick(process.env.NEXT_PUBLIC_MEDIA_HOST),
  email: pick(process.env.NEXT_PUBLIC_BRAND_EMAIL),
  privacyEmail: pick(process.env.NEXT_PUBLIC_BRAND_PRIVACY_EMAIL),
  whatsapp: pickAllowEmpty(process.env.NEXT_PUBLIC_BRAND_WHATSAPP),
  legalName: pick(process.env.NEXT_PUBLIC_BRAND_LEGAL_NAME),
  copyright: pick(process.env.NEXT_PUBLIC_BRAND_COPYRIGHT),
  founded: pick(process.env.NEXT_PUBLIC_BRAND_FOUNDED),
  androidApp: pickAllowEmpty(process.env.NEXT_PUBLIC_BRAND_ANDROID_APP_URL),
  apiPrefix: pick(process.env.NEXT_PUBLIC_BRAND_API_PREFIX),
  legalUrl: pickAllowEmpty(process.env.NEXT_PUBLIC_BRAND_LEGAL_URL),
  city: pick(process.env.NEXT_PUBLIC_BRAND_CITY),
  country: pick(process.env.NEXT_PUBLIC_BRAND_COUNTRY)?.toUpperCase(),
  governingLaw: pick(process.env.NEXT_PUBLIC_BRAND_GOVERNING_LAW),
  courts: pick(process.env.NEXT_PUBLIC_BRAND_COURTS),
  locales: pick(process.env.NEXT_PUBLIC_LOCALES),
  businessTypes: pick(process.env.NEXT_PUBLIC_BUSINESS_TYPES),
  hiddenPages: pick(process.env.NEXT_PUBLIC_HIDDEN_PAGES),
};

/**
 * TajirPoint's own values, used when NEXT_PUBLIC_BRAND_NAME is unset. The test
 * is written on the variable itself so Next inlines it and the minifier drops
 * the branch not taken: another brand's build never ships our name, hosts or
 * number in its JavaScript (scripts/build-brand-site.sh checks that).
 */
const OURS = {
  name: "TajirPoint",
  alternateNames: ["Tajir Point", "Tajir Point POS", "TajirPoint POS"],
  description:
    "Point of sale, inventory, customer credit and accounting for stores, restaurants and distributors. Multi-currency support on web, desktop and Android. Free for 3 months.",
  tagline: "Run your shop. Everywhere.",
  website: "https://tajirpoint.com",
  appUrl: "https://app.tajirpoint.com",
  apiUrl: "https://api.tajirpoint.com",
  mediaHost: "media.tajirpoint.com",
  email: "hello@tajirpoint.com",
  whatsapp: "+923446800893",
  legalName: "Tajir Point (SMC-Private) Limited",
  legalUrl: "https://tajirpoint.com",
  city: "Islamabad",
  founded: "2022" as string | undefined,
  androidAppUrl: "https://play.google.com/store/apps/details?id=com.tajirpoint.pos",
  apiEnvPrefix: "TAJIR",
};

/** Another brand's fallbacks: nothing of ours, derived from its own settings. */
function clientDefaults(brandName: string): typeof OURS {
  const site = stripSlash(env.website ?? "https://example.com");
  const host = hostOf(site);
  return {
    name: brandName,
    alternateNames: [],
    description: brandName,
    tagline: brandName,
    website: site,
    appUrl: `https://app.${host}`,
    apiUrl: `https://api.${host}`,
    mediaHost: `media.${host}`,
    email: `hello@${host}`,
    whatsapp: "",
    legalName: brandName,
    legalUrl: "",
    city: "",
    founded: undefined,
    androidAppUrl: "",
    apiEnvPrefix: brandName.toUpperCase().replace(/[^A-Z0-9]+/g, "_"),
  };
}

const D = process.env.NEXT_PUBLIC_BRAND_NAME ? clientDefaults(env.name ?? "") : OURS;

/** True when no brand variable is set: the TajirPoint build, unchanged. */
const isDefault = !process.env.NEXT_PUBLIC_BRAND_NAME;

/** Countries we know the legal wording for; anything else must set it. */
const COUNTRY_LAW: Record<string, { name: string; law: string; courts: string }> = {
  PK: {
    name: "Pakistan",
    law: "the laws of Pakistan",
    courts: "the courts at Islamabad, Pakistan",
  },
  GB: {
    name: "United Kingdom",
    law: "the laws of England and Wales",
    courts: "the courts of England and Wales",
  },
};

const country = env.country ?? "PK";
const countryLaw = COUNTRY_LAW[country];

/** Every language the site has copy for, in menu order. English is always first. */
export const ALL_LOCALES = ["en", "ur", "ar"] as const;
export type BrandLocale = (typeof ALL_LOCALES)[number];

function resolveLocales(): BrandLocale[] {
  const wanted = list(env.locales).filter((l): l is BrandLocale =>
    (ALL_LOCALES as readonly string[]).includes(l)
  );
  // English is the default locale (bare URLs) and is never switched off.
  return wanted.length ? ["en", ...wanted.filter((l) => l !== "en")] : [...ALL_LOCALES];
}

const name = D.name;
const website = stripSlash(env.website ?? D.website);
const appUrl = stripSlash(env.appUrl ?? D.appUrl);
const apiOrigin = stripSlash(env.apiUrl ?? D.apiUrl).replace(/\/api\/v1$/, "");
const whatsappE164 = env.whatsapp ?? D.whatsapp;
const whatsappDigits = whatsappE164.replace(/\D/g, "");
const email = env.email ?? D.email;

/** "+923446800893" -> "+92 344 6800893"; other numbers are shown as given. */
function whatsappDisplay(e164: string): string {
  const m = /^\+92(\d{3})(\d{7})$/.exec(e164);
  return m ? `+92 ${m[1]} ${m[2]}` : e164;
}

export const brand = {
  /** True for the TajirPoint build (no brand variable set). */
  isDefault,
  name,
  /** Other spellings for structured data ("Tajir Point"). */
  alternateNames: env.altNames ? list(env.altNames, "|") : D.alternateNames,
  description: env.description ?? D.description,
  tagline: env.tagline ?? D.tagline,

  /** True when the brand brings its own logo file (the header then shows it, not our drawn mark). */
  ownLogo: Boolean(env.logo),
  /** Logo files. A default build draws its own lockup inline and uses these as files only. */
  logo: env.logo ?? "/brand/mark/mark-on-white.svg",
  logoOnDark: env.logoOnDark ?? env.logo ?? "/brand/mark/mark-on-dark.svg",
  favicon: env.favicon ?? env.logo ?? "/favicon.svg",
  /** Square raster icon (manifest, apple-touch, Organization logo). */
  icon: env.icon ?? env.logo ?? "/brand/png/logo-512.png",

  /** Colours; undefined = the site's own palette in globals.css. */
  primary: env.primary,
  ink: env.ink,

  /** Production origin (canonical URLs fall back to it). */
  website,
  /** "tajirpoint.com": the site's host as written in copy. */
  host: hostOf(website),
  /** The web app: sign in here, sign up at `${appUrl}/register`. */
  appUrl,
  appHost: hostOf(appUrl),
  /** The backend origin, without /api/v1. */
  apiOrigin,
  /** The public API base the developer docs show. */
  apiBase: `${apiOrigin}/api/v1`,
  mediaHost: env.mediaHost ?? D.mediaHost,

  email,
  privacyEmail: env.privacyEmail ?? email,
  /** Empty when the brand has no WhatsApp line: every WhatsApp link is then left out. */
  whatsappE164,
  whatsappDisplay: whatsappDisplay(whatsappE164),
  whatsappUrl: whatsappDigits ? `https://wa.me/${whatsappDigits}` : "",

  legalName: env.legalName ?? D.legalName,
  legalUrl: env.legalUrl ?? D.legalUrl,
  city: env.city ?? D.city,
  /** Footer fine print; undefined = the catalogue's own line (footer.copyright). */
  copyright: env.copyright,
  /** Organization `foundingDate` (a year). */
  founded: env.founded ?? D.founded,
  /** Play Store listing of the POS app; "" = no store button. */
  androidAppUrl: env.androidApp ?? D.androidAppUrl,
  /** Prefix of the environment variables in the API docs' examples ("TAJIR" -> $TAJIR_TOKEN). */
  apiEnvPrefix: env.apiPrefix ?? D.apiEnvPrefix,
  /** ISO code of the market the site sells to. */
  country,
  countryName: countryLaw?.name ?? country,
  governingLaw:
    env.governingLaw ?? countryLaw?.law ?? "the laws of the country where we are registered",
  courts: env.courts ?? countryLaw?.courts ?? "the courts of the country where we are registered",

  /** Pakistan-only content (PKR, FBR, khata, Urdu, PK cities) shows only for PK. */
  isPakistan: country === "PK",
  locales: resolveLocales(),
  /** Backend business types served; empty = every type. */
  businessTypes: list(env.businessTypes).map((t) => t.toLowerCase()),
  /** Paths switched off by NEXT_PUBLIC_HIDDEN_PAGES. */
  extraHiddenPages: list(env.hiddenPages).map((p) => `/${p.replace(/^\/+|\/+$/g, "")}`),
} as const;

export type Brand = typeof brand;

/**
 * The CSS custom properties a brand colour overrides (globals.css tokens),
 * for the light page and for the always-dark showcase surfaces. Empty for
 * the default build, which keeps globals.css exactly as it is.
 */
export function brandThemeCss(): string {
  const rules: string[] = [];
  const p = brand.primary;
  const ink = brand.ink;
  if (p) {
    const on = onColour(p);
    // On the always-dark surfaces the accent must still show: a near-black
    // brand colour (Hey Orders: black and white) turns white there.
    const pd = accentOnDark();
    const onDark = onColour(pd);
    const light = [
      `--color-mint: ${p}`,
      `--color-brand: ${p}`,
      `--color-emerald: ${p}`,
      `--color-mint-hover: color-mix(in srgb, ${p} 88%, black)`,
      `--color-brand-hover: color-mix(in srgb, ${p} 88%, black)`,
      // The shade that has to read as text on white (4.5:1 and up).
      `--color-mint-2: color-mix(in srgb, ${p} 62%, black)`,
      `--color-mint-soft: color-mix(in srgb, ${p} 10%, white)`,
      `--color-mint-line: color-mix(in srgb, ${p} 40%, transparent)`,
      `--color-on-brand: ${on}`,
      `--color-mint-ink: ${on}`,
    ];
    const dark = [
      `--color-mint: ${pd}`,
      `--color-brand: ${pd}`,
      `--color-mint-2: color-mix(in srgb, ${pd} 70%, white)`,
      `--color-mint-hover: color-mix(in srgb, ${pd} 85%, black)`,
      `--color-brand-hover: color-mix(in srgb, ${pd} 85%, black)`,
      `--color-mint-soft: color-mix(in srgb, ${pd} 8%, transparent)`,
      `--color-mint-line: color-mix(in srgb, ${pd} 30%, transparent)`,
      `--color-on-brand: ${onDark}`,
      `--color-mint-ink: ${onDark}`,
    ];
    rules.push(
      `:root{${light.join(";")}}`,
      `.on-dark,.dark{${dark.join(";")}}`,
      // Buttons filled with the accent set their text as #0A0A0A (right on
      // our mint); for another brand it follows --color-on-brand instead.
      `[class*="bg-[var(--color-mint)]"][class]{color:var(--color-on-brand)}`
    );
  }
  if (ink) {
    rules.push(
      `:root{--color-ink:${ink};--color-ink-2:${ink};--color-forest:${ink};--color-forest-2:${ink}}`
    );
  }
  return rules.join("\n");
}

/**
 * The accent as it shows on a dark surface (share cards, dark panels): the
 * brand colour, or white when the brand colour is too dark to read there.
 */
export function accentOnDark(): string {
  const p = brand.primary ?? "#00D27A";
  return contrast(p, "#0a0a0a") >= 3 ? p : "#ffffff";
}

/** Short names for copy: `${BRAND_NAME} keeps your stock…`. */
export const BRAND_NAME = brand.name;
/** "tajirpoint.com" as written in copy. */
export const BRAND_HOST = brand.host;
/** The enquiries mailbox as written in copy. */
export const BRAND_EMAIL = brand.email;
/** "app.tajirpoint.com" as written in copy. */
export const BRAND_APP_HOST = brand.appHost;
