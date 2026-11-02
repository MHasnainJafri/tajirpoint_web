import type { Localized } from "../page-copy";
import type { FeaturePageCopy } from "./types";

/** /features/khata. Audiences: Retail, Distribution, Electronics. */
export const KHATA_COPY: Localized<FeaturePageCopy> = {
  en: {
    meta: {
      title: "Khata App: Digital Credit Book for Shops",
      description:
        "A khata app that replaces the paper credit book: every sale and payment posts to a live customer ledger with credit limits, aging, reminders and statements.",
    },
    breadcrumb: "Khata app",
    badge: "Khata",
    headline: ["Your khata credit book,", "finally under control."],
    sub: "The paper notebook every merchant keeps, made real-time, tamper-proof and shareable.",
    mock: {
      title: "Meridian Traders",
      rows: [
        { label: "Balance due", value: "$314.00" },
        { label: "Sale · Jul 15", value: "+$230.00" },
        { label: "Payment · Jul 14", value: "−$140.00" },
      ],
    },
    problem: {
      title: "Everyone knows the paper credit register",
      body: "Every merchant keeps one: a running record of who owes what. It gets messy, it gets disputed, and a single lost page is lost money.",
    },
    solution: {
      title: "A living ledger for every customer",
      points: [
        "Every sale, payment and adjustment posts automatically with a running balance",
        "Tamper-proof, append-only history you and the customer can both trust",
        "Credit limits with alerts before a customer goes over",
        "Aging buckets — 30 / 60 / 90+ days — at a glance",
        "PDF statements shared over chat in a tap",
        "Automatic, scheduled payment reminders",
        "Customer Portal so credit customers log in and pay online",
      ],
    },
    panel: {
      title: "On every customer profile",
      items: [
        { title: "Running balance", body: "Always current, never re-typed" },
        { title: "Limit alerts", body: "Warns before they overspend" },
        { title: "WhatsApp statement", body: "One tap to share a PDF" },
      ],
    },
    audiences: ["Retail", "Distribution", "Electronics"],
    faqs: [
      {
        question: "Is it really tamper-proof?",
        answer:
          "Entries are append-only with a full audit trail. Corrections are recorded as new entries, never silently overwritten.",
      },
      {
        question: "Can customers pay online?",
        answer:
          "Yes — with the Customer Portal extension, credit customers log in, see their balance and pay by card.",
      },
    ],
    cta: {
      headline: "Free for 3 months. No card needed.",
      body: "Move your credit register onto a ledger both sides can trust.",
      secondary: "See pricing",
    },
  },

  ur: {
    meta: {
      title: "کھاتہ ایپ: دکانوں کے لیے ڈیجیٹل اُدھار کھاتہ",
      description:
        "کاغذی اُدھار رجسٹر کی جگہ کھاتہ ایپ: ہر فروخت اور ادائیگی گاہک کے کھاتے میں فوراً درج، اُدھار کی حد، پرانے بقایا جات، یاد دہانیاں اور اسٹیٹمنٹ۔",
    },
    breadcrumb: "کھاتہ ایپ",
    badge: "کھاتہ",
    headline: ["آپ کا اُدھار کھاتہ،", "اب پوری طرح قابو میں۔"],
    sub: "وہی کاغذی کاپی جو ہر دکاندار رکھتا ہے — اب ہر لمحہ اپ ڈیٹ، ناقابلِ تبدیل اور شیئر کرنے کے قابل۔",
    mock: {
      title: "Meridian Traders",
      rows: [
        { label: "بقایا رقم", value: "$314.00" },
        { label: "فروخت · 15 جولائی", value: "+$230.00" },
        { label: "ادائیگی · 14 جولائی", value: "−$140.00" },
      ],
    },
    problem: {
      title: "کاغذی اُدھار رجسٹر سب جانتے ہیں",
      body: "ہر دکاندار ایک رکھتا ہے: کس کے ذمے کتنا ہے، اس کا چلتا حساب۔ یہ گڑبڑ ہو جاتا ہے، اس پر جھگڑے ہوتے ہیں، اور ایک صفحہ گم ہونے کا مطلب ہے پیسہ گم۔",
    },
    solution: {
      title: "ہر گاہک کا ایک زندہ کھاتہ",
      points: [
        "ہر فروخت، ادائیگی اور ردوبدل خود بخود درج، ساتھ چلتا ہوا بیلنس",
        "ناقابلِ تبدیل ریکارڈ جس پر آپ اور گاہک دونوں بھروسہ کر سکیں",
        "اُدھار کی حد، اور گاہک کے حد سے بڑھنے سے پہلے الرٹ",
        "پرانے بقایا جات — 30 / 60 / 90+ دن — ایک نظر میں",
        "PDF اسٹیٹمنٹ ایک ٹیپ میں چیٹ پر شیئر",
        "ادائیگی کی خودکار، طے شدہ یاد دہانیاں",
        "کسٹمر پورٹل: اُدھار والے گاہک لاگ اِن کر کے آن لائن ادائیگی کریں",
      ],
    },
    panel: {
      title: "ہر گاہک کی پروفائل پر",
      items: [
        { title: "چلتا بیلنس", body: "ہمیشہ تازہ، دوبارہ لکھنے کی ضرورت نہیں" },
        { title: "حد کے الرٹ", body: "حد سے زیادہ خریداری سے پہلے خبردار" },
        { title: "واٹس ایپ اسٹیٹمنٹ", body: "ایک ٹیپ میں PDF شیئر کریں" },
      ],
    },
    audiences: ["ریٹیل", "ڈسٹری بیوشن", "الیکٹرانکس"],
    faqs: [
      {
        question: "کیا واقعی اس میں ردوبدل نہیں ہو سکتا؟",
        answer:
          "اندراجات صرف شامل کیے جاتے ہیں، ساتھ مکمل آڈٹ ریکارڈ۔ غلطی کی درستی نئے اندراج کے طور پر درج ہوتی ہے، پرانا اندراج چپکے سے کبھی نہیں بدلتا۔",
      },
      {
        question: "کیا گاہک آن لائن ادائیگی کر سکتے ہیں؟",
        answer:
          "جی ہاں — کسٹمر پورٹل ایکسٹینشن کے ساتھ اُدھار والے گاہک لاگ اِن کر کے اپنا بیلنس دیکھتے ہیں اور کارڈ سے ادائیگی کرتے ہیں۔",
      },
    ],
    cta: {
      headline: "3 ماہ مفت۔ کارڈ کی ضرورت نہیں۔",
      body: "اپنا اُدھار رجسٹر ایسے کھاتے پر لائیں جس پر دونوں طرف بھروسہ ہو۔",
      secondary: "قیمتیں دیکھیں",
    },
  },

  ar: {
    meta: {
      title: "تطبيق دفتر الآجل الرقمي للمتاجر",
      description:
        "تطبيق يستبدل دفتر الآجل الورقي: كل بيع ودفعة يُسجَّل فورًا في كشف حساب العميل، مع حدود ائتمان وأعمار ديون وتذكيرات وكشوف حساب جاهزة للمشاركة.",
    },
    breadcrumb: "دفتر الآجل",
    badge: "دفتر الآجل",
    headline: ["دفتر الآجل الخاص بك،", "تحت السيطرة أخيرًا."],
    sub: "الدفتر الورقي الذي يحتفظ به كل تاجر، أصبح محدّثًا لحظيًا، غير قابل للتلاعب، وسهل المشاركة.",
    mock: {
      title: "Meridian Traders",
      rows: [
        { label: "الرصيد المستحق", value: "$314.00" },
        { label: "بيع · 15 يوليو", value: "+$230.00" },
        { label: "دفعة · 14 يوليو", value: "−$140.00" },
      ],
    },
    problem: {
      title: "الجميع يعرف دفتر الآجل الورقي",
      body: "كل تاجر يحتفظ بواحد: سجل مستمر لمن عليه كم. يصبح فوضويًا، ويثير الخلافات، وضياع صفحة واحدة يعني ضياع مال.",
    },
    solution: {
      title: "كشف حساب حيّ لكل عميل",
      points: [
        "كل بيع ودفعة وتسوية تُسجَّل تلقائيًا مع رصيد جارٍ",
        "سجل غير قابل للتلاعب، تُضاف إليه القيود فقط، يثق به الطرفان",
        "حدود ائتمان مع تنبيه قبل أن يتجاوزها العميل",
        "أعمار الديون — 30 / 60 / 90+ يومًا — بنظرة واحدة",
        "كشوف حساب PDF تُشارك عبر المحادثة بلمسة",
        "تذكيرات دفع تلقائية ومجدولة",
        "بوابة العملاء ليدخل عملاء الآجل ويدفعوا أونلاين",
      ],
    },
    panel: {
      title: "في ملف كل عميل",
      items: [
        { title: "رصيد جارٍ", body: "محدّث دائمًا، دون إعادة كتابة" },
        { title: "تنبيهات الحد", body: "تحذير قبل تجاوز الحد" },
        { title: "كشف عبر واتساب", body: "مشاركة PDF بلمسة واحدة" },
      ],
    },
    audiences: ["التجزئة", "التوزيع", "الإلكترونيات"],
    faqs: [
      {
        question: "هل هو فعلًا غير قابل للتلاعب؟",
        answer:
          "القيود تُضاف فقط ولا تُحذف، مع سجل تدقيق كامل. التصحيحات تُسجَّل كقيود جديدة، ولا يُعدَّل أي قيد بصمت.",
      },
      {
        question: "هل يمكن للعملاء الدفع أونلاين؟",
        answer: "نعم — مع إضافة بوابة العملاء، يدخل عملاء الآجل ويرون رصيدهم ويدفعون بالبطاقة.",
      },
    ],
    cta: {
      headline: "مجانًا لمدة 3 أشهر. دون بطاقة.",
      body: "انقل دفتر الآجل إلى كشف حساب يثق به الطرفان.",
      secondary: "اطّلع على الأسعار",
    },
  },
};
