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
        "mb-6 inline-flex items-center gap-[10px] text-[13.5px] font-semibold",
        variant === "on-dark" ? "text-[var(--color-mint)]" : "text-[var(--color-brand)]",
        className
      )}
      {...props}
    >
      {withDot && (
        <span
          className="inline-block h-[7px] w-[7px] animate-[tpPulse_2s_infinite] rounded-full bg-[var(--color-mint)]"
          style={{ boxShadow: "0 0 0 3px rgba(0,210,122,0.18)" }}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}
