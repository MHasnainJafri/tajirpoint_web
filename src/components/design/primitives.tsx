import { Link } from "@/i18n/navigation";

/** The mono pill with a pulsing dot that opens every page in the design. */
export function PillBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative inline-flex animate-[tpFadeUp_.7s_.05s_cubic-bezier(.22,1,.36,1)_both] items-center gap-[10px] rounded-full border border-[rgba(0,210,122,.35)] bg-[var(--color-mint-soft)] px-4 py-[7px] font-mono text-[12px] tracking-[2px] text-[var(--color-mint-2)]">
      <span className="h-[7px] w-[7px] animate-[tpPulse_2s_infinite] rounded-full bg-[var(--color-mint)]" />
      {children}
    </div>
  );
}

/** Mono section label — mint, letter-spaced. */
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
      className={`font-mono text-[12px] tracking-[2.5px] text-[var(--color-mint-2)] ${className}`}
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

const mintClasses =
  "inline-flex items-center gap-[10px] whitespace-nowrap rounded-full bg-[var(--color-mint)] font-bold text-[var(--color-mint-ink)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(0,210,122,.45)]";

export function MintButton({ href, external, children, className = "" }: ButtonProps) {
  const cls = `${mintClasses} px-8 py-[15px] text-[16px] ${className}`;
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

const ghostClasses =
  "inline-flex items-center gap-[10px] whitespace-nowrap rounded-full border border-[var(--color-line-2)] bg-[var(--surface-3)] font-semibold text-[var(--color-ink)] transition-colors duration-200 hover:bg-[var(--surface-strong)] hover:text-[var(--color-ink-2)]";

export function GhostButton({ href, external, children, className = "" }: ButtonProps) {
  const cls = `${ghostClasses} px-7 py-[15px] text-[16px] ${className}`;
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
      className={`on-dark relative mx-auto max-w-[1120px] overflow-hidden rounded-[24px] border border-[var(--color-mint-line)] px-6 py-[70px] text-center md:px-10 ${className}`}
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
