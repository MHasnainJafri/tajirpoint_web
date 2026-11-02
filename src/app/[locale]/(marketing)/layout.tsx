import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/marketing/Nav";
import { Footer } from "@/components/marketing/Footer";
import { Reveal } from "@/components/design/Reveal";
import { BUSINESSES, businessLabel } from "@/lib/marketing/businesses";

export default async function MarketingLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Footer is a server component reading translations. Without this the whole
  // (marketing) group falls back to dynamic rendering on every request.
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      {/* Only what the menus show: keeps the business catalogue out of the JS. */}
      <Nav
        businesses={BUSINESSES.map((b) => ({
          slug: b.slug,
          icon: b.icon,
          ...businessLabel(b, locale),
        }))}
      />
      <main id="main-content">{children}</main>
      <Footer />
      <Reveal />
    </>
  );
}
