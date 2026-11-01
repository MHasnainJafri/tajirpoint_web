import type { AddonContent } from "./types";

// Source: domains/bigcommerce (BCSyncService.push_product: every variant a
// simple physical product with inventory_level; push_inventory exists but no
// stock-movement signal calls it; BC_CAPTURED_STATUS_IDS imported,
// BC_SKIPPED_STATUS_IDS skipped until captured, BC_REVIEW_STATUS_IDS refused
// for a person; webhook re-fetches the full order from the store; config:
// store hash, access token, client ID, webhook secret),
// sales/services/external_order_import, woocommerce/api/connector_push.
const content: AddonContent = {
  slug: "bigcommerce-sync",
  seoTitle: "BigCommerce POS Sync: Products, Stock and Orders",
  seoDescription:
    "Connect your BigCommerce store to your shop till. Send products, prices and stock to BigCommerce, and bring paid orders in as real sales with stock taken off.",
  keywords: [
    "BigCommerce POS integration",
    "BigCommerce inventory sync",
    "BigCommerce orders to POS",
    "connect BigCommerce to POS",
    "BigCommerce retail POS",
  ],
  schemaSubCategory: "BigCommerce integration add-on for POS",
  headline: "Paid BigCommerce orders, booked in your shop like any other sale.",
  overview: [
    "BigCommerce is an online store platform used by growing online retailers in many countries, including the UK. BigCommerce Sync will link your BigCommerce store to TajirPoint, so web orders and shop sales share one stock count and one set of books.",
    "You will send items from TajirPoint to BigCommerce with their name, item code, selling price and stock on hand. When an order's payment is confirmed on BigCommerce, it comes into TajirPoint as a real sale, with stock taken off and the money booked the right way.",
    "TajirPoint only books orders once BigCommerce confirms the payment. Orders still awaiting payment are skipped, and come in the moment they are paid. Part-refunded or disputed orders are set aside for you to settle by hand.",
  ],
  whoFor: [
    "Retailers selling online through a BigCommerce store",
    "Shops in the UK and abroad with a counter and a website",
    "Owners who want web orders in the same daily report as shop sales",
    "Businesses selling simple products without many options",
  ],
  problems: [
    {
      problem: "Online orders are typed into the shop system by hand.",
      fix: "Paid BigCommerce orders will arrive in TajirPoint as real sales, once each, matched to your items.",
    },
    {
      problem: "Unpaid checkouts get counted as sales.",
      fix: "Only orders with confirmed payment become sales. Unfinished or unpaid ones are skipped until they are paid.",
    },
    {
      problem: "Listing products on the website means doing it twice.",
      fix: "Send items from TajirPoint to BigCommerce with their price and current stock.",
    },
    {
      problem: "Cancelled orders stay in the shop's sales.",
      fix: "When BigCommerce marks an order cancelled, the sale in TajirPoint is cancelled too. Refunds are flagged for you to check.",
    },
  ],
  features: [
    {
      title: "Send products with stock",
      body: "Pick items or send them all in batches. Name, item code, selling price and stock on hand go up; sending again updates the same product.",
    },
    {
      title: "Only paid orders become sales",
      body: "Orders come in once BigCommerce confirms the payment, with stock taken off and the cost recorded.",
    },
    {
      title: "Full order details checked",
      body: "TajirPoint reads the full order from your store before booking it, and the total must match what BigCommerce charged.",
    },
    {
      title: "Offline payments recorded as owed",
      body: "Orders paid by cash on delivery, bank deposit, cheque or in store are recorded as owed until the money arrives.",
    },
    {
      title: "Cancels, refunds and disputes followed",
      body: "A cancelled order cancels the sale. Refunds and disputes are flagged or set aside for you to review.",
    },
    {
      title: "Problem orders saved for later",
      body: "An order that cannot be matched to your items waits on a list with the reason, ready to retry once fixed.",
    },
  ],
  howItWorks: [
    {
      title: "Ask us from the Add-ons page",
      body: "Tell us your store address, roughly how many products you have, and which way you want things to sync.",
    },
    {
      title: "Connect your BigCommerce store",
      body: "We help you create an access key in your BigCommerce control panel and connect it to TajirPoint.",
    },
    {
      title: "Send your products",
      body: "Choose which items to list and send them with their price and stock.",
    },
    {
      title: "Sell online and in store",
      body: "BigCommerce tells TajirPoint about new and changed orders; paid ones become sales in your reports.",
    },
  ],
  needs: [
    "A BigCommerce store with access to its control panel",
    "A TajirPoint account on the Shop plan or above",
    "Item codes on your products help orders match cleanly",
  ],
  setup: [
    "Once it is live, our team sets it up with you; you do not switch it on alone.",
    "Your BigCommerce plan and payment fees stay with BigCommerce.",
    "Your existing TajirPoint sales and stock are not changed by connecting.",
  ],
  faqs: [
    {
      q: "When will it be ready?",
      a: "It is built as a first version and still being tested, so we have no date yet. Ask us and we will tell you as soon as it opens.",
    },
    {
      q: "Does stock update on BigCommerce after every sale?",
      a: "Not in the first version. Stock is sent each time you send products. Updating BigCommerce automatically after every sale is still being finished.",
    },
    {
      q: "Can I list items with sizes or colours?",
      a: "Not yet. Each item goes to BigCommerce as its own simple product without options.",
    },
    {
      q: "What happens to an order that is awaiting payment?",
      a: "It is skipped. When BigCommerce confirms the payment, the order comes in then.",
    },
    {
      q: "What if an order is part refunded or disputed?",
      a: "It is not booked automatically. It is set aside on a list so you can decide what was really kept.",
    },
    {
      q: "Which plan do I need?",
      a: "BigCommerce Sync needs the Shop plan or above. It is not part of the free Light plan.",
    },
  ],
  comingSoonNote:
    "Built as a first version and being tested; not open to shops yet. Ask us and we will tell you when it is ready.",
};

export default content;
