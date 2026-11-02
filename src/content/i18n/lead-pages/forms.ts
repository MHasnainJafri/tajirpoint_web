import { addonInterestMessage } from "@/lib/marketing/addon-names";
import { BRANCH_OPTIONS, PHONE_ERROR, TIME_OPTIONS } from "@/lib/marketing/demo-options";
import { pickCopy, type Localized } from "../page-copy";

/**
 * Words of the lead forms (book a demo, call me back, contact) and of the
 * shared form parts (Field, PhoneField), in English, Urdu and Arabic.
 *
 * Validation runs in server actions that answer in English (the zod schemas
 * in src/lib/marketing are shared with tests). The forms pass every message
 * through `localizeError`, which swaps a known English message for the
 * visitor's language and leaves anything unknown (say a backend message) in
 * English — so nothing is ever blank.
 */

export interface SharedFormCopy {
  optional: string;
  /** "Fields marked * are required." split around the star. */
  requiredBefore: string;
  requiredAfter: string;
  sending: string;
  chooseOne: string;
  somethingElse: string;
  whatsappNow: string;
  phone: {
    placeholder: string;
    chooseCode: string;
    /** aria-label of the picker button once a country is chosen. */
    codeFor: (country: string, dial: string) => string;
    code: string;
    nativeLabel: string;
    nativeEmpty: string;
    searchLabel: string;
    searchPlaceholder: string;
    listLabel: string;
    noMatch: (query: string) => string;
  };
}

export const SHARED_FORM_COPY: Localized<SharedFormCopy> = {
  en: {
    optional: "(optional)",
    requiredBefore: "Fields marked",
    requiredAfter: "are required.",
    sending: "Sending…",
    chooseOne: "Choose one",
    somethingElse: "Something else",
    whatsappNow: "Message us on WhatsApp now",
    phone: {
      placeholder: "Phone number",
      chooseCode: "Choose country code",
      codeFor: (country, dial) => `Country code: ${country} +${dial}. Change country`,
      code: "Code",
      nativeLabel: "Country code",
      nativeEmpty: "Country",
      searchLabel: "Search country or dial code",
      searchPlaceholder: "Search country or code",
      listLabel: "Countries",
      noMatch: (q) => `No country matches “${q}”.`,
    },
  },
  ur: {
    optional: "(اختیاری)",
    requiredBefore: "جن خانوں پر",
    requiredAfter: "کا نشان ہے وہ ضروری ہیں۔",
    sending: "بھیجا جا رہا ہے…",
    chooseOne: "ایک منتخب کریں",
    somethingElse: "کچھ اور",
    whatsappNow: "ابھی واٹس ایپ پر میسج کریں",
    phone: {
      placeholder: "فون نمبر",
      chooseCode: "ملک کا کوڈ منتخب کریں",
      codeFor: (country, dial) => `ملک کا کوڈ: ${country} ‎+${dial}۔ ملک تبدیل کریں`,
      code: "کوڈ",
      nativeLabel: "ملک کا کوڈ",
      nativeEmpty: "ملک",
      searchLabel: "ملک یا ڈائل کوڈ تلاش کریں",
      searchPlaceholder: "ملک یا کوڈ تلاش کریں",
      listLabel: "ممالک",
      noMatch: (q) => `”${q}“ سے کوئی ملک نہیں ملا۔`,
    },
  },
  ar: {
    optional: "(اختياري)",
    requiredBefore: "الحقول المعلَّمة بـ",
    requiredAfter: "مطلوبة.",
    sending: "جارٍ الإرسال…",
    chooseOne: "اختر واحدًا",
    somethingElse: "نشاط آخر",
    whatsappNow: "راسلنا على واتساب الآن",
    phone: {
      placeholder: "رقم الهاتف",
      chooseCode: "اختر رمز الدولة",
      codeFor: (country, dial) => `رمز الدولة: ${country} ‎+${dial}. تغيير الدولة`,
      code: "الرمز",
      nativeLabel: "رمز الدولة",
      nativeEmpty: "الدولة",
      searchLabel: "ابحث عن دولة أو رمز اتصال",
      searchPlaceholder: "ابحث عن دولة أو رمز",
      listLabel: "الدول",
      noMatch: (q) => `لا توجد دولة تطابق ”${q}“.`,
    },
  },
};

/** The English messages the server actions send back. Keep in step with them. */
const LEAD_FAILED_EN =
  "We could not save your request just now. Please message us on WhatsApp at +92 344 6800893 or email hello@tajirpoint.com.";

const ERRORS: Record<"ur" | "ar", Record<string, string>> = {
  ur: {
    "Please check the highlighted fields.": "براہِ کرم نشان زدہ خانے دیکھ لیں۔",
    [LEAD_FAILED_EN]:
      "ابھی آپ کی درخواست محفوظ نہیں ہو سکی۔ براہِ کرم واٹس ایپ ‎+92 344 6800893 پر میسج کریں یا hello@tajirpoint.com پر ای میل کریں۔",
    [PHONE_ERROR]: "ملک کا کوڈ منتخب کریں اور اپنا نمبر لکھیں (7 سے 15 ہندسے)۔",
    "Please enter your name.": "براہِ کرم اپنا نام لکھیں۔",
    "Please enter your business name.": "براہِ کرم اپنے کاروبار کا نام لکھیں۔",
    "Please check your email address.": "براہِ کرم اپنا ای میل ایڈریس دیکھ لیں۔",
    "Please enter a valid email address.": "براہِ کرم درست ای میل ایڈریس لکھیں۔",
    "Please check the phone number.": "براہِ کرم فون نمبر دیکھ لیں۔",
    "Please write a short message.": "براہِ کرم ایک مختصر پیغام لکھیں۔",
    "Pick how many shops you run.": "بتائیں آپ کی کتنی دکانیں ہیں۔",
    "Pick a day from the list.": "فہرست میں سے ایک دن منتخب کریں۔",
    "Pick a time of day.": "دن کا کوئی وقت منتخب کریں۔",
    "Could not send your message. Please email hello@tajirpoint.com or WhatsApp +92 344 6800893.":
      "آپ کا پیغام نہیں بھیجا جا سکا۔ براہِ کرم hello@tajirpoint.com پر ای میل کریں یا واٹس ایپ ‎+92 344 6800893 پر میسج کریں۔",
    "Could not reach the server. Please email hello@tajirpoint.com or WhatsApp +92 344 6800893.":
      "سرور سے رابطہ نہیں ہو سکا۔ براہِ کرم hello@tajirpoint.com پر ای میل کریں یا واٹس ایپ ‎+92 344 6800893 پر میسج کریں۔",
  },
  ar: {
    "Please check the highlighted fields.": "يُرجى مراجعة الحقول المحدَّدة.",
    [LEAD_FAILED_EN]:
      "تعذّر حفظ طلبك الآن. يُرجى مراسلتنا على واتساب ‎+92 344 6800893 أو عبر البريد hello@tajirpoint.com.",
    [PHONE_ERROR]: "اختر رمز الدولة وأدخل رقمك (من 7 إلى 15 رقمًا).",
    "Please enter your name.": "يُرجى إدخال اسمك.",
    "Please enter your business name.": "يُرجى إدخال اسم نشاطك التجاري.",
    "Please check your email address.": "يُرجى التحقق من بريدك الإلكتروني.",
    "Please enter a valid email address.": "يُرجى إدخال بريد إلكتروني صحيح.",
    "Please check the phone number.": "يُرجى التحقق من رقم الهاتف.",
    "Please write a short message.": "يُرجى كتابة رسالة قصيرة.",
    "Pick how many shops you run.": "اختر عدد المتاجر التي تديرها.",
    "Pick a day from the list.": "اختر يومًا من القائمة.",
    "Pick a time of day.": "اختر وقتًا من اليوم.",
    "Could not send your message. Please email hello@tajirpoint.com or WhatsApp +92 344 6800893.":
      "تعذّر إرسال رسالتك. يُرجى مراسلتنا عبر البريد hello@tajirpoint.com أو واتساب ‎+92 344 6800893.",
    "Could not reach the server. Please email hello@tajirpoint.com or WhatsApp +92 344 6800893.":
      "تعذّر الاتصال بالخادم. يُرجى مراسلتنا عبر البريد hello@tajirpoint.com أو واتساب ‎+92 344 6800893.",
  },
};

/** A server message in the visitor's language; unknown messages stay English. */
export function localizeError(message: string | undefined, locale: string): string | undefined {
  if (!message || (locale !== "ur" && locale !== "ar")) return message;
  return ERRORS[locale][message] ?? message;
}

/** Field errors object with every message localized. */
export function localizeErrors<K extends string>(
  fields: Partial<Record<K, string>> | undefined,
  locale: string
): Partial<Record<K, string>> {
  const out: Partial<Record<K, string>> = {};
  if (!fields) return out;
  for (const k of Object.keys(fields) as K[]) out[k] = localizeError(fields[k], locale);
  return out;
}

// businessTypeOptions lives in ./business-types (server-side: it needs the
// whole business catalogue, which must not reach the browser with Field).

const BRANCH_LABELS: Record<"ur" | "ar", Record<string, string>> = {
  ur: { "1": "1 دکان", "2-5": "2 سے 5 دکانیں", "6+": "6 یا زیادہ" },
  ar: { "1": "متجر واحد", "2-5": "2–5 متاجر", "6+": "6 أو أكثر" },
};

const TIME_LABELS: Record<"ur" | "ar", Record<string, string>> = {
  ur: {
    morning: "صبح (10 بجے – 1 بجے)",
    afternoon: "دوپہر (1 بجے – 5 بجے)",
    evening: "شام (5 بجے – 8 بجے)",
  },
  ar: {
    morning: "صباحًا (10 ص – 1 م)",
    afternoon: "بعد الظهر (1 م – 5 م)",
    evening: "مساءً (5 م – 8 م)",
  },
};

export function branchOptions(locale: string) {
  const map = locale === "ur" || locale === "ar" ? BRANCH_LABELS[locale] : null;
  return BRANCH_OPTIONS.map((o) => ({ value: o.value, label: map?.[o.value] ?? o.label }));
}

export function timeOptions(locale: string) {
  const map = locale === "ur" || locale === "ar" ? TIME_LABELS[locale] : null;
  return TIME_OPTIONS.map((o) => ({ value: o.value, label: map?.[o.value] ?? o.label }));
}

/** BCP 47 tag for dates: Urdu (Pakistan), Arabic with Latin digits, else en-GB. */
export function dateLocale(locale: string): string {
  if (locale === "ur") return "ur-PK";
  if (locale === "ar") return "ar-u-nu-latn";
  return "en-GB";
}

/** "Tue 4 Nov" for a YYYY-MM-DD value, in the visitor's language. */
export function dayLabel(value: string, locale: string): string {
  const [y, m, d] = value.split("-").map(Number);
  if (!y || !m || !d) return value;
  return new Intl.DateTimeFormat(dateLocale(locale), {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(new Date(y, m - 1, d));
}

/** The call-back form's pre-filled line when it is opened from an add-on page. */
export function addonInterestLine(name: string, locale: string): string {
  if (locale === "ur") return `مجھے ${name} ایڈ آن میں دلچسپی ہے۔`;
  if (locale === "ar") return `أنا مهتم بإضافة ${name}.`;
  return addonInterestMessage(name);
}

// ── Book a demo form ──────────────────────────────────────────────────

export interface DemoFormCopy {
  formLabel: string;
  name: string;
  whatsapp: string;
  phoneHint: string;
  email: string;
  businessName: string;
  businessType: string;
  city: string;
  branches: string;
  currentPos: string;
  currentPosPlaceholder: string;
  migrateTitle: string;
  migrateBody: string;
  day: string;
  anyDay: string;
  time: string;
  timeHint: (timeZone: string) => string;
  timeHintNoZone: string;
  anyTime: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  privacy: string;
  successTitle: string;
  successBody: string;
  successMigration: string;
}

export const DEMO_FORM_COPY: Localized<DemoFormCopy> = {
  en: {
    formLabel: "Book a demo",
    name: "Your name",
    whatsapp: "WhatsApp number",
    phoneHint: "Pick your country, then type your number.",
    email: "Email",
    businessName: "Business name",
    businessType: "Type of business",
    city: "City",
    branches: "How many shops or branches?",
    currentPos: "Are you using a POS or software now? Which one?",
    currentPosPlaceholder: "e.g. Excel, a register, another POS",
    migrateTitle: "Move my data for me",
    migrateBody:
      "We load your products, customers, suppliers and credit balances from your old system — free.",
    day: "Preferred day",
    anyDay: "Any day",
    time: "Preferred time (your local time)",
    timeHint: (tz) => `Time zone: ${tz}. We will confirm availability with you.`,
    timeHintNoZone: "Tell us your time zone in the message below.",
    anyTime: "Any time",
    message: "Anything we should know?",
    messagePlaceholder: "What you sell, what is hard today, what you want to see",
    submit: "Book my free demo",
    privacy: "We only use your number to arrange the demo.",
    successTitle: "Thanks — we'll WhatsApp you within one working day.",
    successBody:
      "We'll confirm a time that suits you and set up the demo with your kind of business.",
    successMigration:
      " Keep an export from your old POS handy (Excel or CSV is fine) — we'll ask for it.",
  },
  ur: {
    formLabel: "ڈیمو بک کریں",
    name: "آپ کا نام",
    whatsapp: "واٹس ایپ نمبر",
    phoneHint: "پہلے اپنا ملک منتخب کریں، پھر نمبر لکھیں۔",
    email: "ای میل",
    businessName: "کاروبار کا نام",
    businessType: "کاروبار کی قسم",
    city: "شہر",
    branches: "کتنی دکانیں یا برانچیں ہیں؟",
    currentPos: "کیا ابھی کوئی POS یا سافٹ ویئر استعمال کر رہے ہیں؟ کون سا؟",
    currentPosPlaceholder: "مثلاً ایکسل، رجسٹر، کوئی اور POS",
    migrateTitle: "میرا ڈیٹا آپ منتقل کر دیں",
    migrateBody:
      "ہم آپ کے پرانے سسٹم سے مصنوعات، گاہک، سپلائرز اور اُدھار بیلنس لوڈ کر دیتے ہیں — مفت۔",
    day: "پسندیدہ دن",
    anyDay: "کوئی بھی دن",
    time: "پسندیدہ وقت (آپ کا مقامی وقت)",
    timeHint: (tz) => `ٹائم زون: ${tz}۔ ہم وقت کی تصدیق آپ سے کر لیں گے۔`,
    timeHintNoZone: "نیچے پیغام میں اپنا ٹائم زون بتا دیں۔",
    anyTime: "کوئی بھی وقت",
    message: "کوئی اور بات جو ہمیں معلوم ہونی چاہیے؟",
    messagePlaceholder: "آپ کیا بیچتے ہیں، آج کیا مشکل ہے، کیا دیکھنا چاہتے ہیں",
    submit: "میرا مفت ڈیمو بک کریں",
    privacy: "ہم آپ کا نمبر صرف ڈیمو طے کرنے کے لیے استعمال کرتے ہیں۔",
    successTitle: "شکریہ — ہم ایک کاروباری دن کے اندر آپ کو واٹس ایپ کریں گے۔",
    successBody: "ہم آپ کی سہولت کا وقت طے کریں گے اور آپ کے کاروبار کے مطابق ڈیمو تیار کریں گے۔",
    successMigration:
      " اپنے پرانے POS کی ایکسپورٹ فائل تیار رکھیں (ایکسل یا CSV ٹھیک ہے) — ہم آپ سے مانگیں گے۔",
  },
  ar: {
    formLabel: "احجز عرضًا توضيحيًا",
    name: "اسمك",
    whatsapp: "رقم واتساب",
    phoneHint: "اختر دولتك، ثم اكتب رقمك.",
    email: "البريد الإلكتروني",
    businessName: "اسم النشاط التجاري",
    businessType: "نوع النشاط",
    city: "المدينة",
    branches: "كم عدد المتاجر أو الفروع؟",
    currentPos: "هل تستخدم نظام نقاط بيع أو برنامجًا الآن؟ ما هو؟",
    currentPosPlaceholder: "مثل Excel أو دفتر أو نظام نقاط بيع آخر",
    migrateTitle: "انقلوا بياناتي عنّي",
    migrateBody: "ننقل منتجاتك وعملاءك ومورديك وأرصدة الآجل من نظامك القديم — مجانًا.",
    day: "اليوم المفضّل",
    anyDay: "أي يوم",
    time: "الوقت المفضّل (بتوقيتك المحلي)",
    timeHint: (tz) => `المنطقة الزمنية: ${tz}. سنؤكد الموعد معك.`,
    timeHintNoZone: "أخبرنا بمنطقتك الزمنية في الرسالة أدناه.",
    anyTime: "أي وقت",
    message: "هل هناك ما يجب أن نعرفه؟",
    messagePlaceholder: "ماذا تبيع، وما الصعب اليوم، وما الذي تريد رؤيته",
    submit: "احجز عرضي المجاني",
    privacy: "نستخدم رقمك فقط لترتيب العرض التوضيحي.",
    successTitle: "شكرًا — سنراسلك على واتساب خلال يوم عمل واحد.",
    successBody: "سنؤكد وقتًا يناسبك ونجهّز العرض التوضيحي بما يناسب نشاطك.",
    successMigration: " جهّز ملف تصدير من نظامك القديم (Excel أو CSV يكفي) — سنطلبه منك.",
  },
};

// ── Call me back form ─────────────────────────────────────────────────

export interface CallbackFormCopy {
  formLabel: string;
  businessName: string;
  name: string;
  phone: string;
  email: string;
  businessType: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  privacy: string;
  successTitle: string;
  successBody: string;
}

export const CALLBACK_FORM_COPY: Localized<CallbackFormCopy> = {
  en: {
    formLabel: "Ask for a call back",
    businessName: "Business name",
    name: "Your name",
    phone: "Phone number",
    email: "Email",
    businessType: "Type of business",
    message: "What would you like to know?",
    messagePlaceholder: "Prices, switching from your old system, hardware…",
    submit: "Call me back",
    privacy: "We only use your number to call you about TajirPoint.",
    successTitle: "Thanks — our team will call you within one working day.",
    successBody: "Keep your phone close. If you would rather not wait, message us on WhatsApp now.",
  },
  ur: {
    formLabel: "کال بیک کی درخواست",
    businessName: "کاروبار کا نام",
    name: "آپ کا نام",
    phone: "فون نمبر",
    email: "ای میل",
    businessType: "کاروبار کی قسم",
    message: "آپ کیا جاننا چاہتے ہیں؟",
    messagePlaceholder: "قیمتیں، پرانے سسٹم سے منتقلی، ہارڈ ویئر…",
    submit: "مجھے کال کریں",
    privacy: "ہم آپ کا نمبر صرف TajirPoint کے بارے میں کال کرنے کے لیے استعمال کرتے ہیں۔",
    successTitle: "شکریہ — ہماری ٹیم ایک کاروباری دن کے اندر آپ کو کال کرے گی۔",
    successBody: "فون پاس رکھیں۔ انتظار نہیں کرنا چاہتے تو ابھی واٹس ایپ پر میسج کریں۔",
  },
  ar: {
    formLabel: "اطلب اتصالًا",
    businessName: "اسم النشاط التجاري",
    name: "اسمك",
    phone: "رقم الهاتف",
    email: "البريد الإلكتروني",
    businessType: "نوع النشاط",
    message: "ماذا تودّ أن تعرف؟",
    messagePlaceholder: "الأسعار، الانتقال من نظامك القديم، الأجهزة…",
    submit: "اتصلوا بي",
    privacy: "نستخدم رقمك فقط للاتصال بك بخصوص TajirPoint.",
    successTitle: "شكرًا — سيتصل بك فريقنا خلال يوم عمل واحد.",
    successBody: "أبقِ هاتفك قريبًا. وإن لم ترغب في الانتظار، راسلنا على واتساب الآن.",
  },
};

// ── Contact form ──────────────────────────────────────────────────────

export interface ContactFormCopy {
  formLabel: string;
  name: string;
  email: string;
  phone: string;
  businessType: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  walkthrough: string;
  bookDemo: string;
  successTitle: string;
  successBody: string;
  successLink: string;
}

export const CONTACT_FORM_COPY: Localized<ContactFormCopy> = {
  en: {
    formLabel: "Contact form",
    name: "Name",
    email: "Email",
    phone: "Phone / WhatsApp",
    businessType: "Type of business",
    message: "Message",
    messagePlaceholder: "How can we help?",
    submit: "Send message",
    walkthrough: "Want a walkthrough instead?",
    bookDemo: "Book a demo",
    successTitle: "Message sent — thank you.",
    successBody: "We'll reply within one working day. Want to see the product sooner?",
    successLink: "Book a free demo",
  },
  ur: {
    formLabel: "رابطہ فارم",
    name: "نام",
    email: "ای میل",
    phone: "فون / واٹس ایپ",
    businessType: "کاروبار کی قسم",
    message: "پیغام",
    messagePlaceholder: "ہم آپ کی کیا مدد کر سکتے ہیں؟",
    submit: "پیغام بھیجیں",
    walkthrough: "اس کے بجائے پورا سسٹم دیکھنا چاہتے ہیں؟",
    bookDemo: "ڈیمو بک کریں",
    successTitle: "پیغام بھیج دیا گیا — شکریہ۔",
    successBody: "ہم ایک کاروباری دن کے اندر جواب دیں گے۔ سسٹم جلدی دیکھنا چاہتے ہیں؟",
    successLink: "مفت ڈیمو بک کریں",
  },
  ar: {
    formLabel: "نموذج التواصل",
    name: "الاسم",
    email: "البريد الإلكتروني",
    phone: "الهاتف / واتساب",
    businessType: "نوع النشاط",
    message: "الرسالة",
    messagePlaceholder: "كيف يمكننا مساعدتك؟",
    submit: "أرسل الرسالة",
    walkthrough: "تفضّل جولة في النظام بدلًا من ذلك؟",
    bookDemo: "احجز عرضًا توضيحيًا",
    successTitle: "تم إرسال رسالتك — شكرًا لك.",
    successBody: "سنرد خلال يوم عمل واحد. هل تريد رؤية النظام أسرع؟",
    successLink: "احجز عرضًا مجانيًا",
  },
};
