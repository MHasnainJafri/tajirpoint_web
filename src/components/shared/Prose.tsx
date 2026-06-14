import { cn } from "@/lib/utils/cn";

export type ProseProps = React.HTMLAttributes<HTMLDivElement>;

export function Prose({ className, ...props }: ProseProps) {
  return (
    <div
      className={cn(
        "prose prose-neutral dark:prose-invert max-w-none",
        "prose-headings:font-semibold prose-a:text-[var(--color-accent)]",
        className
      )}
      {...props}
    />
  );
}
