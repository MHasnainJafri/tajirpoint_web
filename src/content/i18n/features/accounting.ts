import type { Localized } from "../page-copy";
import type { FeaturePageCopy } from "./types";

/** /features/accounting. Audiences: Retail, Distribution, Services. */
export const ACCOUNTING_COPY: Localized<FeaturePageCopy> = {
  en: {
    meta: {
      title: "Accounting Software Built Into Your POS",
      description:
        "A real double-entry ledger posted automatically from your shop. Trial balance, P&L, balance sheet, bank reconciliation and accountant-ready exports.",
    },
    breadcrumb: "Accounting",
    badge: "Accounting",
    headline: ["Accounting books that", "keep themselves."],
    sub: "A real double-entry ledger, posted automatically from everything that happens in your shop. The accounting add-on is available on the Shop plan and above.",
    mock: {
      title: "This month",
      rows: [
        { label: "Revenue", value: "$84,120" },
        { label: "Expenses", value: "$51,340" },
        { label: "Net profit", value: "+18.4%" },
      ],
    },
    problem: {
      title: "The shopkeeper sells; the accountant reconstructs",
      body: "By month-end, nobody is quite sure what really happened. Receipts are missing, and the accountant rebuilds the story from fragments.",
    },
    solution: {
      title: "Every transaction posts itself",
      points: [
        "Real double-entry ledger from every sale, purchase, expense and payroll run",
        "Chart of accounts, trial balance, P&L, balance sheet and cash flow",
        "Bank statement import and reconciliation",
        "Cash drawers, safes and petty cash with variance tracking",
        "Multi-branch roll-ups",
        "Accountant-ready exports",
      ],
      note: "The shopkeeper never touches a journal entry.",
    },
    panel: {
      title: "Your accountant gets",
      items: [
        { title: "Clean ledgers", body: "No manual journal entry" },
        { title: "Reconciled cash", body: "Drawers and safes matched" },
        { title: "One-click export", body: "Straight into their tools" },
      ],
    },
    audiences: ["Retail", "Distribution", "Services"],
    faqs: [
      {
        question: "Do I need to know accounting?",
        answer:
          "No. You run your shop; the books post themselves. Your accountant gets clean, ready ledgers.",
      },
      {
        question: "Is accounting included in the free Light plan?",
        answer:
          "No. Light covers the POS, stock and khata. The accounting add-on (general ledger, profit and loss, balance sheet) is available on the Shop plan and above.",
      },
      {
        question: "Can I connect QuickBooks?",
        answer:
          "A QuickBooks Online extension is coming soon. Until then your accountant can export the ledgers and reports from TajirPoint.",
      },
    ],
    cta: {
      headline: "Free for 3 months. No card needed.",
      body: "Run a week of real sales and watch the trial balance, P&L and cash position build themselves.",
      secondary: "Browse extensions",
    },
  },

  ur: {
    meta: {
      title: "POS کے اندر اکاؤنٹنگ سافٹ ویئر",
      description:
        "آپ کی دکان سے خود بخود بننے والا اصل ڈبل انٹری لیجر۔ ٹرائل بیلنس، نفع و نقصان، بیلنس شیٹ، بینک ری کنسیلی ایشن اور اکاؤنٹنٹ کے لیے تیار ایکسپورٹ۔",
    },
    breadcrumb: "اکاؤنٹنگ",
    badge: "اکاؤنٹنگ",
    headline: ["حساب کتاب جو", "خود اپنا خیال رکھے۔"],
    sub: "اصل ڈبل انٹری لیجر، جو آپ کی دکان میں ہونے والی ہر چیز سے خود بخود بنتا ہے۔ اکاؤنٹنگ ایڈ آن شاپ پلان اور اس سے اوپر کے پلانز میں دستیاب ہے۔",
    mock: {
      title: "اس مہینے",
      rows: [
        { label: "آمدنی", value: "$84,120" },
        { label: "اخراجات", value: "$51,340" },
        { label: "خالص منافع", value: "+18.4%" },
      ],
    },
    problem: {
      title: "دکاندار بیچتا ہے، اکاؤنٹنٹ ٹکڑے جوڑتا ہے",
      body: "مہینے کے آخر تک کسی کو پکا پتہ نہیں ہوتا کہ اصل میں کیا ہوا۔ رسیدیں غائب ہوتی ہیں، اور اکاؤنٹنٹ ٹکڑوں سے پوری کہانی دوبارہ بناتا ہے۔",
    },
    solution: {
      title: "ہر لین دین خود درج ہوتا ہے",
      points: [
        "ہر فروخت، خریداری، خرچ اور تنخواہ سے اصل ڈبل انٹری لیجر",
        "چارٹ آف اکاؤنٹس، ٹرائل بیلنس، نفع و نقصان، بیلنس شیٹ اور کیش فلو",
        "بینک اسٹیٹمنٹ درآمد اور ری کنسیلی ایشن",
        "کیش دراز، سیف اور پیٹی کیش، کمی بیشی کے حساب کے ساتھ",
        "کئی برانچوں کا اکٹھا حساب",
        "اکاؤنٹنٹ کے لیے تیار ایکسپورٹ",
      ],
      note: "دکاندار کو کبھی جرنل انٹری کو ہاتھ نہیں لگانا پڑتا۔",
    },
    panel: {
      title: "آپ کے اکاؤنٹنٹ کو ملتا ہے",
      items: [
        { title: "صاف لیجر", body: "ہاتھ سے جرنل انٹری نہیں" },
        { title: "ملا ہوا کیش", body: "دراز اور سیف کا حساب برابر" },
        { title: "ایک کلک ایکسپورٹ", body: "سیدھا ان کے ٹولز میں" },
      ],
    },
    audiences: ["ریٹیل", "ڈسٹری بیوشن", "سروسز"],
    faqs: [
      {
        question: "کیا مجھے اکاؤنٹنگ آنی چاہیے؟",
        answer:
          "نہیں۔ آپ دکان چلائیں، کھاتے خود بنتے ہیں۔ آپ کے اکاؤنٹنٹ کو صاف اور تیار لیجر ملتے ہیں۔",
      },
      {
        question: "کیا اکاؤنٹنگ مفت لائٹ پلان میں شامل ہے؟",
        answer:
          "نہیں۔ لائٹ پلان میں POS، اسٹاک اور کھاتہ شامل ہیں۔ اکاؤنٹنگ ایڈ آن (جنرل لیجر، نفع و نقصان، بیلنس شیٹ) شاپ پلان اور اس سے اوپر دستیاب ہے۔",
      },
      {
        question: "کیا میں QuickBooks جوڑ سکتا ہوں؟",
        answer:
          "QuickBooks Online ایکسٹینشن جلد آ رہی ہے۔ تب تک آپ کا اکاؤنٹنٹ TajirPoint سے لیجر اور رپورٹس ایکسپورٹ کر سکتا ہے۔",
      },
    ],
    cta: {
      headline: "3 ماہ مفت۔ کارڈ کی ضرورت نہیں۔",
      body: "ایک ہفتہ اصل فروخت کریں اور دیکھیں کہ ٹرائل بیلنس، نفع و نقصان اور کیش کی صورتحال خود کیسے بنتی ہے۔",
      secondary: "ایکسٹینشنز دیکھیں",
    },
  },

  ar: {
    meta: {
      title: "برنامج محاسبة مدمج في نقطة البيع",
      description:
        "دفتر أستاذ حقيقي بالقيد المزدوج يُرحَّل تلقائيًا من متجرك: ميزان مراجعة، أرباح وخسائر، ميزانية عمومية، تسوية بنكية وتصدير جاهز للمحاسب.",
    },
    breadcrumb: "المحاسبة",
    badge: "المحاسبة",
    headline: ["دفاتر محاسبية", "تُرتّب نفسها بنفسها."],
    sub: "دفتر أستاذ حقيقي بالقيد المزدوج، يُرحَّل تلقائيًا من كل ما يحدث في متجرك. إضافة المحاسبة متاحة في باقة Shop وما فوقها.",
    mock: {
      title: "هذا الشهر",
      rows: [
        { label: "الإيرادات", value: "$84,120" },
        { label: "المصروفات", value: "$51,340" },
        { label: "صافي الربح", value: "+18.4%" },
      ],
    },
    problem: {
      title: "التاجر يبيع، والمحاسب يعيد تركيب القصة",
      body: "مع نهاية الشهر لا أحد متأكد مما حدث فعلًا. الإيصالات مفقودة، والمحاسب يعيد بناء الصورة من أجزاء متفرقة.",
    },
    solution: {
      title: "كل معاملة تُرحِّل نفسها",
      points: [
        "دفتر أستاذ حقيقي بالقيد المزدوج من كل بيع وشراء ومصروف ورواتب",
        "دليل حسابات، ميزان مراجعة، أرباح وخسائر، ميزانية عمومية وتدفقات نقدية",
        "استيراد كشوف البنك والتسوية البنكية",
        "أدراج النقد والخزائن والعهدة النقدية مع تتبع الفروقات",
        "تجميع حسابات عدة فروع",
        "تصدير جاهز للمحاسب",
      ],
      note: "التاجر لا يلمس أي قيد يومية.",
    },
    panel: {
      title: "ما يحصل عليه محاسبك",
      items: [
        { title: "دفاتر نظيفة", body: "دون قيود يومية يدوية" },
        { title: "نقد مُطابَق", body: "الأدراج والخزائن متطابقة" },
        { title: "تصدير بنقرة", body: "مباشرة إلى أدواته" },
      ],
    },
    audiences: ["التجزئة", "التوزيع", "الخدمات"],
    faqs: [
      {
        question: "هل أحتاج إلى معرفة المحاسبة؟",
        answer: "لا. أنت تدير متجرك، والدفاتر تُرحِّل نفسها. ويحصل محاسبك على دفاتر نظيفة وجاهزة.",
      },
      {
        question: "هل المحاسبة مشمولة في باقة Light المجانية؟",
        answer:
          "لا. باقة Light تشمل نقطة البيع والمخزون ودفتر الآجل. إضافة المحاسبة (دفتر الأستاذ العام، الأرباح والخسائر، الميزانية العمومية) متاحة في باقة Shop وما فوقها.",
      },
      {
        question: "هل يمكنني ربط QuickBooks؟",
        answer:
          "إضافة QuickBooks Online قادمة قريبًا. وحتى ذلك الحين يمكن لمحاسبك تصدير الدفاتر والتقارير من TajirPoint.",
      },
    ],
    cta: {
      headline: "مجانًا لمدة 3 أشهر. دون بطاقة.",
      body: "شغّل أسبوعًا من المبيعات الحقيقية وشاهد ميزان المراجعة والأرباح والخسائر ووضع النقد تُبنى تلقائيًا.",
      secondary: "تصفّح الإضافات",
    },
  },
};
