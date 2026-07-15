import { cn } from "@/lib/utils/cn";

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  right?: React.ReactNode;
}

export function SectionHeader({ right, className, children, ...props }: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-[60px] flex flex-col gap-6 md:mb-[80px]",
        right && "md:flex-row md:items-end md:justify-between md:gap-16",
        className
      )}
      {...props}
    >
      <div className="text-[var(--color-ink)]">{children}</div>
      {right && (
        <p className="max-w-[420px] text-[17px] leading-[1.55] text-[var(--color-muted)]">
          {right}
        </p>
      )}
    </div>
  );
}
