import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Icon } from "@/components/design/Icon";
import { Eyebrow } from "@/components/design/primitives";
import { VERTICALS } from "@/lib/design/catalog";

export function VerticalsGrid() {
  const t = useTranslations("landing.verticals");
  const tInd = useTranslations("solutions.industries");

  return (
    <section className="mx-auto max-w-[1200px] border-t border-[var(--color-line-soft)] px-5 py-[110px] md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2
            data-reveal
            className="mt-[18px] max-w-[560px] text-[clamp(30px,3.8vw,52px)] font-extrabold tracking-[-0.03em]"
          >
            {t("headline")}
          </h2>
        </div>
        <Link
          href="/solutions"
          data-reveal
          className="inline-flex items-center gap-2 text-[15px] font-semibold text-[var(--color-brand)] transition-colors hover:text-[var(--color-brand-hover)]"
        >
          {t("cta")} <span>→</span>
        </Link>
      </div>

      <div className="mt-13 grid gap-[14px] md:grid-cols-2 lg:grid-cols-3">
        {VERTICALS.map((v, i) => (
          <Link
            key={v.id}
            href={`/solutions#${v.id}`}
            data-reveal
            data-reveal-delay={i * 60}
            className="block rounded-2xl border border-[var(--color-line)] bg-[var(--surface-1)] p-7 transition-[border-color,transform,background] duration-300 hover:-translate-y-[5px] hover:border-[rgba(0,210,122,.5)] hover:bg-[rgba(0,210,122,.05)]"
          >
            <div className="flex items-start justify-between">
              <span className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-[11px] border border-[rgba(0,210,122,.25)] bg-[rgba(0,210,122,.1)] text-[var(--color-mint-2)]">
                <Icon name={v.icon} />
              </span>
              <span className="text-[12.5px] text-[var(--color-muted-2)]">0{i + 1}</span>
            </div>
            <h3 className="mt-4 text-[19px] font-bold">{tInd(`${v.id}.name`)}</h3>
            <p className="mt-2 text-[13.5px] leading-[1.5] text-[var(--color-muted-2)]">
              {tInd(`${v.id}.body`)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
