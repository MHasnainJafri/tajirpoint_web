import { Link } from "@/i18n/navigation";

/**
 * The small pill that opens a page above the headline. Deliberately quiet —
 * a white chip on the off-white canvas, lifted by a hairline and a diffused
 * shadow rather than a glowing tinted border.
 */
export function PillBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative inline-flex animate-[tpFadeUp_.7s_.05s_cubic-bezier(.22,1,.36,1)_both] items-center gap-[9px] rounded-full border border-[var(--color-line)] bg-[var(--color-bg-2)] px-[15px] py-[7px] text-[13.5px] font-medium text-[var(--color-ink-3)] shadow-[var(--shadow-card)]">
      <span className="h-[7px] w-[7px] rounded-full bg-[var(--color-mint)]" />
      {children}
    </div>
  );
}

/** Section label — sentence case, brand green, no tracking. */
export function Eyebrow({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-reveal
      className={`text-[13.5px] font-semibold text-[var(--color-brand)] ${className}`}
    >
      {children}
    </div>
  );
}

type ButtonProps = {
  href: string;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
};

/**
 * Primary action. Filled with the deepened brand green (5.05:1 under white
 * text) rather than bright mint, which only managed 3.5:1 at button sizes.
 */
const primaryClasses =
  "inline-flex items-center gap-[10px] whitespace-nowrap rounded-full bg-[var(--color-brand)] font-semibold text-[var(--color-on-brand)] shadow-[var(--shadow-card)] transition-[background-color,transform,box-shadow] duration-200 hover:-translate-y-[1px] hover:bg-[var(--color-brand-hover)] hover:shadow-[var(--shadow-lift)]";

export function MintButton({ href, external, children, className = "" }: ButtonProps) {
  const cls = `${primaryClasses} px-7 py-[14px] text-[16px] ${className}`;
  if (external) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Secondary action — a white chip, not a translucent grey wash. */
const ghostClasses =
  "inline-flex items-center gap-[10px] whitespace-nowrap rounded-full border border-[var(--color-line-2)] bg-[var(--color-bg-2)] font-semibold text-[var(--color-ink)] shadow-[var(--shadow-card)] transition-[transform,box-shadow] duration-200 hover:-translate-y-[1px] hover:shadow-[var(--shadow-lift)]";

export function GhostButton({ href, external, children, className = "" }: ButtonProps) {
  const cls = `${ghostClasses} px-7 py-[14px] text-[16px] ${className}`;
  if (external) {
    return (
      <a href={href} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/**
 * The gradient close-out panel. Every page in the design ends with one — the
 * landing page adds the brand mark and a grid overlay, the inner pages don't.
 */
export function CtaPanel({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      data-reveal
      className={`on-dark relative mx-auto max-w-[1120px] overflow-hidden rounded-[32px] px-6 py-[80px] text-center md:px-10 ${className}`}
      style={{ background: "linear-gradient(150deg,#0B2419,#071510 60%)" }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 50% -10%,rgba(0,210,122,.2),transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}
