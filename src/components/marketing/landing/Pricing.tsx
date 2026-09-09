import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Stroke, Tick } from "./Stroke";
import { TRIAL_INCLUDES, TRIAL_MONTHS } from "@/lib/design/landing";
import { siteConfig } from "@/lib/config/site";

/**
 * One free trial, not a tier table.
 *
 * There is deliberately no call to `getPlans()` here any more: the backend's
 * published plans are real paid tiers, and rendering them alongside "free for
 * three months" would advertise two different prices for the same product. If
 * paid tiers come back, this section reads the API again — `lib/api/plans.ts`
 * is still there.
 *
 * Everything past the trial is a conversation, so the second card offers the
 * two channels that actually exist: a booked call and email.
 */
export function Pricing() {
  const t = useTranslations("landing.pricing");

  return (
    <section id="pricing" className="mt-[clamp(64px,9vw,120px)] scroll-mt-[86px]">
      <div data-reveal className="text-center">
        <div className="eyebrow">{t("eyebrow")}</div>
        <h2 className="mx-auto mt-3 max-w-[18ch] text-[clamp(28px,3.6vw,44px)] font-bold leading-[1.12] tracking-[-0.035em] text-balance">
          {t("headline", { months: TRIAL_MONTHS })}
        </h2>
        <p className="mx-auto mt-3 max-w-[56ch] text-[14.5px] leading-[1.65] text-[var(--color-body)]">
          {t("sub", { months: TRIAL_MONTHS })}
        </p>
      </div>

      <div className="mt-[34px] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-stretch gap-[14px] lg:grid-cols-[1.55fr_1fr]">
        {/* ── The trial ───────────────────────────────────────────── */}
        <div
          data-reveal
          className="on-dark relative flex flex-col gap-[22px] overflow-hidden rounded-[24px] bg-[#0A0A0A] p-[clamp(22px,3vw,38px)] text-white"
        >
          <div className="pointer-events-none absolute -right-[90px] -top-[90px] h-[300px] w-[300px] rounded-full border border-[rgba(0,210,122,.2)]" />
          <div className="pointer-events-none absolute -bottom-[160px] -left-[120px] h-[380px] w-[380px] rounded-full border border-white/[0.06]" />

          <div className="relative flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="text-[15px] font-bold">{t("trial.name")}</div>
              <div className="mt-[3px] text-[12.5px] text-[#B5B9C2]">{t("trial.who")}</div>
            </div>
            <span className="whitespace-nowrap rounded-full bg-[var(--color-mint)] px-[10px] py-[5px] text-[11px] font-bold text-[#0A0A0A]">
              {t("trial.badge")}
            </span>
          </div>

          <div className="relative flex flex-wrap items-baseline gap-x-[10px] gap-y-1">
            <span className="text-[clamp(44px,5.4vw,64px)] font-extrabold leading-none tracking-[-0.045em]">
              {t("trial.price")}
            </span>
            <span className="text-[15px] font-semibold text-[var(--color-mint)]">
              {t("trial.period", { months: TRIAL_MONTHS })}
            </span>
          </div>
          <p className="relative -mt-3 max-w-[46ch] text-[13.5px] leading-[1.6] text-[#B5B9C2]">
            {t("trial.note")}
          </p>

          <Link
            href="/pricing"
            className="relative inline-flex items-center justify-center gap-[10px] self-start rounded-full bg-[var(--color-mint)] py-3 pl-6 pr-3 text-[14px] font-bold text-[#0A0A0A] transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-[2px] hover:shadow-[0_14px_30px_rgba(0,210,122,.35)]"
          >
            {t("trial.cta")}
            <span className="grid h-[26px] w-[26px] place-items-center rounded-full bg-[#0A0A0A] text-[var(--color-mint)]">
              <Stroke name="arrowRight" size={14} width={2.2} />
            </span>
          </Link>

          <div className="relative">
            <div className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[#8A8F98]">
              {t("trial.includesLabel")}
            </div>
            <div className="mt-3 grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-x-5 gap-y-[10px] text-[13.5px]">
              {TRIAL_INCLUDES.map((id) => (
                <div key={id} className="flex items-start gap-[9px]">
                  <span className="text-[var(--color-mint)]">
                    <Tick size={17} />
                  </span>
                  {t(`trial.includes.${id}`)}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Anything else: talk to us ───────────────────────────── */}
        <div
          data-reveal
          className="flex flex-col gap-[18px] rounded-[24px] border border-[var(--color-line-2)] p-[clamp(22px,3vw,38px)]"
        >
          <div>
            <div className="text-[15px] font-bold">{t("custom.name")}</div>
            <div className="mt-[3px] text-[12.5px] text-[var(--color-muted)]">
              {t("custom.who")}
            </div>
          </div>

          <p className="text-[14px] leading-[1.7] text-[var(--color-body)]">{t("custom.body")}</p>

          <div className="flex flex-col gap-[9px] text-[13.5px]">
            {["chains", "migration", "integrations", "onprem"].map((id) => (
              <div key={id} className="flex items-start gap-[9px]">
                <span className="text-[var(--color-mint-2)]">
                  <Tick size={17} />
                </span>
                {t(`custom.points.${id}`)}
              </div>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-[10px] pt-2">
            <Link
              href="/book-demo"
              className="flex items-center justify-center gap-2 rounded-full bg-[#0A0A0A] px-5 py-3 text-[13.5px] font-semibold text-white transition-transform duration-200 hover:-translate-y-[2px]"
            >
              <Stroke name="calendar" size={16} />
              {t("custom.ctaMeeting")}
            </Link>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="flex items-center justify-center gap-2 rounded-full border border-[var(--color-line-3)] px-5 py-3 text-[13.5px] font-semibold transition-colors duration-200 hover:bg-[var(--color-surface)]"
            >
              <Stroke name="mail" size={16} />
              {t("custom.ctaEmail")}
            </a>
            <div className="text-center text-[12px] text-[var(--color-muted-2)]">
              {siteConfig.contactEmail}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
