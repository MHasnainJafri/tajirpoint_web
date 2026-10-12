import { Link } from "@/i18n/navigation";
import { PlanCards } from "@/components/marketing/landing/PlanCards";
import { getPlanLabels } from "@/components/marketing/landing/planLabels";
import { getPlans } from "@/lib/api/plans";
import { OFFER_LINE } from "@/lib/marketing/businesses";
import { siteConfig } from "@/lib/config/site";

/**
 * A short plan strip for the business pages, from the plans API. When the API
 * cannot be read it says only what is fixed (Light is free for 3 months) and
 * quotes no paid price.
 */
export async function PlanTeaser({ id = "plans" }: { id?: string }) {
  const [plans, labels] = await Promise.all([getPlans(), getPlanLabels()]);
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-[86px]">
      <div className="text-center">
        <div className="eyebrow">Pricing</div>
        <h2 id={`${id}-title`} className="mx-auto mt-3 max-w-[22ch] text-[clamp(24px,3.2vw,38px)] font-bold leading-[1.12] tracking-[-0.03em] text-balance">
          Start free. Upgrade when you grow.
        </h2>
        <p className="mx-auto mt-3 max-w-[56ch] text-[15px] leading-[1.65] text-[var(--color-body)]">{OFFER_LINE}</p>
      </div>
      {plans ? (
        <PlanCards plans={plans} labels={labels} signupUrl={siteConfig.signupUrl} compact />
      ) : (
        <div className="mx-auto mt-7 max-w-[560px] rounded-[22px] border border-[var(--color-line-2)] bg-white p-6 text-center shadow-[var(--shadow-card)]">
          <div className="text-[16px] font-bold">Light — free for 3 months</div>
          <p className="mt-2 text-[14px] leading-[1.6] text-[var(--color-body)]">
            One shop, two staff logins, 30 products and 100 orders a day. No card needed.
          </p>
          <a
            href={siteConfig.signupUrl}
            data-track="plan_teaser"
            className="mt-5 inline-flex rounded-full bg-[var(--color-mint)] px-6 py-3 text-[14px] font-bold text-[#0A0A0A]"
          >
            Start free — 3 months
          </a>
        </div>
      )}
      <p className="mt-5 text-center text-[14px]">
        <Link href="/pricing" className="font-semibold text-[var(--color-mint-2)] underline underline-offset-2">
          Compare all plans →
        </Link>
      </p>
    </section>
  );
}
