import { notFound } from "next/navigation";
import { OG_CARDS, isOgCardShown } from "@/lib/seo/og-cards";
import { addonCardIds, addonOgCard } from "@/lib/seo/og-addon-cards";
import { renderOgCard } from "@/lib/seo/og-image";

// Per-page share cards at /og/<id>.png (see src/lib/seo/og-cards.ts and, for
// the add-on pages, og-addon-cards.ts). The dotted path keeps them out of the
// locale proxy, and every card is rendered at build — no function runs when
// Facebook or WhatsApp fetches one. Add-on cards read the add-on catalogue
// (10-minute revalidation), so their status line follows the backend.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return [...Object.keys(OG_CARDS), ...addonCardIds()]
    .filter(isOgCardShown)
    .map((id) => ({ image: `${id}.png` }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ image: string }> }) {
  const { image } = await params;
  if (!image.endsWith(".png")) notFound();
  const id = image.slice(0, -4);
  if (!isOgCardShown(id)) notFound();
  const card = OG_CARDS[id] ?? (await addonOgCard(id));
  if (!card) notFound();
  return renderOgCard(card);
}
