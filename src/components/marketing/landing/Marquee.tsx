import { useTranslations } from "next-intl";
import { MARQUEE_BRANDS } from "@/lib/design/catalog";

/** Infinite brand rail. The list is duplicated so the -50% translate loops seamlessly. */
export function Marquee() {
  const t = useTranslations("landing");
  const track = [...MARQUEE_BRANDS, ...MARQUEE_BRANDS];

  return (
    <section className="relative overflow-hidden border-b border-[var(--color-line-soft)] py-11">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[2] w-[180px] bg-[linear-gradient(90deg,var(--color-bg),transparent)]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-[2] w-[180px] bg-[linear-gradient(-90deg,var(--color-bg),transparent)]" />

      <div className="mb-[26px] text-center text-[14px] text-[var(--color-muted-2)]">
        {t("marqueeTitle")}
      </div>

      {/* Plain wordmarks, spaced and muted — the bordered chips with pulsing
          dots read as UI, where this rail should read as a logo ribbon. */}
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
    </section>
  );
}
