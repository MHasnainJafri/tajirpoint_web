import { notFound } from "next/navigation";
import { OG_CARDS } from "@/lib/seo/og-cards";
import { renderOgCard } from "@/lib/seo/og-image";

// Per-page share cards at /og/<id>.png (see src/lib/seo/og-cards.ts). The
// dotted path keeps them out of the locale proxy, and every card is rendered
// once at build — no function runs when Facebook or WhatsApp fetches one.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(OG_CARDS).map((id) => ({ image: `${id}.png` }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ image: string }> }) {
  const { image } = await params;
  const card = image.endsWith(".png") ? OG_CARDS[image.slice(0, -4)] : undefined;
  if (!card) notFound();
  return renderOgCard(card);
}
