import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Cross, Percent, QrCode, ReceiptText, ShoppingBag, Truck, Zap } from "lucide-react";
import { FeatureDetailPage } from "@/components/marketing/features/FeatureDetailPage";
import { E_INVOICING_COPY } from "@/content/i18n/features/e-invoicing";
import { pickCopy } from "@/content/i18n/page-copy";
import { buildMetadata } from "@/lib/seo/metadata";

const PATH = "/features/e-invoicing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { t } = pickCopy(E_INVOICING_COPY, locale);
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
  { icon: Cross, href: "/business/pharmacy" },
] as const;

/** Value colour per mock row, same order as the copy's `mock.rows`. */
const MOCK_TONES = [
  "text-[var(--color-mint-2)]",
  "text-[var(--color-ink)]",
  "text-[var(--color-mint-2)]",
] as const;

export default async function EInvoicingFeaturePage({
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
      copy={E_INVOICING_COPY}
      icon={ReceiptText}
      panelIcons={[Zap, QrCode, Percent]}
      audiences={AUDIENCES}
      mockTones={MOCK_TONES}
      ctaSecondaryHref="/pricing"
    />
  );
}
