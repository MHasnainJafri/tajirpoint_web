import type { ApiField, ApiOperation } from "./types";

export const API_BASE = "https://api.tajirpoint.com/api/v1";

const SHOP_ID = "8f1c2d3e-4b5a-6c7d-8e9f-0a1b2c3d4e5f";

/**
 * A plausible value for a field, chosen by name first and type second.
 *
 * Examples are worth more than a type table — a developer reads
 * `"total_amount": "2450.00"` and instantly knows money is a decimal *string*,
 * not a float. So the name map below is deliberately opinionated about the
 * fields people get wrong.
 */
const BY_NAME: Record<string, unknown> = {
  id: 42,
  name: "Nescafé Classic 200g",
  name_ur: "نیسکافے کلاسک ۲۰۰ گرام",
  sku: "NES-200-JAR",
  sku_root: "NES-200",
  barcode: "8964000123456",
  invoice_no: "INV-00042",
  return_no: "RET-00007",
  payment_no: "PAY-00131",
  purchase_no: "PUR-00019",
  entry_no: 8,
  phone: "+923001234567",
  email: "shopkeeper@example.com",
  city: "Lahore",
  address: "12 Main Boulevard, Gulberg III",
  // Money is a decimal string. Never a float.
  price: "450.00",
  unit_price: "450.00",
  sale_price: "450.00",
  cost_price: "372.50",
  wholesale_price: "410.00",
  total: "2450.00",
  total_amount: "2450.00",
  subtotal: "2100.00",
  tax_amount: "350.00",
  discount_amount: "0.00",
  paid_amount: "2450.00",
  balance: "0.00",
  refund_amount: "450.00",
  amount: "2450.00",
  debit: "0.00",
  credit: "2450.00",
  running_balance: "1200.00",
  current_balance: "1200.00",
  quantity: "12.000",
  quantity_on_hand: "48.000",
  quantity_reserved: "2.000",
  quantity_available: "46.000",
  reorder_point: "10.000",
  status: "active",
  payment_status: "paid",
  party_type: "customer",
  product_type: "simple",
  movement_type: "sale",
  sale_type: "retail",
  discount_type: "percentage",
  direction: "in",
  currency_code: "PKR",
  exchange_rate: "1.000000",
  is_active: true,
  is_tax_inclusive: false,
  created_at: "2026-07-11T09:14:22Z",
  updated_at: "2026-07-11T09:14:22Z",
  sale_date: "2026-07-11T09:14:21Z",
  payment_date: "2026-07-11T09:14:21Z",
  entry_date: "2026-07-11T09:14:21Z",
  shop: SHOP_ID,
  // Named companions of a foreign key. Guessing from the suffix alone gives
  // nonsense like "customer_name": "Beverages", so name the common ones.
  customer_name: "Bilal Traders",
  supplier_name: "Metro Cash & Carry",
  party_name: "Bilal Traders",
  warehouse_name: "Main Store",
  category_name: "Beverages",
  brand_name: "Nescafé",
  product_name: "Nescafé Classic 200g",
  variant_name: "Nescafé Classic 200g",
  cashier_name: "Ayesha Khan",
  unit_name: "Piece",
  payment_method_name: "Cash",
  customer_phone: "+923001234567",
  description: "Sale INV-00042",
  notes: "",
  reason: "Damaged in transit",
};

const NAME_SUFFIX_FALLBACK: Array<[RegExp, string]> = [
  [/_name$/, "Main Store"],
  [/_no$/, "DOC-00001"],
  [/_url$/, "https://media.tajirpoint.com/products/nescafe.jpg"],
  [/_code$/, "MAIN"],
  // Anything date-ish gets a date, whatever the serializer declared its type
  // as — "cheque_issue_date": "cheque issue date" helps nobody.
  [/(_at|_date)$/, "2026-07-11T09:14:22Z"],
  [/_id$/, "ext_9f3b6c5d"],
  [/_bank$/, "Meezan Bank"],
];

function exampleValue(f: ApiField): unknown {
  if (f.name in BY_NAME) return BY_NAME[f.name];

  const t = f.type;
  // An enum's first member is a real value; prefer it over any name guess.
  if (t.startsWith("enum(")) {
    const first = t.slice(5, -1).split(",")[0]?.trim();
    if (first) return first;
  }

  for (const [re, value] of NAME_SUFFIX_FALLBACK) {
    if (re.test(f.name)) return value;
  }

  if (t.startsWith("array")) return [];
  if (t === "uuid") return SHOP_ID;
  if (t === "datetime") return "2026-07-11T09:14:22Z";
  if (t === "boolean") return false;
  if (t === "integer") return 1;
  if (t === "number" || t === "decimal") return "0.00";
  if (t === "object") return {};
  // A bare "…" tells the reader nothing. Say what the field is.
  return f.name.replace(/_/g, " ");
}

function buildObject(fields: ApiField[], limit: number): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  for (const f of fields.slice(0, limit)) out[f.name] = exampleValue(f);
  return out;
}

/** The body a POST/PATCH actually accepts — required fields first, read-only dropped. */
export function requestExample(op: ApiOperation): string | null {
  const writable = op.requestFields.filter((f) => !f.readOnly);
  if (writable.length === 0) return null;

  const required = writable.filter((f) => f.required);
  const optional = writable.filter((f) => !f.required);
  const chosen = [...required, ...optional].slice(0, 10);

  return JSON.stringify(buildObject(chosen, chosen.length), null, 2);
}

const EXAMPLE_FIELD_LIMIT = 14;

/** The example stays valid JSON — a reader should be able to paste it into a
 *  fixture. If we trimmed fields, say so in the label, not with a `…` inside
 *  the braces. */
export function responseExample(op: ApiOperation): { json: string; omitted: number } | null {
  if (op.responseFields.length === 0) return null;

  const item = buildObject(op.responseFields, EXAMPLE_FIELD_LIMIT);
  const omitted = Math.max(0, op.responseFields.length - EXAMPLE_FIELD_LIMIT);

  const body = op.isList
    ? {
        next: `${API_BASE}${op.path}?cursor=cD0yMDI2LTA3LTExVDA5MTQyMlomcD00Mg`,
        previous: null,
        results: [item],
      }
    : item;

  return { json: JSON.stringify(body, null, 2), omitted };
}

/** A copy-pasteable cURL for this exact endpoint. It must run as written — a
 *  snippet with a `…` placeholder in it is a snippet you cannot paste. */
export function curlExample(op: ApiOperation): string {
  const path = op.path.replace("{id}", "42");
  const lines = [
    op.method === "GET"
      ? `curl ${API_BASE}${path} \\`
      : `curl -X ${op.method} ${API_BASE}${path} \\`,
    `  -H "Authorization: Bearer $TAJIR_TOKEN" \\`,
    `  -H "X-Shop-Id: ${SHOP_ID}"`,
  ];

  const body = requestExample(op);
  if (body) {
    lines[lines.length - 1] += ` \\`;
    // Money-moving writes must be retry-safe.
    if (op.path.includes("/sales/") || op.path.includes("/payments/")) {
      lines.push(`  -H "Idempotency-Key: $(uuidgen)" \\`);
    }
    lines.push(`  -H "Content-Type: application/json" \\`);
    lines.push(`  -d '${body.split("\n").join("\n  ")}'`);
  }
  return lines.join("\n");
}

/** Errors every endpoint can return, plus the ones specific to this method. */
export function errorsFor(op: ApiOperation): Array<{ code: string; when: string }> {
  const common = [
    { code: "401", when: "The access token is missing or has expired. Refresh and retry." },
    { code: "403", when: "Your role lacks permission, or X-Shop-Id is a shop you cannot access." },
    { code: "429", when: "Rate limited. Wait for Retry-After seconds." },
  ];

  if (op.method === "GET" && !op.isList) {
    return [{ code: "404", when: "No such record in this shop." }, ...common];
  }
  if (op.method !== "GET") {
    const errs = [
      { code: "400", when: "Validation failed. `details` names the offending fields." },
      ...common,
    ];
    if (op.path.includes("/sales/") || op.path.includes("/inventory/")) {
      errs.splice(1, 0, {
        code: "409",
        when: "Conflict — most often insufficient stock for one of the lines.",
      });
    }
    return errs;
  }
  return common;
}
