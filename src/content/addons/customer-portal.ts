import type { AddonContent } from "./types";
import { BRAND_NAME } from "@/lib/config/brand";

// Source: domains/parties/api/portal (auth.py: sign-up only for a customer the
// shop already has, matched by phone, proved with a one-time text code, own
// password; login; views.py: dashboard with balance, credit limit, recent bills
// and ledger; my-ledger, my-invoices, my-payments; all read-only, gated by
// HasExtension("customer-portal")).
const content: AddonContent = {
  slug: "customer-portal",
  seoTitle: "Customer Portal: Let Credit Customers See Their Balance",
  seoDescription:
    "Let your credit customers log in with their phone number to see their balance, bills and payments any time. No more sending balance screenshots on WhatsApp.",
  keywords: [
    "customer ledger portal",
    "khata balance for customers",
    "udhaar customer login",
    "credit customer statement online",
    "customer account portal for shops",
  ],
  schemaSubCategory: "Customer self-service portal add-on",
  headline: "Your credit customers check their own balance, bills and payments.",
  overview: [
    `Customer Portal gives the customers you sell to on credit their own login. They see the same account you keep for them in ${BRAND_NAME}: what they owe, their bills, and the payments they have made.`,
    "Only customers you have already added can sign up. They enter the phone number you have on file, get a one-time code by text message to prove it is theirs, and choose a password. From then on they log in with their phone and password.",
    "The portal is view-only. Customers cannot change anything, and they only ever see their own account. It works on its own for any business with credit customers, and fits well with Route Dispatch for distributors.",
  ],
  whoFor: [
    "Wholesalers and distributors with many shops buying on udhaar",
    "Retailers with regular customers on a running account",
    "Businesses that send balance screenshots on WhatsApp every week",
    "Owners who want fewer calls asking how much is due",
  ],
  problems: [
    {
      problem: "Customers keep calling to ask how much they owe.",
      fix: "They log in and see their current balance and their account history themselves.",
    },
    {
      problem: "Every month we send screenshots of running balances on WhatsApp.",
      fix: "The portal shows the live account, so there is nothing to send.",
    },
    {
      problem: "Customers dispute bills because they never saw them.",
      fix: "Every bill and payment on their account is listed, with dates and amounts.",
    },
  ],
  features: [
    {
      title: "Sign-up with a text code",
      body: "Customers sign up with the phone number you have for them and a one-time code sent by text, then set their own password.",
    },
    {
      title: "Balance at a glance",
      body: "The home screen shows the current balance, their credit limit, and their latest bills and account entries.",
    },
    {
      title: "Full account history",
      body: `Every entry on their account, with the running balance, just as you see it in ${BRAND_NAME}.`,
    },
    {
      title: "Bills and payments",
      body: "A list of their bills with the amount still due on each, and a list of the payments they have made.",
    },
    {
      title: "Only their own account",
      body: "A customer only sees their own records. The portal login is separate from your staff logins and cannot open the back office.",
    },
  ],
  howItWorks: [
    {
      title: "Switch it on",
      body: "Install Customer Portal from the Add-ons page in the back office.",
    },
    {
      title: "Make sure customers have a phone number",
      body: "Each credit customer needs their phone number saved on their customer record.",
    },
    {
      title: "Share the portal link",
      body: "Send your customers the portal link. They enter their phone number and the code they receive, and set a password.",
    },
    {
      title: "They check their account any time",
      body: "Customers log in to see their balance, bills and payments. Everything updates as you record sales and payments.",
    },
  ],
  needs: [
    `A ${BRAND_NAME} account on the Shop plan or above`,
    `Your credit customers added in ${BRAND_NAME}, each with their phone number`,
    "Customers need a phone that can receive a text message to sign up",
  ],
  setup: [
    "You switch it on yourself from the Add-ons page.",
    "Needs the Shop plan or above.",
    `If you switch it off, customers can no longer log in; their accounts in ${BRAND_NAME} are not changed.`,
  ],
  faqs: [
    {
      q: "Can anyone sign up?",
      a: "No. Only people you have already added as customers can sign up, and they must prove the phone number with a code sent to it.",
    },
    {
      q: "Can customers pay through the portal?",
      a: "Not at the moment. The portal shows their balance, bills and payments; payments are still recorded by you.",
    },
    {
      q: "Can a customer see another customer's account?",
      a: "No. Each login only shows that customer's own records.",
    },
    {
      q: "What if two customer records have the same phone number?",
      a: "The sign-up is refused and the customer is asked to contact you, so you can fix the records first.",
    },
    {
      q: "My customer already orders on my website. Do they need a new login?",
      a: "Usually not. If their login with your shop is already linked to the same phone number, they sign in with that phone number and password, or reset the password.",
    },
    {
      q: "Do I need Route Dispatch to use this?",
      a: "No. Customer Portal works for any business with credit customers. Distributors often use the two together.",
    },
  ],
};

export default content;
