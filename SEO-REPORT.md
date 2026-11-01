# SEO, social sharing and analytics pass — 1 Nov 2026

Branch `feat/marketing-seo-2026-11-01`. Owner ask: "Critically work on SEO so we
reach the maximum customers. Add Google Analytics. Critically work on metadata
for Meta — Facebook, WhatsApp, Instagram."

Audit method: a production build (`pnpm build`), then every prerendered page
(141 HTML files, 3 locales) parsed for title, description, canonical,
hreflang, Open Graph, Twitter, robots, h1 count, images without alt and
JSON-LD; plus the live site (tajirpoint.com) head, robots.txt, sitemap.xml and
og.png. Checklists used: the claude-seo skills in `.claude/skills/`
(seo-technical, seo-schema, seo-hreflang, seo-sitemap, seo-images, seo-geo),
run by hand (their scripts are not installed).

---

## 1. What was wrong

| # | Problem | Impact |
|---|---|---|
| 1 | **GA4 not live.** The code is wired (consent-gated GA4, Meta Pixel, GTM) but `NEXT_PUBLIC_GA_MEASUREMENT_ID` is not set on Vercel, so no tag loads. | No analytics at all. Owner action (below). |
| 2 | **Titles too long.** Home 77 chars, all 12 business pages 62–72 chars (Google cuts at ~60, so the keyword at the end was lost). | Truncated results. |
| 3 | **Descriptions too long/short.** Home 232, 12 business pages 161–231, pricing 215, several 116–137, docs pages 47–115. | Truncated or thin snippets. |
| 4 | **Duplicate content across languages.** Only home, pricing and extensions are translated. The other ~40 pages (business, features, about, contact, book-demo, get-a-call, legal, docs) are English at `/ur/…` and `/ar/…` too, yet hreflang called them Urdu and Arabic versions and the sitemap listed all three. | Google sees three near-identical English pages per URL and picks one at random. |
| 5 | **Pricing title/description English on /ur and /ar.** | Not localized. |
| 6 | **Wrong social profiles in structured data.** Organization `sameAs` listed `youtube.com/@tajirpoint`, which is **somebody else's channel ("jaunelia")**. `x.com/tajirpoint` (used as `twitter:site`) **does not exist**. Facebook, Instagram and TikTok handles could not be confirmed. | Tells Google that a stranger's channel is TajirPoint. |
| 7 | **One share image for every page.** All links shared to WhatsApp/Facebook showed the same banner. | Fewer clicks from shares. |
| 8 | **No PNG icons.** apple-touch-icon was an SVG (iOS ignores it, so "Add to Home Screen" and iMessage/WhatsApp-on-iOS link icons fell back to a screenshot). The manifest had only SVG icons (Chrome wants 192/512 PNG + maskable). | Poor home-screen/icon display; site not installable. |
| 9 | **No verification tags** for Google Search Console, Bing, Meta domain verification; no `fb:app_id`. | Owner cannot verify ownership by meta tag. |
| 10 | **Brand spelled two ways** ("Tajir Point" in titles/og:site_name, "TajirPoint" everywhere else). | Weaker brand entity. |
| 11 | **H1s missed the search terms.** e.g. business pages' h1 "From the table to the kitchen to the rider — one system." never said "restaurant POS". Feature h1s never said "khata", "offline POS", "van sales". | Weaker relevance for the main queries. |
| 12 | `operatingSystem` claimed **iOS** in SoftwareApplication markup; the site itself says iOS is "coming soon". | Markup contradicting the page. |
| 13 | Sitemap had no `lastmod`; no BreadcrumbList on feature/other pages; Organization logo was SVG; no `@id` links between entities. | Minor. |
| 14 | No "pricing viewed" or phone/email click events. | Missing high-intent signals for ads. |

## 2. What changed

**Metadata (`src/lib/seo/metadata.ts`)**
- `TRANSLATED_PATHS` = `/`, `/pricing`, `/extensions`. Translated pages keep the
  full en/ur/ar + `x-default` hreflang cluster. Untranslated pages now have ONE
  canonical (English); their /ur and /ar copies point their canonical at it and
  carry no hreflang. `canonicalUrl()` helper for breadcrumbs/JSON-LD.
- Title = `Page | TajirPoint` only when it fits 60 chars, else the page title
  alone. `fitDescription()` keeps API-driven descriptions (pricing) ≤ 160.
- Open Graph: absolute canonical `og:url`, `og:site_name`, `og:locale` +
  `og:locale:alternate` (en_US / ur_PK / ar_AE; English for untranslated pages),
  image with `secure_url`, `type`, `width`, `height`, `alt`. Twitter
  `summary_large_image` with image alt; `twitter:site` only when a real X
  account is configured.
- Root layout: robots `index, follow` + googlebot `max-image-preview:large,
  max-snippet:-1, max-video-preview:-1`; `applicationName`, `publisher`,
  PNG icons, PNG apple-touch-icon; verification tags from env.

**Every page now fits** (en audit after the change): titles 26–60, descriptions
140–160 on every marketing page; home/pricing localized in ur/ar
(`messages/*.json` `landing.meta`, new `landing.pricingMeta`). Rewritten for
real search intents without new claims: "POS system", "restaurant POS",
"takeaway", "khata app", "offline POS", "grocery & kiryana store POS",
"pharmacy / medical store software", "mobile shop POS IMEI", "van sales
software", "distribution software", "accounting software". Business eyebrows
became keyword phrases ("Restaurant POS system") and are now part of the h1
(styled exactly as before). Feature h1s include their keyword.
FBR: the e-invoicing page and llms.txt say plainly that regulatory connectors
(FBR, ZATCA) are not yet released — the backend has an FBR client but the site
already promises nothing, so the keyword is used honestly.

**Social share cards** — `src/app/og/[image]/route.tsx`, `src/lib/seo/og-cards.ts`,
`src/lib/seo/og-image.tsx`: 26 cards, 1200×630 PNG, ~80–95 KB each (WhatsApp
limit ~300 KB), rendered at build: home, pricing, business index + 12
businesses, 5 features, book-demo, get-a-call, about, contact, extensions,
docs. Served at `/og/<id>.png` (dotted path → never redirected by the locale
proxy; Facebook/WhatsApp drop images behind redirects). `/og.png` (default for
legal/docs pages) now uses the same design. Cards are English on all locales
(the image renderer has no Urdu Nastaliq shaping). The `/extensions` page picks
its card up automatically through `buildMetadata` — the extension pages were
not touched.

**Structured data (`src/lib/seo/schemas.ts`)**
- Organization: `@id`, `alternateName` ("Tajir Point"…), raster 512 logo,
  `sameAs` ONLY from env (none by default), contact points. No LocalBusiness:
  there is no street address (owner decision 10 Oct).
- WebSite: `@id`, `inLanguage`, `publisher` → Organization. No SearchAction
  (no search page).
- SoftwareApplication: `@id`, `publisher`, `image`, `operatingSystem` "Web,
  Windows, macOS, Linux, Android" (as the FAQ says), offers still built only
  from the plans API (no invented prices).
- BreadcrumbList on business, features, pricing, book-demo, get-a-call, about,
  contact (canonical URLs). FAQPage unchanged where FAQs exist.

**Technical**
- `sitemap.ts`: only canonical URLs (53: translated pages ×3, the rest English
  once), real per-page `lastmod` (content-change dates, not build time).
- `robots.ts`: allow all (incl. AI search crawlers), disallow only `/api/`,
  sitemap link. Removed the non-existent `/dashboard/` `/settings/` rules.
- `manifest.ts`: id/scope/lang, PNG 192 + 512 + maskable 512, categories.
- PNG icons generated from the brand SVG: `public/brand/png/*`,
  `public/apple-touch-icon.png` (180×180, full-bleed).
- Brand unified to **TajirPoint** (site name, titles, docs, aria-labels).
- Footer links to the businesses index; `llms.txt` updated (Urdu/Arabic home,
  honest e-invoicing line).
- Docs reference descriptions padded to full snippets.

**Analytics**
- Consent Mode v2 is in place: `ad_storage`, `ad_user_data`,
  `ad_personalization`, `analytics_storage` default **denied**, updated to
  granted on Accept. Nothing loads before Accept anywhere (strictest, valid in
  every region). Do Not Track / GPC count as Reject.
- Route-change page views: GA4 Enhanced Measurement ("page changes based on
  browser history events", on by default) and the Pixel count app-router
  navigations; we do not send our own (would double count).
- Events: `generate_lead` (demo form, call-back form, contact form — success
  only), `sign_up_click`, `book_demo_click`, `whatsapp_click`, `select_plan`,
  `view_business_page`, **new** `view_pricing` (pricing page) and
  `contact_click` (tel:/mailto:). Meta Pixel: Lead, Schedule, Contact,
  ViewContent, custom StartFreeClick/PlanSelected.
- New env vars, documented in `.env.example` and `src/env.ts`.

**Tests** (updated by reading, not run — owner rule): `businesses.test.ts`
now enforces title + " | TajirPoint" ≤ 60, description 140–160, no duplicate
keywords.

## 3. Owner to-do (we cannot do these)

1. **Google Analytics 4**: analytics.google.com → create property "TajirPoint"
   → Web data stream `https://tajirpoint.com` → copy the Measurement ID
   (`G-…`). In Vercel → tajirpoint web project → Settings → Environment
   Variables (Production): `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-…` → redeploy.
   In GA4 → Admin → Events, mark as **key events**: `generate_lead`,
   `sign_up_click`, `whatsapp_click`, `book_demo_click` (optional
   `view_pricing`). Keep Enhanced Measurement "Page changes based on browser
   history events" ON.
2. **Google Search Console**: add property `https://tajirpoint.com/` → HTML tag
   method → put only the `content` value in `GOOGLE_SITE_VERIFICATION` →
   redeploy → Verify → submit `https://tajirpoint.com/sitemap.xml`. (A Domain
   property via DNS TXT in Cloudflare is even better and needs no env var.)
3. **Bing Webmaster Tools**: import from Search Console, or meta-tag method →
   `BING_SITE_VERIFICATION`.
4. **Meta**: Business Manager → Brand safety → Domains → add tajirpoint.com →
   meta-tag method → `FACEBOOK_DOMAIN_VERIFICATION`. Events Manager → create a
   Pixel → `NEXT_PUBLIC_META_PIXEL_ID` (digits). Optional Meta app id →
   `FACEBOOK_APP_ID`. After deploy, re-scrape key URLs in the Sharing Debugger
   (developers.facebook.com/tools/debug) so WhatsApp/Facebook drop the old
   cached preview.
5. **Social profiles**: create/claim real Facebook, Instagram, LinkedIn,
   YouTube, TikTok, X accounts, then set `SOCIAL_FACEBOOK_URL`,
   `SOCIAL_INSTAGRAM_URL`, `SOCIAL_LINKEDIN_URL`, `SOCIAL_YOUTUBE_URL`,
   `SOCIAL_TIKTOK_URL`, `SOCIAL_X_HANDLE`. Note `youtube.com/@tajirpoint` is
   taken by someone else.
6. **Google Business Profile**: only possible with a real address or a
   service-area business; needs a decision (no street address is published).
7. **Decide on the cookie banner for Pakistan**: today nothing is tracked until
   Accept, everywhere. Many visitors never click, so GA4 will under-count. A
   region-based setup (banner + denied default only for EEA/UK, granted
   elsewhere) would count far more but changes the cookie policy — owner/legal
   decision.
8. The add-on (extensions) helper should add any new `/extensions/<slug>`
   pages to `sitemap.ts` (`PAGES`) and `og-cards.ts`, and give
   `extensions.meta.description` (116 chars en, ~90–108 ur/ar) a 140–160 char
   rewrite.

## 4. Checklist results (claude-seo skills, by hand)

**seo-technical** — Crawlability: robots.txt valid, sitemap declared ✅;
nothing important blocked ✅; key pages ≤ 2 clicks (nav + footer link every
business, feature, pricing, book-demo, get-a-call) ✅; SSR/SSG, all content and
JSON-LD in the initial HTML ✅. Indexability: self-canonical on every canonical
URL ✅ (fixed); locale duplicates ✅ (fixed); 404s get `noindex`
automatically ✅; no thin pages except docs reference pages ⚠️. Security:
HTTPS, X-Frame-Options, nosniff, Referrer-Policy ✅; HSTS ✅ (Vercel sends
`max-age=63072000`); no Content-Security-Policy ⚠️.
URLs: clean, hyphenated, no trailing slashes, single-hop permanent redirects
for old paths ✅. Mobile: viewport, theme-color ✅. Core Web Vitals: not
measured (no CrUX/PSI access) — check PageSpeed Insights after GA4 is live.
IndexNow: not implemented ❌ (Bing/Yandex only; low priority).

**seo-hreflang** — self-reference ✅, return tags ✅, x-default ✅, ISO codes
(en/ur/ar) ✅, hreflang only on canonical URLs ✅ (fixed), same protocol ✅,
content parity ❌ for untranslated pages → solved by canonicalising them to
English rather than claiming translations. Hreflang in both HTML and sitemap
(Low; consistent, kept).

**seo-schema** — JSON-LD only ✅; @context/@type everywhere ✅; absolute URLs ✅;
no deprecated types ✅; Organization/WebSite/SoftwareApplication/
BreadcrumbList valid shapes ✅; FAQPage kept (Info: Google retired FAQ rich
results 7 May 2026; harmless, accurate); no aggregateRating (no real reviews)
— correct; no LocalBusiness (no address) — correct.

**seo-sitemap** — valid XML ✅, < 50k ✅, only canonical 200 URLs ✅ (fixed),
real lastmod ✅ (fixed), referenced in robots ✅, priority/changefreq kept for
Bing (Info).

**seo-images** — every `<img>` has alt ✅ (audit: 0 missing); OG images
1200×630, < 100 KB ✅; PNG icons ✅ (fixed).

**seo-geo** — AI search crawlers allowed ✅; llms.txt present and current ✅
(no ranking weight — Google ignores it); clear entity (Organization @id,
alternateName) ✅; citable passages: FAQs ✅; sameAs ❌ until real profiles exist.

## 5. Still missing — prioritised

1. **Translate the business and feature pages into Urdu (then Arabic).** The
   Urdu market is the biggest; today only home/pricing rank in Urdu. When a
   page is translated, add it to `TRANSLATED_PATHS`.
2. **Local landing pages** with real local content: "POS system in Pakistan",
   Lahore / Karachi / Islamabad, "POS for UK takeaways" (Hey Orders market),
   Gulf (VAT). Max ~10–20, each with unique copy, never city-swapped templates.
3. **Comparison / alternative pages**: "TajirPoint vs paper khata", vs Excel,
   vs common local POS brands — high-intent, low competition.
4. **Guides / blog**: "how to start a kiryana store POS", "FBR POS integration
   explained" (once live), "khata app vs notebook", pharmacy expiry (FEFO).
5. **Case studies** from real shops (FM Computers, restaurant demo) with
   photos and numbers — also the E-E-A-T signal Google wants.
6. **Reviews**: collect Google reviews (needs Business Profile) and on-site
   testimonials; add Review/AggregateRating markup only once real.
7. **Backlinks**: Pakistani business directories, P@SHA, chambers of
   commerce, hardware partners (Senraise, printer vendors), Play Store listing
   linking back, guest posts.
8. **Play Store / App Store links** on the site once the apps are public
   (and `appLinks`/SoftwareApplication `downloadUrl`).
9. IndexNow for Bing; a Content-Security-Policy header; `/favicon.ico`
   (404 today; browsers and some crawlers still request it).
10. Urdu share cards (needs a Nastaliq font bundled into the image renderer).
