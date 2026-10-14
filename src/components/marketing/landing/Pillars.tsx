import { useTranslations } from "next-intl";
import { Icon } from "@/components/design/Icon";
import { PILLARS } from "@/lib/design/landing";

/** The same dimensional illustration family as the extension marketplace. */
const PILLAR_ARTWORK: Record<(typeof PILLARS)[number]["id"], string> = {
  sell: "artwork-pos-checkout",
  stock: "artwork-inventory",
  buy: "artwork-purchasing",
  getPaid: "extension-cash-management",
  credit: "extension-customer-portal",
  account: "extension-accounting-gl",
  comply: "artwork-compliance",
  grow: "extension-coupons",
  deliver: "extension-route-dispatch",
  people: "extension-hr-payroll",
  specialise: "extension-restaurant-toolbox",
  integrate: "artwork-integrations",
};

/**
 * Twelve bordered cards covering the whole back office. The point of the
 * section is breadth, so it is a plain auto-fit grid rather than a bento —
 * every capability gets the same weight.
 */
export function Pillars() {
  const t = useTranslations("landing.pillars");

  return (
    <section id="back-office" className="mt-[clamp(64px,9vw,120px)] scroll-mt-[86px]">
      <div data-reveal className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <div className="eyebrow">{t("eyebrow")}</div>
          <h2 className="mt-3 max-w-[18ch] text-[clamp(28px,3.6vw,44px)] font-bold leading-[1.12] tracking-[-0.035em] text-balance">
            {t("headline")}
          </h2>
        </div>
        <p className="max-w-[40ch] text-[14.5px] leading-[1.65] text-[var(--color-body)]">
          {t("sub")}
        </p>
      </div>

      <div className="mt-[30px] grid grid-cols-[repeat(auto-fit,minmax(min(100%,200px),1fr))] gap-3">
        {PILLARS.map((p) => {
          return (
            <div
              key={p.id}
              data-reveal
              className="group rounded-[18px] border border-[var(--color-line)] p-[18px] transition-[transform,box-shadow,border-color] duration-[250ms] hover:-translate-y-[3px] hover:border-[var(--color-line-3)] hover:shadow-[0_16px_34px_rgba(10,10,10,.08)]"
            >
              <span className="flex h-[72px] w-[80px] items-center justify-center rounded-[16px] border border-[var(--color-line-soft)] bg-gradient-to-b from-white to-[#f1f7f4] transition-transform duration-300 group-hover:-translate-y-0.5 motion-reduce:transform-none">
                <Icon name={PILLAR_ARTWORK[p.id]} size={28} />
              </span>
              <div className="mt-[14px] text-[15px] font-bold tracking-[-0.01em]">
                {t(`items.${p.id}.title`)}
              </div>
              <div className="mt-[5px] text-[12.5px] leading-[1.55] text-[var(--color-muted)]">
                {t(`items.${p.id}.body`)}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
