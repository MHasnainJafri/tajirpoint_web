import type { AddonContent } from "./types";

// Source: domains/whatsapp_ai (WhatsAppAccount on Meta's WhatsApp Cloud;
// AIEmployee role/tone/language/tools/credential; LLMCredential providers
// openai/gemini/anthropic/openrouter, shop key encrypted, platform key only
// when allow_shop_fallback; services/llm/resolver; agent_service: no key ->
// escalate to a person, mode re-checked so takeover silences the AI;
// tools.TOOLS search/stock/price/escalate; ORDERING_TOOLS + ordering.py +
// WhatsAppOrderingSettings (off by default, staff/auto COD confirmation,
// order updates, unpaid reminder/cancel); conversation_service take_over /
// hand_back; consumers live inbox; channel_service 24-hour window).
// monthly_budget / max_discount_pct exist on the models but nothing enforces
// them, so they are left out.
const content: AddonContent = {
  slug: "whatsapp-ai",
  seoTitle: "WhatsApp AI Assistant for Shops and Restaurants",
  seoDescription:
    "An AI assistant on your WhatsApp Business number that answers price and stock questions from your real items, in Roman Urdu, Urdu or English. Take over anytime.",
  keywords: [
    "WhatsApp AI assistant for business",
    "WhatsApp chatbot Pakistan",
    "Roman Urdu WhatsApp bot",
    "WhatsApp ordering for restaurants",
    "AI customer service WhatsApp",
    "WhatsApp Business automation",
  ],
  schemaSubCategory: "WhatsApp AI assistant add-on for POS",
  headline:
    "An assistant on your WhatsApp that knows your prices and stock, and steps aside when you step in.",
  overview: [
    "Customers message your shop on WhatsApp all day asking the same things: is this in stock, how much is it, are you open. WhatsApp AI Assistant will put an AI helper on your WhatsApp Business number that answers those questions using your real TajirPoint items, prices and stock, not guesses.",
    "You set up one or more assistants, each with a name, a role, a tone and a language: Roman Urdu, Urdu or English. Every chat shows up live in an inbox in your back office. Tap Take over and the AI goes quiet straight away so a person can reply; hand it back when you are done. If the AI cannot help, it passes the chat to your staff.",
    "The AI runs on your own account with an AI company: OpenAI, Google Gemini, Anthropic (Claude) or OpenRouter. You add your key once, and that company bills you directly for what the assistant uses. If you sell online, you can also let the assistant take orders in the chat.",
  ],
  whoFor: [
    "Shops and restaurants that get lots of WhatsApp questions",
    "Owners who cannot reply to every message during busy hours",
    "Restaurants that already take orders over WhatsApp by hand",
    "Businesses whose customers write in Roman Urdu or Urdu",
    "Teams that want a person to step in on any chat at any time",
  ],
  problems: [
    {
      problem: "Customers wait hours for a reply about price or stock.",
      fix: "The assistant answers straight away, looking up the item's real price and stock in TajirPoint.",
    },
    {
      problem: "Chatbots make up prices or say things you never agreed to.",
      fix: "Prices and stock come only from your own data. When it cannot answer, it hands the chat to a person.",
    },
    {
      problem: "When staff jump into a chat, the bot keeps talking over them.",
      fix: "Take over from the inbox and the AI goes silent on that chat until you hand it back.",
    },
    {
      problem: "WhatsApp orders are scribbled down and get lost.",
      fix: "With chat ordering on, the assistant builds the order, reads back the total and places it only after the customer says yes. It lands with your other online orders.",
    },
  ],
  features: [
    {
      title: "Assistants you set up",
      body: "Give each one a name, a role such as sales or support, a tone (formal, warm or casual) and a language. Add your own instructions and choose what it may look up.",
    },
    {
      title: "Answers from your real data",
      body: "It searches your items, checks stock and quotes your selling price. For restaurant dishes it says whether the kitchen can make it, not a stock number.",
    },
    {
      title: "Roman Urdu, Urdu or English",
      body: "Pick the language each assistant replies in. A Roman Urdu or Urdu assistant switches if the customer clearly writes in another language.",
    },
    {
      title: "Live inbox with one-tap takeover",
      body: "See every chat as it happens. Take over and the AI stays silent, even if it was halfway through a reply; reply yourself, then hand it back.",
    },
    {
      title: "Hands over when it should",
      body: "If a question is beyond it, or no AI key is set up, the chat is marked as waiting for a person instead of going unanswered.",
    },
    {
      title: "Your own AI key",
      body: "Use a key from OpenAI, Google Gemini, Anthropic (Claude) or OpenRouter. It is stored locked away, only the last four characters are ever shown, and a Test button checks it works.",
    },
    {
      title: "Optional ordering in the chat",
      body: "Switched off until you turn it on. The assistant builds the order from your online menu, asks pickup or delivery, reads back every item and the total, and places it only after the customer says yes.",
    },
    {
      title: "Pay by link or cash",
      body: "The customer can pay by a card payment link posted in the chat, or cash. Cash orders wait for staff to accept them, or you can let the customer's yes confirm them.",
    },
  ],
  howItWorks: [
    {
      title: "Ask us from the Add-ons page",
      body: "Tell us which WhatsApp number you want to use and whether your business is verified with Meta.",
    },
    {
      title: "Connect your WhatsApp Business number",
      body: "We connect your number through Meta's official WhatsApp Business service with you.",
    },
    {
      title: "Add your AI key",
      body: "Paste a key from your OpenAI, Gemini, Claude or OpenRouter account, press Test, and pick the model.",
    },
    {
      title: "Set up your assistant",
      body: "Name it, choose its role, tone and language, and add any instructions about your shop.",
    },
    {
      title: "Watch and step in",
      body: "Chats appear live in the inbox. Take over any time, and switch on chat ordering when you are ready.",
    },
  ],
  needs: [
    "A WhatsApp Business number on Meta's official WhatsApp Business service, ideally with your business verified by Meta",
    "An account and key with OpenAI, Google Gemini, Anthropic (Claude) or OpenRouter",
    "Your items and prices in TajirPoint",
    "For chat ordering: online ordering set up, with your menu, delivery areas and payment options",
    "A TajirPoint account on the Shop plan or above",
  ],
  setup: [
    "Once it is live, our team sets up the WhatsApp connection with you.",
    "AI usage is billed to you by the AI company whose key you use, not by TajirPoint.",
    "Any WhatsApp messaging charges are set by Meta under its own pricing.",
    "Chat ordering, order updates and payment reminders are each off until you switch them on.",
  ],
  faqs: [
    {
      q: "When will it be ready?",
      a: "It is built and being tested, so we have no date yet. Ask us and we will tell you as soon as it opens.",
    },
    {
      q: "Do I need my own AI key?",
      a: "Yes, normally. Each shop adds its own key from OpenAI, Google Gemini, Anthropic (Claude) or OpenRouter, and that company bills you for what is used. In some cases our team can run it on a TajirPoint key instead; ask us.",
    },
    {
      q: "What happens if my key stops working?",
      a: "The assistant does not reply on its own. The chat is marked as waiting for a person so your staff can answer it.",
    },
    {
      q: "Can it make up prices or offers?",
      a: "It is told to use only what your data returns. Prices, stock and order totals come from TajirPoint, and an order is placed only after the customer confirms the total in a later message.",
    },
    {
      q: "Can I use my normal WhatsApp Business app number?",
      a: "It works through Meta's official WhatsApp Business service, which needs its own setup on your number. Tell us your number and we will tell you what is needed.",
    },
    {
      q: "Can it message customers whenever I like?",
      a: "WhatsApp only allows free replies within 24 hours of the customer's last message. Order updates are sent while that window is open.",
    },
    {
      q: "Which plan do I need?",
      a: "WhatsApp AI Assistant needs the Shop plan or above. It is not part of the free Light plan.",
    },
  ],
  comingSoonNote:
    "Built and being tested; not open to shops yet. Ask us and we will tell you when it is ready.",
};

export default content;
