# Homepage images — slots and briefs

Eleven slots, in two groups that need completely different treatment:

- **Part 1 — five POS screens** in the hero's device frame. These are
  **screenshots of your own app**, not generated art. See the warning below.
- **Part 2 — six photographs** further down the page. These are the ones to
  generate.

**To fill any slot:** save the file as `public/images/<slot-id>.jpg` (`.png`,
`.webp` and `.avif` also work). The `<Shot>` component picks it up on the next
render — no code change, no config. In dev the folder is re-read on every
request, so a refresh is enough; production picks it up at build.

Export at the pixel size listed for each slot, sRGB, quality ~80. Don't
pre-compress hard — `next/image` re-encodes to AVIF/WebP and serves the right
size per device.

---

# Part 1 — POS screens (hero device frame)

The hero has a tab per trade, and each tab shows that trade's screen inside the
device. Retail currently falls back to the coded POS mock, so the hero looks
finished today; the other four show placeholders.

**All five share one aspect — 1857 × 911 (≈ 2:1)** so switching tabs never
shifts the layout. That is exactly a maximised browser window on a 1080p
screen, which is the point: capture the real app.

> ### Don't generate these with an image model
>
> Every one of these is a dense interface full of numbers, table headers and
> button labels. Image models garble small text, and a POS screenshot with
> misspelt column headings is the single fastest way to make a product look
> fake — the exact problem this redesign is fixing. Generated UI also can't
> show a feature you actually ship.
>
> **Capture them instead.** You already have the four demo tenants seeded on
> the app (retail / restaurant / electronics / wholesale). Log into each, set
> the screen up, and take a browser screenshot:
>
> 1. Browser window at **1857 × 911** (or any 2:1 window — F11 fullscreen on a
>    1920×1080 display is close enough), zoom at 100%.
> 2. Hide anything personal: real customer names, real phone numbers, your own
>    email in the account menu. The demo tenants are already safe.
> 3. Capture at 2× (retina) if you can — a 3714 × 1822 PNG. Otherwise 1857 ×
>    911 is fine; it still renders at ~1.5× the displayed size.
> 4. Save as the filename below. No cropping needed.
>
> If you'd rather not do this by hand, say so — I can script the captures with
> Playwright against the demo logins and drop the files straight in.

| Slot           | File                   | What to capture                                                                                                                                                 |
| -------------- | ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Retail         | `pos-retail.jpg`       | Checkout screen mid-sale: 2–3 items in the cart, product grid visible, total showing. _Optional — the coded mock covers this one until you replace it._         |
| Restaurants    | `pos-restaurants.jpg`  | The floor plan: tables laid out with a mix of free / occupied / printed states, a couple of timers running. This is the screen that sells the restaurant story. |
| Electronics    | `pos-electronics.jpg`  | A sale with a serial/IMEI captured — the serial picker open, or a line item showing its IMEI.                                                                   |
| Distribution   | `pos-distribution.jpg` | A route or trip screen: the day's stops with delivered / in-progress status, or van stock loaded for a trip.                                                    |
| Every business | `pos-all.jpg`          | The payment screen — tender selection with cash / card / wallet and a split showing.                                                                            |

**If you truly want to generate one anyway** (last resort, retail only, where
the coded mock already sets the composition):

> A clean, modern point-of-sale application interface on a light background,
> landscape 2:1. Left third is an order panel listing a few line items with
> prices; right two-thirds is a grid of colourful square product tiles. A green
> primary action bar sits at the bottom of the order panel. Flat UI design,
> soft neutral greys, generous spacing, thin dividers, no gradients or
> skeuomorphism. Rendered as a crisp screenshot, not a photograph, no device
> frame, no perspective, no shadow.
>
> Negative: `garbled text, lorem ipsum, misspelt words, watermark, logo, cursor, browser chrome, phone frame, 3D perspective, drop shadow, glow`

Expect to redo the text afterwards — this is a stopgap, not a substitute for a
real capture.

---

# Part 2 — Photography

## House style — apply to every prompt

The site's problem today is that it looks generic. These photos are the main
fix, so they have to look like **real Pakistani shops**, not international
stock photography and not obviously synthetic.

- **Documentary/editorial, not advertising.** Natural available light, a real
  room, honest clutter. No studio seamless, no lens flare, no floating UI.
- **Local, specifically.** Pakistani shopkeepers and customers, local clothing
  (shalwar kameez, kurta, dupatta), local product mix, local street furniture.
  Shot in Lahore/Karachi/Faisalabad-type settings.
- **Warm neutral grade.** Slightly warm white balance, gentle contrast, no
  teal-and-orange, no heavy vignette, no HDR crunch.
- **35–50mm look**, eye level, subject sharp, background falling off softly
  (f/2.8–f/4). Nothing shot from a drone or a dramatic low angle.
- **Screens stay dim and unreadable.** Never render fake UI in the photo — the
  product UI is shown separately in the coded mock. A tablet showing an
  indistinct light interface is right; a legible fake dashboard is not.
- **No text anywhere.** No signage, no brand marks, no receipts with writing —
  generated lettering is the fastest way to look fake. If a sign is
  unavoidable, keep it out of focus.
- **People:** one or two at most, hands doing something real. No eye contact
  with the camera, no crossed-arms hero poses, no smiling stock models.

**Negative prompt for every image:** `text, letters, signage, logos, watermark,
extra fingers, deformed hands, plastic skin, oversaturated, HDR, teal and
orange grade, studio backdrop, floating UI overlays, glowing holograms, stock
photo smile, western supermarket`

---

## 1. `who-single` — "A single counter"

- **File:** `public/images/who-single.jpg`
- **Ratio:** 4:3 · **Export:** 1600 × 1200
- **Where:** _Built for the way Pakistani shops actually sell_, card 1
- **Job:** the one-counter shop owner has to see themselves immediately.

> A Pakistani shopkeeper in his forties standing behind the counter of his own
> small neighbourhood shop, hand resting near a tablet on a counter stand and a
> small receipt printer. Shelves of everyday goods packed tight behind him.
> Daylight coming in from the shopfront on the left. Documentary photography,
> 35mm, f/2.8, warm neutral grade, shallow depth of field on the shelves. He is
> looking down at the counter, mid-task, not posing. No text or signage.

## 2. `who-multi` — "Several branches"

- **File:** `public/images/who-multi.jpg`
- **Ratio:** 4:3 · **Export:** 1600 × 1200
- **Where:** card 2
- **Job:** visibly bigger operation — more space, more staff, more order.

> Interior of a larger, well-organised Pakistani retail store — a garments or
> general store with wide aisles and neat shelving. Two staff members in
> matching plain shirts, one helping a customer, one at a checkout counter with
> a tablet and barcode scanner. Bright even ceiling light mixed with daylight
> from the entrance. Editorial retail photography, 35mm, f/4, warm neutral
> grade, calm and uncluttered. No text or signage.

## 3. `who-mobile` — "On the road"

- **File:** `public/images/who-mobile.jpg`
- **Ratio:** 4:3 · **Export:** 1600 × 1200
- **Where:** card 3
- **Job:** distribution and van sales — selling away from the shop.

> A Pakistani distribution salesman standing at the open rear doors of a small
> delivery van stacked with cartons, holding a rugged Android phone in one hand
> while handing goods to a shopkeeper. Morning light, a dusty local market
> street behind them. Documentary photography, 35mm, f/3.5, warm neutral grade,
> motion and dust in the air. Faces in profile, mid-transaction. No text,
> no visible brand marks on the van or cartons.

## 4. `eco-back-office` — "Back office"

- **File:** `public/images/eco-back-office.jpg`
- **Ratio:** 16:11 · **Export:** 1600 × 1100
- **Where:** ecosystem collage, left card
- **Job:** the owner reviewing the business away from the counter.

> Over-the-shoulder view of a woman's hands typing on a laptop at a simple desk
> in the back room of a shop, stock cartons and a filing shelf softly out of
> focus behind. The laptop screen is bright but the interface is not readable.
> Warm afternoon window light from the left. Documentary photography, 50mm,
> f/2.8, warm neutral grade. No text, no readable screen content.

## 5. `eco-counter` — "POS software"

- **File:** `public/images/eco-counter.jpg`
- **Ratio:** 4:5 (portrait) · **Export:** 1200 × 1500
- **Where:** ecosystem collage, centre card — the largest and most seen of the
  six. If only one photo gets made properly, make it this one.
- **Job:** the product in its actual place of work.

> Close, slightly angled view of a shop checkout counter: a tablet on a metal
> stand, a small thermal receipt printer beside it, a cash drawer below, a
> barcode scanner resting on the counter top. A shopkeeper's hand reaching
> toward the tablet. Clean stone or laminate counter, the shop softly blurred
> behind. Daylight from the shopfront. Product-in-context photography, 50mm,
> f/2.8, warm neutral grade, portrait orientation. The tablet screen shows a
> soft indistinct light interface — no readable UI, no text anywhere.

## 6. `eco-online` — "Online store"

- **File:** `public/images/eco-online.jpg`
- **Ratio:** 3:4 (portrait) · **Export:** 1000 × 1333
- **Where:** ecosystem collage, right card
- **Job:** the same shop, seen from the customer's phone.

> A customer's hands holding a phone, photographed from just over their
> shoulder, standing in a home doorway or courtyard. The phone screen is bright
> with a soft, indistinct shopping interface — no readable text. Everyday
> Pakistani domestic setting softly out of focus behind. Natural daylight,
> 50mm, f/2.2, warm neutral grade, portrait orientation. No text, no logos.

---

## Adding more slots later

`<Shot>` is generic — `src/components/marketing/Shot.tsx`. To add a slot
anywhere on the site:

```tsx
<Shot id="my-slot" alt="What it shows" ratio="4/3" sizes="(max-width: 720px) 100vw, 33vw" />
```

It renders the placeholder until `public/images/my-slot.*` exists. Add the
brief here at the same time so the two never drift apart.

`fallback` renders something better than an empty box while a file is missing
(the hero passes the coded POS mock), and `radius` flattens the corners where a
parent already does the rounding.
