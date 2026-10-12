/**
 * Shared field styles for the marketing forms (book a demo, contact). Light
 * theme: white fields, ink text, a mint focus ring. Error red is #B42318
 * (6.3:1 on white) — the brand berry is too light to read as text.
 */
export const fieldBase =
  "w-full rounded-[12px] border bg-white text-[15px] text-[var(--color-ink)] placeholder:text-[var(--color-muted-2)] transition-[border-color,box-shadow] duration-200 focus:border-[var(--color-mint-2)] focus:outline-none focus:ring-2 focus:ring-[rgba(0,210,122,.25)]";

export const inputCls = (invalid?: boolean) =>
  `${fieldBase} h-[48px] px-4 ${invalid ? "border-[#B42318]" : "border-[var(--color-line-3)] hover:border-[var(--color-muted-2)]"}`;

export const textareaCls = (invalid?: boolean) =>
  `${fieldBase} resize-y px-4 py-3 ${invalid ? "border-[#B42318]" : "border-[var(--color-line-3)] hover:border-[var(--color-muted-2)]"}`;

export const labelCls = "text-[14px] font-semibold text-[var(--color-ink)]";
export const hintCls = "text-[12.5px] leading-[1.5] text-[var(--color-muted)]";
export const errorCls = "text-[12.5px] font-medium text-[#B42318]";

/** Visually hidden, still read by screen readers. */
export const srOnly = "sr-only";

/**
 * Honeypot wrapper — never focusable, never announced. Clipped in place, not
 * pushed to left:-9999px, which would add sideways scroll on RTL pages.
 */
export const honeypotStyle = {
  position: "absolute",
  width: 1,
  height: 1,
  overflow: "hidden",
  clipPath: "inset(50%)",
  whiteSpace: "nowrap",
  opacity: 0,
} as const;
