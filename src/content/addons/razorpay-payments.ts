import type { AddonContent } from "./types";
import { BRAND_NAME } from "@/lib/config/brand";

// Source: domains/payments (gateways/razorpay_gateway.py Razorpay order +
// Razorpay-hosted checkout page, test/live keys; registry.py regions IN,
// currency INR; config_urls.py checkout page address) and
// domains/extensions/access.py (Contact us list).
const content: AddonContent = {
  slug: "razorpay-payments",
  seoTitle: "Razorpay Payments for Shops in India",
  seoDescription:
    "For businesses in India: let customers pay through Razorpay with cards, UPI or netbanking. They pay on Razorpay's secure checkout; money goes to your account.",
  keywords: [
    "razorpay pos integration",
    "razorpay for online shop",
    "accept upi payments online",
    "razorpay payment gateway india",
    "razorpay checkout for restaurants",
  ],
  schemaSubCategory: "Online payments add-on",
  headline:
    "For shops in India: take payments through Razorpay, paid into your own Razorpay account.",
  overview: [
    "Razorpay Payments will let customers in India pay through Razorpay's secure checkout, using the ways Razorpay offers, such as cards, UPI and netbanking. The money goes to your own Razorpay account.",
    "Razorpay is an Indian payment company and works for businesses in India taking payments in rupees (INR). It is not for shops in Pakistan, the UK or the Gulf; for those, see the other payment add-ons.",
    `Customers enter their payment details on Razorpay's checkout, not in ${BRAND_NAME}, so ${BRAND_NAME} never sees card numbers or bank logins.`,
  ],
  whoFor: [
    "Shops and restaurants based in India",
    "Businesses that already have a Razorpay account",
    "Shops whose customers want to pay by UPI or netbanking online",
  ],
  problems: [
    {
      problem: "Customers in India expect to pay by UPI, and your online shop does not offer it.",
      fix: "Razorpay's checkout offers UPI, cards and netbanking, as Razorpay allows for your account.",
    },
    {
      problem: "You do not want to handle customers' payment details.",
      fix: `Customers pay on Razorpay's secure checkout, so their details never reach ${BRAND_NAME}.`,
    },
    {
      problem: "Online payments and orders sit in different places.",
      fix: `Each payment is started from the ${BRAND_NAME} order it belongs to, and the money lands in your Razorpay account.`,
    },
  ],
  features: [
    {
      title: "Razorpay's secure checkout",
      body: "Customers pay on Razorpay's own checkout, using the ways to pay Razorpay offers, such as cards, UPI and netbanking.",
    },
    {
      title: "Linked to your orders",
      body: `Every Razorpay payment is started from the ${BRAND_NAME} order it is for, with the order amount filled in.`,
    },
    {
      title: "Money to your Razorpay account",
      body: `Payments go into your own Razorpay account. ${BRAND_NAME} does not hold your money.`,
    },
    {
      title: "Tested before going live",
      body: "Our team sets it up with your Razorpay test keys first, then switches to real payments.",
    },
  ],
  howItWorks: [
    {
      title: "Tell us you want it",
      body: "Send us a request from the Add-ons page in the back office. We will let you know when it is ready.",
    },
    {
      title: "We set it up with you",
      body: "Once it is live, our team links your Razorpay account, sets up the checkout page and tests a payment with you.",
    },
    {
      title: "Customer pays on Razorpay",
      body: "The customer picks Razorpay, pays on Razorpay's checkout and the money goes to your Razorpay account.",
    },
  ],
  needs: [
    "A business in India taking payments in rupees (INR)",
    "A Razorpay account",
    `${BRAND_NAME} on the Shop plan or above`,
  ],
  setup: [
    "This add-on is not open to shops yet.",
    "Once it is live, our team sets it up with you; you do not enter any settings yourself.",
    "Razorpay charges its own fees on each payment, under your Razorpay account terms.",
  ],
  faqs: [
    {
      q: "When will it be ready?",
      a: "It is built but not open to shops yet, and we do not have a date to share. Send us a request from the Add-ons page and we will tell you when it is ready.",
    },
    {
      q: "Can I use Razorpay in Pakistan, the UK or the Gulf?",
      a: "No. Razorpay is for businesses in India taking payments in rupees. Shops in Pakistan can look at JazzCash, Easypaisa and HBLPay; shops in the UK and the UAE can use Stripe.",
    },
    {
      q: "Do I need a Razorpay account?",
      a: "Yes. Payments go to your own Razorpay account, so you need one from Razorpay first.",
    },
    {
      q: "Where does the money go?",
      a: `Into your Razorpay account. ${BRAND_NAME} never holds the money. Razorpay charges its own fees.`,
    },
    {
      q: `Does ${BRAND_NAME} see my customers' payment details?`,
      a: `No. Customers pay on Razorpay's checkout. ${BRAND_NAME} only learns the result of the payment.`,
    },
    {
      q: "Which plan will I need?",
      a: "Razorpay Payments will need the Shop plan or above. It is not part of the free Light plan.",
    },
  ],
  comingSoonNote:
    "Built but not open to shops yet; for businesses in India only. Ask us and we will tell you when it is ready.",
};

export default content;
