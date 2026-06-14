import { cn } from "@/lib/utils/cn";

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  right?: React.ReactNode;
}

export function SectionHeader({ right, className, children, ...props }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 mb-[60px] md:mb-[80px]",
        right && "md:flex-row md:items-end md:justify-between md:gap-16",
        className
      )}
      {...props}
    >
      <div>{children}</div>
      {right && (
        <p className="text-[17px] leading-[1.55] text-[var(--color-muted)] max-w-[420px] [.section-dark_&]:text-white/[0.65]">
          {right}
        </p>
      )}
    </div>
  );
}
