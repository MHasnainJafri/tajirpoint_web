import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PLANS } from "@/lib/design/catalog";

export function Pricing() {
  const t = useTranslations("landing.pricing");

  return (
    <section
      id="pricing"
      className="relative overflow-hidden border-t border-[var(--color-line-soft)] px-5 py-[120px] md:px-10"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2"
        style={{ background: "radial-gradient(ellipse,rgba(0,210,122,.08),transparent 65%)" }}
      />

      <div className="relative mx-auto max-w-[1140px]">
        <div className="text-center">
          <div
            data-reveal
            className="font-mono text-[12px] tracking-[2.5px] text-[var(--color-mint-2)]"
          >
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

        <div className="mt-15 grid items-stretch gap-[18px] md:grid-cols-3">
          {PLANS.map((plan, i) => {
            const feats = t.raw(`plans.${plan.id}.feats`) as string[];
            return (
              <div
                key={plan.id}
                data-reveal
                data-reveal-delay={i * 100}
                className="relative flex flex-col rounded-[20px] border px-[30px] py-[34px] transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_rgba(0,0,0,.45)]"
                style={{
                  borderColor: plan.popular ? "rgba(0,210,122,.55)" : "var(--color-line-2)",
                  background: plan.popular
                    ? "linear-gradient(170deg,rgba(0,210,122,.09),rgba(255,255,255,.02) 55%)"
                    : "var(--surface-1)",
                }}
              >
                {plan.popular && (
                  <div className="absolute -top-[13px] left-1/2 -translate-x-1/2 rounded-full bg-[var(--color-mint)] px-[14px] py-[6px] font-mono text-[10.5px] font-semibold tracking-[1.5px] text-[var(--color-mint-ink)]">
                    {t("popular")}
                  </div>
                )}

                <div className="text-[17px] font-bold">{t(`plans.${plan.id}.name`)}</div>

                <div className="mt-4 flex items-baseline gap-[6px]">
                  <span className="text-[40px] font-extrabold tracking-[-0.02em]">
                    {t(`plans.${plan.id}.price`)}
                  </span>
                  <span className="text-[13.5px] text-[var(--color-muted-2)]">
                    {t(`plans.${plan.id}.per`)}
                  </span>
                </div>

                <div className="mt-[6px] text-[13.5px] text-[var(--color-muted-2)]">
                  {t(`plans.${plan.id}.who`)}
                </div>

                <div className="my-[22px] h-px bg-[var(--color-line-2)]" />

                <div className="flex flex-1 flex-col gap-[11px]">
                  {feats.map((f) => (
                    <div
                      key={f}
                      className="flex gap-[10px] text-[14px] leading-[1.45] text-[var(--color-muted)]"
                    >
                      <span className="font-bold text-[var(--color-mint)]">✓</span>
                      {f}
                    </div>
                  ))}
                </div>

                <Link
                  href="/#cta"
                  className="mt-[26px] block rounded-full border py-[13px] text-center text-[15px] font-bold transition-transform duration-200 hover:-translate-y-0.5"
                  style={
                    plan.popular
                      ? {
                          background: "var(--color-mint)",
                          color: "var(--color-mint-ink)",
                          borderColor: "var(--color-mint)",
                        }
                      : {
                          background: "var(--surface-3)",
                          color: "var(--color-ink)",
                          borderColor: "var(--color-line-2)",
                        }
                  }
                >
                  {t(`plans.${plan.id}.cta`)}
                </Link>
              </div>
            );
          })}
        </div>

        <div
          data-reveal
          className="mt-6 text-center font-mono text-[11.5px] text-[var(--color-muted-3)]"
        >
          {t("note")}
        </div>
      </div>
    </section>
  );
}
