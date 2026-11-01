/**
 * Add-on names by slug, small enough for the browser: the call-back form reads
 * `?addon=<slug>` and pre-fills "I'm interested in <name>". Copied from the
 * API on 1 Nov 2026; a slug that is not here (an add-on added later) is
 * turned into words from the slug itself, so the form never shows a raw id.
 */
export const ADDON_NAMES: Record<string, string> = {
  "accounting-gl": "Accounting & General Ledger",
  "cash-management": "Cash Management",
  "quickbooks-accounting": "QuickBooks Online",
  "cloud-kitchen": "Cloud Kitchen Pack",
  "digital-signage": "Digital Signage",
  hrm: "HR & Payroll",
  "pharmacy-pack": "Pharmacy Pack",
  restaurant: "Restaurant",
  "restaurant-toolbox": "Restaurant Toolbox",
  "route-dispatch": "Route Dispatch & Delivery",
  "website-builder": "Website Builder",
  "ai-phone-ordering": "AI Phone Ordering",
  "whatsapp-ai": "WhatsApp AI Assistant",
  "bigcommerce-sync": "BigCommerce Sync",
  "customer-portal": "Customer Portal",
  "delivery-aggregator": "Delivery Aggregator",
  "easypaisa-payments": "Easypaisa Payments",
  "hbl-payments": "HBLPay",
  hubrise: "HubRise",
  "jazzcash-payments": "JazzCash Payments",
  "magento-sync": "Magento Sync",
  "paypal-payments": "PayPal Payments",
  "razorpay-payments": "Razorpay Payments",
  "shopify-sync": "Shopify Sync",
  "square-payments": "Square Payments",
  "stripe-payments": "Stripe Payments",
  "time-promotions": "Time-Based Promotions",
  "wix-sync": "Wix Sync",
  "woocommerce-sync": "WooCommerce Sync",
  coupons: "Coupons & Discounts",
  "courier-leopards": "Leopards Courier",
  "courier-nash": "Network drivers",
  "courier-postex": "PostEx",
  "courier-tcs": "TCS Express",
  "fbr-integration": "FBR Real-Time POS Integration",
  "age-verification": "Age Verification",
};

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** The display name for an add-on slug, or null when it is not a valid slug. */
export function addonNameFromSlug(slug: string | null | undefined): string | null {
  const s = (slug ?? "").trim().toLowerCase();
  if (!s || s.length > 80 || !SLUG_RE.test(s)) return null;
  if (Object.prototype.hasOwnProperty.call(ADDON_NAMES, s)) return ADDON_NAMES[s] ?? null;
  return s
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** The message the call-back form starts with for an add-on. */
export function addonInterestMessage(name: string): string {
  return `I'm interested in the ${name} add-on.`;
}
