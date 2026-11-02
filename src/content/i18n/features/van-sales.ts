import type { Localized } from "../page-copy";
import type { FeaturePageCopy } from "./types";

/**
 * /features/van-sales. Audiences: Distribution, Retail.
 * The note is a fact from the Route Dispatch add-on (included on every plan,
 * Light too — src/content/addons/route-dispatch.ts), replacing an unsourced
 * "almost no mid-market POS does this" line.
 */
export const VAN_SALES_COPY: Localized<FeaturePageCopy> = {
  en: {
    meta: {
      title: "Van Sales & Route Dispatch Software",
      description:
        "Van sales software for distributors: load stock onto a van, sell and collect cash door to door, dispatch routes and reconcile every route at day end.",
    },
    breadcrumb: "Van sales",
    badge: "Van Sales",
    headline: ["Van sales software: every truck", "a mobile warehouse."],
    sub: "Van sales, route dispatch and day-end reconciliation — for distributors who sell on the move.",
    mock: {
      title: "Route North",
      // Sold − collected = owed; keep the three in step if edited.
      rows: [
        { label: "Sold", value: "$11,540" },
        { label: "Cash collected", value: "$10,920" },
        { label: "Driver owes", value: "$620.00" },
      ],
    },
    problem: {
      title: "Load a van, send it out, and hope it balances",
      body: "Cash, goods and fuel rarely match at night, and profit per route is a guess.",
    },
    solution: {
      title: "Every route accounted for",
      points: [
        "Load stock onto a van as a mobile warehouse",
        "Route selling and door-to-door cash collection",
        "Day-end reconciliation of cash, goods and fuel",
        "Track what each driver still owes",
        "Per-trip and per-route profit",
        "Returns and damages handled on the route",
      ],
      note: "Included on every plan — even the free Light plan.",
    },
    panel: {
      title: "At day end",
      items: [
        { title: "Cash reconciled", body: "Matched to goods sold" },
        { title: "Fuel logged", body: "Costed against the route" },
        { title: "Route profit", body: "Margin per trip, per driver" },
      ],
    },
    audiences: ["Distribution", "Retail"],
    faqs: [
      {
        question: "Do drivers need internet on the route?",
        answer: "Yes, the trip screen needs a connection. If the signal drops, the shop counter POS keeps selling offline.",
      },
      {
        question: "Can I price differently per customer?",
        answer: "Yes — tiered and bulk pricing apply automatically on the route.",
      },
    ],
    cta: {
      headline: "Free for 3 months. No card needed.",
      body: "Load one van, run one route, and see the day balance itself at night.",
      secondary: "See pricing",
    },
  },

  ur: {
    meta: {
      title: "وین سیلز اور روٹ ڈسپیچ سافٹ ویئر",
      description:
        "ڈسٹری بیوٹرز کے لیے وین سیلز سافٹ ویئر: وین میں مال لوڈ کریں، دکان دکان بیچیں اور کیش وصول کریں، روٹ بھیجیں اور دن کے آخر میں ہر روٹ کا حساب ملائیں۔",
    },
    breadcrumb: "وین سیلز",
    badge: "وین سیلز",
    headline: ["وین سیلز سافٹ ویئر: ہر گاڑی", "ایک چلتا پھرتا گودام۔"],
    sub: "وین سیلز، روٹ ڈسپیچ اور دن کے آخر کا حساب — ان ڈسٹری بیوٹرز کے لیے جو چلتے پھرتے بیچتے ہیں۔",
    mock: {
      title: "شمالی روٹ",
      rows: [
        { label: "فروخت", value: "$11,540" },
        { label: "وصول شدہ کیش", value: "$10,920" },
        { label: "ڈرائیور کے ذمے", value: "$620.00" },
      ],
    },
    problem: {
      title: "وین لوڈ کریں، روانہ کریں، اور امید رکھیں کہ حساب برابر ہو",
      body: "رات کو کیش، مال اور پیٹرول کا حساب کم ہی ملتا ہے، اور ہر روٹ کا منافع اندازے پر چلتا ہے۔",
    },
    solution: {
      title: "ہر روٹ کا پورا حساب",
      points: [
        "وین میں مال لوڈ کریں، جیسے چلتا پھرتا گودام",
        "روٹ پر فروخت اور دکان دکان کیش وصولی",
        "دن کے آخر میں کیش، مال اور پیٹرول کا ملان",
        "ہر ڈرائیور کے ذمے باقی رقم کا حساب",
        "ہر چکر اور ہر روٹ کا منافع",
        "روٹ پر واپسی اور خراب مال کا اندراج",
      ],
      note: "ہر پلان میں شامل — مفت لائٹ پلان میں بھی۔",
    },
    panel: {
      title: "دن کے آخر میں",
      items: [
        { title: "کیش کا ملان", body: "بیچے گئے مال سے ملایا گیا" },
        { title: "پیٹرول کا اندراج", body: "روٹ کے خرچ میں شامل" },
        { title: "روٹ کا منافع", body: "ہر چکر اور ہر ڈرائیور کا مارجن" },
      ],
    },
    audiences: ["ڈسٹری بیوشن", "ریٹیل"],
    faqs: [
      {
        question: "کیا ڈرائیوروں کو روٹ پر انٹرنیٹ چاہیے؟",
        answer: "جی ہاں، ٹرپ والی اسکرین کے لیے کنکشن چاہیے۔ سگنل چلا جائے تو دکان کا کاؤنٹر POS آف لائن بیچتا رہتا ہے۔",
      },
      {
        question: "کیا ہر گاہک کے لیے الگ قیمت رکھ سکتا ہوں؟",
        answer: "جی ہاں — درجہ وار اور تھوک قیمتیں روٹ پر خود بخود لاگو ہوتی ہیں۔",
      },
    ],
    cta: {
      headline: "3 ماہ مفت۔ کارڈ کی ضرورت نہیں۔",
      body: "ایک وین لوڈ کریں، ایک روٹ چلائیں، اور رات کو دیکھیں کہ دن کا حساب خود برابر ہو جاتا ہے۔",
      secondary: "قیمتیں دیکھیں",
    },
  },

  ar: {
    meta: {
      title: "برنامج البيع بالشاحنات وتوزيع المسارات",
      description:
        "برنامج بيع بالشاحنات للموزعين: حمّل البضاعة على الشاحنة، بِع واجمع النقد من باب لباب، وزّع المسارات وطابق حساب كل مسار في نهاية اليوم بسهولة.",
    },
    breadcrumb: "البيع بالشاحنات",
    badge: "البيع بالشاحنات",
    headline: ["برنامج البيع بالشاحنات: كل شاحنة", "مستودع متنقل."],
    sub: "البيع بالشاحنات وتوزيع المسارات ومطابقة نهاية اليوم — للموزعين الذين يبيعون أثناء التنقل.",
    mock: {
      title: "المسار الشمالي",
      rows: [
        { label: "المبيعات", value: "$11,540" },
        { label: "النقد المحصّل", value: "$10,920" },
        { label: "على السائق", value: "$620.00" },
      ],
    },
    problem: {
      title: "تحمّل الشاحنة وترسلها وتأمل أن يتطابق الحساب",
      body: "نادرًا ما يتطابق النقد والبضاعة والوقود في المساء، وربح كل مسار مجرد تخمين.",
    },
    solution: {
      title: "حساب كامل لكل مسار",
      points: [
        "حمّل البضاعة على الشاحنة كمستودع متنقل",
        "البيع على المسار وتحصيل النقد من باب لباب",
        "مطابقة النقد والبضاعة والوقود في نهاية اليوم",
        "تتبّع ما تبقّى على كل سائق",
        "الربح لكل رحلة ولكل مسار",
        "المرتجعات والتالف تُعالَج على المسار",
      ],
      note: "مشمول في كل الباقات — حتى باقة Light المجانية.",
    },
    panel: {
      title: "في نهاية اليوم",
      items: [
        { title: "نقد مُطابَق", body: "مطابق للبضاعة المباعة" },
        { title: "الوقود مُسجَّل", body: "محسوب على المسار" },
        { title: "ربح المسار", body: "الهامش لكل رحلة ولكل سائق" },
      ],
    },
    audiences: ["التوزيع", "التجزئة"],
    faqs: [
      {
        question: "هل يحتاج السائقون إلى الإنترنت على المسار؟",
        answer: "نعم، شاشة الرحلة تحتاج إلى اتصال. إذا انقطعت الإشارة، تواصل نقطة البيع في المتجر البيع دون اتصال.",
      },
      {
        question: "هل يمكنني تسعير كل عميل بشكل مختلف؟",
        answer: "نعم — الأسعار المتدرجة وأسعار الجملة تُطبَّق تلقائيًا على المسار.",
      },
    ],
    cta: {
      headline: "مجانًا لمدة 3 أشهر. دون بطاقة.",
      body: "حمّل شاحنة واحدة، شغّل مسارًا واحدًا، وشاهد حساب اليوم يتطابق وحده في المساء.",
      secondary: "اطّلع على الأسعار",
    },
  },
};
