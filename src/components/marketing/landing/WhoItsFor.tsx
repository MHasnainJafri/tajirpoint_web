import { useTranslations } from "next-intl";
import { Shot } from "@/components/marketing/Shot";

/**
 * Scale segmentation, straight after the hero: one counter, several branches,
 * or selling off a vehicle. Visitors self-identify with a card instead of
 * reading a feature list, and it is the section that states plainly who the
 * product is for.
 */

const SEGMENTS = ["single", "multi", "mobile"] as const;

export function WhoItsFor() {
  const t = useTranslations("landing.whoItsFor");

  return (
    <section className="border-y border-[var(--color-line-soft)] bg-[var(--color-bg-2)]">
      <div className="mx-auto max-w-[1200px] px-5 py-[110px] md:px-10">
        <h2
          data-reveal
          className="max-w-[16ch] text-[clamp(32px,4vw,56px)] font-bold leading-[1.06] tracking-[-0.035em]"
        >
          {t("headline")}
        </h2>
        <p
          data-reveal
          className="mt-5 max-w-[560px] text-[17.5px] leading-[1.6] text-[var(--color-muted)]"
        >
          {t("sub")}
        </p>

        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-3">
          {SEGMENTS.map((id, i) => (
            <div key={id} data-reveal data-reveal-delay={i * 90}>
              <Shot
                id={`who-${id}`}
                alt={t(`items.${id}.alt`)}
                label={t(`items.${id}.alt`)}
                ratio="4/3"
                sizes="(max-width: 720px) 92vw, 33vw"
              />
              <div className="mt-6 border-t border-[var(--color-line)] pt-6">
                <h3 className="text-[21px] font-semibold tracking-[-0.02em]">
                  {t(`items.${id}.title`)}
                </h3>
                <p className="mt-[10px] text-[15.5px] leading-[1.6] text-[var(--color-muted)]">
                  {t(`items.${id}.body`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
