import { cn } from "@/lib/utils/cn";

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  subheading?: string;
  eyebrow?: string;
}

export function PageHeader({ heading, subheading, eyebrow, className, ...props }: PageHeaderProps) {
  return (
    <div className={cn("relative text-center", className)} {...props}>
      <div
        className="pointer-events-none absolute left-1/2 top-[-300px] h-[640px] w-[1100px] -translate-x-1/2"
        style={{
          background: "radial-gradient(ellipse at center,rgba(0,210,122,.15),transparent 60%)",
        }}
        aria-hidden="true"
      />

      {eyebrow && (
        <div className="relative inline-flex items-center gap-[10px] rounded-full border border-[rgba(0,210,122,.35)] bg-[var(--color-mint-soft)] px-4 py-[7px] font-mono text-[12px] tracking-[2px] text-[var(--color-mint-2)]">
          <span className="h-[7px] w-[7px] animate-[tpPulse_2s_infinite] rounded-full bg-[var(--color-mint)]" />
          {eyebrow}
        </div>
      )}

      <h1 className="relative mt-6 text-[clamp(36px,5.4vw,72px)] font-extrabold leading-[1.04] tracking-[-0.035em] text-[var(--color-ink)]">
        {heading}
      </h1>

      {subheading && (
        <p className="relative mx-auto mt-[22px] max-w-[580px] text-[18px] leading-[1.6] text-[var(--color-muted)]">
          {subheading}
        </p>
      )}
    </div>
  );
}
