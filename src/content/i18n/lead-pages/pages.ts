import type { Localized } from "../page-copy";
import { BRAND_EMAIL, BRAND_NAME } from "@/lib/config/brand";
import { legal } from "@/lib/config/site";
import { PLACE } from "@/lib/marketing/demo-options";
import { BUSINESSES, SHOWN_BUSINESS_SLUGS, BUSINESS_SLUGS } from "@/lib/marketing/businesses";

/**
 * "Restaurant, shop, pharmacy, distributor", or the kinds of business this
 * build serves when it serves only some (NEXT_PUBLIC_BUSINESS_TYPES).
 */
const KINDS =
  SHOWN_BUSINESS_SLUGS.length === BUSINESS_SLUGS.length
    ? "Restaurant, shop, pharmacy, distributor"
    : BUSINESSES.map((b, i) => (i ? b.name.toLowerCase() : b.name)).join(", ");

/**
 * Page copy (outside the forms) of /book-demo, /get-a-call, /contact and
 * /about, plus the "Interested? We'll call you" band on the home and pricing
 * pages. Form words are in ./forms.ts.
 */

interface Meta {
  title: string;
  description: string;
}

type Point = { title: string; body: string };

/** City and country names from `legal` (site config), written in Urdu / Arabic. */
const PLACE_UR: Record<string, string> = { Islamabad: "اسلام آباد", Pakistan: "پاکستان" };
const PLACE_AR: Record<string, string> = { Islamabad: "إسلام آباد", Pakistan: "باكستان" };
const ur = (s: string) => PLACE_UR[s] ?? s;
const ar = (s: string) => PLACE_AR[s] ?? s;

// ── /book-demo ────────────────────────────────────────────────────────

export interface BookDemoCopy {
  meta: Meta;
  breadcrumb: string;
  badge: string;
  /** Headline around the highlighted word: before + accent + after. */
  headline: { before: string; accent: string; after: string };
  sub: string;
  formTitle: string;
  points: Point[];
  hurry: string;
  whatsappUs: string;
  justTalk: string;
  askCall: string;
  tryYourself: string;
  startFree: string;
}

export const BOOK_DEMO_COPY: Localized<BookDemoCopy> = {
  en: {
    meta: {
      title: "Book a Free POS Demo",
      description: `See ${BRAND_NAME} with your own kind of business. Book a free demo — we ${legal.whatsappUrl ? "WhatsApp" : "call"} you within one working day, and we can move your data from your old POS for free.`,
    },
    breadcrumb: "Book a demo",
    badge: "Free demo · no obligation",
    headline: { before: `See ${BRAND_NAME} run `, accent: "your", after: " business." },
    sub: `Tell us a little about your ${PLACE.one} and we'll ${legal.whatsappUrl ? "WhatsApp" : "call"} you within one working day to fix a time.`,
    formTitle: "Book your free demo",
    points: [
      {
        title: "Your kind of business",
        body: `${KINDS} — we show the screens you will use.`,
      },
      {
        title: "Your own products",
        body: "Send a few items beforehand and we set them up for the demo.",
      },
      {
        title: "We move your data",
        body: "Switching from another POS? We load your products, customers and credit balances for free.",
      },
      {
        title: "A demo at a convenient time",
        body: "Choose a preferred time in your local time zone. We’ll confirm the language and availability with you.",
      },
    ],
    hurry: "In a hurry?",
    whatsappUs: "WhatsApp us at",
    justTalk: "Just want to talk?",
    askCall: "Ask for a call back",
    tryYourself: "Prefer to try it yourself?",
    startFree: "Start free — 3 months, no card",
  },
  ur: {
    meta: {
      title: "مفت POS ڈیمو بک کریں",
      description: `${BRAND_NAME} کو اپنے کاروبار کے ساتھ دیکھیں۔ مفت ڈیمو بک کریں — ہم ایک کاروباری دن کے اندر واٹس ایپ کریں گے، اور پرانے POS سے آپ کا ڈیٹا مفت منتقل کر سکتے ہیں۔`,
    },
    breadcrumb: "ڈیمو بک کریں",
    badge: "مفت ڈیمو · کوئی پابندی نہیں",
    headline: { before: `${BRAND_NAME} کو `, accent: "اپنا", after: " کاروبار چلاتے دیکھیں۔" },
    sub: "اپنی دکان کے بارے میں تھوڑا سا بتائیں، ہم ایک کاروباری دن کے اندر واٹس ایپ پر وقت طے کر لیں گے۔",
    formTitle: "اپنا مفت ڈیمو بک کریں",
    points: [
      {
        title: "آپ کے کاروبار کے مطابق",
        body: "ریسٹورنٹ، دکان، فارمیسی، ڈسٹری بیوٹر — ہم وہی اسکرینیں دکھاتے ہیں جو آپ استعمال کریں گے۔",
      },
      {
        title: "آپ کی اپنی مصنوعات",
        body: "پہلے سے چند آئٹمز بھیج دیں، ہم ڈیمو کے لیے انہیں سیٹ کر دیں گے۔",
      },
      {
        title: "ڈیٹا ہم منتقل کریں گے",
        body: "کسی اور POS سے آ رہے ہیں؟ ہم آپ کی مصنوعات، گاہک اور اُدھار بیلنس مفت لوڈ کر دیتے ہیں۔",
      },
      {
        title: "آپ کی سہولت کے وقت ڈیمو",
        body: "اپنے مقامی وقت کے حساب سے پسندیدہ وقت چنیں۔ زبان اور وقت کی تصدیق ہم آپ سے کر لیں گے۔",
      },
    ],
    hurry: "جلدی ہے؟",
    whatsappUs: "ہمیں واٹس ایپ کریں",
    justTalk: "صرف بات کرنا چاہتے ہیں؟",
    askCall: "کال بیک کی درخواست کریں",
    tryYourself: "خود آزمانا چاہتے ہیں؟",
    startFree: "مفت شروع کریں — 3 ماہ، کارڈ کے بغیر",
  },
  ar: {
    meta: {
      title: "احجز عرضًا مجانيًا لنظام نقاط البيع",
      description: `شاهد ${BRAND_NAME} مع نوع نشاطك. احجز عرضًا مجانيًا — نراسلك على واتساب خلال يوم عمل واحد، ويمكننا نقل بياناتك من نظامك القديم مجانًا.`,
    },
    breadcrumb: "احجز عرضًا توضيحيًا",
    badge: "عرض مجاني · دون التزام",
    headline: { before: `شاهد ${BRAND_NAME} يدير `, accent: "نشاطك", after: " التجاري." },
    sub: "أخبرنا قليلًا عن متجرك وسنراسلك على واتساب خلال يوم عمل واحد لتحديد موعد.",
    formTitle: "احجز عرضك المجاني",
    points: [
      {
        title: "حسب نوع نشاطك",
        body: "مطعم، متجر، صيدلية، موزّع — نعرض لك الشاشات التي ستستخدمها.",
      },
      {
        title: "منتجاتك أنت",
        body: "أرسل بعض الأصناف مسبقًا وسنجهّزها للعرض.",
      },
      {
        title: "ننقل بياناتك",
        body: "تنتقل من نظام نقاط بيع آخر؟ ننقل منتجاتك وعملاءك وأرصدة الآجل مجانًا.",
      },
      {
        title: "عرض في وقت يناسبك",
        body: "اختر وقتًا مفضّلًا بتوقيتك المحلي. وسنؤكد معك اللغة والموعد.",
      },
    ],
    hurry: "مستعجل؟",
    whatsappUs: "راسلنا على واتساب",
    justTalk: "تريد التحدث فقط؟",
    askCall: "اطلب اتصالًا",
    tryYourself: "تفضّل التجربة بنفسك؟",
    startFree: "ابدأ مجانًا — 3 أشهر، دون بطاقة",
  },
};

// ── /get-a-call ───────────────────────────────────────────────────────

export interface GetACallCopy {
  meta: Meta;
  breadcrumb: string;
  badge: string;
  headline: string;
  headlineAccent: string;
  sub: string;
  formTitle: string;
  points: Point[];
  hurry: string;
  whatsappUs: string;
  seeIt: string;
  bookDemo: string;
  or: string;
  startFree: string;
}

export const GET_A_CALL_COPY: Localized<GetACallCopy> = {
  en: {
    meta: {
      title: "Get a Free Call Back from Our POS Team",
      description: `Interested in ${BRAND_NAME} POS? Leave your business name and phone number and a person from our team calls you within one working day to answer your questions.`,
    },
    breadcrumb: "Get a call back",
    badge: "Free · no obligation",
    headline: "Interested?",
    headlineAccent: "We'll call you.",
    sub: "Leave your business name and phone number. Our team calls you within one working day.",
    formTitle: "Ask for a call back",
    points: [
      {
        title: "A person, not a bot",
        body: `Someone from the ${BRAND_NAME} team calls you on the number you give.`,
      },
      {
        title: "Your questions answered",
        body: "Prices, hardware, how it works for your kind of business — ask anything.",
      },
      {
        title: "Help to switch",
        body: "Moving from another POS or a register? We load your products and customers for free.",
      },
    ],
    hurry: "In a hurry?",
    whatsappUs: "WhatsApp us at",
    seeIt: "Want to see it running?",
    bookDemo: "Book a free demo",
    or: "or",
    startFree: "start free",
  },
  ur: {
    meta: {
      title: "ہماری POS ٹیم سے مفت کال بیک لیں",
      description: `${BRAND_NAME} POS میں دلچسپی ہے؟ اپنے کاروبار کا نام اور فون نمبر دیں، ہماری ٹیم کا ایک بندہ ایک کاروباری دن کے اندر آپ کو کال کر کے آپ کے سوالوں کا جواب دے گا۔`,
    },
    breadcrumb: "کال بیک لیں",
    badge: "مفت · کوئی پابندی نہیں",
    headline: "دلچسپی ہے؟",
    headlineAccent: "ہم آپ کو کال کریں گے۔",
    sub: "اپنے کاروبار کا نام اور فون نمبر دیں۔ ہماری ٹیم ایک کاروباری دن کے اندر آپ کو کال کرے گی۔",
    formTitle: "کال بیک کی درخواست کریں",
    points: [
      {
        title: "انسان، بوٹ نہیں",
        body: `${BRAND_NAME} ٹیم کا کوئی بندہ آپ کے دیے ہوئے نمبر پر کال کرتا ہے۔`,
      },
      {
        title: "آپ کے سوالوں کے جواب",
        body: "قیمتیں، ہارڈ ویئر، آپ کے کاروبار میں یہ کیسے چلتا ہے — کچھ بھی پوچھیں۔",
      },
      {
        title: "منتقلی میں مدد",
        body: "کسی اور POS یا رجسٹر سے آ رہے ہیں؟ ہم آپ کی مصنوعات اور گاہک مفت لوڈ کر دیتے ہیں۔",
      },
    ],
    hurry: "جلدی ہے؟",
    whatsappUs: "ہمیں واٹس ایپ کریں",
    seeIt: "اسے چلتا دیکھنا چاہتے ہیں؟",
    bookDemo: "مفت ڈیمو بک کریں",
    or: "یا",
    startFree: "مفت شروع کریں",
  },
  ar: {
    meta: {
      title: `اطلب اتصالًا مجانيًا من فريق ${BRAND_NAME}`,
      description: `مهتم بنظام ${BRAND_NAME} لنقاط البيع؟ اترك اسم نشاطك ورقم هاتفك وسيتصل بك أحد أفراد فريقنا خلال يوم عمل واحد للإجابة عن أسئلتك.`,
    },
    breadcrumb: "اطلب اتصالًا",
    badge: "مجاني · دون التزام",
    headline: "مهتم؟",
    headlineAccent: "سنتصل بك.",
    sub: "اترك اسم نشاطك ورقم هاتفك. وسيتصل بك فريقنا خلال يوم عمل واحد.",
    formTitle: "اطلب اتصالًا",
    points: [
      {
        title: "شخص حقيقي، لا روبوت",
        body: `يتصل بك أحد أفراد فريق ${BRAND_NAME} على الرقم الذي تقدّمه.`,
      },
      {
        title: "إجابات عن أسئلتك",
        body: "الأسعار، الأجهزة، وكيف يعمل مع نوع نشاطك — اسأل عن أي شيء.",
      },
      {
        title: "مساعدة في الانتقال",
        body: "تنتقل من نظام نقاط بيع آخر أو من دفتر؟ ننقل منتجاتك وعملاءك مجانًا.",
      },
    ],
    hurry: "مستعجل؟",
    whatsappUs: "راسلنا على واتساب",
    seeIt: "تريد رؤيته يعمل؟",
    bookDemo: "احجز عرضًا مجانيًا",
    or: "أو",
    startFree: "ابدأ مجانًا",
  },
};

// ── /contact ──────────────────────────────────────────────────────────

export interface ContactCopy {
  meta: Meta;
  breadcrumb: string;
  badge: string;
  headline: string;
  sub: string;
  waysLabel: string;
  whatsapp: string;
  startChat: string;
  email: string;
  writeUs: string;
  demoTitle: string;
  demoBody: string;
  demoLink: string;
  formHeading: string;
  formBody: (email: string) => string;
  operatedBy: (operator: string, city: string, country: string) => string;
}

export const CONTACT_COPY: Localized<ContactCopy> = {
  en: {
    meta: {
      title: `Contact ${BRAND_NAME}: Sales, Support${legal.whatsappUrl ? " & WhatsApp" : " & Demos"}`,
      description: `Email ${BRAND_EMAIL}${legal.whatsappUrl ? ` or WhatsApp ${legal.whatsappDisplay}` : ""}. Ask about pricing, switching from another POS or support — we reply within one working day.`,
    },
    breadcrumb: "Contact",
    badge: "Get in touch",
    headline: `Talk to the ${BRAND_NAME} team.`,
    sub: `Questions about pricing, switching from another POS, or help with your account — ${legal.whatsappUrl ? "WhatsApp or email us" : "email us"} and we'll reply within one working day.`,
    waysLabel: "Ways to reach us",
    whatsapp: "WhatsApp",
    startChat: "Start a chat",
    email: "Email",
    writeUs: "Write to us",
    demoTitle: "Book a free demo",
    demoBody: "See it with your own kind of business. We can move your data for free.",
    demoLink: "Book a demo",
    formHeading: "Or send us a message",
    formBody: (email) =>
      `Every message goes to ${email} and is answered by the team that builds ${BRAND_NAME}.`,
    operatedBy: (operator, city, country) =>
      `${BRAND_NAME} is operated by ${operator}, ${city}, ${country}.`,
  },
  ur: {
    meta: {
      title: `${BRAND_NAME} سے رابطہ: سیلز، سپورٹ اور واٹس ایپ`,
      description: `${BRAND_EMAIL} پر ای میل کریں یا ‎${legal.whatsappDisplay} پر واٹس ایپ کریں۔ قیمتیں، دوسرے POS سے منتقلی یا سپورٹ — ہم ایک کاروباری دن کے اندر جواب دیتے ہیں۔`,
    },
    breadcrumb: "رابطہ",
    badge: "رابطہ کریں",
    headline: `${BRAND_NAME} ٹیم سے بات کریں۔`,
    sub: "قیمتوں، کسی اور POS سے منتقلی یا اپنے اکاؤنٹ میں مدد کے بارے میں سوال؟ واٹس ایپ یا ای میل کریں، ہم ایک کاروباری دن کے اندر جواب دیں گے۔",
    waysLabel: "ہم سے رابطے کے طریقے",
    whatsapp: "واٹس ایپ",
    startChat: "چیٹ شروع کریں",
    email: "ای میل",
    writeUs: "ہمیں لکھیں",
    demoTitle: "مفت ڈیمو بک کریں",
    demoBody: "اسے اپنے کاروبار کے ساتھ دیکھیں۔ ہم آپ کا ڈیٹا مفت منتقل کر سکتے ہیں۔",
    demoLink: "ڈیمو بک کریں",
    formHeading: "یا ہمیں پیغام بھیجیں",
    formBody: (email) =>
      `ہر پیغام ${email} پر آتا ہے اور اس کا جواب وہی ٹیم دیتی ہے جو ${BRAND_NAME} بناتی ہے۔`,
    operatedBy: (operator, city, country) =>
      `${BRAND_NAME} کو ${operator}، ${ur(city)}، ${ur(country)} چلاتی ہے۔`,
  },
  ar: {
    meta: {
      title: `تواصل مع ${BRAND_NAME}: المبيعات والدعم وواتساب`,
      description: `راسلنا على ${BRAND_EMAIL} أو واتساب ‎${legal.whatsappDisplay}. اسأل عن الأسعار أو الانتقال من نظام آخر أو الدعم — نرد خلال يوم عمل واحد.`,
    },
    breadcrumb: "تواصل معنا",
    badge: "تواصل معنا",
    headline: `تحدّث مع فريق ${BRAND_NAME}.`,
    sub: "أسئلة عن الأسعار، أو الانتقال من نظام نقاط بيع آخر، أو مساعدة في حسابك — راسلنا على واتساب أو البريد وسنرد خلال يوم عمل واحد.",
    waysLabel: "طرق التواصل معنا",
    whatsapp: "واتساب",
    startChat: "ابدأ محادثة",
    email: "البريد الإلكتروني",
    writeUs: "اكتب لنا",
    demoTitle: "احجز عرضًا مجانيًا",
    demoBody: "شاهده مع نوع نشاطك. ويمكننا نقل بياناتك مجانًا.",
    demoLink: "احجز عرضًا توضيحيًا",
    formHeading: "أو أرسل لنا رسالة",
    formBody: (email) => `كل رسالة تصل إلى ${email} ويرد عليها الفريق الذي يبني ${BRAND_NAME}.`,
    operatedBy: (operator, city, country) =>
      `يُشغّل ${BRAND_NAME} شركة ${operator}، ${ar(city)}، ${ar(country)}.`,
  },
};

// ── /about ────────────────────────────────────────────────────────────

export interface AboutCopy {
  meta: Meta;
  breadcrumb: string;
  badge: string;
  headline: string;
  intro: (product: string, country: string, operator: string) => string;
  storyEyebrow: string;
  storyTitle: (city: string) => string;
  story1: (product: string) => string;
  /** "<product> is built and run by" [operator link] ", a software company in …" */
  story2Before: (product: string) => string;
  story2After: (city: string, country: string) => string;
  /** "Founded by <name>." under the story; only when the brand names a founder. */
  founder: (name: string, title: string) => string;
  /** Same order as the page's icons: platforms, languages, offline, Light plan, switching. */
  facts: Point[];
  ctaTitle: (product: string) => string;
  ctaBody: string;
  bookDemo: string;
  startFree: string;
}

export const ABOUT_COPY: Localized<AboutCopy> = {
  en: {
    meta: {
      title: `About ${BRAND_NAME}: POS & Back Office for Merchants`,
      description: `${BRAND_NAME} connects point of sale, inventory, customer credit and accounting for stores, restaurants and distributors. Available on web, desktop and Android.`,
    },
    breadcrumb: "About",
    badge: "About us",
    headline: "A simple, honest system for businesses that work hard.",
    intro: (product, country, operator) =>
      `${product} is a point of sale and business system for small and medium businesses — shops, restaurants, pharmacies and distributors. It is built in ${country} by ${operator}.`,
    storyEyebrow: "Our story",
    storyTitle: (city) => `Started in March 2025, in ${city}.`,
    story1: (product) =>
      `We started ${product} in March 2025 to give small and medium businesses one place to run the day: selling at the counter, keeping stock, tracking customer credit (khata), taking online orders and managing deliveries.`,
    story2Before: (product) => `${product} is built and run by `,
    founder: (name, title) =>
      `${title}: ${name}, who writes and checks our guides and comparisons.`,
    story2After: (city, country) =>
      `, a software company in ${city}, ${country}. We talk to the shop owners, restaurant managers and distributors who use it, and we keep improving it based on what they tell us.`,
    facts: [
      {
        title: "Web, Windows and Android",
        body: "Use it in the browser, on a Windows desktop or on an Android phone or tablet — your data stays in sync.",
      },
      {
        title: "English, Urdu and Arabic",
        body: "Your team can work in the language they are most comfortable with.",
      },
      {
        title: "Keeps selling offline",
        body: "If the internet drops, the point of sale keeps recording sales and syncs them when you are back online.",
      },
      {
        title: "Light plan free for 3 months",
        body: "Start on the Light plan at no cost for your first 3 months, then choose the plan that fits.",
      },
      {
        title: "Help moving from your old POS",
        body: "Already using another POS? We help you move your data across from your old system.",
      },
    ],
    ctaTitle: (product) => `See ${product} for your business`,
    ctaBody:
      "Book a demo and we’ll show you how it fits the way you work — or start on the Light plan, free for 3 months.",
    bookDemo: "Book a demo",
    startFree: "Start free — 3 months",
  },
  ur: {
    meta: {
      title: `${BRAND_NAME} کے بارے میں: تاجروں کے لیے POS اور بیک آفس`,
      description: `${BRAND_NAME} دکانوں، ریسٹورنٹس اور ڈسٹری بیوٹرز کے لیے پوائنٹ آف سیل، اسٹاک، گاہک کا اُدھار اور اکاؤنٹنگ ایک جگہ جوڑتا ہے۔ ویب، ڈیسک ٹاپ اور اینڈرائیڈ پر دستیاب۔`,
    },
    breadcrumb: "ہمارے بارے میں",
    badge: "ہمارے بارے میں",
    headline: "محنتی کاروباروں کے لیے ایک سادہ اور دیانت دار سسٹم۔",
    intro: (product, country, operator) =>
      `${product} چھوٹے اور درمیانے کاروباروں — دکانوں، ریسٹورنٹس، فارمیسیز اور ڈسٹری بیوٹرز — کے لیے پوائنٹ آف سیل اور بزنس سسٹم ہے۔ اسے ${ur(country)} میں ${operator} نے بنایا ہے۔`,
    storyEyebrow: "ہماری کہانی",
    storyTitle: (city) => `مارچ 2025 میں ${ur(city)} سے شروعات۔`,
    story1: (product) =>
      `ہم نے مارچ 2025 میں ${product} شروع کیا تاکہ چھوٹے اور درمیانے کاروباروں کو دن بھر کا کام چلانے کے لیے ایک جگہ ملے: کاؤنٹر پر فروخت، اسٹاک کا حساب، گاہکوں کا اُدھار کھاتہ، آن لائن آرڈرز اور ڈیلیوری کا انتظام۔`,
    story2Before: (product) => `${product} کو بناتی اور چلاتی ہے `,
    founder: (name) => `بانی: ${name}۔ ہماری گائیڈز اور موازنے انہی کے لکھے اور جانچے ہوئے ہیں۔`,
    story2After: (city, country) =>
      `، جو ${ur(city)}، ${ur(country)} کی ایک سافٹ ویئر کمپنی ہے۔ ہم اسے استعمال کرنے والے دکانداروں، ریسٹورنٹ مینیجرز اور ڈسٹری بیوٹرز سے بات کرتے ہیں، اور ان کی باتوں کی بنیاد پر اسے بہتر کرتے رہتے ہیں۔`,
    facts: [
      {
        title: "ویب، Windows اور اینڈرائیڈ",
        body: "براؤزر میں، Windows ڈیسک ٹاپ پر یا اینڈرائیڈ فون اور ٹیبلٹ پر استعمال کریں — آپ کا ڈیٹا ہر جگہ ایک جیسا رہتا ہے۔",
      },
      {
        title: "انگریزی، اردو اور عربی",
        body: "آپ کی ٹیم اس زبان میں کام کر سکتی ہے جس میں وہ سب سے زیادہ آرام محسوس کرے۔",
      },
      {
        title: "آف لائن بھی فروخت جاری",
        body: "انٹرنیٹ چلا جائے تو بھی POS فروخت درج کرتا رہتا ہے اور آن لائن آتے ہی سنک کر دیتا ہے۔",
      },
      {
        title: "لائٹ پلان 3 ماہ مفت",
        body: "پہلے 3 ماہ لائٹ پلان بغیر کسی خرچ کے شروع کریں، پھر اپنے لیے مناسب پلان چنیں۔",
      },
      {
        title: "پرانے POS سے منتقلی میں مدد",
        body: "پہلے سے کوئی اور POS استعمال کر رہے ہیں؟ ہم آپ کا ڈیٹا پرانے سسٹم سے منتقل کرنے میں مدد کرتے ہیں۔",
      },
    ],
    ctaTitle: (product) => `اپنے کاروبار کے لیے ${product} دیکھیں`,
    ctaBody:
      "ڈیمو بک کریں، ہم دکھائیں گے کہ یہ آپ کے کام کے طریقے میں کیسے فٹ ہوتا ہے — یا لائٹ پلان پر شروع کریں، 3 ماہ مفت۔",
    bookDemo: "ڈیمو بک کریں",
    startFree: "مفت شروع کریں — 3 ماہ",
  },
  ar: {
    meta: {
      title: `عن ${BRAND_NAME}: نقطة بيع ومكتب خلفي للتجار`,
      description: `يربط ${BRAND_NAME} نقطة البيع والمخزون وآجل العملاء والمحاسبة للمتاجر والمطاعم والموزعين في نظام واحد. متاح على الويب وسطح المكتب وأندرويد.`,
    },
    breadcrumb: "من نحن",
    badge: "من نحن",
    headline: "نظام بسيط وصادق للأعمال التي تعمل بجد.",
    intro: (product, country, operator) =>
      `${product} نظام نقاط بيع وإدارة أعمال للمنشآت الصغيرة والمتوسطة — المتاجر والمطاعم والصيدليات والموزعين. تطوّره شركة ${operator} في ${ar(country)}.`,
    storyEyebrow: "قصتنا",
    storyTitle: (city) => `بدأنا في مارس 2025، في ${ar(city)}.`,
    story1: (product) =>
      `أطلقنا ${product} في مارس 2025 لنمنح المنشآت الصغيرة والمتوسطة مكانًا واحدًا لإدارة يومها: البيع عند الكاشير، ومتابعة المخزون، وتتبّع آجل العملاء، واستقبال الطلبات أونلاين، وإدارة التوصيل.`,
    story2Before: (product) => `يطوّر ${product} ويشغّله `,
    founder: (name) => `التأسيس: ${name}. الأدلة والمقارنات من إعداد ${name}.`,
    story2After: (city, country) =>
      `، وهي شركة برمجيات في ${ar(city)}، ${ar(country)}. نتحدث مع أصحاب المتاجر ومديري المطاعم والموزعين الذين يستخدمونه، ونواصل تحسينه بناءً على ما يخبروننا به.`,
    facts: [
      {
        title: "الويب وWindows وأندرويد",
        body: "استخدمه في المتصفح، أو على حاسوب Windows، أو على هاتف أو جهاز لوحي بنظام أندرويد — وتبقى بياناتك متزامنة.",
      },
      {
        title: "الإنجليزية والأردية والعربية",
        body: "يمكن لفريقك العمل باللغة الأكثر راحة له.",
      },
      {
        title: "يواصل البيع دون إنترنت",
        body: "إذا انقطع الإنترنت، تواصل نقطة البيع تسجيل المبيعات وتزامنها عند عودة الاتصال.",
      },
      {
        title: "باقة Light مجانية لمدة 3 أشهر",
        body: "ابدأ بباقة Light دون أي تكلفة لأول 3 أشهر، ثم اختر الباقة التي تناسبك.",
      },
      {
        title: "مساعدة في الانتقال من نظامك القديم",
        body: "تستخدم نظام نقاط بيع آخر؟ نساعدك في نقل بياناتك من نظامك القديم.",
      },
    ],
    ctaTitle: (product) => `شاهد ${product} مع نشاطك`,
    ctaBody:
      "احجز عرضًا توضيحيًا وسنريك كيف يناسب طريقة عملك — أو ابدأ بباقة Light مجانًا لمدة 3 أشهر.",
    bookDemo: "احجز عرضًا توضيحيًا",
    startFree: "ابدأ مجانًا — 3 أشهر",
  },
};

// ── "Interested? We'll call you" band (home + pricing) ────────────────

export interface CallbackSectionCopy {
  eyebrow: string;
  title: string;
  body: string;
  points: string[];
  prefer: string;
  whatsapp: string;
}

export const CALLBACK_SECTION_COPY: Localized<CallbackSectionCopy> = {
  en: {
    eyebrow: "Talk to us",
    title: "Interested? We'll call you.",
    body: "Leave your business name and number. Our team calls you within one working day to answer your questions and get you set up.",
    points: [
      "A real person from our team calls you — no bots, no sales script.",
      "We answer your questions and show what fits your kind of business.",
      "Free help moving your products and customers from your old system.",
    ],
    prefer: "Prefer to message?",
    whatsapp: "WhatsApp",
  },
  ur: {
    eyebrow: "ہم سے بات کریں",
    title: "دلچسپی ہے؟ ہم آپ کو کال کریں گے۔",
    body: "اپنے کاروبار کا نام اور نمبر دیں۔ ہماری ٹیم ایک کاروباری دن کے اندر کال کر کے آپ کے سوالوں کا جواب دے گی اور سیٹ اپ میں مدد کرے گی۔",
    points: [
      "ہماری ٹیم کا اصل بندہ آپ کو کال کرتا ہے — نہ بوٹ، نہ رٹا رٹایا سیلز اسکرپٹ۔",
      "ہم آپ کے سوالوں کا جواب دیتے ہیں اور دکھاتے ہیں کہ آپ کے کاروبار کے لیے کیا مناسب ہے۔",
      "پرانے سسٹم سے مصنوعات اور گاہک منتقل کرنے میں مفت مدد۔",
    ],
    prefer: "میسج کرنا پسند ہے؟",
    whatsapp: "واٹس ایپ",
  },
  ar: {
    eyebrow: "تحدّث معنا",
    title: "مهتم؟ سنتصل بك.",
    body: "اترك اسم نشاطك ورقمك. يتصل بك فريقنا خلال يوم عمل واحد للإجابة عن أسئلتك ومساعدتك في البدء.",
    points: [
      "يتصل بك شخص حقيقي من فريقنا — لا روبوتات ولا نصوص بيع جاهزة.",
      "نجيب عن أسئلتك ونعرض ما يناسب نوع نشاطك.",
      "مساعدة مجانية في نقل منتجاتك وعملائك من نظامك القديم.",
    ],
    prefer: "تفضّل المراسلة؟",
    whatsapp: "واتساب",
  },
};
