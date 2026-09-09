import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "ur", "ar"],
  defaultLocale: "en",

  // `as-needed`: English stays on the bare path (`/pricing`), Urdu and Arabic
  // get real, crawlable URLs (`/ur/pricing`, `/ar/pricing`).
  //
  // This replaces `localePrefix: "never"`, which was broken in two directions.
  // For users: every locale shared one URL, so the language switcher had no
  // route to navigate to — next-intl set a NEXT_LOCALE cookie and pushed to
  // `/ur`, which next.config.ts immediately 308'd back to `/`, and because
  // `lang`/`dir` live on <html> in the root layout a same-URL navigation never
  // re-rendered them. Clicking "اردو" changed nothing on screen.
  // For Google: one URL per three languages means hreflang is impossible and
  // only the default locale is ever indexed — Googlebot crawls cookieless.
  localePrefix: "as-needed",

  // The URL decides the language — nothing else.
  //
  // With detection on, a stored NEXT_LOCALE cookie (or an Accept-Language
  // header) makes the middleware 307 the canonical English URL to a prefixed
  // one: `/pricing` → `/ur/pricing`. That is the exact shape that produced the
  // 18 "Page with redirect" rows in Search Console, it fires on URLs we
  // actively submit in the sitemap, and it makes shared links resolve
  // differently for different people.
  //
  // Off, every URL is authoritative and self-consistent: /pricing is always
  // English, /ur/pricing is always Urdu. The language switcher still persists
  // the choice — it navigates to a real URL the visitor can bookmark and share.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];

/** RTL locales — drives `dir` on <html> and the Arabic font subset. */
export const RTL_LOCALES: readonly Locale[] = ["ur", "ar"];

export function isRtl(locale: string): boolean {
  return (RTL_LOCALES as readonly string[]).includes(locale);
}
