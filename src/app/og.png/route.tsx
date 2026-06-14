import { ImageResponse } from "next/og";

// Served at /og.png — a dotted path, so the next-intl middleware matcher
// (which excludes `.*\..*`) skips it. Generated once at build and cacheable.
export const dynamic = "force-static";

// The real brand mark used in the site header (public/brand/mark/mark-on-dark.svg),
// embedded so the social card carries our actual logo rather than a generic glyph.
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

export function GET() {
  const markSrc = `data:image/svg+xml;base64,${Buffer.from(MARK_SVG).toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "linear-gradient(135deg, #06140d 0%, #0a0a0a 52%, #07170f 100%)",
        fontFamily: "sans-serif",
      }}
    >
      {/* Brand lockup */}
      <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={markSrc} width={76} height={76} alt="" />
        <div
          style={{
            display: "flex",
            fontSize: 36,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-1px",
          }}
        >
          Tajir Point
        </div>
      </div>

      {/* Headline */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "#00D27A",
            fontWeight: 600,
            letterSpacing: "0.5px",
            marginBottom: 22,
          }}
        >
          Point of Sale · Khata · Storefront
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 86,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-3px",
            lineHeight: 1.04,
          }}
        >
          Run your shop. Everywhere.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 31,
            color: "rgba(255,255,255,0.62)",
            marginTop: 26,
            maxWidth: 880,
            lineHeight: 1.4,
          }}
        >
          The offline-first operating system for the modern merchant — in three languages, on every
          device.
        </div>
      </div>

      {/* Footer row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            color: "#ffffff",
            fontWeight: 600,
          }}
        >
          tajirpoint.com
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          {["Pakistan", "UAE", "Saudi Arabia"].map((region) => (
            <div
              key={region}
              style={{
                display: "flex",
                fontSize: 22,
                color: "rgba(255,255,255,0.8)",
                border: "1px solid rgba(0,210,122,0.4)",
                borderRadius: 999,
                padding: "8px 20px",
              }}
            >
              {region}
            </div>
          ))}
        </div>
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
}
