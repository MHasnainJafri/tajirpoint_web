"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface CodeBlockProps {
  code: string;
  /** Short label shown top-left, e.g. "cURL", "JSON", "HTTP". */
  label?: string;
  className?: string;
}

/** Strings, comments, numbers. Anything cleverer needs a real parser. */
const TOKEN =
  /("(?:[^"\\\n]|\\.)*")|('(?:[^'\\\n]|\\.)*')|((?:^|\s)(?:\/\/|#)[^\n]*)|(\b\d+(?:\.\d+)?\b)/gm;

const TONES = [
  "text-[var(--color-mint-2)]",
  "text-[var(--color-mint-2)]",
  "text-[var(--color-muted-3)]",
  "text-[var(--color-amber)]",
];

function highlight(code: string) {
  const out: React.ReactNode[] = [];
  let cursor = 0;
  let match: RegExpExecArray | null;

  TOKEN.lastIndex = 0;
  while ((match = TOKEN.exec(code)) !== null) {
    if (match.index > cursor) out.push(code.slice(cursor, match.index));
    const group = match.slice(1).findIndex((g) => g !== undefined);
    out.push(
      <span key={match.index} className={TONES[group] ?? ""}>
        {match[0]}
      </span>
    );
    cursor = match.index + match[0].length;
  }
  if (cursor < code.length) out.push(code.slice(cursor));

  return out;
}

/**
 * Zero-dependency code block for the developer docs. Dark panel, monospace,
 * copy-to-clipboard. Forced dir="ltr" so snippets never mirror under the
 * Urdu/Arabic RTL layout.
 */
export function CodeBlock({ code, label = "Code", className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — no-op */
    }
  };

  return (
    <div
      dir="ltr"
      className={cn(
        "relative overflow-hidden rounded-[14px] border border-[var(--color-line-2)] bg-[var(--color-panel)]",
        className
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-[var(--color-line)] bg-white/[0.03] px-4 py-2.5">
        <span className="truncate font-mono text-[11px] uppercase tracking-[1.8px] text-[var(--color-mint-2)]">
          {label}
        </span>
        <button
          type="button"
          onClick={copy}
          className={cn(
            "inline-flex shrink-0 cursor-pointer items-center gap-1.5 text-[12px] transition-colors",
            copied
              ? "text-[var(--color-mint-2)]"
              : "text-[var(--color-muted-2)] hover:text-[var(--color-ink)]"
          )}
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check size={13} aria-hidden="true" /> Copied
            </>
          ) : (
            <>
              <Copy size={13} aria-hidden="true" /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-[13px] leading-[1.7] text-[var(--color-ink-3)]">
        <code className="font-mono">{highlight(code)}</code>
      </pre>
    </div>
  );
}
