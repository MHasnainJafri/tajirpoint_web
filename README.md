# Tajir Point — Web Frontend

Production-grade Next.js 16 SaaS frontend scaffold. SEO-first architecture.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, Server Components default) |
| Language | TypeScript (strict + `noUncheckedIndexedAccess`) |
| Styles | Tailwind CSS v4 + CSS custom properties (design tokens) |
| Components | shadcn/ui primitives (add via CLI) |
| Theme | `next-themes` (class strategy) |
| Forms | `react-hook-form` + `zod` |
| Client state | `@tanstack/react-query` |
| Icons | `lucide-react` |
| Unit tests | Vitest + Testing Library |
| E2E tests | Playwright |
| Linting | ESLint flat config + `eslint-plugin-jsx-a11y` |
| Formatting | Prettier |
| Git hooks | Husky + lint-staged |
| CI | GitHub Actions |
| Package manager | pnpm |

---

## Folder structure

```
src/
  app/
    (marketing)/          # Public, SEO-critical pages — static generation
      layout.tsx          # Nav + Footer wrapper
      page.tsx            # /
      pricing/            # /pricing
      features/[slug]/    # /features/:slug  (generateStaticParams)
      blog/               # /blog  +  /blog/:slug  (ISR-ready)
      about/              # /about
      contact/            # /contact
      login/              # /login  (noindex)
    (app)/                # Authenticated dashboard — SSR, noindex
      layout.tsx          # Auth guard + Sidebar
      dashboard/          # /dashboard
      settings/           # /settings
    layout.tsx            # Root: fonts, ThemeProvider, QueryProvider, JSON-LD
    sitemap.ts            # Generated sitemap
    robots.ts             # robots.txt
    not-found.tsx
    error.tsx
    global-error.tsx
  components/
    seo/                  # JsonLd, Breadcrumbs
    shared/               # Container, Section, Prose, PageHeader
    marketing/            # Hero, FeatureGrid, PricingTable, CTASection, LogoCloud, Nav, Footer
    app/                  # DashboardShell, Sidebar
    providers/            # ThemeProvider, QueryProvider
    ui/                   # shadcn primitives (populated via CLI)
  features/               # Feature-sliced modules
    auth/                 # LoginForm, types
    billing/              # types
    contact/              # ContactForm
  lib/
    config/site.ts        # SINGLE source of truth: name, url, nav, social
    seo/metadata.ts       # buildMetadata() — called by every public page
    seo/schemas.ts        # JSON-LD schema builders (Organization, Article, FAQ…)
    utils/cn.ts           # clsx + tailwind-merge helper
    api/client.ts         # Thin fetch wrapper for React Query
  hooks/                  # Cross-feature hooks
  styles/
    globals.css           # Tailwind @theme tokens + semantic CSS vars
  types/
    index.ts              # Shared TS types
  tests/
    setup.ts              # Vitest + Testing Library setup
    e2e/                  # Playwright specs
  env.ts                  # Zod env validation — fails at boot if vars missing
```

---

## Commands

```bash
pnpm dev          # Start dev server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # ESLint
pnpm lint:fix     # ESLint --fix
pnpm typecheck    # tsc --noEmit
pnpm format       # Prettier write
pnpm test         # Vitest unit tests
pnpm test:watch   # Vitest watch
pnpm test:e2e     # Playwright E2E
pnpm analyze      # Bundle analyzer (ANALYZE=true next build)
```

---

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical base URL (e.g. `https://tajirpoint.com`) |
| `NEXT_PUBLIC_API_URL` | No | Backend API base URL |

The app validates env vars at boot via `src/env.ts` — missing required vars crash the server immediately with a clear error.

---

## Adding a new public page

1. Create `src/app/(marketing)/<route>/page.tsx`
2. Export `generateMetadata` using `buildMetadata()` from `@/lib/seo/metadata`
3. Add one `<h1>`, use semantic landmarks (`<main>`, `<section>`, `<article>`)
4. Add a `<JsonLd>` server component with the relevant schema from `@/lib/seo/schemas`
5. Add the route to `src/app/sitemap.ts`
6. Check: `pnpm typecheck && pnpm lint && pnpm build`

### SEO checklist (every public page)

- [ ] `generateMetadata` with unique `title`, `description`, canonical, OG, Twitter
- [ ] Single `<h1>`, logical heading hierarchy
- [ ] Semantic landmarks — `<main>`, `<nav>`, `<article>`, `<section>`
- [ ] Relevant JSON-LD rendered server-side
- [ ] `next/image` for all images with `width`, `height`, and `alt`
- [ ] Internal links via `next/link`, descriptive anchor text
- [ ] Listed in `sitemap.ts`
- [ ] No `"use client"` at the page root

---

## Adding a new marketing section

The landing page in `src/app/(marketing)/page.tsx` composes section components from `src/components/marketing/sections/`. Follow this pattern to add one:

1. **Create the section file** in `src/components/marketing/sections/MyNewSection.tsx`:

   ```tsx
   import { Section } from "@/components/shared/Section";
   import { Container } from "@/components/shared/Container";
   import { SectionHeader } from "@/components/shared/SectionHeader";
   import { Eyebrow } from "@/components/shared/Eyebrow";

   export function MyNewSection() {
     return (
       <Section tone="light">          {/* light | light-2 | dark */}
         <Container>                    {/* default 1320px | tight 1140px */}
           <SectionHeader right="Right-side paragraph copy.">
             <Eyebrow>Eyebrow text</Eyebrow>
             <h2 className="display-2">Section heading.<br/>Two lines.</h2>
           </SectionHeader>

           {/* your content */}
         </Container>
       </Section>
     );
   }
   ```

2. **Compose into the page** by importing and placing it in `src/app/(marketing)/page.tsx`:

   ```tsx
   import { MyNewSection } from "@/components/marketing/sections/MyNewSection";
   // …
   <Hero />
   <MyNewSection />     {/* ← here */}
   <ThreeSurfaces />
   ```

### Building blocks you already have

| Block | Use for |
|---|---|
| `<Container size="default \| tight">` | 1320px or 1140px max-width with side gutters |
| `<Section tone="light \| light-2 \| dark" spacing="default \| compact">` | 160px (default) or 120px (compact) vertical padding, white / `#fafafa` / `#0a0a0a` backgrounds |
| `<SectionHeader right="…">{eyebrow + h2}</SectionHeader>` | Standard section header layout (left H2 + right paragraph) |
| `<Eyebrow withDot variant="on-light \| on-dark">` | Decorative line + small caps label |
| `<Button variant="primary \| mint \| ghost \| soft \| dark-ghost" size="md \| sm" asChild>` | All button variants with `Link` via `asChild` |
| `<Mark variant="on-light \| on-dark">` | Cart-icon SVG mark |
| `<Lockup variant="on-light \| on-dark" size="md \| sm">` | Full brand lockup |

### Type scale utilities (defined in `globals.css`)

| Class | Size | Use |
|---|---|---|
| `.display-1` | clamp(48, 8.4vw, 124) | H1 only (hero) |
| `.display-2` | clamp(40, 6vw, 88) | Section H2 |
| `.display-3` | clamp(32, 4.4vw, 64) | Sub-section H3 |
| `.lead` | 20px | Lead paragraph under H2 |

### Color tokens (use `var(--color-*)` in CSS, never raw hex)

| Token | Hex | Use |
|---|---|---|
| `--color-bg` | `#ffffff` | Default page bg |
| `--color-bg-2` | `#fafafa` | Section bg variant |
| `--color-bg-3` | `#f4f4f3` | Pill / chip bg |
| `--color-line` | `#ebebea` | Borders |
| `--color-ink` | `#0a0a0a` | Primary text + dark surfaces |
| `--color-muted` | `#525252` | Secondary text |
| `--color-mint` | `#00d27a` | Accent only — CTAs and highlights |
| `--color-mint-soft` | `#e7faf0` | Mint tint background |
| `--color-forest` | `#0e3b2c` | Brand green for icon tiles |

### Adding a section to the sitemap

If your new section is a route (not just a part of `/`), add it to `src/app/sitemap.ts`:

```ts
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteConfig.url, ... },
    { url: `${siteConfig.url}/your-new-route`, lastModified: new Date(), priority: 0.8 },
  ];
}
```

---

## Adding a new component

**Decide which tier it belongs to:**

| Tier | Location | Rule |
|---|---|---|
| Primitive | `components/ui/` | No business logic. Add via shadcn CLI. |
| Generic | `components/shared/` | Composed, reusable across multiple features. |
| Business | `components/marketing/` or `components/app/` | Domain-aware. |
| Feature-specific | `features/<x>/components/` | Used by exactly one feature. |

Promote from feature-specific → shared only when a **second** feature needs it.

Every reusable component should:
- Use `cva` for variants, not conditional `className` props
- Forward `ref` and spread `...props` to the root element
- Export its `Props` type

---

## Adding shadcn/ui components

```bash
pnpm dlx shadcn@latest add button
pnpm dlx shadcn@latest add card input label
```

Components land in `src/components/ui/`. The `components.json` config points shadcn at `src/styles/globals.css` for tokens.

---

## Design tokens

All semantic tokens live in `src/styles/globals.css` as CSS custom properties. Components reference tokens directly — never raw Tailwind colour names.

```css
/* Light */
--color-bg, --color-bg-subtle
--color-fg, --color-fg-muted, --color-fg-subtle
--color-border, --color-border-strong
--color-accent, --color-accent-fg, --color-accent-hover
--color-destructive, --color-success, --color-warning
```

Dark-mode values are declared in `.dark { }` in the same file. `next-themes` toggles the `class="dark"` on `<html>`.

---

## Auth

The `(app)` layout (`src/app/(app)/layout.tsx`) contains a `getSession()` stub. Wire up your auth provider there:

- **next-auth**: `import { auth } from "@/lib/auth"` and replace the stub
- **Clerk**: use `auth()` from `@clerk/nextjs`
- **Custom JWT**: read from a cookie / header in `getSession()`

The `redirect("/login")` call is commented out by default so the dashboard is accessible during development.

---

## Route rendering strategy

| Route group | Strategy | Reason |
|---|---|---|
| `(marketing)` | Static generation (`force-static` default) | SEO — crawlers need full HTML |
| `(marketing)/blog/[slug]` | ISR-ready (`revalidate` when CMS is wired) | Fresh content without full rebuild |
| `(marketing)/features/[slug]` | `generateStaticParams` | Known slugs, fully pre-rendered |
| `(app)` | SSR / dynamic | Auth-gated, `noindex`, no caching needed |

---

## CI

GitHub Actions (`.github/workflows/ci.yml`) runs on every push and PR to `main`/`develop`:

1. Install (`--frozen-lockfile`)
2. `pnpm typecheck`
3. `pnpm lint`
4. `pnpm test`
5. `pnpm build`
