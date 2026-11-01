import type { AddonContent } from "./types";

// Source: domains/restaurants/models/kitchen_brand.py (name, slogan, logo,
// colour, default station, printer), domains/ghost_kitchen (brand_menu.py
// per-brand menu + 86, brand_price.py per-brand prices by order type, BrandDomain
// website per brand, services/tagging.py one brand per order, takings.py per
// brand by cash/card/other less refunds, outlet_links.py share orders/kitchen/
// menu/settings/staff, linked_packing.py), integrations aggregator_order_service
// (delivery-app account stamps its brand), restaurants printer_service/routing.
const content: AddonContent = {
  slug: "cloud-kitchen",
  seoTitle: "Cloud Kitchen Software: Run Several Brands From One Kitchen",
  seoDescription:
    "Run several delivery brands from one kitchen. Every order, ticket and label shows its brand, each brand has its own menu and prices, and takings split by brand.",
  keywords: [
    "cloud kitchen software",
    "ghost kitchen POS",
    "virtual brands restaurant",
    "multi brand kitchen management",
    "dark kitchen order management",
  ],
  schemaSubCategory: "Cloud kitchen and virtual brand add-on for restaurant POS",
  headline: "Several food brands, one kitchen, and you always know which order is whose.",
  overview: [
    "The Cloud Kitchen Pack lets one kitchen sell under several brand names. Each brand has its own name, slogan, logo and colour, its own menu drawn from your dishes, and its own prices if you want them.",
    "Every order carries its brand from the moment it arrives: from the brand's own ordering website, from a delivery app account linked to that brand, or picked by the cashier at the till. The kitchen screen, kitchen tickets, receipts and bag labels all show the brand, so the right food goes into the right bag.",
    "Takings are shown per brand, split into cash, card and other payments with refunds taken off, so you can see which brand is really earning. If your company runs two kitchen addresses, you can link them to see orders and the kitchen together and copy menus and settings between them.",
  ],
  whoFor: [
    "Cloud kitchens and dark kitchens running more than one delivery brand",
    "Restaurants adding a second brand (burgers, wings, desserts) from the same kitchen",
    "Food businesses selling through Foodpanda, Deliveroo, Uber Eats and their own website",
    "Companies with two kitchen addresses that work as a pair",
  ],
  problems: [
    {
      problem: "Packers mix up which brand's bag an order goes in.",
      fix: "The brand name and logo print on the kitchen ticket, receipt and bag label, and show on the kitchen screen.",
    },
    {
      problem: "We cannot tell which brand is actually making money.",
      fix: "Takings are shown per brand for any date range, split into cash, card and other payments, with refunds taken off.",
    },
    {
      problem: "Each brand needs its own menu, but it is the same kitchen and stock.",
      fix: "Pick which of your dishes each brand sells, give them a different display name or price, and switch a dish off for one brand without touching the others.",
    },
    {
      problem: "Orders from different delivery app accounts all look the same.",
      fix: "Link each delivery app account to a brand and its orders arrive already tagged with that brand.",
    },
  ],
  features: [
    {
      title: "Brands with their own look",
      body: "Give each brand a name, slogan, logo and colour. They appear on the kitchen screen and on printed tickets, receipts and labels.",
    },
    {
      title: "A menu per brand",
      body: "Choose which dishes each brand sells, with a brand's own display name if you like. Mark a dish unavailable for one brand only; a dish the kitchen cannot make is off for every brand.",
    },
    {
      title: "Brand prices",
      body: "Set a brand's own price for a dish, or separate prices for delivery, pickup and dine-in. Leave it blank and the dish sells at your normal price.",
    },
    {
      title: "Every order tagged with its brand",
      body: "Orders take their brand from the brand's website, the delivery app account they came from, or the cashier's choice at the till. One order is always one brand.",
    },
    {
      title: "Brand routing in the kitchen",
      body: "Send a brand's orders to its own kitchen station by default, and print its receipts and labels on its own printer if you need to.",
    },
    {
      title: "Takings by brand",
      body: "See orders, sales and money taken for each brand, split by cash, card and other payments, with refunds and net takings.",
    },
    {
      title: "A website per brand",
      body: "Point one of your ordering website addresses at a brand, and every order placed there belongs to that brand.",
    },
    {
      title: "Link two kitchen addresses",
      body: "Link two outlets of the same company to see orders and the kitchen together, share packing, let staff work at both, and copy menus and settings from one to the other.",
    },
  ],
  howItWorks: [
    {
      title: "Switch on Restaurant, then Cloud Kitchen Pack",
      body: "The Cloud Kitchen Pack works on top of the Restaurant add-on. Turn both on from the Add-ons page in the back office.",
    },
    {
      title: "Create your brands",
      body: "Add each brand with its name, logo, slogan and colour, and choose its kitchen station and printer if they differ.",
    },
    {
      title: "Build each brand's menu",
      body: "Pick the dishes each brand sells and set brand prices where you need them.",
    },
    {
      title: "Connect the channels",
      body: "Link each delivery app account and ordering website address to its brand. The cashier picks a brand at the till for phone and walk-in orders.",
    },
    {
      title: "Cook, pack and check takings",
      body: "Orders arrive tagged, the kitchen and packers see the brand, and the takings report shows how each brand is doing.",
    },
  ],
  needs: [
    "A TajirPoint account on the Shop plan or above",
    "The Restaurant add-on switched on",
    "A logo for each brand (optional but recommended)",
    "Your delivery app accounts, if you want their orders tagged by brand",
  ],
  setup: [
    "You switch it on yourself from the Add-ons page.",
    "Cloud Kitchen Pack needs the Shop plan or above.",
    "Uninstalling keeps your brands and their order history.",
  ],
  faqs: [
    {
      q: "Do the brands share stock?",
      a: "Yes. All brands sell from the same dishes and the same kitchen stock, so you only manage stock once.",
    },
    {
      q: "Can a dish be on one brand's menu and not another's?",
      a: "Yes. Each brand has its own list of dishes. You can also switch a dish off for one brand for the day while it stays on for the others.",
    },
    {
      q: "Can the same dish cost more under one brand?",
      a: "Yes. Set a brand price for the dish, or different prices for delivery, pickup and dine-in. Without one, the dish sells at your normal price.",
    },
    {
      q: "How do orders from Foodpanda or Deliveroo get the right brand?",
      a: "Each delivery app account is linked to a brand, so its orders arrive already tagged. Orders from a brand's own website address belong to that brand too.",
    },
    {
      q: "Can an order have dishes from two brands?",
      a: "No. One order belongs to one brand, or to no brand. This keeps the bag, the receipt and the takings clear.",
    },
    {
      q: "Do I need the Restaurant add-on?",
      a: "Yes. The Cloud Kitchen Pack builds on the Restaurant add-on, which is also included with Light.",
    },
    {
      q: "Is it included in the free Light plan?",
      a: "No. Cloud Kitchen Pack needs the Shop plan or above.",
    },
  ],
};

export default content;
