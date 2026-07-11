/**
 * Human descriptions for each operation, keyed by "METHOD path".
 *
 * The generator pulls `description` from the OpenAPI schema, but DRF fills that
 * from the *viewset's docstring* — which is written for the people maintaining
 * the server ("Base viewset that injects shop on create and applies tenant
 * permissions…"). That is noise to someone integrating from the outside, so
 * anything we ship is written here instead.
 */
export const DESCRIPTIONS: Record<string, string> = {
  // Catalog
  "GET /catalog/products/":
    "List the products in a shop. Returns the sellable catalog — a product with its default variant, price and stock summary.",
  "POST /catalog/products/":
    "Create a product. A product with no explicit variants gets one default variant, which is what carries the SKU, barcode and stock.",
  "GET /catalog/products/{id}/":
    "Retrieve one product with every variant, its pricing tiers and its custom fields.",
  "PATCH /catalog/products/{id}/": "Update a product. Send only the fields you are changing.",
  "DELETE /catalog/products/{id}/":
    "Soft-delete a product. It stops appearing in the catalog but stays attached to the sales that already reference it — history is never rewritten.",
  "GET /catalog/categories/": "List categories. Categories nest, so each may have a parent.",
  "POST /catalog/categories/": "Create a category.",
  "GET /catalog/brands/": "List brands.",
  "POST /catalog/brands/": "Create a brand.",

  // Inventory
  "GET /inventory/stock-levels/":
    "Current quantity per variant per warehouse. `quantity_available` is on-hand minus reserved — that is the number you can actually sell.",
  "GET /inventory/stock-movements/":
    "The audit trail. Every change to stock produces a movement tied to its cause: a sale, a return, a purchase, an adjustment or a transfer. Stock is never edited in place, so this list always explains the current level.",
  "GET /inventory/adjustments/": "List stock adjustments — recounts, damage, write-offs.",
  "POST /inventory/adjustments/":
    "Adjust stock outside the normal flow. Use this for a recount or a write-off, and always give a reason: the adjustment is what an auditor reads to understand why the number changed.",
  "GET /inventory/transfers/": "List stock transfers between warehouses.",
  "POST /inventory/transfers/":
    "Move stock between warehouses. Stock leaves the source immediately and lands at the destination when the transfer is received.",

  // Sales
  "GET /sales/sales/": "List sales (invoices).",
  "POST /sales/sales/":
    "Create a sale. This is one transaction: stock is decremented, COGS and revenue are booked, tax is computed, and the customer is either settled or credited to their khata. If any part fails, none of it happens. Send an Idempotency-Key — do not let a retry become a second sale.",
  "GET /sales/sales/{id}/":
    "Retrieve one sale with its line items, payments, tax breakdown and any returns against it.",

  // Returns
  "GET /sales/returns/": "List returns and refunds.",
  "POST /sales/returns/":
    "Return part or all of a sale. Stock goes back at the cost it originally left at, not today's cost, so margin history stays honest. The refund either reduces the customer's khata balance or pays out — never both.",

  // Parties
  "GET /parties/parties/":
    "List customers or suppliers. They share one model; filter on `party_type` to pick.",
  "POST /parties/parties/": "Create a customer or a supplier.",
  "GET /parties/parties/{id}/":
    "Retrieve one party with its current khata balance and credit limit.",
  "PATCH /parties/parties/{id}/": "Update a party.",

  // Khata
  "GET /parties/ledger-entries/":
    "The khata: the running credit ledger for a customer or supplier. Every entry carries `running_balance` — the balance after that entry — so you never have to sum the history yourself, and a page of entries is meaningful on its own.",

  // Payments
  "GET /payments/payments/": "List payments received or paid.",
  "POST /payments/payments/":
    "Record a payment against a party. Money in from a customer, or out to a supplier — `direction` decides. Send an Idempotency-Key.",
  "GET /payments/methods/":
    "The payment methods this shop accepts — cash, card, bank transfer, wallet. You need a method id to record a payment.",

  // Purchases
  "GET /purchases/orders/": "List purchase orders — what you have asked a supplier for.",
  "POST /purchases/orders/": "Raise a purchase order.",
  "GET /purchases/purchases/": "List goods-received notes — what actually arrived.",
  "POST /purchases/purchases/":
    "Receive goods into stock. This creates the cost layers that later sales consume and that returns reverse against, so the unit cost you send here is the cost that follows the item through its whole life.",
};

export function describe(method: string, path: string, fallback: string): string {
  const written = DESCRIPTIONS[`${method} ${path}`];
  if (written) return written;
  // Never show a server-side docstring to an integrator.
  if (/viewset|queryset|serializer|required_roles|permission/i.test(fallback)) return "";
  return fallback;
}
