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

/**
 * Zero-dependency code block for the developer docs. Dark surface, monospace,
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
        "relative rounded-[14px] border border-white/10 bg-[#0d0d0d] overflow-hidden",
        className
      )}
    >
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/[0.08]">
        <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-white/40">
          {label}
        </span>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 text-[12px] text-white/50 hover:text-white transition-colors cursor-pointer"
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
      <pre className="overflow-x-auto px-4 py-4 text-[13px] leading-[1.7] text-white/85">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}
