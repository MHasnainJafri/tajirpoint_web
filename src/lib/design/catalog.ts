/**
 * Structure for the marketing pages: ids, icon names, ordering, and the
 * layout-affecting flags. All human copy is keyed by these ids in
 * `messages/*.json` — nothing here is translated.
 *
 * The one exception is the product-mock data further down (invoice numbers,
 * amounts, party names). Those live inside simulated app screenshots, so they
 * are chrome rather than prose and are deliberately not translated.
 */

/* ── Industries ───────────────────────────────────────────────────── */

export const VERTICALS = [
  { id: "retail", icon: "store" },
  { id: "restaurants", icon: "utensils" },
  { id: "electronics", icon: "phone" },
  { id: "pharmacies", icon: "pill" },
  { id: "distribution", icon: "truck" },
  { id: "services", icon: "calendar" },
] as const;

export type VerticalId = (typeof VERTICALS)[number]["id"];

/* ── Feature deep-dives ───────────────────────────────────────────── */

/**
 * The five `/features/*` pages, split the way the nav mega-menu groups them.
 * `id` keys the `nav.megaFeatures.items.*` and `footer.links.*` translations,
 * so renaming one here means renaming it in all three message files.
 */
export const FEATURES = [
  { id: "khata", icon: "ledgerbook", href: "/features/khata", group: "money" },
  { id: "accounting", icon: "calculator", href: "/features/accounting", group: "money" },
  { id: "eInvoicing", icon: "receipt", href: "/features/e-invoicing", group: "money" },
  { id: "offline", icon: "refresh", href: "/features/offline", group: "ops" },
  { id: "vanSales", icon: "truck", href: "/features/van-sales", group: "ops" },
] as const;

export type FeatureId = (typeof FEATURES)[number]["id"];

/** Each industry section names its feature-grid entries by index. */
export const VERTICAL_FEATURE_COUNT = 6;
export const VERTICAL_CHIP_COUNT = 4;

/* ── Extension marketplace ────────────────────────────────────────── */

export const EXTENSION_CATEGORIES = [
  "verticals",
  "payments",
  "accounting",
  "compliance",
  "ecommerce",
  "shipping",
  "customer",
] as const;

export type ExtensionCategory = (typeof EXTENSION_CATEGORIES)[number];

/** `note` keys map to `extensions.notes.*` — omitted when there is no badge. */
export const EXTENSIONS = [
  { id: "restaurant", icon: "restaurant", cat: "verticals" },
  { id: "route-dispatch", icon: "route", cat: "verticals" },
  { id: "pharmacy", icon: "pill", cat: "verticals", note: "soon" },
  { id: "hr-payroll", icon: "users", cat: "verticals" },
  { id: "cloud-kitchen", icon: "cloud", cat: "verticals", note: "soon" },
  { id: "website-builder", icon: "globe", cat: "verticals" },

  { id: "stripe", icon: "brand-stripe", cat: "payments" },
  { id: "jazzcash", icon: "brand-jazzcash", cat: "payments", note: "soon" },
  { id: "easypaisa", icon: "brand-easypaisa", cat: "payments", note: "soon" },
  { id: "hblpay", icon: "brand-hbl", cat: "payments", note: "soon" },
  { id: "paypal", icon: "brand-paypal", cat: "payments" },
  { id: "razorpay", icon: "brand-razorpay", cat: "payments", note: "soon" },
  { id: "square", icon: "brand-square", cat: "payments", note: "soon" },

  { id: "accounting-gl", icon: "ledgerbook", cat: "accounting" },
  { id: "cash-management", icon: "pettycash", cat: "accounting" },
  { id: "quickbooks", icon: "brand-quickbooks", cat: "accounting", note: "soon" },

  { id: "fbr", icon: "brand-fbr", cat: "compliance", note: "soon" },
  { id: "age-verification", icon: "idcard", cat: "compliance", note: "soon" },

  { id: "shopify", icon: "brand-shopify", cat: "ecommerce", note: "soon" },
  { id: "woocommerce", icon: "brand-woocommerce", cat: "ecommerce", note: "soon" },
  { id: "magento", icon: "brand-magento", cat: "ecommerce", note: "soon" },
  { id: "wix", icon: "brand-wix", cat: "ecommerce", note: "soon" },
  { id: "bigcommerce", icon: "brand-bigcommerce", cat: "ecommerce", note: "soon" },

  { id: "leopards", icon: "leopard", cat: "shipping", note: "soon" },
  { id: "tcs", icon: "package", cat: "shipping", note: "soon" },
  { id: "postex", icon: "parcel", cat: "shipping", note: "soon" },

  { id: "customer-portal", icon: "key", cat: "customer" },
  { id: "delivery-aggregator", icon: "scooter", cat: "customer" },
  { id: "coupons", icon: "ticket", cat: "customer" },
  { id: "time-promos", icon: "alarmpct", cat: "customer" },
  { id: "whatsapp-ai", icon: "brand-whatsapp", cat: "customer", note: "soon" },
] as const satisfies ReadonlyArray<{
  id: string;
  icon: string;
  cat: ExtensionCategory;
  note?: string;
}>;

export const EXTENSION_COUNT = EXTENSIONS.length; // 31

/* ── Landing: "one platform instead of five tools" ────────────────── */

export const REPLACES = [
  { id: "till", icon: "printer" },
  { id: "register", icon: "book" },
  { id: "spreadsheet", icon: "spreadsheet" },
  { id: "accountant", icon: "calculator" },
  { id: "chat", icon: "chat" },
] as const;

/* ── Landing: bento differentiators ──────────────────────────────── */

export const BENTO = [
  { id: "offline", featured: true },
  { id: "accounting", featured: false },
  { id: "inventory", featured: false },
  { id: "distribution", featured: false },
  { id: "storefront", featured: false },
  { id: "security", featured: false },
] as const;

/* ── Landing: credit-ledger deep dive ─────────────────────────────── */

export const LEDGER_FEATURES = [
  { id: "customer-ledgers", icon: "book" },
  { id: "credit-limits", icon: "cash" },
  { id: "aging", icon: "chart" },
  { id: "supplier-ledgers", icon: "truck" },
] as const;

/* ── Landing: "in the box" capability buckets ─────────────────────── */

export const BUCKETS = [
  { id: "sell", num: "01", icon: "printer", featured: false, chips: 4 },
  { id: "inventory", num: "02", icon: "package", featured: true, chips: 4 },
  { id: "sales", num: "03", icon: "percent", featured: false, chips: 4 },
  { id: "purchases", num: "04", icon: "bag", featured: false, chips: 3 },
  { id: "dispatch", num: "05", icon: "route", featured: false, chips: 3 },
  { id: "money", num: "06", icon: "bank", featured: false, chips: 4 },
] as const;

/* ── Landing: how it works ────────────────────────────────────────── */

export const STEPS = ["import", "install", "connect", "sell"] as const;

/* ── Landing: the strip under the hero ────────────────────────────── */

/** Five capabilities, stated plainly, immediately under the fold. */
export const HERO_STRIP = [
  { id: "billing", icon: "barcode" },
  { id: "inventory", icon: "package" },
  { id: "reports", icon: "chart" },
  { id: "offline", icon: "refresh" },
  { id: "multistore", icon: "store" },
] as const;

/* ── Landing: hero mode switcher ──────────────────────────────────── */

/**
 * The tabs under the hero headline. Each one swaps the copy and the screen
 * inside the device frame, so a visitor sees their own trade in the first
 * screenful. `href` points at the matching /solutions page — every panel is
 * rendered (hidden ones included) so those links stay crawlable.
 *
 * The screen for each mode is a `<Shot>` slot named `pos-<id>`; retail falls
 * back to the coded POS mock until a real screenshot is dropped in.
 */
export const HERO_MODES = [
  { id: "retail", href: "/solutions/general-retail" },
  { id: "restaurants", href: "/solutions/restaurants" },
  { id: "electronics", href: "/solutions/electronics" },
  { id: "distribution", href: "/solutions/distributors" },
  { id: "all", href: "/solutions" },
] as const;

export type HeroModeId = (typeof HERO_MODES)[number]["id"];

/** The device screens share one aspect so switching tabs never shifts layout. */
export const HERO_SCREEN_RATIO = "1857/911";

/* ── Landing: stats rail ──────────────────────────────────────────── */

export const STATS = [
  { id: "extensions", n: EXTENSION_COUNT, suffix: "" },
  { id: "platforms", n: 3, suffix: "" },
  { id: "languages", n: 3, suffix: "" },
  { id: "reports", n: 30, suffix: "+" },
] as const;

/* ── Landing: pricing ─────────────────────────────────────────────── */

export const PLANS = [
  { id: "starter", popular: false, feats: 5 },
  { id: "growth", popular: true, feats: 6 },
  { id: "enterprise", popular: false, feats: 4 },
] as const;

/* ── Landing: FAQ ─────────────────────────────────────────────────── */

export const FAQS = [
  "offline",
  "accountant",
  "platforms",
  "languages",
  "extensions",
  "migrate",
] as const;

/* ── Landing: integration marquee (brand names — not translated) ──── */

export const MARQUEE_BRANDS = [
  "Stripe",
  "Shopify",
  "QuickBooks",
  "WooCommerce",
  "JazzCash",
  "Razorpay",
  "Square",
  "PayPal",
  "Magento",
  "Wix",
  "BigCommerce",
  "Easypaisa",
  "HBLPay",
  "WhatsApp",
  "Foodpanda",
  "Talabat",
  "Careem",
] as const;

/* ── Nav: extensions mega menu ────────────────────────────────────── */

export const MEGA_EXT_VERTICALS = [
  "restaurant",
  "route-dispatch",
  "pharmacy",
  "hr-payroll",
  "cloud-kitchen",
  "website-builder",
] as const;

export const MEGA_EXT_PAYMENTS = [
  { id: "stripe", icon: "brand-stripe", live: true },
  { id: "jazzcash", icon: "brand-jazzcash", live: true },
  { id: "easypaisa", icon: "brand-easypaisa", live: false },
  { id: "hblpay", icon: "brand-hbl", live: false },
  { id: "paypal", icon: "brand-paypal", live: false },
  { id: "razorpay", icon: "brand-razorpay", live: false },
  { id: "square", icon: "brand-square", live: false },
] as const;

export const MEGA_EXT_INTEGRATIONS = [
  { id: "quickbooks", icon: "brand-quickbooks" },
  { id: "shopify", icon: "brand-shopify" },
  { id: "woocommerce", icon: "brand-woocommerce" },
  { id: "couriers", icon: "truck" },
  { id: "delivery-aggregator", icon: "scooter" },
  { id: "whatsapp-ai", icon: "brand-whatsapp" },
  { id: "fbr", icon: "brand-fbr" },
] as const;

/* ═══════════════════════════════════════════════════════════════════
   Product-mock data — chrome inside simulated app screenshots.
   Intentionally untranslated: these are fake invoices, not copy.
   ═══════════════════════════════════════════════════════════════════ */

export const MOCK_OFFLINE_ROWS = [
  { label: "Sale #A-2481 · cash", amount: "$47.00" },
  { label: "Sale #A-2482 · card", amount: "$123.00" },
  { label: "Sale #A-2483 · credit", amount: "$21.50" },
] as const;

export const MOCK_LEDGER = {
  party: "Khan Traders",
  initials: "KT",
  since: "Customer · since Mar 2024",
  creditLimit: "CR-LIMIT $2,000.00",
  balance: "$1,428.00",
  aging: "31–60 days · 7 invoices open",
  rows: [
    {
      date: "2026-05-08",
      desc: "Invoice INV-4421",
      sub: "Sale · 14 SKUs · GST",
      debit: "28,400.00",
      credit: "",
    },
    {
      date: "2026-05-04",
      desc: "Payment received",
      sub: "Cash · alloc INV-4380",
      debit: "",
      credit: "15,000.00",
    },
    {
      date: "2026-04-29",
      desc: "Sale return SR-118",
      sub: "Credit note issued",
      debit: "",
      credit: "2,200.00",
    },
    {
      date: "2026-04-22",
      desc: "Invoice INV-4380",
      sub: "Sale · 21 SKUs · GST",
      debit: "42,600.00",
      credit: "",
    },
  ],
  badges: ["DOUBLE-ENTRY", "AUDIT TRAIL", "WHATSAPP STATEMENTS", "AGING 30/60/90+"],
} as const;

export const MOCK_PHONE_ROWS = [
  { t: "Sale #A-2486", s: "12:42 · Register 1", v: "2,059", alert: false },
  { t: "Stock low · 14", s: "Reorder pending", v: "", alert: true },
  { t: "Credit · Meridian Traders", s: "$1,428.00 due", v: "", alert: false },
] as const;

export const MOCK_DRIVER_ROWS = [
  { dot: "✓", state: "done", t: "Noor General Store", s: "Delivered · 11:14" },
  { dot: "→", state: "active", t: "Khan Traders", s: "In progress" },
  { dot: "3", state: "queued", t: "City Mart", s: "Next stop" },
] as const;
