import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Bell, BookOpen, Scale, Send, ShoppingBag, Smartphone, Truck } from "lucide-react";
import { FeatureDetailPage } from "@/components/marketing/features/FeatureDetailPage";
import { KHATA_COPY } from "@/content/i18n/features/khata";
import { pickCopy } from "@/content/i18n/page-copy";
import { buildMetadata } from "@/lib/seo/metadata";

const PATH = "/features/khata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { t } = pickCopy(KHATA_COPY, locale);
  return buildMetadata({
    title: t.meta.title,
    description: t.meta.description,
    path: PATH,
    locale,
  });
}

/** Same order as the copy's `audiences` labels. */
const AUDIENCES = [
  { icon: ShoppingBag, href: "/business/grocery-kiryana" },
  { icon: Truck, href: "/business/distributors-wholesale" },
  { icon: Smartphone, href: "/business/electronics-mobile" },
] as const;

/** Value colour per mock row, same order as the copy's `mock.rows`. */
const MOCK_TONES = [
  "text-[var(--color-amber)]",
  "text-[var(--color-ink)]",
  "text-[var(--color-mint-2)]",
] as const;

export default async function KhataFeaturePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <FeatureDetailPage
      locale={locale}
      path={PATH}
      copy={KHATA_COPY}
      icon={BookOpen}
      panelIcons={[Scale, Bell, Send]}
      audiences={AUDIENCES}
      mockTones={MOCK_TONES}
      ctaSecondaryHref="/pricing"
    />
  );
}
