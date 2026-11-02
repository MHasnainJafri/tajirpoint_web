import type { AddonContent } from "./types";
import { BRAND_NAME } from "@/lib/config/brand";

// Source: domains/magento (package docstring: "working foundation, not a
// production-ready integration yet"; MagentoSyncService.push_product: every
// variant a simple product, SKU required, stock_item qty; push_inventory
// exists but no stock-movement signal calls it; webhooks/handler needs a
// webhook module on the Magento side; magento_importable: state processing or
// complete, not held), sales/services/external_order_import,
// woocommerce/api/connector_push.
const content: AddonContent = {
  slug: "magento-sync",
  seoTitle: "Magento POS Sync: Products Out, Orders In",
  seoDescription:
    "Connect a Magento 2 or Adobe Commerce store to your shop counter. Send products, prices and stock to Magento, and bring paid web orders in as real sales.",
  keywords: [
    "Magento POS integration",
    "Magento 2 POS sync",
    "Adobe Commerce POS",
    "Magento orders to POS",
    "Magento inventory sync",
  ],
  schemaSubCategory: "Magento integration add-on for POS",
  headline: "Bring your Magento web orders and your shop stock together.",
  overview: [
    `Magento (now also sold as Adobe Commerce) is a powerful online store system, usually run by larger retailers with their own web team. Magento Sync will link a Magento 2 store to ${BRAND_NAME}, so web orders land in the same books as your counter sales.`,
    `You will send items from ${BRAND_NAME} to Magento with their name, selling price and current stock. Orders that Magento has accepted for processing come back into ${BRAND_NAME} as real sales, with stock taken off and the money booked the right way.`,
    "The first version keeps things simple: every item goes to Magento as a plain product. Stores with complex product setups, such as configurable products with many options, will need extra mapping work, which we will scope with you.",
  ],
  whoFor: [
    "Retailers already running a Magento 2 or Adobe Commerce website",
    "Shops with a web team or agency looking after their Magento store",
    "Businesses that want web orders and shop sales in one set of books",
    "Retailers selling the same stock in store and online",
  ],
  problems: [
    {
      problem: "Web orders are re-typed into the shop system every day.",
      fix: `Processed Magento orders will come into ${BRAND_NAME} as real sales, once each, matched to your items.`,
    },
    {
      problem: "New products have to be created in two systems.",
      fix: `Create the item once in ${BRAND_NAME}, then send it to Magento with its price and stock from the connector screen.`,
    },
    {
      problem: "Cash on delivery money is hard to track.",
      fix: "Cash on delivery, bank transfer and cheque orders are recorded as owed under a Magento customer until the money arrives.",
    },
    {
      problem: "Cancelled web orders still sit in the sales report.",
      fix: `When Magento marks an order cancelled, the sale in ${BRAND_NAME} is cancelled too. Refunds are flagged for you to check.`,
    },
  ],
  features: [
    {
      title: "Send products to Magento",
      body: "Pick items or send them all in batches. Name, selling price and stock on hand go up, and sending again updates the same product.",
    },
    {
      title: "Orders become real sales",
      body: "Orders that reach processing or complete in Magento come in as sales. Orders on hold for fraud or review are left until they are cleared.",
    },
    {
      title: "Paid and unpaid orders kept apart",
      body: "Online payments are recorded as held by your payment provider until payout. Offline payments are recorded as owed.",
    },
    {
      title: "Cancels and refunds followed",
      body: "A cancelled order cancels the sale; a refund or credit is flagged for you to review.",
    },
    {
      title: "Problem orders saved for later",
      body: "An order that cannot be matched to your items or does not add up waits on a list with the reason, ready to retry.",
    },
  ],
  howItWorks: [
    {
      title: "Ask us from the Add-ons page",
      body: "Tell us your store address, roughly how many products you have, and which way you want things to sync.",
    },
    {
      title: `Give ${BRAND_NAME} access to Magento`,
      body: `Your web team creates an access key for ${BRAND_NAME} in Magento, and sets Magento to send new orders to us. We help with both.`,
    },
    {
      title: "Send your products",
      body: "Choose which items to list and send them with their price and stock.",
    },
    {
      title: "Sell online and in store",
      body: `Processed Magento orders arrive in ${BRAND_NAME} as sales; anything that needs a look waits on a list.`,
    },
  ],
  needs: [
    "A Magento 2 or Adobe Commerce store with admin access",
    "A way for Magento to send out new orders: Adobe Commerce's own module (2.4.6 or newer) or a similar plugin",
    "An item code on every product you send (Magento requires one)",
    `A ${BRAND_NAME} account on the Shop plan or above`,
  ],
  setup: [
    "Once it is live, our team sets it up with you and your web team.",
    "Your Magento hosting, plugins and payment fees stay with your own providers.",
    `Your existing ${BRAND_NAME} sales and stock are not changed by connecting.`,
  ],
  faqs: [
    {
      q: "When will it be ready?",
      a: "It is built but still being tested with real stores, so we have no date yet. Ask us and we will tell you as soon as it opens.",
    },
    {
      q: "Does stock update on Magento after every sale?",
      a: "Not in the first version. Stock is sent each time you send products. Updating Magento automatically after every sale is still being finished.",
    },
    {
      q: "Does it support configurable products with options?",
      a: "Not yet. Every item goes to Magento as a plain product. If your store relies on configurable products, talk to us first.",
    },
    {
      q: "Why does every product need an item code?",
      a: `Magento identifies products by their code. ${BRAND_NAME} uses the same code to match Magento orders back to your items.`,
    },
    {
      q: "What happens to an order that does not match?",
      a: "It is not lost. It waits on a list with the reason, so you can fix it and import it again.",
    },
    {
      q: "Which plan do I need?",
      a: "Magento Sync needs the Shop plan or above. It is not part of the free Light plan.",
    },
  ],
  comingSoonNote:
    "Built as a first version and being tested; not open to shops yet. Ask us and we will tell you when it is ready.",
};

export default content;
