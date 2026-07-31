import { useTranslations } from "next-intl";
import { MARQUEE_BRANDS, STATS } from "@/lib/design/catalog";

/**
 * The dark band under the feature strip.
 *
 * Deliberately built from things that are true — the integrations that exist
 * and the counts that can be checked — rather than customer logos and a
 * testimonial. Those belong here too, but only once they are real; inventing
 * them is the fastest way to lose the trust the section is asking for.
 */
export function TrustBand() {
  const t = useTranslations("landing.trust");
  const tStats = useTranslations("landing.stats");
  const track = [...MARQUEE_BRANDS, ...MARQUEE_BRANDS];

  return (
    <section
      className="on-dark relative overflow-hidden py-[70px]"
      style={{ background: "linear-gradient(168deg,#0e2019 0%,#06110d 55%,#0a1a14 100%)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 15% 0%,rgba(0,210,122,.16),transparent 62%)",
        }}
      />

      <div className="relative">
        <div className="mx-auto max-w-[1280px] px-5 text-center md:px-10">
          <h2 className="text-[clamp(24px,2.4vw,32px)] font-bold tracking-[-0.03em]">
            {t("headline")}
          </h2>
          <p className="mx-auto mt-4 max-w-[560px] text-[16px] leading-[1.6] text-[var(--color-muted)]">
            {t("sub")}
          </p>
        </div>

        {/* Integration wordmarks, scrolling. */}
        <div className="relative mt-11 overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[140px] bg-[linear-gradient(90deg,#08140f,transparent)]" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-[140px] bg-[linear-gradient(-90deg,#08140f,transparent)]" />
          <div className="marquee-track">
            {track.map((brand, i) => (
              <div
                key={`${brand}-${i}`}
                className="mx-[30px] whitespace-nowrap text-[18px] font-semibold tracking-[-0.01em] text-[var(--color-muted-2)]"
              >
                {brand}
              </div>
            ))}
          </div>
        </div>

        <div className="mx-auto mt-12 flex max-w-[1000px] flex-wrap justify-center gap-y-7 border-t border-[var(--color-line)] px-5 pt-10 md:px-10">
          {STATS.map((stat) => (
            <div key={stat.id} className="min-w-[160px] flex-1 px-4 text-center">
              <div className="text-[30px] font-bold tracking-[-0.03em]">
                <span data-count={stat.n}>0</span>
                {stat.suffix}
              </div>
              <div className="mt-[6px] text-[13.5px] leading-snug text-[var(--color-muted-2)]">
                {tStats(stat.id)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
