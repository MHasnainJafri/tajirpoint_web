/**
 * The business catalog — ONE file that drives the navbar mega-menu, the
 * `/business/<slug>` pages, the `/solutions` index, the home "Find your
 * business" grid, the demo form's business-type list, the sitemap and the
 * media checklist.
 *
 * Rules for editing:
 *  - Every claim must be true of what ships today (see KNOWLEDGE-BASE.md).
 *    Anything not shipped is marked `status: "soon"` or left out.
 *  - Anything only on paid plans carries a `plan` note.
 *  - Copy is English-only for now; `localized` holds the few strings shown in
 *    the Urdu/Arabic navigation.
 *  - This file must stay free of runtime imports: `scripts/media.mjs` imports
 *    it directly with Node's type stripping to write the media READMEs.
 *
 * Media: every `media.slot` maps to files in `public/media/business/<slug>/`
 * (see public/media/README.md). Set `youtube` / `vimeo` to an id to embed a
 * hosted video instead of a local file.
 */

/* ── Apps ─────────────────────────────────────────────────────────── */

export type AppId =
  | "pos"
  | "backOffice"
  | "ownerApp"
  | "kds"
  | "waiter"
  | "receiver"
  | "packer"
  | "customerDisplay"
  | "orderPage"
  | "website"
  | "customerApp"
  | "riderApp"
  | "vanSales";

export interface AppInfo {
  id: AppId;
  name: string;
  line: string;
  icon: string;
  /** `soon` renders a "Coming soon" chip. */
  status: "live" | "soon";
  /** Shown as a small note when the app needs a paid plan. */
  plan?: string;
}

export const SHOP_PLAN_NOTE = "Shop plan and above";

export const APPS: Record<AppId, AppInfo> = {
  pos: {
    id: "pos",
    name: "POS counter",
    line: "Sell, take payment and print receipts on a PC, tablet or Android till.",
    icon: "pos",
    status: "live",
  },
  backOffice: {
    id: "backOffice",
    name: "Back office",
    line: "Stock, purchases, khata, staff and reports in your browser.",
    icon: "chart",
    status: "live",
  },
  ownerApp: {
    id: "ownerApp",
    name: "Owner dashboard",
    line: "Today's sales, stock and dues from your phone.",
    icon: "phone",
    status: "live",
  },
  kds: {
    id: "kds",
    name: "Kitchen display (KDS)",
    line: "Orders appear on a kitchen screen by station — no shouting, no lost slips.",
    icon: "restaurant",
    status: "live",
  },
  waiter: {
    id: "waiter",
    name: "Waiter app",
    line: "Take orders at the table on a phone and send them straight to the kitchen.",
    icon: "users",
    status: "live",
  },
  receiver: {
    id: "receiver",
    name: "Order receiver board",
    line: "Online orders ring on one screen; accept them with a tap.",
    icon: "alarmpct",
    status: "live",
  },
  packer: {
    id: "packer",
    name: "Packer screen",
    line: "Check and pack takeaway and delivery orders before they leave.",
    icon: "package",
    status: "live",
  },
  customerDisplay: {
    id: "customerDisplay",
    name: "Customer display",
    line: "A second screen that shows the customer their items and total.",
    icon: "monitor",
    status: "live",
  },
  orderPage: {
    id: "orderPage",
    name: "Online order page",
    line: "Your own ordering link for delivery, pickup and dine-in, with deals.",
    icon: "globe",
    status: "live",
    plan: SHOP_PLAN_NOTE,
  },
  website: {
    id: "website",
    name: "Website builder",
    line: "A shop website with your products, built from templates.",
    icon: "globe",
    status: "live",
    plan: SHOP_PLAN_NOTE,
  },
  customerApp: {
    id: "customerApp",
    name: "Customer app in your brand",
    line: "Your own ordering app for your regular customers.",
    icon: "shopbag",
    status: "soon",
  },
  riderApp: {
    id: "riderApp",
    name: "Rider app",
    line: "Riders get jobs, navigate, collect cash and confirm delivery on Android.",
    icon: "scooter",
    status: "live",
  },
  vanSales: {
    id: "vanSales",
    name: "Van sales & route app",
    line: "Load the van, sell along a route and reconcile cash and stock at day end.",
    icon: "truck",
    status: "live",
  },
};

/* ── Media ────────────────────────────────────────────────────────── */

export interface MediaRef {
  /** File stem under public/media/business/<slug>/. */
  slot: string;
  /** Describes the real image/video for screen readers. */
  alt: string;
  /** What the owner should supply. Drives the README and the placeholder. */
  expect: "video" | "image" | "phone";
  /** CSS aspect ratio. Defaults: 16/10 for video/image, 4/5 for phone. */
  ratio?: string;
  /** YouTube video id — embedded (youtube-nocookie) when no local video exists. */
  youtube?: string;
  /** Vimeo video id — embedded when no local video exists. */
  vimeo?: string;
}

/* ── Business ─────────────────────────────────────────────────────── */

export const BUSINESS_SLUGS = [
  "restaurants",
  "cafes-bakeries",
  "cloud-kitchens",
  "retail-fashion",
  "grocery-kiryana",
  "pharmacy",
  "electronics-mobile",
  "salons-services",
  "distributors-wholesale",
  "furniture-home",
] as const;

export type BusinessSlug = (typeof BUSINESS_SLUGS)[number];

/** The business-type labels the existing /public/contact/ endpoint accepts. */
export type ContactLabel =
  | "General retail / Kiryana"
  | "Restaurant / Food"
  | "Electronics / Mobile"
  | "Services / Salon"
  | "Distributor / Wholesale"
  | "Other";

export interface BusinessFeature {
  /** Anchor id on the page and part of the media slot. */
  id: string;
  icon: string;
  title: string;
  /** One or two sentences: the benefit, not the mechanism. */
  benefit: string;
  bullets: string[];
  media: MediaRef;
  status?: "soon";
  /** Paid-plan note, e.g. SHOP_PLAN_NOTE. */
  plan?: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Business {
  slug: BusinessSlug;
  /** Full name, e.g. "Restaurants". */
  name: string;
  /** One line for the mega-menu and grids. */
  navLine: string;
  icon: string;
  localized: Record<"ur" | "ar", { name: string; navLine: string }>;
  contactLabel: ContactLabel;
  seo: { title: string; description: string; keywords: string[] };
  /** schema.org applicationSubCategory. */
  schemaSubCategory: string;
  hero: { eyebrow: string; headline: string; sub: string; media: MediaRef };
  apps: AppId[];
  features: BusinessFeature[];
  /** Business-specific questions; COMMON_FAQS are appended on the page. */
  faqs: Faq[];
  cta: { headline: string; sub: string };
}

/* ── Shared copy ──────────────────────────────────────────────────── */

export const OFFER_LINE = "Free for 3 months, then choose Shop or Business. No card required.";

export const MIGRATION = {
  eyebrow: "Switching is free",
  headline: "Switching from another POS? We move your data for you.",
  sub: "Send us an export from your old system — Excel or CSV is fine — and our team loads it into TajirPoint before you go live.",
  points: [
    "Products, prices, barcodes and categories",
    "Customers and suppliers, with their opening khata balances",
    "Opening stock for each branch or warehouse",
    "Staff logins and roles set up with you on a call",
  ],
  cta: "Book a free migration call",
} as const;

export const COMMON_FAQS: Faq[] = [
  {
    q: "Is TajirPoint really free for 3 months?",
    a: "Yes. The Light plan is free for 90 days from the day you sign up, with no card required. It covers one shop, two staff logins, 30 products and 100 orders a day. When the 90 days end, choose Shop or Business to keep selling — your data stays safe and you can still sign in, view and export it.",
  },
  {
    q: "Can you move my data from my old POS?",
    a: "Yes, for free. Send us an export from your current system (Excel or CSV is fine) and we load your products, customers, suppliers, khata balances and opening stock for you. Tick “move my data for me” when you book a demo.",
  },
  {
    q: "Which devices does it run on?",
    a: "Any modern browser, a Windows desktop app and Android — including Android POS terminals with a built-in printer. Receipt printers connect over USB, Bluetooth or the network.",
  },
  {
    q: "Is it available in Urdu and Arabic?",
    a: "Yes. The app works in English, Urdu and Arabic, with right-to-left screens, and receipts can be printed in Urdu and Arabic.",
  },
];

/* ── The catalog ──────────────────────────────────────────────────── */

const restaurants: Business = {
  slug: "restaurants",
  name: "Restaurants",
  navLine: "Tables, kitchen display, waiter app, online orders and delivery.",
  icon: "restaurant",
  localized: {
    ur: { name: "ریسٹورنٹس", navLine: "ٹیبلز، کچن ڈسپلے، ویٹر ایپ، آن لائن آرڈرز اور ڈیلیوری۔" },
    ar: { name: "المطاعم", navLine: "الطاولات، شاشة المطبخ، تطبيق النادل، الطلبات أونلاين والتوصيل." },
  },
  contactLabel: "Restaurant / Food",
  seo: {
    title: "Restaurant POS — Tables, KDS, Waiter App & Online Ordering",
    description:
      "Restaurant POS with floor plan and tables, kitchen display (KDS), tickets by course, a waiter app, an order receiver board, your own online order page with deals, and a rider app. Free for 3 months.",
    keywords: [
      "restaurant POS",
      "restaurant POS Pakistan",
      "kitchen display system",
      "KDS",
      "waiter app",
      "table management POS",
      "online ordering for restaurants",
      "restaurant delivery app",
    ],
  },
  schemaSubCategory: "Restaurant point of sale",
  hero: {
    eyebrow: "TajirPoint for restaurants",
    headline: "From the table to the kitchen to the rider — one system.",
    sub: "Take orders at the counter or the table, send them to the right kitchen screen, accept online orders from your own order page, and hand deliveries to riders. Every sale lands in the same reports.",
    media: {
      slot: "hero",
      expect: "video",
      alt: "TajirPoint restaurant POS showing the floor plan, an open table and the kitchen display",
    },
  },
  apps: ["pos", "kds", "waiter", "receiver", "packer", "orderPage", "riderApp", "customerApp", "backOffice"],
  features: [
    {
      id: "pos",
      icon: "pos",
      title: "A counter POS built for food",
      benefit: "Ring up dine-in, takeaway and delivery from one screen, with the modifiers and deals your menu actually has.",
      bullets: [
        "Modifiers and add-ons per dish (size, spice, extras)",
        "Deals and combos, discounts with manager permission",
        "Split a bill and take cash, card or both",
        "Service charge and tax handled on every bill",
        "Receipts in English, Urdu or Arabic",
      ],
      media: { slot: "pos", expect: "video", alt: "Restaurant counter screen taking a takeaway order with modifiers" },
    },
    {
      id: "tables",
      icon: "restaurant",
      title: "Floor plan and tables",
      benefit: "See every table at a glance — who is seated, what is open and which bill is waiting.",
      bullets: [
        "Floors and tables laid out the way your hall is",
        "Open, move and merge tables",
        "Assign waiters to sections",
        "Table reservations from the same screen",
      ],
      media: { slot: "tables", expect: "image", alt: "Floor plan with table status colours" },
    },
    {
      id: "kds",
      icon: "monitor",
      title: "Kitchen display (KDS)",
      benefit: "Orders go to the right station's screen the moment they are sent — grill, tandoor, drinks — so nothing is lost on paper.",
      bullets: [
        "One screen per station, or one for the whole kitchen",
        "Mark items and tickets ready with a tap",
        "Expo view to check a table's order before it goes out",
        "Prefer paper? Print kitchen tickets per station instead",
      ],
      media: { slot: "kds", expect: "video", alt: "Kitchen display screen with tickets grouped by station" },
    },
    {
      id: "courses",
      icon: "receipt",
      title: "Kitchen tickets by course",
      benefit: "Send starters now and hold the mains until the table is ready, so food arrives hot and in order.",
      bullets: [
        "Courses set up for your menu",
        "Fire the next course when the table is ready",
        "Add rounds to an open table without a new bill",
        "Voids are recorded, not hidden",
      ],
      media: { slot: "courses", expect: "image", alt: "A table's ticket split into starters and mains with a fire button" },
    },
    {
      id: "waiter",
      icon: "users",
      title: "Waiter app",
      benefit: "Waiters take the order at the table on a phone and it reaches the kitchen before they are back at the pass.",
      bullets: [
        "Runs on Android phones and tablets",
        "Same menu, modifiers and prices as the counter",
        "Each waiter signs in with their own login",
        "Request the bill from the table",
      ],
      media: { slot: "waiter", expect: "phone", alt: "Waiter app on a phone taking an order for table 7" },
    },
    {
      id: "receiver",
      icon: "alarmpct",
      title: "Order receiver board",
      benefit: "Every online order rings on one screen until someone accepts it — no missed orders on a busy night.",
      bullets: [
        "Loud ring for new orders until they are accepted",
        "Accept or decline, then it goes to the kitchen",
        "Packer screen to check bags before handover",
        "Works on a tablet or the Android order desk app",
      ],
      media: { slot: "receiver", expect: "video", alt: "Order receiver board ringing with a new delivery order" },
    },
    {
      id: "order-page",
      icon: "globe",
      title: "Your own online order page, with deals",
      benefit: "Customers order delivery, pickup or dine-in from your own link — share it on Instagram, Facebook and WhatsApp.",
      bullets: [
        "Menu with photos, modifiers and deals",
        "Banners and time-limited deals you control",
        "Delivery areas, fees and opening hours",
        "Cash on delivery, or online payment with a connected gateway",
        "Customer phone or email verification to stop fake orders",
      ],
      media: { slot: "order-page", expect: "phone", alt: "Online order page on a phone showing deals and a cart" },
      plan: SHOP_PLAN_NOTE,
    },
    {
      id: "delivery",
      icon: "scooter",
      title: "Delivery with your riders",
      benefit: "Hand each delivery to a rider, follow it on the map and settle the cash they collected at the end of the shift.",
      bullets: [
        "Rider app for Android: jobs, navigation, proof of delivery",
        "Live rider location while on shift",
        "Rider cash and pay tracked per shift",
        "Need more riders? Request one from the TajirPoint courier network where it operates",
      ],
      media: { slot: "delivery", expect: "phone", alt: "Rider app showing a delivery job and route" },
    },
    {
      id: "customer-app",
      icon: "shopbag",
      title: "Customer app in your brand",
      benefit: "Give your regulars your own ordering app with your name and logo.",
      bullets: [
        "Your restaurant's name, icon and colours",
        "Same menu and deals as your order page",
        "Built and published for you",
      ],
      media: { slot: "customer-app", expect: "phone", alt: "Branded customer ordering app on a phone" },
      status: "soon",
    },
    {
      id: "reports",
      icon: "chart",
      title: "Reports that close the day",
      benefit: "Know what you sold, what you collected and what the kitchen used — by day, by shift and by branch.",
      bullets: [
        "Z-report and takings per register",
        "Item sales and best sellers",
        "Tax and VAT by rate",
        "Profit and loss with the accounting add-on",
      ],
      media: { slot: "reports", expect: "image", alt: "Restaurant day-end report with takings and best sellers" },
    },
  ],
  faqs: [
    {
      q: "Does the restaurant POS work without internet?",
      a: "The retail counter keeps selling offline today. Full offline mode for restaurant tables and the kitchen display is being finished and is not released yet, so plan on a stable connection for table service for now.",
    },
    {
      q: "Do I need special hardware for the kitchen display?",
      a: "No. Any tablet, Android TV box or PC with a browser works as a kitchen screen. If your kitchen prefers paper, TajirPoint prints tickets to a kitchen printer per station.",
    },
    {
      q: "Can I take online orders without paying commission to an app?",
      a: "Yes. The online order page is your own link that you share with your customers. It is included on the Shop plan and above.",
    },
  ],
  cta: {
    headline: "See your restaurant running on TajirPoint.",
    sub: "Book a demo and we'll walk you through the floor, the kitchen screen and online orders using your own menu.",
  },
};

const cafesBakeries: Business = {
  slug: "cafes-bakeries",
  name: "Cafés & bakeries",
  navLine: "Fast counter, modifiers, loyalty, recipes and pre-orders.",
  icon: "utensils",
  localized: {
    ur: { name: "کیفے اور بیکریاں", navLine: "تیز کاؤنٹر، موڈیفائرز، لائلٹی، ترکیبیں اور پیشگی آرڈرز۔" },
    ar: { name: "المقاهي والمخابز", navLine: "كاشير سريع، إضافات، ولاء، وصفات وطلبات مسبقة." },
  },
  contactLabel: "Restaurant / Food",
  seo: {
    title: "Café & Bakery POS — Fast Counter, Loyalty & Pre-orders",
    description:
      "POS for cafés and bakeries: quick counter with modifiers, customer display, loyalty points, recipes that deduct ingredients, batch expiry for baked goods and online pre-orders. Free for 3 months.",
    keywords: ["cafe POS", "bakery POS", "coffee shop POS", "bakery software Pakistan", "cafe loyalty"],
  },
  schemaSubCategory: "Café and bakery point of sale",
  hero: {
    eyebrow: "TajirPoint for cafés & bakeries",
    headline: "Keep the queue moving, from the first coffee to the last cake.",
    sub: "A fast counter with the modifiers your drinks need, loyalty for your regulars, recipes that keep ingredient stock honest, and pre-orders for cakes and catering.",
    media: { slot: "hero", expect: "video", alt: "Café counter taking a coffee order with milk and size options" },
  },
  apps: ["pos", "customerDisplay", "kds", "orderPage", "backOffice", "ownerApp"],
  features: [
    {
      id: "counter",
      icon: "pos",
      title: "A counter that keeps up with the queue",
      benefit: "Favourites on the first screen, modifiers in one tap, and payment in two.",
      bullets: [
        "Sizes, milk, sugar and extras as modifiers",
        "Barcode scanning for packaged items",
        "Cash, card or split payment",
        "Customer display shows items and total",
      ],
      media: { slot: "counter", expect: "video", alt: "Café counter screen with drink modifiers" },
    },
    {
      id: "kitchen",
      icon: "monitor",
      title: "Orders to the bar and the kitchen",
      benefit: "Drinks go to the bar screen and food to the kitchen, so each team only sees its own work.",
      bullets: [
        "Station screens for bar and kitchen",
        "Or print tickets to a station printer",
        "Mark items ready with a tap",
      ],
      media: { slot: "kitchen", expect: "image", alt: "Bar screen showing drink tickets" },
    },
    {
      id: "loyalty",
      icon: "ticket",
      title: "Loyalty for your regulars",
      benefit: "Reward the people who come every morning, and see who they are.",
      bullets: [
        "Loyalty points earned on every sale",
        "Coupons and time-based deals, e.g. a morning offer",
        "Customer history on the counter",
      ],
      media: { slot: "loyalty", expect: "image", alt: "Customer profile with loyalty points balance" },
    },
    {
      id: "recipes",
      icon: "calculator",
      title: "Recipes and ingredient stock",
      benefit: "Each sale deducts the flour, milk and beans it used, so you know what to reorder and what each item really costs.",
      bullets: [
        "Recipes per item and per size",
        "Ingredient stock deducted as you sell",
        "Low-stock alerts and reorder suggestions",
      ],
      media: { slot: "recipes", expect: "image", alt: "Recipe screen listing ingredients for a cappuccino" },
    },
    {
      id: "batches",
      icon: "package",
      title: "Batches and expiry for baked goods",
      benefit: "Track batches and expiry dates so the oldest stock sells first and nothing past date reaches the counter.",
      bullets: [
        "Batch and expiry on stock",
        "Oldest-first selling (FEFO)",
        "Near-expiry list to clear stock before it is wasted",
      ],
      media: { slot: "batches", expect: "image", alt: "Batch list with expiry dates for baked goods" },
    },
    {
      id: "preorders",
      icon: "calendar",
      title: "Online orders and pre-orders",
      benefit: "Take cake and catering orders for a later time from your own order page, and see them before the day starts.",
      bullets: [
        "Scheduled orders for a chosen date and time",
        "Pickup or delivery",
        "Deals and banners on your order page",
      ],
      media: { slot: "preorders", expect: "phone", alt: "Order page on a phone scheduling a cake pickup" },
      plan: SHOP_PLAN_NOTE,
    },
    {
      id: "reports",
      icon: "chart",
      title: "Day-end in minutes",
      benefit: "Close the register, count the cash and see the day's best sellers without a spreadsheet.",
      bullets: [
        "Register open and close with cash count",
        "Item sales by hour and by day",
        "Tax reports",
      ],
      media: { slot: "reports", expect: "image", alt: "Café day-end report" },
    },
  ],
  faqs: [
    {
      q: "Can I run several counters in one café?",
      a: "Yes. Each counter is its own register with its own cash drawer and day-end, and all of them feed the same stock and reports.",
    },
    {
      q: "Does it work offline?",
      a: "Retail-style counter sales keep working offline and sync when the connection returns. Offline mode for table service and kitchen screens is coming soon.",
    },
  ],
  cta: {
    headline: "Serve faster. Waste less.",
    sub: "Book a demo and see your menu, recipes and loyalty set up on TajirPoint.",
  },
};

const cloudKitchens: Business = {
  slug: "cloud-kitchens",
  name: "Cloud kitchens",
  navLine: "Several brands, one kitchen, one order board.",
  icon: "cloud",
  localized: {
    ur: { name: "کلاؤڈ کچن", navLine: "کئی برانڈز، ایک کچن، ایک آرڈر بورڈ۔" },
    ar: { name: "المطابخ السحابية", navLine: "عدة علامات، مطبخ واحد، لوحة طلبات واحدة." },
  },
  contactLabel: "Restaurant / Food",
  seo: {
    title: "Cloud Kitchen POS — Multiple Brands, One Kitchen",
    description:
      "Run several delivery brands from one kitchen: an order page per brand, one order receiver board, kitchen display, packer screen, rider app and reports per brand. Free for 3 months.",
    keywords: ["cloud kitchen POS", "ghost kitchen software", "dark kitchen POS", "delivery kitchen software"],
  },
  schemaSubCategory: "Cloud kitchen management",
  hero: {
    eyebrow: "TajirPoint for cloud kitchens",
    headline: "Several brands. One kitchen. Zero missed orders.",
    sub: "Give each brand its own menu and ordering page, receive every order on one board, cook from one kitchen screen and pack each bag against its ticket.",
    media: { slot: "hero", expect: "video", alt: "Order board receiving orders for three brands from one kitchen" },
  },
  apps: ["receiver", "kds", "packer", "orderPage", "riderApp", "backOffice", "ownerApp"],
  features: [
    {
      id: "brands",
      icon: "layers",
      title: "Several brands from one kitchen",
      benefit: "Set up each brand with its own name and menu while sharing one kitchen, one stock and one team.",
      bullets: [
        "Kitchen brands with their own menus",
        "Shared ingredient stock across brands",
        "Sales reported per brand",
      ],
      media: { slot: "brands", expect: "image", alt: "Brand list with three delivery brands" },
      plan: SHOP_PLAN_NOTE,
    },
    {
      id: "order-pages",
      icon: "globe",
      title: "An order page for each brand",
      benefit: "Each brand gets its own ordering link with its own deals, so customers never see the others.",
      bullets: [
        "Delivery and pickup",
        "Deals and banners per brand",
        "Delivery areas, fees and hours",
        "Cash on delivery or online payment",
      ],
      media: { slot: "order-pages", expect: "phone", alt: "Two brand order pages side by side" },
      plan: SHOP_PLAN_NOTE,
    },
    {
      id: "receiver",
      icon: "alarmpct",
      title: "One board for every order",
      benefit: "Orders for every brand ring on one screen until they are accepted.",
      bullets: [
        "Brand shown on every order",
        "Accept or decline in one tap",
        "Order desk app for Android",
      ],
      media: { slot: "receiver", expect: "video", alt: "Order receiver board with orders from several brands" },
    },
    {
      id: "kds",
      icon: "monitor",
      title: "Kitchen display by station",
      benefit: "Cooks see what to make, station by station, whichever brand it was ordered from.",
      bullets: ["Station screens or printed tickets", "Mark items ready", "Expo check before packing"],
      media: { slot: "kds", expect: "image", alt: "Kitchen display with tickets from several brands" },
    },
    {
      id: "packer",
      icon: "package",
      title: "Packer screen",
      benefit: "Pack each bag against its ticket so the right food goes in the right brand's bag.",
      bullets: ["Item checklist per order", "Ready-for-rider status", "Fewer missing-item complaints"],
      media: { slot: "packer", expect: "image", alt: "Packer screen with an item checklist" },
    },
    {
      id: "riders",
      icon: "scooter",
      title: "Riders and delivery",
      benefit: "Assign orders to your riders, follow them live and settle their cash at the end of the shift.",
      bullets: [
        "Rider app for Android",
        "Live location and proof of delivery",
        "Courier network riders where it operates",
      ],
      media: { slot: "riders", expect: "phone", alt: "Rider app with a delivery job" },
    },
    {
      id: "aggregators",
      icon: "chat",
      title: "Delivery app orders in the same queue",
      benefit: "Bring orders from delivery apps into the same board and kitchen screen.",
      bullets: ["Aggregator orders next to your own", "One kitchen queue"],
      media: { slot: "aggregators", expect: "image", alt: "Aggregator orders on the order board" },
      status: "soon",
    },
  ],
  faqs: [
    {
      q: "Is the multi-brand setup included in the free plan?",
      a: "The free Light plan covers one brand and the restaurant tools. Several brands and the online order pages are on the Shop plan and above.",
    },
  ],
  cta: {
    headline: "Run every brand from one screen.",
    sub: "Book a demo and we'll set up your brands, menus and order pages with you.",
  },
};

const retailFashion: Business = {
  slug: "retail-fashion",
  name: "Retail & fashion",
  navLine: "Sizes and colours, barcodes, exchanges and loyalty.",
  icon: "shopbag",
  localized: {
    ur: { name: "ریٹیل اور فیشن", navLine: "سائز اور رنگ، بارکوڈ، تبادلے اور لائلٹی۔" },
    ar: { name: "التجزئة والأزياء", navLine: "مقاسات وألوان، باركود، استبدال وولاء." },
  },
  contactLabel: "General retail / Kiryana",
  seo: {
    title: "Retail & Clothing POS — Variants, Barcodes & Exchanges",
    description:
      "POS for clothing, shoes and general retail: size and colour variants with their own barcodes, label printing, returns and exchanges, loyalty, multi-branch stock and an online store. Free for 3 months.",
    keywords: ["clothing store POS", "fashion retail POS", "boutique POS", "retail POS Pakistan", "barcode label printing"],
  },
  schemaSubCategory: "Retail point of sale",
  hero: {
    eyebrow: "TajirPoint for retail & fashion",
    headline: "Every size, every colour, every branch — counted.",
    sub: "Variants with their own barcodes, labels printed from the back office, exchanges without arguments, and stock you can trust across every branch.",
    media: { slot: "hero", expect: "video", alt: "Clothing store POS scanning a shirt variant" },
  },
  apps: ["pos", "customerDisplay", "backOffice", "website", "ownerApp"],
  features: [
    {
      id: "variants",
      icon: "tag",
      title: "Sizes and colours as variants",
      benefit: "One product, every size and colour — each with its own stock and barcode.",
      bullets: [
        "Variants with their own barcodes",
        "Stock per variant and per branch",
        "Brands, categories and custom fields",
      ],
      media: { slot: "variants", expect: "image", alt: "Product with a size and colour variant grid" },
    },
    {
      id: "labels",
      icon: "barcode",
      title: "Barcodes and label printing",
      benefit: "Print price labels for new stock and scan them at the counter.",
      bullets: ["Label printing from the back office", "Scan to sell", "Price changes reach every counter"],
      media: { slot: "labels", expect: "image", alt: "Barcode label sheet ready to print" },
    },
    {
      id: "returns",
      icon: "refresh",
      title: "Returns and exchanges",
      benefit: "Take a return against the original sale, with a reason, and put the item straight back into stock.",
      bullets: [
        "Return against the original receipt",
        "Return reasons recorded",
        "Refund in cash or to the customer's khata",
      ],
      media: { slot: "returns", expect: "video", alt: "Exchange of a shirt for a different size" },
    },
    {
      id: "loyalty",
      icon: "ticket",
      title: "Loyalty, coupons and promotions",
      benefit: "Bring customers back with points, coupons and sale-time promotions.",
      bullets: ["Loyalty points", "Coupons", "Time-based promotions for a sale weekend"],
      media: { slot: "loyalty", expect: "image", alt: "Coupon applied at checkout" },
    },
    {
      id: "branches",
      icon: "store",
      title: "Multi-branch stock",
      benefit: "See stock in every branch and move it to where it sells.",
      bullets: ["Stock transfers between branches", "Stock counts and adjustments", "Reports per branch"],
      media: { slot: "branches", expect: "image", alt: "Stock transfer between two branches" },
    },
    {
      id: "khata",
      icon: "book",
      title: "Khata for regular customers",
      benefit: "Sell on credit to customers you trust and always know who owes what.",
      bullets: ["Customer credit with limits", "Statements to share", "Customer portal to see their balance"],
      media: { slot: "khata", expect: "image", alt: "Customer khata with balance and history" },
    },
    {
      id: "online-store",
      icon: "globe",
      title: "An online store from the same stock",
      benefit: "Publish your products on a shop website built from templates — stock and prices come from TajirPoint.",
      bullets: ["Website builder with templates", "Products and prices synced", "Shopify and WooCommerce sync coming soon"],
      media: { slot: "online-store", expect: "image", alt: "Fashion store website built with TajirPoint" },
      plan: SHOP_PLAN_NOTE,
    },
  ],
  faqs: [
    {
      q: "Can I print barcode labels for my own products?",
      a: "Yes. Give each product or variant a barcode (or let TajirPoint create one) and print labels from the back office to a label or receipt printer.",
    },
    {
      q: "Does the counter work if the internet drops?",
      a: "Yes. Sales keep going offline and sync when the connection returns. Credit sales and actions that need a manager’s approval need a connection.",
    },
  ],
  cta: {
    headline: "Stock you can trust in every branch.",
    sub: "Book a demo and we'll load a few of your products with sizes and colours to show you.",
  },
};

const groceryKiryana: Business = {
  slug: "grocery-kiryana",
  name: "Grocery & kiryana",
  navLine: "Barcode checkout, khata, cartons to pieces, works offline.",
  icon: "store",
  localized: {
    ur: { name: "گروسری اور کریانہ", navLine: "بارکوڈ چیک آؤٹ، کھاتہ، کارٹن سے عدد، آف لائن بھی۔" },
    ar: { name: "البقالة والسوبرماركت", navLine: "دفع بالباركود، دفتر آجل، من الكرتون للقطعة، يعمل دون إنترنت." },
  },
  contactLabel: "General retail / Kiryana",
  seo: {
    title: "Grocery & Kiryana POS — Barcode, Khata & Offline",
    description:
      "POS for grocery and kiryana stores: fast barcode checkout, sell by carton, kg or piece, digital khata for customers and suppliers, low-stock alerts and offline selling. Free for 3 months.",
    keywords: ["kiryana POS", "grocery POS", "supermarket POS Pakistan", "digital khata", "offline POS"],
  },
  schemaSubCategory: "Grocery point of sale",
  hero: {
    eyebrow: "TajirPoint for grocery & kiryana",
    headline: "Fast checkout, honest khata, and it keeps selling offline.",
    sub: "Scan and sell in seconds, sell by carton, kg or piece, and keep every customer's udhaar in a digital khata instead of a register.",
    media: { slot: "hero", expect: "video", alt: "Kiryana counter scanning items and adding a sale to a customer's khata" },
  },
  apps: ["pos", "customerDisplay", "backOffice", "ownerApp", "website"],
  features: [
    {
      id: "checkout",
      icon: "barcode",
      title: "Barcode checkout",
      benefit: "Scan, total and print in seconds, even on a cheap Android till.",
      bullets: ["USB or Bluetooth barcode scanners", "Cash, card or split payment", "Hold a sale and serve the next customer", "Receipts in English, Urdu or Arabic"],
      media: { slot: "checkout", expect: "video", alt: "Scanning groceries at the counter" },
    },
    {
      id: "units",
      icon: "package",
      title: "Cartons, kilos and pieces",
      benefit: "Buy by the carton, sell by the piece or the kilo — stock converts automatically.",
      bullets: ["Units of measure with conversions", "Different prices per unit", "Price lists for retail and wholesale customers"],
      media: { slot: "units", expect: "image", alt: "Product with carton and piece units" },
    },
    {
      id: "khata",
      icon: "book",
      title: "Digital khata",
      benefit: "Every customer's udhaar in one place — with limits, history and a balance they can see.",
      bullets: ["Credit sales straight to the customer's khata", "Credit limits per customer", "Payments received against the balance", "Customer portal to see their own balance"],
      media: { slot: "khata", expect: "video", alt: "Customer khata with running balance" },
    },
    {
      id: "suppliers",
      icon: "truck",
      title: "Suppliers and purchases",
      benefit: "Record what you bought and what you still owe each supplier.",
      bullets: ["Purchase orders and goods received", "Supplier khata", "Purchase returns"],
      media: { slot: "suppliers", expect: "image", alt: "Goods received note from a supplier" },
    },
    {
      id: "reorder",
      icon: "chart",
      title: "Low stock and reorder",
      benefit: "Know what is running out before the shelf is empty.",
      bullets: ["Low-stock alerts", "Reorder suggestions", "Expiry dates on batches"],
      media: { slot: "reorder", expect: "image", alt: "Reorder suggestions list" },
    },
    {
      id: "offline",
      icon: "refresh",
      title: "Keeps selling offline",
      benefit: "When the internet or power-backup router drops, the counter keeps ringing up sales and syncs later.",
      bullets: ["Offline sales queue and sync automatically", "Offline receipts are numbered separately", "Credit (khata) sales need a connection"],
      media: { slot: "offline", expect: "image", alt: "Offline banner with queued sales" },
    },
    {
      id: "dayend",
      icon: "cash",
      title: "Cash and day-end",
      benefit: "Open and close the register with a cash count and see any difference straight away.",
      bullets: ["Register sessions with cash count", "Z-report", "Expenses and petty cash"],
      media: { slot: "dayend", expect: "image", alt: "Register close with cash count" },
    },
  ],
  faqs: [
    {
      q: "Can I use it on an Android POS terminal with a built-in printer?",
      a: "Yes. TajirPoint runs on Android and prints to the built-in printers on Sunmi and iMin terminals, as well as USB, Bluetooth and network printers.",
    },
    {
      q: "Can my customers see what they owe?",
      a: "Yes. Each customer can have a link to a portal showing their khata balance and history.",
    },
  ],
  cta: {
    headline: "Close the paper register for good.",
    sub: "Book a demo and we'll show you checkout, khata and day-end on your own products.",
  },
};

const pharmacy: Business = {
  slug: "pharmacy",
  name: "Pharmacies",
  navLine: "Batches and expiry, FEFO, generic search, prescription log.",
  icon: "pill",
  localized: {
    ur: { name: "فارمیسیز", navLine: "بیچ اور میعاد، FEFO، جنرک تلاش، نسخہ لاگ۔" },
    ar: { name: "الصيدليات", navLine: "التشغيلات والانتهاء، FEFO، بحث بالاسم العلمي، سجل الوصفات." },
  },
  contactLabel: "General retail / Kiryana",
  seo: {
    title: "Pharmacy POS — Batches, Expiry, FEFO & Prescriptions",
    description:
      "Pharmacy POS with batch and expiry tracking, oldest-first (FEFO) selling, near-expiry reports, generic/molecule search and a prescription log. Free for 3 months.",
    keywords: ["pharmacy POS", "pharmacy software Pakistan", "medical store software", "batch expiry tracking", "FEFO"],
  },
  schemaSubCategory: "Pharmacy point of sale",
  hero: {
    eyebrow: "TajirPoint for pharmacies",
    headline: "Sell safely. Never sell expired.",
    sub: "Every strip linked to its batch and expiry, the oldest stock sold first, and a near-expiry list before stock turns into a loss.",
    media: { slot: "hero", expect: "video", alt: "Pharmacy counter selling a medicine with its batch and expiry" },
  },
  apps: ["pos", "backOffice", "ownerApp"],
  features: [
    {
      id: "batches",
      icon: "package",
      title: "Batch and expiry tracking",
      benefit: "Receive stock with its batch number and expiry date, and see it at the counter.",
      bullets: ["Batch and expiry recorded on purchase", "Stock per batch", "Expired stock kept out of sale"],
      media: { slot: "batches", expect: "image", alt: "Batch list with expiry dates" },
    },
    {
      id: "fefo",
      icon: "refresh",
      title: "Oldest-first selling (FEFO)",
      benefit: "The batch that expires first is sold first, automatically.",
      bullets: ["FEFO picking", "Less stock left to expire", "Fewer returns to suppliers"],
      media: { slot: "fefo", expect: "video", alt: "Sale picking the earliest-expiring batch" },
    },
    {
      id: "expiry",
      icon: "alarmpct",
      title: "Near-expiry list",
      benefit: "See what is about to expire in time to return it or clear it.",
      bullets: ["Expiry report by date range", "Expiry alerts", "Return to supplier"],
      media: { slot: "expiry", expect: "image", alt: "Near-expiry report" },
    },
    {
      id: "molecules",
      icon: "scan",
      title: "Search by generic name",
      benefit: "Find an alternative brand by its molecule when the one asked for is out of stock.",
      bullets: ["Molecule (generic) tagging", "Stock by molecule", "Barcode scanning"],
      media: { slot: "molecules", expect: "image", alt: "Stock by molecule screen" },
    },
    {
      id: "prescriptions",
      icon: "receipt",
      title: "Prescription log",
      benefit: "Keep a record of prescriptions against the sales they were dispensed with.",
      bullets: ["Prescription details recorded", "Searchable log", "Linked to the sale"],
      media: { slot: "prescriptions", expect: "image", alt: "Prescription log" },
    },
    {
      id: "suppliers",
      icon: "truck",
      title: "Distributors and purchases",
      benefit: "Track purchases, bonuses and what you owe each distributor.",
      bullets: ["Purchase orders and goods received", "Supplier khata", "Purchase returns"],
      media: { slot: "suppliers", expect: "image", alt: "Supplier ledger" },
    },
  ],
  faqs: [
    {
      q: "Is the pharmacy pack included in the free plan?",
      a: "Yes. The pharmacy tools are one of the extensions included in the free Light plan.",
    },
  ],
  cta: {
    headline: "Stop losing money to expired stock.",
    sub: "Book a demo and see batches, FEFO and the expiry report on your own medicines.",
  },
};

const electronicsMobile: Business = {
  slug: "electronics-mobile",
  name: "Electronics & mobile",
  navLine: "IMEI and serial tracking, variants, quotations and khata.",
  icon: "phone",
  localized: {
    ur: { name: "الیکٹرانکس اور موبائل", navLine: "IMEI اور سیریل ٹریکنگ، ویریئنٹس، کوٹیشنز اور کھاتہ۔" },
    ar: { name: "الإلكترونيات والجوالات", navLine: "تتبع IMEI والأرقام التسلسلية، المتغيرات، عروض الأسعار والآجل." },
  },
  contactLabel: "Electronics / Mobile",
  seo: {
    title: "Mobile & Electronics Shop POS — IMEI & Serial Tracking",
    description:
      "POS for mobile phone and electronics shops: IMEI and serial number tracking from purchase to sale, colour and storage variants, quotations, khata and supplier ledgers. Free for 3 months.",
    keywords: ["mobile shop POS", "IMEI tracking software", "electronics store POS", "serial number tracking"],
  },
  schemaSubCategory: "Electronics retail point of sale",
  hero: {
    eyebrow: "TajirPoint for electronics & mobile shops",
    headline: "Every handset, tracked by its IMEI.",
    sub: "Record serial and IMEI numbers when stock arrives, sell the exact unit, and find any sale by its number months later.",
    media: { slot: "hero", expect: "video", alt: "Selling a phone by scanning its IMEI" },
  },
  apps: ["pos", "backOffice", "ownerApp", "website"],
  features: [
    {
      id: "serials",
      icon: "scan",
      title: "IMEI and serial numbers",
      benefit: "Know which exact unit you bought, from whom, and who you sold it to.",
      bullets: ["Serials captured on purchase", "Scan the IMEI at the counter", "Find a sale by serial number"],
      media: { slot: "serials", expect: "video", alt: "Serial number list for a phone model" },
    },
    {
      id: "variants",
      icon: "tag",
      title: "Colours and storage as variants",
      benefit: "One model, every colour and storage size, each with its own stock and price.",
      bullets: ["Variants with their own barcodes", "Brands and categories", "Accessories as normal products"],
      media: { slot: "variants", expect: "image", alt: "Phone model with colour and storage variants" },
    },
    {
      id: "quotations",
      icon: "receipt",
      title: "Quotations",
      benefit: "Send a quote for a bulk or corporate order and turn it into a sale when they agree.",
      bullets: ["Printable quotations", "Convert a quote to a sale", "Customer details saved"],
      media: { slot: "quotations", expect: "image", alt: "Quotation for five laptops" },
    },
    {
      id: "khata",
      icon: "book",
      title: "Customer and supplier khata",
      benefit: "Sell on credit to trusted customers and keep track of what you owe each distributor.",
      bullets: ["Customer credit with limits", "Supplier ledgers", "Payments against balances"],
      media: { slot: "khata", expect: "image", alt: "Supplier ledger for a distributor" },
    },
    {
      id: "branches",
      icon: "store",
      title: "Branches and transfers",
      benefit: "Move a unit from one branch to another and keep its serial history.",
      bullets: ["Stock transfers", "Stock per branch", "Reports per branch"],
      media: { slot: "branches", expect: "image", alt: "Stock transfer of serialised phones" },
    },
  ],
  faqs: [
    {
      q: "Can I track warranty and repairs?",
      a: "Serial numbers and their sale history are tracked today, so you can always see when and to whom a unit was sold. A dedicated repairs and warranty-claims screen is not available yet.",
    },
  ],
  cta: {
    headline: "Know where every unit went.",
    sub: "Book a demo and we'll show IMEI tracking on your own models.",
  },
};

const salonsServices: Business = {
  slug: "salons-services",
  name: "Salons & services",
  navLine: "Services and products at one counter, client history, loyalty.",
  icon: "calendar",
  localized: {
    ur: { name: "سیلون اور سروسز", navLine: "ایک کاؤنٹر پر سروسز اور مصنوعات، کلائنٹ ہسٹری، لائلٹی۔" },
    ar: { name: "الصالونات والخدمات", navLine: "خدمات ومنتجات على كاشير واحد، سجل العملاء، الولاء." },
  },
  contactLabel: "Services / Salon",
  seo: {
    title: "Salon & Services POS — Services, Products & Client History",
    description:
      "POS for salons, spas and service businesses: sell services and retail products together, client history, loyalty and coupons, staff logins and online booking requests from your website. Free for 3 months.",
    keywords: ["salon POS", "salon software Pakistan", "spa POS", "service business POS"],
  },
  schemaSubCategory: "Salon and service business point of sale",
  hero: {
    eyebrow: "TajirPoint for salons & services",
    headline: "Services and products, one bill, every client remembered.",
    sub: "Charge for a haircut and the shampoo on the same bill, see each client's history, and bring them back with loyalty and coupons.",
    media: { slot: "hero", expect: "image", alt: "Salon counter billing a service and a product" },
  },
  apps: ["pos", "backOffice", "website", "ownerApp"],
  features: [
    {
      id: "services",
      icon: "pos",
      title: "Services and products on one bill",
      benefit: "Sell services, packages and retail products together at one counter.",
      bullets: ["Services as products with their own prices", "Retail stock for products you sell", "Cash, card or split payment"],
      media: { slot: "services", expect: "image", alt: "Bill with a haircut and a hair product" },
    },
    {
      id: "clients",
      icon: "users",
      title: "Client history",
      benefit: "See what each client had last time and what they spent.",
      bullets: ["Customer profiles", "Visit and payment history", "Khata for clients who pay later"],
      media: { slot: "clients", expect: "image", alt: "Client profile with visit history" },
    },
    {
      id: "loyalty",
      icon: "ticket",
      title: "Loyalty and coupons",
      benefit: "Reward regulars and fill quiet days with offers.",
      bullets: ["Loyalty points", "Coupons", "Time-based promotions"],
      media: { slot: "loyalty", expect: "image", alt: "Loyalty points on a client profile" },
    },
    {
      id: "staff",
      icon: "idcard",
      title: "Staff logins and roles",
      benefit: "Each staff member signs in with their own login, so you know who did what.",
      bullets: ["Roles and permissions", "Sales by staff member", "HR and payroll add-on"],
      media: { slot: "staff", expect: "image", alt: "Staff list with roles" },
    },
    {
      id: "booking",
      icon: "calendar",
      title: "Booking requests from your website",
      benefit: "Let clients request a booking from your TajirPoint website.",
      bullets: ["Booking form on your website", "Services listed with prices"],
      media: { slot: "booking", expect: "phone", alt: "Booking form on a salon website" },
      plan: SHOP_PLAN_NOTE,
    },
    {
      id: "calendar",
      icon: "calendar",
      title: "Appointment calendar",
      benefit: "A day view of appointments per stylist inside the back office.",
      bullets: ["Appointments per staff member", "Reminders"],
      media: { slot: "calendar", expect: "image", alt: "Appointment calendar" },
      status: "soon",
    },
  ],
  faqs: [
    {
      q: "Can I manage appointments in TajirPoint?",
      a: "Clients can request bookings through your TajirPoint website today. A full appointment calendar in the back office is coming soon — ask us about it in your demo.",
    },
  ],
  cta: {
    headline: "Every client remembered.",
    sub: "Book a demo and we'll set up your services and products with you.",
  },
};

const distributorsWholesale: Business = {
  slug: "distributors-wholesale",
  name: "Distributors & wholesale",
  navLine: "Van sales, routes, price lists, warehouses and credit control.",
  icon: "truck",
  localized: {
    ur: { name: "ڈسٹری بیوٹرز اور ہول سیل", navLine: "وین سیلز، روٹس، پرائس لسٹیں، گودام اور اُدھار کنٹرول۔" },
    ar: { name: "الموزعون والجملة", navLine: "البيع المتنقل، المسارات، قوائم الأسعار، المستودعات وضبط الآجل." },
  },
  contactLabel: "Distributor / Wholesale",
  seo: {
    title: "Distribution & Wholesale Software — Van Sales & Routes",
    description:
      "Software for distributors and wholesalers: route dispatch and van sales, day-end reconciliation, dealer price lists, multi-warehouse stock, credit limits and supplier ledgers. Free for 3 months.",
    keywords: ["distribution software Pakistan", "van sales app", "route sales software", "wholesale POS", "order booker app"],
  },
  schemaSubCategory: "Distribution and wholesale management",
  hero: {
    eyebrow: "TajirPoint for distributors & wholesale",
    headline: "The van is a warehouse. Treat it like one.",
    sub: "Load the van in the morning, sell and collect along the route, then reconcile cash and stock at the end of the day — with credit limits that stop bad debt before it starts.",
    media: { slot: "hero", expect: "video", alt: "Van sales trip with stops and collections" },
  },
  apps: ["vanSales", "pos", "backOffice", "ownerApp"],
  features: [
    {
      id: "trips",
      icon: "route",
      title: "Route dispatch and van sales",
      benefit: "Plan a trip, load the van and sell from it stop by stop.",
      bullets: ["Trips with stops and load lists", "Sell, collect and take returns on the route", "Van stock tracked separately from the warehouse"],
      media: { slot: "trips", expect: "video", alt: "Trip screen with stops and a loaded van" },
    },
    {
      id: "reconcile",
      icon: "cash",
      title: "Day-end reconciliation",
      benefit: "When the van returns, match the cash, the goods sold and the goods returned in one screen.",
      bullets: ["Cash collected vs sales", "Returned stock back into the warehouse", "Differences shown per trip"],
      media: { slot: "reconcile", expect: "image", alt: "Trip reconciliation screen" },
    },
    {
      id: "pricing",
      icon: "percent",
      title: "Dealer price lists",
      benefit: "Different prices for retailers, wholesalers and dealers, applied automatically.",
      bullets: ["Price lists per customer group", "Units of measure (carton, dozen, piece)", "Quotations"],
      media: { slot: "pricing", expect: "image", alt: "Price list for dealers" },
    },
    {
      id: "credit",
      icon: "book",
      title: "Credit limits and khata",
      benefit: "Know each shop's balance before you sell to them again.",
      bullets: ["Credit limits per customer", "Ageing of what is owed", "Payments collected on the route"],
      media: { slot: "credit", expect: "image", alt: "Customer balance with ageing" },
    },
    {
      id: "warehouses",
      icon: "warehouse",
      title: "Warehouses and transfers",
      benefit: "Stock in every warehouse, and transfers between them that leave a record.",
      bullets: ["Multiple warehouses", "Stock transfers", "Stock counts and adjustments"],
      media: { slot: "warehouses", expect: "image", alt: "Warehouse stock overview" },
    },
    {
      id: "purchasing",
      icon: "bag",
      title: "Purchasing and suppliers",
      benefit: "Purchase orders, goods received and supplier balances in one place.",
      bullets: ["Purchase orders and GRN", "Supplier ledgers", "Purchase returns"],
      media: { slot: "purchasing", expect: "image", alt: "Purchase order screen" },
    },
  ],
  faqs: [
    {
      q: "Is route dispatch included in the free plan?",
      a: "Yes. Route dispatch is one of the extensions included in the free Light plan, within its limits (one shop, two users, 30 products, 100 orders a day). Most distributors move to Shop or Business for more users and products.",
    },
  ],
  cta: {
    headline: "Every trip reconciled. Every rupee accounted for.",
    sub: "Book a demo and we'll walk through a trip from loading to day-end.",
  },
};

const furnitureHome: Business = {
  slug: "furniture-home",
  name: "Furniture & home",
  navLine: "Quotations, variants, custom fields, credit and delivery.",
  icon: "warehouse",
  localized: {
    ur: { name: "فرنیچر اور ہوم", navLine: "کوٹیشنز، ویریئنٹس، کسٹم فیلڈز، اُدھار اور ڈیلیوری۔" },
    ar: { name: "الأثاث والمنزل", navLine: "عروض أسعار، متغيرات، حقول مخصصة، آجل وتوصيل." },
  },
  contactLabel: "General retail / Kiryana",
  seo: {
    title: "Furniture Store POS — Quotations, Variants & Delivery",
    description:
      "POS for furniture and home stores: quotations that turn into sales, variants for fabric and finish, custom fields for dimensions, customer credit, warehouse stock and delivery. Free for 3 months.",
    keywords: ["furniture store POS", "furniture shop software", "home decor POS", "quotation software"],
  },
  schemaSubCategory: "Furniture retail point of sale",
  hero: {
    eyebrow: "TajirPoint for furniture & home stores",
    headline: "Quote it, sell it, deliver it — and get paid in full.",
    sub: "Big-ticket sales need quotations, balances and delivery. TajirPoint keeps all three on the same customer record.",
    media: { slot: "hero", expect: "image", alt: "Furniture showroom with a quotation on a tablet" },
  },
  apps: ["pos", "backOffice", "website", "ownerApp"],
  features: [
    {
      id: "quotations",
      icon: "receipt",
      title: "Quotations that become sales",
      benefit: "Send a printable quote and convert it to a sale when the customer agrees.",
      bullets: ["Printable quotations", "Convert to a sale", "Customer details saved"],
      media: { slot: "quotations", expect: "image", alt: "Quotation for a sofa set" },
    },
    {
      id: "variants",
      icon: "tag",
      title: "Variants and custom fields",
      benefit: "Fabric, colour and finish as variants; dimensions and material as custom fields.",
      bullets: ["Variants with their own stock", "Custom fields on products", "Photos on products"],
      media: { slot: "variants", expect: "image", alt: "Product with fabric variants and dimension fields" },
    },
    {
      id: "credit",
      icon: "book",
      title: "Balances and credit",
      benefit: "Take part payment now and keep the balance on the customer's khata until delivery.",
      bullets: ["Part payment at the counter", "Balance on the customer's khata", "Statements to share"],
      media: { slot: "credit", expect: "image", alt: "Customer khata showing an outstanding balance" },
    },
    {
      id: "warehouse",
      icon: "warehouse",
      title: "Showroom and warehouse stock",
      benefit: "Know what is on the floor and what is in the warehouse.",
      bullets: ["Multiple warehouses", "Transfers", "Stock counts"],
      media: { slot: "warehouse", expect: "image", alt: "Stock by warehouse" },
    },
    {
      id: "delivery",
      icon: "truck",
      title: "Delivery",
      benefit: "Plan deliveries to customers with your own vehicles and drivers.",
      bullets: ["Delivery trips with stops", "Balance collected on delivery goes to the khata"],
      media: { slot: "delivery", expect: "image", alt: "Delivery trip for furniture orders" },
    },
    {
      id: "website",
      icon: "globe",
      title: "Your catalogue online",
      benefit: "Show your range on a website built from your TajirPoint products.",
      bullets: ["Website builder with templates", "Products and photos synced"],
      media: { slot: "website", expect: "image", alt: "Furniture store website" },
      plan: SHOP_PLAN_NOTE,
    },
  ],
  faqs: [
    {
      q: "Can I take a deposit and collect the rest on delivery?",
      a: "Yes. Take part payment at the counter and the remaining balance stays on the customer's khata until they pay it.",
    },
  ],
  cta: {
    headline: "Big sales, tracked to the last rupee.",
    sub: "Book a demo and we'll set up a quotation and delivery with your own products.",
  },
};

export const BUSINESSES: readonly Business[] = [
  restaurants,
  cafesBakeries,
  cloudKitchens,
  retailFashion,
  groceryKiryana,
  pharmacy,
  electronicsMobile,
  salonsServices,
  distributorsWholesale,
  furnitureHome,
];

export function getBusiness(slug: string): Business | undefined {
  return BUSINESSES.find((b) => b.slug === slug);
}

export function isBusinessSlug(value: string): value is BusinessSlug {
  return (BUSINESS_SLUGS as readonly string[]).includes(value);
}

/** Name for the visitor's locale (nav, grids). Falls back to English. */
export function businessLabel(b: Business, locale: string): { name: string; navLine: string } {
  if (locale === "ur" || locale === "ar") return b.localized[locale];
  return { name: b.name, navLine: b.navLine };
}

/** Old /solutions/* pages → their business page. */
export const LEGACY_SOLUTION_REDIRECTS: Record<string, BusinessSlug> = {
  restaurants: "restaurants",
  "general-retail": "grocery-kiryana",
  electronics: "electronics-mobile",
  services: "salons-services",
  distributors: "distributors-wholesale",
};

/** The campaign name used in Facebook ad links for a business. */
export function demoCampaign(slug: BusinessSlug): string {
  return `demo_${slug.replace(/-/g, "_")}`;
}

/** Every media slot on every business page, for docs and tests. */
export function allMediaSlots(): Array<{ business: BusinessSlug; section: string; media: MediaRef }> {
  return BUSINESSES.flatMap((b) => [
    { business: b.slug, section: "Hero", media: b.hero.media },
    ...b.features.map((f) => ({ business: b.slug, section: f.title, media: f.media })),
  ]);
}
