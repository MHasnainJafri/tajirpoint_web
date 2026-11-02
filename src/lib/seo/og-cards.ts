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
import { GUIDE_CARD_BY_PATH, GUIDE_OG_CARDS } from "@/content/guides/og";

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
  ...GUIDE_OG_CARDS,
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
  "/features/khata": "feature-khata",
  "/features/offline": "feature-offline",
  "/features/accounting": "feature-accounting",
  "/features/van-sales": "feature-van-sales",
  "/features/e-invoicing": "feature-e-invoicing",
  ...Object.fromEntries(BUSINESSES.map((b) => [`/business/${b.slug}`, `business-${b.slug}`])),
  ...GUIDE_CARD_BY_PATH,
};

/** The share image path for a page, or undefined when it has no card of its own. */
export function ogImageForPath(path: string): string | undefined {
  const id = CARD_BY_PATH[path];
  return id ? `/og/${id}.png` : undefined;
}
