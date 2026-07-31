import { useTranslations } from "next-intl";
import { Boxes, PieChart, Store, WifiOff, Zap } from "lucide-react";

/**
 * Five capabilities directly under the hero, before any argument is made.
 * A visitor who reads nothing else should still know what the product does.
 *
 * Line icons rather than the site's 3D icon set: at 20px inside a circle the
 * rendered PNGs turn to mush, where a stroked glyph stays legible.
 */

const ITEMS = [
  { id: "billing", Glyph: Zap },
  { id: "inventory", Glyph: Boxes },
  { id: "reports", Glyph: PieChart },
  { id: "offline", Glyph: WifiOff },
  { id: "multistore", Glyph: Store },
] as const;

export function FeatureStrip() {
  const t = useTranslations("landing.strip");

  return (
    <section className="border-y border-[var(--color-line-soft)] bg-[var(--color-bg-2)]">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-x-6 gap-y-8 px-5 py-11 sm:grid-cols-2 md:px-8 lg:grid-cols-5 lg:gap-x-0">
        {ITEMS.map(({ id, Glyph }, i) => (
          <div
            key={id}
            data-reveal
            data-reveal-delay={i * 60}
            className={`flex gap-[14px] lg:px-6 ${
              i > 0 ? "lg:border-l lg:border-[var(--color-line-soft)]" : "lg:pl-0"
            } ${i === ITEMS.length - 1 ? "lg:pr-0" : ""}`}
          >
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-mint-soft)] text-[var(--color-brand)]">
              <Glyph size={18} strokeWidth={1.9} />
            </span>
            <div className="min-w-0">
              <h2 className="text-[15.5px] font-semibold leading-snug tracking-[-0.01em]">
                {t(`${id}.title`)}
              </h2>
              <p className="mt-[6px] text-[13.5px] leading-[1.5] text-[var(--color-muted)]">
                {t(`${id}.body`)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
