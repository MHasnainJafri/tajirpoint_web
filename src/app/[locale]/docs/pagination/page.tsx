import type { Metadata } from "next";

import { CodeBlock } from "@/components/marketing/CodeBlock";
import { API_BASE } from "@/lib/docs/examples";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Pagination — Tajir Point API",
  description:
    "List endpoints are cursor-paginated: 50 items by default, 200 max. Follow the opaque next URL rather than constructing cursors.",
  path: "/docs/pagination",
});

const RESPONSE = `{
  "next": "${API_BASE}/catalog/products/?cursor=cD0yMDI2LTA3LTExVDA5…",
  "previous": null,
  "results": [
    {
      "id": 42,
      "name": "Nescafé Classic 200g",
      "sku_root": "NES-200",
      "sale_price": "450.00"
    }
  ]
}`;

const LOOP = `let url = "${API_BASE}/catalog/products/?page_size=200";
const products = [];

while (url) {
  const res = await fetch(url, { headers });
  const page = await res.json();
  products.push(...page.results);
  // Follow the URL we were given. Do not rebuild it.
  url = page.next;
}`;

export default function PaginationPage() {
  return (
    <div className="flex max-w-[860px] flex-col gap-10">
      <header className="flex flex-col gap-3">
        <span className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--color-mint)]">
          Getting started
        </span>
        <h1 className="text-[36px] font-extrabold tracking-[-0.035em] text-[var(--color-ink)]">
          Pagination
        </h1>
        <p className="text-[15.5px] leading-[1.7] text-[var(--color-muted)]">
          Every list endpoint is cursor-paginated. You get{" "}
          <span className="font-semibold text-[var(--color-ink)]">50 items</span> by default and can
          ask for up to <span className="font-semibold text-[var(--color-ink)]">200</span> with{" "}
          <code className="doc-code">?page_size=</code>.
        </p>
      </header>

      <section className="flex flex-col gap-4">
        <CodeBlock label="JSON — paginated response" code={RESPONSE} />
        <p className="text-[15px] leading-[1.7] text-[var(--color-muted)]">
          Follow <code className="doc-code">next</code> until it comes back{" "}
          <code className="doc-code">null</code>. The cursor is opaque — it encodes a position, not
          an offset. Do not parse it, and do not build one yourself.
        </p>
        <CodeBlock label="JavaScript — page through everything" code={LOOP} />
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-[22px] font-extrabold tracking-[-0.03em] text-[var(--color-ink)]">
          Why cursors, not page numbers
        </h2>
        <p className="text-[15px] leading-[1.7] text-[var(--color-muted)]">
          A POS is being written to while you read it. With{" "}
          <code className="doc-code">?page=2</code>, a sale created between your first and second
          request shifts every row along — and you silently skip one. A cursor points at a record,
          so new rows appearing behind you cannot make you miss the ones in front.
        </p>
      </section>
    </div>
  );
}
