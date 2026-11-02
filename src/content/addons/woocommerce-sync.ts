import type { AddonContent } from "./types";
import { BRAND_NAME } from "@/lib/config/brand";

// Source: domains/woocommerce (WooSyncService.push_product: simple product, or
// variable parent + variations when a product has several variants;
// _stock_fields; signals._on_stock_movement_push_woo gated by
// push_inventory_on_movement; receive_order/_import_order via
// sales/services/external_order_import; woo_channel_state: cancelled voids,
// refunds and on-hold/failed flagged), woocommerce/api/connector_push.
const content: AddonContent = {
  slug: "woocommerce-sync",
  seoTitle: "WooCommerce POS Sync: Products, Stock and Orders",
  seoDescription:
    "Link your WooCommerce website to your shop till. Send products with sizes and stock, keep stock updated after each sale, and bring web orders in as sales.",
  keywords: [
    "WooCommerce POS integration",
    "WooCommerce inventory sync",
    "WooCommerce orders to POS",
    "WordPress shop POS sync",
    "WooCommerce Pakistan POS",
  ],
  schemaSubCategory: "WooCommerce integration add-on for POS",
  headline: "One stock count for your WooCommerce website and your shop.",
  overview: [
    `WooCommerce is the free shop plugin for WordPress websites, used by many shops that built their own site. WooCommerce Sync will connect that website to ${BRAND_NAME} so your products, stock and orders stay in step.`,
    `You will send items from ${BRAND_NAME} to WooCommerce with their price and stock. Products with sizes or colours go up as one product with options, the way WooCommerce shows them. After that, every time stock changes in ${BRAND_NAME}, the new count can be sent to your website on its own.`,
    `Orders from your website come into ${BRAND_NAME} as real sales, with stock taken off and the money booked the right way. Cancelled orders are cancelled in ${BRAND_NAME} too, and refunds are flagged for you to check.`,
  ],
  whoFor: [
    "Shops with a WordPress website running WooCommerce",
    "Owners who sell the same stock in store and online",
    "Shops that oversell online because the website stock is out of date",
    "Businesses that take cash on delivery orders from their website",
  ],
  problems: [
    {
      problem: "The website says in stock, but the last one sold in the shop this morning.",
      fix: `When stock changes in ${BRAND_NAME}, the new count is sent to WooCommerce automatically. You can turn this off if you prefer.`,
    },
    {
      problem: "Website orders are copied into the till by hand.",
      fix: `Each WooCommerce order will arrive in ${BRAND_NAME} once, as a real sale matched to your items.`,
    },
    {
      problem: "Products with sizes are a pain to set up twice.",
      fix: "A product with several sizes or colours goes up as one WooCommerce product with options.",
    },
    {
      problem: "Nobody knows which cash on delivery orders are still unpaid.",
      fix: "Cash on delivery, bank transfer and cheque orders are recorded as owed under a WooCommerce customer until the money comes in.",
    },
  ],
  features: [
    {
      title: "Send products with their options",
      body: "Pick items or send them all in batches. Single items go up as simple products; items with sizes or colours go up as one product with options.",
    },
    {
      title: "Stock follows every sale",
      body: `Each stock change in ${BRAND_NAME} sends the new count to WooCommerce. Items you do not count are shown as always in stock.`,
    },
    {
      title: "Website orders become real sales",
      body: "Orders come in once each, with stock taken off and cost recorded. The total must match what WooCommerce charged.",
    },
    {
      title: "Paid and unpaid orders handled right",
      body: "Online payments are recorded as held by your payment provider until payout. Cash on delivery orders are recorded as owed.",
    },
    {
      title: "Order changes follow through",
      body: "A cancelled order cancels the sale. A refund, or an order put on hold or failed after import, is flagged for you to review.",
    },
    {
      title: "Nothing is lost",
      body: "An order that cannot be matched or does not add up waits on a list with the reason, ready to try again once fixed.",
    },
  ],
  howItWorks: [
    {
      title: "Ask us from the Add-ons page",
      body: "Tell us your website address, roughly how many products you have, and which way you want things to sync.",
    },
    {
      title: "Create access keys in WooCommerce",
      body: `We show you how to create access keys in your WooCommerce settings, and we connect them to ${BRAND_NAME} with you.`,
    },
    {
      title: "Send your products",
      body: "Choose which items to list and send them from the connector screen, with stock and prices.",
    },
    {
      title: "Let orders flow in",
      body: `WooCommerce is set to send new orders to ${BRAND_NAME}, where they become sales. Stock updates go back on their own.`,
    },
  ],
  needs: [
    "A WordPress website with WooCommerce installed",
    "Admin access to create WooCommerce access keys",
    `A ${BRAND_NAME} account on the Shop plan or above`,
    "Item codes on your products help orders match cleanly",
  ],
  setup: [
    "Once it is live, our team sets it up with you; you do not switch it on alone.",
    "Your website hosting and payment fees stay with your own providers.",
    "Automatic stock updates are on by default and can be turned off.",
  ],
  faqs: [
    {
      q: "When will it be ready?",
      a: "It is built but still being tested with real websites, so we have no date yet. Ask us and we will tell you as soon as it opens.",
    },
    {
      q: "Does stock update on my website by itself?",
      a: `Yes. When stock changes in ${BRAND_NAME}, the new count is sent to WooCommerce. You can switch this off if you only want to update by hand.`,
    },
    {
      q: "Can it handle sizes and colours?",
      a: "Yes. A product with several options goes up as one WooCommerce product with options, not as separate products.",
    },
    {
      q: "What happens to cash on delivery orders?",
      a: "They come in as sales that are owed, under a WooCommerce customer, so you can record the cash when the courier hands it over.",
    },
    {
      q: `Can I bring my existing WooCommerce products into ${BRAND_NAME}?`,
      a: "Yes. The product import in the back office reads a WooCommerce product export file, and that works without this add-on.",
    },
    {
      q: "Which plan do I need?",
      a: "WooCommerce Sync needs the Shop plan or above. It is not part of the free Light plan.",
    },
  ],
  comingSoonNote:
    "Built and being tested; not open to shops yet. Ask us and we will tell you when it is ready.",
};

export default content;
