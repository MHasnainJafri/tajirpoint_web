import type { AddonContent } from "./types";

// Source: domains/payments (gateways/square_gateway.py Square-hosted payment
// link for one Square location, sandbox/production; registry.py) and
// domains/extensions/access.py (Contact us list, asks which Square location).
const content: AddonContent = {
  slug: "square-payments",
  seoTitle: "Square Card Payments for Your Online Shop",
  seoDescription:
    "Let customers pay by card through Square on your TajirPoint website. They pay on Square's secure page and the money goes to your own Square account.",
  keywords: [
    "square payments integration",
    "square online checkout",
    "accept card payments with square",
    "square for restaurants online orders",
    "square payment link",
  ],
  schemaSubCategory: "Card payments add-on",
  headline: "Take card payments through Square, paid into your own Square account.",
  overview: [
    "Square Payments will let customers pay by card through Square. For each payment, TajirPoint makes a Square payment link for the order; the customer pays on Square's secure page and comes back to your shop.",
    "The money goes to your own Square account, for the Square location you choose. Card details are entered on Square's page, so they never reach TajirPoint.",
    "It is for shops that already use Square in a country where Square works, such as the UK. Square is not available in Pakistan or the Gulf.",
  ],
  whoFor: [
    "Shops and restaurants that already take payments with Square",
    "Businesses in countries where Square works, such as the UK",
    "Owners who want their online card payments in the same Square account as the rest",
  ],
  problems: [
    {
      problem: "Your card money is in Square, but your orders are somewhere else.",
      fix: "Payments are started from the TajirPoint order, and the money lands in your Square account.",
    },
    {
      problem: "You do not want to handle customers' card details.",
      fix: "Customers pay on Square's own page, so their card details never reach TajirPoint.",
    },
    {
      problem: "You have more than one Square location and need the money in the right one.",
      fix: "Our team links the add-on to the Square location you choose.",
    },
  ],
  features: [
    {
      title: "Square's secure payment page",
      body: "The customer pays by card on a Square payment page made for their order.",
    },
    {
      title: "Paid into your Square location",
      body: "Payments go into your own Square account, for the location you pick. TajirPoint does not hold your money.",
    },
    {
      title: "Linked to your orders",
      body: "Each payment link is made from the TajirPoint order it is for, with the amount filled in.",
    },
    {
      title: "Tested before going live",
      body: "Our team sets it up in Square's test mode with you first, then switches to real payments.",
    },
  ],
  howItWorks: [
    {
      title: "Tell us you want it",
      body: "Send us a request from the Add-ons page in the back office, saying which Square location should take the payments.",
    },
    {
      title: "We set it up with you",
      body: "Once it is live, our team links your Square account and location, and tests a payment with you.",
    },
    {
      title: "Customer pays on Square",
      body: "The customer pays on Square's page and the money goes to your Square account.",
    },
  ],
  needs: [
    "A Square account in a country where Square works",
    "The Square location that should take the payments",
    "TajirPoint on the Shop plan or above",
  ],
  setup: [
    "This add-on is not open to shops yet.",
    "Once it is live, our team sets it up with you; you do not enter any settings yourself.",
    "Square charges its own fees on each payment, under your Square account terms.",
  ],
  faqs: [
    {
      q: "When will it be ready?",
      a: "It is built but not open to shops yet, and we do not have a date to share. Send us a request from the Add-ons page and we will tell you when it is ready.",
    },
    {
      q: "Do I need a Square account?",
      a: "Yes. Payments go to your own Square account, so you need one first, in a country where Square works.",
    },
    {
      q: "Can I use Square in Pakistan or the Gulf?",
      a: "No, Square does not work there. Shops in Pakistan can look at JazzCash, Easypaisa and HBLPay; shops in the UAE can use Stripe.",
    },
    {
      q: "Where does the money go?",
      a: "Into your Square account, for the location you chose. TajirPoint never holds the money. Square charges its own fees.",
    },
    {
      q: "Does TajirPoint see my customers' card numbers?",
      a: "No. Customers pay on Square's own page. TajirPoint only learns the result of the payment.",
    },
    {
      q: "Which plan will I need?",
      a: "Square Payments will need the Shop plan or above. It is not part of the free Light plan.",
    },
  ],
  comingSoonNote: "Built but not open to shops yet. Ask us and we will tell you when it is ready.",
};

export default content;
