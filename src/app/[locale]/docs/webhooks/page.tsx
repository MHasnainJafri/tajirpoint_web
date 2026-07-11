import type { Metadata } from "next";
import { AlertTriangle, RefreshCw } from "lucide-react";

import { CodeBlock } from "@/components/marketing/CodeBlock";
import { siteConfig } from "@/lib/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Webhooks — Tajir Point API",
  description:
    "Register an HTTPS endpoint and get signed POSTs when a sale, refund, payment, purchase or low-stock event happens. HMAC-SHA256 signatures, 5 retries with backoff.",
  path: "/docs/webhooks",
});

const WEBHOOKS_URL = `${siteConfig.dashboardUrl}/settings/webhooks`;

const EVENTS: Array<{ event: string; when: string }> = [
  { event: "sale.created", when: "A sale is completed, at the till or through the API." },
  { event: "sale.voided", when: "A sale is voided and its entries reversed." },
  { event: "sale.refunded", when: "A return or refund completes against a sale." },
  { event: "payment.received", when: "A payment is recorded, in or out." },
  { event: "purchase.received", when: "A goods-received note is booked into stock." },
  { event: "stock.low", when: "An item crosses at or below its reorder point." },
];

const HEADERS: Array<{ name: string; desc: string }> = [
  { name: "X-Tajir-Event", desc: "The event name, e.g. sale.created." },
  {
    name: "X-Tajir-Signature",
    desc: "sha256=<hex> — HMAC-SHA256 of the raw request body, keyed by this endpoint's signing secret.",
  },
  {
    name: "X-Tajir-Delivery",
    desc: "Unique id for this delivery. Dedupe on it — a retry reuses the same id.",
  },
];

const PAYLOAD = `{
  "event": "sale.created",
  "shop_id": "8f1c2d3e-4b5a-6c7d-8e9f-0a1b2c3d4e5f",
  "delivery_id": "b7a1f0c9-2e4d-4a91-9f3b-6c5d4e3f2a1b",
  "created_at": "2026-07-11T09:14:22.104Z",
  "data": {
    "sale_id": "3d9e7c21-…",
    "invoice_no": "INV-00042",
    "total_amount": "2450.00",
    "payment_status": "paid",
    "customer_id": 118,
    "sale_date": "2026-07-11T09:14:21Z"
  }
}`;

const VERIFY = `import crypto from "node:crypto";

// Verify against the RAW body. Parsing to JSON and re-serialising changes the
// bytes — key order, whitespace — and the signature will not match.
app.post("/tajir-webhook", express.raw({ type: "application/json" }), (req, res) => {
  const expected =
    "sha256=" +
    crypto.createHmac("sha256", process.env.TAJIR_WEBHOOK_SECRET)
          .update(req.body)
          .digest("hex");

  const received = req.headers["x-tajir-signature"] ?? "";

  // Constant-time compare — a plain === leaks the secret one byte at a time.
  const ok =
    expected.length === received.length &&
    crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(received));

  if (!ok) return res.status(401).end();

  // Acknowledge first — we give up after 10 seconds — then do the work.
  res.status(200).end();

  const { event, data, delivery_id } = JSON.parse(req.body.toString());
  void handle(event, data, delivery_id);
});`;

const PYTHON_VERIFY = `import hmac, hashlib

def verify(raw_body: bytes, header: str, secret: str) -> bool:
    expected = "sha256=" + hmac.new(
        secret.encode(), raw_body, hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(expected, header or "")`;

export default function WebhooksPage() {
  return (
    <div className="flex max-w-[860px] flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--color-mint)]">
          Getting started
        </span>
        <h1 className="text-[36px] font-extrabold tracking-[-0.035em] text-[var(--color-ink)]">
          Webhooks
        </h1>
        <p className="text-[15.5px] leading-[1.7] text-[var(--color-muted)]">
          Instead of polling for changes, register an HTTPS endpoint and we will POST to it when
          something happens. Create endpoints in{" "}
          <a
            href={WEBHOOKS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[var(--color-mint)] hover:underline"
          >
            Settings → Webhooks
          </a>
          , pick the events you care about, and copy the signing secret.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <h2 className="text-[22px] font-extrabold tracking-[-0.03em] text-[var(--color-ink)]">
          Events
        </h2>
        <div className="overflow-hidden rounded-[14px] border border-[var(--color-line)]">
          {EVENTS.map((e, i) => (
            <div
              key={e.event}
              className={`flex flex-col gap-1 px-4 py-3 sm:flex-row sm:gap-5 ${
                i > 0 ? "border-t border-[var(--color-line)]" : ""
              }`}
            >
              <code className="doc-code shrink-0 sm:w-[190px]">{e.event}</code>
              <span className="text-[13.5px] leading-[1.55] text-[var(--color-muted)]">
                {e.when}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[22px] font-extrabold tracking-[-0.03em] text-[var(--color-ink)]">
          The delivery
        </h2>
        <p className="text-[15px] leading-[1.7] text-[var(--color-muted)]">
          Every event arrives in the same envelope. The event-specific fields are under{" "}
          <code className="doc-code">data</code>.
        </p>
        <CodeBlock label="JSON — request body we POST" code={PAYLOAD} />
        <div className="overflow-hidden rounded-[14px] border border-[var(--color-line)]">
          {HEADERS.map((h, i) => (
            <div
              key={h.name}
              className={`flex flex-col gap-1 px-4 py-3 sm:flex-row sm:gap-5 ${
                i > 0 ? "border-t border-[var(--color-line)]" : ""
              }`}
            >
              <code className="doc-code shrink-0 sm:w-[190px]">{h.name}</code>
              <span className="text-[13.5px] leading-[1.55] text-[var(--color-muted)]">
                {h.desc}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[22px] font-extrabold tracking-[-0.03em] text-[var(--color-ink)]">
          Verify the signature
        </h2>
        <p className="text-[15px] leading-[1.7] text-[var(--color-muted)]">
          Anyone on the internet can POST to your URL. Check the signature before you trust the body
          — and compute it over the{" "}
          <span className="font-semibold text-[var(--color-ink)]">raw bytes you received</span>, not
          over a re-serialised object.
        </p>
        <CodeBlock label="Node.js — verify and handle" code={VERIFY} />
        <CodeBlock label="Python — verify" code={PYTHON_VERIFY} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[22px] font-extrabold tracking-[-0.03em] text-[var(--color-ink)]">
          Retries
        </h2>
        <div className="flex items-start gap-3 rounded-[14px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[var(--color-mint)]/10 text-[var(--color-mint)]">
            <RefreshCw size={16} aria-hidden="true" />
          </div>
          <div className="flex flex-col gap-2 text-[13.5px] leading-[1.65] text-[var(--color-muted)]">
            <p>
              Reply <code className="doc-code">2xx</code> to acknowledge. We wait{" "}
              <span className="font-semibold text-[var(--color-ink)]">10 seconds</span> — do the
              real work after you respond, not before.
            </p>
            <p>
              Timeouts, network errors and <code className="doc-code">5xx</code> are retried with
              exponential backoff, up to{" "}
              <span className="font-semibold text-[var(--color-ink)]">5 attempts</span>. A{" "}
              <code className="doc-code">4xx</code> — other than{" "}
              <code className="doc-code">408</code> and <code className="doc-code">429</code> — is a
              permanent rejection and is not retried.
            </p>
            <p>
              Because a delivery can be retried,{" "}
              <span className="font-semibold text-[var(--color-ink)]">
                your handler must be idempotent
              </span>{" "}
              — dedupe on <code className="doc-code">X-Tajir-Delivery</code>. Deliveries are queued
              only after the originating transaction commits, so you will never be told about a sale
              that later rolled back.
            </p>
          </div>
        </div>
      </section>

      <div className="flex items-start gap-3 rounded-[14px] border border-[var(--color-amber)]/30 bg-[var(--color-amber)]/[0.06] p-5">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[8px] bg-[var(--color-amber)]/15 text-[var(--color-amber)]">
          <AlertTriangle size={16} aria-hidden="true" />
        </div>
        <p className="text-[13.5px] leading-[1.65] text-[var(--color-muted)]">
          Your endpoint must be <span className="font-semibold text-[var(--color-ink)]">HTTPS</span>{" "}
          and publicly reachable. Every attempt — the status, the response body, the error — is
          recorded against the endpoint in your dashboard, so when an integration goes quiet you can
          see exactly what we sent and what came back.
        </p>
      </div>
    </div>
  );
}
