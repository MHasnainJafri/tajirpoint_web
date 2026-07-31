import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Eyebrow } from "@/components/design/primitives";
import { Shot } from "@/components/marketing/Shot";
import { HERO_MODES, HERO_SCREEN_RATIO } from "@/lib/design/catalog";
import { DeviceFrame } from "./DeviceFrame";
import { ModeSwitcher } from "./ModeSwitcher";
import { HeroMock } from "./HeroMock";
import { ScaledMock } from "./ScaledMock";

/**
 * "The same POS, set up for your trade." A tab per trade swaps the copy and
 * the screen — the section that used to be crammed into the hero, and the one
 * that replaced the six-industry grid: same ground, but it shows the product
 * instead of listing icons, and each panel links to its /solutions page.
 */

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

export function PosModes() {
  const t = useTranslations("landing.posModes");

  const tabs = HERO_MODES.map((mode) => ({ id: mode.id, label: t(`items.${mode.id}.label`) }));

  const copy = HERO_MODES.map((mode) => (
    <div key={mode.id}>
      <h3 className="text-[26px] font-semibold tracking-[-0.025em]">
        {t(`items.${mode.id}.title`)}
      </h3>
      <p className="mt-4 max-w-[440px] text-[16px] leading-[1.6] text-[var(--color-muted)]">
        {t(`items.${mode.id}.body`)}
      </p>
      <ul className="mt-6 flex flex-col gap-3">
        {(t.raw(`items.${mode.id}.bullets`) as string[]).map((bullet) => (
          <li key={bullet} className="flex gap-[10px] text-[15.5px] text-[var(--color-ink-3)]">
            <Tick />
            {bullet}
          </li>
        ))}
      </ul>
      <Link
        href={mode.href}
        className="mt-7 inline-flex items-center gap-2 border-b border-[var(--color-line-2)] pb-[2px] text-[15px] font-semibold text-[var(--color-ink)] transition-colors hover:border-[var(--color-brand)] hover:text-[var(--color-brand)]"
      >
        {t("cta")}
      </Link>
    </div>
  ));

  const devices = HERO_MODES.map((mode) => (
    <DeviceFrame key={mode.id}>
      <Shot
        id={`pos-${mode.id}`}
        alt={t(`items.${mode.id}.alt`)}
        ratio={HERO_SCREEN_RATIO}
        sizes="(max-width: 1024px) 92vw, 58vw"
        radius="0"
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
    <section className="border-y border-[var(--color-line-soft)] bg-[var(--color-bg-2)]">
      <div className="mx-auto max-w-[1200px] px-5 py-[110px] md:px-10">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2
          data-reveal
          className="mt-4 max-w-[17ch] text-[clamp(32px,4vw,56px)] font-bold leading-[1.06] tracking-[-0.035em]"
        >
          {t("headline")}
        </h2>
        <p
          data-reveal
          className="mt-5 max-w-[560px] text-[17.5px] leading-[1.6] text-[var(--color-muted)]"
        >
          {t("sub")}
        </p>

        <div className="mt-12">
          <ModeSwitcher tabs={tabs} label={t("headline")} copy={copy} devices={devices} />
        </div>
      </div>
    </section>
  );
}
