import { cn } from "@/lib/utils/cn";

export interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  subheading?: string;
}

export function DashboardShell({
  heading,
  subheading,
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{heading}</h1>
        {subheading && <p className="mt-1 text-[var(--color-fg-muted)]">{subheading}</p>}
      </div>
      {children}
    </div>
  );
}
