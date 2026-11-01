import type { AddonContent } from "./types";

// Source: domains/shopify (ShopifySyncService.push_product: one Shopify
// product per TajirPoint item; ingest_shopify_order via
// sales/services/external_order_import; webhooks/replay HANDLED_TOPICS
// orders/create, orders/paid, orders/updated, orders/cancelled,
// refunds/create; tasks.push_inventory_to_shopify and push_fulfillment exist
// but nothing calls them yet), woocommerce/api/connector_push (shared push
// screen), sales/services/channel_status_sync (cancel voids, refund = review).
const content: AddonContent = {
  slug: "shopify-sync",
  seoTitle: "Shopify POS Sync: Products Out, Orders In",
  seoDescription:
    "Connect your Shopify store to your shop counter. Send your products and prices to Shopify, and turn every Shopify order into a real sale with stock taken off.",
  keywords: [
    "Shopify POS integration",
    "sync Shopify with POS",
    "Shopify orders into POS",
    "Shopify inventory sync",
    "Shopify Pakistan POS",
  ],
  schemaSubCategory: "Shopify integration add-on for POS",
  headline: "Your Shopify store and your shop counter, on one set of books.",
  overview: [
    "Shopify is the online store builder many shops use to sell on their own website. If you sell in a shop as well, you end up typing products in twice and copying web orders into your till by hand. Shopify Sync will join the two.",
    "From TajirPoint you will pick which items to send to Shopify, with their name, description, brand and selling price. When a customer orders on Shopify, the order comes into TajirPoint as a proper sale: stock is taken off, the cost is recorded, and the money is booked the right way.",
    "If an order is later cancelled on Shopify, the sale in TajirPoint is cancelled too. A refund is flagged for you to check rather than changed silently.",
  ],
  whoFor: [
    "Shops that sell in store and on a Shopify website",
    "Owners tired of typing Shopify orders into the till",
    "Businesses that want one stock count for shop and website",
    "Shops whose accountant wants web sales in the same books",
  ],
  problems: [
    {
      problem: "Every Shopify order has to be typed into the till again.",
      fix: "Orders will arrive in TajirPoint as real sales on their own, matched to your items, with the stock taken off.",
    },
    {
      problem: "Adding a new product means doing it twice.",
      fix: "Add it once in TajirPoint, then send it to Shopify with its name, description and price from the connector screen.",
    },
    {
      problem: "Cash on delivery orders get lost between the website and the shop.",
      fix: "An unpaid cash on delivery order is recorded as money owed under a Shopify customer, so you can see what the courier still has to hand over.",
    },
    {
      problem: "A cancelled web order still shows as a sale.",
      fix: "When Shopify says an order is cancelled, the matching sale in TajirPoint is cancelled too.",
    },
  ],
  features: [
    {
      title: "Send products to Shopify",
      body: "Pick the items you want online, or send them all in batches. Name, description, brand and selling price go up, and later pushes update the same listing.",
    },
    {
      title: "Shopify orders become real sales",
      body: "Each new or paid Shopify order comes in once, as a normal sale. Stock moves, cost is recorded and the order total must match what Shopify charged.",
    },
    {
      title: "Paid and cash on delivery orders kept apart",
      body: "Money paid online is recorded as held by Shopify until it pays you out. Cash on delivery orders are recorded as owed until the cash arrives.",
    },
    {
      title: "Cancellations follow through",
      body: "A cancel on Shopify cancels the sale in TajirPoint. Refunds are flagged for you to review.",
    },
    {
      title: "Problem orders are kept, not lost",
      body: "If an order cannot be matched to your items or its total does not add up, it is saved on a list so you can fix it and try again.",
    },
    {
      title: "Matches items by Shopify listing or code",
      body: "Order lines are matched to the items you sent, or else by item code or barcode.",
    },
  ],
  howItWorks: [
    {
      title: "Tell us about your store",
      body: "Ask us from the Add-ons page. We need your Shopify store address and roughly how many products you have.",
    },
    {
      title: "Connect your Shopify store",
      body: "With our help you approve TajirPoint inside Shopify, and we set Shopify to send new orders to your account.",
    },
    {
      title: "Send your products",
      body: "Choose the items to list on Shopify and send them from the connector screen.",
    },
    {
      title: "Sell in both places",
      body: "Shopify orders arrive in TajirPoint as sales. Anything that needs a look waits on a list for you.",
    },
  ],
  needs: [
    "A Shopify store (your .myshopify.com address)",
    "A TajirPoint account on the Shop plan or above",
    "Item codes on your products help orders match cleanly",
  ],
  setup: [
    "Once it is live, our team sets it up with you; you do not switch it on alone.",
    "Your Shopify subscription and payment fees stay with Shopify.",
    "Your existing TajirPoint sales and stock are not changed by connecting.",
  ],
  faqs: [
    {
      q: "When will it be ready?",
      a: "It is built but still being tested with real stores, so we have no date yet. Ask us and we will tell you as soon as it opens.",
    },
    {
      q: "Will my stock levels update on Shopify by themselves?",
      a: "Not in the first version. Products and prices go up from TajirPoint, and orders come back down. Keeping Shopify's stock count updated after every sale is still being finished.",
    },
    {
      q: "What about items with sizes or colours?",
      a: "In the first version each size or colour goes up as its own Shopify listing. Grouping them under one listing is not done yet.",
    },
    {
      q: "What happens if a Shopify order does not match my items?",
      a: "It is not lost. It waits on a list with the reason, so you can fix the item and import it again.",
    },
    {
      q: "Can I bring my existing Shopify products into TajirPoint?",
      a: "Yes. The product import in the back office reads a Shopify product export file, and that works without this add-on.",
    },
    {
      q: "Which plan do I need?",
      a: "Shopify Sync needs the Shop plan or above. It is not part of the free Light plan.",
    },
  ],
  comingSoonNote:
    "Built and being tested; not open to shops yet. Ask us and we will tell you when it is ready.",
};

export default content;
