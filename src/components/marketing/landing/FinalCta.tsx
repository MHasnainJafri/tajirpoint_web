import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { ONBOARDING } from "@/lib/design/landing";

/**
 * The close-out panel, and the only section wider than the 1240px page grid —
 * it runs to 1400px so the black block reads as a full-bleed band rather than
 * one more card in the column.
 */
export function FinalCta() {
  const t = useTranslations("landing.cta");

  return (
    <section
      data-reveal
      className="mx-auto mt-[clamp(50px,7vw,90px)] max-w-[1400px] px-[clamp(10px,2vw,20px)]"
    >
      <div className="on-dark relative grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] items-center gap-[clamp(24px,4vw,56px)] overflow-hidden rounded-[28px] bg-[#0A0A0A] px-[clamp(18px,4vw,60px)] py-[clamp(36px,6vw,80px)] text-white">
        <div className="pointer-events-none absolute -bottom-[200px] -left-[140px] h-[520px] w-[520px] rounded-full border border-[rgba(0,210,122,.16)]" />
        <div className="pointer-events-none absolute -right-[160px] -top-[160px] h-[460px] w-[460px] rounded-full border border-white/[0.07]" />

        <div className="relative">
          <h2 className="max-w-[16ch] text-[clamp(28px,4vw,48px)] font-extrabold leading-[1.1] tracking-[-0.04em] text-balance">
            {t("headline")}
          </h2>
          <p className="mt-4 max-w-[48ch] text-[15px] leading-[1.65] text-[#B5B9C2]">{t("sub")}</p>
          <div className="mt-[26px] flex flex-wrap gap-[10px]">
            <Link
              href="/pricing"
              className="whitespace-nowrap rounded-full bg-[var(--color-mint)] px-6 py-3 text-[14px] font-bold text-[#0A0A0A] transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-[2px] hover:shadow-[0_14px_30px_rgba(0,210,122,.35)]"
            >
              {t("ctaPrimary")}
            </Link>
            <Link
              href="/book-demo"
              className="whitespace-nowrap rounded-full border border-white/[0.22] px-6 py-3 text-[14px] font-semibold text-white transition-colors duration-[250ms] hover:bg-white/10"
            >
              {t("ctaSecondary")}
            </Link>
          </div>
        </div>

        <div className="relative flex flex-col gap-2">
          {ONBOARDING.map((o) => (
            <div
              key={o.id}
              data-reveal
              className="flex items-center gap-[14px] rounded-[14px] border border-white/[0.08] bg-white/[0.06] px-4 py-[14px]"
            >
              <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-[var(--color-mint)] font-[family-name:var(--font-mono)] text-[12px] font-semibold text-[#0A0A0A]">
                {o.n}
              </span>
              <div className="min-w-0">
                <div className="text-[14px] font-semibold">{t(`steps.${o.id}.title`)}</div>
                <div className="mt-px text-[12.5px] text-[#B5B9C2]">{t(`steps.${o.id}.sub`)}</div>
              </div>
              <span className="ml-auto whitespace-nowrap font-[family-name:var(--font-mono)] text-[11.5px] text-[#8A8F98]">
                {t(`steps.${o.id}.time`)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
