import type { AddonContent } from "./types";

// Source: domains/fbr (extensions/services/handlers/fbr_handler.py queues each
// completed sale; tasks.py submit_to_fbr with retries, waits while the add-on
// is off, process_pending_submissions every 5 min in workers/beat_schedule.py;
// services/fbr_client.py sandbox + production FBR endpoints; invoice_builder.py
// per-line Tax.fbr_code; qr_generator.py; api/viewsets.py submissions list,
// retry, stats); sales/services/invoice_context.py prints FBR number + QR;
// extensions/access.py: Contact us, asks for NTN/STRN and IRIS POS ID.
// domains/fiscal is a general tax-rule engine, not part of this add-on.
const content: AddonContent = {
  slug: "fbr-integration",
  seoTitle: "FBR POS Integration: Send Every Sale to FBR in Real Time",
  seoDescription:
    "Coming soon for Pakistan: send every sale to FBR as it happens and print the FBR invoice number and QR code on the receipt. Our team sets it up with you.",
  keywords: [
    "FBR POS integration",
    "FBR real time invoice",
    "FBR QR code on receipt",
    "PRAL POS integration",
    "FBR integrated POS Pakistan",
    "Tier-1 retailer POS",
  ],
  schemaSubCategory: "FBR tax reporting add-on for POS (Pakistan)",
  headline: "Every sale reported to FBR, with the FBR number and QR code on the receipt.",
  overview: [
    "FBR Integration is for businesses in Pakistan that must report their sales to the Federal Board of Revenue as they happen. Once it is set up, each completed sale in TajirPoint will be sent to FBR's POS system automatically.",
    "FBR sends back its own invoice number for the sale. TajirPoint will print that number on the receipt with a QR code your customer can scan with FBR's app to check the invoice is real.",
    "If FBR's system is slow or down, nothing is lost. The sale is kept in a queue and sent again automatically, and anything that still fails shows up on an FBR submissions screen where you can see why and send it again.",
  ],
  whoFor: [
    "Retailers in Pakistan that FBR requires to be integrated, such as Tier-1 retailers",
    "Restaurants, pharmacies and shops that want an FBR-integrated till",
    "Businesses with several tills or branches that all need to report",
    "Owners who want proof that every sale reached FBR",
  ],
  problems: [
    {
      problem: "Our till is not FBR integrated, and we have to be.",
      fix: "Each sale will be sent to FBR as it is completed, using your FBR POS ID.",
    },
    {
      problem: "When FBR's system is down, sales go unreported.",
      fix: "Sales that cannot be sent wait in a queue and are retried automatically. A regular check picks up anything that was missed.",
    },
    {
      problem: "We cannot tell which sales reached FBR and which did not.",
      fix: "The submissions screen shows each sale as pending, sent or failed, with counts and the reason for any failure.",
    },
    {
      problem: "Customers ask whether our receipts are FBR verified.",
      fix: "The receipt will carry the FBR invoice number and a QR code they can scan with FBR's app.",
    },
  ],
  features: [
    {
      title: "Every sale sent to FBR",
      body: "When a sale is completed, it is queued and sent to FBR's POS system with its items, tax and payment type.",
    },
    {
      title: "FBR number and QR code on the receipt",
      body: "FBR's invoice number prints on the receipt with a QR code that FBR's app can scan.",
    },
    {
      title: "Automatic retries",
      body: "If sending fails, TajirPoint tries again a few times, waiting longer each time. A check every few minutes picks up anything still waiting.",
    },
    {
      title: "Submissions screen",
      body: "See every sale's FBR status, filter by pending, sent or failed, and send a failed one again with one tap.",
    },
    {
      title: "Correct tax codes per item",
      body: "Each tax rate in TajirPoint can carry its FBR code, so every line goes to FBR with the right code.",
    },
    {
      title: "Test first, then go live",
      body: "Set-up starts on FBR's test system. Once everything checks out, it is switched to the live system.",
    },
  ],
  howItWorks: [
    {
      title: "Ask us",
      body: "Tell us you want FBR Integration and share your NTN or STRN and your FBR POS ID.",
    },
    {
      title: "We set it up with you",
      body: "Our team connects your shop to FBR, matches your tax rates to FBR's codes, and tests on FBR's test system.",
    },
    {
      title: "Go live",
      body: "Once tests pass, your shop is switched to FBR's live system.",
    },
    {
      title: "Sell as normal",
      body: "Every completed sale is sent to FBR, and receipts print the FBR number and QR code.",
    },
  ],
  needs: [
    "A TajirPoint account on the Shop plan or above, for a business in Pakistan",
    "Your NTN or STRN",
    "Your POS ID from FBR's IRIS portal, and the access details FBR gives you for it",
    "A receipt printer for the FBR number and QR code",
  ],
  setup: [
    "Not available yet. Once it is ready, our team sets it up with you; you do not switch it on yourself.",
    "Will need the Shop plan or above.",
    "FBR's own registration and any FBR charges are between you and FBR.",
  ],
  faqs: [
    {
      q: "When will it be ready?",
      a: "We are finishing and testing it now and have no fixed date. Ask us and we will tell you as soon as it is open to shops.",
    },
    {
      q: "Can I switch it on myself?",
      a: "No. Because it files your sales with the tax authority, our team sets it up and tests it with you before it goes live.",
    },
    {
      q: "What do I need from FBR first?",
      a: "Your NTN or STRN and a POS ID from FBR's IRIS portal, with its access details.",
    },
    {
      q: "What happens if FBR's system is down?",
      a: "Your till keeps selling. Sales wait in a queue, are retried automatically, and any that keep failing show on the submissions screen for you to send again.",
    },
    {
      q: "Does the QR code print on the receipt?",
      a: "Yes. The receipt shows FBR's invoice number and a QR code that customers can scan with FBR's app.",
    },
    {
      q: "Do I have to be FBR integrated?",
      a: "That depends on your business and FBR's current rules. Check with FBR or your tax adviser.",
    },
  ],
  comingSoonNote:
    "Built and in final testing; not open to shops yet. Our team will set it up with you once it is ready, so ask us and we will keep you posted.",
};

export default content;
