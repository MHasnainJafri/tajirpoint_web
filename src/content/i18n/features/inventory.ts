import type { Localized } from "../page-copy";
import type { FeaturePageCopy } from "./types";

/**
 * /features/inventory. Audiences: Restaurants, Grocery, Pharmacy.
 *
 * Every point is a shipped feature (checked 18 Nov 2026 in the backend:
 * domains/inventory warehouses, stock levels with reorder points, FIFO cost
 * layers, batches with day- and hour-based expiry alerts, serial/IMEI units,
 * transfers, stock-take sessions whose variances post one adjustment;
 * catalog units of measure with conversions, variants, barcodes; purchase
 * orders; restaurant recipes, prep batches and kitchen counts). Plan limits
 * from the public plans API: Light and Shop = 1 warehouse, Business = 5,
 * Enterprise = unlimited.
 */
export const INVENTORY_COPY: Localized<FeaturePageCopy> = {
  en: {
    meta: {
      title: "Inventory Management Software for Shops & Kitchens",
      description:
        "Inventory software that updates as you sell: stock per shop and warehouse, cartons to pieces, batches and expiry, counts, transfers and reorder alerts.",
    },
    breadcrumb: "Inventory",
    badge: "Inventory",
    headline: ["Know what is on every shelf,", "and in every kitchen."],
    sub: "Stock moves the moment you sell, buy, count, waste or transfer, in every shop and warehouse.",
    mock: {
      title: "Stock · Main warehouse",
      rows: [
        { label: "Basmati rice 5 kg", value: "12 left" },
        { label: "Chicken fillet · batch 07", value: "Expires in 6 h" },
        { label: "Cola 1.5 L · reorder", value: "Order 48" },
      ],
    },
    problem: {
      title: "The stock you think you have is not the stock you have",
      body: "A notebook or a spreadsheet drifts every day: a carton opened and sold by the piece, a short delivery, a dish that used more chicken than planned. You find out when a customer asks for something you cannot sell, or when stock quietly expires on the shelf.",
    },
    solution: {
      title: "Stock that keeps itself up to date",
      points: [
        "Every sale, purchase, return and waste entry moves stock on its own, per shop and per warehouse",
        "Units the way you buy and sell: cartons, packs, pieces, kilograms or litres, converted automatically",
        "Barcodes and variants (size, colour, flavour) on every product",
        "Batches with expiry dates, oldest-first selling, and alerts days or hours before something goes off",
        "Serial and IMEI numbers for phones, laptops and electronics",
        "Reorder points and low-stock alerts, then purchase orders to your suppliers",
        "Stock counts on a phone: count the shelf, and the differences post as one adjustment",
        "Transfers between shops and warehouses",
        "Restaurants: recipes deduct ingredients as dishes sell, with prep batches and kitchen counts",
        "Stock value at cost, worked out first-in, first-out",
      ],
      note: "Light and Shop plans have one warehouse; Business has up to five shops and warehouses, Enterprise as many as you need.",
    },
    panel: {
      title: "On every product",
      items: [
        { title: "Live stock per location", body: "Every shop and warehouse, always current" },
        { title: "Batch and expiry", body: "Know what to sell first" },
        { title: "Reorder alert", body: "Warns you before you run out" },
      ],
    },
    audiences: ["Restaurants", "Grocery & kiryana", "Pharmacy"],
    faqs: [
      {
        question: "Can I bring my current stock in from Excel?",
        answer:
          "Yes. Send us an Excel or CSV export and our team loads your products and opening stock for you, free of charge.",
      },
      {
        question: "Does stock still update when the internet is down?",
        answer:
          "The shop till keeps selling offline, and the stock catches up as soon as it syncs. Nothing is counted twice.",
      },
      {
        question: "How does it work for a restaurant kitchen?",
        answer:
          "Each dish has a recipe, so selling it deducts the ingredients. Prep batches, waste entries and kitchen counts keep the numbers honest, and short-life items like chicken get an alert hours before they expire.",
      },
      {
        question: "Can I track serial numbers or IMEI?",
        answer:
          "Yes. Phones, laptops and other electronics can be received, sold and returned by serial or IMEI number, each with its own cost.",
      },
      {
        question: "How many shops or warehouses can I have?",
        answer:
          "One on the Light and Shop plans, up to five on Business, and as many as you need on Enterprise. Stock moves between them with transfers.",
      },
    ],
    cta: {
      headline: "Free for 3 months. No card needed.",
      body: "Put every carton, batch and ingredient on one live stock list.",
      secondary: "See pricing",
    },
  },

  ur: {
    meta: {
      title: "انوینٹری سافٹ ویئر: دکانوں اور کچن کے لیے اسٹاک کنٹرول",
      description:
        "ایسا انوینٹری سافٹ ویئر جو ہر فروخت کے ساتھ اپ ڈیٹ ہو: ہر دکان اور گودام کا اسٹاک، کارٹن سے پیس، بیچ اور ایکسپائری، گنتی، ٹرانسفر اور دوبارہ آرڈر کے الرٹ۔",
    },
    breadcrumb: "انوینٹری",
    badge: "انوینٹری",
    headline: ["ہر شیلف پر کیا ہے، جانیں،", "اور ہر کچن میں بھی۔"],
    sub: "فروخت، خریداری، گنتی، ضائع یا ٹرانسفر ہوتے ہی اسٹاک بدل جاتا ہے، ہر دکان اور گودام میں۔",
    mock: {
      title: "اسٹاک · مین گودام",
      rows: [
        { label: "باسمتی چاول 5 کلو", value: "12 باقی" },
        { label: "چکن فِلے · بیچ 07", value: "6 گھنٹے میں ایکسپائر" },
        { label: "کولا 1.5 لیٹر · دوبارہ آرڈر", value: "48 منگوائیں" },
      ],
    },
    problem: {
      title: "جو اسٹاک آپ سمجھتے ہیں، وہ اصل اسٹاک نہیں",
      body: "کاپی یا اسپریڈشیٹ ہر روز غلط ہوتی جاتی ہے: کارٹن کھول کر پیس میں بیچا، ڈیلیوری کم آئی، کسی ڈش میں اندازے سے زیادہ چکن لگ گیا۔ پتا تب چلتا ہے جب گاہک کوئی چیز مانگے اور وہ موجود نہ ہو، یا مال شیلف پر ہی ایکسپائر ہو جائے۔",
    },
    solution: {
      title: "ایسا اسٹاک جو خود اپ ڈیٹ رہے",
      points: [
        "ہر فروخت، خریداری، واپسی اور ضائع شدہ مال سے اسٹاک خود بدلتا ہے، ہر دکان اور ہر گودام میں",
        "اکائیاں ویسی جیسے آپ خریدتے اور بیچتے ہیں: کارٹن، پیک، پیس، کلو یا لیٹر، خودکار تبدیلی کے ساتھ",
        "ہر پروڈکٹ پر بارکوڈ اور ویریئنٹ (سائز، رنگ، ذائقہ)",
        "ایکسپائری والے بیچ، پہلے پرانا مال بیچنا، اور خراب ہونے سے دن یا گھنٹے پہلے الرٹ",
        "موبائل، لیپ ٹاپ اور الیکٹرانکس کے سیریل اور IMEI نمبر",
        "دوبارہ آرڈر کی حد اور کم اسٹاک کے الرٹ، پھر سپلائرز کو پرچیز آرڈر",
        "فون پر اسٹاک کی گنتی: شیلف گنیں، اور فرق ایک ہی ایڈجسٹمنٹ میں درج",
        "دکانوں اور گوداموں کے درمیان ٹرانسفر",
        "ریسٹورنٹ: ڈش بکنے پر ریسیپی کے مطابق اجزاء کٹتے ہیں، ساتھ پریپ بیچ اور کچن کی گنتی",
        "لاگت پر اسٹاک کی قیمت، پہلے آیا پہلے گیا (FIFO) کے حساب سے",
      ],
      note: "Light اور Shop پلان میں ایک گودام؛ Business میں پانچ دکانیں اور گودام تک، Enterprise میں جتنے چاہیں۔",
    },
    panel: {
      title: "ہر پروڈکٹ پر",
      items: [
        { title: "ہر جگہ کا تازہ اسٹاک", body: "ہر دکان اور گودام، ہمیشہ اپ ڈیٹ" },
        { title: "بیچ اور ایکسپائری", body: "پتا ہو کیا پہلے بیچنا ہے" },
        { title: "دوبارہ آرڈر الرٹ", body: "ختم ہونے سے پہلے خبردار" },
      ],
    },
    audiences: ["ریسٹورنٹ", "کریانہ اسٹور", "فارمیسی"],
    faqs: [
      {
        question: "کیا میں اپنا موجودہ اسٹاک Excel سے لا سکتا ہوں؟",
        answer:
          "جی ہاں۔ Excel یا CSV فائل بھیجیں، ہماری ٹیم آپ کی پروڈکٹس اور ابتدائی اسٹاک مفت میں ڈال دے گی۔",
      },
      {
        question: "کیا انٹرنیٹ بند ہونے پر بھی اسٹاک اپ ڈیٹ ہوتا ہے؟",
        answer:
          "دکان کا کاؤنٹر آف لائن بھی فروخت جاری رکھتا ہے، اور سنک ہوتے ہی اسٹاک برابر ہو جاتا ہے۔ کچھ بھی دو بار نہیں گنا جاتا۔",
      },
      {
        question: "ریسٹورنٹ کے کچن میں یہ کیسے کام کرتا ہے؟",
        answer:
          "ہر ڈش کی ریسیپی ہوتی ہے، تو ڈش بکنے پر اجزاء کٹ جاتے ہیں۔ پریپ بیچ، ضائع شدہ مال اور کچن کی گنتی حساب درست رکھتی ہے، اور چکن جیسی جلد خراب ہونے والی چیزوں پر ایکسپائری سے گھنٹوں پہلے الرٹ آتا ہے۔",
      },
      {
        question: "کیا سیریل نمبر یا IMEI ٹریک ہو سکتا ہے؟",
        answer:
          "جی ہاں۔ موبائل، لیپ ٹاپ اور دوسری الیکٹرانکس سیریل یا IMEI نمبر کے ساتھ وصول، فروخت اور واپس ہوتی ہیں، ہر ایک کی اپنی لاگت کے ساتھ۔",
      },
      {
        question: "میں کتنی دکانیں یا گودام رکھ سکتا ہوں؟",
        answer:
          "Light اور Shop پلان میں ایک، Business میں پانچ تک، اور Enterprise میں جتنے چاہیں۔ ان کے درمیان اسٹاک ٹرانسفر سے جاتا ہے۔",
      },
    ],
    cta: {
      headline: "3 ماہ مفت۔ کارڈ کی ضرورت نہیں۔",
      body: "ہر کارٹن، بیچ اور جزو ایک ہی تازہ اسٹاک لسٹ پر۔",
      secondary: "قیمتیں دیکھیں",
    },
  },

  ar: {
    meta: {
      title: "برنامج إدارة المخزون للمتاجر والمطابخ",
      description:
        "برنامج مخزون يتحدّث مع كل بيع: مخزون كل متجر ومستودع، من الكرتونة إلى القطعة، الدفعات وتواريخ الانتهاء، الجرد، التحويلات وتنبيهات إعادة الطلب.",
    },
    breadcrumb: "المخزون",
    badge: "المخزون",
    headline: ["اعرف ما على كل رف،", "وما في كل مطبخ."],
    sub: "يتغيّر المخزون لحظة البيع أو الشراء أو الجرد أو الهدر أو التحويل، في كل متجر ومستودع.",
    mock: {
      title: "المخزون · المستودع الرئيسي",
      rows: [
        { label: "أرز بسمتي 5 كغ", value: "متبقٍ 12" },
        { label: "فيليه دجاج · دفعة 07", value: "ينتهي خلال 6 س" },
        { label: "كولا 1.5 لتر · إعادة طلب", value: "اطلب 48" },
      ],
    },
    problem: {
      title: "المخزون الذي تظنه ليس المخزون الذي لديك",
      body: "الدفتر أو جدول البيانات يبتعد عن الواقع كل يوم: كرتونة فُتحت وبيعت بالقطعة، توريد ناقص، طبق استهلك دجاجًا أكثر من المتوقع. تكتشف ذلك عندما يطلب العميل شيئًا لا تستطيع بيعه، أو عندما تنتهي صلاحية البضاعة على الرف.",
    },
    solution: {
      title: "مخزون يحدّث نفسه بنفسه",
      points: [
        "كل بيع وشراء ومرتجع وهدر يحرّك المخزون تلقائيًا، لكل متجر ولكل مستودع",
        "وحدات كما تشتري وتبيع: كرتونة، علبة، قطعة، كيلوغرام أو لتر، مع تحويل تلقائي",
        "باركود ومتغيرات (المقاس، اللون، النكهة) لكل منتج",
        "دفعات بتواريخ انتهاء، بيع الأقدم أولًا، وتنبيهات قبل انتهاء الصلاحية بأيام أو ساعات",
        "أرقام تسلسلية وIMEI للهواتف والحواسيب والإلكترونيات",
        "حدود إعادة الطلب وتنبيهات نقص المخزون، ثم أوامر شراء للموردين",
        "جرد من الهاتف: عُدّ الرف، وتُسجَّل الفروقات في تسوية واحدة",
        "تحويلات بين المتاجر والمستودعات",
        "المطاعم: الوصفات تخصم المكونات عند بيع الأطباق، مع دفعات التحضير وجرد المطبخ",
        "قيمة المخزون بالتكلفة، محسوبة بطريقة الوارد أولًا يُصرف أولًا",
      ],
      note: "باقتا Light وShop تشملان مستودعًا واحدًا؛ Business حتى خمسة متاجر ومستودعات، وEnterprise بلا حد.",
    },
    panel: {
      title: "في كل منتج",
      items: [
        { title: "مخزون حي لكل موقع", body: "كل متجر ومستودع، محدّث دائمًا" },
        { title: "الدفعة والانتهاء", body: "اعرف ما تبيعه أولًا" },
        { title: "تنبيه إعادة الطلب", body: "ينبّهك قبل النفاد" },
      ],
    },
    audiences: ["المطاعم", "البقالة", "الصيدليات"],
    faqs: [
      {
        question: "هل يمكنني نقل مخزوني الحالي من Excel؟",
        answer: "نعم. أرسل ملف Excel أو CSV ويقوم فريقنا بإدخال منتجاتك ومخزونك الافتتاحي مجانًا.",
      },
      {
        question: "هل يتحدّث المخزون عند انقطاع الإنترنت؟",
        answer:
          "تستمر نقطة بيع المتجر في البيع دون اتصال، ويتحدّث المخزون فور المزامنة. لا يُحتسب شيء مرتين.",
      },
      {
        question: "كيف يعمل مع مطبخ المطعم؟",
        answer:
          "لكل طبق وصفة، فبيعه يخصم المكونات. دفعات التحضير وتسجيل الهدر وجرد المطبخ تُبقي الأرقام دقيقة، والمواد سريعة التلف مثل الدجاج تحصل على تنبيه قبل انتهائها بساعات.",
      },
      {
        question: "هل يمكن تتبع الأرقام التسلسلية أو IMEI؟",
        answer:
          "نعم. تُستلم الهواتف والحواسيب وغيرها من الإلكترونيات وتُباع وتُرتجع برقمها التسلسلي أو IMEI، ولكل وحدة تكلفتها.",
      },
      {
        question: "كم متجرًا أو مستودعًا يمكنني امتلاكه؟",
        answer:
          "واحد في باقتي Light وShop، وحتى خمسة في Business، وبلا حد في Enterprise. ينتقل المخزون بينها عبر التحويلات.",
      },
    ],
    cta: {
      headline: "مجانًا لمدة 3 أشهر. دون بطاقة.",
      body: "ضع كل كرتونة ودفعة ومكوّن في قائمة مخزون حية واحدة.",
      secondary: "اطّلع على الأسعار",
    },
  },
};
