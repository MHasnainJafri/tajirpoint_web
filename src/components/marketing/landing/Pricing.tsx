import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Stroke, Tick } from "./Stroke";
import { BASIC_INCLUDES } from "@/lib/design/landing";
import { siteConfig } from "@/lib/config/site";
import { getPricing, hasLimits, planPriceLabel, type MarketingPlan } from "@/lib/api/plans";
import { PlanCards } from "./PlanCards";
import { getPlanLabels } from "./planLabels";

/**
 * The published tier table, read from the backend.
 *
 * Every number here comes from `getPricing()` — the same rows the checkout
 * bills from. Nothing hardcodes a price: a card that says $19 while the plan
 * row says something else is a false quote.
 *
 * Works with both API shapes: the relaunch shape (Light/Shop/Business with
 * `limits`, `not_included`, `price_display`) adds the comparison table and the
 * "not included" list; the older shape renders the cards alone.
 *
 * `getPricing()` returns null on any failure. That falls back to the Light
 * card below — fewer claims, none of them a paid price.
 */
export async function Pricing({
  showHeader = true,
  showCompare = false,
}: { showHeader?: boolean; showCompare?: boolean } = {}) {
  const t = await getTranslations("landing.pricing");
  const [pricing, labels] = await Promise.all([getPricing(), getPlanLabels()]);
  const plans = pricing?.plans ?? null;

  return (
    <section id="pricing" className="mt-[clamp(64px,9vw,120px)] scroll-mt-[86px]">
      {/* /pricing renders these three lines as its own <h1> hero. */}
      {showHeader && (
        <div data-reveal className="text-center">
          <div className="eyebrow">{t("eyebrow")}</div>
          <h2 className="mx-auto mt-3 max-w-[18ch] text-[clamp(28px,3.6vw,44px)] font-bold leading-[1.12] tracking-[-0.035em] text-balance">
            {t("headline")}
          </h2>
          <p className="mx-auto mt-3 max-w-[56ch] text-[14.5px] leading-[1.65] text-[var(--color-body)]">
            {t("sub")}
          </p>
        </div>
      )}

      {plans ? (
        <>
          <PlanCards plans={plans} labels={labels} signupUrl={siteConfig.signupUrl} />
          <p className="mx-auto mt-5 max-w-[70ch] text-center text-[13px] text-[var(--color-muted)]">
            {t("plansNote")}
          </p>
          {showCompare && hasLimits(plans) && <CompareTable plans={plans} t={t} />}
        </>
      ) : (
        <FreePlanFallback t={t} />
      )}
    </section>
  );
}

/* ── Comparison table (relaunch API shape only) ───────────────────── */

type T = Awaited<ReturnType<typeof getTranslations>>;

function limitCell(value: number | null | undefined, t: T): string {
  return value == null ? t("compare.unlimited") : new Intl.NumberFormat("en-US").format(value);
}

function CompareTable({ plans, t }: { plans: MarketingPlan[]; t: T }) {
  const rows: Array<{ label: string; cell: (p: MarketingPlan) => string }> = [
    { label: t("compare.price"), cell: (p) => `${planPriceLabel(p)}${p.is_priced ? ` ${t("perMonth")}` : ""}` },
    { label: t("compare.shops"), cell: (p) => limitCell(p.limits?.shops, t) },
    { label: t("compare.users"), cell: (p) => limitCell(p.limits?.users, t) },
    { label: t("compare.products"), cell: (p) => limitCell(p.limits?.products, t) },
    { label: t("compare.ordersPerDay"), cell: (p) => limitCell(p.limits?.orders_per_day, t) },
    { label: t("compare.warehouses"), cell: (p) => limitCell(p.limits?.warehouses, t) },
    {
      label: t("compare.extensions"),
      cell: (p) => (p.extensions_restricted ? t("compare.extRestricted") : t("compare.extAll")),
    },
  ];
  return (
    <div data-reveal className="mt-[clamp(40px,6vw,64px)]">
      <h2 className="text-center text-[clamp(22px,2.8vw,32px)] font-bold tracking-[-0.03em]">{t("compare.title")}</h2>
      {/* Scrolls inside its own box on a phone — the page never scrolls sideways. */}
      <div className="mt-6 overflow-x-auto rounded-[20px] border border-[var(--color-line-2)] bg-white" tabIndex={0} role="region" aria-label={t("compare.title")}>
        <table className="w-full min-w-[560px] border-collapse text-[14px]">
          <thead>
            <tr className="border-b border-[var(--color-line-2)] bg-[var(--color-surface)]">
              <th scope="col" className="px-4 py-3 text-start font-semibold text-[var(--color-muted)]">
                {t("compare.feature")}
              </th>
              {plans.map((p) => (
                <th key={p.id} scope="col" className="px-4 py-3 text-start font-bold text-[var(--color-ink)]">
                  {p.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-[var(--color-line)] last:border-b-0">
                <th scope="row" className="px-4 py-3 text-start font-semibold text-[var(--color-ink-3)]">
                  {row.label}
                </th>
                {plans.map((p) => (
                  <td key={p.id} className="px-4 py-3 text-[var(--color-ink)]">
                    {row.cell(p)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ── Fallback: the catalogue could not be read ─────────────────────────
   Shown only when getPricing() fails. It makes no paid-price claim at all —
   only that a free plan exists, which is the one price that does not move — since
   that is the safe thing to say when we cannot read our own prices. */

function FreePlanFallback({ t }: { t: Awaited<ReturnType<typeof getTranslations>> }) {
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
            <div className="text-[15px] font-bold">{t("basic.name")}</div>
            <div className="mt-[3px] text-[12.5px] text-[#B5B9C2]">{t("basic.who")}</div>
          </div>
          <span className="whitespace-nowrap rounded-full bg-[var(--color-mint)] px-[10px] py-[5px] text-[11px] font-bold text-[#0A0A0A]">
            {t("basic.badge")}
          </span>
        </div>

        <div className="relative flex flex-wrap items-baseline gap-x-[10px] gap-y-1">
          <span className="text-[clamp(44px,5.4vw,64px)] font-extrabold leading-none tracking-[-0.045em]">
            {t("basic.price")}
          </span>
          <span className="text-[15px] font-semibold text-[var(--color-mint)]">
            {t("basic.period")}
          </span>
        </div>
        <p className="relative -mt-3 max-w-[46ch] text-[13.5px] leading-[1.6] text-[#B5B9C2]">
          {t("basic.note")}
        </p>

        <a
          href={siteConfig.signupUrl}
          className="relative inline-flex items-center justify-center gap-[10px] self-start rounded-full bg-[var(--color-mint)] py-3 pl-6 pr-3 text-[14px] font-bold text-[#0A0A0A] transition-[transform,box-shadow] duration-[250ms] hover:-translate-y-[2px] hover:shadow-[0_14px_30px_rgba(0,210,122,.35)]"
        >
          {t("basic.cta")}
          <span className="grid h-[26px] w-[26px] place-items-center rounded-full bg-[#0A0A0A] text-[var(--color-mint)]">
            <Stroke name="arrowRight" size={14} width={2.2} />
          </span>
        </a>

        <div className="relative">
          <div className="font-[family-name:var(--font-mono)] text-[11px] uppercase tracking-[0.14em] text-[#8A8F98]">
            {t("basic.includesLabel")}
          </div>
          <div className="mt-3 grid grid-cols-[repeat(auto-fit,minmax(190px,1fr))] gap-x-5 gap-y-[10px] text-[13.5px]">
            {BASIC_INCLUDES.map((id) => (
              <div key={id} className="flex items-start gap-[9px]">
                <span className="text-[var(--color-mint)]">
                  <Tick size={17} />
                </span>
                {t(`basic.includes.${id}`)}
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
