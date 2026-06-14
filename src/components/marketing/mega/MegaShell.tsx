import { cn } from "@/lib/utils/cn";

export function MegaGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-[1320px] px-10 py-12 grid grid-cols-[1.05fr_2.4fr] gap-16">
      {children}
    </div>
  );
}

export interface MegaFeatProps {
  pill: React.ReactNode;
  pillBg?: string;
  pillFg?: string;
  heading: string;
  description: string;
  cta: string;
  arabic?: string;
  bgClass?: string;
  textOverride?: string;
  visBg?: string;
}

export function MegaFeat({
  pill,
  pillBg,
  pillFg,
  heading,
  description,
  cta,
  arabic,
  bgClass = "bg-gradient-to-br from-[#f6f5f1] to-[#ecede7]",
  textOverride,
  visBg,
}: MegaFeatProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[24px] p-8 min-h-[340px] flex flex-col justify-between",
        bgClass,
        textOverride
      )}
    >
      <span
        className="inline-flex items-center gap-1.5 px-[11px] py-[5px] rounded-full text-[11px] font-semibold uppercase tracking-[0.06em] self-start"
        style={{
          background: pillBg ?? "var(--color-ink)",
          color: pillFg ?? "var(--color-mint)",
        }}
      >
        {pill}
      </span>
      <div>
        <h5 className="text-[30px] leading-[1.04] tracking-[-0.03em] mt-4">{heading}</h5>
        <p className="text-[14px] mt-2.5 leading-[1.55]" style={{ color: textOverride ? "rgba(255,255,255,0.65)" : "var(--color-muted)" }}>
          {description}
        </p>
      </div>
      <div className="flex items-center gap-2.5 text-[14px] font-semibold relative z-[2]">
        <span>{cta}</span>
        <span className="ms-auto opacity-50 inline-block rtl:rotate-180">→</span>
      </div>
      <div
        className="absolute -right-10 -bottom-10 w-[240px] h-[240px] rounded-full opacity-55 pointer-events-none"
        style={{
          background:
            visBg ??
            "radial-gradient(circle at 30% 30%, var(--color-mint) 0%, var(--color-emerald) 60%, transparent 75%)",
        }}
        aria-hidden="true"
      />
      {arabic && (
        <span
          className="absolute right-6 bottom-3.5 leading-none pointer-events-none font-arabic"
          style={{
            fontFamily: "var(--font-arabic)",
            fontSize: "120px",
            fontWeight: 700,
            color: textOverride ? "rgba(0,210,122,0.18)" : "rgba(14,59,44,0.10)",
          }}
          aria-hidden="true"
        >
          {arabic}
        </span>
      )}
    </div>
  );
}

export function MegaCols({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-12">{children}</div>;
}

export function MegaCol({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <div>
      <h6 className="text-[11.5px] tracking-[0.14em] uppercase font-semibold text-[var(--color-muted-2)] mb-[22px]">
        {heading}
      </h6>
      {children}
    </div>
  );
}

export function MegaIconGrid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2 gap-1.5">{children}</div>;
}

export interface MegaIconTileProps {
  icon: React.ReactNode;
  iconBg?: string;
  iconFg?: string;
  name: string;
  sub: string;
}

export function MegaIconTile({ icon, iconBg, iconFg, name, sub }: MegaIconTileProps) {
  return (
    <button
      type="button"
      className="flex gap-3.5 p-3.5 rounded-[14px] text-left hover:bg-[var(--color-bg-3)] transition-colors"
    >
      <span
        className="w-10 h-10 shrink-0 rounded-[10px] flex items-center justify-center"
        style={{
          background: iconBg ?? "var(--color-bg-3)",
          color: iconFg ?? "var(--color-ink)",
        }}
      >
        {icon}
      </span>
      <span className="flex flex-col gap-[3px]">
        <span className="text-[14.5px] font-semibold tracking-[-0.01em] text-[var(--color-ink)]">
          {name}
        </span>
        <span className="text-[12.5px] text-[var(--color-muted)] leading-[1.45]">{sub}</span>
      </span>
    </button>
  );
}

export interface MegaListItem {
  label: string;
  small?: string;
  muted?: boolean;
}

export function MegaList({ items }: { items: MegaListItem[] }) {
  return (
    <ul className="flex flex-col gap-1" role="list">
      {items.map((item) => (
        <li key={item.label}>
          <button
            type="button"
            className={cn(
              "w-full text-left px-3 py-2.5 rounded-[10px] text-[14px] font-medium transition-colors",
              "hover:bg-[var(--color-bg-3)] hover:text-[var(--color-ink)]",
              item.muted ? "text-[var(--color-muted-2)]" : "text-[var(--color-ink-3)]"
            )}
          >
            {item.label}
            {item.small && (
              <span className="block text-[11.5px] text-[var(--color-muted-2)] mt-0.5 font-medium">
                {item.small}
              </span>
            )}
          </button>
        </li>
      ))}
    </ul>
  );
}

// Inline icon — 24x24 stroke
export function I({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}
