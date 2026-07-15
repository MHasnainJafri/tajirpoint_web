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
  package: "package",
  mail: "parcel",
  key: "key",
  bike: "scooter",
  ticket: "ticket",
  clock: "alarmpct",
  bot: "bot",
  chat: "chat",
  printer: "pos",
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

export type IconName = keyof typeof IMG3D | keyof typeof LINE_ICONS | (string & {});

interface IconProps {
  name: IconName;
  /** Nominal size in px. 3D icons render at 1.5x this, per the design. */
  size?: number;
  className?: string;
}

export function Icon({ name, size = 19, className }: IconProps) {
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
        style={{ objectFit: "contain", display: "block" }}
      />
    );
  }

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
