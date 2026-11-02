import { getLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PlanCards } from "@/components/marketing/landing/PlanCards";
import { getPlanLabels } from "@/components/marketing/landing/planLabels";
import { getPlans } from "@/lib/api/plans";
import { localizePlans } from "@/content/i18n/plans";
import { businessUi } from "@/content/i18n/businesses";
import { siteConfig } from "@/lib/config/site";

/**
 * A short plan strip for the business pages, from the plans API. When the API
 * cannot be read it says only what is fixed (Light is free for 3 months) and
 * quotes no paid price.
 */
export async function PlanTeaser({ id = "plans", locale }: { id?: string; locale?: string }) {
  const [plans, labels, pageLocale] = await Promise.all([
    getPlans(),
    getPlanLabels(),
    locale ?? getLocale(),
  ]);
  const ui = businessUi(pageLocale);
  const t = ui.planTeaser;
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-[86px]">
      <div className="text-center">
        <div className="eyebrow rtl:tracking-normal">{t.eyebrow}</div>
        <h2
          id={`${id}-title`}
          className="mx-auto mt-3 max-w-[22ch] text-[clamp(24px,3.2vw,38px)] font-bold leading-[1.12] tracking-[-0.03em] text-balance rtl:tracking-normal"
        >
          {t.headline}
        </h2>
        <p className="mx-auto mt-3 max-w-[56ch] text-[15px] leading-[1.65] text-[var(--color-body)]">
          {ui.offerLine}
        </p>
      </div>
      {plans ? (
        <PlanCards
          plans={localizePlans(plans, pageLocale)}
          labels={labels}
          signupUrl={siteConfig.signupUrl}
          compact
        />
      ) : (
        <div className="mx-auto mt-7 max-w-[560px] rounded-[22px] border border-[var(--color-line-2)] bg-white p-6 text-center shadow-[var(--shadow-card)]">
          <div className="text-[16px] font-bold">{t.fallbackTitle}</div>
          <p className="mt-2 text-[14px] leading-[1.6] text-[var(--color-body)]">
            {t.fallbackBody}
          </p>
          <a
            href={siteConfig.signupUrl}
            data-track="plan_teaser"
            className="mt-5 inline-flex rounded-full bg-[var(--color-mint)] px-6 py-3 text-[14px] font-bold text-[#0A0A0A]"
          >
            {ui.startFree}
          </a>
        </div>
      )}
      <p className="mt-5 text-center text-[14px]">
        <Link
          href="/pricing"
          className="inline-block py-3 font-semibold text-[var(--color-mint-2)] underline underline-offset-2"
        >
          {t.compare}{" "}
          <span aria-hidden="true" className="inline-block rtl:-scale-x-100">
            →
          </span>
        </Link>
      </p>
    </section>
  );
}
