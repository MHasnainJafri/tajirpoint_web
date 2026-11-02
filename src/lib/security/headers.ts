/**
 * Security headers and the IndexNow key, read by next.config.ts.
 *
 * Imported by next.config, so: no "@/" imports, no React, no Next runtime —
 * plain functions of the environment at build time.
 */

/** The origin of a URL, or "" when it is not a valid http(s) URL. */
export function originOf(url: string | undefined): string {
  if (!url) return "";
  try {
    const u = new URL(url);
    return u.protocol === "https:" || u.protocol === "http:" ? u.origin : "";
  } catch {
    return "";
  }
}

/**
 * Content-Security-Policy for the marketing site, built from what the code
 * really loads (checked 2 Nov 2026 by searching src/ for every script, image,
 * frame, media and fetch source):
 *
 * - Scripts: our own bundle plus Next's inline bootstrap scripts (the pages
 *   are static, so there is no per-request nonce: 'unsafe-inline' is needed),
 *   and, only after cookie consent, Google Analytics 4 / Tag Manager
 *   (www.googletagmanager.com) and the Meta Pixel (connect.facebook.net) —
 *   see src/lib/analytics/loader.ts.
 * - Beacons: GA4 sends hits to *.google-analytics.com /
 *   *.analytics.google.com (and, with Google signals, *.g.doubleclick.net and
 *   www.google.com); the Pixel to www.facebook.com. As images and as fetches.
 * - Images: our own (next/image is served from /_next/image), add-on icons
 *   from media.tajirpoint.com, data: and blob: URLs.
 * - Fonts: next/font self-hosts Geist, Geist Mono and Reem Kufi at build, so
 *   'self' only — no fonts.googleapis.com request is ever made.
 * - Frames: product videos from www.youtube-nocookie.com and
 *   player.vimeo.com (src/components/media/VideoEmbed.tsx), and Tag
 *   Manager's no-script frame.
 * - Media: our own and media.tajirpoint.com.
 * - Forms post to our own server actions; the backend (api.tajirpoint.com)
 *   is called from the server, but it is listed in connect-src in case a
 *   client widget reads it.
 *
 * Cloudflare Turnstile is NOT loaded by this site today, so it is not
 * allowed. If it is added, add https://challenges.cloudflare.com to
 * script-src and frame-src.
 *
 * Sent as Content-Security-Policy-Report-Only first: browsers report what
 * would be blocked (in the console, and to CSP_REPORT_URI when set) without
 * blocking anything. Switch the header name to Content-Security-Policy once
 * a few weeks of reports are clean.
 */
export function contentSecurityPolicy(env: {
  apiUrl?: string;
  reportUri?: string;
  dev?: boolean;
}): string {
  const api = originOf(env.apiUrl) || "https://api.tajirpoint.com";
  const media = "https://media.tajirpoint.com";
  const google = [
    "https://www.googletagmanager.com",
    "https://*.google-analytics.com",
    "https://*.analytics.google.com",
    "https://*.g.doubleclick.net",
    "https://www.google.com",
  ];
  const meta = ["https://connect.facebook.net", "https://www.facebook.com"];

  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      "'unsafe-inline'",
      // React's dev overlay and fast refresh need eval; production does not.
      ...(env.dev ? ["'unsafe-eval'"] : []),
      "https://www.googletagmanager.com",
      "https://connect.facebook.net",
    ],
    "style-src": ["'self'", "'unsafe-inline'"],
    "img-src": ["'self'", "data:", "blob:", media, ...google, "https://www.facebook.com"],
    "font-src": ["'self'", "data:"],
    "connect-src": ["'self'", api, ...google, ...meta, ...(env.dev ? ["ws:", "wss:"] : [])],
    "media-src": ["'self'", "blob:", media],
    "frame-src": [
      "https://www.youtube-nocookie.com",
      "https://player.vimeo.com",
      "https://www.googletagmanager.com",
    ],
    "worker-src": ["'self'", "blob:"],
    "manifest-src": ["'self'"],
    "form-action": ["'self'"],
    "base-uri": ["'self'"],
    "object-src": ["'none'"],
    // Same rule as X-Frame-Options: SAMEORIGIN.
    "frame-ancestors": ["'self'"],
  };

  const report = originOf(env.reportUri) ? env.reportUri : "";
  if (report) directives["report-uri"] = [report];

  return Object.entries(directives)
    .map(([name, values]) => `${name} ${values.join(" ")}`)
    .join("; ");
}

/**
 * Every other security header. X-XSS-Protection is "0": the old XSS
 * auditor it controlled is gone from every current browser, and "1;
 * mode=block" could be abused in the ones that still had it (OWASP advice).
 */
export function securityHeaders(env: {
  apiUrl?: string;
  reportUri?: string;
  dev?: boolean;
}): Array<{ key: string; value: string }> {
  return [
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "X-Frame-Options", value: "SAMEORIGIN" },
    { key: "X-XSS-Protection", value: "0" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value:
        "camera=(), microphone=(), geolocation=(), payment=(), usb=(), serial=(), bluetooth=(), browsing-topics=()",
    },
    { key: "Content-Security-Policy-Report-Only", value: contentSecurityPolicy(env) },
  ];
}

/**
 * The IndexNow key from INDEXNOW_KEY, or "" when it is unset or not a valid
 * key (8–128 characters: letters, digits and dashes, per indexnow.org).
 */
export function indexNowKey(value: string | undefined): string {
  const v = value?.trim() ?? "";
  return /^[A-Za-z0-9-]{8,128}$/.test(v) ? v : "";
}
