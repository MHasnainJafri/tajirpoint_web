import { OG_CARDS } from "@/lib/seo/og-cards";
import { renderOgCard } from "@/lib/seo/og-image";

// Served at /og.png — the default share card for pages without one of their
// own (legal pages, docs reference pages). A dotted path, so the next-intl
// proxy matcher (which excludes `.*\..*`) skips it. Generated once at build.
export const dynamic = "force-static";

export function GET() {
  return renderOgCard(OG_CARDS.home!);
}
