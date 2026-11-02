import type { AddonContent } from "./types";
import { BRAND_NAME } from "@/lib/config/brand";

// Source: domains/payments (gateways/stripe_gateway.py card fields with no
// redirect, registry.py, connect/ onboarding + countries.py + requirements.py,
// webhooks/stripe_webhook.py paid/failed/refunded events, card_collection.py,
// gateways/stripe_connect.py service fee) and domains/extensions/access.py
// (Connect self-serve, own Stripe keys = Contact us).
const content: AddonContent = {
  slug: "stripe-payments",
  seoTitle: "Stripe Card Payments for Your POS and Online Shop",
  seoDescription:
    "Take card payments at the counter and on your website with Stripe. Customers type card details into Stripe's secure field and payments are marked paid for you.",
  keywords: [
    "stripe pos integration",
    "accept card payments online shop",
    "stripe payments for restaurants",
    "card payments for small shops uk",
    "stripe connect pos",
  ],
  schemaSubCategory: "Card payments add-on for POS",
  headline: "Take card payments at the till and on your website, paid into your Stripe account.",
  overview: [
    `Stripe Payments lets customers pay by card in ${BRAND_NAME}: at the counter, and on your ${BRAND_NAME} website or order page. The card form is Stripe's own secure field shown inside your page, so the customer is not sent to another site, and ${BRAND_NAME} never stores card numbers.`,
    `Most shops connect their Stripe account themselves: press Connect, fill in Stripe's own sign-up form, and ${BRAND_NAME} shows in plain words anything Stripe still needs from you. If you would rather use your own Stripe keys, our team sets that up with you.`,
    `When a payment goes through, Stripe tells ${BRAND_NAME} and the sale or online order is marked paid. Refunds, including ones made in your Stripe dashboard, are recorded back against the payment in ${BRAND_NAME}.`,
  ],
  whoFor: [
    "Shops and restaurants in the UK, the UAE and other countries where Stripe works",
    `Businesses that sell through a ${BRAND_NAME} website or order page`,
    "Owners who want card payments recorded against the sale automatically",
    "Shops that already use Stripe and want it linked to their POS",
  ],
  problems: [
    {
      problem: "Online orders come in and you are never sure they were paid.",
      fix: `Stripe confirms each payment to ${BRAND_NAME}, and the order is marked paid on its own. A failed payment is marked failed.`,
    },
    {
      problem: "A refund made in one place never shows up in the other.",
      fix: `Refund from ${BRAND_NAME} or from your Stripe dashboard; either way the refund is recorded against the original payment in ${BRAND_NAME}.`,
    },
    {
      problem: "Setting up a card account means forms full of terms you do not understand.",
      fix: `You sign up on Stripe's own form, and ${BRAND_NAME} lists anything Stripe still needs in plain words, such as a support phone number or confirming your directors.`,
    },
    {
      problem: "Customers give up when a payment page sends them to another website.",
      fix: "The card field sits inside your own checkout, and extra card checks such as 3D Secure happen in the same place.",
    },
  ],
  features: [
    {
      title: "Cards at the counter and online",
      body: `Take card payments in the POS and on your ${BRAND_NAME} website or order page. You choose which payment options your website shows.`,
    },
    {
      title: "Stripe's secure card field, no redirect",
      body: `Customers type their card details into Stripe's own secure field inside your page. Card numbers go to Stripe, never to ${BRAND_NAME}.`,
    },
    {
      title: "Connect your Stripe account yourself",
      body: `Start Stripe's sign-up from the back office. ${BRAND_NAME} checks first that Stripe supports businesses in your country, so you do not get stuck halfway.`,
    },
    {
      title: "A plain-English to-do list",
      body: `If Stripe still needs something before you can take payments, such as ID or a business address, ${BRAND_NAME} shows it as a simple list.`,
    },
    {
      title: "Marked paid for you",
      body: `Successful and failed payments are updated in ${BRAND_NAME} as soon as Stripe confirms them, for till sales and online orders alike.`,
    },
    {
      title: "Refunds recorded both ways",
      body: `Refund a card payment from ${BRAND_NAME}, or from your Stripe dashboard. The refund shows against the sale in ${BRAND_NAME} either way.`,
    },
    {
      title: "Your own Stripe keys, set up with us",
      body: "Prefer to use your existing Stripe keys instead of connecting? Send us a request and our team sets it up with you.",
    },
  ],
  howItWorks: [
    {
      title: "Switch it on",
      body: "Install Stripe Payments from the Add-ons page in the back office.",
    },
    {
      title: "Connect your Stripe account",
      body: "Press Connect and complete Stripe's own sign-up form with your business and bank details.",
    },
    {
      title: "Finish anything Stripe asks for",
      body: `If Stripe needs more details, ${BRAND_NAME} lists them in plain words until your account is ready to take payments.`,
    },
    {
      title: "Turn on card payments",
      body: "Take cards at the POS, and switch on Card as a payment option in your website settings.",
    },
    {
      title: "Get paid",
      body: `Payments are marked paid in ${BRAND_NAME}, and Stripe pays you out to your bank on your Stripe payout schedule.`,
    },
  ],
  needs: [
    `${BRAND_NAME} on the Shop plan or above`,
    "A business based in a country where Stripe works, such as the UK or the UAE (Stripe does not support businesses based in Pakistan)",
    "Your business details and ID for Stripe's sign-up form",
    "A bank account for Stripe to pay you into",
  ],
  setup: [
    "You switch it on and connect your Stripe account yourself from the Add-ons page.",
    "Want to use your own Stripe keys instead? Send us a request from the Add-ons page and our team sets it up with you.",
    `Stripe charges its own fees on each card payment. Ask us whether a ${BRAND_NAME} service fee applies to card payments on your account.`,
    `Your money is paid out by Stripe on your Stripe payout schedule, not by ${BRAND_NAME}.`,
  ],
  faqs: [
    {
      q: "Where does the money go?",
      a: "Into your Stripe account, and from there to your bank on your Stripe payout schedule. Stripe takes its own fees on each payment.",
    },
    {
      q: `Does ${BRAND_NAME} see my customers' card numbers?`,
      a: `No. Customers type their card details into Stripe's own secure field. The card number goes to Stripe, and ${BRAND_NAME} only receives the result of the payment.`,
    },
    {
      q: "Can I use Stripe in Pakistan?",
      a: `Stripe does not open accounts for businesses based in Pakistan, so ${BRAND_NAME} tells you before you start if your country is not supported. JazzCash, Easypaisa and HBLPay add-ons for Pakistan are coming soon.`,
    },
    {
      q: "Can I use my own Stripe keys instead of connecting?",
      a: "Yes. Send us a request from the Add-ons page and our team sets it up with you. Connecting your Stripe account is the quicker way and you can do it yourself.",
    },
    {
      q: "Can I refund a card payment?",
      a: `Yes. Refund it from ${BRAND_NAME}, or from your Stripe dashboard. Either way the refund is recorded against the sale in ${BRAND_NAME}.`,
    },
    {
      q: "What if Stripe still needs details from me?",
      a: `${BRAND_NAME} shows what Stripe is asking for in plain words, and you can reopen Stripe's form to finish it. You can take payments once Stripe has what it needs.`,
    },
    {
      q: "Which plan do I need?",
      a: "Stripe Payments needs the Shop plan or above. It is not part of the free Light plan.",
    },
  ],
};

export default content;
