import type { AddonContent } from "./types";
import { BRAND_NAME } from "@/lib/config/brand";

// Source: domains/shipping (models CourierAccount/Shipment statuses,
// services/courier_service book/cancel/poll, ship_from_store_service (inline
// address, COD = amount still owed), adapters/tcs.py (overnight "O" /
// standard "S", label link, poll only), tasks.py + workers/beat_schedule.py
// every 10 min), configure_extensions.py (coming soon: untested against TCS).
const content: AddonContent = {
  slug: "courier-tcs",
  seoTitle: "TCS Express Add-on: Book COD Parcels From Your POS",
  seoDescription: `Coming soon: book TCS consignments straight from a ${BRAND_NAME} sale, overnight or standard, with cash on delivery filled in and status checked every 10 minutes.`,
  keywords: [
    "TCS courier booking software",
    "TCS POS integration",
    "TCS COD booking",
    "parcel booking for online shops Pakistan",
    "courier tracking in POS",
  ],
  schemaSubCategory: "Courier booking add-on for POS",
  headline: "Send TCS parcels from the sale, with the cash to collect filled in for you.",
  overview: [
    `The TCS Express add-on will let you create a TCS consignment straight from a sale in ${BRAND_NAME}. Use the customer's saved address or type it in at the till, choose overnight or standard, and the tracking number comes back onto the sale.`,
    `For cash on delivery, the amount TCS collects is taken from what the customer still owes on the sale, so nobody types it by hand. ${BRAND_NAME} then checks each consignment's status with TCS every 10 minutes until it is delivered or returned.`,
    "It is not open to shops yet: the connection still has to be tested against a real TCS account. Once it is live, our team will set it up with you.",
  ],
  whoFor: [
    "Shops in Pakistan that ship orders to other cities",
    "Online sellers who take cash on delivery orders",
    "Stores that sell at the counter and send the goods by courier",
    "Businesses already using a TCS merchant account",
  ],
  problems: [
    {
      problem: "Orders are typed twice: once in the POS, once on the TCS portal.",
      fix: "Book the consignment from the sale itself, with the address and cash to collect sent in one step.",
    },
    {
      problem: "The COD amount on the parcel does not match the bill.",
      fix: "The amount to collect is what the customer still owes on the sale, never typed by hand.",
    },
    {
      problem: "Nobody knows which parcels are still out.",
      fix: `Each consignment's status is updated in ${BRAND_NAME} every 10 minutes, from booked to delivered or returned.`,
    },
  ],
  features: [
    {
      title: "Book from the sale",
      body: "Create a TCS consignment for any sale, including one rung up at the counter. The tracking number is saved on the sale.",
    },
    {
      title: "Overnight or standard",
      body: "Choose the TCS service for each consignment, or set a default for your account.",
    },
    {
      title: "Cash on delivery filled in for you",
      body: "The amount TCS collects is what the customer still owes. A fully paid sale is sent with nothing to collect.",
    },
    {
      title: "Address typed at the till",
      body: "Use a saved address or type one in while booking. It is saved to the customer for next time.",
    },
    {
      title: "Status every 10 minutes",
      body: `${BRAND_NAME} checks with TCS every 10 minutes and keeps every status change on the consignment.`,
    },
    {
      title: "Cancel a consignment",
      body: `Cancel a consignment that has not gone yet, straight from ${BRAND_NAME}.`,
    },
  ],
  howItWorks: [
    {
      title: "Tell us you want it",
      body: "Press the button on the add-on and send us your TCS account number and whether you collect cash on delivery. We will let you know when it is ready.",
    },
    {
      title: "We connect your TCS account",
      body: "Once it is live, our team links your TCS merchant account to your shop with you.",
    },
    {
      title: "Book from a sale",
      body: "Open the sale, confirm the address, pick overnight or standard and book.",
    },
    {
      title: "Follow the parcel",
      body: "The status updates by itself every 10 minutes until the parcel is delivered or returned.",
    },
  ],
  needs: [
    `A ${BRAND_NAME} account on the Shop plan or above`,
    "A TCS merchant account with its connection details",
    "A printer for parcel labels",
  ],
  setup: [
    "Coming soon: it cannot be installed yet.",
    "Once live, our team will set it up with you; you will not install it yourself.",
    "TCS charges you for each consignment under your own agreement with them.",
  ],
  faqs: [
    {
      q: "When will it be ready?",
      a: "It is built, and the connection still has to be tested against a real TCS account before we open it to shops. We do not have a date yet; ask us and we will tell you when it is ready.",
    },
    {
      q: "Do I need my own TCS account?",
      a: "Yes. Consignments are booked on your own TCS merchant account, and TCS bills you as it does today.",
    },
    {
      q: "Can I send overnight?",
      a: "Yes. Choose overnight or standard for each consignment.",
    },
    {
      q: "How is the cash on delivery amount set?",
      a: "It is taken from what the customer still owes on the sale, so it always matches the bill.",
    },
    {
      q: "How often does the status update?",
      a: "Every 10 minutes, until the consignment is delivered, returned or cancelled.",
    },
    {
      q: "Is it included in the free Light plan?",
      a: "No. The TCS Express add-on will need the Shop plan or above.",
    },
  ],
  comingSoonNote:
    "Built, with the TCS connection still to be tested on a real account; not open to shops yet. Ask us and we will tell you when it is ready.",
};

export default content;
