import { useTranslations } from "next-intl";
import { Icon } from "@/components/design/Icon";
import { Eyebrow } from "@/components/design/primitives";
import { REPLACES } from "@/lib/design/catalog";

export function Platform() {
  const t = useTranslations("landing.platform");

  return (
    <section id="platform" className="mx-auto max-w-[1200px] px-5 py-[110px] md:px-10">
      <Eyebrow>{t("eyebrow")}</Eyebrow>

      <h2
        data-reveal
        className="mt-4 max-w-[16ch] text-[clamp(32px,4vw,56px)] font-bold leading-[1.06] tracking-[-0.035em]"
      >
        {t("headline")}
      </h2>

      <p
        data-reveal
        className="mt-5 max-w-[620px] text-[17.5px] leading-[1.6] text-[var(--color-muted)]"
      >
        {t("body")}
      </p>

      <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {REPLACES.map((r, i) => (
          <div
            key={r.id}
            data-reveal
            data-reveal-delay={i * 70}
            className="relative rounded-[20px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-6 shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
          >
            <div className="inline-flex text-[var(--color-brand)]">
              <Icon name={r.icon} size={22} />
            </div>
            <div className="mt-4 text-[15px] font-semibold text-[var(--color-muted-2)] line-through decoration-[var(--color-line-2)] decoration-2">
              {t(`replaces.${r.id}.old`)}
            </div>
            <div className="mt-[6px] text-[14px] leading-[1.5] text-[var(--color-ink-3)]">
              {t(`replaces.${r.id}.now`)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
