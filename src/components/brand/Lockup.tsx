import { cn } from "@/lib/utils/cn";
import { Mark } from "./Mark";
import { cva, type VariantProps } from "class-variance-authority";

const lockupVariants = cva("inline-flex items-center gap-[11px] leading-none", {
  variants: {
    size: {
      md: "[--mark-size:32px] [--ar-size:21px] [--pt-size:19px] [--div-h:18px]",
      sm: "[--mark-size:24px] [--ar-size:15px] [--pt-size:14px] [--div-h:14px]",
    },
    variant: {
      "on-light": "[--lockup-fg:var(--color-ink)]",
      "on-dark": "[--lockup-fg:#fff]",
    },
  },
  defaultVariants: { size: "md", variant: "on-light" },
});

export interface LockupProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof lockupVariants> {}

export function Lockup({ className, size, variant, ...props }: LockupProps) {
  return (
    <span
      className={cn(lockupVariants({ size, variant }), className)}
      aria-label="Tajir Point"
      {...props}
    >
      <Mark
        variant={variant === "on-dark" ? "on-dark" : "on-light"}
        style={{ width: "var(--mark-size)", height: "var(--mark-size)" }}
      />
      <span className="flex items-center gap-[9px]">
        <span
          className="font-arabic font-bold leading-none"
          style={{
            fontFamily: "var(--font-arabic)",
            direction: "rtl",
            fontSize: "var(--ar-size)",
            color: "var(--lockup-fg)",
            fontWeight: 700,
          }}
        >
          تاجر
        </span>
        <span
          className="block opacity-[0.22]"
          style={{
            width: "1px",
            height: "var(--div-h)",
            background: "var(--lockup-fg)",
          }}
        />
        <span
          className="font-bold leading-none"
          style={{
            fontSize: "var(--pt-size)",
            letterSpacing: "-0.03em",
            color: "var(--lockup-fg)",
          }}
        >
          point
          <span className="font-extrabold" style={{ color: "var(--color-mint)" }}>
            .
          </span>
        </span>
      </span>
    </span>
  );
}
