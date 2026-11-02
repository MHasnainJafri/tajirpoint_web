import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { brandMessages } from "./brand-messages";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;
  if (!locale || !(routing.locales as readonly string[]).includes(locale)) {
    locale = routing.defaultLocale;
  }
  return {
    locale,
    messages: await brandMessages((await import(`../../messages/${locale}.json`)).default, locale),
  };
});
