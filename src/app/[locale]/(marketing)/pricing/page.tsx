import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { Pricing } from "@/components/marketing/landing/Pricing";
import { Faq } from "@/components/marketing/landing/Faq";
import { FinalCta } from "@/components/marketing/landing/FinalCta";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQ_TABS, TRIAL_MONTHS } from "@/lib/design/landing";
import { faqSchema } from "@/lib/seo/schemas";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Pricing — Free for your first 3 months",
  description:
    "Every module, every industry pack and every device, free for three months. No card, no per-module upsells, no transaction fees. Talk to us about anything bigger.",
  path: "/pricing",
});

export default function PricingPage() {
  const t = useTranslations("landing.pricing");
  const tFaq = useTranslations("landing.faq");

  // Flattened from the grouped FAQ so the structured data always matches what
  // the page actually renders — it drifted once already when the shape changed.
  const questions = FAQ_TABS.flatMap((tab) =>
    Array.from({ length: tab.count }, (_, i) => ({
      question: tFaq(`groups.${tab.id}.items.${i}.q`),
      answer: tFaq(`groups.${tab.id}.items.${i}.a`),
    }))
  );

  return (
    <>
      <JsonLd schema={faqSchema(questions)} />

      <div
        className="mx-auto max-w-[1240px] px-[clamp(14px,3vw,24px)] pt-4"
        style={{ overflowX: "clip" }}
      >
        <section className="pt-[clamp(40px,7vw,80px)] text-center">
          <div className="eyebrow justify-center">{t("eyebrow")}</div>
          <h1 className="mx-auto mt-4 max-w-[18ch] animate-[tpRise_.7s_cubic-bezier(.22,.9,.3,1)_both] text-[clamp(34px,5vw,64px)] font-extrabold leading-[1.05] tracking-[-0.04em] text-balance">
            {t("headline", { months: TRIAL_MONTHS })}
          </h1>
          <p className="mx-auto mt-5 max-w-[58ch] animate-[tpRise_.7s_.12s_cubic-bezier(.22,.9,.3,1)_both] text-[15.5px] leading-[1.65] text-[var(--color-body)]">
            {t("sub", { months: TRIAL_MONTHS })}
          </p>
        </section>

        <Pricing />
        <Faq />
      </div>

      <FinalCta />
    </>
  );
}
