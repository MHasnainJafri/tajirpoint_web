import Image from "next/image";

/**
 * The design ships two icon systems side by side:
 *
 *  1. A set of 3D rendered PNGs (`/design/icons/*.png`). Anything named in
 *     `IMG3D` renders as one of these, drawn at 1.5x the nominal size —
 *     that ratio comes straight from the design source and is what makes the
 *     3D icons optically match the surrounding line icons.
 *  2. A line-icon fallback for the handful of names with no 3D render.
 *
 * Keep both maps in sync with the design project; a name missing from both
 * falls back to the `package` glyph rather than rendering nothing.
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
  "brand-jazzcash": "/icons/jazzcash.png",
  "brand-fbr": "/icons/fbr.png",
  "app-offline": "/icons/offline.png",
  "app-inventory": "/icons/inventory.png",
  "app-accounting": "/icons/accounting.png",
  "app-barcode": "/icons/barcode.png",
  "app-printer": "/icons/printer.png",
  "app-report": "/icons/report.png",
  "app-users": "/icons/users.png",
};

/** High-fidelity vector SVGs for brands without a native 3D render */
const BRAND_SVGS: Record<string, (size: number) => React.ReactNode> = {
  "brand-whatsapp": (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#25D366" />
      <path
        d="M17.5 14.4c-.3-.15-1.78-.88-2.06-.98-.28-.1-.48-.15-.68.15-.2.3-.78.98-.95 1.18-.17.2-.35.22-.65.08-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.18-.3-.02-.46.13-.61.14-.13.3-.35.45-.53.15-.17.2-.3.3-.5.1-.2.05-.38-.03-.53-.07-.15-.68-1.63-.93-2.24-.24-.58-.49-.5-.67-.51h-.58c-.2 0-.53.07-.8.38-.28.3-1.07 1.05-1.07 2.56s1.1 2.97 1.25 3.17c.15.2 2.16 3.3 5.23 4.63.73.32 1.3.5 1.75.64.73.23 1.4.2 1.93.12.59-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.07-.13-.27-.2-.57-.35z"
        fill="#FFFFFF"
      />
    </svg>
  ),
  "brand-stripe": (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#635BFF" />
      <path
        d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-4.894C18.252 1.475 15.697 1 12.428 1 7.422 1 3.86 3.629 3.86 7.989c0 5.485 5.093 6.643 8.356 7.822 2.502.905 3.376 1.611 3.376 2.65 0 .979-.865 1.543-2.316 1.543-2.26 0-5.184-1.077-7.072-2.115l-.946 4.967C6.96 23.339 9.873 23.7 13.067 23.7c5.316 0 9.073-2.585 9.073-7.234 0-5.467-5.092-6.577-8.164-7.316z"
        fill="#FFFFFF"
      />
    </svg>
  ),
  "brand-paypal": (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#003087" />
      <path
        d="M7.076 19.337H3.47a.641.641 0 0 1-.633-.74L4.944 3.838A.96.96 0 0 1 5.894 3h6.126c2.518 0 4.417.653 5.492 1.888.995 1.144 1.258 2.673.784 4.546-.713 2.822-2.738 4.757-5.698 5.449-.49.115-1.025.174-1.594.174H9.66a.8.8 0 0 0-.791.676l-.994 3.29-.074.468a.64.64 0 0 1-.725.846z"
        fill="#0079C1"
      />
      <path
        d="M8.869 12.047l1.32-6.363A.8.8 0 0 1 10.98 5h4.21c1.844 0 3.235.478 4.022 1.382.729.838.921 1.958.574 3.33-.522 2.067-2.005 3.484-4.175 3.991-.359.084-.75.127-1.168.127H12.63a.8.8 0 0 0-.791.676l-.79 4.004-.047.297a.64.64 0 0 1-.633.54H8.44l.429-7.3z"
        fill="#FFFFFF"
      />
    </svg>
  ),
  "brand-razorpay": (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#0C2340" />
      <path d="M19.436 3l-9.91 11.5h4.922L21 3h-1.564z" fill="#3395FF" />
      <path
        d="M11.757 3H3.222L1.5 13.385l6.533 8.115h5.845l-4.326-5.7 2.205-2.529c3.475-.544 6.24-2.867 6.663-6.589L18.5 3h-6.743zm-.42 6.784c-.692.636-1.528.847-2.676.847H6.51l.723-3.82h1.847c1.172 0 1.958.237 2.266.873.238.547.018 1.564-.209 2.1z"
        fill="#FFFFFF"
      />
    </svg>
  ),
  "brand-square": (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#0A0A0A" />
      <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" fill="#FFFFFF" />
      <rect x="9" y="9" width="6" height="6" rx="1.8" fill="#0A0A0A" />
    </svg>
  ),
  "brand-easypaisa": (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="11" fill="#00B140" />
      <path
        d="M6.5 12c0-3.04 2.46-5.5 5.5-5.5s5.5 2.46 5.5 5.5-2.46 5.5-5.5 5.5c-1.52 0-2.89-.62-3.89-1.61L11.5 14c.61.61 1.45.98 2.38.98 1.86 0 3.37-1.51 3.37-3.37s-1.51-3.37-3.37-3.37-3.37 1.51-3.37 3.37H6.5z"
        fill="#FFFFFF"
      />
      <circle cx="12.5" cy="12" r="1.8" fill="#FFFFFF" />
    </svg>
  ),
  "brand-hbl": (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#008269" />
      <path d="M12 4L19 12L12 20L5 12Z" fill="#FFFFFF" />
      <path d="M12 7.5L16.5 12L12 16.5L7.5 12Z" fill="#008269" />
      <circle cx="12" cy="12" r="2" fill="#FFFFFF" />
    </svg>
  ),
  "brand-quickbooks": (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#2CA01C" />
      <path
        d="M10 7.5H8.5a4 4 0 1 0 4 4V6h-2.5v1.5zm0 5.2a1.3 1.3 0 1 1-1.3-1.3H10v1.3z"
        fill="#FFFFFF"
      />
      <path
        d="M14 16.5h1.5a4 4 0 1 0-4-4V18H14v-1.5zm0-5.2a1.3 1.3 0 1 1 1.3 1.3H14v-1.3z"
        fill="#FFFFFF"
      />
    </svg>
  ),
  "brand-woocommerce": (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#7F54B3" />
      <path
        d="M3.5 8l2.2 8.5L8.5 8l2.2 8.5L13 8l2.5 8.5L18 8l2.5 8.5"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  ),
  "brand-shopify": (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#95BF47" />
      <path
        d="M17.5 5.5c-.1-.4-.4-.5-.8-.5h-2.2c-.2-1.5-1.3-2.5-2.7-2.5s-2.5 1-2.7 2.5H6.9c-.4 0-.7.2-.8.5L4 19.5c-.1.4.2.8.7.8h14.6c.5 0 .8-.4.7-.8L17.5 5.5zM11.8 3.5c.7 0 1.3.6 1.4 1.5h-2.8c.1-.9.7-1.5 1.4-1.5z"
        fill="#FFFFFF"
      />
      <path
        d="M11 10.5c0-.7.5-1.2 1.3-1.2.6 0 1.1.4 1.2.9l-1 .4c-.1-.1-.1-.3-.2-.3-.2 0-.3.1-.3.3 0 .2.2.4.5.5l.6.2c.8.3 1.2.8 1.2 1.5 0 .9-.7 1.5-1.6 1.5-.9 0-1.4-.5-1.5-1.1l1-.4c.1.3.2.5.5.5.3 0 .5-.2.5-.5 0-.2-.1-.4-.5-.5l-.6-.2c-.7-.3-1.1-.7-1.1-1.4z"
        fill="#214A1E"
      />
    </svg>
  ),
  "brand-magento": (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#EE672F" />
      <path
        d="M12 3.5L4.5 7.8v8.4l3.2-1.8V9.7l4.3-2.5 4.3 2.5v4.7l3.2 1.8V7.8L12 3.5zM12 11.8L9.4 13.3v4.4L12 19.2l2.6-1.5v-4.4L12 11.8z"
        fill="#FFFFFF"
      />
    </svg>
  ),
  "brand-wix": (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#0C0C0C" />
      <path
        d="M4.5 15.5l1.6-7h1.8l1.3 4.5 1.3-4.5h1.8l1.6 7h-1.6l-.9-4.5-1.3 4.5h-1.4l-1.3-4.5-.9 4.5H4.5zm13 0V8.5h1.8v7h-1.8z"
        fill="#FFFFFF"
      />
    </svg>
  ),
  "brand-bigcommerce": (s) => (
    <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden="true">
      <rect width="24" height="24" rx="6" fill="#121118" />
      <path
        d="M6.5 6h5.2a3.5 3.5 0 0 1 2.8 5.6A3.8 3.8 0 0 1 11.8 17H6.5V6zm2.6 3.8h2.6a1.3 1.3 0 0 0 0-2.6H9.1v2.6zm0 4.4h2.8a1.5 1.5 0 0 0 0-3H9.1v3z"
        fill="#FFFFFF"
      />
    </svg>
  ),
};

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
  | keyof typeof BRAND_SVGS
  | keyof typeof LINE_ICONS
  | (string & {});

interface IconProps {
  name: IconName;
  /** Nominal size in px. 3D icons render at 1.5x this, per the design. */
  size?: number;
  className?: string;
}

export function Icon({ name, size = 19, className }: IconProps) {
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

  // 2. Check dedicated brand vector SVGs
  const brandSvg = BRAND_SVGS[name];
  if (brandSvg) {
    const px = Math.round(size * 1.3);
    return (
      <div className={`inline-flex flex-none items-center justify-center ${className || ""}`}>
        {brandSvg(px)}
      </div>
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
