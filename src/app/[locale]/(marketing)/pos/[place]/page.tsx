import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { LocationView } from "@/components/marketing/locations/LocationView";
import { LOCATION_SLUGS, getLocation, locationPath } from "@/content/locations";
import { getAddonCatalogue } from "@/lib/marketing/addons";
import { buildMetadata } from "@/lib/seo/metadata";
import { assertPageShown, isPageShown } from "@/lib/config/pages";

/** Only the listed places exist; anything else is a 404, not a render. */
export const dynamicParams = false;

// Add-on statuses on the page come from the backend catalogue; refresh with it
// (same 10 minutes as ADDON_REVALIDATE — segment config must be a literal).
export const revalidate = 600;

export function generateStaticParams() {
  return LOCATION_SLUGS.filter((place) => isPageShown(`/pos/${place}`)).map((place) => ({ place }));
}

type Params = Promise<{ locale: string; place: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { locale, place } = await params;
  const page = getLocation(place);
  if (!page) return {};
  return buildMetadata({
    title: page.seo.title,
    description: page.seo.description,
    path: locationPath(page.slug),
    locale,
    keywords: page.seo.keywords,
  });
}

export default async function LocationPageRoute({ params }: { params: Params }) {
  const { locale, place } = await params;
  setRequestLocale(locale);
  // Left out of builds for another market or business type (src/lib/config/pages.ts).
  assertPageShown(`/pos/${place}`);
  const page = getLocation(place);
  if (!page) notFound();

  const { addons } = await getAddonCatalogue();
  const bySlug = new Map(addons.map((a) => [a.slug, a]));

  return <LocationView page={page} locale={locale} addons={bySlug} />;
}
