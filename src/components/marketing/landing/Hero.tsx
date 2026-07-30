import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { GhostButton, MintButton, PillBadge } from "@/components/design/primitives";
import { Shot } from "@/components/marketing/Shot";
import { HERO_MODES, HERO_SCREEN_RATIO, STATS } from "@/lib/design/catalog";
import { DeviceFrame } from "./DeviceFrame";
import { HeroModes } from "./HeroModes";
import { HeroMock } from "./HeroMock";
import { ScaledMock } from "./ScaledMock";

function Tick() {
  return (
    <svg
      aria-hidden
      width="17"
      height="17"
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-[3px] shrink-0 text-[var(--color-brand)]"
    >
      <path d="m4 10.5 4 4 8-9" />
    </svg>
  );
}

export function Hero() {
  const t = useTranslations("landing.hero");
  const tStats = useTranslations("landing.stats");

  const tabs = HERO_MODES.map((mode) => ({ id: mode.id, label: t(`modes.${mode.id}.label`) }));

  const copy = HERO_MODES.map((mode) => (
    <div key={mode.id}>
      <h2 className="text-[22px] font-semibold tracking-[-0.02em]">
        {t(`modes.${mode.id}.title`)}
      </h2>
      <p className="mt-3 max-w-[460px] text-[15.5px] leading-[1.6] text-[var(--color-muted)]">
        {t(`modes.${mode.id}.body`)}
      </p>
      <ul className="mt-5 flex flex-col gap-[10px]">
        {(t.raw(`modes.${mode.id}.bullets`) as string[]).map((bullet) => (
          <li key={bullet} className="flex gap-[10px] text-[15px] text-[var(--color-ink-3)]">
            <Tick />
            {bullet}
          </li>
        ))}
      </ul>
      <Link
        href={mode.href}
        className="mt-6 inline-flex items-center gap-2 border-b border-[var(--color-line-2)] pb-[2px] text-[15px] font-semibold text-[var(--color-ink)] transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
      >
        {t("modesCta")}
      </Link>
    </div>
  ));

  const devices = HERO_MODES.map((mode) => (
    <DeviceFrame key={mode.id}>
      <Shot
        id={`pos-${mode.id}`}
        alt={t(`modes.${mode.id}.alt`)}
        ratio={HERO_SCREEN_RATIO}
        sizes="(max-width: 1024px) 92vw, 56vw"
        radius="0"
        priority={mode.id === HERO_MODES[0].id}
        // Retail ships with the coded POS mock, so the first screenful is a
        // real interface from day one rather than an empty placeholder.
        fallback={
          mode.id === "retail" ? (
            <ScaledMock>
              <HeroMock />
            </ScaledMock>
          ) : undefined
        }
      />
    </DeviceFrame>
  ));

  return (
    <section id="top" className="relative overflow-hidden px-5 pb-[70px] pt-[124px] md:px-10">
      {/* One soft brand wash. The dark device panel supplies the contrast now,
          so the background stays quiet. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-420px] h-[820px] w-[1400px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center,rgba(0,210,122,.10) 0%,rgba(0,210,122,0) 62%)",
        }}
      />

      <div className="relative mx-auto max-w-[1200px]">
        <HeroModes tabs={tabs} title={t("modesTitle")} copy={copy} devices={devices}>
          <PillBadge>{t("badge")}</PillBadge>

          <h1 className="mt-6 animate-[tpFadeUp_.8s_.1s_cubic-bezier(.22,1,.36,1)_both] text-[clamp(38px,4.6vw,62px)] font-bold leading-[1.05] tracking-[-0.035em]">
            {t("headline")}
          </h1>

          <p className="mt-5 max-w-[520px] animate-[tpFadeUp_.8s_.22s_cubic-bezier(.22,1,.36,1)_both] text-[17.5px] leading-[1.6] text-[var(--color-muted)]">
            {t("sub")}
          </p>

          <div className="mt-8 flex animate-[tpFadeUp_.8s_.32s_cubic-bezier(.22,1,.36,1)_both] flex-wrap gap-3">
            <MintButton href="/#cta">
              {t("ctaPrimary")} <span className="text-[18px]">→</span>
            </MintButton>
            <GhostButton href="/#platform">{t("ctaSecondary")}</GhostButton>
          </div>

          <p className="mt-[18px] text-[13.5px] text-[var(--color-muted-2)]">{t("note")}</p>
        </HeroModes>

        {/* ── Stats rail ────────────────────────────────────────────── */}
        <div className="mt-[70px] flex flex-wrap justify-center gap-y-6 border-t border-[var(--color-line-soft)] pt-9">
          {STATS.map((stat) => (
            <div key={stat.id} className="min-w-[170px] flex-1 px-5 text-center">
              <div className="text-[32px] font-bold tracking-[-0.03em]">
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
