/**
 * Structure for the redesigned homepage.
 *
 * Same split as `catalog.ts`: ids, icon paths, ordering and layout-affecting
 * numbers live here; every sentence of prose is keyed by these ids in
 * `messages/*.json`.
 *
 * The exception, also as in `catalog.ts`, is mock data — ledger rows, journal
 * lines, trip figures, receipt items, product tiles. Those sit inside simulated
 * app screenshots, so they are chrome rather than prose and are deliberately
 * not translated.
 */

/* ── Icon paths ────────────────────────────────────────────────────
   Single-path 24×24 strokes, taken from the design so the drawing is
   identical rather than approximated by a lookalike from an icon set. */

export const ICON = {
  cart: "M3 4h2l2.5 12h11l2.5-8H7M9 20h.01M18 20h.01",
  box: "M12 3l9 4.5v9L12 21l-9-4.5v-9L12 3zM3 7.5l9 4.5 9-4.5M12 12v9",
  book: "M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 0-3 3V4zM8 8h6M8 12h6",
  truck: "M3 6h11v10H3zM14 9h4l3 3v4h-7zM7 19a2 2 0 1 0 .01 0M17 19a2 2 0 1 0 .01 0",
  receipt: "M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6",
  users:
    "M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7M20 21v-2a4 4 0 0 0-3-3.9M15.5 4.1a3.5 3.5 0 0 1 0 6.8",
  shield: "M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3zM9 12l2 2 4-4",
  plug: "M9 3v5M15 3v5M6 8h12v3a6 6 0 0 1-12 0V8zM12 17v4",
  wallet: "M3 7h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7zM3 7l12-3v3M16 14h.01",
  tag: "M19 5L5 19M7.5 8a1.5 1.5 0 1 0 .01 0M16.5 17a1.5 1.5 0 1 0 .01 0",
  pill: "M10.5 3.5l10 10a4.95 4.95 0 0 1-7 7l-10-10a4.95 4.95 0 0 1 7-7zM8.5 8.5l7 7",
  phone: "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM12 18h.01",
  scissors:
    "M6 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM20 4L8.1 15.9M14.5 14.5L20 20M8.1 8.1L12 12",
  utensils: "M6 3v18M9 3v6a3 3 0 0 1-6 0V3M17 3c-2.2 0-3 3-3 6v3h3v9",
  bank: "M3 10l9-6 9 6M5 10v9M9 10v9M15 10v9M19 10v9M3 19h18",
  layers: "M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5",
  globe:
    "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18",
  monitor: "M3 4h18v12H3zM8 20h8M12 16v4",
  mobile: "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM12 18h.01",
  mobileLocked: "M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zM10 5h4",
  chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
  whatsapp: "M12 3a9 9 0 0 0-7.8 13.5L3 21l4.6-1.2A9 9 0 1 0 12 3z",
  wifiOff:
    "M2 2l20 20M8.5 16.5a5 5 0 0 1 7 0M5 13a10 10 0 0 1 5.5-2.8M16.2 11.2A10 10 0 0 1 19 13M12 20h.01",
  arrowRight: "M5 12h14M13 6l6 6-6 6",
  check: "M5 12l5 5L20 7",
  chevronDown: "M6 9l6 6 6-6",
  calendar: "M3 6h18v15H3zM3 10h18M8 3v4M16 3v4",
  mail: "M3 5h18v14H3zM3 6l9 7 9-7",
} as const;

export type IconName = keyof typeof ICON;

/* ── Shared demo identities ────────────────────────────────────────
   The same shop, customer and sale run through the till, the customer
   portal, the credit ledger, the journal entry and the printed receipt.
   Keeping them here stops the five mocks drifting apart, and stops
   country-specific names creeping back into a component. */

export const DEMO = {
  shop: "Northgate Market",
  shopLong: "Northgate General Store",
  customer: "Meridian Traders",
  cashier: "Sam",
  saleTotal: "$32.40",
  balance: "$426.00",
  salesToday: "$1,842.00",
  salesPeak: "$224.00 · 8 pm",
  creditTotal: "$4,126.00",
} as const;

/* ── Hero ──────────────────────────────────────────────────────────
   Mock till content. The design pulls stock photography into the six
   product tiles; until real product shots exist they render as tinted
   placeholders at the same aspect ratio, so the layout is identical. */

export const HERO_PRODUCTS = [
  { name: "Olive oil 1 L", price: "$16.50", tint: "#E8E3D6" },
  { name: "Coffee beans 500 g", price: "$5.90", tint: "#E6E8EC" },
  { name: "Green tea 250 g", price: "$10.00", tint: "#DFD8CB" },
  { name: "Flour 2 kg", price: "$4.50", tint: "#EAE6DC" },
  { name: "Sugar 1 kg", price: "$1.60", tint: "#E6E8EC" },
  { name: "Red lentils 1 kg", price: "$3.20", tint: "#E4DCCB" },
] as const;

export const HERO_CART = [
  { name: "Olive oil 1 L ×1", amt: "16.50" },
  { name: "Coffee beans 500 g ×1", amt: "5.90" },
  { name: "Green tea 250 g ×1", amt: "10.00" },
] as const;

/** Bar heights for the "sales today" sparkline; index 10 is the highlighted bar. */
export const HERO_BARS = [22, 30, 38, 46, 54, 50, 62, 70, 66, 84, 96, 58] as const;
export const HERO_BAR_PEAK = 10;

export const HERO_PORTAL_ROWS = [
  { label: "Sale #1042", amt: "+32.40", payment: false },
  { label: "Payment · cash", amt: "−50.00", payment: true },
  { label: "Sale #1031", amt: "+18.50", payment: false },
] as const;

/* ── 01 · Digital credit ledger ────────────────────────────────── */

export const KHATA_ROWS = [
  { date: "02 Sep", detail: "Sale #1042 · 12 items", amt: "+32.40", bal: "426.00", debit: true },
  { date: "28 Aug", detail: "Payment received · cash", amt: "−50.00", bal: "393.60", debit: false },
  { date: "24 Aug", detail: "Sale #1031 · 6 items", amt: "+18.50", bal: "443.60", debit: true },
  { date: "20 Aug", detail: "Return · 2 × olive oil", amt: "−11.80", bal: "425.10", debit: false },
  { date: "18 Aug", detail: "Sale #1019 · 20 items", amt: "+89.00", bal: "436.90", debit: true },
] as const;

export const KHATA_LIMIT = { used: 71, limit: "$600.00" } as const;

/* ── 02 · Accounting on autopilot ──────────────────────────────── */

export const JOURNAL_LINES = [
  { name: "Cash in drawer · Register 1", dr: "20.00", cr: "", indent: false },
  { name: "Accounts receivable · Meridian Traders", dr: "12.40", cr: "", indent: false },
  { name: "Sales revenue", dr: "", cr: "27.46", indent: true },
  { name: "Sales tax payable · 18%", dr: "", cr: "4.94", indent: true },
] as const;

export const JOURNAL_TOTAL = "32.40";
export const JOURNAL_STATEMENTS = ["Trial balance", "P&L", "Balance sheet", "Cash flow"] as const;

/* ── 03 · Van sales & distribution ─────────────────────────────── */

export const TRIP_STATS = [
  { id: "cash", value: "$842.00", good: false },
  { id: "credit", value: "$124.00", good: false },
  { id: "variance", value: "$0.00", good: true },
] as const;

export const TRIP_ROWS = [
  { a: "Loaded · 240 cartons", b: "186 sold · 4 damaged" },
  { a: "Fuel · 32 L · 118 km", b: "Normal" },
  { a: "Driver account (shortfall)", b: "$0.00" },
] as const;

export const TRIP_PROGRESS = 78;

/* ── 04 · Works offline ────────────────────────────────────────── */

export const OFFLINE_STEPS = [
  { id: "drop", time: "11:42", dot: "#8A8F98" },
  { id: "queue", time: "11:42–12:07", dot: "#ffffff" },
  { id: "sync", time: "12:07", dot: "#00D27A" },
] as const;

/* ── 05 · Local tax compliance ─────────────────────────────────── */

export const RECEIPT_MOCK = {
  shop: "NORTHGATE MARKET",
  taxId: "TAX ID 4211023-7",
  lines: [
    { name: "Olive oil 1L", amt: "16.50" },
    { name: "Coffee 500g", amt: "5.90" },
    { name: "Green tea 250g", amt: "10.00" },
  ],
  tax: { label: "Tax 18%", amt: "4.94" },
  total: "$32.40",
  ref: "E-INVOICE 7100128",
} as const;

/** The QR block on the receipt mock — decorative, drawn exactly as the design. */
export const RECEIPT_QR_FINDER =
  "M0 0h7v7H0zM1 1v5h5V1zM2 2h3v3H2zM14 0h7v7h-7zM15 1v5h5V1zM16 2h3v3h-3zM0 14h7v7H0zM1 15v5h5v-5zM2 16h3v3H2z";

export const RECEIPT_QR_DATA =
  "M8 1h1v1H8zM10 0h1v2h-1zM12 1h1v1h-1zM8 3h2v1H8zM11 3h2v1h-2zM9 5h1v1H9zM11 5h2v1h-2zM8 8h1v1H8zM10 8h2v1h-2zM13 8h1v1h-1zM0 9h2v1H0zM3 9h1v1H3zM5 9h2v1H5zM9 9h1v2H9zM11 10h1v1h-1zM14 9h1v1h-1zM16 9h2v1h-2zM19 9h2v1h-2zM1 11h1v1H1zM3 11h2v1H3zM6 11h1v1H6zM8 11h1v1H8zM12 11h2v1h-2zM15 11h1v1h-1zM18 11h1v1h-1zM20 11h1v1h-1zM0 12h1v1H0zM2 12h1v1H2zM4 12h2v1H4zM9 12h2v1H9zM13 12h1v1h-1zM16 12h1v1h-1zM19 12h1v1h-1zM8 14h2v1H8zM11 14h1v1h-1zM13 14h2v1h-2zM17 14h1v1h-1zM19 14h2v1h-2zM9 15h1v1H9zM12 15h1v1h-1zM14 15h3v1h-3zM18 15h1v1h-1zM8 16h1v1H8zM10 16h2v1h-2zM13 16h1v1h-1zM15 16h1v1h-1zM17 16h1v1h-1zM20 16h1v1h-1zM9 17h1v1H9zM11 17h1v1h-1zM14 17h2v1h-2zM19 17h1v1h-1zM8 18h2v1H8zM12 18h2v1h-2zM16 18h1v1h-1zM18 18h1v1h-1zM20 18h1v1h-1zM9 19h1v1H9zM11 19h1v1h-1zM13 19h3v1h-3zM17 19h1v1h-1zM19 19h1v1h-1zM8 20h1v1H8zM10 20h2v1h-2zM14 20h1v1h-1zM16 20h2v1h-2zM19 20h2v1h-2z";

export const TAX_CHIPS = ["inclusive", "withholding", "age", "audit"] as const;

/* ── Signature features ────────────────────────────────────────── */

/** Each of the five blocks carries the same number of ticked bullets. */
export const SIGNATURE_BULLETS = 4;

/* ── Solutions ─────────────────────────────────────────────────────
   `rows` are the mock screen behind each vertical — not translated. */

export const SOLUTIONS = [
  {
    id: "retail",
    icon: "cart",
    href: "/solutions/general-retail",
    screen: "Counter · Northgate Market",
    rows: [
      { a: "Rice 5 kg", b: "1 case = 20 × 5 kg · sells by kg", c: "$3.40 / kg" },
      { a: "Meridian Traders", b: "Credit balance · reminder sent by message", c: "$426.00 due" },
      {
        a: "Z-report · Register 1",
        b: "Cash counted $1,842.00 · variance 0",
        c: "Closed 10:14 pm",
      },
    ],
  },
  {
    id: "restaurants",
    icon: "utensils",
    href: "/solutions/restaurants",
    screen: "Floor · Table 07",
    rows: [
      {
        a: "Grilled chicken platter · extra bread ×3",
        b: "Fired to Kitchen Station 2 · 12 min",
        c: "$24.00",
      },
      { a: "Table 07 · 6 guests", b: "Split bill by seat · 2 paid", c: "4 pending" },
      { a: "Delivery app order #8812", b: "Auto-accepted → KDS", c: "Prep 18 min" },
    ],
  },
  {
    id: "electronics",
    icon: "phone",
    href: "/solutions/electronics",
    screen: "Serials · Galaxy A15",
    rows: [
      { a: "IMEI 35-882109-•••-4", b: "Sold 12 Mar · warranty to 12 Mar 2027", c: "Active" },
      { a: "Repair job RJ-221", b: "Screen replacement · parts reserved", c: "Ready for pickup" },
      { a: "Trade-in · iPhone 11", b: "Valued $380.00 → applied to sale", c: "Accepted" },
    ],
  },
  {
    id: "pharmacies",
    icon: "pill",
    href: "/solutions",
    screen: "Stock · Batch alerts",
    rows: [
      {
        a: "Paracetamol 500 mg · Batch B2291",
        b: "Exp 03/2027 · FEFO picks this first",
        c: "1,240 tabs",
      },
      { a: "Amoxicillin 625 mg · Batch A114", b: "Expires in 28 days", c: "Alert" },
      { a: "Rx · controlled item", b: "Prescription logged · Dr Lawson", c: "Dispensed" },
    ],
  },
  {
    id: "distribution",
    icon: "truck",
    href: "/solutions/distributors",
    screen: "Trip TRP-0418 · VAN-4471",
    rows: [
      { a: "Route Midtown → Riverside", b: "14 / 18 stops · 3 credit sales", c: "$842.00 cash" },
      { a: "Load · 240 cartons", b: "186 sold · 4 returned damaged", c: "50 on van" },
      { a: "Day-end reconciliation", b: "Cash, goods & fuel matched", c: "Variance $0.00" },
    ],
  },
  {
    id: "services",
    icon: "scissors",
    href: "/solutions/services",
    screen: "Appointments · Saturday",
    rows: [
      { a: "Hair & beard · J. Rivera", b: "4:30 pm · Stylist Alex · commission 20%", c: "$15.00" },
      { a: "Gold membership · R. Chen", b: "Renews monthly · auto-invoice", c: "Active" },
      { a: "Physio package · 6 sessions", b: "3 used · next Tue", c: "$90.00" },
    ],
  },
] as const satisfies ReadonlyArray<{
  id: string;
  icon: IconName;
  href: string;
  screen: string;
  rows: ReadonlyArray<{ a: string; b: string; c: string }>;
}>;

export const SOLUTION_BULLETS = 4;

/* ── "Everything behind the counter" pillars ───────────────────── */

export const PILLARS = [
  { id: "sell", icon: "cart" },
  { id: "stock", icon: "box" },
  { id: "buy", icon: "receipt" },
  { id: "getPaid", icon: "wallet" },
  { id: "credit", icon: "book" },
  { id: "account", icon: "bank" },
  { id: "comply", icon: "shield" },
  { id: "grow", icon: "tag" },
  { id: "deliver", icon: "truck" },
  { id: "people", icon: "users" },
  { id: "specialise", icon: "layers" },
  { id: "integrate", icon: "plug" },
] as const satisfies ReadonlyArray<{ id: string; icon: IconName }>;

/* ── Languages & devices ───────────────────────────────────────── */

export const PLATFORMS = [
  { id: "web", icon: "globe", soon: false },
  { id: "desktop", icon: "monitor", soon: false },
  { id: "android", icon: "mobile", soon: false },
  { id: "ios", icon: "mobileLocked", soon: true },
] as const satisfies ReadonlyArray<{ id: string; icon: IconName; soon: boolean }>;

/**
 * App-access links. Android ships today; iOS is still a dashed "coming soon"
 * card in the design, so there is no store URL to point at and its chip is
 * deliberately not a link.
 */
export const APP_LINKS = {
  android: "https://play.google.com/store/apps/details?id=com.tajirpoint.pos",
} as const;

/**
 * Receipt demo — mock content, shown to demonstrate script and direction.
 *
 * These strings are the *subject* of the demo rather than site copy: the point
 * is that a receipt renders in the shop's own language and flips direction, so
 * they stay as written and are never run through next-intl.
 */
export const RECEIPT_LANGS = [
  {
    id: "en",
    label: "English",
    dir: "ltr",
    shop: "Northgate General Store",
    title: "Receipt",
    total: "Total",
    paid: "Paid · cash",
    thanks: "Thank you",
    items: [
      { name: "Olive oil 1 L", amt: "$16.50" },
      { name: "Coffee beans 500 g", amt: "$5.90" },
      { name: "Green tea 250 g", amt: "$10.00" },
    ],
  },
  {
    id: "es",
    label: "Español",
    dir: "ltr",
    shop: "Tienda General Northgate",
    title: "Recibo",
    total: "Total",
    paid: "Pagado · efectivo",
    thanks: "Gracias",
    items: [
      { name: "Aceite de oliva 1 L", amt: "$16.50" },
      { name: "Café en grano 500 g", amt: "$5.90" },
      { name: "Té verde 250 g", amt: "$10.00" },
    ],
  },
  {
    id: "rtl",
    label: "Right-to-left",
    dir: "rtl",
    shop: "Northgate General Store",
    title: "Receipt (RTL layout)",
    total: "Total",
    paid: "Paid · cash",
    thanks: "Thank you",
    items: [
      { name: "Olive oil 1 L", amt: "$16.50" },
      { name: "Coffee beans 500 g", amt: "$5.90" },
      { name: "Green tea 250 g", amt: "$10.00" },
    ],
  },
] as const;

export const RECEIPT_TOTAL = "$32.40";

/* ── Extension marketplace ─────────────────────────────────────────
   The 31 ids, categories and copy already live in `catalog.ts` and
   `messages.extensions.*`; this only adds the design's status badge. */

export type ExtensionStatus = "live" | "beta" | "ready";

export const EXTENSION_STATUS: Record<string, ExtensionStatus> = {
  restaurant: "live",
  "route-dispatch": "live",
  pharmacy: "live",
  "hr-payroll": "live",
  "cloud-kitchen": "ready",
  "website-builder": "live",
  stripe: "live",
  jazzcash: "live",
  easypaisa: "beta",
  hblpay: "beta",
  paypal: "beta",
  razorpay: "beta",
  square: "beta",
  "accounting-gl": "live",
  "cash-management": "live",
  quickbooks: "beta",
  fbr: "ready",
  "age-verification": "live",
  shopify: "live",
  woocommerce: "beta",
  magento: "beta",
  wix: "beta",
  bigcommerce: "beta",
  leopards: "live",
  tcs: "live",
  postex: "live",
  "customer-portal": "live",
  "delivery-aggregator": "live",
  coupons: "live",
  "time-promos": "live",
  "whatsapp-ai": "beta",
};

/* ── Pricing ───────────────────────────────────────────────────────
   Published tiers, read from the backend, with a trial in front of them.
   Every module and every vertical is switched on for the trial; only the
   chain/franchise tier stays a conversation rather than a price. */

/**
 * Trial length in DAYS — the FALLBACK only.
 *
 * The live number comes from the backend now: `/api/v1/public/plans/` returns
 * `trial_days` straight from the TRIAL_PERIOD_DAYS setting that actually
 * grants the window, and `getPricing()` hands it to the pricing section. This
 * constant is used only when that request fails, at which point the page is
 * already falling back to hardcoded copy.
 *
 * It exists as a constant at all because the two drifted badly: the site said
 * fourteen days while production granted ninety, and a signup promised one
 * number and given another is a false claim, not a copy inconsistency. Reading
 * it from the source of truth is what stops that recurring — do not reintroduce
 * a second hardcoded trial length anywhere.
 */
// Fallback only (used when the API is unreachable). Matches production's
// `trial_days` from /api/v1/public/plans/ as of 2026-09-24: 90.
export const TRIAL_DAYS = 90;

/** What the trial includes. Ticked two-up under the price. */
export const TRIAL_INCLUDES = [
  "pos",
  "inventory",
  "credit",
  "accounting",
  "restaurant",
  "vansales",
  "store",
  "staff",
  "offline",
  "extensions",
  "support",
] as const;

/* ── FAQ ───────────────────────────────────────────────────────── */

export const FAQ_TABS = [
  { id: "general", count: 4 },
  { id: "credit", count: 4 },
  { id: "offline", count: 3 },
  { id: "pricing", count: 4 },
] as const;

/* ── Closing CTA ───────────────────────────────────────────────── */

export const ONBOARDING = [
  { id: "import", n: "1" },
  { id: "connect", n: "2" },
  { id: "staff", n: "3" },
  { id: "sell", n: "4" },
] as const;
