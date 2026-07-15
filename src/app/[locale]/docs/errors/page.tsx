import type { Metadata } from "next";

import { CodeBlock } from "@/components/marketing/CodeBlock";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Errors — Tajir Point API",
  description:
    "Every error uses the same envelope: a status code, a message, and a details object naming the offending fields.",
  path: "/docs/errors",
});

const ENVELOPE = `{
  "error": {
    "code": 400,
    "message": "Validation failed.",
    "details": {
      "items": {
        "0": {
          "quantity": ["Must be greater than zero."]
        }
      }
    }
  }
}`;

const CONFLICT = `{
  "error": {
    "code": 409,
    "message": "Need 5 but only 2 available for NES-200 at Main Store.",
    "details": {
      "variant": "NES-200",
      "requested": "5.000",
      "available": "2.000"
    }
  }
}`;

const CODES: Array<{ code: string; title: string; body: string; retry: string }> = [
  {
    code: "400",
    title: "Bad request",
    body: "Validation failed. `details` names the offending fields, nested to match your payload.",
    retry: "Fix the payload. Retrying unchanged will fail again.",
  },
  {
    code: "401",
    title: "Unauthenticated",
    body: "The access token is missing, malformed, or expired.",
    retry: "Refresh the token and retry once.",
  },
  {
    code: "403",
    title: "Forbidden",
    body: "You are authenticated but not allowed: your role lacks the permission, or X-Shop-Id names a shop this credential cannot reach.",
    retry: "Do not retry. Fix the permission or the shop id.",
  },
  {
    code: "404",
    title: "Not found",
    body: "No such record *in this shop*. A valid id from another shop is a 404 here, not a 403 — we do not confirm that other shops' records exist.",
    retry: "Do not retry.",
  },
  {
    code: "409",
    title: "Conflict",
    body: "The operation is valid but the world disagrees — most often insufficient stock.",
    retry: "Re-read the current state before retrying.",
  },
  {
    code: "429",
    title: "Rate limited",
    body: "1,000 requests per hour per shop. A Retry-After header tells you how many seconds to wait.",
    retry: "Back off for Retry-After seconds, then retry.",
  },
  {
    code: "500 / 503",
    title: "Server error",
    body: "Something broke on our side, or a dependency is unavailable.",
    retry: "Retry with exponential backoff. If the write was idempotent, retrying is safe.",
  },
];

export default function ErrorsPage() {
  return (
    <div className="flex max-w-[860px] flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="font-mono text-[12px] uppercase tracking-[2.5px] text-[var(--color-mint-2)]">
          Getting started
        </span>
        <h1 className="text-[36px] font-extrabold tracking-[-0.035em] text-[var(--color-ink)]">
          Errors
        </h1>
        <p className="text-[15.5px] leading-[1.7] text-[var(--color-muted)]">
          Conventional HTTP status codes, and one envelope for every failure — so you can write a
          single error handler and be done.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <CodeBlock label="JSON — error envelope" code={ENVELOPE} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[22px] font-extrabold tracking-[-0.03em] text-[var(--color-ink)]">
          Status codes
        </h2>
        <div className="overflow-hidden rounded-[14px] border border-[var(--color-line)] bg-white/[0.015]">
          <div className="hidden gap-5 border-b border-[var(--color-line)] bg-white/[0.04] px-4 py-2 sm:flex">
            <span className="w-[110px] shrink-0 font-mono text-[10px] uppercase tracking-[1.6px] text-[var(--color-muted-3)]">
              Status
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[1.6px] text-[var(--color-muted-3)]">
              What it means · what to do
            </span>
          </div>
          {CODES.map((c, i) => (
            <div
              key={c.code}
              className={`flex flex-col gap-1.5 px-4 py-4 transition-colors hover:bg-white/[0.02] sm:flex-row sm:gap-5 ${
                i > 0 ? "border-t border-[var(--color-line)]" : ""
              }`}
            >
              <div className="shrink-0 sm:w-[110px]">
                <code
                  className={`font-mono text-[13px] font-bold ${
                    c.code.startsWith("5")
                      ? "text-[var(--color-berry)]"
                      : "text-[var(--color-amber)]"
                  }`}
                >
                  {c.code}
                </code>
                <p className="mt-1 text-[12.5px] font-semibold text-[var(--color-ink)]">
                  {c.title}
                </p>
              </div>
              <div className="flex min-w-0 flex-col gap-1">
                <p className="text-[13.5px] leading-[1.6] text-[var(--color-muted)]">{c.body}</p>
                <p className="text-[12.5px] font-medium text-[var(--color-ink-3)]">{c.retry}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[22px] font-extrabold tracking-[-0.03em] text-[var(--color-ink)]">
          Insufficient stock
        </h2>
        <p className="text-[15px] leading-[1.7] text-[var(--color-muted)]">
          The one you will hit in the wild. A sale is rejected in full — we never sell you part of a
          basket — and nothing is written: no stock moved, no payment taken, no ledger entry.
        </p>
        <CodeBlock label="JSON — 409" code={CONFLICT} />
      </section>
    </div>
  );
}
