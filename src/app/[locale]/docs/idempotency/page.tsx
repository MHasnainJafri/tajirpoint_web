import type { Metadata } from "next";
import { AlertTriangle } from "lucide-react";

import { CodeBlock } from "@/components/marketing/CodeBlock";
import { API_BASE } from "@/lib/docs/examples";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Idempotency — Tajir Point API",
  description:
    "Send an Idempotency-Key on sales and payments so a retried request cannot create a duplicate. Keys are held for 24 hours.",
  path: "/docs/idempotency",
});

const SNIPPET = `curl -X POST ${API_BASE}/sales/sales/ \\
  -H "Authorization: Bearer $TAJIR_TOKEN" \\
  -H "X-Shop-Id: 8f1c2d3e-…" \\
  -H "Idempotency-Key: sale-till3-2026-07-11-000148" \\
  -H "Content-Type: application/json" \\
  -d '{
    "warehouse": 1,
    "items": [
      { "variant": 88, "quantity": "2.000", "unit_price": "450.00" }
    ],
    "payments": [
      { "payment_method": 1, "amount": "900.00" }
    ]
  }'`;

export default function IdempotencyPage() {
  return (
    <div className="flex max-w-[860px] flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--color-mint)]">
          Getting started
        </span>
        <h1 className="text-[36px] font-extrabold tracking-[-0.035em] text-[var(--color-ink)]">
          Idempotency
        </h1>
        <p className="text-[15.5px] leading-[1.7] text-[var(--color-muted)]">
          A till loses Wi-Fi mid-sale. Your code retries. Did the first request land? Without an
          idempotency key, the honest answer is that you cannot know — and the customer gets charged
          twice.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <p className="text-[15px] leading-[1.7] text-[var(--color-muted)]">
          Send an <code className="doc-code">Idempotency-Key</code> header on every write that moves
          money — sales and payments. Generate one unique string per <em>logical operation</em>, not
          per HTTP attempt. If the same key arrives again within{" "}
          <span className="font-semibold text-[var(--color-ink)]">24 hours</span>, we replay the
          original response instead of doing the work twice.
        </p>
        <CodeBlock label="cURL — idempotent sale" code={SNIPPET} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[22px] font-extrabold tracking-[-0.03em] text-[var(--color-ink)]">
          Choosing a key
        </h2>
        <ul className="flex flex-col gap-2.5 text-[14.5px] leading-[1.7] text-[var(--color-muted)]">
          <li>
            <span className="font-semibold text-[var(--color-ink)]">
              Reuse the key when retrying
            </span>{" "}
            the same operation — that is the entire point. A fresh key on a retry creates a
            duplicate sale.
          </li>
          <li>
            <span className="font-semibold text-[var(--color-ink)]">Generate a new key</span> for a
            genuinely new operation, even if the payload is byte-identical. Two customers really can
            buy the same thing for the same price a second apart.
          </li>
          <li>
            <span className="font-semibold text-[var(--color-ink)]">Make it unique to you</span> — a
            UUID, or something structured like{" "}
            <code className="doc-code">sale-till3-2026-07-11-000148</code>. Keys are scoped to your
            shop, so you cannot collide with anyone else.
          </li>
        </ul>
      </section>

      <div className="flex items-start gap-3 rounded-[14px] border border-[var(--color-amber)]/30 bg-[var(--color-amber)]/[0.06] p-5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[var(--color-amber)]/15 text-[var(--color-amber)]">
          <AlertTriangle size={16} aria-hidden="true" />
        </div>
        <p className="text-[13.5px] leading-[1.65] text-[var(--color-muted)]">
          Only successful responses are cached. A request that failed with a{" "}
          <code className="doc-code">400</code> or a <code className="doc-code">500</code> can
          always be retried with the same key — so on a timeout, where you genuinely do not know
          what happened, retrying with the original key is always the correct move.
        </p>
      </div>
    </div>
  );
}
