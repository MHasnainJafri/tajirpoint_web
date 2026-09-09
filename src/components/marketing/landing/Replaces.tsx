import { useTranslations } from "next-intl";
import { Stroke } from "./Stroke";

/** The five things the product stands in for, struck through. */
const REPLACED = ["till", "notebook", "excel", "ledger", "whatsapp"] as const;

/**
 * A one-line argument between the hero and the feature blocks: five crossed-out
 * tools resolving into one wordmark. Deliberately quiet — no card, no border,
 * just centred type on the white canvas.
 */
export function Replaces() {
  const t = useTranslations("landing.replaces");

  return (
    <section data-reveal className="mt-[clamp(56px,7vw,84px)] text-center">
      <div className="eyebrow">{t("eyebrow")}</div>

      <div className="mt-[18px] flex flex-wrap items-center justify-center gap-[10px]">
        {REPLACED.map((id) => (
          <span
            key={id}
            className="rounded-full border border-dashed border-[#C9CDD6] px-4 py-[9px] text-[13px] text-[var(--color-muted)] line-through decoration-[#0A0A0A]"
          >
            {t(`items.${id}`)}
          </span>
        ))}

        <span className="text-[var(--color-mint-2)]" aria-hidden="true">
          <Stroke name="arrowRight" size={22} width={2} />
        </span>

        <span className="rounded-full bg-[#0A0A0A] px-[18px] py-[10px] text-[13.5px] font-bold tracking-[-0.02em] text-white">
          tajir point<span className="text-[var(--color-mint)]">.</span>
        </span>
      </div>

      <p className="mx-auto mt-4 max-w-[62ch] text-[14.5px] leading-[1.65] text-[var(--color-body)]">
        {t("body")}
      </p>
    </section>
  );
}
