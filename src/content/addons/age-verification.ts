import type { AddonContent } from "./types";
import { BRAND_NAME } from "@/lib/config/brand";

// Source: domains/compliance (models/age_verification_audit.py: method
// dob_entered / id_scanned / override, override_reason, id_reference = last
// digits only, minimum_age_required; api/viewsets.py audit list gated by
// HasExtension("age-verification") + compliance.view_audit);
// catalog Product.age_restricted_minimum; extensions migration 0009 settings
// (default 18/21, require ID scan, allow override) + compliance_officer role.
// The checkout prompt itself is not wired into the till yet: Coming soon.
const content: AddonContent = {
  slug: "age-verification",
  seoTitle: "Age Verification for Age-Restricted Sales at the Till",
  seoDescription:
    "Coming soon: mark products as age-restricted and the till will ask for a date of birth or ID scan before the sale, with a record of every check for inspections.",
  keywords: [
    "age verification POS",
    "age restricted sales till",
    "ID check at checkout",
    "tobacco and vape age check",
    "proof of age record for shops",
  ],
  schemaSubCategory: "Age verification compliance add-on for POS",
  headline: "Check age before every restricted sale, and keep the proof.",
  overview: [
    "Age Verification is for shops that sell items with a legal minimum age, such as tobacco, vapes, alcohol where you are licensed to sell it, or certain medicines. You set a minimum age on each restricted product, for example 18 or 21.",
    "When a restricted item is in the sale, the till will ask the cashier to confirm the customer's age by typing in their date of birth or scanning the barcode on their ID. A manager will be able to approve a sale without ID, but only with a written reason.",
    "Every check will be saved against the sale: who checked, when, how, and the date of birth given. Only the last few digits of an ID number are kept, never the full number. If your regulator or licensing officer asks, you can show the record.",
  ],
  whoFor: [
    "Tobacco, vape and convenience shops",
    "Shops licensed to sell alcohol",
    "Pharmacies selling medicines with an age limit",
    "Any business that has to prove it checks age before a sale",
  ],
  problems: [
    {
      problem: "New cashiers forget to check age on restricted items.",
      fix: "The till will stop and ask for a date of birth or ID scan whenever a restricted item is in the sale.",
    },
    {
      problem: "We check ID but have no proof when an inspector asks.",
      fix: "Each check will be stored with the sale, the cashier, the time and the method used.",
    },
    {
      problem: "Regulars without ID get turned away, or waved through with no record.",
      fix: "A manager will be able to approve the sale, but must enter a reason, which is saved with the sale.",
    },
  ],
  features: [
    {
      title: "Minimum age per product",
      body: "Mark any product as age-restricted and set its minimum age, such as 18, 21 or another age your rules require.",
    },
    {
      title: "Date of birth or ID scan at checkout",
      body: "The cashier will type the customer's date of birth or scan the barcode on their ID. You will be able to require an ID scan for every check.",
    },
    {
      title: "A record of every check",
      body: "Each check is saved with the sale: how age was confirmed, by whom, when, and the highest minimum age in the basket.",
    },
    {
      title: "Manager approval with a reason",
      body: "A manager can let a sale go ahead without ID, but a reason is required and kept on record. You can switch this off.",
    },
    {
      title: "Only part of the ID number kept",
      body: "Only the last few digits of an ID number are stored, never the full number.",
    },
    {
      title: "A role for reviewing checks",
      body: "Give a compliance officer access to review the age-check records without opening the rest of the back office.",
    },
  ],
  howItWorks: [
    {
      title: "Switch it on",
      body: "Once it is ready, you will install it from the Add-ons page in the back office.",
    },
    {
      title: "Mark restricted products",
      body: "Set a minimum age on each product that needs one.",
    },
    {
      title: "Check age at the till",
      body: "When a restricted item is rung up, the till asks for a date of birth or an ID scan before the sale can finish.",
    },
    {
      title: "Review the records",
      body: "Owners, managers or a compliance officer can look through every check and every manager approval.",
    },
  ],
  needs: [
    `A ${BRAND_NAME} account on the Shop plan or above`,
    "Optional: a barcode scanner that can read the barcode on customer IDs",
    "Your local rules on minimum ages for the products you sell",
  ],
  setup: [
    "Not available to install yet. Once it is ready, you will switch it on yourself from the Add-ons page.",
    "Will need the Shop plan or above.",
    "Your existing products and sales are not affected until it is switched on.",
  ],
  faqs: [
    {
      q: "When will it be ready?",
      a: "We are finishing it now and have no fixed date. Ask us and we will tell you as soon as it is open to shops.",
    },
    {
      q: "Does it tell me what the legal age is for my products?",
      a: "No. You set the minimum age on each product based on your local rules. If you are unsure, ask your regulator or licensing officer.",
    },
    {
      q: "Do I need an ID scanner?",
      a: "No. The cashier can type the date of birth instead. A scanner that reads the barcode on IDs makes it faster, and you will be able to require it if you prefer.",
    },
    {
      q: "Do you store customers' ID numbers?",
      a: "Only the last few digits of an ID number are kept with the check, never the full number.",
    },
    {
      q: "Can a manager approve a sale without ID?",
      a: "Yes, if you allow it. The manager must enter a reason, and it is saved with the sale.",
    },
    {
      q: "Which plan will I need?",
      a: "Age Verification will need the Shop plan or above.",
    },
  ],
  comingSoonNote:
    "Being built: the product settings and the check records exist, the checkout prompt is not open to shops yet. Ask us and we will tell you when it is ready.",
};

export default content;
