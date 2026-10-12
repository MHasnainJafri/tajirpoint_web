import { Link } from "@/i18n/navigation";
import { Tick } from "@/components/marketing/landing/Stroke";
import { MIGRATION, type BusinessSlug } from "@/lib/marketing/businesses";

/** "Switching? We move your data for free" — on the home and business pages. */
export function MigrationBand({ slug, id = "switching" }: { slug?: BusinessSlug; id?: string }) {
  const href = `/book-demo?migrate=1${slug ? `&type=${slug}` : ""}`;
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-[86px] rounded-[26px] border border-[var(--color-mint-line)] bg-[var(--color-mint-soft)] p-[clamp(22px,4vw,48px)]"
    >
      <div className="grid items-center gap-[clamp(20px,4vw,48px)] lg:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="eyebrow">{MIGRATION.eyebrow}</div>
          <h2
            id={`${id}-title`}
            className="mt-3 max-w-[22ch] text-[clamp(24px,3.2vw,38px)] font-bold leading-[1.12] tracking-[-0.03em] text-balance text-[var(--color-ink)]"
          >
            {MIGRATION.headline}
          </h2>
          <p className="mt-3 max-w-[54ch] text-[15px] leading-[1.65] text-[var(--color-body)]">{MIGRATION.sub}</p>
          <Link
            href={href}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#0A0A0A] px-6 py-3 text-[14.5px] font-bold text-white transition-transform duration-200 hover:-translate-y-[2px]"
          >
            {MIGRATION.cta} <span aria-hidden="true">→</span>
          </Link>
        </div>
        <ul className="flex flex-col gap-3">
          {MIGRATION.points.map((p) => (
            <li
              key={p}
              className="flex items-start gap-3 rounded-[14px] bg-white px-4 py-3 text-[14.5px] font-medium text-[var(--color-ink)] shadow-[var(--shadow-card)]"
            >
              <span className="mt-[1px] text-[var(--color-mint-2)]">
                <Tick size={18} />
              </span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
