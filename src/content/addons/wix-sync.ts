import type { AddonContent } from "./types";

// Source: domains/wix (WixSyncService.push_product: simple products, name cut
// to 80 chars, trackInventory flag only, wix_variant_id stored empty so
// push_inventory never sends a count; _import_order: WIX_IMPORTED_STATUSES
// PAID / PARTIALLY_PAID / APPROVED; wix_channel_state: cancel voids, refunds
// flagged; config: API key + site ID + webhook secret),
// sales/services/external_order_import, woocommerce/api/connector_push.
const content: AddonContent = {
  slug: "wix-sync",
  seoTitle: "Wix Stores POS Sync: Products and Orders",
  seoDescription:
    "Link your Wix Stores website to your shop till. Send products and prices to Wix, and bring paid Wix orders into your POS as real sales with stock taken off.",
  keywords: [
    "Wix POS integration",
    "Wix Stores sync",
    "Wix orders to POS",
    "Wix website shop POS",
    "connect Wix to POS",
  ],
  schemaSubCategory: "Wix Stores integration add-on for POS",
  headline: "Your Wix website orders, straight into your shop's books.",
  overview: [
    "Wix is a website builder that many small shops use to get online quickly, and Wix Stores is its built-in online shop. Wix Sync will connect that shop to TajirPoint, so you stop copying orders across by hand.",
    "From TajirPoint you will send items to your Wix store with their name, item code and selling price. When a customer pays for an order on Wix, it comes into TajirPoint as a real sale: stock is taken off your shop count and the money is booked the right way.",
    "The first version is kept simple. Each item goes to Wix as a single product without size or colour options, and orders flow one way, from Wix into TajirPoint.",
  ],
  whoFor: [
    "Small shops with a website built on Wix",
    "Owners who take a handful of web orders a day and type them in by hand",
    "Shops that want web sales in the same daily report as counter sales",
    "Businesses selling simple products without many options",
  ],
  problems: [
    {
      problem: "Wix orders are copied into the till one by one.",
      fix: "Paid Wix orders will come into TajirPoint once each, as real sales matched to your items.",
    },
    {
      problem: "Web sales never show up in the shop's stock.",
      fix: "An imported Wix order takes the stock off in TajirPoint, the same as a counter sale.",
    },
    {
      problem: "Listing products on Wix takes an evening every time.",
      fix: "Pick items in TajirPoint and send them to Wix with their name, code and price.",
    },
    {
      problem: "A cancelled Wix order still counts as a sale.",
      fix: "When Wix says an order is cancelled, the sale in TajirPoint is cancelled too. Refunds are flagged for you to check.",
    },
  ],
  features: [
    {
      title: "Send products to Wix",
      body: "Pick items or send them all in batches. Name, item code and selling price go up, and sending again updates the same product.",
    },
    {
      title: "Paid orders become real sales",
      body: "Orders Wix marks as paid, part paid or approved come in once each, with stock taken off and the cost recorded.",
    },
    {
      title: "Unpaid money recorded as owed",
      body: "Only an order fully paid online counts as money in. Part-paid, approved-but-unpaid and offline-paid orders are recorded as owed under a Wix customer.",
    },
    {
      title: "Cancels and refunds followed",
      body: "A cancelled order cancels the sale. A refund is flagged for you to review rather than changed silently.",
    },
    {
      title: "Problem orders saved, not lost",
      body: "An order that cannot be matched or whose total does not add up waits on a list with the reason, ready to retry.",
    },
  ],
  howItWorks: [
    {
      title: "Ask us from the Add-ons page",
      body: "Tell us your Wix site address, roughly how many products you have, and which way you want things to sync.",
    },
    {
      title: "Connect your Wix site",
      body: "We help you create an access key in your Wix account and connect it, along with your site ID.",
    },
    {
      title: "Send your products",
      body: "Choose which items to list on Wix and send them from the connector screen.",
    },
    {
      title: "Take orders online",
      body: "Wix sends paid orders to TajirPoint, where they become sales in your reports.",
    },
  ],
  needs: [
    "A Wix website with Wix Stores (a Wix plan that allows online selling)",
    "Access to your Wix account to create an access key",
    "A TajirPoint account on the Shop plan or above",
    "Item codes on your products help orders match cleanly",
  ],
  setup: [
    "Once it is live, our team sets it up with you; you do not switch it on alone.",
    "Your Wix plan and payment fees stay with Wix.",
    "Your existing TajirPoint sales and stock are not changed by connecting.",
  ],
  faqs: [
    {
      q: "When will it be ready?",
      a: "It is built as a first version and still being tested, so we have no date yet. Ask us and we will tell you as soon as it opens.",
    },
    {
      q: "Will my stock count show on Wix?",
      a: "Not in the first version. Products go to Wix without a stock count, so keep an eye on items that sell fast. Sending stock counts to Wix is planned.",
    },
    {
      q: "Can I list items with sizes or colours?",
      a: "Not yet. Each item goes to Wix as a single product without options.",
    },
    {
      q: "Which Wix orders come in?",
      a: "Orders Wix marks as paid, part paid or approved. Cancelled, refunded or unpaid orders are not turned into sales.",
    },
    {
      q: "What if an order does not match my items?",
      a: "It waits on a list with the reason, so you can fix the item and import it again.",
    },
    {
      q: "Which plan do I need?",
      a: "Wix Sync needs the Shop plan or above. It is not part of the free Light plan.",
    },
  ],
  comingSoonNote:
    "Built as a first version and being tested; not open to shops yet. Ask us and we will tell you when it is ready.",
};

export default content;
