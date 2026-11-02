import { Fragment } from "react";
import { Link } from "@/i18n/navigation";

/**
 * Renders a guide's inline markup: [label](href) and **bold**. Internal paths
 * go through the locale-aware Link; external ones open in a new tab.
 */
const TOKEN = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;

const linkCls =
  "font-semibold text-[var(--color-mint-2)] underline decoration-[var(--color-mint-line)] underline-offset-[3px] hover:decoration-current";

export function GuideText({ text }: { text: string }) {
  const out: React.ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(TOKEN)) {
    const at = m.index ?? 0;
    if (at > last) out.push(<Fragment key={i++}>{text.slice(last, at)}</Fragment>);
    if (m[1] && m[2]) {
      const [label, href] = [m[1], m[2]];
      out.push(
        href.startsWith("/") ? (
          <Link key={i++} href={href} className={linkCls}>
            {label}
          </Link>
        ) : (
          <a key={i++} href={href} target="_blank" rel="noopener noreferrer" className={linkCls}>
            {label}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )
      );
    } else if (m[3]) {
      out.push(
        <strong key={i++} className="font-bold text-[var(--color-ink)]">
          {m[3]}
        </strong>
      );
    }
    last = at + m[0].length;
  }
  if (last < text.length) out.push(<Fragment key={i++}>{text.slice(last)}</Fragment>);
  return <>{out}</>;
}
