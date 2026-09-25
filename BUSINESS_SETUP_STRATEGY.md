# Tajir Point — Complete Business Setup, Analytics & Go-To-Market Strategy Document

This document serves as the master execution manual for launching, registering, monitoring, and scaling **Tajir Point** across all digital channels, regulatory authorities, and target industry verticals.

---

## 1. Executive Business Overview

Tajir Point is an offline-first point of sale (POS) and merchant operating system engineered for three core verticals:

1. **Restaurants, Cafés & Cloud Kitchens**: Table management, Kitchen Display System (KDS), split billing, rider dispatch.
2. **General Retail & Grocery**: Barcode scanning, inventory control, digital credit ledger (Khata), fiscal compliance (FBR/ZATCA).
3. **Wholesalers & Distributors**: Route dispatch, driver van sales app, end-of-day reconciliation, multi-warehouse inventory.

---

## 2. Business Entity & Legal Registration

Before launching commercial billing and running ads, establish formal legal compliance:

### 2.1 Corporate & Tax Registration

- **Company Registration**: Register as a Sole Proprietorship or Private Limited Company (e.g., via SECP in Pakistan or your local registrar).
- **Tax Identification**: Obtain National Tax Number (NTN) and Sales Tax Registration Number (STRN) for software / IT services.
- **Bank Account**: Open a corporate commercial bank account in the registered company name.

### 2.2 Payment Gateway Onboarding

- **Domestic Aggregators**: Onboard with merchant payment providers (JazzCash Business, Easypaisa Merchant, HBL Pay, PayFast).
- **International Gateways**: Set up Stripe, Razorpay, or merchant merchant facilities for regional subscription collections.
- **WhatsApp Business API**: Register your business number (`+923446800893`) on the official Meta WhatsApp Cloud API via a verified Business Manager.

---

## 3. Web Presence & Google Search Console

Google Search Console ensures every page across languages (`en`, `ur`, `ar`) is crawled and indexed without soft 404s.

### 3.1 Domain Property Setup

1. Open [Google Search Console](https://search.google.com/search-console).
2. Select **Domain** property and enter `tajirpoint.com`.
3. Add the provided `TXT` verification record into your DNS host (Cloudflare / Namecheap / GoDaddy):
   - **Type**: `TXT`
   - **Host / Name**: `@`
   - **Value**: `google-site-verification=...`
4. Click **Verify**.

### 3.2 Sitemap Submission

1. In Search Console, navigate to **Index** → **Sitemaps**.
2. Enter `sitemap.xml` (Full URL: `https://tajirpoint.com/sitemap.xml`).
3. Confirm status changes to **Success**. This automatically informs Google of all language paths (`/`, `/ur`, `/ar`, `/solutions/restaurants`, `/solutions/general-retail`, `/solutions/distributors`).

---

## 4. Google Analytics 4 (GA4) & Google Tag Manager (GTM)

Tracks user flow, acquisition source, and high-value conversion events.

### 4.1 GA4 Configuration

1. Open [Google Analytics](https://analytics.google.com) → **Admin** → **Create Property**.
2. Name: `Tajir Point Web`.
3. Timezone: Local Timezone (e.g., GMT+5). Currency: `PKR` or `USD`.
4. Create a **Web Data Stream**:
   - URL: `https://tajirpoint.com`
   - Stream Name: `Tajir Point Production`
5. Copy your **Measurement ID** (`G-XXXXXXXXXX`).

### 4.2 Project Connection

Add the ID into your local environment file (`.env.local`):

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

_Note: The project already includes [`AnalyticsProvider.tsx`](src/components/analytics/AnalyticsProvider.tsx) and [`events.ts`](src/lib/analytics/events.ts), which will automatically activate tracking._

### 4.3 Key Conversion Events Tracked

- `lead_trial_signup`: Triggered on "Start 14-Day Free Trial".
- `book_demo_click`: Triggered on demo booking clicks.
- `whatsapp_inquiry_click`: Triggered on direct WhatsApp chat initiations.
- `view_vertical_solution`: Tracks merchant interest per vertical.

---

## 5. Google Business Profile (Local & Maps Presence)

Establishes your verified authority panel on Google Search and Google Maps.

1. Navigate to [Google Business Profile](https://google.com/business).
2. **Business Name**: `Tajir Point`.
3. **Primary Category**: `Software company` or `Point of sale systems`.
4. **Secondary Categories**: `Computer software store`, `Business management consultant`.
5. **Service Areas**: Add target operating countries/cities.
6. **Contact Details**:
   - Website: `https://tajirpoint.com`
   - Phone: `+92 344 6800893`
7. **Service Catalog**:
   - Restaurant Point of Sale & KDS
   - Retail & Grocery POS with Barcode Billing
   - Van Sales & Wholesale Distribution System
   - Digital Khata Credit Ledger
8. **Verification**: Complete verification via Google’s automated phone, email, or video submission.

---

## 6. Meta Business Suite (Facebook & Instagram)

Connects social acquisition channels and powers conversion tracking for retargeting campaigns.

### 6.1 Meta Business Manager Setup

1. Visit [business.facebook.com](https://business.facebook.com) and create an organization with your domain email (`hello@tajirpoint.com`).
2. Verify domain ownership under **Brand Safety & Suitability** → **Domains** via DNS TXT.

### 6.2 Facebook Page

- **Page Name**: `Tajir Point`
- **Category**: `Software Company` / `Business Service`
- **Bio**: _Offline-first operating system for modern merchants — POS, inventory, Khata ledger, and delivery._
- **Profile Image**: Square white brand logo (`public/icon.svg`).
- **Cover Image**: Generated 1200×630 OpenGraph graphic (`public/og.png`).
- **Primary CTA Button**: **Send WhatsApp Message** (connected to `+923446800893`).

### 6.3 Instagram Professional Account

1. Create account `@tajirpoint`.
2. Switch to **Professional Business Account**.
3. Link the Instagram account inside Meta Business Suite under **Accounts** → **Instagram Accounts**.

### 6.4 Meta Pixel (Conversion Tracking)

1. In Meta Business Suite, go to **Events Manager** → **Connect Data Sources** → **Web**.
2. Name the pixel: `Tajir Point Web Pixel`.
3. Copy the numeric **Pixel ID** (e.g., `123456789012345`).
4. Add to `.env.local`:

```env
NEXT_PUBLIC_META_PIXEL_ID=123456789012345
```

---

## 7. Additional Professional Channels

- **LinkedIn Company Page**:
  - Name: `Tajir Point`
  - Tagline: _The Operating System for Modern Merchants._
  - Industry: Software Development / IT Services.
  - Link to website: `https://tajirpoint.com`.
- **YouTube Channel**:
  - URL handle: `youtube.com/@tajirpoint`.
  - Content bucket: 60-second vertical demos (e.g., "How to ring a sale offline", "Printing receipts on 80mm thermal printer", "Creating a KDS table order").
- **TikTok / Shorts**:
  - Real hardware tests: scanner speed, drop-in receipts, phone-based van sales.

---

## 8. Web Vitals & Technical Quality Standards

To maintain top-tier organic search ranking, maintain these Google Core Web Vitals targets:

| Metric                              | Target    | Focus Area                              |
| ----------------------------------- | --------- | --------------------------------------- |
| **LCP (Largest Contentful Paint)**  | `< 2.5s`  | Hero bento panel & font preloading      |
| **INP (Interaction to Next Paint)** | `< 200ms` | Instant DOM feedback on cart clicks     |
| **CLS (Cumulative Layout Shift)**   | `< 0.1`   | Static dimensions on images and mockups |

Test live performance using [Google PageSpeed Insights](https://pagespeed.web.dev).

---

## 9. Go-To-Market Execution Plan by Vertical

### 9.1 Restaurants, Cafés & Cloud Kitchens

- **Value Proposition**: "Zero-commission online ordering, integrated Kitchen Display System (KDS), and split billing that runs even when internet drops."
- **Sales Channel**: Direct field visits, food consultant partnerships, targeted Meta video ads demonstrating order-to-kitchen speed.
- **Landing Page**: `https://tajirpoint.com/solutions/restaurants`

### 9.2 Retail Shops & Kiryana Stores

- **Value Proposition**: "Sub-second barcode scanning, automatic WhatsApp credit reminders (Khata), and multi-counter sync without complex IT."
- **Sales Channel**: Local wholesale market activations, trade association demos, merchant referral incentives.
- **Landing Page**: `https://tajirpoint.com/solutions/general-retail`

### 9.3 Wholesale & FMCG Distribution

- **Value Proposition**: "Vans as mobile warehouses. Collect cash, log credit, track route mileage, and reconcile end-of-day cash with zero variance."
- **Sales Channel**: Direct B2B enterprise outreach, distributor agency meetings, cold demos to fleet managers.
- **Landing Page**: `https://tajirpoint.com/solutions/distributors`

---

## 10. Environment Variables Checklist (`.env.local`)

Save your verified keys in your local environment file:

```env
# Domain Base URL
NEXT_PUBLIC_SITE_URL=https://tajirpoint.com

# Analytics & Marketing
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=XXXXXXXXXXXXXXX
```
