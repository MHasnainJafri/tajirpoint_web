"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * The site ships light-only. `forcedTheme` pins `.dark` off regardless of the
 * OS preference or a stale `theme: "dark"` left in a returning visitor's
 * localStorage. The dark token set still lives in globals.css — to bring the
 * theme back, drop `forcedTheme` and restore the nav's `<ThemeToggle />`.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
