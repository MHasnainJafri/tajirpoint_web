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
  { id: "pharmacy", icon: "pill", cat: "verticals" },
  { id: "hr-payroll", icon: "users", cat: "verticals" },
  { id: "cloud-kitchen", icon: "cloud", cat: "verticals" },
  { id: "website-builder", icon: "globe", cat: "verticals" },

  { id: "stripe", icon: "card", cat: "payments" },
  { id: "jazzcash", icon: "phone", cat: "payments" },
  { id: "easypaisa", icon: "wallet", cat: "payments", note: "validating" },
  { id: "hblpay", icon: "bank", cat: "payments", note: "validating" },
  { id: "paypal", icon: "card", cat: "payments", note: "validating" },
  { id: "razorpay", icon: "card", cat: "payments", note: "validating" },
  { id: "square", icon: "card", cat: "payments", note: "validating" },

  { id: "accounting-gl", icon: "book", cat: "accounting" },
  { id: "cash-management", icon: "cash", cat: "accounting" },
  { id: "quickbooks", icon: "refresh", cat: "accounting" },

  { id: "fbr", icon: "receipt", cat: "compliance" },
  { id: "age-verification", icon: "idcard", cat: "compliance" },

  { id: "shopify", icon: "bag", cat: "ecommerce" },
  { id: "woocommerce", icon: "refresh", cat: "ecommerce", note: "newer" },
  { id: "magento", icon: "refresh", cat: "ecommerce", note: "newer" },
  { id: "wix", icon: "refresh", cat: "ecommerce", note: "newer" },
  { id: "bigcommerce", icon: "refresh", cat: "ecommerce", note: "newer" },

  { id: "leopards", icon: "leopard", cat: "shipping" },
  { id: "tcs", icon: "package", cat: "shipping" },
  { id: "postex", icon: "mail", cat: "shipping" },

  { id: "customer-portal", icon: "key", cat: "customer" },
  { id: "delivery-aggregator", icon: "bike", cat: "customer" },
  { id: "coupons", icon: "ticket", cat: "customer" },
  { id: "time-promos", icon: "clock", cat: "customer" },
  { id: "whatsapp-ai", icon: "bot", cat: "customer" },
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
  { id: "stripe", icon: "card", live: true },
  { id: "jazzcash", icon: "phone", live: true },
  { id: "easypaisa", icon: "wallet", live: false },
  { id: "hblpay", icon: "bank", live: false },
  { id: "paypal", icon: "card", live: false },
  { id: "razorpay", icon: "card", live: false },
  { id: "square", icon: "card", live: false },
] as const;

export const MEGA_EXT_INTEGRATIONS = [
  { id: "quickbooks", icon: "refresh" },
  { id: "shopify", icon: "bag" },
  { id: "woocommerce", icon: "refresh" },
  { id: "couriers", icon: "truck" },
  { id: "delivery-aggregator", icon: "bike" },
  { id: "whatsapp-ai", icon: "bot" },
  { id: "fbr", icon: "receipt" },
] as const;

/* ═══════════════════════════════════════════════════════════════════
   Product-mock data — chrome inside simulated app screenshots.
   Intentionally untranslated: these are fake invoices, not copy.
   ═══════════════════════════════════════════════════════════════════ */

export const MOCK_OFFLINE_ROWS = [
  { label: "Sale #A-2481 · cash", amount: "Rs 4,700" },
  { label: "Sale #A-2482 · card", amount: "Rs 12,300" },
  { label: "Sale #A-2483 · credit", amount: "Rs 2,150" },
] as const;

export const MOCK_LEDGER = {
  party: "Khan Traders",
  initials: "KT",
  since: "Customer · since Mar 2024",
  creditLimit: "CR-LIMIT Rs 200,000",
  balance: "Rs 142,800.00",
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
  { t: "Credit · Hassan T.", s: "Rs 142,800 due", v: "", alert: false },
] as const;

export const MOCK_DRIVER_ROWS = [
  { dot: "✓", state: "done", t: "Noor General Store", s: "Delivered · 11:14" },
  { dot: "→", state: "active", t: "Khan Traders", s: "In progress" },
  { dot: "3", state: "queued", t: "City Mart", s: "Next stop" },
] as const;
