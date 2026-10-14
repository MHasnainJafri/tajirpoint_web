/**
 * Brand-free product illustrations for the hero till's electronics catalogues
 * (laptop shop, mobile shop). Food and grocery tiles use real CC0 photographs
 * from `/images/hero-pos/`; electronics photographs without visible
 * manufacturer logos are rare, so these are drawn instead.
 */
export type ArtId =
  | "ultrabook"
  | "gaming"
  | "mouse"
  | "keyboard"
  | "monitor"
  | "hub"
  | "phone"
  | "flagship"
  | "earbuds"
  | "charger"
  | "case"
  | "watch";

const ART: Record<ArtId, React.ReactNode> = {
  ultrabook: (
    <>
      <rect x="22" y="22" width="56" height="38" rx="3" fill="#2B303B" />
      <rect x="25" y="25" width="50" height="32" rx="1.5" fill="url(#ar-screen)" />
      <path d="M12 64h76l-4 7a3 3 0 0 1-2.6 1.5H18.6A3 3 0 0 1 16 71l-4-7z" fill="#C9CED8" />
      <rect x="42" y="64" width="16" height="2" rx="1" fill="#A5ABB8" />
    </>
  ),
  gaming: (
    <>
      <rect x="20" y="20" width="60" height="40" rx="3" fill="#14171C" />
      <rect x="23" y="23" width="54" height="34" rx="1.5" fill="url(#ar-game)" />
      <path d="M10 63h80l-3 8a3 3 0 0 1-2.8 2H15.8a3 3 0 0 1-2.8-2l-3-8z" fill="#2A2E36" />
      <rect x="20" y="66" width="60" height="3" rx="1.5" fill="#00D27A" opacity=".85" />
    </>
  ),
  mouse: (
    <>
      <path
        d="M50 14c-13 0-20 10-20 24v22c0 14 8 26 20 26s20-12 20-26V38c0-14-7-24-20-24z"
        fill="#E9ECF1"
        stroke="#B9BFCB"
        strokeWidth="1.2"
      />
      <path d="M50 14v30M30 44h40" stroke="#B9BFCB" strokeWidth="1.2" fill="none" />
      <rect x="47" y="22" width="6" height="13" rx="3" fill="#2B303B" />
    </>
  ),
  keyboard: (
    <>
      <rect x="8" y="30" width="84" height="42" rx="5" fill="#2B303B" />
      {[0, 1, 2, 3].map((r) =>
        Array.from({ length: r === 3 ? 1 : 10 }).map((_, c) => (
          <rect
            key={`${r}-${c}`}
            x={r === 3 ? 26 : 12 + c * 7.6 + (r % 2) * 2}
            y={34 + r * 9}
            width={r === 3 ? 48 : 6.2}
            height="6.6"
            rx="1.4"
            fill="#EEF0F4"
          />
        ))
      )}
    </>
  ),
  monitor: (
    <>
      <rect x="12" y="18" width="76" height="48" rx="4" fill="#20242C" />
      <rect x="15" y="21" width="70" height="42" rx="2" fill="url(#ar-screen)" />
      <path d="M44 66h12l3 14H41l3-14z" fill="#B9BFCB" />
      <rect x="32" y="80" width="36" height="4" rx="2" fill="#9EA5B3" />
    </>
  ),
  hub: (
    <>
      <rect x="18" y="40" width="64" height="24" rx="8" fill="#BFC5D0" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={26 + i * 13.5} y="48" width="9" height="8" rx="2.5" fill="#2B303B" />
      ))}
      <path d="M50 40V26c0-5 4-8 9-8h12" stroke="#2B303B" strokeWidth="3.2" fill="none" strokeLinecap="round" />
    </>
  ),
  phone: (
    <>
      <rect x="31" y="10" width="38" height="80" rx="8" fill="#1B1F27" />
      <rect x="34" y="14" width="32" height="72" rx="5" fill="url(#ar-phone)" />
      <rect x="44" y="16.5" width="12" height="3.2" rx="1.6" fill="#1B1F27" />
    </>
  ),
  flagship: (
    <>
      <rect x="31" y="10" width="38" height="80" rx="9" fill="#C5CAD6" />
      <rect x="31" y="10" width="38" height="80" rx="9" fill="url(#ar-gloss)" />
      <rect x="36" y="15" width="19" height="22" rx="6" fill="#1B1F27" />
      <circle cx="42" cy="21" r="3.3" fill="#3B4254" />
      <circle cx="49.5" cy="21" r="3.3" fill="#3B4254" />
      <circle cx="42" cy="30" r="3.3" fill="#3B4254" />
      <circle cx="58" cy="19" r="1.6" fill="#F5D76E" />
    </>
  ),
  earbuds: (
    <>
      <rect x="22" y="44" width="56" height="34" rx="14" fill="#EEF0F4" stroke="#CDD2DC" />
      <path d="M22 58h56" stroke="#CDD2DC" />
      <circle cx="50" cy="66" r="2.2" fill="#00D27A" />
      <g fill="#2B303B">
        <path d="M34 20c6-4 12 0 12 7 0 4-2 7-4 9l-1 9h-4l-1-9c-4-2-6-6-6-9 0-3 1-5 4-7z" />
        <path d="M66 20c-6-4-12 0-12 7 0 4 2 7 4 9l1 9h4l1-9c4-2 6-6 6-9 0-3-1-5-4-7z" />
      </g>
    </>
  ),
  charger: (
    <>
      <rect x="30" y="18" width="40" height="44" rx="8" fill="#F4F5F8" stroke="#D3D8E1" />
      <rect x="40" y="10" width="4" height="9" rx="1" fill="#9EA5B3" />
      <rect x="56" y="10" width="4" height="9" rx="1" fill="#9EA5B3" />
      <rect x="44" y="30" width="12" height="9" rx="3" fill="#2B303B" />
      <path d="M50 62v8c0 8 8 10 16 10" stroke="#EEF0F4" strokeWidth="4" fill="none" strokeLinecap="round" />
    </>
  ),
  case: (
    <>
      <rect x="30" y="10" width="40" height="80" rx="10" fill="#00A862" />
      <rect x="30" y="10" width="40" height="80" rx="10" fill="url(#ar-gloss)" />
      <rect x="35" y="15" width="19" height="21" rx="6" fill="#0A0A0A" opacity=".85" />
      <circle cx="41" cy="21" r="3.3" fill="#3B4254" />
      <circle cx="48.5" cy="21" r="3.3" fill="#3B4254" />
      <circle cx="41" cy="29" r="3.3" fill="#3B4254" />
    </>
  ),
  watch: (
    <>
      <rect x="38" y="6" width="24" height="26" rx="5" fill="#2B303B" />
      <rect x="38" y="68" width="24" height="26" rx="5" fill="#2B303B" />
      <rect x="26" y="26" width="48" height="48" rx="13" fill="#14171C" />
      <rect x="29.5" y="29.5" width="41" height="41" rx="10" fill="url(#ar-phone)" />
      <path d="M50 38v12l8 5" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" />
      <rect x="74" y="44" width="3.5" height="9" rx="1.5" fill="#9EA5B3" />
    </>
  ),
};

/**
 * Gradients shared by every illustration. Rendered once (never inside a
 * `display:none` ancestor, which would stop the `url(#…)` fills resolving).
 */
export function ProductArtDefs() {
  return (
    <svg width="0" height="0" className="pointer-events-none absolute" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="ar-screen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7AD9B0" />
          <stop offset="1" stopColor="#2D7FF9" />
        </linearGradient>
        <linearGradient id="ar-game" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#00D27A" />
          <stop offset=".55" stopColor="#6D4AFF" />
          <stop offset="1" stopColor="#14171C" />
        </linearGradient>
        <linearGradient id="ar-phone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFB86B" />
          <stop offset="1" stopColor="#FF5C8A" />
        </linearGradient>
        <linearGradient id="ar-gloss" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".35" />
          <stop offset=".5" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function ProductArt({ id, className }: { id: ArtId; className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      {ART[id]}
    </svg>
  );
}
