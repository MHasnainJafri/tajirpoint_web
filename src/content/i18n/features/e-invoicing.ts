import type { Localized } from "../page-copy";
import type { FeaturePageCopy } from "./types";

/**
 * /features/e-invoicing. Audiences: Retail, Distribution, Pharmacies.
 * Keep the scope note in every language: regulatory connectors (FBR and
 * others) are not released, and we claim no EU / UAE VAT / ZATCA certification.
 */
export const E_INVOICING_COPY: Localized<FeaturePageCopy> = {
  en: {
    meta: {
      title: "E-Invoicing & Tax Handling for Your POS",
      description:
        "Tax-inclusive pricing, VAT/GST capture, withholding and audit-ready records at checkout. Regulatory e-invoicing connectors such as FBR are not yet released.",
    },
    breadcrumb: "E-invoicing",
    badge: "E-Invoicing",
    headline: ["Tax handling,", "built into checkout."],
    sub: "Record tax as part of the sale, keep clear receipts and review your transaction history. Regulatory e-invoicing integrations are coming soon.",
    mock: {
      title: "Invoice · #10241",
      rows: [
        { label: "Status", value: "Sample invoice" },
        { label: "VAT", value: "$39.80" },
        { label: "Tax lines", value: "Itemised" },
      ],
    },
    problem: {
      title: "Tax rules differ by country and change often",
      body: "Bolting compliance on after the fact is painful and risky. Rules shift, formats change, and a rejected invoice is a real problem.",
    },
    solution: {
      title: "Clear tax records from the first sale",
      points: [
        "Regulatory e-invoicing connectors — coming soon",
        "Itemised receipts and transaction history",
        "VAT / GST capture and reporting",
        "Withholding tax with certificates",
        "Region-aware tax structures",
        "Audit-ready records for every transaction",
      ],
      note: "Country-specific reporting must be confirmed before launch. We do not claim EU, UAE VAT or Saudi ZATCA certification. Regulatory connectors are not yet released.",
    },
    panel: {
      title: "Built into the sale",
      items: [
        { title: "Every sale", body: "Tax recorded at checkout" },
        { title: "Clear records", body: "Receipts and audit history" },
        { title: "Tax handled", body: "VAT/GST and withholding" },
      ],
    },
    audiences: ["Retail", "Distribution", "Pharmacies"],
    faqs: [
      {
        question: "Which regions are supported?",
        answer:
          "Tax rules depend on your country and business. Our regulatory e-invoicing integrations, including FBR, are not yet released. Contact us before relying on a country-specific reporting workflow.",
      },
      {
        question: "Are receipts verifiable?",
        answer:
          "Receipts and sales records are available in the POS. Regulatory verification depends on a supported, released tax-authority integration; we do not currently promise certified receipts in every market.",
      },
    ],
    cta: {
      headline: "Free for 3 months. No card needed.",
      secondary: "See pricing",
    },
  },

  ur: {
    meta: {
      title: "POS کے لیے ای انوائسنگ اور ٹیکس",
      description:
        "چیک آؤٹ پر ٹیکس سمیت قیمت، VAT/GST، ود ہولڈنگ ٹیکس اور آڈٹ کے لیے تیار ریکارڈ۔ FBR جیسے سرکاری ای انوائسنگ کنیکٹرز ابھی جاری نہیں ہوئے۔",
    },
    breadcrumb: "ای انوائسنگ",
    badge: "ای انوائسنگ",
    headline: ["ٹیکس کا حساب،", "چیک آؤٹ کے اندر۔"],
    sub: "فروخت کے ساتھ ہی ٹیکس درج کریں، صاف رسیدیں رکھیں اور اپنے لین دین کی تاریخ دیکھیں۔ سرکاری ای انوائسنگ انٹیگریشنز جلد آ رہی ہیں۔",
    mock: {
      title: "انوائس · #10241",
      rows: [
        { label: "حیثیت", value: "نمونہ انوائس" },
        { label: "VAT", value: "$39.80" },
        { label: "ٹیکس لائنیں", value: "الگ الگ درج" },
      ],
    },
    problem: {
      title: "ٹیکس کے قوانین ہر ملک میں الگ ہیں اور اکثر بدلتے ہیں",
      body: "بعد میں قوانین کی پابندی جوڑنا تکلیف دہ اور خطرناک ہے۔ قوانین بدلتے ہیں، فارمیٹ بدلتے ہیں، اور مسترد انوائس ایک حقیقی مسئلہ ہے۔",
    },
    solution: {
      title: "پہلی فروخت سے صاف ٹیکس ریکارڈ",
      points: [
        "سرکاری ای انوائسنگ کنیکٹرز — جلد آ رہے ہیں",
        "آئٹم وار رسیدیں اور لین دین کی تاریخ",
        "VAT / GST کا اندراج اور رپورٹنگ",
        "ود ہولڈنگ ٹیکس، سرٹیفکیٹس کے ساتھ",
        "علاقے کے مطابق ٹیکس کا ڈھانچہ",
        "ہر لین دین کا آڈٹ کے لیے تیار ریکارڈ",
      ],
      note: "ملک کے لحاظ سے رپورٹنگ کی تصدیق شروع کرنے سے پہلے ضروری ہے۔ ہم EU، UAE VAT یا سعودی ZATCA سرٹیفیکیشن کا دعویٰ نہیں کرتے۔ سرکاری کنیکٹرز ابھی جاری نہیں ہوئے۔",
    },
    panel: {
      title: "فروخت کے اندر شامل",
      items: [
        { title: "ہر فروخت", body: "چیک آؤٹ پر ٹیکس درج" },
        { title: "صاف ریکارڈ", body: "رسیدیں اور آڈٹ ہسٹری" },
        { title: "ٹیکس کا حساب", body: "VAT/GST اور ود ہولڈنگ" },
      ],
    },
    audiences: ["ریٹیل", "ڈسٹری بیوشن", "فارمیسیز"],
    faqs: [
      {
        question: "کون سے علاقے سپورٹڈ ہیں؟",
        answer:
          "ٹیکس کے قوانین آپ کے ملک اور کاروبار پر منحصر ہیں۔ ہماری سرکاری ای انوائسنگ انٹیگریشنز، بشمول FBR، ابھی جاری نہیں ہوئیں۔ کسی ملک کی مخصوص رپورٹنگ پر انحصار سے پہلے ہم سے رابطہ کریں۔",
      },
      {
        question: "کیا رسیدوں کی تصدیق ہو سکتی ہے؟",
        answer:
          "رسیدیں اور فروخت کا ریکارڈ POS میں موجود ہے۔ سرکاری تصدیق کسی سپورٹڈ اور جاری شدہ ٹیکس اتھارٹی انٹیگریشن پر منحصر ہے؛ ہم فی الحال ہر مارکیٹ میں تصدیق شدہ رسیدوں کا وعدہ نہیں کرتے۔",
      },
    ],
    cta: {
      headline: "3 ماہ مفت۔ کارڈ کی ضرورت نہیں۔",
      secondary: "قیمتیں دیکھیں",
    },
  },

  ar: {
    meta: {
      title: "الفوترة الإلكترونية والضريبة في نقطة البيع",
      description:
        "أسعار شاملة الضريبة، تسجيل ضريبة القيمة المضافة، ضريبة الاستقطاع وسجلات جاهزة للتدقيق عند الدفع. موصلات الفوترة الرسمية مثل FBR لم تُطلق بعد.",
    },
    breadcrumb: "الفوترة الإلكترونية",
    badge: "الفوترة الإلكترونية",
    headline: ["الضريبة محسوبة", "داخل عملية الدفع."],
    sub: "سجّل الضريبة كجزء من البيع، واحتفظ بإيصالات واضحة، وراجع سجل معاملاتك. تكاملات الفوترة الإلكترونية الرسمية قادمة قريبًا.",
    mock: {
      title: "فاتورة · #10241",
      rows: [
        { label: "الحالة", value: "فاتورة نموذجية" },
        { label: "ض.ق.م", value: "$39.80" },
        { label: "بنود الضريبة", value: "مفصّلة" },
      ],
    },
    problem: {
      title: "قواعد الضريبة تختلف من بلد لآخر وتتغير كثيرًا",
      body: "إضافة الامتثال لاحقًا أمر مرهق ومحفوف بالمخاطر. القواعد تتبدل، والصيغ تتغير، والفاتورة المرفوضة مشكلة حقيقية.",
    },
    solution: {
      title: "سجلات ضريبية واضحة من أول بيع",
      points: [
        "موصلات الفوترة الإلكترونية الرسمية — قريبًا",
        "إيصالات مفصّلة وسجل للمعاملات",
        "تسجيل ضريبة القيمة المضافة / ضريبة المبيعات وتقاريرها",
        "ضريبة الاستقطاع مع الشهادات",
        "هياكل ضريبية حسب المنطقة",
        "سجلات جاهزة للتدقيق لكل معاملة",
      ],
      note: "يجب تأكيد التقارير الخاصة بكل بلد قبل البدء. لا ندّعي الحصول على شهادة الاتحاد الأوروبي أو ضريبة القيمة المضافة الإماراتية أو هيئة الزكاة والضريبة والجمارك السعودية (ZATCA). الموصلات الرسمية لم تُطلق بعد.",
    },
    panel: {
      title: "مدمجة في البيع",
      items: [
        { title: "كل عملية بيع", body: "الضريبة تُسجَّل عند الدفع" },
        { title: "سجلات واضحة", body: "إيصالات وسجل تدقيق" },
        { title: "الضريبة محسوبة", body: "القيمة المضافة والاستقطاع" },
      ],
    },
    audiences: ["التجزئة", "التوزيع", "الصيدليات"],
    faqs: [
      {
        question: "ما المناطق المدعومة؟",
        answer:
          "قواعد الضريبة تعتمد على بلدك ونشاطك. تكاملات الفوترة الإلكترونية الرسمية لدينا، ومنها FBR، لم تُطلق بعد. تواصل معنا قبل الاعتماد على أي إجراء تقارير خاص ببلد معيّن.",
      },
      {
        question: "هل يمكن التحقق من الإيصالات؟",
        answer:
          "الإيصالات وسجلات المبيعات متاحة في نقطة البيع. التحقق الرسمي يعتمد على تكامل مدعوم ومُطلق مع الجهة الضريبية؛ ولا نعد حاليًا بإيصالات معتمدة في كل سوق.",
      },
    ],
    cta: {
      headline: "مجانًا لمدة 3 أشهر. دون بطاقة.",
      secondary: "اطّلع على الأسعار",
    },
  },
};
