import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  Calculator,
  Printer,
  ReceiptText,
  Shirt,
  ShoppingBag,
  SplitSquareHorizontal,
  UtensilsCrossed,
} from "lucide-react";
import { FeatureDetailPage } from "@/components/marketing/features/FeatureDetailPage";
import { BILLING_COPY } from "@/content/i18n/features/billing";
import { pickCopy } from "@/content/i18n/page-copy";
import { buildMetadata } from "@/lib/seo/metadata";
import { assertPageShown } from "@/lib/config/pages";

const PATH = "/features/billing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { t } = pickCopy(BILLING_COPY, locale);
  return buildMetadata({
    title: t.meta.title,
    description: t.meta.description,
    path: PATH,
    locale,
  });
}

/** Same order as the copy's `audiences` labels. */
const AUDIENCES = [
  { icon: UtensilsCrossed, href: "/business/restaurants" },
  { icon: Shirt, href: "/business/retail-fashion" },
  { icon: ShoppingBag, href: "/business/grocery-kiryana" },
] as const;

/** Value colour per mock row, same order as the copy's `mock.rows`. */
const MOCK_TONES = [
  "text-[var(--color-ink)]",
  "text-[var(--color-ink)]",
  "text-[var(--color-mint-2)]",
] as const;

export default async function BillingFeaturePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  // Left out of builds for another market or business type (src/lib/config/pages.ts).
  assertPageShown("/features/billing");

  return (
    <FeatureDetailPage
      locale={locale}
      path={PATH}
      copy={BILLING_COPY}
      icon={ReceiptText}
      panelIcons={[Printer, Calculator, SplitSquareHorizontal]}
      audiences={AUDIENCES}
      mockTones={MOCK_TONES}
      ctaSecondaryHref="/pricing"
    />
  );
}
