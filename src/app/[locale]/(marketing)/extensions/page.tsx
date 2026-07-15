import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PillBadge, CtaPanel } from "@/components/design/primitives";
import { ExtensionGrid } from "@/components/marketing/ExtensionGrid";
import { EXTENSION_COUNT } from "@/lib/design/catalog";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("extensions.meta");
  return buildMetadata({
    title: t("title"),
    description: t("description"),
    path: "/extensions",
  });
}

export default function ExtensionsPage() {
  const t = useTranslations("extensions");

  return (
    <>
      {/* ── Header ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-5 pb-15 pt-[150px] text-center md:px-10">
        <div
          className="pointer-events-none absolute left-1/2 top-[-300px] h-[640px] w-[1100px] -translate-x-1/2"
          style={{
            background: "radial-gradient(ellipse at center,rgba(0,210,122,.15),transparent 60%)",
          }}
        />

        <PillBadge>{t("badge", { count: EXTENSION_COUNT })}</PillBadge>

        <h1 className="relative mt-6 animate-[tpFadeUp_.8s_.15s_cubic-bezier(.22,1,.36,1)_both] text-[clamp(36px,5.4vw,72px)] font-extrabold leading-[1.04] tracking-[-0.035em]">
          {t("headline")}{" "}
          <span className="text-[var(--color-mint)] [text-shadow:0_0_40px_rgba(0,210,122,.4)]">
            {t("headlineAccent")}
          </span>
        </h1>

        <p className="relative mx-auto mt-[22px] max-w-[580px] animate-[tpFadeUp_.8s_.28s_cubic-bezier(.22,1,.36,1)_both] text-[18px] leading-[1.6] text-[var(--color-muted)]">
          {t("sub")}
        </p>
      </section>

      <ExtensionGrid />

      {/* ── CTA ─────────────────────────────────────────────────────── */}
      <section className="px-5 pb-[110px] pt-5 md:px-10">
        <CtaPanel>
          <h2 className="relative text-[clamp(28px,3.6vw,46px)] font-extrabold tracking-[-0.03em]">
            {t("cta.headline")}
          </h2>
          <p className="relative mx-auto mt-4 max-w-[460px] text-[16px] leading-[1.6] text-[var(--color-muted)]">
            {t("cta.body")}
          </p>
          <div className="relative mt-8">
            <Link
              href="/#pricing"
              className="inline-flex items-center gap-[10px] whitespace-nowrap rounded-full bg-[var(--color-mint)] px-8 py-[15px] text-[16px] font-bold text-[var(--color-mint-ink)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,210,122,.45)]"
            >
              {t("cta.primary")} <span>→</span>
            </Link>
          </div>
        </CtaPanel>
      </section>
    </>
  );
}
