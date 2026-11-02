import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Fuel, ShoppingBag, TrendingUp, Truck, Wallet } from "lucide-react";
import { FeatureDetailPage } from "@/components/marketing/features/FeatureDetailPage";
import { VAN_SALES_COPY } from "@/content/i18n/features/van-sales";
import { pickCopy } from "@/content/i18n/page-copy";
import { buildMetadata } from "@/lib/seo/metadata";

const PATH = "/features/van-sales";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { t } = pickCopy(VAN_SALES_COPY, locale);
  return buildMetadata({
    title: t.meta.title,
    description: t.meta.description,
    path: PATH,
    locale,
  });
}

/** Same order as the copy's `audiences` labels. */
const AUDIENCES = [
  { icon: Truck, href: "/business/distributors-wholesale" },
  { icon: ShoppingBag, href: "/business/grocery-kiryana" },
] as const;

/** Value colour per mock row, same order as the copy's `mock.rows`. */
const MOCK_TONES = [
  "text-[var(--color-mint-2)]",
  "text-[var(--color-ink)]",
  "text-[var(--color-amber)]",
] as const;

export default async function VanSalesFeaturePage({
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
      copy={VAN_SALES_COPY}
      icon={Truck}
      panelIcons={[Wallet, Fuel, TrendingUp]}
      audiences={AUDIENCES}
      mockTones={MOCK_TONES}
      ctaSecondaryHref="/pricing"
    />
  );
}
