import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import {
  Banknote,
  Calculator,
  CalendarCheck,
  Download,
  FileCheck,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { FeatureDetailPage } from "@/components/marketing/features/FeatureDetailPage";
import { ACCOUNTING_COPY } from "@/content/i18n/features/accounting";
import { pickCopy } from "@/content/i18n/page-copy";
import { buildMetadata } from "@/lib/seo/metadata";

const PATH = "/features/accounting";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { t } = pickCopy(ACCOUNTING_COPY, locale);
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
  { icon: CalendarCheck, href: "/business/salons-services" },
] as const;

/** Value colour per mock row, same order as the copy's `mock.rows`. */
const MOCK_TONES = [
  "text-[var(--color-mint-2)]",
  "text-[var(--color-ink)]",
  "text-[var(--color-mint-2)]",
] as const;

export default async function AccountingFeaturePage({
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
      copy={ACCOUNTING_COPY}
      icon={Calculator}
      panelIcons={[FileCheck, Banknote, Download]}
      audiences={AUDIENCES}
      mockTones={MOCK_TONES}
      ctaSecondaryHref="/extensions"
    />
  );
}
