import type { AddonContent } from "./types";
import { BRAND_NAME } from "@/lib/config/brand";

// Source: domains/promotions (models/discount.py types percentage/fixed/bogo,
// scopes cart/product/category, dates, usage_limit, max_discount;
// models/coupon.py code unique per shop + use cap; services/line_rules.py
// product/category rules applied by the server at the till, best rule wins;
// services/coupon_service.py validation + offline settle-and-review;
// services/addon_gate.py rules pause when the add-on is off, nothing deleted);
// restaurants/services/counter_offer.py coupon at the restaurant counter.
const content: AddonContent = {
  slug: "coupons",
  seoTitle: "Coupons & Discounts: Discount Rules and Coupon Codes",
  seoDescription:
    "Set discounts the till applies by itself, like 20% off a category or buy one get one, plus coupon codes with dates and use limits. Included with Light.",
  keywords: [
    "POS discount rules",
    "coupon codes for shops",
    "buy one get one POS",
    "restaurant coupon codes",
    "category discount at till",
  ],
  schemaSubCategory: "Discounts and coupons add-on for POS",
  headline: "Run discounts that the till applies for you, plus coupon codes you can hand out.",
  overview: [
    "Coupons & Discounts lets you save your offers as rules instead of asking cashiers to remember them. A rule can take a percentage or a fixed amount off, or give buy one get one free, on chosen products or whole categories, between the dates you set.",
    `Product and category rules are applied by ${BRAND_NAME} when the sale is rung up, so every cashier gives the same discount and nobody gives more than you allowed. If more than one rule fits an item, the customer gets the best one; rules do not stack.`,
    "Coupon codes are for offers you hand out: a code on a flyer, a thank-you for a regular, a code on social media. Each code points to a rule, with its own dates and a limit on how many times it can be used, and the discount is only given when the code is entered.",
  ],
  whoFor: [
    "Shops running seasonal sales on categories or brands",
    "Restaurants handing out coupon codes to customers",
    "Owners who do not want cashiers deciding discounts on their own",
    "Businesses with many cashiers or branches that need the same offers everywhere",
  ],
  problems: [
    {
      problem: "Cashiers forget the sale, or give a discount that was never agreed.",
      fix: "Saved rules are applied when the sale is rung up, the same way at every till.",
    },
    {
      problem: "A coupon goes viral and gets used far more than planned.",
      fix: "Give each code a use limit and an end date. Once it is used up or expired, it stops working.",
    },
    {
      problem: "Old offers keep getting applied after the sale ended.",
      fix: "Every rule has a start and end date, and expired rules stop applying on their own.",
    },
    {
      problem: "We have no idea how often an offer was used.",
      fix: "Each rule and each code shows how many times it has been used.",
    },
  ],
  features: [
    {
      title: "Percentage, fixed amount or buy one get one",
      body: "Take a percentage off (with an optional maximum), take a fixed amount off each item, or give every second item free.",
    },
    {
      title: "On products or whole categories",
      body: "Pick the products or categories a rule covers. A category rule also covers its sub-categories.",
    },
    {
      title: "Applied at the till by itself",
      body: "Product and category rules are worked out when the sale is rung up. If two rules fit, the customer gets the better one.",
    },
    {
      title: "Coupon codes with limits",
      body: "Create codes for percentage or fixed-amount offers on the whole bill, with start and end dates and a cap on total uses.",
    },
    {
      title: "Use counts",
      body: "See how many times each rule and each code has been used, and set a limit on either.",
    },
    {
      title: "Safe when the internet drops",
      body: "If a coupon is used on a sale rung up offline, the customer keeps the price they paid. A code that turns out to be used up or expired is flagged for you to review.",
    },
  ],
  howItWorks: [
    {
      title: "Switch it on",
      body: "Install Coupons & Discounts from the Add-ons page in the back office.",
    },
    {
      title: "Create a rule",
      body: "Choose the type, the amount, the products or categories it covers, and the dates.",
    },
    {
      title: "Add codes if you want them",
      body: "Create coupon codes for the offers you want to hand out, with a use limit.",
    },
    {
      title: "Sell as normal",
      body: "Rules apply when the sale is rung up. For a coupon, the cashier enters the customer's code.",
    },
  ],
  needs: [
    `A ${BRAND_NAME} account (any plan, including Light)`,
    `Your products and categories set up in ${BRAND_NAME}`,
  ],
  setup: [
    "You switch it on yourself from the Add-ons page; it takes a minute.",
    "It is included with the free Light plan.",
    "If you switch it off, your rules and codes stop applying but are kept. Switch it back on and they work again. Past sales are never changed.",
  ],
  faqs: [
    {
      q: "Is it included in the free Light plan?",
      a: "Yes. Coupons & Discounts is one of the add-ons included with Light.",
    },
    {
      q: "Where can a coupon code be used?",
      a: "At your counter: the cashier enters the code when taking payment. Today the code box is on the restaurant counter screen. Saved product and category rules apply on every till without a code.",
    },
    {
      q: "Do coupon codes work on my website?",
      a: "Not these ones. If you use the Website Builder add-on, your website has its own discount codes, which you set up there.",
    },
    {
      q: "Can two discounts stack on one item?",
      a: "No. If more than one rule fits an item, the customer gets the best one.",
    },
    {
      q: "Can I run a discount only at certain hours, like happy hour?",
      a: "Yes, with the Time-Based Promotions add-on, which is also included with Light. It adds hours and days of the week to your rules.",
    },
    {
      q: "Can I limit how many times a code is used?",
      a: "Yes. Set a total use limit on the code, on the rule behind it, or both.",
    },
    {
      q: "What happens to my offers if I switch the add-on off?",
      a: "They stop applying but nothing is deleted. Switch it back on and they work again.",
    },
  ],
};

export default content;
