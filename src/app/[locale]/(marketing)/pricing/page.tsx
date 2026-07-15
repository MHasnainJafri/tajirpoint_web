import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { PillBadge } from "@/components/design/primitives";
import { Pricing } from "@/components/marketing/landing/Pricing";
import { Faq } from "@/components/marketing/landing/Faq";
import { FinalCta } from "@/components/marketing/landing/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQS } from "@/lib/design/catalog";
import { faqSchema } from "@/lib/seo/schemas";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Pricing — One Price, Every Module",
  description:
    "Transparent POS pricing for merchants in Pakistan, UAE, and Saudi Arabia. One flat rate per branch — POS, inventory, khata, storefront, and compliance included. 14-day free trial, no card needed.",
  path: "/pricing",
});

export default function PricingPage() {
  const t = useTranslations("landing.faq");

  return (
    <>
      <JsonLd
        schema={faqSchema(
          FAQS.map((id) => ({ question: t(`items.${id}.q`), answer: t(`items.${id}.a`) }))
        )}
      />

      {/* ── Header ──────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-5 pb-10 pt-[150px] text-center md:px-10">
        <div
          className="pointer-events-none absolute left-1/2 top-[-300px] h-[640px] w-[1100px] -translate-x-1/2"
          style={{
            background: "radial-gradient(ellipse at center,rgba(0,210,122,.15),transparent 60%)",
          }}
        />

        <PillBadge>14-day free trial · No card needed</PillBadge>

        <h1 className="relative mt-6 animate-[tpFadeUp_.8s_.15s_cubic-bezier(.22,1,.36,1)_both] text-[clamp(36px,5.4vw,72px)] font-extrabold leading-[1.04] tracking-[-0.035em]">
          Pay per branch.{" "}
          <span className="text-[var(--color-mint)] [text-shadow:0_0_40px_rgba(0,210,122,.4)]">
            Nothing else.
          </span>
        </h1>

        <p className="relative mx-auto mt-[22px] max-w-[560px] animate-[tpFadeUp_.8s_.28s_cubic-bezier(.22,1,.36,1)_both] text-[18px] leading-[1.6] text-[rgba(242,247,244,.64)]">
          No per-module up-sells. No transaction fees. Every plan includes POS, inventory, khata,
          storefront, and compliance.
        </p>
      </section>

      <Pricing />
      <Faq />
      <FinalCta />
    </>
  );
}
