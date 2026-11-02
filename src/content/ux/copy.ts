import { BRAND_NAME } from "@/lib/config/brand";

/**
 * Short UI strings for the site-wide contact button and the extra nav / page
 * links added in the user-friendliness pass (TP-485).
 *
 * Kept here instead of messages/*.json so this lane does not collide with the
 * translation lanes editing those files. Fold into messages/ once they merge.
 */

export type UxLocale = "en" | "ur" | "ar";

export interface UxCopy {
  /** Menu name for /extensions. */
  addOns: string;
  /** Menu link / button to /get-a-call. */
  getACall: string;
  /** Short sub-line under "Get a call" in the Resources menu. */
  getACallSub: string;
  /** The floating button group's accessible name. */
  contactGroup: string;
  /** Floating WhatsApp button (also its accessible name). */
  whatsapp: string;
  /** Floating call-back button (also its accessible name). */
  callMeBack: string;
  /** Pre-filled WhatsApp message. */
  whatsappMessage: string;
  /** Primary action used in page heroes and closing bands. */
  startFree: string;
  /** Secondary action used in page heroes and closing bands. */
  bookDemo: string;
  /** Short line in closing bands. */
  nextStepTitle: string;
  nextStepBody: string;
  /** Home link in the footer. */
  home: string;
}

const COPY: Record<UxLocale, UxCopy> = {
  en: {
    addOns: "Add-ons",
    getACall: "Get a call",
    getACallSub: "Leave your number. We call you within one working day.",
    contactGroup: "Talk to us",
    whatsapp: "Chat on WhatsApp",
    callMeBack: "Call me back",
    whatsappMessage: `Hi ${BRAND_NAME}, I'm interested in your POS.`,
    startFree: "Start free",
    bookDemo: "Book a demo",
    nextStepTitle: "Ready when you are",
    nextStepBody:
      "Start free in a few minutes, or let our team call you and answer your questions.",
    home: "Home",
  },
  ur: {
    addOns: "ایڈ آنز",
    getACall: "کال حاصل کریں",
    getACallSub: "اپنا نمبر دیں۔ ہم ایک کاروباری دن میں کال کریں گے۔",
    contactGroup: "ہم سے بات کریں",
    whatsapp: "واٹس ایپ پر بات کریں",
    callMeBack: "مجھے کال کریں",
    whatsappMessage: `Hi ${BRAND_NAME}, I'm interested in your POS.`,
    startFree: "مفت شروع کریں",
    bookDemo: "ڈیمو بک کریں",
    nextStepTitle: "جب آپ تیار ہوں",
    nextStepBody: "چند منٹ میں مفت شروع کریں، یا ہماری ٹیم آپ کو کال کر کے سوالات کے جواب دے۔",
    home: "ہوم",
  },
  ar: {
    addOns: "الإضافات",
    getACall: "اطلب اتصالًا",
    getACallSub: "اترك رقمك وسنتصل بك خلال يوم عمل واحد.",
    contactGroup: "تحدث إلينا",
    whatsapp: "تحدث عبر واتساب",
    callMeBack: "اتصلوا بي",
    whatsappMessage: `Hi ${BRAND_NAME}, I'm interested in your POS.`,
    startFree: "ابدأ مجانًا",
    bookDemo: "احجز عرضًا توضيحيًا",
    nextStepTitle: "جاهزون متى كنت جاهزًا",
    nextStepBody: "ابدأ مجانًا خلال دقائق، أو دع فريقنا يتصل بك ويجيب عن أسئلتك.",
    home: "الرئيسية",
  },
};

export function uxCopy(locale: string): UxCopy {
  return COPY[(locale in COPY ? locale : "en") as UxLocale];
}
