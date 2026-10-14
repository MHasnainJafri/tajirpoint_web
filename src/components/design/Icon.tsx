import Image from "next/image";

/**
 * Marketplace icons use original brand assets or bespoke 3D extension illustrations.
 * Other marketing surfaces retain their existing illustrations and line glyphs.
 * Asset provenance is recorded in public/icons/sources.json.
 */
const IMG3D: Record<string, string> = {
  store: "store",
  utensils: "utensils",
  restaurant: "restaurant",
  phone: "phone",
  truck: "truck",
  calendar: "calendar",
  route: "route",
  pill: "pill",
  cloud: "cloud",
  globe: "globe",
  card: "card",
  wallet: "wallet",
  bank: "bank",
  book: "book",
  cash: "cash",
  refresh: "refresh",
  receipt: "receipt",
  idcard: "idcard",
  bag: "shopbag",
  shopbag: "shopbag",
  package: "package",
  parcel: "parcel",
  mail: "parcel",
  key: "key",
  bike: "scooter",
  scooter: "scooter",
  ticket: "ticket",
  clock: "alarmpct",
  alarmpct: "alarmpct",
  bot: "bot",
  chat: "chat",
  printer: "pos",
  pos: "pos",
  percent: "percent",
  leopard: "leopard",
  warehouse: "warehouse",
  shield: "shield",
  goods: "goods",
  pettycash: "pettycash",
  users: "users",
  chart: "chart",
  barcode: "barcode",
  calculator: "calculator",
  ledgerbook: "ledgerbook",
};

/** Dedicated PNG assets located under /icons/ */
const CUSTOM_PNG: Record<string, string> = {
  "app-offline": "/icons/offline.png",
  "app-inventory": "/icons/inventory.png",
  "app-accounting": "/icons/accounting.png",
  "app-barcode": "/icons/barcode.png",
  "app-printer": "/icons/printer.png",
  "app-report": "/icons/report.png",
  "app-users": "/icons/users.png",
};

/** Original brand assets and bespoke mint/charcoal extension illustrations. */
const EXTENSION_ASSETS: Record<string, string> = {
  "brand-bigcommerce": "/icons/brand-bigcommerce.svg",
  "brand-easypaisa": "/icons/brand-easypaisa.png",
  "brand-fbr": "/icons/brand-fbr.png",
  "brand-hbl": "/icons/brand-hbl.png",
  "brand-jazzcash": "/icons/brand-jazzcash.svg",
  "brand-leopards": "/icons/brand-leopards.png",
  "brand-magento": "/icons/brand-magento.svg",
  "brand-paypal": "/icons/brand-paypal-official.svg",
  "brand-postex": "/icons/brand-postex.webp",
  "brand-quickbooks": "/icons/brand-quickbooks.svg",
  "brand-razorpay": "/icons/brand-razorpay.svg",
  "brand-shopify": "/icons/brand-shopify.svg",
  "brand-square": "/icons/brand-square.svg",
  "brand-stripe": "/icons/brand-stripe.svg",
  "brand-tcs": "/icons/brand-tcs.png",
  "brand-whatsapp": "/icons/brand-whatsapp.svg",
  "brand-wix": "/icons/brand-wix.svg",
  "brand-woocommerce": "/icons/brand-woocommerce.svg",
  "artwork-pos-checkout": "/design/icons/pos-checkout-3d.webp",
  "artwork-inventory": "/design/icons/inventory-3d.webp",
  "artwork-purchasing": "/design/icons/purchasing-3d.webp",
  "artwork-compliance": "/design/icons/compliance-3d.webp",
  "artwork-integrations": "/design/icons/integrations-3d.webp",
  "extension-accounting-gl": "/design/icons/extension-accounting-gl-3d.webp",
  "extension-age-verification": "/design/icons/extension-age-verification-3d.webp",
  "extension-ai-phone-ordering": "/design/icons/extension-ai-phone-ordering-3d.webp",
  "extension-cash-management": "/design/icons/extension-cash-management-3d.webp",
  "extension-cloud-kitchen": "/design/icons/extension-cloud-kitchen-3d.webp",
  "extension-coupons": "/design/icons/extension-coupons-3d.webp",
  "extension-customer-portal": "/design/icons/extension-customer-portal-3d.webp",
  "extension-delivery-aggregator": "/design/icons/extension-delivery-aggregator-3d.webp",
  "extension-hr-payroll": "/design/icons/extension-hr-payroll-3d.webp",
  "extension-pharmacy": "/design/icons/extension-pharmacy-3d.webp",
  "extension-restaurant-toolbox": "/design/icons/extension-restaurant-toolbox-3d.webp",
  "extension-restaurant": "/design/icons/extension-restaurant-3d.webp",
  "extension-route-dispatch": "/design/icons/extension-route-dispatch-3d.webp",
  "extension-signage": "/design/icons/extension-signage-3d.webp",
  "extension-time-promos": "/design/icons/extension-time-promos-3d.webp",
  "extension-website-builder": "/design/icons/extension-website-builder-3d.webp",
};

const WIDE_BRANDS = new Set([
  "brand-easypaisa",
  "brand-jazzcash",
  "brand-hbl",
  "brand-leopards",
  "brand-postex",
  "brand-fbr",
  "brand-woocommerce",
  "brand-paypal",
]);

/** Drawn when a name matches neither map — better a glyph than an empty box. */
const FALLBACK_ICON = '<path d="M12 2l10 6-10 6L2 8z"/><path d="M2 13.5 12 19.5l10-6"/>';

const LINE_ICONS: Record<string, string> = {
  spreadsheet:
    '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>',
  monitor: '<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M12 17v4M8 21h8"/>',
  filecheck:
    '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 15l2 2 4-4"/>',
  zap: '<path d="M13 2 3 14h7l-1 8 11-12h-7z"/>',
  layers: '<path d="M12 2l10 6-10 6L2 8z"/><path d="M2 13.5 12 19.5l10-6"/>',
  scan: '<path d="M3 8V5a2 2 0 0 1 2-2h3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M8 21H5a2 2 0 0 1-2-2v-3"/><path d="M7 12h10"/>',
  tag: '<path d="M3 3h8l10 10-8 8L3 11z"/><path d="M7.5 7.5h.01"/>',
};

export type IconName =
  | keyof typeof IMG3D
  | keyof typeof CUSTOM_PNG
  | keyof typeof EXTENSION_ASSETS
  | keyof typeof LINE_ICONS
  | (string & {});

interface IconProps {
  name: IconName;
  /** Nominal size in px. 3D icons render at 1.5x this, per the design. */
  size?: number;
  className?: string;
}

export function Icon({ name, size = 19, className }: IconProps) {
  const asset = EXTENSION_ASSETS[name];
  if (asset) {
    const wide = WIDE_BRANDS.has(name);
    const illustration = name.startsWith("extension-") || name.startsWith("artwork-");
    const height = Math.round(size * (illustration ? 2.1 : 1.4));
    const width = Math.round(size * (illustration ? 2.1 : wide ? 2.25 : 1.4));
    return (
      <span
        className={className}
        style={{
          display: "inline-flex",
          flexShrink: 0,
          width,
          height,
          alignItems: "center",
          justifyContent: "center",
          ...(name === "brand-postex"
            ? { background: "#111827", borderRadius: 6, padding: 4 }
            : {}),
        }}
      >
        <Image
          src={asset}
          alt=""
          aria-hidden="true"
          width={width}
          height={height}
          style={{
            width: "100%",
            height: name === "brand-woocommerce" ? width : "100%",
            objectFit: "contain",
          }}
        />
      </span>
    );
  }

  // 1. Check dedicated custom PNGs
  const customPng = CUSTOM_PNG[name];
  if (customPng) {
    const px = Math.round(size * 1.35);
    return (
      <Image
        src={customPng}
        alt=""
        aria-hidden="true"
        width={px}
        height={px}
        className={className}
        style={{
          width: "auto",
          height: "auto",
          maxWidth: px,
          maxHeight: px,
          objectFit: "contain",
          display: "block",
        }}
      />
    );
  }

  // 3. Check 3D rendered icons
  const file = IMG3D[name];
  if (file) {
    const px = Math.round(size * 1.5);
    return (
      <Image
        src={`/design/icons/${file}.png`}
        alt=""
        aria-hidden="true"
        width={px}
        height={px}
        className={className}
        style={{
          width: "auto",
          height: "auto",
          maxWidth: px,
          maxHeight: px,
          objectFit: "contain",
          display: "block",
        }}
      />
    );
  }

  // 4. Fallback line icons
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      dangerouslySetInnerHTML={{ __html: LINE_ICONS[name] ?? FALLBACK_ICON }}
    />
  );
}
