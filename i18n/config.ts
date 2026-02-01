export const locales = ['en', 'ur', 'ar', 'nl', 'es'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  ur: 'اردو',
  ar: 'العربية',
  nl: 'Nederlands',
  es: 'Español',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  ur: '🇵🇰',
  ar: '🇸🇦',
  nl: '🇳🇱',
  es: '🇪🇸',
};

// RTL languages
export const rtlLocales: Locale[] = ['ur', 'ar'];

export const isRTL = (locale: Locale): boolean => rtlLocales.includes(locale);
