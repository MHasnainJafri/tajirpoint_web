import { cn } from "@/lib/utils/cn";

export type ProseProps = React.HTMLAttributes<HTMLDivElement>;

export function Prose({ className, ...props }: ProseProps) {
  return (
    <div
      className={cn(
        "prose prose-tajir max-w-none",
        "prose-headings:font-extrabold prose-headings:tracking-[-0.03em]",
        "prose-a:font-semibold prose-a:no-underline hover:prose-a:underline",
        "prose-code:rounded-[6px] prose-code:bg-white/[0.06] prose-code:px-[0.4em] prose-code:py-[0.12em] prose-code:font-normal prose-code:before:content-none prose-code:after:content-none",
        "prose-pre:border prose-pre:border-[var(--color-line)] prose-pre:rounded-[16px]",
        "prose-hr:border-[var(--color-line)]",
        className
      )}
      {...props}
    />
  );
}
