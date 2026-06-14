import { cn } from "@/lib/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const sectionVariants = cva("relative", {
  variants: {
    spacing: {
      default: "py-[96px] lg:py-[160px]",
      compact: "py-[80px] lg:py-[120px]",
    },
    tone: {
      light: "bg-[var(--color-bg)] text-[var(--color-ink)]",
      "light-2": "bg-[var(--color-bg-2)] text-[var(--color-ink)]",
      dark: "section-dark bg-[var(--color-ink)] text-white/[0.78]",
    },
  },
  defaultVariants: { spacing: "default", tone: "light" },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {}

export function Section({ className, spacing, tone, ...props }: SectionProps) {
  return <section className={cn(sectionVariants({ spacing, tone }), className)} {...props} />;
}
