import type { Localized } from "../page-copy";
import type { FeatureCommonCopy } from "./types";
import { BRAND_NAME } from "@/lib/config/brand";

export const FEATURE_COMMON: Localized<FeatureCommonCopy> = {
  en: {
    allBusinesses: "All businesses",
    startFree: "Start free — 3 months",
    bookDemo: "Book a demo",
    problemEyebrow: "THE PROBLEM",
    solutionEyebrow: `HOW ${BRAND_NAME.toUpperCase()} SOLVES IT`,
    whoHelps: "Who this helps most",
    questions: "Questions",
  },
  ur: {
    allBusinesses: "تمام کاروبار",
    startFree: "مفت شروع کریں — 3 ماہ",
    bookDemo: "ڈیمو بک کریں",
    problemEyebrow: "مسئلہ",
    solutionEyebrow: `${BRAND_NAME} اسے کیسے حل کرتا ہے`,
    whoHelps: "یہ کن کے سب سے زیادہ کام آتا ہے",
    questions: "سوالات",
  },
  ar: {
    allBusinesses: "كل الأنشطة",
    startFree: "ابدأ مجانًا — 3 أشهر",
    bookDemo: "احجز عرضًا توضيحيًا",
    problemEyebrow: "المشكلة",
    solutionEyebrow: `كيف يحلّها ${BRAND_NAME}`,
    whoHelps: "لمن يفيد أكثر",
    questions: "أسئلة شائعة",
  },
};
