import type { CSSProperties, ReactNode } from "react";

/**
 * Wraps one home-page section that always starts below the fold, so the
 * browser skips its style, layout and paint until it nears the viewport
 * (`.cv-auto` in globals.css). Nothing about the section changes: same
 * markup, same position — the wrapper has no box of its own, and it only
 * holds the section's top margin, which the section had anyway.
 *
 * `size` / `sizeLg` are the section's height (margin included) on a phone and
 * at 1024px+, used only until it first renders. Rough is fine: they keep the
 * scrollbar honest, nothing is drawn at that size.
 */
export function BelowFold({
  size,
  sizeLg,
  children,
}: {
  size: number;
  sizeLg: number;
  children: ReactNode;
}) {
  return (
    <div
      className="cv-auto"
      style={{ "--cv-size": `${size}px`, "--cv-size-lg": `${sizeLg}px` } as CSSProperties}
    >
      {children}
    </div>
  );
}
