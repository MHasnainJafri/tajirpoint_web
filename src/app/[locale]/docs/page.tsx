import type { Metadata } from "next";
import Link from "next/link";
import { Boxes, KeyRound, Webhook, Zap } from "lucide-react";

import { CodeBlock } from "@/components/marketing/CodeBlock";
import { API_BASE } from "@/lib/docs/examples";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Tajir Point API — Documentation",
  description:
    "REST API for products, inventory, sales, khata, and payments. JSON over HTTPS, bearer auth, cursor pagination, idempotent writes, and signed webhooks.",
  path: "/docs",
  keywords: ["Tajir Point API", "POS API", "REST API", "developer documentation"],
});

const FIRST_CALL = `curl ${API_BASE}/catalog/products/ \\
  -H "Authorization: Bearer $TAJIR_TOKEN" \\
  -H "X-Shop-Id: 8f1c2d3e-4b5a-6c7d-8e9f-0a1b2c3d4e5f"`;

const HEADERS = [
  {
    name: "Authorization",
    when: "Every request",
    desc: "Bearer <access token>. See Get your API key.",
  },
  {
    name: "X-Shop-Id",
    when: "Every request",
    desc: "The shop you are acting on. Every response is scoped to it — the same credentials serve a merchant with one branch or fifty.",
  },
  {
    name: "Content-Type",
    when: "Writes",
    desc: "application/json on POST, PUT and PATCH.",
  },
  {
    name: "Idempotency-Key",
    when: "Sales & payments",
    desc: "A unique string per logical operation, so a retry cannot double-charge. See Idempotency.",
  },
];

export default function DocsIndexPage() {
  return (
    <div className="flex max-w-[860px] flex-col gap-12">
      <header className="flex flex-col gap-4">
        <h1 className="text-[40px] font-extrabold leading-[1.1] tracking-[-0.04em] text-[var(--color-ink)]">
          Tajir Point API
        </h1>
        <p className="text-[16.5px] leading-[1.7] text-[var(--color-muted)]">
          A REST API over your shop: products, stock, sales, khata, and payments. Predictable
          resource URLs, JSON in and out, cursor pagination, idempotent writes, and signed webhooks
          so you can react to events instead of polling for them.
        </p>
        {/* `flex-wrap` + `max-w-full`: the URL alone is 240px, which pushed
            this chip past the viewport on a 320–360px phone. */}
        <div className="mt-1 flex w-fit max-w-full flex-wrap items-center gap-x-3 gap-y-1 rounded-[12px] border border-[var(--color-line)] bg-[var(--surface-2)] px-4 py-2.5">
          <span className="text-[12px] font-semibold text-[var(--color-muted-2)]">Base URL</span>
          <code className="break-all font-mono text-[13.5px] text-[var(--color-brand)]">
            {API_BASE}
          </code>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[
          {
            icon: <KeyRound size={17} />,
            title: "Get your API key",
            body: "Authenticate, then send a token and a shop id on every call.",
            href: "/docs/authentication",
          },
          {
            icon: <Boxes size={17} />,
            title: "Products",
            body: "The catalog: products, variants, SKUs and barcodes.",
            href: "/docs/products",
          },
          {
            icon: <Zap size={17} />,
            title: "Sales",
            body: "Create an invoice. Stock, tax and khata settle in one transaction.",
            href: "/docs/sales",
          },
          {
            icon: <Webhook size={17} />,
            title: "Webhooks",
            body: "Get told when a sale, payment or low-stock event happens.",
            href: "/docs/webhooks",
          },
        ].map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group rounded-[18px] border border-[var(--color-line)] bg-white/[0.025] p-5 transition-colors hover:border-[var(--color-mint-line)] hover:bg-white/[0.05]"
          >
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-[10px] border border-[var(--color-mint-line)] bg-[var(--color-mint-soft)] text-[var(--color-mint-2)]">
              {c.icon}
            </div>
            <h3 className="mb-1 text-[14.5px] font-bold text-[var(--color-ink)]">{c.title}</h3>
            <p className="text-[13px] leading-[1.55] text-[var(--color-muted)]">{c.body}</p>
          </Link>
        ))}
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[24px] font-extrabold tracking-[-0.03em] text-[var(--color-ink)]">
          Your first request
        </h2>
        <p className="text-[15px] leading-[1.7] text-[var(--color-muted)]">
          List the products in a shop. Swap in your token and shop id:
        </p>
        <CodeBlock label="cURL" code={FIRST_CALL} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[24px] font-extrabold tracking-[-0.03em] text-[var(--color-ink)]">
          Request headers
        </h2>
        <div className="overflow-hidden rounded-[14px] border border-[var(--color-line)] bg-white/[0.015]">
          <div className="hidden gap-4 border-b border-[var(--color-line)] bg-white/[0.04] px-4 py-2 sm:flex">
            <span className="w-[180px] shrink-0 text-[12px] font-semibold text-[var(--color-muted-2)]">
              Header
            </span>
            <span className="text-[12px] font-semibold text-[var(--color-muted-2)]">
              What it is for
            </span>
          </div>
          {HEADERS.map((h, i) => (
            <div
              key={h.name}
              className={`flex flex-col gap-1 px-4 py-3.5 transition-colors hover:bg-white/[0.02] sm:flex-row sm:gap-4 ${
                i > 0 ? "border-t border-[var(--color-line)]" : ""
              }`}
            >
              <div className="shrink-0 sm:w-[180px]">
                <code className="doc-code whitespace-nowrap">{h.name}</code>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[1.2px] text-[var(--color-mint-2)]">
                  {h.when}
                </p>
              </div>
              <p className="text-[13.5px] leading-[1.6] text-[var(--color-muted)]">{h.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[24px] font-extrabold tracking-[-0.03em] text-[var(--color-ink)]">
          Conventions
        </h2>
        <ul className="flex flex-col gap-3 text-[14.5px] leading-[1.7] text-[var(--color-muted)]">
          <li>
            <span className="font-semibold text-[var(--color-ink)]">Money is a decimal string</span>{" "}
            — <code className="doc-code">&quot;2450.00&quot;</code>, never a float. Parse it with a
            decimal type; binary floating point will cost your customer money.
          </li>
          <li>
            <span className="font-semibold text-[var(--color-ink)]">
              The server is the source of truth for totals
            </span>{" "}
            — send line items, not a grand total. Tax, discounts and rounding are recomputed
            server-side and the result is what gets booked.
          </li>
          <li>
            <span className="font-semibold text-[var(--color-ink)]">
              Stock is never written directly
            </span>{" "}
            — it moves. A sale, a return, a purchase, an adjustment or a transfer each produces a
            stock movement you can audit.
          </li>
          <li>
            <span className="font-semibold text-[var(--color-ink)]">
              Timestamps are UTC ISO-8601
            </span>{" "}
            — <code className="doc-code">2026-07-11T09:14:22Z</code>.
          </li>
        </ul>
      </section>
    </div>
  );
}
