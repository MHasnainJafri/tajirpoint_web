"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Renders the coded POS mock at its design width and scales it to fit the
 * device frame.
 *
 * The mock sizes itself with viewport breakpoints (`sm:text-[10px]` and so
 * on). That was fine when it spanned the full hero, but inside the new
 * two-column hero its container is ~540px while the viewport is still
 * 1440px — so it picked the large type and overflowed its own aspect box,
 * clipping 40% of the interface. Scaling a fixed-width render keeps every
 * proportion exactly as designed at any container size.
 */

const DESIGN_WIDTH = 1120;

export function ScaledMock({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  // Roughly the desktop hero's own ratio, so the server-rendered HTML (and
  // the no-JS case) already lands close to correct.
  const [scale, setScale] = useState(0.48);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry) setScale(entry.contentRect.width / DESIGN_WIDTH);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <div
        className="origin-top-left"
        style={{ width: DESIGN_WIDTH, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}
