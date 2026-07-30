import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { PLANS } from "@/lib/design/catalog";
import { getPlans, type MarketingPlan } from "@/lib/api/plans";

/**
 * Plans come from the backend (`/api/v1/public/plans/`) so pricing can be
 * edited in Django admin without a deploy, and so the advertised price is the
 * same row Stripe bills from.
 *
 * If the API is unreachable the section falls back to the copy in
 * messages/*.json — a marketing page must never render an empty price table.
 */

type Translator = Awaited<ReturnType<typeof getTranslations>>;

function fallbackPlans(t: Translator): MarketingPlan[] {
  return PLANS.map((plan) => ({
    id: plan.id,
    name: t(`plans.${plan.id}.name`),
    tagline: t(`plans.${plan.id}.who`),
    price: t(`plans.${plan.id}.price`),
    is_priced: Boolean(t(`plans.${plan.id}.per`)),
    bullets: t.raw(`plans.${plan.id}.feats`) as string[],
    cta: t(`plans.${plan.id}.cta`),
    highlighted: plan.popular,
  }));
}

export async function Pricing() {
  const t = await getTranslations("landing.pricing");
  const plans = (await getPlans()) ?? fallbackPlans(t);

  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-y border-[var(--color-line-soft)] bg-[var(--color-bg-3)] px-5 py-[120px] md:px-10"
    >
      <div className="relative mx-auto max-w-[1140px]">
        <div className="text-center">
          <div data-reveal className="text-[13.5px] font-semibold text-[var(--color-brand)]">
            {t("eyebrow")}
          </div>
          <h2
            data-reveal
            className="mt-[18px] text-[clamp(30px,3.8vw,52px)] font-extrabold tracking-[-0.03em]"
          >
            {t("headline")}
          </h2>
          <p
            data-reveal
            className="mx-auto mt-[18px] max-w-[520px] text-[16.5px] leading-[1.6] text-[var(--color-muted)]"
          >
            {t("body")}
          </p>
        </div>

        {/* Three plan cards need ~300px each to stay readable; below `lg`
            they stack rather than squeezing to 214px on a tablet. */}
        <div className="mt-15 grid items-stretch gap-[18px] lg:grid-cols-3">
          {plans.map((plan, i) => (
            <div
              key={plan.id}
              data-reveal
              data-reveal-delay={i * 100}
              className="relative flex flex-col rounded-[24px] border bg-[var(--color-bg-2)] px-[30px] py-[34px] shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
              style={{
                borderColor: plan.highlighted ? "var(--color-brand)" : "var(--color-line)",
              }}
            >
              {plan.highlighted && (
                <div className="absolute -top-[14px] left-1/2 -translate-x-1/2 rounded-full bg-[var(--color-brand)] px-[14px] py-[6px] text-[12.5px] font-semibold text-[var(--color-on-brand)] shadow-[var(--shadow-card)]">
                  {t("popular")}
                </div>
              )}

              <div className="text-[17px] font-bold">{plan.name}</div>

              <div className="mt-4 flex items-baseline gap-[6px]">
                <span className="text-[40px] font-extrabold tracking-[-0.02em]">{plan.price}</span>
                {plan.is_priced && (
                  <span className="text-[13.5px] text-[var(--color-muted-2)]">{t("perMonth")}</span>
                )}
              </div>

              <div className="mt-[6px] text-[13.5px] text-[var(--color-muted-2)]">
                {plan.tagline}
              </div>

              <div className="my-[22px] h-px bg-[var(--color-line-2)]" />

              <div className="flex flex-1 flex-col gap-[11px]">
                {plan.bullets.map((bullet) => (
                  <div
                    key={bullet}
                    className="flex gap-[10px] text-[14px] leading-[1.45] text-[var(--color-muted)]"
                  >
                    <span className="font-bold text-[var(--color-brand)]">✓</span>
                    {bullet}
                  </div>
                ))}
              </div>

              <Link
                href="/#cta"
                className="mt-[26px] block rounded-full border py-[13px] text-center text-[15px] font-semibold transition-transform duration-200 hover:-translate-y-0.5"
                style={
                  plan.highlighted
                    ? {
                        background: "var(--color-brand)",
                        color: "var(--color-on-brand)",
                        borderColor: "var(--color-brand)",
                      }
                    : {
                        background: "var(--color-bg-2)",
                        color: "var(--color-ink)",
                        borderColor: "var(--color-line-2)",
                      }
                }
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <div data-reveal className="mt-6 text-center text-[13px] text-[var(--color-muted-3)]">
          {t("note")}
        </div>
      </div>
    </section>
  );
}
