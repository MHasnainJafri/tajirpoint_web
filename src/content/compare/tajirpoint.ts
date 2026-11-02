import type { Cell } from "./types";

/**
 * TajirPoint's side of the tables, written once so every page says the same
 * thing. Each line was checked on 2 Nov 2026 against the live site copy
 * (src/lib/marketing/businesses.ts, the feature pages, the add-on catalogue)
 * and the backend (tajirpos_backend/domains/: parties, accounting, sync,
 * restaurants, rider_network, fbr). Keep it in step with those, not ahead.
 */
export const TP = {
  freeStart: {
    mark: "partial",
    text: "Light plan free for 3 months, no card. Then a paid plan (Shop or Business).",
    href: "/pricing",
  },
  offlineRetail: {
    mark: "partial",
    text: "Shop counter keeps selling offline and syncs later. Offline for restaurant tables and the kitchen screen is not released yet.",
    href: "/features/offline",
  },
  offlineShop: {
    mark: "yes",
    text: "Keeps selling with no internet; syncs on its own when the line is back.",
    href: "/features/offline",
  },
  devices: {
    mark: "info",
    text: "Any browser, a Windows desktop app (a Mac build on request) and Android. iOS is coming soon.",
  },
  iosSoon: {
    mark: "soon",
    text: "Coming soon. Android, Windows and the browser work today.",
  },
  windowsApp: {
    mark: "yes",
    text: "Windows desktop app (a Mac build on request).",
  },
  khata: {
    mark: "yes",
    text: "Customer credit ledger with running balance, credit limits, 30/60/90-day aging, reminders and PDF statements.",
    href: "/features/khata",
  },
  accounting: {
    mark: "yes",
    text: "Double-entry books posted from sales and purchases: trial balance, P&L, balance sheet (Accounting add-on).",
    href: "/features/accounting",
  },
  stock: {
    mark: "yes",
    text: "Stock per shop or warehouse, purchases from suppliers, low-stock alerts, barcodes.",
  },
  multiBranch: {
    mark: "partial",
    text: "More than one shop on the Business plan, with stock moves between them.",
    href: "/pricing",
  },
  staff: {
    mark: "yes",
    text: "Each staff member signs in with their own login and role.",
  },
  kds: {
    mark: "yes",
    text: "Kitchen display per station, or printed kitchen tickets. Any tablet, TV box or PC with a browser.",
    href: "/business/restaurants",
  },
  waiter: {
    mark: "yes",
    text: "Waiter app for Android phones and tablets.",
    href: "/business/restaurants",
  },
  orderPage: {
    mark: "partial",
    text: "Your own online order page for delivery, pickup and dine-in, no commission to an app (Shop plan and above).",
    href: "/business/restaurants",
  },
  riders: {
    mark: "yes",
    text: "Rider app for Android with jobs, navigation, proof of delivery and rider cash per shift.",
    href: "/business/restaurants",
  },
  recipes: {
    mark: "yes",
    text: "Recipes deduct ingredients as you sell, with kitchen stock counts.",
  },
  loyalty: {
    mark: "yes",
    text: "Loyalty points and coupons.",
  },
  languages: {
    mark: "yes",
    text: "App and receipts in English, Urdu and Arabic, with right-to-left screens. French and Spanish screens too.",
  },
  fbr: {
    mark: "soon",
    text: "FBR connector is coming soon. Tax on every bill and tax reports work today.",
    href: "/features/e-invoicing",
  },
  provincialTax: {
    mark: "no",
    text: "Not yet. PRA, SRB and KPRA connections are not built.",
  },
  zatca: {
    mark: "no",
    text: "Not available for Saudi Arabia yet. Tax on every bill and tax reports work today.",
    href: "/features/e-invoicing",
  },
  cardProcessing: {
    mark: "info",
    text: "We don't process cards. Record card sales from your bank's terminal; take online payments through the Stripe add-on. No transaction fee from TajirPoint.",
  },
  hardware: {
    mark: "info",
    text: "We don't sell hardware. Runs on a PC, laptop, Android phone or tablet, or an Android POS with a built-in printer.",
  },
  ai: {
    mark: "soon",
    text: "WhatsApp AI and AI phone ordering are coming soon. No AI sales assistant yet.",
  },
  migration: {
    mark: "yes",
    text: "Free: send an Excel or CSV export and our team loads products, customers, credit balances and stock.",
    href: "/book-demo?migrate=1",
  },
  industries: {
    mark: "yes",
    text: "Restaurants, cafés, cloud kitchens, shops, grocery, pharmacy, mobile shops, salons, distributors and more.",
    href: "/business",
  },
} satisfies Record<string, Cell>;
