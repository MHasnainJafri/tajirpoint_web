import { useTranslations } from "next-intl";
import { STEPS } from "@/lib/design/catalog";

export function HowItWorks() {
  const t = useTranslations("landing.how");

  return (
    <section className="mx-auto max-w-[1200px] border-t border-[var(--color-line-soft)] px-5 py-[120px] md:px-10">
      <div
        data-reveal
        className="text-center font-mono text-[12px] tracking-[2.5px] text-[var(--color-mint-2)]"
      >
        {t("eyebrow")}
      </div>
      <h2
        data-reveal
        className="mt-[18px] text-center text-[clamp(30px,3.8vw,52px)] font-extrabold tracking-[-0.03em]"
      >
        {t("headline")}
      </h2>

      <div className="relative mt-[70px] grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* The dashed connector, drawn once the row scrolls into view */}
        <svg
          data-draw
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="pointer-events-none absolute left-0 top-[26px] hidden h-[60px] w-full overflow-visible lg:block"
        >
          <path
            d="M150 26 C 300 26 300 26 450 26 C 600 26 600 26 750 26 C 900 26 900 26 1050 26"
            fill="none"
            stroke="rgba(0,210,122,.45)"
            strokeWidth="2"
            strokeDasharray="1200"
            strokeDashoffset="1200"
          />
        </svg>

        {STEPS.map((id, i) => (
          <div
            key={id}
            data-reveal
            data-reveal-delay={i * 100}
            className="relative px-3 text-center"
          >
            <div className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-full border border-[rgba(0,210,122,.5)] bg-[var(--color-panel-3)] font-mono text-[16px] font-semibold text-[var(--color-mint-2)] shadow-[0_0_24px_rgba(0,210,122,.18)]">
              {t(`steps.${id}.n`)}
            </div>
            <h3 className="mt-5 text-[19px] font-bold">{t(`steps.${id}.title`)}</h3>
            <p className="mt-[10px] text-[14px] leading-[1.55] text-[var(--color-muted-2)]">
              {t(`steps.${id}.body`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
