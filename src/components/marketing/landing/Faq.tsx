import { useTranslations } from "next-intl";
import { FAQ_TABS } from "@/lib/design/landing";
import { FaqPanel, type FaqGroup } from "./FaqPanel";

/**
 * The questions merchants actually ask, grouped. Server component so every
 * answer is in the HTML — this section is the page's richest source of
 * long-tail queries, and hiding it behind a click would waste that.
 */
export function Faq() {
  const t = useTranslations("landing.faq");

  const groups: FaqGroup[] = FAQ_TABS.map((tab) => ({
    id: tab.id,
    label: t(`groups.${tab.id}.label`),
    items: Array.from({ length: tab.count }, (_, i) => ({
      q: t(`groups.${tab.id}.items.${i}.q`),
      a: t(`groups.${tab.id}.items.${i}.a`),
    })),
  }));

  return (
    <section
      id="faq"
      className="mt-[clamp(64px,9vw,110px)] scroll-mt-[86px] rounded-[26px] bg-[var(--color-surface)] p-[clamp(20px,4vw,52px)]"
    >
      <div data-reveal className="flex flex-wrap items-start justify-between gap-5">
        <h2 className="max-w-[12ch] text-[clamp(26px,3.4vw,40px)] font-bold leading-[1.12] tracking-[-0.035em]">
          {t("headline")}
        </h2>
        <p className="max-w-[38ch] text-[14px] leading-[1.65] text-[var(--color-body)]">
          {t("sub")}
        </p>
      </div>

      <FaqPanel groups={groups} />
    </section>
  );
}
