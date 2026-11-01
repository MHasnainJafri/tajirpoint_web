import type { AddonContent } from "./types";

// Source: domains/shipping (models CourierAccount/Shipment statuses,
// services/courier_service book/cancel/poll, ship_from_store_service (inline
// address, COD = amount still owed), adapters/postex.py (create order, slip
// link, cancel, signed status updates), webhooks/handler.py, tasks.py +
// workers/beat_schedule.py 10-min safety check), configure_extensions.py
// (coming soon: untested against PostEx).
const content: AddonContent = {
  slug: "courier-postex",
  seoTitle: "PostEx Add-on: Book COD Orders and Track From Your POS",
  seoDescription:
    "Coming soon: book PostEx orders straight from a TajirPoint sale, with the cash to collect filled in and status updates arriving as PostEx moves the parcel.",
  keywords: [
    "PostEx booking software",
    "PostEx POS integration",
    "PostEx COD orders",
    "COD courier for online sellers Pakistan",
    "parcel tracking in POS",
  ],
  schemaSubCategory: "Courier booking add-on for POS",
  headline: "Book PostEx orders from the sale and watch them move without leaving TajirPoint.",
  overview: [
    "The PostEx add-on will let you book an order with PostEx straight from a sale in TajirPoint. Use the customer's saved address or type it in at the till, and the tracking number and booking slip come back onto the sale.",
    "For cash on delivery, the amount PostEx collects is taken from what the customer still owes on the sale. PostEx sends status changes to TajirPoint as they happen, and TajirPoint also checks every 10 minutes in case one is missed.",
    "It is not open to shops yet: the connection still has to be tested against a real PostEx account. Once it is live, our team will set it up with you.",
  ],
  whoFor: [
    "Online sellers in Pakistan who sell mostly on cash on delivery",
    "Shops that ship orders to customers in other cities",
    "Stores that sell at the counter and send the goods by courier",
    "Businesses already using a PostEx merchant account",
  ],
  problems: [
    {
      problem: "Every order is typed again on the PostEx portal.",
      fix: "Book from the sale itself. The address, the pieces and the cash to collect go to PostEx in one step.",
    },
    {
      problem: "The cash to collect is typed wrong.",
      fix: "The amount is taken from what the customer still owes on the sale, never typed by hand.",
    },
    {
      problem: "You only find out about a returned parcel days later.",
      fix: "Status changes arrive from PostEx as they happen, so a parcel out for delivery, delivered or returned shows in TajirPoint straight away.",
    },
  ],
  features: [
    {
      title: "Book from the sale",
      body: "Book a PostEx order for any sale, including one rung up at the counter. The tracking number is saved on the sale.",
    },
    {
      title: "Cash on delivery filled in for you",
      body: "The amount PostEx collects is what the customer still owes. A fully paid sale is sent with nothing to collect.",
    },
    {
      title: "Booking slip ready to print",
      body: "The booking slip link from PostEx is kept on the parcel, ready to print and stick on the box.",
    },
    {
      title: "Updates as they happen",
      body: "PostEx sends each status change to TajirPoint, and every update is checked to make sure it really came from PostEx.",
    },
    {
      title: "A 10-minute safety check",
      body: "TajirPoint also asks PostEx for the latest status every 10 minutes, so a missed update is caught.",
    },
    {
      title: "Cancel an order",
      body: "Cancel a PostEx order that has not gone yet, straight from TajirPoint.",
    },
  ],
  howItWorks: [
    {
      title: "Tell us you want it",
      body: "Press the button on the add-on and send us your PostEx account details and whether you collect cash on delivery. We will let you know when it is ready.",
    },
    {
      title: "We connect your PostEx account",
      body: "Once it is live, our team links your PostEx account to your shop and sets up status updates in your PostEx dashboard with you.",
    },
    {
      title: "Book from a sale",
      body: "Open the sale, confirm the address and book. The tracking number and booking slip come straight back.",
    },
    {
      title: "Follow the parcel",
      body: "Status changes arrive as PostEx moves the parcel, until it is delivered or returned.",
    },
  ],
  needs: [
    "A TajirPoint account on the Shop plan or above",
    "A PostEx merchant account with access to its dashboard",
    "A printer for booking slips",
  ],
  setup: [
    "Coming soon: it cannot be installed yet.",
    "Once live, our team will set it up with you; you will not install it yourself.",
    "PostEx charges you for each order under your own agreement with them.",
  ],
  faqs: [
    {
      q: "When will it be ready?",
      a: "It is built, and the connection still has to be tested against a real PostEx account before we open it to shops. We do not have a date yet; ask us and we will tell you when it is ready.",
    },
    {
      q: "Do I need my own PostEx account?",
      a: "Yes. Orders are booked on your own PostEx account, and PostEx bills you and pays out your cash on delivery as it does today.",
    },
    {
      q: "How quickly will I see status changes?",
      a: "PostEx sends them as they happen. TajirPoint also checks every 10 minutes in case one is missed.",
    },
    {
      q: "Can I book a parcel for a walk-in sale?",
      a: "Yes. Type the delivery address while booking, even if the customer has no saved record.",
    },
    {
      q: "Can I cancel an order?",
      a: "Yes, you can cancel a PostEx order from TajirPoint before it is delivered.",
    },
    {
      q: "Is it included in the free Light plan?",
      a: "No. The PostEx add-on will need the Shop plan or above.",
    },
  ],
  comingSoonNote:
    "Built, with the PostEx connection still to be tested on a real account; not open to shops yet. Ask us and we will tell you when it is ready.",
};

export default content;
