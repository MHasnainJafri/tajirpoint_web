import type { MarketingPlan } from "@/lib/api/plans";

/**
 * Urdu and Arabic for the plan cards. The plans API sends its text in English
 * (taglines, price wording, buttons, bullets), so the cards read it through
 * this list, keyed by the exact English string.
 *
 * A string that is not here (an admin edited the plan in the console) stays
 * English; the cards wrap API text in <bdi>, so it still reads in the right
 * order on a right-to-left page. Plan names (Light, Shop, Business,
 * Enterprise) are product names and stay as they are.
 *
 * When a plan's English text changes on the backend, add the new string here
 * in the same commit, or it shows in English on /ur and /ar.
 */
type Dict = Record<string, string>;

const UR: Dict = {
  // Taglines
  "Free for 3 months — everything to open your shop": "3 ماہ مفت — دکان کھولنے کے لیے سب کچھ",
  "For a shop that sells every day": "روزانہ فروخت کرنے والی دکان کے لیے",
  "For businesses with several branches": "کئی برانچوں والے کاروبار کے لیے",
  "Chains and franchises": "چینز اور فرنچائزز",
  // Price wording
  "Free for 3 months": "3 ماہ مفت",
  Custom: "آپ کی ضرورت کے مطابق",
  // Buttons
  "Start free": "مفت شروع کریں",
  "Choose Shop": "Shop منتخب کریں",
  "Choose Business": "Business منتخب کریں",
  "Contact us": "ہم سے رابطہ کریں",
  // Light
  "POS, receipts & barcode": "POS، رسیدیں اور بارکوڈ",
  "Up to 30 products": "30 پروڈکٹس تک",
  "100 orders a day": "روزانہ 100 آرڈرز",
  "2 staff logins": "عملے کے 2 لاگ اِن",
  "Customer & supplier khata": "گاہک اور سپلائر کا کھاتہ",
  "Works offline": "انٹرنیٹ کے بغیر بھی چلتا ہے",
  // Not in Light
  "AI phone ordering": "AI فون آرڈرنگ",
  "WhatsApp ordering": "واٹس ایپ آرڈرنگ",
  "Shopify & store sync": "Shopify اور آن لائن اسٹور سنک",
  "Online payment gateways": "آن لائن ادائیگی کے گیٹ ویز",
  "Online store & order page": "آن لائن اسٹور اور آرڈر پیج",
  // Shop
  "Everything in Light, no time limit": "Light کی ہر چیز، وقت کی کوئی حد نہیں",
  "Unlimited products & orders": "لامحدود پروڈکٹس اور آرڈرز",
  "Up to 5 staff logins": "عملے کے 5 لاگ اِن تک",
  "WhatsApp ordering & online payments": "واٹس ایپ آرڈرنگ اور آن لائن ادائیگیاں",
  "Every add-on available": "تمام ایڈ آنز دستیاب",
  // Business
  "Everything in Shop": "Shop کی ہر چیز",
  "Up to 5 branches & 20 users": "5 برانچیں اور 20 صارفین تک",
  "Purchasing & goods receipt": "خریداری اور مال کی وصولی",
  "Route dispatch & van sales": "روٹ ڈسپیچ اور وین سیلز",
  "Restaurant suite & kitchen display": "ریسٹورنٹ سوٹ اور کچن ڈسپلے",
  "Advanced reports & custom domain": "تفصیلی رپورٹس اور اپنا ڈومین",
  // Enterprise
  "Unlimited branches & users": "لامحدود برانچیں اور صارفین",
  "API access & custom integrations": "API رسائی اور آپ کی ضرورت کے مطابق انٹیگریشنز",
  "Migration assistance": "پرانا ڈیٹا منتقل کرنے میں مدد",
  "Dedicated support": "مخصوص سپورٹ",
  "Tailored pricing": "آپ کے مطابق قیمت",
};

const AR: Dict = {
  // Taglines
  "Free for 3 months — everything to open your shop":
    "مجاني لمدة 3 أشهر — كل ما تحتاجه لافتتاح متجرك",
  "For a shop that sells every day": "لمتجر يبيع كل يوم",
  "For businesses with several branches": "للأنشطة التي لديها عدة فروع",
  "Chains and franchises": "السلاسل والامتيازات التجارية",
  // Price wording
  "Free for 3 months": "مجاني لمدة 3 أشهر",
  Custom: "حسب الطلب",
  // Buttons
  "Start free": "ابدأ مجانًا",
  "Choose Shop": "اختر Shop",
  "Choose Business": "اختر Business",
  "Contact us": "تواصل معنا",
  // Light
  "POS, receipts & barcode": "نقطة بيع وإيصالات وباركود",
  "Up to 30 products": "حتى 30 منتجًا",
  "100 orders a day": "100 طلب يوميًا",
  "2 staff logins": "حسابا دخول للموظفين",
  "Customer & supplier khata": "دفتر الآجل للعملاء والموردين",
  "Works offline": "يعمل دون إنترنت",
  // Not in Light
  "AI phone ordering": "الطلب الهاتفي بالذكاء الاصطناعي",
  "WhatsApp ordering": "الطلب عبر واتساب",
  "Shopify & store sync": "مزامنة Shopify والمتاجر الإلكترونية",
  "Online payment gateways": "بوابات الدفع الإلكتروني",
  "Online store & order page": "متجر إلكتروني وصفحة طلبات",
  // Shop
  "Everything in Light, no time limit": "كل ما في Light دون حد زمني",
  "Unlimited products & orders": "منتجات وطلبات بلا حدود",
  "Up to 5 staff logins": "حتى 5 حسابات دخول للموظفين",
  "WhatsApp ordering & online payments": "الطلب عبر واتساب والدفع الإلكتروني",
  "Every add-on available": "جميع الإضافات متاحة",
  // Business
  "Everything in Shop": "كل ما في Shop",
  "Up to 5 branches & 20 users": "حتى 5 فروع و20 مستخدمًا",
  "Purchasing & goods receipt": "المشتريات واستلام البضائع",
  "Route dispatch & van sales": "توزيع المسارات والبيع المتنقل",
  "Restaurant suite & kitchen display": "حزمة المطاعم وشاشة المطبخ",
  "Advanced reports & custom domain": "تقارير متقدمة ونطاق خاص",
  // Enterprise
  "Unlimited branches & users": "فروع ومستخدمون بلا حدود",
  "API access & custom integrations": "وصول API وتكاملات مخصصة",
  "Migration assistance": "مساعدة في نقل البيانات",
  "Dedicated support": "دعم مخصص",
  "Tailored pricing": "تسعير مخصص",
};

const DICTS: Record<string, Dict> = { ur: UR, ar: AR };

function tr(dict: Dict, text: string): string;
function tr(dict: Dict, text: string | null | undefined): string | null | undefined;
function tr(dict: Dict, text: string | null | undefined) {
  if (!text) return text;
  return dict[text.trim()] ?? text;
}

/** The plans with their API text in *locale* where this list knows it. */
export function localizePlans(plans: MarketingPlan[], locale: string): MarketingPlan[] {
  const dict = DICTS[locale];
  if (!dict) return plans;
  return plans.map((plan) => ({
    ...plan,
    tagline: tr(dict, plan.tagline),
    price: tr(dict, plan.price),
    price_display: tr(dict, plan.price_display),
    cta: tr(dict, plan.cta),
    bullets: plan.bullets.map((b) => tr(dict, b)),
    not_included: plan.not_included?.map((b) => tr(dict, b)),
  }));
}
