import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Stroke, Tick } from "./Stroke";
import { TRIAL_DAYS, TRIAL_INCLUDES } from "@/lib/design/landing";
import { siteConfig } from "@/lib/config/site";
import { getPricing, type MarketingPlan } from "@/lib/api/plans";

/**
 * The published tier table, read from the backend.
 *
 * Every number on this page comes from `getPlans()` — the same rows the
 * checkout bills from. Nothing here hardcodes a price, because a card that
 * says $19 while the plan row says something else is a false quote, and the
 * two have no way of catching each other.
 *
 * `getPlans()` returns null on any failure (network, bad shape, empty
 * catalogue). That falls back to the trial card below rather than an empty
 * pricing section — fewer claims, none of them wrong.
 *
 * Note the catalogue drives the layout: whatever plans are marked public in
 * admin is what renders. Making a plan public is an admin change, not a
 * deploy.
 */
export async function Pricing() {
  const t = await getTranslations("landing.pricing");
  const pricing = await getPricing();
  const plans = pricing?.plans ?? null;
  // The backend grants the trial, so the backend says how long it is. The
  // local constant is only the fallback for when the API is unreachable —
  // and the moment it is used, the page is already falling back to copy.
  const trialDays = pricing?.trialDays ?? TRIAL_DAYS;

  return (
    <section id="pricing" className="mt-[clamp(64px,9vw,120px)] scroll-mt-[86px]">
      <div data-reveal className="text-center">
        <div className="eyebrow">{t("eyebrow")}</div>
        <h2 className="mx-auto mt-3 max-w-[18ch] text-[clamp(28px,3.6vw,44px)] font-bold leading-[1.12] tracking-[-0.035em] text-balance">
          {t("headline")}
        </h2>
        <p className="mx-auto mt-3 max-w-[56ch] text-[14.5px] leading-[1.65] text-[var(--color-body)]">
          {t("sub", { days: trialDays })}
        </p>
      </div>

      {plans ? (
        <>
          <div className="mt-[34px] grid grid-cols-[repeat(auto-fit,minmax(272px,1fr))] items-stretch gap-[14px]">
            {plans.map((plan) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                perMonth={t("perMonth")}
                signupUrl={siteConfig.signupUrl}
              />
            ))}
          </div>
          <p className="mt-5 text-center text-[13px] text-[var(--color-muted)]">
            {t("trialNote", { days: trialDays })}
          </p>
        </>
      ) : (
        <TrialFallback t={t} />
      )}
    </section>
  );
}

/* ── One plan ──────────────────────────────────────────────────────── */

function PlanCard({
  plan,
  perMonth,
  signupUrl,
}: {
  plan: MarketingPlan;
  perMonth: string;
  signupUrl: string;
}) {
  const dark = plan.highlighted;

  /**
   * Only contact-sales plans lack a self-serve path. A paid tier goes to
   * signup because you can buy it; the trial (tier "custom") goes to signup
   * because you can start it. Anything else unpriced is treated as
   * contact-sales — the safe direction, since sending someone to checkout for
   * a plan with no price is the worse of the two mistakes.
   */
  const contactSales = !plan.is_priced && plan.tier !== "custom";

  return (
    <div
      data-reveal
      className={
        dark
          ? "on-dark relative flex flex-col gap-[18px] overflow-hidden rounded-[24px] bg-[#0A0A0A] p-[clamp(22px,2.6vw,32px)] text-white"
          : "relative flex flex-col gap-[18px] rounded-[24px] border border-[var(--color-line-2)] p-[clamp(22px,2.6vw,32px)]"
      }
    >
      {dark && (
        <div className="pointer-events-none absolute -right-[90px] -top-[90px] h-[300px] w-[300px] rounded-full border border-[rgba(0,210,122,.2)]" />
      )}

      <div className="relative">
        <div className="text-[15px] font-bold">{plan.name}</div>
        <div
          className={`mt-[3px] text-[12.5px] ${dark ? "text-[#B5B9C2]" : "text-[var(--color-muted)]"}`}
        >
          {plan.tagline}
        </div>
      </div>

      <div className="relative flex flex-wrap items-baseline gap-x-[8px] gap-y-1">
        <span className="text-[clamp(32px,3.6vw,44px)] font-extrabold leading-none tracking-[-0.045em]">
          {plan.price}
        </span>
        {/* Contact-sales plans have no period: "Custom / month" is nonsense. */}
        {plan.is_priced && (
          <span
            className={`text-[14px] font-semibold ${dark ? "text-[var(--color-mint)]" : "text-[var(--color-muted)]"}`}
          >
            {perMonth}
          </span>
        )}
      </div>

      {!contactSales ? (
        <a
          href={signupUrl}
          className={
            dark
              ? "relative inline-flex items-center justify-center gap-[10px] self-start rounded-full bg-[var(--color-mint)] py-3 pl-6 pr-3 text-[14px] font-bold text-[#0A0A0A] transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-[2px] hover:shadow-[0_14px_30px_rgba(0,210,122,.35)]"
              : "relative inline-flex items-center justify-center gap-[10px] self-start rounded-full bg-[#0A0A0A] py-3 pl-6 pr-3 text-[14px] font-bold text-white transition-transform duration-[250ms] hover:-translate-y-[2px]"
          }
        >
          {plan.cta}
          <span
            className={`grid h-[26px] w-[26px] place-items-center rounded-full ${
              dark ? "bg-[#0A0A0A] text-[var(--color-mint)]" : "bg-white text-[#0A0A0A]"
            }`}
          >
            <Stroke name="arrowRight" size={14} width={2.2} />
          </span>
        </a>
      ) : (
        <Link
          href="/book-demo"
          className="relative inline-flex items-center justify-center gap-2 self-start rounded-full border border-[var(--color-line-3)] px-5 py-3 text-[13.5px] font-semibold transition-colors duration-200 hover:bg-[var(--color-surface)]"
        >
          <Stroke name="calendar" size={16} />
          {plan.cta}
        </Link>
      )}

      <div className="relative mt-auto flex flex-col gap-[9px] pt-1 text-[13.5px]">
        {plan.bullets.map((bullet) => (
          <div key={bullet} className="flex items-start gap-[9px]">
            <span className={dark ? "text-[var(--color-mint)]" : "text-[var(--color-mint-2)]"}>
              <Tick size={17} />
            </span>
            {bullet}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Fallback: the catalogue could not be read ─────────────────────────
   Shown only when getPricing() fails. It makes no price claim at all, which
   is the one safe thing to say when we cannot read our own prices.

   It uses TRIAL_DAYS rather than the live value on purpose: this card renders
   exactly when the backend could not be reached, so there is no live value to
   have. The constant is the fallback, and this is the fallback path. */

function TrialFallback({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }) {
  return (
    <div className="mt-[34px] grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-stretch gap-[14px] lg:grid-cols-[1.55fr_1fr]">
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
            {t("trial.period", { days: TRIAL_DAYS })}
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

      <div
        data-reveal
        className="flex flex-col gap-[18px] rounded-[24px] border border-[var(--color-line-2)] p-[clamp(22px,3vw,38px)]"
      >
        <div>
          <div className="text-[15px] font-bold">{t("custom.name")}</div>
          <div className="mt-[3px] text-[12.5px] text-[var(--color-muted)]">{t("custom.who")}</div>
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
  );
}
