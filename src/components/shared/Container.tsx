import { cn } from "@/lib/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

const containerVariants = cva("mx-auto w-full px-7 lg:px-10", {
  variants: {
    size: {
      default: "max-w-[1320px]",
      tight: "max-w-[1140px]",
    },
  },
  defaultVariants: { size: "default" },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

export function Container({ className, size, ...props }: ContainerProps) {
  return <div className={cn(containerVariants({ size }), className)} {...props} />;
}
