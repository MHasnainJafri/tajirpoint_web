import { cn } from "@/lib/utils/cn";

export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  subheading?: string;
  eyebrow?: string;
}

export function PageHeader({ heading, subheading, eyebrow, className, ...props }: PageHeaderProps) {
  return (
    <div className={cn("space-y-4 text-center", className)} {...props}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--color-accent)]">
          {eyebrow}
        </p>
      )}
      <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">{heading}</h1>
      {subheading && (
        <p className="mx-auto max-w-2xl text-lg text-[var(--color-fg-muted)]">{subheading}</p>
      )}
    </div>
  );
}
