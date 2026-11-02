import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PillBadge, CtaPanel } from "@/components/design/primitives";
import { JsonLd } from "@/components/seo/JsonLd";
import { AddonBrowser, type AddonCard } from "@/components/marketing/addons/AddonBrowser";
import { getAddonCatalogue } from "@/lib/marketing/addons";
import { NextStep } from "@/components/shared/NextStep";
import { uxCopy } from "@/content/ux/copy";
import { buildMetadata, localeUrl } from "@/lib/seo/metadata";

// The catalogue is read from the backend; refresh it in the background at
// most every ten minutes. Must be a literal for Next's static analysis; keep
// it equal to ADDON_REVALIDATE.
export const revalidate = 600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "extensions.meta" });
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: "/extensions",
    locale,
  });
}

export default async function ExtensionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations("extensions");
  const { addons } = await getAddonCatalogue();

  const cards: AddonCard[] = addons.map((a) => ({
    slug: a.slug,
    name: a.name,
    summary: a.summary,
    iconUrl: a.iconUrl,
    status: a.status,
    price: a.price,
    groupId: a.group.id,
    groupLabel: a.group.label,
  }));

  return (
    <>
      <JsonLd
        schema={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Add-ons",
          itemListElement: addons.map((a, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: a.name,
            url: localeUrl(`/extensions/${a.slug}`, locale),
          })),
        }}
      />

      {/* ── Header ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 pb-10 pt-[clamp(48px,9vw,120px)] text-center md:px-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-300px] h-[640px] w-[min(1100px,200vw)] max-w-none -translate-x-1/2"
          style={{
            background: "radial-gradient(ellipse at center,rgba(0,210,122,.15),transparent 60%)",
          }}
        />

        <PillBadge>{t("badge", { count: addons.length })}</PillBadge>

        <h1 className="relative mt-6 animate-[tpFadeUp_.8s_.15s_cubic-bezier(.22,1,.36,1)_both] text-[clamp(34px,5.4vw,72px)] font-extrabold leading-[1.04] tracking-[-0.035em]">
          {t("headline")} <span className="text-[var(--color-mint-2)]">{t("headlineAccent")}</span>
        </h1>

        <p className="relative mx-auto mt-[22px] max-w-[580px] animate-[tpFadeUp_.8s_.28s_cubic-bezier(.22,1,.36,1)_both] text-[17px] leading-[1.6] text-[var(--color-muted)]">
          {t("sub")}
        </p>

        <NextStep locale={locale} location="extensions_header" className="mt-7" />

        <ul
          lang="en"
          dir="ltr"
          className="relative mx-auto mt-6 flex max-w-[720px] flex-wrap justify-center gap-x-5 gap-y-2 text-[13px] text-[var(--color-body)]"
        >
          <li>
            <b className="text-[var(--color-ink)]">Available</b>: switch it on yourself
          </li>
          <li>
            <b className="text-[var(--color-ink)]">Contact us</b>: our team sets it up with you
          </li>
          <li>
            <b className="text-[var(--color-ink)]">Coming soon</b>: ask and we will tell you when
          </li>
        </ul>
      </section>

      <AddonBrowser cards={cards} />

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="px-4 pb-[clamp(64px,9vw,110px)] pt-5 md:px-10">
        <CtaPanel>
          <h2 className="relative text-[clamp(28px,3.6vw,46px)] font-extrabold tracking-[-0.03em]">
            {t("cta.headline")}
          </h2>
          <p className="relative mx-auto mt-4 max-w-[460px] text-[16px] leading-[1.6] text-[var(--color-on-dark-2)]">
            {t("cta.body")}
          </p>
          <div className="relative mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/pricing"
              className="inline-flex items-center gap-[10px] whitespace-nowrap rounded-full bg-[var(--color-mint)] px-8 py-[15px] text-[16px] font-bold text-[#0A0A0A] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,210,122,.45)]"
            >
              {t("cta.primary")} <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/get-a-call"
              className="inline-flex min-h-[44px] items-center whitespace-nowrap rounded-full border border-white/[0.22] px-8 py-[15px] text-[16px] font-semibold text-white transition-colors duration-200 hover:bg-white/10"
            >
              {uxCopy(locale).getACall}
            </Link>
          </div>
        </CtaPanel>
      </section>
    </>
  );
}
