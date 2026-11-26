import type { Localized } from "../page-copy";
import type { FeaturePageCopy } from "./types";

/**
 * /features/billing. Audiences: Restaurants, Retail, Grocery.
 *
 * Every point is a shipped feature (checked 18 Nov 2026): backend
 * domains/sales (Sale, ParkedSale = hold a bill, Quotation, SaleReturn with
 * ReturnReason, Register/Session/CashHandover = shifts and the till),
 * domains/payments (PaymentAllocation = several tenders on one bill, Refund,
 * CardTerminal), catalog TaxRate/TaxGroup, PriceList, VariantBarcode;
 * restaurants TicketCheck/TableBillPayment (table bills, split); web
 * src/lib/print (58 mm and 80 mm thermal, A4 invoices; USB, network and
 * Bluetooth printers; print_language for receipts). Offline: the shop
 * counter sells offline; restaurant tables and the kitchen screen offline are
 * not released (src/content/compare/tajirpoint.ts). FBR link: coming soon.
 */
export const BILLING_COPY: Localized<FeaturePageCopy> = {
  en: {
    meta: {
      title: "Billing Software for Shops and Restaurants",
      description:
        "Billing software for shops and restaurants: barcode checkout, thermal receipts and A4 invoices, tax on every bill, split payments, returns and offline billing.",
    },
    breadcrumb: "Billing",
    badge: "Billing",
    headline: ["Bill faster at the counter,", "with every rupee and cent in place."],
    sub: "Scan, charge and print in seconds, with tax, discounts and payments worked out for you.",
    mock: {
      title: "Bill #1042",
      rows: [
        { label: "Subtotal · 6 items", value: "$42.00" },
        { label: "Tax", value: "+$6.72" },
        { label: "Paid · cash + card", value: "$48.72" },
      ],
    },
    problem: {
      title: "Slow bills cost you customers",
      body: "A queue at the counter, totals added on a calculator, a handwritten bill with the wrong tax, a refund nobody can trace. Every mistake at the till is money or a customer lost.",
    },
    solution: {
      title: "Billing that does the sums for you",
      points: [
        "Barcode scanning, quick search and favourite items for fast checkout",
        "Thermal receipts on 58 mm or 80 mm printers, and A4 invoices for business customers",
        "USB, network and Bluetooth receipt printers",
        "Tax worked out on every bill, from tax rates and tax groups you set once",
        "Discounts, deals and price lists, such as retail and wholesale prices",
        "Split one bill across cash, card and other payment methods",
        "Hold a bill and come back to it, and quotations that turn into sales",
        "Returns and refunds with a reason, with the stock put back on its own",
        "Credit sales posted straight to the customer's account (khata)",
        "Restaurants: table bills, split bills and kitchen tickets as you order",
        "Shifts and the cash drawer: open, count and close the till, with a handover between cashiers",
        "Receipts in English, Urdu or Arabic",
      ],
      note: "The shop counter keeps billing with no internet and syncs later. Restaurant tables and the kitchen display are on the Business plan.",
    },
    panel: {
      title: "On every bill",
      items: [
        { title: "Receipt or invoice", body: "58 mm, 80 mm or a full A4 invoice" },
        { title: "Tax done", body: "Rates and groups applied for you" },
        { title: "Split payment", body: "Cash, card and more on one bill" },
      ],
    },
    audiences: ["Restaurants", "Retail & fashion", "Grocery & kiryana"],
    faqs: [
      {
        question: "Does billing work without internet?",
        answer:
          "Yes at the shop counter: it keeps billing offline and syncs the sales when the connection is back, with no duplicates. Offline for restaurant tables and the kitchen screen is not released yet.",
      },
      {
        question: "Which printers can I use?",
        answer:
          "Most 58 mm and 80 mm thermal receipt printers over USB, network or Bluetooth, and any normal printer for A4 invoices.",
      },
      {
        question: "Can I give business customers a proper tax invoice?",
        answer:
          "Yes. Print or save an A4 invoice with your business details, the customer's details and the tax.",
      },
      {
        question: "Is it FBR integrated?",
        answer:
          "Not yet. Our FBR integration for Pakistan is coming soon. Tax on every bill and tax reports work today.",
      },
      {
        question: "Can I move my products from my old billing software?",
        answer:
          "Yes. Send us an Excel or CSV export and our team loads your products, customers and opening stock for you, free of charge.",
      },
    ],
    cta: {
      headline: "Get started today.",
      body: "Start billing today on the computer, tablet or phone you already have.",
      secondary: "See pricing",
    },
  },

  ur: {
    meta: {
      title: "بلنگ سافٹ ویئر: دکانوں اور ریسٹورنٹس کے لیے",
      description:
        "دکانوں اور ریسٹورنٹس کے لیے بلنگ سافٹ ویئر: بارکوڈ سے تیز بل، تھرمل رسید اور A4 انوائس، ہر بل پر ٹیکس، تقسیم شدہ ادائیگی، واپسی اور آف لائن بلنگ۔",
    },
    breadcrumb: "بلنگ",
    badge: "بلنگ",
    headline: ["کاؤنٹر پر تیز بل بنائیں،", "ہر روپیہ اپنی جگہ پر۔"],
    sub: "سیکنڈوں میں اسکین، وصولی اور پرنٹ، ٹیکس، رعایت اور ادائیگی کا حساب خود بخود۔",
    mock: {
      title: "بل #1042",
      rows: [
        { label: "ذیلی کل · 6 اشیاء", value: "$42.00" },
        { label: "ٹیکس", value: "+$6.72" },
        { label: "ادا شدہ · کیش + کارڈ", value: "$48.72" },
      ],
    },
    problem: {
      title: "سست بلنگ گاہک کھو دیتی ہے",
      body: "کاؤنٹر پر لمبی قطار، کیلکولیٹر پر جوڑا گیا ٹوٹل، غلط ٹیکس والا ہاتھ کا لکھا بل، ایسی واپسی جس کا کوئی ریکارڈ نہیں۔ کاؤنٹر کی ہر غلطی پیسے یا گاہک کا نقصان ہے۔",
    },
    solution: {
      title: "ایسی بلنگ جو حساب خود کرے",
      points: [
        "بارکوڈ اسکین، فوری تلاش اور پسندیدہ اشیاء سے تیز چیک آؤٹ",
        "58 یا 80 ملی میٹر تھرمل پرنٹر پر رسید، اور کاروباری گاہکوں کے لیے A4 انوائس",
        "USB، نیٹ ورک اور بلوٹوتھ رسید پرنٹر",
        "ہر بل پر ٹیکس کا حساب، ایک بار طے کیے گئے ٹیکس ریٹ اور گروپس سے",
        "رعایت، ڈیلز اور پرائس لسٹ، جیسے ریٹیل اور ہول سیل قیمت",
        "ایک بل کی ادائیگی کیش، کارڈ اور دوسرے طریقوں میں تقسیم",
        "بل ہولڈ کریں اور بعد میں مکمل کریں، اور کوٹیشن جو فروخت بن جائے",
        "وجہ کے ساتھ واپسی اور رقم کی واپسی، اسٹاک خود واپس",
        "اُدھار فروخت سیدھی گاہک کے کھاتے میں",
        "ریسٹورنٹ: ٹیبل بل، تقسیم شدہ بل اور آرڈر کے ساتھ کچن ٹکٹ",
        "شفٹ اور کیش دراز: کاؤنٹر کھولیں، گنیں اور بند کریں، کیشیئرز کے درمیان حوالگی کے ساتھ",
        "انگریزی، اردو یا عربی میں رسید",
      ],
      note: "دکان کا کاؤنٹر انٹرنیٹ کے بغیر بھی بل بناتا ہے اور بعد میں سنک کرتا ہے۔ ریسٹورنٹ ٹیبل اور کچن ڈسپلے Business پلان میں ہیں۔",
    },
    panel: {
      title: "ہر بل پر",
      items: [
        { title: "رسید یا انوائس", body: "58 ملی میٹر، 80 ملی میٹر یا مکمل A4" },
        { title: "ٹیکس تیار", body: "ریٹ اور گروپس خود لاگو" },
        { title: "تقسیم شدہ ادائیگی", body: "ایک بل پر کیش، کارڈ اور مزید" },
      ],
    },
    audiences: ["ریسٹورنٹ", "ریٹیل اور فیشن", "کریانہ اسٹور"],
    faqs: [
      {
        question: "کیا بلنگ انٹرنیٹ کے بغیر چلتی ہے؟",
        answer:
          "دکان کے کاؤنٹر پر جی ہاں: آف لائن بل بنتے رہتے ہیں اور کنکشن آنے پر فروخت سنک ہو جاتی ہے، کوئی ڈپلیکیٹ نہیں۔ ریسٹورنٹ ٹیبل اور کچن اسکرین کے لیے آف لائن ابھی جاری نہیں ہوا۔",
      },
      {
        question: "کون سے پرنٹر استعمال ہو سکتے ہیں؟",
        answer:
          "زیادہ تر 58 اور 80 ملی میٹر تھرمل رسید پرنٹر USB، نیٹ ورک یا بلوٹوتھ سے، اور A4 انوائس کے لیے کوئی بھی عام پرنٹر۔",
      },
      {
        question: "کیا کاروباری گاہکوں کو ٹیکس انوائس دے سکتے ہیں؟",
        answer:
          "جی ہاں۔ اپنے کاروبار اور گاہک کی تفصیل اور ٹیکس کے ساتھ A4 انوائس پرنٹ یا محفوظ کریں۔",
      },
      {
        question: "کیا یہ FBR سے منسلک ہے؟",
        answer:
          "ابھی نہیں۔ پاکستان کے لیے ہماری FBR انٹیگریشن جلد آ رہی ہے۔ ہر بل پر ٹیکس اور ٹیکس رپورٹس آج سے کام کرتی ہیں۔",
      },
      {
        question: "کیا پرانے بلنگ سافٹ ویئر سے پروڈکٹس منتقل ہو سکتی ہیں؟",
        answer:
          "جی ہاں۔ Excel یا CSV فائل بھیجیں، ہماری ٹیم آپ کی پروڈکٹس، گاہک اور ابتدائی اسٹاک مفت میں ڈال دے گی۔",
      },
    ],
    cta: {
      headline: "آج ہی شروع کریں۔",
      body: "آج ہی اپنے موجودہ کمپیوٹر، ٹیبلٹ یا فون پر بلنگ شروع کریں۔",
      secondary: "قیمتیں دیکھیں",
    },
  },

  ar: {
    meta: {
      title: "برنامج فواتير للمتاجر والمطاعم",
      description:
        "برنامج فواتير للمتاجر والمطاعم: بيع سريع بالباركود، إيصالات حرارية وفواتير A4، ضريبة على كل فاتورة، دفع مقسّم، مرتجعات وفوترة دون اتصال.",
    },
    breadcrumb: "الفواتير",
    badge: "الفواتير",
    headline: ["فوترة أسرع عند الكاشير،", "وكل قرش في مكانه."],
    sub: "امسح واستلم واطبع في ثوانٍ، مع حساب الضريبة والخصومات والدفعات تلقائيًا.",
    mock: {
      title: "فاتورة #1042",
      rows: [
        { label: "المجموع الفرعي · 6 أصناف", value: "$42.00" },
        { label: "الضريبة", value: "+$6.72" },
        { label: "مدفوع · نقدًا + بطاقة", value: "$48.72" },
      ],
    },
    problem: {
      title: "الفوترة البطيئة تُفقدك العملاء",
      body: "طابور عند الكاشير، مجموع يُحسب على الآلة الحاسبة، فاتورة مكتوبة بخط اليد بضريبة خاطئة، ومرتجع لا يمكن تتبعه. كل خطأ عند الكاشير مال أو عميل ضائع.",
    },
    solution: {
      title: "فوترة تُجري الحسابات عنك",
      points: [
        "مسح الباركود والبحث السريع والأصناف المفضلة لبيع سريع",
        "إيصالات حرارية على طابعات 58 أو 80 ملم، وفواتير A4 لعملاء الشركات",
        "طابعات إيصالات عبر USB أو الشبكة أو البلوتوث",
        "حساب الضريبة على كل فاتورة، من نسب ومجموعات ضريبية تضبطها مرة واحدة",
        "خصومات وعروض وقوائم أسعار، مثل سعر التجزئة وسعر الجملة",
        "تقسيم الفاتورة الواحدة بين النقد والبطاقة وطرق دفع أخرى",
        "تعليق الفاتورة والعودة إليها، وعروض أسعار تتحول إلى مبيعات",
        "مرتجعات واستردادات مع السبب، ويعود المخزون تلقائيًا",
        "البيع الآجل يُسجَّل مباشرة في حساب العميل",
        "المطاعم: فواتير الطاولات، تقسيم الفاتورة وتذاكر المطبخ مع الطلب",
        "الورديات ودرج النقد: افتح الكاشير واعدده وأغلقه، مع التسليم بين الكاشيرين",
        "إيصالات بالإنجليزية أو الأردية أو العربية",
      ],
      note: "يستمر كاشير المتجر في الفوترة دون إنترنت ويزامن لاحقًا. طاولات المطعم وشاشة المطبخ ضمن باقة Business.",
    },
    panel: {
      title: "في كل فاتورة",
      items: [
        { title: "إيصال أو فاتورة", body: "58 ملم أو 80 ملم أو فاتورة A4" },
        { title: "الضريبة جاهزة", body: "النسب والمجموعات تُطبَّق تلقائيًا" },
        { title: "دفع مقسّم", body: "نقد وبطاقة وغيرها في فاتورة واحدة" },
      ],
    },
    audiences: ["المطاعم", "التجزئة والأزياء", "البقالة"],
    faqs: [
      {
        question: "هل تعمل الفوترة دون إنترنت؟",
        answer:
          "نعم عند كاشير المتجر: تستمر الفوترة دون اتصال وتُزامَن المبيعات عند عودة الاتصال، دون تكرار. العمل دون اتصال لطاولات المطعم وشاشة المطبخ لم يُطلق بعد.",
      },
      {
        question: "ما الطابعات التي يمكنني استخدامها؟",
        answer:
          "معظم طابعات الإيصالات الحرارية 58 و80 ملم عبر USB أو الشبكة أو البلوتوث، وأي طابعة عادية لفواتير A4.",
      },
      {
        question: "هل يمكنني إصدار فاتورة ضريبية لعملاء الشركات؟",
        answer: "نعم. اطبع أو احفظ فاتورة A4 ببيانات نشاطك وبيانات العميل والضريبة.",
      },
      {
        question: "هل يدعم الربط مع FBR؟",
        answer:
          "ليس بعد. ربط FBR الخاص بباكستان قادم قريبًا. الضريبة على كل فاتورة وتقارير الضريبة تعمل اليوم.",
      },
      {
        question: "هل يمكن نقل منتجاتي من برنامج الفواتير القديم؟",
        answer:
          "نعم. أرسل ملف Excel أو CSV ويقوم فريقنا بإدخال منتجاتك وعملائك ومخزونك الافتتاحي مجانًا.",
      },
    ],
    cta: {
      headline: "ابدأ اليوم.",
      body: "ابدأ الفوترة اليوم على الحاسوب أو الجهاز اللوحي أو الهاتف الذي لديك.",
      secondary: "اطّلع على الأسعار",
    },
  },
};
