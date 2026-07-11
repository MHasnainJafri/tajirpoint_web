import type { Metadata } from "next";
import Link from "next/link";
import { KeyRound, ShieldCheck, Boxes, Zap, AlertTriangle, RefreshCw } from "lucide-react";
import { CodeBlock } from "@/components/marketing/CodeBlock";
import { siteConfig } from "@/lib/config/site";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Developers — Tajir Point REST API",
  description:
    "Build on the Tajir Point API. REST endpoints for products, inventory, sales, customers, and payments — JSON over HTTPS, bearer-token auth, cursor pagination, and idempotent writes.",
  path: "/developers",
  keywords: [
    "Tajir Point API",
    "POS API",
    "REST API",
    "developer documentation",
    "inventory API",
    "sales API",
  ],
});

const API_BASE = "https://api.tajirpoint.com/api/v1";
const KEYS_URL = `${siteConfig.dashboardUrl}/settings/api-keys`;

/* ─── In-page navigation ─────────────────────────────────── */

const SECTIONS = [
  { id: "overview", label: "Overview" },
  { id: "authentication", label: "Authentication" },
  { id: "headers", label: "Request headers" },
  { id: "first-request", label: "Your first request" },
  { id: "pagination", label: "Pagination" },
  { id: "rate-limits", label: "Rate limits" },
  { id: "errors", label: "Errors" },
  { id: "idempotency", label: "Idempotency" },
  { id: "webhooks", label: "Webhooks" },
  { id: "reference", label: "API reference" },
];

const WEBHOOKS_URL = `${siteConfig.dashboardUrl}/settings/webhooks`;

/* ─── Request headers ────────────────────────────────────── */

const HEADERS: Array<{ name: string; required: string; desc: string }> = [
  {
    name: "Authorization",
    required: "Required",
    desc: "Bearer <access token> obtained from the login endpoint.",
  },
  {
    name: "X-Shop-Id",
    required: "Required",
    desc: "UUID of the shop you are acting on. Every response is scoped to this shop.",
  },
  {
    name: "Content-Type",
    required: "Writes",
    desc: "application/json on POST, PUT, and PATCH requests.",
  },
  {
    name: "Idempotency-Key",
    required: "Sales & payments",
    desc: "Unique string so a write can be safely retried without being duplicated (24-hour window).",
  },
  {
    name: "X-Warehouse-Id",
    required: "Optional",
    desc: "UUID of the active warehouse for warehouse-scoped inventory operations.",
  },
];

/* ─── Error codes ────────────────────────────────────────── */

const ERROR_CODES: Array<{ code: string; meaning: string }> = [
  { code: "400", meaning: "Validation failed — check the details object for per-field messages." },
  { code: "401", meaning: "Missing, invalid, or expired access token." },
  { code: "403", meaning: "Invalid or unauthorised shop, or your role lacks permission." },
  { code: "404", meaning: "The resource does not exist within this shop." },
  { code: "409", meaning: "Conflict — e.g. insufficient stock or a duplicate transaction." },
  { code: "429", meaning: "Rate limit exceeded — retry after the Retry-After header." },
  { code: "500 / 503", meaning: "Server or dependency error — retry with exponential backoff." },
];

/* ─── Endpoint reference ─────────────────────────────────── */

type Endpoint = { method: string; path: string; desc: string };
type EndpointGroup = { title: string; base: string; endpoints: Endpoint[] };

const REFERENCE: EndpointGroup[] = [
  {
    title: "Catalog",
    base: "/catalog",
    endpoints: [
      {
        method: "GET",
        path: "/catalog/products/",
        desc: "List products (filter by category, brand, search).",
      },
      { method: "POST", path: "/catalog/products/", desc: "Create a product." },
      {
        method: "GET",
        path: "/catalog/products/{id}/",
        desc: "Retrieve a product with its variants and pricing.",
      },
      { method: "PATCH", path: "/catalog/products/{id}/", desc: "Update a product." },
      { method: "GET", path: "/catalog/categories/", desc: "List categories." },
      { method: "GET", path: "/catalog/brands/", desc: "List brands." },
      { method: "GET", path: "/catalog/units/", desc: "List units of measure." },
      { method: "GET", path: "/catalog/tax-rates/", desc: "List tax rates." },
    ],
  },
  {
    title: "Inventory",
    base: "/inventory",
    endpoints: [
      {
        method: "GET",
        path: "/inventory/stock-levels/",
        desc: "Current stock quantity per variant and warehouse.",
      },
      {
        method: "GET",
        path: "/inventory/stock-movements/",
        desc: "Immutable stock transaction history.",
      },
      {
        method: "POST",
        path: "/inventory/adjustments/",
        desc: "Record a stock adjustment (recount, damage, write-off).",
      },
      { method: "POST", path: "/inventory/transfers/", desc: "Transfer stock between warehouses." },
      { method: "GET", path: "/inventory/warehouses/", desc: "List warehouses." },
    ],
  },
  {
    title: "Sales",
    base: "/sales",
    endpoints: [
      {
        method: "POST",
        path: "/sales/sales/",
        desc: "Create a sale (invoice). Send an Idempotency-Key.",
      },
      {
        method: "GET",
        path: "/sales/sales/",
        desc: "List sales / invoices (filter by date, customer).",
      },
      {
        method: "GET",
        path: "/sales/sales/{id}/",
        desc: "Retrieve a sale with items, payments, and tax.",
      },
      {
        method: "POST",
        path: "/sales/sales/{id}/void_sale/",
        desc: "Void a sale (posts reversal entries).",
      },
      { method: "POST", path: "/sales/returns/", desc: "Create a sales return / refund." },
      { method: "GET", path: "/sales/quotations/", desc: "List quotations." },
    ],
  },
  {
    title: "Customers & suppliers",
    base: "/parties",
    endpoints: [
      {
        method: "GET",
        path: "/parties/parties/",
        desc: "List customers or suppliers (filter by type).",
      },
      { method: "POST", path: "/parties/parties/", desc: "Create a customer or supplier." },
      {
        method: "GET",
        path: "/parties/ledger-entries/",
        desc: "Khata (running-credit) ledger entries.",
      },
      {
        method: "GET",
        path: "/parties/invoices/",
        desc: "Customer credit invoices (accounts receivable).",
      },
    ],
  },
  {
    title: "Payments",
    base: "/payments",
    endpoints: [
      {
        method: "POST",
        path: "/payments/payments/",
        desc: "Record a payment. Send an Idempotency-Key.",
      },
      { method: "GET", path: "/payments/payments/", desc: "List payments received or paid." },
      {
        method: "GET",
        path: "/payments/methods/",
        desc: "List payment methods (cash, card, bank, etc.).",
      },
    ],
  },
  {
    title: "Purchases",
    base: "/purchases",
    endpoints: [
      { method: "GET", path: "/purchases/orders/", desc: "List purchase orders." },
      {
        method: "POST",
        path: "/purchases/purchases/",
        desc: "Create a goods-received note (GRN).",
      },
    ],
  },
];

const LOGIN_SNIPPET = `curl -X POST ${API_BASE}/identity/login/ \\
  -H "Content-Type: application/json" \\
  -d '{
    "email": "you@yourshop.com",
    "password": "••••••••"
  }'`;

const LOGIN_RESPONSE = `{
  "user":   { "id": "…", "name": "…" },
  "shops":  [ { "id": "8f1c2d3e-…", "name": "Gulberg General Store" } ],
  "tokens": { "access": "eyJhbGc…", "refresh": "eyJhbGc…" }
}`;

const REQUEST_SNIPPET = `curl ${API_BASE}/catalog/products/ \\
  -H "Authorization: Bearer eyJhbGc…" \\
  -H "X-Shop-Id: 8f1c2d3e-…"`;

const PAGINATION_RESPONSE = `{
  "next": "${API_BASE}/catalog/products/?cursor=cD0yMDI2LTA3LTAy…",
  "previous": null,
  "results": [
    { "id": "…", "name": "Nescafé Classic 200g", "sku_root": "NES-200" }
  ]
}`;

const ERROR_RESPONSE = `{
  "error": {
    "code": 400,
    "message": "Validation failed.",
    "details": {
      "quantity": ["Must be greater than zero."]
    }
  }
}`;

const IDEMPOTENCY_SNIPPET = `curl -X POST ${API_BASE}/sales/sales/ \\
  -H "Authorization: Bearer eyJhbGc…" \\
  -H "X-Shop-Id: 8f1c2d3e-…" \\
  -H "Idempotency-Key: sale-2026-07-02-0001" \\
  -H "Content-Type: application/json" \\
  -d '{ "items": [ … ], "payments": [ … ] }'`;

/* ─── Webhooks ───────────────────────────────────────────── */

const WEBHOOK_EVENTS: Array<{ event: string; when: string }> = [
  { event: "sale.created", when: "A sale (invoice) is completed at the till or via the API." },
  { event: "sale.voided", when: "A sale is voided and its entries reversed." },
  { event: "sale.refunded", when: "A return or refund is completed against a sale." },
  { event: "payment.received", when: "A payment is recorded, in or out." },
  { event: "purchase.received", when: "A goods-received note (GRN) is booked into stock." },
  { event: "stock.low", when: "An item crosses at or below its reorder point." },
];

const WEBHOOK_HEADERS: Array<{ name: string; desc: string }> = [
  { name: "X-Tajir-Event", desc: "The event name, e.g. sale.created." },
  {
    name: "X-Tajir-Signature",
    desc: "sha256=<hex> — HMAC-SHA256 of the raw request body, keyed by your endpoint's signing secret.",
  },
  {
    name: "X-Tajir-Delivery",
    desc: "Unique id for this delivery attempt. Use it to make your handler idempotent.",
  },
];

const WEBHOOK_PAYLOAD = `{
  "event": "sale.created",
  "shop_id": "8f1c2d3e-…",
  "delivery_id": "b7a1f0c9-…",
  "created_at": "2026-07-11T09:14:22.104Z",
  "data": {
    "sale_id": "3d9e…",
    "invoice_no": "INV-00042",
    "total_amount": "2450.00",
    "payment_status": "paid",
    "customer_id": 118,
    "sale_date": "2026-07-11T09:14:21Z"
  }
}`;

const WEBHOOK_VERIFY = `import crypto from "node:crypto";

// Verify against the RAW body — parsing to JSON first and re-serialising
// changes the bytes and the signature will not match.
app.post("/tajir-webhook", express.raw({ type: "application/json" }), (req, res) => {
  const expected =
    "sha256=" +
    crypto.createHmac("sha256", process.env.TAJIR_WEBHOOK_SECRET)
          .update(req.body)
          .digest("hex");

  const received = req.headers["x-tajir-signature"] ?? "";

  // Constant-time compare — a plain === leaks the secret byte by byte.
  const ok =
    expected.length === received.length &&
    crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(received));

  if (!ok) return res.status(401).end();

  const { event, data } = JSON.parse(req.body.toString());
  // Acknowledge fast, then do the work out of band — we time out after 10s.
  res.status(200).end();
  void handle(event, data);
});`;

/* ─── Small building blocks ──────────────────────────────── */

function SectionHeading({ id, eyebrow, title }: { id: string; eyebrow?: string; title: string }) {
  return (
    <div id={id} className="scroll-mt-28">
      {eyebrow && (
        <span className="inline-flex items-center gap-2 text-[12px] font-semibold text-[var(--color-mint)] mb-3">
          <span className="inline-block w-4 h-px bg-[var(--color-mint)]" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-[26px] lg:text-[30px] font-extrabold tracking-[-0.03em] text-[var(--color-ink)]">
        {title}
      </h2>
    </div>
  );
}

function MethodBadge({ method }: { method: string }) {
  const tone =
    method === "GET"
      ? "text-[var(--color-mint)] bg-[var(--color-mint)]/10"
      : method === "POST"
        ? "text-[var(--color-ink)] bg-[var(--color-amber)]/15"
        : "text-[var(--color-ink)] bg-[var(--color-bg-3)]";
  return (
    <span
      className={`inline-flex justify-center min-w-[54px] rounded-md px-2 py-0.5 text-[11px] font-bold tracking-wide font-mono ${tone}`}
    >
      {method}
    </span>
  );
}

export default function DevelopersPage() {
  return (
    // English-first technical reference — force LTR even under the ur/ar RTL layout.
    <main id="main-content" dir="ltr" className="min-h-screen bg-[var(--color-bg)]">
      {/* Hero */}
      <section className="pt-20 pb-14 lg:pt-28 lg:pb-16 border-b border-[var(--color-line)]">
        <div className="mx-auto max-w-[1320px] px-7 lg:px-10">
          <span className="inline-flex items-center gap-2 text-[13px] font-semibold text-[var(--color-mint)] mb-6">
            <span className="inline-block w-4 h-px bg-[var(--color-mint)]" />
            Developers
          </span>
          <h1 className="text-[44px] lg:text-[60px] font-extrabold tracking-[-0.04em] leading-[1.05] text-[var(--color-ink)] max-w-[760px]">
            Build on the Tajir Point API.
          </h1>
          <p className="mt-5 text-[17px] text-[var(--color-muted)] leading-[1.65] max-w-[600px]">
            A REST API for your products, inventory, sales, customers, and payments. JSON over
            HTTPS, predictable resource URLs, cursor pagination, and idempotent writes — so you can
            connect Tajir Point to anything.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={KEYS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-ink)] text-white px-6 py-3.5 text-[15px] font-semibold hover:bg-black transition-colors"
            >
              <KeyRound size={17} aria-hidden="true" />
              Get your API key
            </a>
            <a
              href="#reference"
              className="inline-flex items-center gap-2 rounded-full bg-[var(--color-bg-3)] text-[var(--color-ink)] px-6 py-3.5 text-[15px] font-semibold hover:bg-[var(--color-line)] transition-colors"
            >
              Jump to reference
            </a>
          </div>
          <div className="mt-8 inline-flex items-center gap-3 rounded-[12px] border border-[var(--color-line)] bg-[var(--color-bg-2)] px-4 py-3">
            <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--color-muted)]">
              Base URL
            </span>
            <code className="font-mono text-[13.5px] text-[var(--color-ink)]" dir="ltr">
              {API_BASE}
            </code>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[1320px] px-7 lg:px-10 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-12 lg:gap-16">
          {/* On this page */}
          <aside className="hidden lg:block">
            <div className="sticky top-[100px]">
              <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-[var(--color-muted)] mb-4">
                On this page
              </p>
              <nav aria-label="On this page">
                <ul className="flex flex-col gap-1.5 text-[13.5px]">
                  {SECTIONS.map((s) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className="block py-1 text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors"
                      >
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </aside>

          {/* Content */}
          <div className="max-w-[760px] flex flex-col gap-16">
            {/* Overview */}
            <section className="flex flex-col gap-5">
              <SectionHeading id="overview" title="Overview" />
              <p className="text-[15.5px] text-[var(--color-muted)] leading-[1.7]">
                The Tajir Point API is organised around REST. Resources have predictable, noun-based
                URLs; requests and responses are JSON; and it uses standard HTTP verbs and status
                codes. Every request is scoped to a single shop, so the same credentials can serve a
                merchant with one branch or fifty.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  {
                    icon: <ShieldCheck size={18} />,
                    title: "Bearer auth",
                    body: "Token + shop header on every call.",
                  },
                  {
                    icon: <Boxes size={18} />,
                    title: "Cursor paging",
                    body: "Stable pagination for large lists.",
                  },
                  {
                    icon: <Zap size={18} />,
                    title: "Idempotent writes",
                    body: "Retry sales safely, no duplicates.",
                  },
                ].map((c) => (
                  <div
                    key={c.title}
                    className="rounded-[14px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-5"
                  >
                    <div className="w-9 h-9 rounded-[9px] bg-[var(--color-mint)]/10 flex items-center justify-center text-[var(--color-mint)] mb-3">
                      {c.icon}
                    </div>
                    <h3 className="text-[14px] font-bold text-[var(--color-ink)] mb-1">
                      {c.title}
                    </h3>
                    <p className="text-[13px] text-[var(--color-muted)] leading-[1.55]">{c.body}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Authentication */}
            <section className="flex flex-col gap-5">
              <SectionHeading
                id="authentication"
                eyebrow="Getting started"
                title="Authentication"
              />
              <p className="text-[15.5px] text-[var(--color-muted)] leading-[1.7]">
                Authenticate by exchanging your credentials at the login endpoint for a bearer
                token, then send that token as{" "}
                <code className="doc-code">Authorization: Bearer</code> on every request together
                with the <code className="doc-code">X-Shop-Id</code> of the shop you are working
                with.
              </p>
              <CodeBlock label="cURL — log in" code={LOGIN_SNIPPET} />
              <p className="text-[14.5px] text-[var(--color-muted)] leading-[1.7]">
                The response returns the shops you can access and a token pair. Access tokens expire
                after <span className="font-semibold text-[var(--color-ink)]">30 minutes</span> and
                refresh tokens after{" "}
                <span className="font-semibold text-[var(--color-ink)]">7 days</span>; exchange a
                refresh token for a new pair at{" "}
                <code className="doc-code">POST /identity/token/refresh/</code>. A{" "}
                <code className="doc-code">401</code> means the access token has expired — refresh
                and retry.
              </p>
              <CodeBlock label="JSON — response" code={LOGIN_RESPONSE} />
              <div className="rounded-[14px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 shrink-0 rounded-[8px] bg-[var(--color-mint)]/10 flex items-center justify-center text-[var(--color-mint)]">
                    <KeyRound size={16} aria-hidden="true" />
                  </div>
                  <p className="text-[13.5px] text-[var(--color-muted)] leading-[1.65]">
                    <span className="font-semibold text-[var(--color-ink)]">API keys.</span> Create
                    and name credentials for each integration under{" "}
                    <a
                      href={KEYS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-mint)] hover:underline font-semibold"
                    >
                      Settings → API Keys
                    </a>{" "}
                    in your dashboard. Keep them secret and rotate them regularly.
                  </p>
                </div>
              </div>
            </section>

            {/* Headers */}
            <section className="flex flex-col gap-5">
              <SectionHeading id="headers" title="Request headers" />
              <div className="overflow-x-auto rounded-[14px] border border-[var(--color-line)]">
                <table className="w-full text-left border-collapse min-w-[540px]">
                  <thead>
                    <tr className="bg-[var(--color-bg-2)] border-b border-[var(--color-line)]">
                      <th className="px-4 py-3 text-[12px] font-semibold tracking-wide uppercase text-[var(--color-muted)]">
                        Header
                      </th>
                      <th className="px-4 py-3 text-[12px] font-semibold tracking-wide uppercase text-[var(--color-muted)]">
                        When
                      </th>
                      <th className="px-4 py-3 text-[12px] font-semibold tracking-wide uppercase text-[var(--color-muted)]">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {HEADERS.map((h) => (
                      <tr
                        key={h.name}
                        className="border-b border-[var(--color-line)] last:border-0"
                      >
                        <td className="px-4 py-3 align-top">
                          <code className="doc-code whitespace-nowrap">{h.name}</code>
                        </td>
                        <td className="px-4 py-3 align-top text-[13px] font-medium text-[var(--color-ink)] whitespace-nowrap">
                          {h.required}
                        </td>
                        <td className="px-4 py-3 align-top text-[13.5px] text-[var(--color-muted)] leading-[1.55]">
                          {h.desc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* First request */}
            <section className="flex flex-col gap-5">
              <SectionHeading id="first-request" title="Your first request" />
              <p className="text-[15.5px] text-[var(--color-muted)] leading-[1.7]">
                List the products in a shop. Swap in your bearer token and shop ID:
              </p>
              <CodeBlock label="cURL — list products" code={REQUEST_SNIPPET} />
            </section>

            {/* Pagination */}
            <section className="flex flex-col gap-5">
              <SectionHeading id="pagination" title="Pagination" />
              <p className="text-[15.5px] text-[var(--color-muted)] leading-[1.7]">
                List endpoints are cursor-paginated and return 50 items by default (max 200 via{" "}
                <code className="doc-code">?page_size=</code>). Follow the opaque{" "}
                <code className="doc-code">next</code> URL to page forward — do not construct
                cursors yourself.
              </p>
              <CodeBlock label="JSON — paginated response" code={PAGINATION_RESPONSE} />
            </section>

            {/* Rate limits */}
            <section className="flex flex-col gap-5">
              <SectionHeading id="rate-limits" title="Rate limits" />
              <div className="flex items-start gap-3 rounded-[14px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-5">
                <div className="w-8 h-8 shrink-0 rounded-[8px] bg-[var(--color-mint)]/10 flex items-center justify-center text-[var(--color-mint)]">
                  <Zap size={16} aria-hidden="true" />
                </div>
                <p className="text-[14.5px] text-[var(--color-muted)] leading-[1.7]">
                  Requests are limited to{" "}
                  <span className="font-semibold text-[var(--color-ink)]">
                    1,000 per hour per shop
                  </span>
                  . When you exceed the limit you receive a{" "}
                  <code className="doc-code">429 Too Many Requests</code> with a{" "}
                  <code className="doc-code">Retry-After</code> header — wait that many seconds
                  before retrying.
                </p>
              </div>
            </section>

            {/* Errors */}
            <section className="flex flex-col gap-5">
              <SectionHeading id="errors" title="Errors" />
              <p className="text-[15.5px] text-[var(--color-muted)] leading-[1.7]">
                Errors use conventional HTTP status codes and a consistent envelope. The{" "}
                <code className="doc-code">details</code> object carries per-field validation
                messages when relevant.
              </p>
              <CodeBlock label="JSON — error envelope" code={ERROR_RESPONSE} />
              <div className="overflow-x-auto rounded-[14px] border border-[var(--color-line)]">
                <table className="w-full text-left border-collapse min-w-[480px]">
                  <thead>
                    <tr className="bg-[var(--color-bg-2)] border-b border-[var(--color-line)]">
                      <th className="px-4 py-3 text-[12px] font-semibold tracking-wide uppercase text-[var(--color-muted)]">
                        Status
                      </th>
                      <th className="px-4 py-3 text-[12px] font-semibold tracking-wide uppercase text-[var(--color-muted)]">
                        Meaning
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {ERROR_CODES.map((e) => (
                      <tr
                        key={e.code}
                        className="border-b border-[var(--color-line)] last:border-0"
                      >
                        <td className="px-4 py-3 align-top">
                          <code className="doc-code">{e.code}</code>
                        </td>
                        <td className="px-4 py-3 align-top text-[13.5px] text-[var(--color-muted)] leading-[1.55]">
                          {e.meaning}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Idempotency */}
            <section className="flex flex-col gap-5">
              <SectionHeading id="idempotency" eyebrow="Safe retries" title="Idempotency" />
              <p className="text-[15.5px] text-[var(--color-muted)] leading-[1.7]">
                Money-moving writes — creating sales and payments — accept an{" "}
                <code className="doc-code">Idempotency-Key</code> header. Send a unique key per
                logical operation. If the same key reaches the API again within 24 hours, the
                original response is replayed instead of creating a duplicate.
              </p>
              <CodeBlock label="cURL — idempotent sale" code={IDEMPOTENCY_SNIPPET} />
              <div className="flex items-start gap-3 rounded-[14px] border border-[var(--color-amber)]/30 bg-[var(--color-amber)]/[0.06] p-5">
                <div className="w-8 h-8 shrink-0 rounded-[8px] bg-[var(--color-amber)]/15 flex items-center justify-center text-[var(--color-amber)]">
                  <AlertTriangle size={16} aria-hidden="true" />
                </div>
                <p className="text-[13.5px] text-[var(--color-muted)] leading-[1.65]">
                  Only successful (2xx) responses are cached, so a failed request can always be
                  retried with the same key. Reuse the key when retrying the <em>same</em>{" "}
                  operation; generate a fresh one for a new operation.
                </p>
              </div>
            </section>

            {/* Webhooks */}
            <section className="flex flex-col gap-5">
              <SectionHeading id="webhooks" eyebrow="Push, don't poll" title="Webhooks" />
              <p className="text-[15.5px] text-[var(--color-muted)] leading-[1.7]">
                Rather than polling for changes, register an HTTPS endpoint and we will POST to it
                when something happens. Create endpoints under{" "}
                <a
                  href={WEBHOOKS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-mint)] hover:underline font-semibold"
                >
                  Settings → Webhooks
                </a>
                , choose the events you care about, and copy the signing secret.
              </p>

              <h3 className="text-[15px] font-bold text-[var(--color-ink)] mt-1">Events</h3>
              <div className="overflow-x-auto rounded-[14px] border border-[var(--color-line)]">
                <table className="w-full text-left border-collapse min-w-[520px]">
                  <thead>
                    <tr className="bg-[var(--color-bg-2)] border-b border-[var(--color-line)]">
                      <th className="px-4 py-3 text-[12px] font-semibold tracking-wide uppercase text-[var(--color-muted)]">
                        Event
                      </th>
                      <th className="px-4 py-3 text-[12px] font-semibold tracking-wide uppercase text-[var(--color-muted)]">
                        Fires when
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {WEBHOOK_EVENTS.map((e) => (
                      <tr
                        key={e.event}
                        className="border-b border-[var(--color-line)] last:border-0"
                      >
                        <td className="px-4 py-3 align-top">
                          <code className="doc-code whitespace-nowrap">{e.event}</code>
                        </td>
                        <td className="px-4 py-3 align-top text-[13.5px] text-[var(--color-muted)] leading-[1.55]">
                          {e.when}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-[15px] font-bold text-[var(--color-ink)] mt-3">Payload</h3>
              <p className="text-[14.5px] text-[var(--color-muted)] leading-[1.7]">
                Every delivery has the same envelope. The event-specific fields live under{" "}
                <code className="doc-code">data</code>.
              </p>
              <CodeBlock label="JSON — delivery body" code={WEBHOOK_PAYLOAD} />

              <h3 className="text-[15px] font-bold text-[var(--color-ink)] mt-3">
                Headers we send
              </h3>
              <div className="overflow-x-auto rounded-[14px] border border-[var(--color-line)]">
                <table className="w-full text-left border-collapse min-w-[540px]">
                  <thead>
                    <tr className="bg-[var(--color-bg-2)] border-b border-[var(--color-line)]">
                      <th className="px-4 py-3 text-[12px] font-semibold tracking-wide uppercase text-[var(--color-muted)]">
                        Header
                      </th>
                      <th className="px-4 py-3 text-[12px] font-semibold tracking-wide uppercase text-[var(--color-muted)]">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {WEBHOOK_HEADERS.map((h) => (
                      <tr
                        key={h.name}
                        className="border-b border-[var(--color-line)] last:border-0"
                      >
                        <td className="px-4 py-3 align-top">
                          <code className="doc-code whitespace-nowrap">{h.name}</code>
                        </td>
                        <td className="px-4 py-3 align-top text-[13.5px] text-[var(--color-muted)] leading-[1.55]">
                          {h.desc}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h3 className="text-[15px] font-bold text-[var(--color-ink)] mt-3">
                Verifying the signature
              </h3>
              <p className="text-[14.5px] text-[var(--color-muted)] leading-[1.7]">
                Anyone can POST to your endpoint. Check the signature before you trust the body —
                and compute it over the{" "}
                <span className="font-semibold text-[var(--color-ink)]">raw bytes</span> you
                received, not over a re-serialised object.
              </p>
              <CodeBlock label="Node.js — verify and handle" code={WEBHOOK_VERIFY} />

              <h3 className="text-[15px] font-bold text-[var(--color-ink)] mt-3">
                Retries and delivery
              </h3>
              <div className="flex items-start gap-3 rounded-[14px] border border-[var(--color-line)] bg-[var(--color-bg-2)] p-5">
                <div className="w-8 h-8 shrink-0 rounded-[8px] bg-[var(--color-mint)]/10 flex items-center justify-center text-[var(--color-mint)]">
                  <RefreshCw size={16} aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-2 text-[13.5px] text-[var(--color-muted)] leading-[1.65]">
                  <p>
                    Reply <code className="doc-code">2xx</code> to acknowledge. We wait up to{" "}
                    <span className="font-semibold text-[var(--color-ink)]">10 seconds</span> — do
                    the real work after you respond, not before.
                  </p>
                  <p>
                    A timeout, a network error or a <code className="doc-code">5xx</code> is retried
                    with exponential backoff, up to{" "}
                    <span className="font-semibold text-[var(--color-ink)]">5 attempts</span>. A{" "}
                    <code className="doc-code">4xx</code> (other than{" "}
                    <code className="doc-code">408</code> and <code className="doc-code">429</code>)
                    is treated as a permanent rejection and is not retried.
                  </p>
                  <p>
                    Because a delivery can be retried, your handler must be idempotent — dedupe on{" "}
                    <code className="doc-code">X-Tajir-Delivery</code>. Deliveries are queued after
                    the originating transaction commits, so you never see a sale that later rolled
                    back.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-[14px] border border-[var(--color-amber)]/30 bg-[var(--color-amber)]/[0.06] p-5">
                <div className="w-8 h-8 shrink-0 rounded-[8px] bg-[var(--color-amber)]/15 flex items-center justify-center text-[var(--color-amber)]">
                  <AlertTriangle size={16} aria-hidden="true" />
                </div>
                <p className="text-[13.5px] text-[var(--color-muted)] leading-[1.65]">
                  Your endpoint must be{" "}
                  <span className="font-semibold text-[var(--color-ink)]">HTTPS</span> and publicly
                  reachable. Every attempt — status, response body and error — is recorded against
                  the endpoint in your dashboard, so you can see exactly what we sent and what came
                  back.
                </p>
              </div>
            </section>

            {/* Reference */}
            <section className="flex flex-col gap-6">
              <SectionHeading id="reference" eyebrow="Endpoints" title="API reference" />
              <p className="text-[15.5px] text-[var(--color-muted)] leading-[1.7] -mt-1">
                The most common developer-facing endpoints, grouped by domain. All paths are
                relative to <code className="doc-code">{API_BASE}</code>.
              </p>
              <div className="flex flex-col gap-8">
                {REFERENCE.map((group) => (
                  <div key={group.title}>
                    <div className="flex items-center gap-2 mb-3">
                      <RefreshCw
                        size={15}
                        className="text-[var(--color-mint)]"
                        aria-hidden="true"
                      />
                      <h3 className="text-[16px] font-bold text-[var(--color-ink)]">
                        {group.title}
                      </h3>
                    </div>
                    <div className="overflow-hidden rounded-[14px] border border-[var(--color-line)]">
                      {group.endpoints.map((ep, i) => (
                        <div
                          key={`${ep.method}${ep.path}`}
                          className={`flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-4 py-3 ${
                            i > 0 ? "border-t border-[var(--color-line)]" : ""
                          }`}
                        >
                          <div className="flex items-center gap-3 sm:w-[300px] shrink-0">
                            <MethodBadge method={ep.method} />
                            <code className="font-mono text-[12.5px] text-[var(--color-ink)] break-all">
                              {ep.path}
                            </code>
                          </div>
                          <span className="text-[13px] text-[var(--color-muted)] leading-[1.5]">
                            {ep.desc}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* CTA */}
            <section className="rounded-[20px] border border-[var(--color-line)] bg-[var(--color-ink)] text-white p-8 lg:p-10">
              <h2 className="text-[24px] lg:text-[28px] font-extrabold tracking-[-0.03em]">
                Ready to build?
              </h2>
              <p className="mt-3 text-[15px] text-white/70 leading-[1.65] max-w-[520px]">
                Create an API key in your dashboard, or talk to us about what you want to integrate.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={KEYS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white text-[var(--color-ink)] px-6 py-3.5 text-[15px] font-semibold hover:bg-white/90 transition-colors"
                >
                  <KeyRound size={17} aria-hidden="true" />
                  Create an API key
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-transparent text-white px-6 py-3.5 text-[15px] font-semibold shadow-[inset_0_0_0_1px_rgba(255,255,255,0.22)] hover:bg-white/[0.06] transition-colors"
                >
                  Contact us
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
