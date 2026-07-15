import { useTranslations } from "next-intl";
import { Icon } from "@/components/design/Icon";
import { Eyebrow } from "@/components/design/primitives";
import { BUCKETS } from "@/lib/design/catalog";

export function InTheBox() {
  const t = useTranslations("landing.box");

  return (
    <section className="border-t border-[var(--color-line-soft)] px-5 py-[120px] md:px-10">
      <div className="mx-auto max-w-[1200px]">
        <div className="grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2
              data-reveal
              className="mt-[18px] text-[clamp(32px,4.2vw,58px)] font-extrabold leading-[1.06] tracking-[-0.03em]"
            >
              {t("headlineA")}
              <br />
              {t("headlineB")}
            </h2>
          </div>
          <p
            data-reveal
            className="max-w-[380px] text-[16px] leading-[1.65] text-[var(--color-muted)]"
          >
            {t("body")}
          </p>
        </div>

        <div className="mt-14 grid gap-[14px] md:grid-cols-2 lg:grid-cols-3">
          {BUCKETS.map((b, i) => {
            const chips = t.raw(`buckets.${b.id}.chips`) as string[];
            return (
              <div
                key={b.id}
                data-reveal
                data-reveal-delay={(i % 3) * 70}
                className="rounded-[18px] border p-[30px] transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-[rgba(0,210,122,.5)]"
                style={{
                  borderColor: b.featured ? "rgba(0,210,122,.4)" : "var(--color-line)",
                  background: b.featured
                    ? "linear-gradient(165deg,rgba(0,210,122,.12),rgba(0,210,122,.02) 60%)"
                    : "var(--surface-1)",
                }}
              >
                <div
                  className="font-mono text-[11px] tracking-[2px]"
                  style={{
                    color: b.featured ? "var(--color-mint-2)" : "var(--color-muted-3)",
                  }}
                >
                  {b.num} / {t(`buckets.${b.id}.cat`)}
                </div>

                <span className="mt-5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[rgba(0,210,122,.25)] bg-[rgba(0,210,122,.1)] text-[var(--color-mint-2)]">
                  <Icon name={b.icon} size={21} />
                </span>

                <h3 className="mt-4 text-[20px] font-bold tracking-[-0.01em]">
                  {t(`buckets.${b.id}.title`)}
                </h3>
                <p
                  className="mt-[10px] text-[13.5px] leading-[1.6]"
                  style={{
                    color: b.featured ? "var(--color-muted)" : "var(--color-muted-2)",
                  }}
                >
                  {t(`buckets.${b.id}.body`)}
                </p>

                <div className="mt-[18px] flex flex-wrap gap-[7px]">
                  {chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-[var(--color-line-2)] bg-[var(--surface-2)] px-[11px] py-[5px] text-[11.5px] font-semibold text-[var(--color-muted)]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
