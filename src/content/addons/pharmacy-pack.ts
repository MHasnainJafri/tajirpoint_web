import type { AddonContent } from "./types";
import { BRAND_NAME } from "@/lib/config/brand";

// Source: domains/compliance (handler.py seeds the expiry alert setting, 30 days
// by default; models/prescription_ref.py doctor, licence, Rx number, patient,
// issue date, notes per sale), catalog/models/product.py drug_schedule (OTC / Rx
// / controlled), generic_name, molecule, cold_chain; sales/services/
// sale_service.py refuses an Rx/controlled sale without a prescription number;
// inventory batch FEFO consumption + tasks.py
// in-app expiry notifications; identity ready_roles pharmacist. Web:
// features/pharmacy (Expiry, Molecule stock, Prescriptions screens).
const content: AddonContent = {
  slug: "pharmacy-pack",
  seoTitle: "Pharmacy POS Add-on: Prescriptions, Expiry, Drug Schedules",
  seoDescription:
    "Mark medicines as OTC, prescription or controlled, keep a prescription log, see stock by molecule and catch expiring batches before they go to waste.",
  keywords: [
    "pharmacy POS software",
    "medical store software Pakistan",
    "pharmacy expiry tracking",
    "prescription log software",
    "chemist shop billing software",
    "pharmacy stock by generic name",
  ],
  schemaSubCategory: "Pharmacy add-on for POS",
  headline:
    "A pharmacy counter that knows which medicines need a prescription and which batches expire next.",
  overview: [
    `The Pharmacy Pack adds what a medical store or chemist needs on top of the ${BRAND_NAME} till. Mark each medicine as over-the-counter, prescription-only or controlled, and record its generic name and active molecule.`,
    "When a prescription or controlled medicine is sold, the till asks for the prescription number and will not finish the sale without it. The doctor, patient and prescription details are kept in a prescription log you can search and show when asked.",
    "With batch and expiry tracking, the batch that expires first is sold first. An expiry screen shows what has expired and what expires within 30 or 90 days, and owners and managers get an alert in the app before stock runs out of date.",
  ],
  whoFor: [
    "Pharmacies, medical stores and chemists",
    "Clinics and hospitals with their own dispensary counter",
    "Pharmacy chains with more than one branch",
    "Owners who lose money every year to expired stock",
  ],
  problems: [
    {
      problem: "Prescription medicines get sold over the counter with no record.",
      fix: "The till will not complete a sale of a prescription or controlled medicine without a prescription number, and the details are saved in the prescription log.",
    },
    {
      problem: "We find expired stock on the shelf when it is already too late.",
      fix: "Batches that expire first are sold first, the expiry screen shows what expires within 30 and 90 days, and an alert reaches you ahead of time.",
    },
    {
      problem:
        "A brand is out of stock and staff do not know what else we have with the same salt.",
      fix: "The molecule stock screen groups your products by active molecule and shows the total stock for each.",
    },
  ],
  features: [
    {
      title: "Drug schedule per medicine",
      body: "Mark each product as over-the-counter, prescription-only or controlled substance.",
    },
    {
      title: "Prescription check at the till",
      body: "A sale with a prescription or controlled medicine needs a prescription number before it can be completed.",
    },
    {
      title: "Prescription log",
      body: "Record the doctor's name and licence, prescription number, patient name and phone, issue date and notes against the sale, and search them later.",
    },
    {
      title: "Generic name and molecule",
      body: "Record the generic name and active molecule for each medicine, and see total stock per molecule on one screen.",
    },
    {
      title: "Expiry screen",
      body: "See every batch with its expiry date, marked as expired, expiring within 30 days, or within 90 days, by branch.",
    },
    {
      title: "Earliest expiry sold first",
      body: "With batch tracking, stock is taken from the batch that expires soonest, so older stock leaves the shelf first.",
    },
    {
      title: "Expiry alerts",
      body: "Owners and managers get an in-app alert for batches nearing expiry. The alert starts 30 days ahead by default and you can change it.",
    },
  ],
  howItWorks: [
    {
      title: "Switch it on",
      body: "Install the Pharmacy Pack from the Add-ons page in the back office. Expiry alerts are turned on for you.",
    },
    {
      title: "Tag your medicines",
      body: "Set the drug schedule, generic name and molecule on each product.",
    },
    {
      title: "Receive stock in batches",
      body: "Enter the batch and expiry date when stock comes in, so expiry tracking and earliest-expiry-first selling work.",
    },
    {
      title: "Sell and log prescriptions",
      body: "At the till, enter the prescription number for prescription medicines and record the doctor and patient details in the log.",
    },
    {
      title: "Check expiry and molecule stock",
      body: "Use the expiry screen and the molecule stock screen to plan returns, discounts and reorders.",
    },
  ],
  needs: [
    `A ${BRAND_NAME} account (any plan, including Light)`,
    `Your medicines in ${BRAND_NAME} with their schedule, generic name and molecule`,
    "Batch numbers and expiry dates when you receive stock",
    "A barcode scanner is helpful but not required",
  ],
  setup: [
    "You switch it on yourself from the Add-ons page; it takes a minute.",
    "The Pharmacy Pack is included with the Light plan.",
    "Shops that sign up as a pharmacy get it switched on from the start.",
    "Uninstalling keeps your prescription log and product details.",
  ],
  faqs: [
    {
      q: "What happens if a cashier tries to sell a prescription medicine without a prescription?",
      a: "The sale is stopped and the till names the medicine that needs a prescription number. Over-the-counter medicines sell as normal.",
    },
    {
      q: "Does it work with batches and expiry dates?",
      a: "Yes. Record the batch and expiry date when stock arrives. The batch that expires first is sold first, and the expiry screen shows what is close to its date.",
    },
    {
      q: "When do expiry alerts arrive?",
      a: "Owners and managers get an in-app alert for batches expiring within the set number of days, 30 by default. You can change the number.",
    },
    {
      q: "Can I see stock by generic name or salt?",
      a: "Yes. Tag products with their molecule and the molecule stock screen adds up the stock of every brand with that molecule.",
    },
    {
      q: "Is the prescription log enough for an inspection?",
      a: "It gives you a searchable record of each prescription sale with doctor, patient and prescription details. Check with your regulator which records they require.",
    },
    {
      q: "Is there a role for the pharmacist?",
      a: "Yes. Shops set up as a pharmacy get a ready-made Pharmacist role that can sell at the till and keep prescriptions, without access to accounts or settings.",
    },
    {
      q: "Is it included in the free Light plan?",
      a: "Yes. The Pharmacy Pack is one of the add-ons included with Light.",
    },
  ],
};

export default content;
