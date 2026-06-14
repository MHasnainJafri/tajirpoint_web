import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { HeroStage } from "./HeroStage";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative pt-20 overflow-hidden bg-white" aria-labelledby="hero-heading">
      {/* Radial gradient blobs */}
      <span
        className="absolute -right-[260px] -top-[180px] w-[760px] h-[760px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(0,210,122,0.18) 0%, rgba(0,210,122,0) 60%)",
        }}
        aria-hidden="true"
      />
      <span
        className="absolute -left-[200px] -bottom-[200px] w-[560px] h-[560px] rounded-full pointer-events-none z-0"
        style={{
          background: "radial-gradient(circle, rgba(14,59,44,0.09) 0%, rgba(14,59,44,0) 60%)",
        }}
        aria-hidden="true"
      />

      <div
        className="
          relative z-[2] mx-auto max-w-[1320px] px-7 lg:px-10
          lg:grid lg:grid-cols-[minmax(0,1.04fr)_minmax(0,1fr)] lg:gap-x-[72px]
          lg:[grid-template-areas:'headline_stage'_'row_stage'_'meta_meta'_'strip_strip']
          lg:items-start
        "
      >
        <div className="lg:[grid-area:headline]">
          <Eyebrow withDot>{t("eyebrow")}</Eyebrow>
          <h1 id="hero-heading" className="display-1 mt-6 lg:!text-[clamp(60px,6.4vw,108px)]">
            {t("headline")}
            <br />
            <span className="relative inline-block">
              {t("highlight")}
              <span
                className="absolute left-0 right-0 -bottom-1 h-2 rounded-full bg-[var(--color-mint)] opacity-90"
                aria-hidden="true"
              />
            </span>
          </h1>
        </div>

        <div className="flex flex-col gap-7 mt-10 items-start lg:[grid-area:row] lg:flex-col lg:gap-7">
          <p className="text-[20px] lg:text-[22px] text-[var(--color-muted)] max-w-[520px] leading-[1.5]">
            {t("subhead")}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="primary">
              <a href="https://app.tajirpoint.com/signup" target="_blank" rel="noopener noreferrer">
                {t("startFree")} <span className="arrow">→</span>
              </a>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/book-demo">{t("bookDemo")}</Link>
            </Button>
          </div>
        </div>

        {/* Stage: shown on sm+ but hidden on very small screens where it adds no value */}
        <div className="lg:[grid-area:stage] hidden sm:block">
          <HeroStage />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-y-6 gap-x-12 mt-12 pt-11 lg:[grid-area:meta]">
          <Stat label={t("stats.madeForLabel")} value={t("stats.madeForValue")} />
          <Stat label={t("stats.languagesLabel")} value={t("stats.languagesValue")} />
          <Stat label={t("stats.offlineLabel")} value={t("stats.offlineValue")} />
          <Stat label={t("stats.appsLabel")} value={t("stats.appsValue")} />
        </div>

        <div className="lg:[grid-area:strip] mt-12 pt-12 border-t border-[var(--color-line)]">
          <p className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-[var(--color-muted-2)] text-center mb-7">
            {t("trustedBy")}
          </p>
          <ul
            className="flex flex-wrap items-center justify-center gap-y-3"
            role="list"
            aria-label="Representative merchants using Tajir Point"
          >
            {[
              "Noor General Store",
              "Mehran Cash & Carry",
              "City Mart",
              "Khan Traders",
              "Gulberg Grocers",
              "Sunrise Mini Mart",
              "Frontier Cash & Carry",
            ].map((name, i) => (
              <li key={name} className="flex items-center">
                {i > 0 && (
                  <span
                    className="mx-5 hidden h-1 w-1 rounded-full bg-[var(--color-line)] sm:inline-block"
                    aria-hidden="true"
                  />
                )}
                <span className="whitespace-nowrap text-[15px] font-semibold tracking-[-0.01em] text-[var(--color-ink-3)]">
                  {name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1">
      <b className="text-[14px] font-semibold text-[var(--color-ink)] tracking-[-0.01em]">
        {value}
      </b>
      <span className="text-[13px] text-[var(--color-muted-2)]">{label}</span>
    </div>
  );
}
