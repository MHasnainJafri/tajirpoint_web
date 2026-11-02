# Marketing site performance pass (TP-485, part 1) — 2 Nov 2026

Branch `feat/mkt-perf-2026-11-02` (from `feat/marketing-overhaul-2026-11-01` @ `a3a9d62`).

## How it was measured

- `pnpm build` + `pnpm start -p 3311` in this worktree, Lighthouse 12.8.2 CLI, headless Chrome,
  default mobile (simulated slow 4G, 4x CPU) and `--preset=desktop` for `/` and `/pricing`.
- Same Mac, same API data (live `api.tajirpoint.com` plans + add-ons), before and after.
- Local runs have ~10 ms TTFB and a fast CPU (benchmark index ~3000), so TBT is far lower than
  on the live site and LCP is mostly the simulated network cost of what loads before first paint.
  Lighthouse's simulated LCP swings ±0.4 s between identical runs here; `/` and `/pricing`
  "after" are the median of 5 runs. Raw JSON: scratchpad `perf/lane-perf/{before,after,final,repeat}/`.
- Live baseline (1 Nov, `Claude Shift/marketing-overnight-2026-11-01/lighthouse-baseline/`):
  `/` 90, `/pricing` 67 (TBT 1,300 ms), `/extensions` 87. Live is an older build (main 19-2).

## Before / after (local production build)

| Page (mobile unless noted) | Perf before | Perf after | LCP before | LCP after | TBT before | TBT after |
|---|---|---|---|---|---|---|
| `/` | 89 | 92 (median of 5) | 3.67 s | 3.32 s | 34 ms | 27 ms |
| `/pricing` | 89 | 95 (median of 5) | 3.70 s | 2.95 s | 18 ms | 16 ms |
| `/extensions` | 90 | 93 | 3.55 s | 3.17 s | 16 ms | 15 ms |
| `/extensions/accounting-gl` | 90 | 93 | 3.55 s | 3.16 s | 17 ms | 13 ms |
| `/get-a-call` | 89 | 93 | 3.70 s | 3.24 s | 26 ms | 14 ms |
| `/book-demo` | 89 | 92 | 3.69 s | 3.40 s | 14 ms | 16 ms |
| `/business/restaurants` | 90 | 91 | 3.55 s | 3.42 s | 17 ms | 16 ms |
| `/` desktop | 100 | 100 | 0.80 s | 0.74 s | 0 | 0 |
| `/pricing` desktop | 100 | 100 | 0.76 s | 0.69 s | 0 | 0 |

CLS stays 0.000–0.003 everywhere.

Bytes and main thread (one run each, before → after):

| Page | JS (gzip) | Total transfer | Main-thread work |
|---|---|---|---|
| `/` | 288 → 258 KiB | 621 → 589 KiB | 2,009 → 1,694 ms |
| `/pricing` | 275 → 245 KiB | 452 → 402 KiB | 675 → 589 ms |
| `/extensions` | 237 → 237 KiB | 521 → 458 KiB | 650 → 577 ms |

Fonts preloaded on every page: 4 files (~85 KiB) → 1 file (Geist sans, latin).

## What changed

1. **Fonts** (`src/app/[locale]/layout.tsx`): Geist Mono and Reem Kufi now `preload: false`.
   Every English page used to preload two Arabic-script font files it never draws, plus the mono
   face used only for small labels; they competed with the hero text on slow phones. Both still
   load (with `display: swap`) when a page actually uses them (Reem Kufi only on `/ur`, `/ar`).
2. **Hero text paints on the first frame** (`src/styles/globals.css`): the `tpFadeUp` / `tpRise`
   entrance keyframes no longer start at `opacity: 0` (they still rise 14 px). Text that starts
   transparent is not counted as painted until the fade ends; these run on the H1/intro of
   `/pricing`, `/extensions`, every `/features/*` page and the pill badge primitive. No page file
   needed editing. The home hero already had no entrance animation.
3. **Pricing cards are server HTML** (`PlanCards.tsx` + new `PlanBilling.tsx`): the cards no longer
   hydrate. Each card renders its monthly price and, when the API sells it yearly, its yearly
   price; the small client island `PlanBilling` only flips `data-billing` on a wrapper and CSS
   shows the right one. Plan-click analytics (`select_plan`, same fields) is one delegated click
   listener reading `data-plan` / `data-annual` / `data-contact-sales`. This also stops shipping
   `zod` (via `lib/api/plans.ts`) to the browser on `/pricing` and every business page.
4. **Header no longer ships the business catalogue** (`Nav.tsx`, `(marketing)/layout.tsx`): Nav
   used to import `BUSINESSES` (1,500 lines of page copy, FAQs, SEO) just for 13 names and lines.
   The layout now passes `{slug, icon, name, navLine}` in the page's language, so the catalogue
   is no longer in any browser chunk on pages without a lead form. (On `/extensions` the gzip
   total stayed ~237 KiB in this build — Turbopack re-split the shared chunks — so the clear
   win shows on pages that also had the form, items 3 and 5.)
5. **Call-back form** (`CallbackForm.tsx`, `CallbackSection.tsx`, `get-a-call/page.tsx`): the
   business-type options are passed in from the server instead of imported from
   `lib/marketing/demo.ts` (which pulls in `zod` + the business catalogue). Same options, same
   `?type=` preselect rule (a listed slug or `other`, else empty). Removes ~29 KiB gzip of JS
   from `/`, `/pricing`, `/get-a-call`.
6. **Pricing below the fold** (`pricing/page.tsx`): the migration band, FAQ, call-back form and
   final CTA sit in `content-visibility: auto` blocks with an intrinsic size, so the browser skips
   their style/layout work until they scroll near. All HTML (FAQ answers included) is still in
   the page for search and for find-in-page.
7. **next.config**: `poweredByHeader: false`; `images.minimumCacheTTL` 4 h → 7 days (same week as
   the existing `/public` cache header). The existing long-cache header for `/public` assets was
   already right; `/_next/static/*` is already `immutable`.
8. **browserslist** (`package.json`): explicit modern list — Chrome/Edge 111+, Firefox 128+,
   Safari / iOS Safari 16.4+, Samsung Internet 22+ (148 browser versions).

## Checked, not changed

- **Monthly / yearly toggle works and uses real data.** Tested in headless Chrome at 360 px
  (en and ar): Monthly shows Shop $29 / month, Business $79 / month; Yearly shows $290 / year
  and $790 / year with "Save 2 months" — straight from the API's `annual_price` (290, 790);
  Light and Enterprise stay as they are (no yearly price). No sideways scroll at 360 px on
  `/pricing`, `/ar/pricing`, `/business/restaurants`.
- **"Legacy JavaScript 14 KiB"** in Lighthouse is Next.js's own `polyfill-module`
  (Array.prototype.at, flat, flatMap, Object.fromEntries, Object.hasOwn, trimStart/End). Next
  imports it unconditionally (`next/dist/client/app-globals.js`); browserslist cannot remove it.
  Next 16 already compiles for Chrome 111 / Safari 16.4 by default, so there was no other legacy
  transpiling to drop.
- **Safari 15**: the lane brief asked for Safari 15+. Tailwind CSS v4 (this site's CSS) needs
  Safari 16.4+ (`@property`, `color-mix`, cascade layers), so on Safari 15 the layout breaks no
  matter what the JS targets. The browserslist says 16.4 so it does not claim support we do not
  have. Safari 15 is iOS 15 (2021); owner to decide whether that audience matters (see to-dos).
- **`experimental.inlineCss`** was tried and rejected: the CSS is 120 KB raw / 21 KB gzip, and Next
  inlines it twice (in `<style>` and again in the RSC payload). Home HTML went 89 → 134 KiB gzip
  and mobile LCP got worse (3.67 → 4.10 s).
- **LCP image priority**: no measured page has an image as its LCP element (it is the hero
  `<p>`/`<h1>`, a price, or the add-on search box), so no `priority` / `fetchPriority` change was
  needed. Hero showcase food photos are small (6–17 KiB) and stay lazy.

## Left for later (not this lane)

- `/book-demo` and `/contact` still ship `zod` + the business catalogue to the browser through
  `DemoForm` / `ContactForm` importing `lib/marketing/demo.ts` (~29 KiB gzip). Same fix as the
  call-back form (pass `BUSINESS_TYPE_OPTIONS` from the page).
- Home has ~3,100 DOM elements (hero showcase, signature section, mocks) and ~1.7 s of main-thread
  work under 4x throttling. Candidates: `content-visibility: auto` on below-the-fold home sections,
  rendering the hero showcase's non-active scenes only after first interaction.
- The CSS bundle is 120 KB raw: many one-off arbitrary values (`text-[13.5px]`, `p-[clamp(...)]`).
  A shared type/spacing scale would shrink it.
- Re-measure on the live site after release (real TTFB, Cloudflare): local numbers cannot reproduce
  the live 1.3 s TBT on `/pricing`, which came from the older live build plus a busy Mac.
