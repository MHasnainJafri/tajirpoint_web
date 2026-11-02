import type { AddonContent } from "./types";
import { BRAND_NAME } from "@/lib/config/brand";

// Source: domains/integrations (models AggregatorAccount providers, AggregatorOrder
// statuses, AggregatorProductMap; services/aggregator_order_service,
// aggregator_pushback, adapters/* thin and unverified against live accounts),
// domains/extensions/management/commands/configure_extensions.py (coming soon).
const content: AddonContent = {
  slug: "delivery-aggregator",
  seoTitle: "Delivery Aggregator: Foodpanda, Talabat & Careem Orders",
  seoDescription: `Coming soon: one inbox in ${BRAND_NAME} for Foodpanda, Talabat, Careem, Bykea, Deliveroo, Uber Eats and Just Eat orders, turned into sales with status sent back.`,
  keywords: [
    "Foodpanda POS integration",
    "Talabat orders in POS",
    "Careem food orders POS",
    "delivery app order inbox",
    "food delivery aggregator integration",
    "cloud kitchen order management",
  ],
  schemaSubCategory: "Food delivery app integration add-on for POS",
  headline: "One inbox for your delivery app orders, straight into the POS.",
  overview: [
    `Delivery Aggregator will bring orders from food delivery apps into one inbox in ${BRAND_NAME}, so nobody has to re-type them into the till. It is being built for Foodpanda, Talabat, Careem, Bykea, Deliveroo, Uber Eats and Just Eat.`,
    "Each app's items are matched to yours once. After that, an accepted order becomes a real sale, with a kitchen ticket if you use the Restaurant add-on, and status changes such as ready, picked up and delivered are sent back to the app.",
    "It is not open to shops yet. The connections to each app still need testing against real accounts. Once it is live, our team will set it up with you.",
  ],
  whoFor: [
    "Restaurants and takeaways on Foodpanda, Talabat or Careem",
    "Cloud kitchens running several brands on several apps",
    "Kitchens juggling one tablet per delivery app",
    "Restaurant groups that want app orders in the same reports as the counter",
  ],
  problems: [
    {
      problem: "Staff copy every app order into the POS by hand.",
      fix: "Orders will arrive in one inbox and become sales when accepted, with no re-typing.",
    },
    {
      problem: "The app's item names never match the menu in the till.",
      fix: "You will match each app's items to yours once, right from the inbox. Later orders use the same match.",
    },
    {
      problem: "The app keeps showing 'preparing' after the rider has left.",
      fix: "When you mark an order ready, picked up, delivered or cancelled, the change will be sent back to the app.",
    },
    {
      problem: "Several brands from one kitchen get mixed up.",
      fix: "Each app listing can be tied to one of your kitchen brands, so its orders are tagged with that brand.",
    },
  ],
  features: [
    {
      title: "One inbox for every delivery app",
      body: `Orders from Foodpanda, Talabat, Careem, Bykea, Deliveroo, Uber Eats and Just Eat will land in one list in ${BRAND_NAME}.`,
    },
    {
      title: "Match their items to yours",
      body: "Match each app's items to your own products once. An order with an item not matched yet waits in the inbox until you match it.",
    },
    {
      title: "Accepted orders become sales",
      body: "Accepting an order creates a normal sale, so stock, takings and reports stay right. With the Restaurant add-on, a kitchen ticket is made too.",
    },
    {
      title: "Status sent back to the app",
      body: `Accepted, ready, picked up, delivered and cancelled are sent back to the app. If the app does not answer, ${BRAND_NAME} tries again.`,
    },
    {
      title: "Accept automatically when everything matches",
      body: "Turn on automatic accept for an app, and orders whose items are all matched skip the inbox. Anything unmatched still waits for a person.",
    },
    {
      title: "A dispatcher role with limited rights",
      body: "Give the person running the inbox a dispatcher login that can work orders but cannot edit sales or give discounts.",
    },
  ],
  howItWorks: [
    {
      title: "Tell us you want it",
      body: "Press the button on the add-on and tell us which delivery apps you are on and in which city. We will let you know when it is ready.",
    },
    {
      title: "We connect your app accounts",
      body: "Once it is live, our team links your delivery app accounts to your shop with you.",
    },
    {
      title: "Match your items",
      body: "Match each app's items to your products. You only do this once per item.",
    },
    {
      title: "Accept and cook",
      body: "Orders arrive in the inbox. Accept them, or let fully matched orders accept themselves, and the status goes back to the app as you work.",
    },
  ],
  needs: [
    `A ${BRAND_NAME} account on the Shop plan or above`,
    "A merchant account with each delivery app you sell on",
    "Access to each app's partner connection details (we help you find them)",
    "The Restaurant add-on if you want kitchen tickets",
  ],
  setup: [
    "Coming soon: it cannot be installed yet.",
    "Once live, our team will set it up with you; you will not install it yourself.",
    "Each delivery app keeps its own commission and agreement with you.",
  ],
  faqs: [
    {
      q: "When will it be ready?",
      a: "The inbox, item matching and status updates are built. Each app connection still has to be tested against real accounts before we open it to shops. We do not have a date yet; ask us and we will tell you when it is ready.",
    },
    {
      q: "Which delivery apps will it cover?",
      a: "It is being built for Foodpanda, Talabat, Careem, Bykea, Deliveroo, Uber Eats and Just Eat. Each one will open when it has been tested.",
    },
    {
      q: "I am in the UK. Can I get Uber Eats, Deliveroo and Just Eat orders today?",
      a: "Yes, through the HubRise add-on, which is live now and set up by our team. Delivery Aggregator is for connecting the apps directly, without HubRise.",
    },
    {
      q: "What happens to an order with an item that is not matched?",
      a: "It waits in the inbox. Match the item and accept the order, and the match is remembered for next time.",
    },
    {
      q: "Will app orders show in my reports?",
      a: `Yes. Every accepted order becomes a normal sale in ${BRAND_NAME}.`,
    },
    {
      q: "Is it included in the free Light plan?",
      a: "No. Delivery Aggregator will need the Shop plan or above.",
    },
  ],
  comingSoonNote:
    "Built, with each delivery app connection still to be tested on real accounts; not open to shops yet. Ask us and we will tell you when it is ready.",
};

export default content;
