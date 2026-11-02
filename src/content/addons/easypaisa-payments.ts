import type { AddonContent } from "./types";
import { BRAND_NAME } from "@/lib/config/brand";

// Source: domains/payments (gateways/easypaisa_gateway.py Mobile Account push
// flow, sandbox/live, refund only from the Easypaisa portal, voucher flow
// stubbed; registry.py PK/PKR; webhooks/ipn_handler.py Easypaisa payment
// notices; services/gateway_service.py paid/failed states) and
// domains/extensions/access.py (Contact us list).
const content: AddonContent = {
  slug: "easypaisa-payments",
  seoTitle: "Easypaisa Wallet Payments for Your POS and Online Shop",
  seoDescription:
    "Let customers in Pakistan pay from their Easypaisa account at your counter or on your website. They approve on their phone and the money goes to your account.",
  keywords: [
    "easypaisa pos integration",
    "easypaisa payment for shops",
    "accept easypaisa online payments",
    "easypaisa merchant account",
    "mobile wallet payments pakistan",
  ],
  schemaSubCategory: "Mobile wallet payments add-on for POS",
  headline: "Let customers pay from their Easypaisa account, at the counter or online.",
  overview: [
    "Easypaisa Payments will let customers pay from their Easypaisa mobile account. They give the mobile number registered with Easypaisa, approve the payment on their phone, and the money goes to your own Easypaisa merchant account.",
    `It is for shops in Pakistan taking payments in rupees. It will work for sales at the POS and, when you switch it on in your website settings, for orders on your ${BRAND_NAME} website.`,
    `When Easypaisa confirms a payment, the sale or order is marked paid in ${BRAND_NAME}, and a failed or expired payment is marked failed, so you do not have to check your phone.`,
  ],
  whoFor: [
    "Shops and restaurants in Pakistan",
    "Businesses whose customers prefer paying from a mobile wallet",
    "Shops that already have an Easypaisa merchant account",
    "Owners selling online who want an option besides cash on delivery",
  ],
  problems: [
    {
      problem: "Customers send money by wallet and you check your phone to see if it arrived.",
      fix: `The payment is started from ${BRAND_NAME} and the sale is marked paid when Easypaisa confirms it.`,
    },
    {
      problem: "Staff mark wallet payments as paid before the money has really come in.",
      fix: "The payment is only marked paid when Easypaisa confirms it, and failed or expired payments are marked failed.",
    },
    {
      problem:
        "Online orders in Pakistan are mostly cash on delivery, and many are refused at the door.",
      fix: "Offer Easypaisa on your website so customers can pay before the order leaves.",
    },
  ],
  features: [
    {
      title: "Pay by Easypaisa number",
      body: "The customer gives the mobile number registered with Easypaisa and approves the payment on their phone.",
    },
    {
      title: "At the POS and on your website",
      body: `Use it for counter sales, and offer it as a payment option on your ${BRAND_NAME} website when you switch it on there.`,
    },
    {
      title: "Marked paid for you",
      body: `Paid, failed and expired payments are updated in ${BRAND_NAME} as soon as Easypaisa confirms them.`,
    },
    {
      title: "Money goes to your account",
      body: `Payments go to your own Easypaisa merchant account. ${BRAND_NAME} does not hold your money.`,
    },
    {
      title: "Tested before going live",
      body: "Our team can try it in Easypaisa's test mode with you before switching to real payments.",
    },
  ],
  howItWorks: [
    {
      title: "Tell us you want it",
      body: "Send us a request from the Add-ons page in the back office. We will let you know when it is ready.",
    },
    {
      title: "We set it up with you",
      body: "Once it is live, our team adds your Easypaisa merchant details (your store ID) and tests it with you.",
    },
    {
      title: "Customer pays from their account",
      body: "At the counter or on your website, the customer gives their Easypaisa number and approves the payment on their phone.",
    },
    {
      title: `${BRAND_NAME} marks it paid`,
      body: "The sale or order is marked paid as soon as Easypaisa confirms the payment.",
    },
  ],
  needs: [
    "A business in Pakistan taking payments in rupees",
    "An Easypaisa merchant account with a store ID from Easypaisa",
    `${BRAND_NAME} on the Shop plan or above`,
  ],
  setup: [
    "This add-on is not open to shops yet.",
    "Once it is live, our team sets it up with you; you do not enter any settings yourself.",
    "Easypaisa charges its own fees under your merchant agreement with them.",
    `Refunds are made from your Easypaisa merchant portal, not from ${BRAND_NAME}.`,
  ],
  faqs: [
    {
      q: "When will it be ready?",
      a: "It is built and being finished, but it is not open to shops yet and we do not have a date to share. Send us a request from the Add-ons page and we will tell you when it is ready.",
    },
    {
      q: "Do I need an Easypaisa merchant account?",
      a: "Yes. Payments go to your own Easypaisa merchant account, so you need one, with a store ID, from Easypaisa first.",
    },
    {
      q: "Where does the money go?",
      a: `Straight to your Easypaisa merchant account. ${BRAND_NAME} records the payment but never holds the money. Easypaisa charges its own fees.`,
    },
    {
      q: `Can I refund an Easypaisa payment from ${BRAND_NAME}?`,
      a: `No. Easypaisa refunds are made from your Easypaisa merchant portal. You can then record the refund in ${BRAND_NAME}.`,
    },
    {
      q: "Can customers pay at an Easypaisa shop with a voucher code?",
      a: "Not at launch. The first version covers payments from an Easypaisa mobile account only.",
    },
    {
      q: "Which plan will I need?",
      a: "Easypaisa Payments will need the Shop plan or above. It is not part of the free Light plan.",
    },
  ],
  comingSoonNote:
    "Built and in final testing; not open to shops yet. Ask us and we will tell you when it is ready.",
};

export default content;
