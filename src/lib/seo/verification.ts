import type { Metadata } from "next";

/**
 * Ownership-check tags for Google Search Console, Bing Webmaster Tools and
 * Meta (Facebook) domain verification, plus `fb:app_id` — each from an
 * environment variable (see .env.example), each omitted when unset.
 *
 * Read on the server at build time; set them in Vercel and redeploy. Values
 * are tokens, not markup: anything outside a conservative character set is
 * dropped rather than written into the page head.
 */
const TOKEN = /^[A-Za-z0-9_\-.=+/]{4,128}$/;
const APP_ID = /^\d{5,20}$/;

function token(value: string | undefined, pattern = TOKEN): string | undefined {
  const v = value?.trim();
  return v && pattern.test(v) ? v : undefined;
}

export function verificationMetadata(): Pick<Metadata, "verification" | "facebook"> {
  const google = token(process.env.GOOGLE_SITE_VERIFICATION);
  const bing = token(process.env.BING_SITE_VERIFICATION);
  const facebookDomain = token(process.env.FACEBOOK_DOMAIN_VERIFICATION);
  const appId = token(process.env.FACEBOOK_APP_ID, APP_ID);

  const other: Record<string, string> = {};
  if (bing) other["msvalidate.01"] = bing;
  if (facebookDomain) other["facebook-domain-verification"] = facebookDomain;

  return {
    ...((google || Object.keys(other).length) && {
      verification: {
        ...(google && { google }),
        ...(Object.keys(other).length && { other }),
      },
    }),
    ...(appId && { facebook: { appId } }),
  };
}
