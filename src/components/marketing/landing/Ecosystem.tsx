import { useTranslations } from "next-intl";
import { Shot } from "@/components/marketing/Shot";

/**
 * The "one system, three surfaces" band: back office, the till itself, and the
 * customer's phone. Built as an overlapping collage on an off-white band so
 * the three surfaces read as one product rather than three features.
 *
 * The overlap is grid columns plus a negative margin on the centre card — no
 * absolute positioning — so it degrades to a clean stack on small screens.
 */

const PILL =
  "inline-flex items-center gap-[10px] rounded-full border border-[var(--color-line)] bg-[var(--color-bg-2)] py-[7px] pl-[15px] pr-[9px] text-[13.5px] font-semibold text-[var(--color-ink)] shadow-[var(--shadow-card)]";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className={PILL}>
      {children}
      <span
        aria-hidden
        className="inline-flex h-[19px] w-[19px] items-center justify-center rounded-full bg-[var(--color-mint-soft)] text-[var(--color-brand)]"
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 12 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <path d="M6 2.5v7M2.5 6h7" />
        </svg>
      </span>
    </span>
  );
}

export function Ecosystem() {
  const t = useTranslations("landing.ecosystem");

  return (
    <section className="pt-[110px]">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <h2
          data-reveal
          className="max-w-[18ch] text-[clamp(32px,4vw,56px)] font-bold leading-[1.06] tracking-[-0.035em]"
        >
          {t("headline")}
        </h2>
        <p
          data-reveal
          className="mt-5 max-w-[580px] text-[17.5px] leading-[1.6] text-[var(--color-muted)]"
        >
          {t("sub")}
        </p>
      </div>

      <div className="mt-16 bg-[var(--color-bg-3)] px-5 py-[70px] md:px-10 lg:py-[100px]">
        <div
          data-reveal
          className="mx-auto grid max-w-[1120px] grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-0"
        >
          {/* Back office — laptop, sits low and left */}
          <div className="relative z-10 lg:col-span-5 lg:mt-24">
            {/* Logical `start-*`, not `left-*`: the site renders RTL in Urdu
                and Arabic, where these pills must flip with the layout. */}
            <div className="absolute -top-4 start-5 z-30 lg:start-7">
              <Pill>{t("pills.backOffice")}</Pill>
            </div>
            <Shot
              id="eco-back-office"
              alt={t("shots.backOffice")}
              label={t("shots.backOffice")}
              ratio="16/11"
              sizes="(max-width: 1100px) 92vw, 42vw"
              className="shadow-[var(--shadow-card)]"
            />
          </div>

          {/* The counter itself — tallest, overlaps both neighbours */}
          <div className="relative z-20 lg:col-span-4 lg:-mx-8">
            <Shot
              id="eco-counter"
              alt={t("shots.counter")}
              label={t("shots.counter")}
              ratio="4/5"
              sizes="(max-width: 1100px) 92vw, 34vw"
              className="shadow-[var(--shadow-lift)]"
            />
            <div className="absolute -bottom-5 start-5 z-30 lg:start-8">
              <Pill>{t("pills.pos")}</Pill>
            </div>
          </div>

          {/* Online — the customer's phone, sits lowest and right */}
          <div className="relative z-10 lg:col-span-3 lg:mt-36">
            <div className="absolute -top-4 start-5 z-30">
              <Pill>{t("pills.online")}</Pill>
            </div>
            <Shot
              id="eco-online"
              alt={t("shots.online")}
              label={t("shots.online")}
              ratio="3/4"
              sizes="(max-width: 1100px) 92vw, 24vw"
              className="shadow-[var(--shadow-card)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
