import { cn } from "@/lib/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";

const buttonVariants = cva(
  [
    "inline-flex items-center gap-[10px] rounded-full font-semibold whitespace-nowrap",
    "transition-[transform,background,color,box-shadow] duration-150 ease-out",
    "hover:-translate-y-px",
    "focus-visible:outline-2 focus-visible:outline-[var(--color-mint)] focus-visible:outline-offset-3",
    "disabled:opacity-60 disabled:pointer-events-none",
    "[&_.arrow]:transition-transform [&_.arrow]:duration-200",
    "hover:[&_.arrow]:translate-x-[3px]",
  ],
  {
    variants: {
      variant: {
        // Mint is the primary action across the dark canvas.
        primary:
          "bg-[var(--color-mint)] text-[var(--color-mint-ink)] hover:shadow-[0_12px_40px_rgba(0,210,122,.45)]",
        mint: "bg-[var(--color-mint)] text-[var(--color-mint-ink)] hover:shadow-[0_12px_40px_rgba(0,210,122,.45)]",
        ghost:
          "bg-[var(--surface-3)] text-[var(--color-ink)] shadow-[inset_0_0_0_1px_var(--color-line-2)] hover:bg-[var(--surface-strong)] hover:text-[var(--color-ink-2)]",
        soft: "bg-[var(--surface-2)] text-[var(--color-ink)] shadow-[inset_0_0_0_1px_var(--color-line)] hover:bg-[var(--surface-strong)]",
        "dark-ghost":
          "bg-transparent text-[var(--color-ink)] shadow-[inset_0_0_0_1px_var(--color-line-2)] hover:bg-[var(--surface-3)]",
        outline:
          "bg-transparent text-[var(--color-mint-2)] shadow-[inset_0_0_0_1px_rgba(0,210,122,.5)] hover:bg-[rgba(0,210,122,.1)]",
      },
      size: {
        md: "px-[26px] py-4 text-[15px] min-h-[48px]",
        sm: "px-[18px] py-[10px] text-[13.5px] min-h-[44px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref as React.Ref<HTMLButtonElement>}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
