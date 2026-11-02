import type { AddonContent } from "./types";
import { BRAND_NAME } from "@/lib/config/brand";

// Source: domains/hubrise (services/order_ingest, receiver_bridge, catalog_service,
// channel_prices, marketplace_menu, charges_owner, problems; signals.py: no
// automatic menu push), domains/extensions/access.py (Contact us listing).
const content: AddonContent = {
  slug: "hubrise",
  seoTitle: "HubRise Add-on: Uber Eats, Deliveroo & Just Eat Orders",
  seoDescription:
    "Get Uber Eats, Deliveroo, Just Eat and other HubRise orders straight into your POS and kitchen, publish your menu from the till and send order status back.",
  keywords: [
    "HubRise POS integration",
    "Uber Eats orders in POS",
    "Deliveroo POS integration",
    "Just Eat orders to till",
    "delivery app orders in one place",
    "restaurant marketplace menu sync",
  ],
  schemaSubCategory: "Delivery marketplace integration add-on for POS",
  headline: "Delivery app orders arrive in your POS and kitchen, not on a pile of tablets.",
  overview: [
    `HubRise is a service that links a restaurant to delivery apps such as Uber Eats, Deliveroo, Just Eat and Glovo. This add-on connects your HubRise location to ${BRAND_NAME}, so orders from every app connected there arrive in your POS as real sales.`,
    "Each order rings on your Order Desk like any online order, goes to the kitchen screen and printers once it is accepted, and every move you make (accepted, ready, picked up, cancelled) is sent back to HubRise and on to the app.",
    `You also publish your menu from ${BRAND_NAME}: one price for all delivery apps, or a different price for each one, with items you can hide on some apps. Our team connects your HubRise location with you and checks the first orders.`,
  ],
  whoFor: [
    "Restaurants and takeaways selling on Uber Eats, Deliveroo, Just Eat or Glovo",
    "Kitchens tired of re-typing app orders into the till",
    "Owners who want delivery app sales in the same reports as the counter",
    "Shops that charge different prices on different delivery apps",
    "Anyone who already has, or is opening, a HubRise account",
  ],
  problems: [
    {
      problem: "Every delivery app has its own tablet, and orders get missed.",
      fix: `All orders from your HubRise location ring on the ${BRAND_NAME} Order Desk and show on the kitchen screen, in one place.`,
    },
    {
      problem: "Staff re-type app orders into the till, with mistakes.",
      fix: "Each order becomes a real sale with the right items, options, tax and payment, without anyone typing it in.",
    },
    {
      problem: "Changing a price means editing it in every app.",
      fix: `Set your delivery app prices in ${BRAND_NAME} and publish the menu. Give an app its own price, or raise one app's prices by a percentage in one go.`,
    },
    {
      problem: "When something goes wrong, nobody knows why.",
      fix: "Problems are explained in plain words with what to do next, for example an order with a dish that is not matched yet, and our team is alerted too.",
    },
  ],
  features: [
    {
      title: "Orders from every connected app",
      body: "Orders from every channel linked to your HubRise location arrive as sales, marked with the app they came from and the app's own order number.",
    },
    {
      title: "Rings, kitchen ticket and print",
      body: "A new order rings on the Order Desk. Once accepted it shows on the kitchen screen and prints on your kitchen printers, exactly like your own online orders.",
    },
    {
      title: "You choose who accepts",
      body: "For each app, let the app's own acceptance count, or have staff press Accept. If nobody answers in time, the order is accepted by itself rather than lost.",
    },
    {
      title: "Status sent back to the app",
      body: "Accepting, marking ready, handing over and cancelling are all sent back through HubRise, so the app and the customer stay up to date.",
    },
    {
      title: "Publish your menu from the till",
      body: "Send your menu, options and photos to HubRise when you are ready. Nothing is pushed by itself, so a half-finished change never reaches the apps.",
    },
    {
      title: "Different prices per delivery app",
      body: "One delivery price for all apps, or its own price on Uber Eats, Deliveroo, Just Eat or Glovo. Hide an item on every app or only on some, and write a separate app description.",
    },
    {
      title: "Delivery, collection or eat-in",
      body: "Each order keeps its type, so the right tax is applied. Deliveries carried by the app's own courier are not sent to your riders.",
    },
    {
      title: "Clear messages when something fails",
      body: "If an order names a dish that is not matched yet, it waits safely and can be retried after the fix. Every problem is explained in plain words.",
    },
  ],
  howItWorks: [
    {
      title: "Ask us",
      body: "Press Contact us on the HubRise add-on and tell us your country, your delivery apps and whether you already have a HubRise account.",
    },
    {
      title: "We connect your HubRise location",
      body: "Our team links your HubRise location to your shop and sets which branch its orders are booked at.",
    },
    {
      title: "Set your delivery menu",
      body: "Choose the items, prices and descriptions the apps should show, then publish the menu to HubRise.",
    },
    {
      title: "Work the orders",
      body: "Orders ring on the Order Desk, go to the kitchen when accepted, and every status change goes back to the app.",
    },
  ],
  needs: [
    `A ${BRAND_NAME} account on the Shop plan or above`,
    "A HubRise account and location, with your delivery apps connected to it",
    "Your HubRise account in the same currency as your shop",
    "The Order Desk on a tablet or computer, and kitchen printers or a kitchen screen if you use them",
  ],
  setup: [
    "Our team sets it up with you; you do not install it yourself.",
    "HubRise and each delivery app have their own fees and agreements, which stay between you and them.",
    "If you remove the add-on, new orders stop arriving. Orders already received keep their history.",
  ],
  faqs: [
    {
      q: "Which delivery apps does this work with?",
      a: "Any channel you connect to your HubRise location. Separate menu prices can be set for Uber Eats, Deliveroo, Just Eat and Glovo.",
    },
    {
      q: "Do I need my own HubRise account?",
      a: `Yes. HubRise is the link between ${BRAND_NAME} and the delivery apps. If you do not have one yet, tell us when you contact us and we will talk you through it.`,
    },
    {
      q: "Does my menu update on the apps by itself?",
      a: "No. You publish the menu when you are ready. This is on purpose: publishing replaces the whole menu on the apps, so you stay in control of when that happens.",
    },
    {
      q: "Can I charge more on one app than another?",
      a: "Yes. Each item has one price for all delivery apps, and you can give any app its own price. You can also raise one app's prices by a percentage in one go.",
    },
    {
      q: `What if an order has a dish ${BRAND_NAME} does not recognise?`,
      a: "The order is kept safe and shown as waiting. Once the dish is matched, it can be retried and goes through as normal.",
    },
    {
      q: "Do the orders show in my reports?",
      a: `Yes. Every accepted order is a normal sale in ${BRAND_NAME}, so it counts in your takings, stock and reports, marked with the app it came from.`,
    },
    {
      q: "Is it included in the free Light plan?",
      a: "No. HubRise needs the Shop plan or above, and our team sets it up with you.",
    },
  ],
};

export default content;
