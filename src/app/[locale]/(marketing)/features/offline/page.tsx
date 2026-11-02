import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  HardDrive,
  RefreshCw,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Utensils,
  WifiOff,
} from "lucide-react";
import { FeatureDetailPage } from "@/components/marketing/features/FeatureDetailPage";
import { OFFLINE_COPY } from "@/content/i18n/features/offline";
import { pickCopy } from "@/content/i18n/page-copy";
import { buildMetadata } from "@/lib/seo/metadata";

const PATH = "/features/offline";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { t } = pickCopy(OFFLINE_COPY, locale);
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
  { icon: Utensils, href: "/business/restaurants" },
  { icon: Truck, href: "/business/distributors-wholesale" },
] as const;

/** Value colour per mock row, same order as the copy's `mock.rows`. */
const MOCK_TONES = [
  "text-[var(--color-amber)]",
  "text-[var(--color-ink)]",
  "text-[var(--color-mint-2)]",
] as const;

export default async function OfflineFeaturePage({
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
      copy={OFFLINE_COPY}
      icon={WifiOff}
      panelIcons={[HardDrive, RefreshCw, ShieldCheck]}
      audiences={AUDIENCES}
      mockTones={MOCK_TONES}
      ctaSecondaryHref="/pricing"
    />
  );
}
