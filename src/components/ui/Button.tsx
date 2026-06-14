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
        primary: "bg-[var(--color-ink)] text-white hover:bg-black",
        mint: "bg-[var(--color-mint)] text-[var(--color-ink)] hover:bg-[var(--color-mint-hover)]",
        ghost:
          "bg-transparent text-[var(--color-ink)] shadow-[inset_0_0_0_1.5px_var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-white",
        soft: "bg-[var(--color-bg-3)] text-[var(--color-ink)] hover:bg-[var(--color-line)]",
        "dark-ghost":
          "bg-transparent text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.22)] hover:bg-white/[0.06]",
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
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
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
