import type { AddonContent } from "./types";

// Source: domains/delivery (couriers/registry + network courier adapter,
// services/ladder_service, cash_fence, network_drivers, courier_live,
// courier_tracking, courier_proof_storage, extension_handler.py),
// domains/extensions/access.py (Contact us listing).
const content: AddonContent = {
  slug: "courier-nash",
  seoTitle: "Network Drivers Add-on: Extra Delivery Riders on Demand",
  seoDescription:
    "When your own riders are busy, hand card-paid deliveries to network drivers from many courier companies. Live driver details, tracking and proof of delivery.",
  keywords: [
    "on demand delivery drivers",
    "overflow delivery riders",
    "restaurant delivery courier network",
    "third party delivery drivers for restaurants",
    "delivery when riders are busy",
  ],
  schemaSubCategory: "Delivery courier network add-on for POS",
  headline: "Extra drivers for the card-paid deliveries your own riders cannot take.",
  overview: [
    "Network drivers is one connection that brings many courier companies together. When your own riders are busy, a delivery can be handed to a driver from the network instead of making the customer wait.",
    "You can pick a network driver yourself when assigning a delivery, or let TajirPoint try your own riders first and hand the job on automatically if none of them takes it. Staff see the driver, the vehicle and where they are, and the job closes itself when the driver reports the drop.",
    "Cash orders are never sent to the network: only your own riders carry cash. Our team sets this up with you, because it connects to an outside courier account.",
  ],
  whoFor: [
    "Restaurants and shops that run their own delivery riders",
    "Busy kitchens where riders cannot keep up at peak times",
    "Shops whose customers mostly pay by card online",
    "Owners who do not want to hire more riders for a few busy hours",
  ],
  problems: [
    {
      problem: "At dinner rush every rider is out and orders go cold on the pass.",
      fix: "Hand the delivery to a network driver, or let TajirPoint do it automatically after your own riders have had their chance.",
    },
    {
      problem: "Handing a job to an outside courier means losing sight of it.",
      fix: "Staff see the driver's name, phone, vehicle and position on the delivery screen until the order is delivered.",
    },
    {
      problem: "A stranger should never be holding the shop's cash.",
      fix: "Only card-paid orders can leave your own team. Anything not clearly paid by card is treated as cash and stays with your own riders.",
    },
    {
      problem: "Customers get confused by another company's tracking page.",
      fix: "The customer follows the delivery on your own branded tracking page, the same one they get when your own rider delivers.",
    },
  ],
  features: [
    {
      title: "One connection, many courier companies",
      body: "A single network option on your delivery screen, with drivers from many courier companies behind it.",
    },
    {
      title: "Your riders first, then the network",
      body: "With automatic dispatch on, a job is offered to your own riders first and handed to the network only if none of them takes it in time. If no network driver takes it either, it comes back to you with an alert.",
    },
    {
      title: "Or choose a network driver yourself",
      body: "When assigning a card-paid delivery, staff can send it straight to a network driver.",
    },
    {
      title: "Cash orders stay in-house",
      body: "Cash on delivery orders are never sent to the network. Only your own riders carry cash.",
    },
    {
      title: "Live driver details for staff",
      body: "See who is carrying the order, their phone number, their vehicle and where they are now.",
    },
    {
      title: "Tracking on your own page",
      body: "The customer gets a live tracking link on your shop's own order page. They are never sent to the courier company's site.",
    },
    {
      title: "Closes itself on delivery",
      body: "When the driver reports the drop, the job is marked delivered. Proof of delivery photos are kept private and shown only to your staff.",
    },
  ],
  howItWorks: [
    {
      title: "Ask us",
      body: "Press Contact us and tell us which area you deliver to and about how many deliveries you make a day.",
    },
    {
      title: "We connect the network",
      body: "Our team connects the courier network to your shop and sets where it sits in your delivery order: your riders first, then the network.",
    },
    {
      title: "Send a delivery to the network",
      body: "Choose a network driver for a card-paid order, or let the automatic hand-off do it when your riders are busy.",
    },
    {
      title: "Follow it to the door",
      body: "Staff watch the driver live, the customer follows your tracking page, and the job closes when the driver reports the drop.",
    },
  ],
  needs: [
    "A TajirPoint account on the Shop plan or above",
    "Delivery set up in TajirPoint, with your own riders if you have them",
    "Online card payments for the orders you want to send to the network",
    "Network drivers covering your area (we check this with you)",
  ],
  setup: [
    "Our team sets it up with you; you do not install it yourself.",
    "Network trips have their own delivery charges from the courier network. We go through them with you before you start.",
    "If you remove it while network drivers are still carrying orders, no new jobs are sent and the ones on the road finish normally.",
  ],
  faqs: [
    {
      q: "Can a network driver collect cash from my customer?",
      a: "No. Cash orders are never sent to the network. Only your own riders carry cash. An order is sent only when it is clearly paid by card.",
    },
    {
      q: "Do my own riders still get the jobs first?",
      a: "Yes, when automatic dispatch is on. Your riders are offered the job first, and it goes to the network only if none of them takes it in time.",
    },
    {
      q: "Will my customer see the courier company's name or website?",
      a: "No. The customer follows the delivery on your own order page, as they do with your own riders.",
    },
    {
      q: "What happens if no network driver takes the job?",
      a: "The job comes back to your shop and staff are alerted, so it is never left without anyone carrying it.",
    },
    {
      q: "Is it available in my area?",
      a: "It depends on which courier companies cover your area. Tell us where you deliver when you contact us and we will check.",
    },
    {
      q: "Is it included in the free Light plan?",
      a: "No. Network drivers needs the Shop plan or above, and our team sets it up with you.",
    },
  ],
};

export default content;
