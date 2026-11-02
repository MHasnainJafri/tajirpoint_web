import type { Localized } from "../page-copy";
import type { FeaturePageCopy } from "./types";

/** /features/offline. Audiences: Retail, Restaurant, Distribution. */
export const OFFLINE_COPY: Localized<FeaturePageCopy> = {
  en: {
    meta: {
      title: "Offline POS: Keep Selling Without Internet",
      description:
        "Power cuts and dropped internet should never stop a sale. TajirPoint's offline POS saves every sale on the device first and syncs later with no duplicates.",
    },
    breadcrumb: "Offline POS",
    badge: "Offline-First",
    headline: ["An offline POS that keeps", "selling when the internet drops."],
    sub: "Power cuts and dead connections should never stop a sale. TajirPoint keeps billing and syncs safely later.",
    mock: {
      title: "POS · Offline",
      rows: [
        { label: "Connection", value: "Offline" },
        { label: "Queued sales", value: "6" },
        { label: "Will sync", value: "Automatically" },
      ],
    },
    problem: {
      title: "A POS that needs the internet stops when the signal drops",
      body: "A dropped connection at the counter means a queue that cannot move. For many shops that is a daily reality, not an edge case.",
    },
    solution: {
      title: "Sell now, sync automatically",
      points: [
        "Bill customers exactly as normal with no connection",
        "Every sale written safely to the device first",
        "Automatic sync the moment you are back online",
        "No duplicate sales, no lost receipts",
        "Works across web, desktop and Android",
        "Clear on-screen status so staff always know",
      ],
    },
    panel: {
      title: "How the sync stays safe",
      items: [
        { title: "Saved on device", body: "Nothing depends on the network" },
        { title: "Auto reconcile", body: "Merges cleanly when back online" },
        { title: "No duplicates", body: "Each sale posts exactly once" },
      ],
    },
    audiences: ["Retail", "Restaurant", "Distribution"],
    faqs: [
      {
        question: "What if two registers were offline at once?",
        answer:
          "Each device keeps its own queue and syncs independently; the server merges them without duplicates.",
      },
      {
        question: "Is there a time limit offline?",
        answer:
          "No. Sell offline as long as you need — everything syncs when a connection returns.",
      },
    ],
    cta: {
      headline: "Free for 3 months. No card needed.",
      body: "Pull the plug on your test till and watch it keep billing — then watch it sync itself back.",
      secondary: "See pricing",
    },
  },

  ur: {
    meta: {
      title: "آف لائن POS: انٹرنیٹ کے بغیر فروخت جاری",
      description:
        "بجلی جائے یا انٹرنیٹ بند ہو، فروخت نہیں رکنی چاہیے۔ TajirPoint کا آف لائن POS ہر فروخت پہلے ڈیوائس پر محفوظ کرتا ہے اور بعد میں بغیر ڈبل انٹری کے سنک کرتا ہے۔",
    },
    breadcrumb: "آف لائن POS",
    badge: "آف لائن پہلے",
    headline: ["آف لائن POS جو انٹرنیٹ جانے پر", "بھی فروخت جاری رکھے۔"],
    sub: "لوڈ شیڈنگ اور بند انٹرنیٹ سے فروخت کبھی نہیں رکنی چاہیے۔ TajirPoint بل بناتا رہتا ہے اور بعد میں محفوظ طریقے سے سنک کرتا ہے۔",
    mock: {
      title: "POS · آف لائن",
      rows: [
        { label: "کنکشن", value: "آف لائن" },
        { label: "قطار میں فروخت", value: "6" },
        { label: "سنک ہوگا", value: "خود بخود" },
      ],
    },
    problem: {
      title: "انٹرنیٹ پر چلنے والا POS سگنل جاتے ہی رک جاتا ہے",
      body: "کاؤنٹر پر کنکشن ٹوٹنے کا مطلب ہے رکی ہوئی قطار۔ بہت سی دکانوں کے لیے یہ روز کی بات ہے، کوئی انوکھا واقعہ نہیں۔",
    },
    solution: {
      title: "ابھی بیچیں، سنک خود بخود",
      points: [
        "کنکشن کے بغیر بالکل معمول کے مطابق بل بنائیں",
        "ہر فروخت پہلے ڈیوائس پر محفوظ",
        "آن لائن آتے ہی خودکار سنک",
        "نہ ڈبل فروخت، نہ گم شدہ رسید",
        "ویب، ڈیسک ٹاپ اور اینڈرائیڈ پر کام کرتا ہے",
        "اسکرین پر واضح حیثیت تاکہ عملے کو ہمیشہ پتہ رہے",
      ],
    },
    panel: {
      title: "سنک کیسے محفوظ رہتا ہے",
      items: [
        { title: "ڈیوائس پر محفوظ", body: "کچھ بھی نیٹ ورک پر منحصر نہیں" },
        { title: "خودکار ملان", body: "آن لائن آنے پر صاف طریقے سے ملتا ہے" },
        { title: "کوئی ڈبل نہیں", body: "ہر فروخت صرف ایک بار درج" },
      ],
    },
    audiences: ["ریٹیل", "ریسٹورنٹ", "ڈسٹری بیوشن"],
    faqs: [
      {
        question: "اگر دو کاؤنٹر ایک ساتھ آف لائن ہوں تو؟",
        answer:
          "ہر ڈیوائس اپنی الگ قطار رکھتی ہے اور الگ سے سنک کرتی ہے؛ سرور انہیں بغیر ڈبل کے ملا دیتا ہے۔",
      },
      {
        question: "کیا آف لائن رہنے کی کوئی حد ہے؟",
        answer: "نہیں۔ جتنی دیر ضرورت ہو آف لائن بیچیں — کنکشن واپس آتے ہی سب کچھ سنک ہو جاتا ہے۔",
      },
    ],
    cta: {
      headline: "3 ماہ مفت۔ کارڈ کی ضرورت نہیں۔",
      body: "اپنے ٹیسٹ کاؤنٹر کا انٹرنیٹ بند کریں اور دیکھیں کہ بل بنتے رہتے ہیں — پھر دیکھیں کہ یہ خود سنک ہو جاتا ہے۔",
      secondary: "قیمتیں دیکھیں",
    },
  },

  ar: {
    meta: {
      title: "نقطة بيع تعمل دون إنترنت",
      description:
        "انقطاع الكهرباء أو الإنترنت يجب ألا يوقف أي بيع. نقطة بيع TajirPoint تحفظ كل عملية على الجهاز أولًا ثم تزامنها لاحقًا دون أي تكرار في المبيعات.",
    },
    breadcrumb: "البيع دون إنترنت",
    badge: "يعمل دون إنترنت",
    headline: ["نقطة بيع تواصل البيع", "حين ينقطع الإنترنت."],
    sub: "انقطاع الكهرباء والاتصال يجب ألا يوقف أي عملية بيع. يواصل TajirPoint إصدار الفواتير ويزامن بأمان لاحقًا.",
    mock: {
      title: "نقطة البيع · دون اتصال",
      rows: [
        { label: "الاتصال", value: "غير متصل" },
        { label: "مبيعات في الانتظار", value: "6" },
        { label: "المزامنة", value: "تلقائيًا" },
      ],
    },
    problem: {
      title: "نقطة البيع التي تحتاج الإنترنت تتوقف عند انقطاع الإشارة",
      body: "انقطاع الاتصال عند الكاشير يعني طابورًا لا يتحرك. ولكثير من المتاجر هذا واقع يومي، لا حالة نادرة.",
    },
    solution: {
      title: "بِع الآن، والمزامنة تلقائية",
      points: [
        "أصدر الفواتير كالمعتاد تمامًا دون اتصال",
        "كل عملية بيع تُحفظ على الجهاز أولًا",
        "مزامنة تلقائية لحظة عودة الاتصال",
        "لا مبيعات مكررة، ولا إيصالات ضائعة",
        "يعمل على الويب وسطح المكتب وأندرويد",
        "حالة واضحة على الشاشة ليعرف الموظفون دائمًا",
      ],
    },
    panel: {
      title: "كيف تبقى المزامنة آمنة",
      items: [
        { title: "محفوظ على الجهاز", body: "لا شيء يعتمد على الشبكة" },
        { title: "مطابقة تلقائية", body: "تُدمج بسلاسة عند عودة الاتصال" },
        { title: "لا تكرار", body: "كل عملية بيع تُسجَّل مرة واحدة" },
      ],
    },
    audiences: ["التجزئة", "المطاعم", "التوزيع"],
    faqs: [
      {
        question: "ماذا لو كان جهازا كاشير دون اتصال في الوقت نفسه؟",
        answer: "كل جهاز يحتفظ بقائمة انتظار خاصة به ويزامن بشكل مستقل؛ ويدمجها الخادم دون تكرار.",
      },
      {
        question: "هل هناك حد زمني للعمل دون اتصال؟",
        answer: "لا. بِع دون اتصال طالما احتجت — كل شيء يُزامَن عند عودة الاتصال.",
      },
    ],
    cta: {
      headline: "مجانًا لمدة 3 أشهر. دون بطاقة.",
      body: "افصل الإنترنت عن جهاز الكاشير التجريبي وشاهده يواصل إصدار الفواتير — ثم شاهده يزامن نفسه.",
      secondary: "اطّلع على الأسعار",
    },
  },
};
