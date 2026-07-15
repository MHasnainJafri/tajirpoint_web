"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

/**
 * Light/dark switch. Renders an inert placeholder until mounted so the server
 * and first client render agree (the resolved theme isn't known during SSR).
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // Flip after the first paint (deferred out of the effect body) so the server
  // and hydrating client both render the inert placeholder — no theme mismatch.
  useEffect(() => {
    const raf = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const isDark = resolvedTheme === "dark";
  const base =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-line-2)] bg-[var(--surface-2)] text-[var(--color-ink-3)] transition-colors hover:border-[var(--color-mint-line)] hover:text-[var(--color-ink-2)]";

  if (!mounted) {
    return <span aria-hidden className={`${base} ${className}`} />;
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={`${base} cursor-pointer ${className}`}
    >
      {isDark ? <Sun size={17} /> : <Moon size={17} />}
    </button>
  );
}
