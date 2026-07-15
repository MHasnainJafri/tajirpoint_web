import { useTranslations } from "next-intl";
import { Icon } from "@/components/design/Icon";
import { Eyebrow } from "@/components/design/primitives";
import { REPLACES } from "@/lib/design/catalog";

export function Platform() {
  const t = useTranslations("landing.platform");

  return (
    <section id="platform" className="mx-auto max-w-[1200px] px-5 pb-15 pt-[130px] md:px-10">
      <Eyebrow>{t("eyebrow")}</Eyebrow>

      <h2
        data-reveal
        className="mt-[18px] max-w-[820px] text-[clamp(32px,4.2vw,58px)] font-extrabold leading-[1.08] tracking-[-0.03em]"
      >
        {t("headline")} <span className="text-[var(--color-mint)]">{t("headlineAccent")}</span>
      </h2>

      <p
        data-reveal
        className="mt-[22px] max-w-[620px] text-[17.5px] leading-[1.65] text-[var(--color-muted)]"
      >
        {t("body")}
      </p>

      <div className="mt-14 grid grid-cols-1 gap-[14px] sm:grid-cols-2 lg:grid-cols-5">
        {REPLACES.map((r, i) => (
          <div
            key={r.id}
            data-reveal
            data-reveal-delay={i * 70}
            className="relative rounded-[14px] border border-[var(--color-line)] bg-[var(--surface-1)] px-5 py-[22px] transition-[border-color,transform,background] duration-300 hover:-translate-y-1 hover:border-[rgba(0,210,122,.45)] hover:bg-[rgba(0,210,122,.05)]"
          >
            <div className="inline-flex text-[var(--color-mint-2)] opacity-90">
              <Icon name={r.icon} size={22} />
            </div>
            <div className="mt-3 text-[15px] font-bold text-[var(--color-muted-2)] line-through decoration-[rgba(0,210,122,.7)] decoration-2">
              {t(`replaces.${r.id}.old`)}
            </div>
            <div className="mt-[5px] text-[13.5px] leading-[1.45] text-[var(--color-muted-2)]">
              {t(`replaces.${r.id}.now`)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
