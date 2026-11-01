import type { AddonContent } from "./types";

// Source: domains/voice_ai (handler.py, models phone_line Language en/ur/mixed,
// settings CodConfirmation link/auto + LinkChannel sms/whatsapp, call_session
// MenuChoice + PaymentChoice + CallTurn transcript; services/ordering via
// storefront placement, tools incl. transfer_to_human, phone_menu,
// number_service: bring-your-own Twilio number only in v1).
const content: AddonContent = {
  slug: "ai-phone-ordering",
  seoTitle: "AI Phone Ordering: An Assistant That Takes Phone Orders",
  seoDescription:
    "Coming soon: an assistant answers your restaurant phone in English or Urdu, takes the order from your live menu and texts a link to pay or confirm.",
  keywords: [
    "AI phone ordering for restaurants",
    "automated phone orders",
    "restaurant phone assistant",
    "Urdu phone ordering",
    "take orders by phone automatically",
  ],
  schemaSubCategory: "AI phone ordering add-on for restaurants",
  headline: "An assistant that answers the phone, takes the order and never gets a price wrong.",
  overview: [
    "AI Phone Ordering will let an assistant answer your shop's phone. It greets the caller, reads out your live menu, takes the order and asks whether they want to pay now or on delivery.",
    "The order is placed through the same menu and prices as your online order page, so the total the caller hears is the total they pay. It lands on your online orders desk, marked as a phone order. A caller who asks for a person is put straight through.",
    "It is not open to shops yet. Once it is live, our team will set it up with you, because every call has a running cost for the phone line and the assistant.",
  ],
  whoFor: [
    "Restaurants and takeaways that take a lot of orders by phone",
    "Busy kitchens where nobody has time to answer at peak hours",
    "Shops that miss calls after closing or during the rush",
    "Businesses with callers who prefer Urdu, English or a mix of both",
  ],
  problems: [
    {
      problem: "The phone rings during the rush and nobody can answer.",
      fix: "The assistant answers every call and takes the order while your staff keep cooking and serving.",
    },
    {
      problem: "Orders taken over the phone get written down wrong.",
      fix: "The assistant builds the order from your real menu and reads the cart back, priced the same way as your website.",
    },
    {
      problem: "Prank calls end in cooked food nobody collects.",
      fix: "Cash orders can be held until the caller taps a confirmation link sent to their phone.",
    },
    {
      problem: "Nobody knows what was said when a customer complains.",
      fix: "Every call is saved as a written transcript, including what the assistant did, so you can check exactly what was ordered.",
    },
  ],
  features: [
    {
      title: "Answers in English, Urdu or both",
      body: "Choose the languages your callers speak. The assistant can also handle a mix of Urdu and English.",
    },
    {
      title: "Reads your live menu",
      body: "It only offers items and prices from your menu, priced the same way as your online order page. It does not make up dishes or prices.",
    },
    {
      title: "Orders on your online orders desk",
      body: "Phone orders arrive with your other online orders, marked as phone orders, under the caller's own number.",
    },
    {
      title: "Pay now or on delivery",
      body: "The caller chooses. They get a payment link, or for cash orders a one-tap confirmation, by SMS, WhatsApp or both.",
    },
    {
      title: "A person whenever they ask",
      body: "A caller who asks for a person is put through to your own number straight away.",
    },
    {
      title: "Press 1 for a link, press 2 for the restaurant",
      body: "You can also have a simple phone menu that texts callers your order page link or puts them through to the shop.",
    },
    {
      title: "Full call transcripts",
      body: "Every call keeps both sides of the conversation and every step the assistant took.",
    },
    {
      title: "Try it before taking orders",
      body: "Switch order taking off and the assistant can still answer and read the menu, so you can test the line first.",
    },
  ],
  howItWorks: [
    {
      title: "Tell us you want it",
      body: "Press the button on the add-on and tell us whether you want a new number or to use your own. We will let you know when it is ready.",
    },
    {
      title: "We set up the line with you",
      body: "Once it is live, our team connects your phone number, your languages, your greeting and the number to put callers through to.",
    },
    {
      title: "Choose how cash orders are confirmed",
      body: "Send a confirmation link and wait for the tap, or treat the call itself as confirmation.",
    },
    {
      title: "Orders come in",
      body: "Callers order with the assistant and the orders arrive on your online orders desk, ready to accept and cook.",
    },
  ],
  needs: [
    "A TajirPoint account on the Shop plan or above",
    "Your menu set up on your TajirPoint online order page",
    "A Twilio phone number (your own account) for the line",
    "A phone number of your own to put callers through to",
  ],
  setup: [
    "Coming soon: it cannot be installed yet.",
    "Once live, our team will set it up with you; you will not install it yourself.",
    "The phone line's call charges are on your own Twilio account.",
  ],
  faqs: [
    {
      q: "When will it be ready?",
      a: "It is built and still being tested before we open it to shops. We do not have a date yet; ask us and we will tell you when it is ready.",
    },
    {
      q: "Can it speak Urdu?",
      a: "Yes. It can answer in English, Urdu or a mix of both, whichever you choose for your line.",
    },
    {
      q: "Could it quote a wrong price?",
      a: "It reads prices from your live menu and prices the order the same way your online order page does, so the total it reads out is the total charged.",
    },
    {
      q: "What if the caller wants to speak to a person?",
      a: "They are put through to your own number as soon as they ask.",
    },
    {
      q: "Can I keep my current phone number?",
      a: "At launch the line runs on a Twilio number on your own account. Tell us what you have now and we will talk you through the options.",
    },
    {
      q: "How do I stop fake cash orders?",
      a: "Leave cash order confirmation on. The caller gets a link and the order only goes ahead once they tap it.",
    },
    {
      q: "Is it included in the free Light plan?",
      a: "No. AI Phone Ordering will need the Shop plan or above.",
    },
  ],
  comingSoonNote:
    "Built and in final testing; not open to shops yet. Ask us and we will tell you when it is ready.",
};

export default content;
