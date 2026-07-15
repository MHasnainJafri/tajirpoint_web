import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { PillBadge } from "@/components/design/primitives";
import { STATS } from "@/lib/design/catalog";
import { HeroTilt } from "./HeroTilt";
import { HeroMock } from "./HeroMock";

export function Hero() {
  const t = useTranslations("landing.hero");
  const tStats = useTranslations("landing.stats");

  return (
    <section
      id="top"
      className="relative flex flex-col items-center overflow-hidden px-5 pt-[150px] text-center md:px-10"
    >
      {/* Mint bloom behind the headline */}
      <div
        className="pointer-events-none absolute left-1/2 top-[-320px] h-[700px] w-[1200px] -translate-x-1/2"
        style={{
          background:
            "radial-gradient(ellipse at center,rgba(0,210,122,.16) 0%,rgba(0,210,122,0) 60%)",
        }}
      />
      {/* Faint grid, masked to an ellipse */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px,transparent 1px),linear-gradient(90deg,var(--grid-line) 1px,transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 70% 55% at 50% 32%,black,transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 55% at 50% 32%,black,transparent)",
        }}
      />

      <PillBadge>{t("badge")}</PillBadge>

      <h1 className="relative mt-[26px] max-w-[1060px] animate-[tpFadeUp_.8s_.15s_cubic-bezier(.22,1,.36,1)_both] text-[clamp(40px,6.4vw,88px)] font-extrabold leading-[1.02] tracking-[-0.035em]">
        {t("headline")}{" "}
        <span className="text-[var(--color-mint)] [text-shadow:0_0_44px_rgba(0,210,122,.45)]">
          {t("headlineAccent")}
        </span>
      </h1>

      <p className="relative mt-[26px] max-w-[640px] animate-[tpFadeUp_.8s_.28s_cubic-bezier(.22,1,.36,1)_both] text-[19px] leading-[1.6] text-[var(--color-muted)]">
        {t("sub")}
      </p>

      <div className="relative mt-9 flex animate-[tpFadeUp_.8s_.4s_cubic-bezier(.22,1,.36,1)_both] flex-wrap justify-center gap-4">
        <Link
          href="/#cta"
          className="inline-flex items-center gap-[10px] whitespace-nowrap rounded-full bg-[var(--color-mint)] px-[30px] py-[15px] text-[16px] font-bold text-[var(--color-mint-ink)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_36px_rgba(0,210,122,.4)]"
        >
          {t("ctaPrimary")} <span className="text-[18px]">→</span>
        </Link>
        <Link
          href="/extensions"
          className="inline-flex items-center gap-[10px] whitespace-nowrap rounded-full border border-[var(--color-line-2)] bg-[var(--surface-3)] px-7 py-[15px] text-[16px] font-semibold transition-colors duration-200 hover:border-[var(--color-line-2)] hover:bg-[var(--surface-strong)] hover:text-[var(--color-ink-2)]"
        >
          {t("ctaSecondary")}
        </Link>
      </div>

      <div className="relative mt-4 animate-[tpFadeUp_.8s_.5s_cubic-bezier(.22,1,.36,1)_both] font-mono text-[12px] text-[var(--color-muted-3)]">
        {t("note")}
      </div>

      {/* ── Product shot, tilting to the cursor ─────────────────────── */}
      <HeroTilt>
        <div className="flex items-center gap-2 border-b border-[rgba(255,255,255,.07)] bg-[var(--color-panel-2)] px-4 py-3">
          <span className="h-[11px] w-[11px] rounded-full bg-white/[0.14]" />
          <span className="h-[11px] w-[11px] rounded-full bg-white/[0.14]" />
          <span className="h-[11px] w-[11px] rounded-full bg-white/[0.14]" />
          <div className="flex flex-1 justify-center">
            <div className="rounded-[7px] bg-[var(--surface-2)] px-6 py-1 font-mono text-[11.5px] text-[var(--color-muted-3)] sm:px-[46px]">
              {t("browserUrl")}
            </div>
          </div>
        </div>
        <HeroMock />
        <span className="absolute h-px w-px overflow-hidden [clip:rect(0,0,0,0)]">
          {t("screenshotAlt")}
        </span>
      </HeroTilt>

      {/* ── Stats rail ──────────────────────────────────────────────── */}
      <div className="relative mt-[58px] flex w-[min(1120px,94vw)] flex-wrap justify-center border-t border-[var(--color-line)]">
        {STATS.map((s) => (
          <div
            key={s.id}
            className="min-w-[200px] flex-1 border-r border-[var(--color-line-soft)] px-5 py-[30px] text-center last:border-r-0"
          >
            <div className="text-[38px] font-extrabold tracking-[-0.02em]">
              <span data-count={s.n}>0</span>
              <span className="text-[var(--color-mint)]">{s.suffix}</span>
            </div>
            <div className="mt-[6px] font-mono text-[11.5px] tracking-[1.5px] text-[var(--color-muted-2)]">
              {tStats(s.id)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
