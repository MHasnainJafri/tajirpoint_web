import type { AddonContent } from "./types";
import { BRAND_NAME } from "@/lib/config/brand";

// Source: domains/shipping (models CourierAccount/Shipment statuses,
// services/courier_service book/cancel/poll, ship_from_store_service (inline
// address, COD = amount still owed), adapters/leopards.py (slip link,
// overnight/normal, poll only), tasks.py + workers/beat_schedule.py every 10 min),
// configure_extensions.py (coming soon: untested against the real service).
const content: AddonContent = {
  slug: "courier-leopards",
  seoTitle: "Leopards Courier Add-on: Book and Track From Your POS",
  seoDescription: `Coming soon: book Leopards Courier parcels straight from a ${BRAND_NAME} sale, print the booking slip, collect cash on delivery and follow every parcel's status.`,
  keywords: [
    "Leopards Courier booking software",
    "Leopards Courier POS integration",
    "COD parcel booking Pakistan",
    "courier tracking for online shops",
    "ship from store Pakistan",
  ],
  schemaSubCategory: "Courier booking add-on for POS",
  headline: "Book a Leopards parcel from the sale, without retyping a single address.",
  overview: [
    `The Leopards Courier add-on will let you book a parcel with Leopards straight from a sale in ${BRAND_NAME}. Type the customer's address at the till, or use one already saved, and the booking goes to Leopards with the tracking number and booking slip saved on the sale.`,
    `For cash on delivery, the amount to collect is filled in from what the customer still owes on the sale, so the cashier never types it by hand. ${BRAND_NAME} then checks the parcel's status with Leopards every 10 minutes until it is delivered or returned.`,
    "It is not open to shops yet: the connection still has to be tested against a real Leopards account. Once it is live, our team will set it up with you.",
  ],
  whoFor: [
    "Shops in Pakistan that send orders across the country",
    "Online sellers who take cash on delivery orders",
    "Stores that sell at the counter and ship to the customer later",
    "Businesses already using a Leopards Courier merchant account",
  ],
  problems: [
    {
      problem: "Every parcel is typed again on the courier's website.",
      fix: "Book the parcel from the sale itself. The address, the pieces and the cash to collect go to Leopards in one step.",
    },
    {
      problem: "The cash on delivery amount is typed wrong and nobody notices.",
      fix: "The amount is taken from what the customer still owes on the sale, never typed by hand.",
    },
    {
      problem: "Staff keep checking the courier site to see where parcels are.",
      fix: `Each parcel's status is updated in ${BRAND_NAME} every 10 minutes, from booked to delivered or returned.`,
    },
  ],
  features: [
    {
      title: "Book from the sale",
      body: "Book a Leopards parcel for any sale, including one rung up at the counter. The tracking number is saved on the sale.",
    },
    {
      title: "Address typed at the till",
      body: "Use the customer's saved address, or type one in while booking. It is saved to the customer for next time.",
    },
    {
      title: "Cash on delivery filled in for you",
      body: "The amount Leopards collects is what the customer still owes on the sale. A fully paid sale is sent with nothing to collect.",
    },
    {
      title: "Booking slip ready to print",
      body: "The booking slip link from Leopards is kept on the parcel, so you can print it and stick it on the box.",
    },
    {
      title: "Overnight or normal service",
      body: "Choose the Leopards service for each parcel, or set a default for your account.",
    },
    {
      title: "Status every 10 minutes",
      body: `${BRAND_NAME} checks with Leopards every 10 minutes and keeps every status change: picked up, in transit, delivered, returned.`,
    },
    {
      title: "Cancel a booking",
      body: `Cancel a parcel that has not gone yet, straight from ${BRAND_NAME}.`,
    },
  ],
  howItWorks: [
    {
      title: "Tell us you want it",
      body: "Press the button on the add-on and send us your Leopards account number and whether you collect cash on delivery. We will let you know when it is ready.",
    },
    {
      title: "We connect your Leopards account",
      body: "Once it is live, our team links your Leopards merchant account to your shop with you.",
    },
    {
      title: "Book from a sale",
      body: "Open the sale, confirm the address and book. The tracking number and booking slip come straight back.",
    },
    {
      title: "Follow the parcel",
      body: "The status updates by itself every 10 minutes until the parcel is delivered or returned.",
    },
  ],
  needs: [
    `A ${BRAND_NAME} account on the Shop plan or above`,
    "A Leopards Courier merchant account with its connection details",
    "A printer for booking slips",
  ],
  setup: [
    "Coming soon: it cannot be installed yet.",
    "Once live, our team will set it up with you; you will not install it yourself.",
    "Leopards charges you for each parcel under your own agreement with them.",
  ],
  faqs: [
    {
      q: "When will it be ready?",
      a: "It is built, and the connection still has to be tested against a real Leopards account before we open it to shops. We do not have a date yet; ask us and we will tell you when it is ready.",
    },
    {
      q: "Do I need my own Leopards account?",
      a: "Yes. Parcels are booked on your own Leopards merchant account, and Leopards bills you as it does today.",
    },
    {
      q: "Can I book a parcel for a sale made at the counter?",
      a: "Yes. Type the delivery address while booking, even for a walk-in customer.",
    },
    {
      q: "How often does the status update?",
      a: "Every 10 minutes, until the parcel is delivered, returned or cancelled.",
    },
    {
      q: "Can I cancel a booking?",
      a: `Yes, you can cancel a parcel from ${BRAND_NAME} before it is delivered.`,
    },
    {
      q: "Is it included in the free Light plan?",
      a: "No. The Leopards Courier add-on will need the Shop plan or above.",
    },
  ],
  comingSoonNote:
    "Built, with the Leopards connection still to be tested on a real account; not open to shops yet. Ask us and we will tell you when it is ready.",
};

export default content;
