import type { AddonChrome } from "./types";

/**
 * Page chrome for the add-on detail pages, per locale. English is the source
 * of truth (it matches the page as it was before the translations); Urdu and
 * Arabic await a native review (owner to-do, TP-490).
 *
 * Plan names ("Light", "Shop"), the brand and add-on names stay in Latin
 * letters in every language.
 */

const en: AddonChrome = {
  home: "Home",
  addons: "Add-ons",
  allAddons: "All add-ons",
  relatedAddons: "Related add-ons",
  atAGlance: "At a glance",
  price: "Price",
  status: "Status",
  type: "Type",
  onThisPage: "On this page",
  sections: {
    whatItIs: "What it is",
    problems: "Problems it solves",
    features: "Features",
    howItWorks: "How it works",
    pricing: "Pricing & setup",
    faq: "FAQs",
  },
  keyFeatures: "Key features",
  whoFor: "Who it's for",
  whatYouNeed: "What you need",
  seePlans: ["See all plans on the ", "pricing page", "."],
  faqTitle: (name) => `Questions about ${name}`,
  cta: {
    startTrial: "Start free trial",
    askQuestion: "Ask us a question",
    askSetup: "Ask us to set it up",
    tellMeWhenReady: "Tell me when it's ready",
    askAboutIt: "Ask us about it",
    whatsappUs: "WhatsApp us",
  },
  whatsappMessage: (product, name) => `Hi ${product}, I'm interested in the ${name} add-on.`,
  finalTitle: {
    active: (name) => `Try ${name} free`,
    coming_soon: (name) => `Want ${name} when it's ready?`,
    other: (name) => `Talk to us about ${name}`,
  },
  statusLabel: {
    active: "Available",
    contact_us: "Contact us",
    coming_soon: "Coming soon",
    unavailable: "Unavailable",
  },
  statusHint: {
    active: "Switch it on yourself from the Add-ons page in the back office.",
    contact_us:
      "Our team sets this one up with you. Ask for a call back and we will take it from there.",
    coming_soon: "Not open to shops yet. Leave your number and we will tell you when it is ready.",
    unavailable:
      "Temporarily unavailable. Shops that already use it are not affected. Ask us for details.",
  },
  free: "Free",
  askUs: "Ask us",
  perMonth: (money) => `${money}/month`,
  oneTime: (money) => `${money} one-time`,
  planLight: "Included with the free Light plan",
  planShop: "Needs the Shop plan or above",
  groups: {
    business: "Business packs",
    payments: "Payments",
    "online-stores": "Online stores",
    delivery: "Delivery & couriers",
    accounting: "Accounting",
    customers: "Customers & offers",
    messaging: "Chat & calls",
    compliance: "Tax & compliance",
    reports: "Reports",
    integrations: "Integrations",
  },
  arrow: "→",
};

const ur: AddonChrome = {
  home: "ہوم",
  addons: "ایڈ آنز",
  allAddons: "تمام ایڈ آنز",
  relatedAddons: "متعلقہ ایڈ آنز",
  atAGlance: "ایک نظر میں",
  price: "قیمت",
  status: "صورتحال",
  type: "قسم",
  onThisPage: "اس صفحے پر",
  sections: {
    whatItIs: "یہ کیا ہے",
    problems: "یہ کون سے مسئلے حل کرتا ہے",
    features: "خصوصیات",
    howItWorks: "یہ کیسے کام کرتا ہے",
    pricing: "قیمت اور سیٹ اپ",
    faq: "عام سوالات",
  },
  keyFeatures: "اہم خصوصیات",
  whoFor: "یہ کس کے لیے ہے",
  whatYouNeed: "آپ کو کیا چاہیے",
  seePlans: ["تمام پلان ", "قیمتوں کے صفحے", " پر دیکھیں۔"],
  faqTitle: (name) => `${name} کے بارے میں سوالات`,
  cta: {
    startTrial: "مفت آزمائش شروع کریں",
    askQuestion: "ہم سے سوال پوچھیں",
    askSetup: "ہم سے سیٹ اپ کروائیں",
    tellMeWhenReady: "تیار ہونے پر مجھے بتائیں",
    askAboutIt: "اس کے بارے میں پوچھیں",
    whatsappUs: "ہمیں WhatsApp کریں",
  },
  whatsappMessage: (product, name) => `السلام علیکم ${product}، مجھے ${name} ایڈ آن میں دلچسپی ہے۔`,
  finalTitle: {
    active: (name) => `${name} مفت آزمائیں`,
    coming_soon: (name) => `${name} تیار ہونے پر چاہیے؟`,
    other: (name) => `${name} کے بارے میں ہم سے بات کریں`,
  },
  statusLabel: {
    active: "دستیاب",
    contact_us: "ہم سے رابطہ کریں",
    coming_soon: "جلد آ رہا ہے",
    unavailable: "دستیاب نہیں",
  },
  statusHint: {
    active: "بیک آفس کے ایڈ آنز صفحے سے اسے خود آن کریں۔",
    contact_us:
      "یہ ایڈ آن ہماری ٹیم آپ کے ساتھ مل کر سیٹ کرتی ہے۔ کال بیک کی درخواست کریں، باقی ہم سنبھال لیں گے۔",
    coming_soon: "ابھی دکانوں کے لیے کھلا نہیں۔ اپنا نمبر چھوڑیں، تیار ہوتے ہی ہم آپ کو بتائیں گے۔",
    unavailable:
      "عارضی طور پر دستیاب نہیں۔ جو دکانیں پہلے سے استعمال کر رہی ہیں ان پر کوئی اثر نہیں۔ تفصیل کے لیے ہم سے پوچھیں۔",
  },
  free: "مفت",
  askUs: "ہم سے پوچھیں",
  perMonth: (money) => `${money} ماہانہ`,
  oneTime: (money) => `${money} ایک بار`,
  planLight: "مفت Light پلان میں شامل",
  planShop: "Shop پلان یا اس سے اوپر درکار",
  groups: {
    business: "کاروباری پیک",
    payments: "ادائیگیاں",
    "online-stores": "آن لائن اسٹورز",
    delivery: "ڈیلیوری اور کوریئر",
    accounting: "اکاؤنٹنگ",
    customers: "کسٹمرز اور آفرز",
    messaging: "چیٹ اور کالز",
    compliance: "ٹیکس اور قواعد",
    reports: "رپورٹس",
    integrations: "انٹیگریشنز",
  },
  arrow: "←",
};

const ar: AddonChrome = {
  home: "الرئيسية",
  addons: "الإضافات",
  allAddons: "كل الإضافات",
  relatedAddons: "إضافات ذات صلة",
  atAGlance: "لمحة سريعة",
  price: "السعر",
  status: "الحالة",
  type: "النوع",
  onThisPage: "في هذه الصفحة",
  sections: {
    whatItIs: "ما هي",
    problems: "المشكلات التي تحلّها",
    features: "المزايا",
    howItWorks: "كيف تعمل",
    pricing: "السعر والإعداد",
    faq: "الأسئلة الشائعة",
  },
  keyFeatures: "أهم المزايا",
  whoFor: "لمن هي",
  whatYouNeed: "ما تحتاجه",
  seePlans: ["اطّلع على جميع الخطط في ", "صفحة الأسعار", "."],
  faqTitle: (name) => `أسئلة حول ${name}`,
  cta: {
    startTrial: "ابدأ التجربة المجانية",
    askQuestion: "اسألنا سؤالًا",
    askSetup: "اطلب منّا إعدادها",
    tellMeWhenReady: "أخبرني عندما تجهز",
    askAboutIt: "اسألنا عنها",
    whatsappUs: "راسلنا على WhatsApp",
  },
  whatsappMessage: (product, name) => `مرحبًا ${product}، أنا مهتم بإضافة ${name}.`,
  finalTitle: {
    active: (name) => `جرّب ${name} مجانًا`,
    coming_soon: (name) => `تريد ${name} عندما تجهز؟`,
    other: (name) => `تحدّث معنا عن ${name}`,
  },
  statusLabel: {
    active: "متاحة",
    contact_us: "تواصل معنا",
    coming_soon: "قريبًا",
    unavailable: "غير متاحة",
  },
  statusHint: {
    active: "فعّلها بنفسك من صفحة الإضافات في لوحة الإدارة.",
    contact_us: "يُعدّ فريقنا هذه الإضافة معك. اطلب أن نتصل بك وسنتولّى الباقي.",
    coming_soon: "غير متاحة للمتاجر بعد. اترك رقمك وسنخبرك عندما تجهز.",
    unavailable: "غير متاحة مؤقتًا. المتاجر التي تستخدمها الآن لا تتأثر. اسألنا عن التفاصيل.",
  },
  free: "مجانًا",
  askUs: "اسألنا",
  perMonth: (money) => `${money} شهريًا`,
  oneTime: (money) => `${money} لمرة واحدة`,
  planLight: "مضمّنة في خطة Light المجانية",
  planShop: "تتطلب خطة Shop أو أعلى",
  groups: {
    business: "حزم الأنشطة",
    payments: "المدفوعات",
    "online-stores": "المتاجر الإلكترونية",
    delivery: "التوصيل وشركات الشحن",
    accounting: "المحاسبة",
    customers: "العملاء والعروض",
    messaging: "المحادثة والمكالمات",
    compliance: "الضرائب والامتثال",
    reports: "التقارير",
    integrations: "التكاملات",
  },
  arrow: "←",
};

export const ADDON_CHROME: Record<string, AddonChrome> = { en, ur, ar };

/** The chrome for `locale`, English when the locale is unknown. */
export function addonChrome(locale: string): AddonChrome {
  return ADDON_CHROME[locale] ?? en;
}
