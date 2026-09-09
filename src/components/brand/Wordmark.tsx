/**
 * The header/footer lockup, drawn inline.
 *
 * The design sets the wordmark in live text next to the mark — "tajir" heavy,
 * " point" light and dimmed, the full stop in mint — so it inherits the page's
 * font and stays crisp at any size. `public/brand/lockup/*` remains the asset
 * for anywhere the mark has to travel as a file (OG images, email, print).
 */
export function Wordmark({ size = 32, text = 21 }: { size?: number; text?: number }) {
  return (
    <>
      <svg
        viewBox="0 0 200 200"
        aria-hidden="true"
        style={{ width: size, height: size, flex: "none" }}
      >
        <circle cx="78" cy="42" r="6" fill="#00D27A" />
        <circle cx="98" cy="42" r="6" fill="#00D27A" />
        <path
          d="M158 62L158 110M158 62L42 62M42 62Q22 62 22 96"
          stroke="currentColor"
          strokeWidth="11"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M30 80Q30 132 80 134L130 134Q168 132 168 96"
          stroke="currentColor"
          strokeWidth="11"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M48 100L150 100M58 116L142 116"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.35"
        />
        <circle cx="62" cy="160" r="14" fill="currentColor" />
        <circle cx="62" cy="160" r="5" fill="#00D27A" />
        <circle cx="138" cy="160" r="14" fill="currentColor" />
        <circle cx="138" cy="160" r="5" fill="#00D27A" />
      </svg>
      <span
        className="whitespace-nowrap leading-none tracking-[-0.04em]"
        style={{ fontSize: text }}
      >
        <span className="font-extrabold">tajir</span>
        <span className="font-medium opacity-65"> point</span>
        <span className="font-extrabold text-[var(--color-mint)]">.</span>
      </span>
    </>
  );
}
