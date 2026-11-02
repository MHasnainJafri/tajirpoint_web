import type { AddonContent } from "./types";
import { BRAND_NAME } from "@/lib/config/brand";

// Source: domains/payments (gateways/hbl_gateway.py HBLPay hosted card page
// with 3D Secure, result on the return to your site, sandbox/live, refund only
// from the HBLPay portal, not yet checked against a live HBL test account;
// registry.py PK/PKR; config_urls.py) and domains/extensions/access.py.
const content: AddonContent = {
  slug: "hbl-payments",
  seoTitle: "HBLPay Card Payments for Shops in Pakistan",
  seoDescription:
    "Take card payments in Pakistan through HBLPay. Customers enter card details on HBL's secure page and the money goes to your own HBL merchant account.",
  keywords: [
    "hblpay integration",
    "hbl payment gateway for shops",
    "accept card payments pakistan",
    "online card payments pakistan pos",
    "hbl merchant account",
  ],
  schemaSubCategory: "Card payments add-on for POS",
  headline: "Take card payments in Pakistan through HBL's own secure payment page.",
  overview: [
    "HBLPay will let customers in Pakistan pay by card through Habib Bank Limited. The customer is taken to HBL's secure payment page, enters their card details there, passes the bank's card check, and is brought back to your site.",
    `The money goes to your own HBL merchant account, in rupees. ${BRAND_NAME} records the payment against the sale or order but never sees or stores the card number.`,
    `It is for shops that already have, or are opening, an HBL merchant account and want card payments on their ${BRAND_NAME} website or at the POS.`,
  ],
  whoFor: [
    "Shops and restaurants in Pakistan",
    "Businesses with an HBL merchant account",
    "Owners selling online who want card payments, not only cash on delivery",
    "Shops whose customers ask to pay by debit or credit card",
  ],
  problems: [
    {
      problem: "Customers want to pay by card online, but you only offer cash on delivery.",
      fix: "Offer card payment through HBLPay, so customers can pay before the order leaves.",
    },
    {
      problem: "You worry about handling customers' card details.",
      fix: `Card details are entered on HBL's own page. They never pass through ${BRAND_NAME}.`,
    },
    {
      problem: "Card payments and sales are tracked in different places.",
      fix: `The result comes back to ${BRAND_NAME} and is recorded against the sale or order it was for.`,
    },
  ],
  features: [
    {
      title: "HBL's secure card page",
      body: "Customers enter their card details on HBL's own payment page, including the bank's 3D Secure check.",
    },
    {
      title: `Result recorded in ${BRAND_NAME}`,
      body: "When the customer comes back from HBL, the outcome of the payment is recorded against the sale or order.",
    },
    {
      title: "Money to your HBL account",
      body: `Payments go into your own HBL merchant account in rupees. ${BRAND_NAME} does not hold your money.`,
    },
    {
      title: "Tested before going live",
      body: "Our team sets it up in HBL's test mode with you first, then switches to real payments.",
    },
  ],
  howItWorks: [
    {
      title: "Tell us you want it",
      body: "Send us a request from the Add-ons page in the back office. We will let you know when it is ready.",
    },
    {
      title: "We set it up with you",
      body: "Once it is live, our team adds the merchant details HBL sent you and tests a payment with you.",
    },
    {
      title: "Customer pays on HBL's page",
      body: "The customer is taken to HBL's secure page, pays by card, and is brought back to your site.",
    },
    {
      title: `${BRAND_NAME} records the result`,
      body: "The payment is recorded against the sale or order it was for.",
    },
  ],
  needs: [
    "A business in Pakistan taking payments in rupees",
    "An HBL merchant account and the onboarding details HBL sends you",
    `${BRAND_NAME} on the Shop plan or above`,
  ],
  setup: [
    "This add-on is not open to shops yet.",
    "Once it is live, our team sets it up with you; you do not enter any settings yourself.",
    "HBL charges its own fees under your merchant agreement with them.",
    `Refunds are made from your HBLPay merchant portal, not from ${BRAND_NAME}.`,
  ],
  faqs: [
    {
      q: "When will it be ready?",
      a: "It is built, but it still has to be tested end to end with HBL before it opens, and we do not have a date to share. Send us a request from the Add-ons page and we will tell you when it is ready.",
    },
    {
      q: "Do I need an HBL merchant account?",
      a: "Yes. Payments go to your own HBL merchant account, so you need one from HBL, along with the onboarding details they send you.",
    },
    {
      q: `Does ${BRAND_NAME} see the card number?`,
      a: `No. The customer enters their card details on HBL's own page. ${BRAND_NAME} only receives the result of the payment.`,
    },
    {
      q: "Where does the money go?",
      a: `Into your HBL merchant account. ${BRAND_NAME} records the payment but never holds the money. HBL charges its own fees.`,
    },
    {
      q: `Can I refund a card payment from ${BRAND_NAME}?`,
      a: `No. HBLPay refunds are made from your HBLPay merchant portal. You can then record the refund in ${BRAND_NAME}.`,
    },
    {
      q: "Which plan will I need?",
      a: "HBLPay will need the Shop plan or above. It is not part of the free Light plan.",
    },
  ],
  comingSoonNote:
    "Built, with final testing with HBL still to do; not open to shops yet. Ask us and we will tell you when it is ready.",
};

export default content;
