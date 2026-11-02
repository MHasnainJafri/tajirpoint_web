/**
 * The social share cards (Open Graph / Twitter images), one per main page.
 *
 * Facebook, WhatsApp, Instagram link stickers, LinkedIn and X all show the
 * `og:image` of the shared URL. A page-specific card ("Restaurant POS with
 * KDS…") gets far more clicks in a WhatsApp group than the same generic
 * banner on every link, so each main page has its own.
 *
 * The images are PNGs rendered at build time by src/app/og/[image]/route.tsx
 * and served at /og/<id>.png — a dotted path, so the locale proxy skips them
 * and they are never redirected (Facebook and WhatsApp drop images behind a
 * redirect more often than not). Kept dark with flat colours so each file
 * stays around 100 KB — WhatsApp skips previews over ~300 KB.
 *
 * Text is English on every locale: the image renderer has no Urdu (Nastaliq)
 * shaping, and a broken Urdu card is worse than an English one.
 */
import { BUSINESSES } from "@/lib/marketing/businesses";
import { COMPARE_HUB, COMPARISONS } from "@/content/compare";
import { LOCATIONS, LOCATIONS_HUB, locationPath } from "@/content/locations";
import { GUIDE_CARD_BY_PATH, GUIDE_OG_CARDS } from "@/content/guides/og";
import { TOOL_CARD_BY_PATH, TOOL_OG_CARDS } from "@/content/tools/og";

export const OG_IMAGE_SIZE = { width: 1200, height: 630 } as const;

export interface OgCard {
  /** Small mint line above the title — the search term. */
  eyebrow: string;
  /** The big line. Keep it under ~60 characters so it fits in three lines. */
  title: string;
  /** One supporting sentence. */
  sub: string;
  /** Up to four short chips along the bottom. */
  pills: string[];
}

/** Chips for each business card: the features people search for. */
const BUSINESS_PILLS: Record<string, string[]> = {
  restaurants: ["Tables", "Kitchen display", "Waiter app", "Delivery"],
  "cafes-bakeries": ["Fast counter", "Loyalty", "Recipes", "Pre-orders"],
  "cloud-kitchens": ["Multi-brand", "Order board", "Packer screen", "Riders"],
  "retail-fashion": ["Size & colour", "Barcodes", "Exchanges", "Branches"],
  "grocery-kiryana": ["Barcode", "Khata", "Kg & cartons", "Offline"],
  pharmacy: ["Batches", "Expiry", "FEFO", "Prescriptions"],
  "electronics-mobile": ["IMEI", "Serials", "Quotations", "Credit"],
  "salons-services": ["Services", "Products", "Client history", "Loyalty"],
  "distributors-wholesale": ["Van sales", "Routes", "Price lists", "Credit"],
  "transport-delivery": ["Routes", "Drivers", "Proof of delivery", "Trip profit"],
  "factories-mills": ["Raw material", "Dealers", "Batches", "Credit"],
  "furniture-home": ["Quotations", "Variants", "Credit", "Delivery"],
};

const FREE_LINE = "Free for 3 months · No card needed · We move your data for free";

export const OG_CARDS: Record<string, OgCard> = {
  home: {
    eyebrow: "POS & back office",
    title: "The POS system that runs your whole business.",
    sub: "Shops, restaurants and distributors — stock, khata, accounting, delivery. Works offline.",
    pills: ["Restaurants", "Retail", "Wholesale", "Offline POS"],
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Free for 3 months. Simple monthly plans after.",
    sub: "No card to start. Cancel any time. No transaction fees.",
    pills: ["Light: free 3 months", "Shop", "Business"],
  },
  business: {
    eyebrow: "POS for every business",
    title: "One system, shaped around your counter.",
    sub: "Restaurants, retail, grocery, pharmacy, mobile shops, salons, distributors and more.",
    pills: ["Restaurants", "Grocery", "Pharmacy", "Distributors"],
  },
  "book-demo": {
    eyebrow: "Free demo",
    title: "See TajirPoint run your business.",
    sub: "A free demo on your own kind of business — and we move your data from your old POS.",
    pills: ["Free", "Your products", "Free data move"],
  },
  "get-a-call": {
    eyebrow: "Get a call back",
    title: "Interested? We'll call you.",
    sub: "Leave your business name and number — a person from our team calls within one working day.",
    pills: ["A real person", "Prices", "Hardware", "Switching"],
  },
  about: {
    eyebrow: "About TajirPoint",
    title: "A simple, honest system for businesses that work hard.",
    sub: "POS, stock, credit and accounting on web, Windows and Android — in English, Urdu and Arabic.",
    pills: ["Web", "Windows", "Android"],
  },
  contact: {
    eyebrow: "Contact",
    title: "Talk to the TajirPoint team.",
    sub: "Pricing, switching from another POS or support — we reply within one working day.",
    pills: ["WhatsApp", "Email"],
  },
  extensions: {
    eyebrow: "Extensions",
    title: "Add the tools your business needs.",
    sub: "Payments, accounting, compliance, e-commerce, shipping and customer tools — per shop.",
    pills: ["Payments", "E-commerce", "Shipping", "Compliance"],
  },
  changelog: {
    eyebrow: "What's new",
    title: "What's new in TajirPoint.",
    sub: "The features we released each month for shops and restaurants, in plain words.",
    pills: ["Monthly", "Restaurants", "Shops"],
  },
  partners: {
    eyebrow: "Partners",
    title: "Sell, set up or support TajirPoint.",
    sub: "For resellers, setup partners, hardware sellers and accountants. We agree terms with each partner.",
    pills: ["Resellers", "Setup partners", "Hardware"],
  },
  docs: {
    eyebrow: "API docs",
    title: "The TajirPoint REST API.",
    sub: "Products, stock, sales, customers, khata and webhooks — with examples.",
    pills: ["REST", "Webhooks", "Idempotency"],
  },
  "feature-khata": {
    eyebrow: "Khata app",
    title: "Your khata credit book, finally under control.",
    sub: "Every sale and payment posts to a live customer ledger, with limits, aging and reminders.",
    pills: ["Credit limits", "Aging", "Reminders", "Statements"],
  },
  "feature-offline": {
    eyebrow: "Offline POS",
    title: "Keep selling when the internet drops.",
    sub: "Every sale is saved on the device first and syncs on its own — no duplicates.",
    pills: ["Web", "Windows", "Android", "Auto sync"],
  },
  "feature-accounting": {
    eyebrow: "Accounting software",
    title: "Accounting books that keep themselves.",
    sub: "A double-entry ledger posted from every sale and purchase. P&L, balance sheet, bank reconciliation.",
    pills: ["Trial balance", "P&L", "Balance sheet", "Bank rec"],
  },
  "feature-van-sales": {
    eyebrow: "Van sales software",
    title: "Turn every truck into a mobile warehouse.",
    sub: "Load a van, sell and collect door to door, and balance every route at day end.",
    pills: ["Van stock", "Routes", "Cash collection", "Day-end"],
  },
  "feature-e-invoicing": {
    eyebrow: "Tax & e-invoicing",
    title: "Tax handling, built into checkout.",
    sub: "Tax-inclusive pricing, VAT/GST capture, withholding and audit-ready records.",
    pills: ["VAT / GST", "Withholding", "Receipts", "Audit trail"],
  },
  ...Object.fromEntries(
    BUSINESSES.map((b) => [
      `business-${b.slug}`,
      {
        eyebrow: b.hero.eyebrow,
        title: b.hero.headline,
        sub: FREE_LINE,
        pills: BUSINESS_PILLS[b.slug] ?? [],
      } satisfies OgCard,
    ])
  ),
  compare: { ...COMPARE_HUB.og, pills: [...COMPARE_HUB.og.pills] },
  ...Object.fromEntries(COMPARISONS.map((c) => [`compare-${c.slug}`, c.og satisfies OgCard])),
  pos: { ...LOCATIONS_HUB.og, pills: [...LOCATIONS_HUB.og.pills] },
  ...Object.fromEntries(LOCATIONS.map((l) => [`pos-${l.slug}`, l.og satisfies OgCard])),
  ...GUIDE_OG_CARDS,
  ...TOOL_OG_CARDS,
};

/**
 * Fallback cards for the add-on pages, one per filter group (ids as in
 * `groupFor` in lib/marketing/addons.ts). Each add-on the site knows at build
 * time has its own card (see og-addon-cards.ts); a group card is only used
 * for an add-on the backend lists after the build. No add-on names or
 * promises here: whether each add-on is ready is on its own page.
 */
export const ADDON_GROUP_CARDS: Record<string, OgCard> = {
  business: {
    eyebrow: "Business packs",
    title: "Add the screens your kind of business needs.",
    sub: "Packs for restaurants, kitchens, pharmacies and more. Each page says if it is ready.",
    pills: ["Add-ons", "Per shop"],
  },
  payments: {
    eyebrow: "Payment add-ons",
    title: "Take the payments your customers use.",
    sub: "Card and wallet add-ons. Each page says if it is ready or coming soon.",
    pills: ["Cards", "Wallets", "Per shop"],
  },
  "online-stores": {
    eyebrow: "Online store add-ons",
    title: "Your website orders and shop stock, together.",
    sub: "Connect an online store to your POS. Each page says if it is ready or coming soon.",
    pills: ["Orders", "Stock", "Per shop"],
  },
  delivery: {
    eyebrow: "Delivery add-ons",
    title: "Delivery apps, couriers and your own riders.",
    sub: "Bring delivery into your POS. Each page says if it is ready or set up by our team.",
    pills: ["Delivery apps", "Couriers"],
  },
  accounting: {
    eyebrow: "Accounting add-ons",
    title: "Books that keep themselves.",
    sub: "Accounting and cash add-ons for your shop. Each page says if it is ready.",
    pills: ["Books", "Cash", "Per shop"],
  },
  customers: {
    eyebrow: "Customer add-ons",
    title: "Offers and tools that bring customers back.",
    sub: "Discounts, coupons and more. Each page says if it is ready or coming soon.",
    pills: ["Discounts", "Coupons"],
  },
  messaging: {
    eyebrow: "Chat & call add-ons",
    title: "Orders by chat and phone.",
    sub: "Chat and phone ordering add-ons. Each page says if it is ready or coming soon.",
    pills: ["WhatsApp", "Phone"],
  },
  compliance: {
    eyebrow: "Tax & compliance add-ons",
    title: "Tax and compliance, built into the sale.",
    sub: "Tax reporting and sale checks. Each page says if it is ready or coming soon.",
    pills: ["Tax", "Checks"],
  },
  reports: {
    eyebrow: "Report add-ons",
    title: "See more in your numbers.",
    sub: "Report add-ons for your shop. Each page says if it is ready or coming soon.",
    pills: ["Reports"],
  },
  integrations: {
    eyebrow: "Integrations",
    title: "Connect TajirPoint to the tools you use.",
    sub: "Integration add-ons. Each page says if it is ready or coming soon.",
    pills: ["Add-ons", "Per shop"],
  },
};

/** Which card each page path uses. Paths not listed fall back to /og.png. */
const CARD_BY_PATH: Record<string, string> = {
  "/": "home",
  "/pricing": "pricing",
  "/business": "business",
  "/book-demo": "book-demo",
  "/get-a-call": "get-a-call",
  "/about": "about",
  "/contact": "contact",
  "/extensions": "extensions",
  "/docs": "docs",
  "/changelog": "changelog",
  "/partners": "partners",
  "/features/khata": "feature-khata",
  "/features/offline": "feature-offline",
  "/features/accounting": "feature-accounting",
  "/features/van-sales": "feature-van-sales",
  "/features/e-invoicing": "feature-e-invoicing",
  ...Object.fromEntries(BUSINESSES.map((b) => [`/business/${b.slug}`, `business-${b.slug}`])),
  "/compare": "compare",
  ...Object.fromEntries(COMPARISONS.map((c) => [`/compare/${c.slug}`, `compare-${c.slug}`])),
  [LOCATIONS_HUB.path]: "pos",
  ...Object.fromEntries(LOCATIONS.map((l) => [locationPath(l.slug), `pos-${l.slug}`])),
  ...GUIDE_CARD_BY_PATH,
  ...TOOL_CARD_BY_PATH,
};

/** The share image path for a page, or undefined when it has no card of its own. */
export function ogImageForPath(path: string): string | undefined {
  const id = CARD_BY_PATH[path];
  return id ? `/og/${id}.png` : undefined;
}
