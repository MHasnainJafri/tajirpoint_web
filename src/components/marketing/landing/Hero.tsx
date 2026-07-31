import { useTranslations } from "next-intl";
import { GhostButton, MintButton, PillBadge } from "@/components/design/primitives";
import { Shot } from "@/components/marketing/Shot";
import { HeroMock } from "./HeroMock";
import { ScaledMock } from "./ScaledMock";

/**
 * One idea, one action, one product shot.
 *
 * The hardware render lives in the `hero-terminal` slot. Until it exists the
 * coded POS mock stands in, floated in the same box — so the hero reads as
 * finished either way and swaps without a layout shift.
 */

function MetaDot() {
  return <span className="text-[var(--color-muted-3)]">•</span>;
}

export function Hero() {
  const t = useTranslations("landing.hero");
  const meta = t.raw("meta") as string[];

  return (
    <section id="top" className="relative overflow-hidden">
      {/* A pale wash rather than a flat fill: brand green pooling top-right
          behind the product, fading to nothing on the left under the copy. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 80% at 88% 18%,rgba(0,210,122,.13),transparent 62%)," +
            "radial-gradient(ellipse 90% 70% at 10% 0%,rgba(0,210,122,.05),transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-5 pb-[70px] pt-[132px] md:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,47fr)_minmax(0,53fr)] lg:gap-10">
          <div>
            <PillBadge>{t("badge")}</PillBadge>

            {/* Width in px, not ch: at 13ch the browser hyphen-broke
                "all-in-one" across two lines. */}
            <h1 className="mt-7 max-w-[580px] animate-[tpFadeUp_.8s_.1s_cubic-bezier(.22,1,.36,1)_both] text-[clamp(38px,4.4vw,60px)] font-bold leading-[1.07] tracking-[-0.035em]">
              {t("headlineBefore")} <span className="text-[var(--color-brand)]">{t("accent")}</span>{" "}
              {t("headlineAfter")}
            </h1>

            <p className="mt-6 max-w-[500px] animate-[tpFadeUp_.8s_.22s_cubic-bezier(.22,1,.36,1)_both] text-[17.5px] leading-[1.65] text-[var(--color-muted)]">
              {t("sub")}
            </p>

            <div className="mt-9 flex animate-[tpFadeUp_.8s_.32s_cubic-bezier(.22,1,.36,1)_both] flex-wrap gap-3">
              <MintButton href="/#cta">
                {t("ctaPrimary")} <span className="text-[18px]">→</span>
              </MintButton>
              <GhostButton href="/#platform">{t("ctaSecondary")}</GhostButton>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-[14px] text-[var(--color-muted-2)]">
              {meta.map((item, i) => (
                <span key={item} className="flex items-center gap-4">
                  {i > 0 && <MetaDot />}
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* ── The product ──────────────────────────────────────────── */}
          <div className="relative animate-[tpFadeUp_1s_.4s_cubic-bezier(.22,1,.36,1)_both]">
            <Shot
              id="hero-terminal"
              alt={t("screenAlt")}
              ratio="3/2"
              sizes="(max-width: 1024px) 92vw, 640px"
              radius="0"
              background="transparent"
              priority
              fallback={
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full rounded-[18px] border border-[var(--color-line-2)] bg-[#0a100d] p-[9px] shadow-[var(--shadow-hero)] sm:rounded-[22px] sm:p-3">
                    <div className="relative overflow-hidden rounded-[11px] bg-white sm:rounded-[15px]">
                      <div className="relative aspect-[1857/911] w-full">
                        <ScaledMock>
                          <HeroMock />
                        </ScaledMock>
                      </div>
                    </div>
                  </div>
                </div>
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
