import type { AddonContent } from "./types";

// Source: domains/payments (gateways/paypal_gateway.py approval on PayPal's
// own site, sandbox/live; registry.py; services/gateway_service.py, where a
// paid PayPal order is not yet marked paid automatically) and
// domains/extensions (access.py Contact us list; migration
// 0043_contact_us_listings.py moved it back to coming soon for that reason).
const content: AddonContent = {
  slug: "paypal-payments",
  seoTitle: "PayPal Payments for Your Online Shop",
  seoDescription:
    "Let customers pay with PayPal on your TajirPoint website. They approve the payment on PayPal's own site and the money goes to your PayPal Business account.",
  keywords: [
    "paypal for online shop",
    "accept paypal payments website",
    "paypal pos integration",
    "paypal checkout for restaurants",
    "paypal business payments",
  ],
  schemaSubCategory: "Online payments add-on",
  headline: "Let customers pay with PayPal, with the money going to your PayPal Business account.",
  overview: [
    "PayPal Payments will let customers pay with PayPal on your TajirPoint website. The customer is taken to PayPal's own site, approves the payment there, and is brought back to your shop.",
    "The money goes to your own PayPal Business account. TajirPoint never sees the customer's card or bank details; PayPal handles all of that.",
    "PayPal decides which ways to pay the customer sees, depending on their country and their PayPal account.",
  ],
  whoFor: [
    "Shops and restaurants that sell online to customers who like paying with PayPal",
    "Businesses that already have a PayPal Business account",
    "Shops selling to customers abroad",
  ],
  problems: [
    {
      problem: "Some customers will only pay online with PayPal.",
      fix: "Offer PayPal as a payment option on your TajirPoint website.",
    },
    {
      problem: "You do not want to handle customers' card details.",
      fix: "Customers approve the payment on PayPal's own site, so their card and bank details never reach TajirPoint.",
    },
    {
      problem: "PayPal money and your online orders sit in different places.",
      fix: "Payments are started from your TajirPoint order and the money lands in your own PayPal Business account.",
    },
  ],
  features: [
    {
      title: "Pay on PayPal's own site",
      body: "The customer approves the payment on PayPal and comes back to your shop when it is done.",
    },
    {
      title: "Money to your PayPal account",
      body: "Payments go into your own PayPal Business account. TajirPoint does not hold your money.",
    },
    {
      title: "Ways to pay chosen by PayPal",
      body: "Customers can pay with their PayPal balance or the cards and bank accounts saved in PayPal, as PayPal allows in their country.",
    },
    {
      title: "Tested before going live",
      body: "Our team sets it up in PayPal's test mode with you first, then switches to real payments.",
    },
  ],
  howItWorks: [
    {
      title: "Tell us you want it",
      body: "Send us a request from the Add-ons page in the back office, with the country your PayPal Business account is in.",
    },
    {
      title: "We set it up with you",
      body: "Once it is live, our team links your PayPal Business account and tests a payment with you.",
    },
    {
      title: "Customer pays with PayPal",
      body: "On your website, the customer picks PayPal, approves the payment on PayPal's site and comes back to your shop.",
    },
  ],
  needs: [
    "A PayPal Business account",
    "A TajirPoint website or order page to take online orders",
    "TajirPoint on the Shop plan or above",
  ],
  setup: [
    "This add-on is not open to shops yet.",
    "Once it is live, our team sets it up with you; you do not enter any settings yourself.",
    "PayPal charges its own fees on each payment, under your PayPal account terms.",
  ],
  faqs: [
    {
      q: "When will it be ready?",
      a: "Most of it is built, but we are still finishing the step that marks a paid PayPal order as paid in TajirPoint automatically. We will not open it until that works, and we do not have a date to share. Send us a request and we will tell you when it is ready.",
    },
    {
      q: "Do I need a PayPal Business account?",
      a: "Yes. Payments go to your own PayPal Business account, so you need one first.",
    },
    {
      q: "Where does the money go?",
      a: "Into your PayPal Business account. TajirPoint never holds the money. PayPal charges its own fees.",
    },
    {
      q: "Does TajirPoint see my customers' card details?",
      a: "No. Customers approve the payment on PayPal's own site. TajirPoint only learns whether the payment went through.",
    },
    {
      q: "Will it work in my country?",
      a: "It depends on where PayPal supports business accounts. Tell us which country your PayPal Business account is in when you send your request.",
    },
    {
      q: "Which plan will I need?",
      a: "PayPal Payments will need the Shop plan or above. It is not part of the free Light plan.",
    },
  ],
  comingSoonNote:
    "Not open to shops yet: we are finishing how paid PayPal orders are marked paid. Ask us and we will tell you when it is ready.",
};

export default content;
