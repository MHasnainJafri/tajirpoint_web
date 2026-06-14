import { cn } from "@/lib/utils/cn";

export interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  withDot?: boolean;
  variant?: "on-light" | "on-dark";
}

export function Eyebrow({
  withDot = false,
  variant = "on-light",
  className,
  children,
  ...props
}: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[10px] text-[13px] font-semibold tracking-[0.02em] mb-6",
        variant === "on-light"
          ? "text-[var(--color-muted)]"
          : "text-white/[0.68]",
        className
      )}
      {...props}
    >
      <span
        className="inline-block h-px w-[18px]"
        style={{
          background: variant === "on-light" ? "var(--color-ink)" : "var(--color-mint)",
        }}
        aria-hidden="true"
      />
      {withDot && (
        <span
          className="inline-block h-[7px] w-[7px] rounded-full bg-[var(--color-mint)]"
          style={{ boxShadow: "0 0 0 3px rgba(0,210,122,0.18)" }}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
