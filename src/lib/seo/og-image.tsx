import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { OG_IMAGE_SIZE, type OgCard } from "./og-cards";
import { BRAND_HOST, BRAND_NAME, brand } from "@/lib/config/brand";

// The real brand mark used in the site header (public/brand/mark/mark-on-dark.svg),
// embedded so every share card carries the actual logo.
const MARK_SVG = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="78" cy="42" r="6" fill="#00D27A"></circle>
  <circle cx="98" cy="42" r="6" fill="#00D27A"></circle>
  <path d="M158 62 L158 110" stroke="#FFFFFF" stroke-width="11" stroke-linecap="round" fill="none"></path>
  <path d="M158 62 L42 62" stroke="#FFFFFF" stroke-width="11" stroke-linecap="round" fill="none"></path>
  <path d="M42 62 Q 22 62 22 96" stroke="#FFFFFF" stroke-width="11" stroke-linecap="round" fill="none"></path>
  <path d="M30 80 Q 30 132 80 134 L130 134 Q 168 132 168 96" stroke="#FFFFFF" stroke-width="11" stroke-linecap="round" stroke-linejoin="round" fill="none"></path>
  <path d="M48 100 L150 100" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.35"></path>
  <path d="M58 116 L142 116" stroke="#FFFFFF" stroke-width="3" stroke-linecap="round" opacity="0.35"></path>
  <circle cx="62" cy="160" r="14" fill="#FFFFFF"></circle>
  <circle cx="62" cy="160" r="5" fill="#00D27A"></circle>
  <circle cx="138" cy="160" r="14" fill="#FFFFFF"></circle>
  <circle cx="138" cy="160" r="5" fill="#00D27A"></circle>
</svg>`;

/**
 * Another brand's build draws its own logo (NEXT_PUBLIC_BRAND_LOGO): a file
 * under public/ is embedded, an https URL is fetched by the renderer.
 */
function brandLogoSrc(): string {
  if (/^https:\/\//.test(brand.logoOnDark)) return brand.logoOnDark;
  const file = path.join(process.cwd(), "public", brand.logoOnDark);
  const type = brand.logoOnDark.endsWith(".svg") ? "image/svg+xml" : "image/png";
  return `data:${type};base64,${fs.readFileSync(file).toString("base64")}`;
}

const MARK_SRC = brand.ownLogo
  ? brandLogoSrc()
  : `data:image/svg+xml;base64,${Buffer.from(MARK_SVG).toString("base64")}`;

/** The card's accent and ground: ours, or the brand's colour on its ink. */
const ACCENT = brand.primary ?? "#00D27A";
const PILL_BORDER = brand.primary ? `${brand.primary}73` : "rgba(0,210,122,0.45)";
const GROUND = brand.primary
  ? `linear-gradient(135deg, ${brand.ink ?? "#111111"} 0%, #0a0a0a 55%, ${brand.ink ?? "#111111"} 100%)`
  : "linear-gradient(135deg, #06140d 0%, #0a0a0a 55%, #07170f 100%)";

/** Shorter titles get bigger type; every title stays readable as a phone thumbnail. */
function titleSize(title: string): number {
  if (title.length <= 32) return 76;
  if (title.length <= 48) return 66;
  return 56;
}

/**
 * One 1200×630 share card. Safe area: the important text sits inside the
 * middle ~1100×530 so the square crops some apps make (WhatsApp on a narrow
 * chat bubble, Instagram link stickers) keep the title.
 */
export function renderOgCard(card: OgCard): ImageResponse {
  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 76px",
        background: GROUND,
        fontFamily: "sans-serif",
      }}
    >
      {/* Brand lockup */}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={MARK_SRC} width={68} height={68} alt="" />
        <div
          style={{
            display: "flex",
            fontSize: 34,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-1px",
          }}
        >
          {`${BRAND_NAME}`}
        </div>
      </div>

      {/* Eyebrow, title, sub */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: ACCENT,
            fontWeight: 600,
            letterSpacing: "0.5px",
            marginBottom: 18,
          }}
        >
          {card.eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: titleSize(card.title),
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-2px",
            lineHeight: 1.06,
            maxWidth: 1040,
          }}
        >
          {card.title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "rgba(255,255,255,0.68)",
            marginTop: 22,
            maxWidth: 980,
            lineHeight: 1.38,
          }}
        >
          {card.sub}
        </div>
      </div>

      {/* Footer row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", fontSize: 26, color: "#ffffff", fontWeight: 600 }}>
          {`${BRAND_HOST}`}
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          {card.pills.slice(0, 4).map((pill) => (
            <div
              key={pill}
              style={{
                display: "flex",
                fontSize: 20,
                color: "rgba(255,255,255,0.9)",
                border: `1px solid ${PILL_BORDER}`,
                borderRadius: 999,
                padding: "7px 18px",
              }}
            >
              {pill}
            </div>
          ))}
        </div>
      </div>
    </div>,
    {
      ...OG_IMAGE_SIZE,
      headers: {
        // Rendered once at build; a day at the edge, a week stale-while-revalidate.
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    }
  );
}
