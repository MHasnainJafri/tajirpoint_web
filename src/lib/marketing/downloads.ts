/**
 * The downloads catalog — ONE file behind /downloads, the "Download" links in
 * the menu and footer, the home page's devices block and the apps block on
 * the business pages.
 *
 * Rules for editing:
 *  - Every claim must be true of what ships today (see KNOWLEDGE-BASE.md).
 *  - The desktop installers live on our own server: updates.tajirpoint.com
 *    serves /srv/amalaxis/updates/downloads/ at /downloads/ (nginx site
 *    updates.tajirpoint.com). A new desktop build = upload the two files to
 *    .../downloads/desktop/ under new versioned names, then change DESKTOP
 *    below (version, date, file names, sizes) and release the site.
 *  - Android apps go to Google Play. Put an app's store link in `play` once
 *    its listing is PUBLIC (an internal-testing listing 404s for visitors);
 *    until then the page says "Coming to Google Play".
 *  - Only our own build (Tajir Point) has downloads. Another brand's build
 *    leaves /downloads out (src/lib/config/pages.ts) until it has its own.
 */

/** Where the installers are served from (nginx on the Tajir Point server). */
const FILES = "https://updates.tajirpoint.com/downloads/desktop";

export type DesktopOs = "windows" | "mac";

export interface DesktopFile {
  os: DesktopOs;
  /** Button label: "Download for Windows". */
  label: string;
  /** Under the button: what the file is. */
  detail: string;
  href: string;
  /** Human size, "11 MB". */
  size: string;
  requires: string;
  /** Install steps, in order. */
  steps: string[];
}

export const DESKTOP: {
  name: string;
  version: string;
  released: string;
  files: readonly DesktopFile[];
} = {
  name: "Tajir Point POS",
  version: "1.0.23",
  /** ISO date of the build. */
  released: "2026-11-28",
  files: [
    {
      os: "windows",
      label: "Download for Windows",
      detail: "Installer (.exe), 64-bit",
      href: `${FILES}/Tajir-Point-POS-1.0.23-Windows-Setup.exe`,
      size: "10 MB",
      requires: "Windows 10 or 11, 64-bit",
      steps: [
        "Open the downloaded file Tajir-Point-POS-1.0.23-Windows-Setup.exe.",
        "If Windows shows “Windows protected your PC”, click More info, then Run anyway.",
        "Follow the installer (no administrator password needed). The app is added to the Start menu.",
        "Open it and sign in with your Tajir Point login.",
      ],
    },
    {
      os: "mac",
      label: "Download for Mac",
      detail: "Disk image (.dmg), Apple Silicon and Intel",
      href: `${FILES}/Tajir-Point-POS-1.0.23-Mac.dmg`,
      size: "24 MB",
      requires: "macOS 10.15 Catalina or later",
      steps: [
        "Open the downloaded file Tajir-Point-POS-1.0.23-Mac.dmg.",
        "Drag Tajir Point POS into the Applications folder.",
        "The first time, right-click the app in Applications and choose Open. If macOS still blocks it, open System Settings → Privacy & Security and click Open Anyway.",
        "Sign in with your Tajir Point login.",
      ],
    },
  ],
};

/** What the desktop app does (the /downloads desktop panel). */
export const DESKTOP_POINTS = [
  "Full point of sale: sell, take cash or card, print receipts and open the cash drawer.",
  "Works with USB, network and Bluetooth receipt printers and barcode scanners.",
  "The shop counter keeps selling when the internet drops and syncs the sales when it comes back.",
  "Restaurants: tables, kitchen tickets, takeaway and delivery from the same till, full screen on the counter PC.",
  "One login for every screen: what each person sees follows their role.",
] as const;

/* ── Phone and tablet apps ────────────────────────────────────────── */

export type AppAudience = "restaurants" | "all";

export interface MobileApp {
  id: string;
  name: string;
  /** Who uses it, in a few words. */
  who: string;
  line: string;
  /** Icon name from components/design/Icon. */
  icon: "pos" | "alarmpct" | "restaurant" | "package" | "monitor" | "users" | "chart" | "scooter";
  audience: AppAudience;
  /** Android package (Play Store id). */
  androidId: string;
  /** Public Play Store link; "" = not public yet ("Coming to Google Play"). */
  play: string;
}

export const MOBILE_APPS: MobileApp[] = [
  {
    id: "pos",
    name: "Tajir Point POS",
    who: "Cashier · counter",
    line: "The till on an Android phone, tablet or POS terminal with a built-in printer. Sell, scan barcodes with the camera and print receipts over Bluetooth.",
    icon: "pos",
    audience: "all",
    androidId: "com.tajirpoint.pos",
    play: "",
  },
  {
    id: "business",
    name: "Tajir Point Business",
    who: "Owner · manager",
    line: "Today's sales, stock, dues and reports for every branch, from your phone.",
    icon: "chart",
    audience: "all",
    androidId: "com.tajirpoint.business",
    play: "",
  },
  {
    id: "orderdesk",
    name: "Order Desk",
    who: "Front desk",
    line: "Online and phone orders ring on one screen. Accept or reject with a tap, print the ticket and track each order until it leaves.",
    icon: "alarmpct",
    audience: "restaurants",
    androidId: "com.tajirpoint.orderdesk",
    play: "",
  },
  {
    id: "kitchen",
    name: "Kitchen",
    who: "Chefs",
    line: "The kitchen display: tickets by station and one tap to mark food ready.",
    icon: "restaurant",
    audience: "restaurants",
    androidId: "com.tajirpoint.kitchen",
    play: "",
  },
  {
    id: "waiter",
    name: "Waiter",
    who: "Floor staff",
    line: "Take orders at the table on a phone and send them straight to the kitchen.",
    icon: "users",
    audience: "restaurants",
    androidId: "com.tajirpoint.waiter",
    play: "",
  },
  {
    id: "packer",
    name: "Packer",
    who: "Packing station",
    line: "Check every item, pack takeaway and delivery orders and hand them to the rider or customer.",
    icon: "package",
    audience: "restaurants",
    androidId: "com.tajirpoint.packer",
    play: "",
  },
  {
    id: "orderboard",
    name: "Order Board",
    who: "TV for customers",
    line: "A screen in the shop that shows which order numbers are being prepared and which are ready to collect.",
    icon: "monitor",
    audience: "restaurants",
    androidId: "com.tajirpoint.orderboard",
    play: "",
  },
  {
    id: "rider",
    name: "Tajir Point Rider",
    who: "Delivery riders",
    line: "Riders get delivery jobs, navigate on the map, share their live location and confirm delivery and cash.",
    icon: "scooter",
    audience: "all",
    androidId: "com.tajirpoint.rider",
    play: "",
  },
];

/** "Which apps do I need?" — the setups on /downloads. */
export const SETUPS = [
  {
    id: "restaurant",
    title: "Restaurants, cafés and cloud kitchens",
    body: "A restaurant runs on several screens, each doing one job. Install the ones your team needs; they all share the same menu, orders and reports.",
    items: [
      {
        app: "Tajir Point POS",
        where: "Counter PC or laptop (Windows or Mac), or an Android till",
      },
      { app: "Order Desk", where: "Tablet at the front desk for online and phone orders" },
      { app: "Kitchen", where: "Tablet or screen in the kitchen" },
      { app: "Waiter", where: "Each waiter's phone" },
      { app: "Packer", where: "Tablet at the packing station" },
      { app: "Order Board", where: "TV or tablet facing customers" },
      { app: "Tajir Point Rider", where: "Each rider's phone" },
      { app: "Tajir Point Business", where: "The owner's phone" },
    ],
    href: "/business/restaurants",
    cta: "See the restaurant system",
  },
  {
    id: "shop",
    title: "Shops and every other business",
    body: "Retail, grocery, pharmacy, salons, distributors and more need just two apps, plus the back office in any browser.",
    items: [
      {
        app: "Tajir Point POS",
        where: "Counter PC or laptop (Windows or Mac), or an Android phone or till",
      },
      { app: "Tajir Point Business", where: "The owner's phone" },
      { app: "Back office", where: "Any browser — stock, purchases, staff and reports" },
      { app: "Tajir Point Rider", where: "Only if you deliver with your own riders" },
    ],
    href: "/business",
    cta: "Find your business",
  },
] as const;

/** The download link used across the site. */
export const DOWNLOADS_PATH = "/downloads";
