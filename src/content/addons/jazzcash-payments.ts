import type { AddonContent } from "./types";
import { BRAND_NAME } from "@/lib/config/brand";

// Source: domains/payments (gateways/jazzcash_gateway.py MWALLET wallet push,
// optional CNIC field, sandbox/live, refund only from the JazzCash portal;
// registry.py PK/PKR; tasks.py reconcile_jazzcash_payments daily check of
// pending payments; services/gateway_service.py paid/failed events) and
// domains/extensions/access.py (Contact us list).
const content: AddonContent = {
  slug: "jazzcash-payments",
  seoTitle: "JazzCash Wallet Payments for Your POS and Online Shop",
  seoDescription:
    "Let customers in Pakistan pay from their JazzCash wallet at your counter or on your website. They approve on their phone and the payment goes to your account.",
  keywords: [
    "jazzcash pos integration",
    "jazzcash payment for shops",
    "accept jazzcash online payments",
    "jazzcash merchant account pos",
    "mobile wallet payments pakistan",
  ],
  schemaSubCategory: "Mobile wallet payments add-on for POS",
  headline: "Let customers pay from their JazzCash wallet, at the counter or online.",
  overview: [
    "JazzCash Payments will let customers pay from their JazzCash mobile wallet. They give their JazzCash number, approve the payment on their phone, and the money goes to your own JazzCash merchant account.",
    `It is for shops in Pakistan taking payments in rupees. It will work for sales at the POS and, when you switch it on in your website settings, for orders on your ${BRAND_NAME} website.`,
    `When JazzCash confirms a payment, the sale or order is marked paid in ${BRAND_NAME}. Once a day, ${BRAND_NAME} also asks JazzCash about any payment still waiting for an answer from the last three days, so a payment whose confirmation went missing is not left hanging.`,
  ],
  whoFor: [
    "Shops and restaurants in Pakistan",
    "Businesses whose customers prefer paying from a mobile wallet",
    "Shops that already have a JazzCash merchant account",
    "Owners selling online who want an option besides cash on delivery",
  ],
  problems: [
    {
      problem: "Customers send money by wallet and you check your phone to see if it arrived.",
      fix: `The payment is started from ${BRAND_NAME} and the sale is marked paid when JazzCash confirms it, so there is nothing to check by hand.`,
    },
    {
      problem: "A wallet payment goes through but the confirmation never arrives.",
      fix: `Once a day, ${BRAND_NAME} asks JazzCash about any payment still waiting and marks it paid or failed.`,
    },
    {
      problem:
        "Online orders in Pakistan are mostly cash on delivery, and many are refused at the door.",
      fix: "Offer JazzCash on your website so customers can pay before the order leaves.",
    },
  ],
  features: [
    {
      title: "Pay by JazzCash number",
      body: "The customer gives the mobile number of their JazzCash wallet and approves the payment on their phone.",
    },
    {
      title: "At the POS and on your website",
      body: `Use it for counter sales, and offer it as a payment option on your ${BRAND_NAME} website when you switch it on there.`,
    },
    {
      title: "Marked paid for you",
      body: `Successful and failed payments are updated in ${BRAND_NAME} as soon as JazzCash confirms them.`,
    },
    {
      title: "Daily check for missing answers",
      body: `Every night ${BRAND_NAME} checks any JazzCash payment that is still waiting, from the last three days, and updates it.`,
    },
    {
      title: "Optional CNIC check",
      body: "If JazzCash has turned it on for your merchant account, customers can also confirm with the last six digits of their CNIC.",
    },
    {
      title: "Money goes to your account",
      body: `Payments go to your own JazzCash merchant account. ${BRAND_NAME} does not hold your money.`,
    },
  ],
  howItWorks: [
    {
      title: "Tell us you want it",
      body: "Send us a request from the Add-ons page in the back office. We will let you know when it is ready.",
    },
    {
      title: "We set it up with you",
      body: "Once it is live, our team adds your JazzCash merchant details and can test it with you before real payments.",
    },
    {
      title: "Customer pays from their wallet",
      body: "At the counter or on your website, the customer gives their JazzCash number and approves the payment on their phone.",
    },
    {
      title: `${BRAND_NAME} marks it paid`,
      body: "The sale or order is marked paid when JazzCash confirms, and a daily check catches anything missed.",
    },
  ],
  needs: [
    "A business in Pakistan taking payments in rupees",
    "A JazzCash merchant account (your merchant details come from JazzCash)",
    `${BRAND_NAME} on the Shop plan or above`,
  ],
  setup: [
    "This add-on is not open to shops yet.",
    "Once it is live, our team sets it up with you; you do not enter any settings yourself.",
    "JazzCash charges its own fees under your merchant agreement with them.",
    `Refunds are made from your JazzCash merchant portal, not from ${BRAND_NAME}.`,
  ],
  faqs: [
    {
      q: "When will it be ready?",
      a: "It is built and being finished, but it is not open to shops yet and we do not have a date to share. Send us a request from the Add-ons page and we will tell you when it is ready.",
    },
    {
      q: "Do I need a JazzCash merchant account?",
      a: "Yes. Payments go to your own JazzCash merchant account, so you need one from JazzCash first.",
    },
    {
      q: "Where does the money go?",
      a: `Straight to your JazzCash merchant account. ${BRAND_NAME} records the payment but never holds the money. JazzCash charges its own fees.`,
    },
    {
      q: `Can I refund a JazzCash payment from ${BRAND_NAME}?`,
      a: `No. JazzCash refunds are made from your JazzCash merchant portal. You can then record the refund in ${BRAND_NAME}.`,
    },
    {
      q: "What if a payment is stuck as waiting?",
      a: `Once a day ${BRAND_NAME} asks JazzCash about payments still waiting from the last three days and marks them paid or failed.`,
    },
    {
      q: "Which plan will I need?",
      a: "JazzCash Payments will need the Shop plan or above. It is not part of the free Light plan.",
    },
  ],
  comingSoonNote:
    "Built and in final testing; not open to shops yet. Ask us and we will tell you when it is ready.",
};

export default content;
