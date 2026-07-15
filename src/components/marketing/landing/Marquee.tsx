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

      <div className="mb-[22px] text-center font-mono text-[11px] tracking-[2.5px] text-[var(--color-muted-3)]">
        {t("marqueeTitle")}
      </div>

      <div className="marquee-track">
        {track.map((brand, i) => (
          <div
            key={`${brand}-${i}`}
            className="mx-[18px] flex items-center gap-[9px] whitespace-nowrap rounded-full border border-[var(--color-line)] bg-[var(--surface-2)] px-[22px] py-[10px] text-[14.5px] font-semibold text-[var(--color-muted)]"
          >
            <span className="h-[6px] w-[6px] rounded-full bg-[var(--color-mint)] opacity-70" />
            {brand}
          </div>
        ))}
      </div>
    </section>
  );
}
