import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Tick } from "./Stroke";
import { SolutionTabs, type SolutionTab } from "./SolutionTabs";
import { ICON, SOLUTIONS, SOLUTION_BULLETS } from "@/lib/design/landing";

/**
 * Six verticals, each showing the product rather than an icon: the copy on the
 * left, a mock of that trade's actual screen on the right.
 *
 * Server component — it builds all six panels' copy and hands it to the
 * client shell, so every vertical's text, "start free" and deep link ships in
 * the HTML. The screen mocks are fixture data (not translated) and only the
 * selected one is drawn: the five hidden mocks were ~200 elements of markup
 * nobody could see.
 */
export function Solutions() {
  const t = useTranslations("landing.solutions");

  const tabs: SolutionTab[] = SOLUTIONS.map((s) => ({
    id: s.id,
    name: t(`items.${s.id}.name`),
    who: t(`items.${s.id}.who`),
    icon: ICON[s.icon],
  }));

  // The copy column of each vertical. SolutionTabs adds the panel frame and
  // that trade's screen mock beside it.
  const panels = SOLUTIONS.map((s) => (
    <div key={s.id}>
      <div className="font-[family-name:var(--font-mono)] text-[11.5px] uppercase tracking-[0.14em] text-[var(--color-muted)]">
        {t(`items.${s.id}.who`)}
      </div>
      <h3 className="mt-[10px] text-[clamp(22px,2.4vw,30px)] font-bold leading-[1.2] tracking-[-0.03em]">
        {t(`items.${s.id}.name`)}
      </h3>
      <p className="mt-3 text-[14.5px] leading-[1.7] text-[var(--color-body)]">
        {t(`items.${s.id}.blurb`)}
      </p>

      <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(min(100%,180px),1fr))] gap-x-[14px] gap-y-2">
        {Array.from({ length: SOLUTION_BULLETS }, (_, i) => (
          <div key={i} className="flex items-start gap-2 text-[13.5px] font-medium leading-[1.45]">
            <span className="text-[var(--color-mint-2)]">
              <Tick />
            </span>
            {t(`items.${s.id}.bullets.${i}`)}
          </div>
        ))}
      </div>

      <div className="mt-[22px] flex flex-wrap gap-[10px]">
        <Link
          href="/pricing"
          className="inline-flex items-center whitespace-nowrap rounded-full bg-[#0A0A0A] px-5 py-[10px] text-[13px] font-semibold text-white transition-transform duration-200 hover:-translate-y-[2px]"
        >
          {t("ctaStart")}
        </Link>
        <a
          href="#extensions"
          className="inline-flex items-center whitespace-nowrap rounded-full border border-[var(--color-line-3)] px-5 py-[10px] text-[13px] font-semibold transition-colors duration-200 hover:bg-white"
        >
          {t("ctaExtensions")}
        </a>
      </div>
    </div>
  ));

  // That vertical's simulated POS screen: fixture rows, drawn only for the
  // selected tab (see SolutionTabs).
  const screens = SOLUTIONS.map((s) => ({ id: s.id, screenTitle: s.screen, rows: s.rows }));

  return (
    <section id="solutions" className="mt-[clamp(64px,9vw,120px)] scroll-mt-[86px]">
      <div data-reveal>
        <div className="eyebrow">{t("eyebrow")}</div>
        <h2 className="mt-3 max-w-[16ch] text-[clamp(28px,3.6vw,44px)] font-bold leading-[1.12] tracking-[-0.035em] text-balance">
          {t("headline")}
        </h2>
        <p className="mt-3 max-w-[56ch] text-[14.5px] leading-[1.65] text-[var(--color-body)]">
          {t("sub")}
        </p>
      </div>

      <SolutionTabs tabs={tabs} label={t("tablistLabel")} panels={panels} screens={screens} />
    </section>
  );
}
