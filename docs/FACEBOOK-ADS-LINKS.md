# Facebook ad links — book a demo

Ready-to-paste links for Facebook / Instagram ads, one per business. Every link
opens the demo form at `/book-demo` with the business already selected and
the campaign tags the site stores with the lead (`utm_source=facebook`,
`utm_medium=paid_social`, `utm_campaign=demo_<slug>`). Facebook adds its own
`fbclid`; the site keeps that too.

How attribution works: the first page a visitor lands on in a browser session
is remembered (UTM tags, `fbclid`, landing page, referring site). When they
submit the demo or contact form those values are sent with the lead, so a
visitor who lands on a business page from an ad and books a demo two pages
later is still credited to the ad. The Meta Pixel fires **Lead** and
**Schedule** only after a demo request is saved (no name, phone or email is
sent to Meta), and **ViewContent** on each business page.

Two kinds of link per business:

- **Demo form** — for "Book a demo" / lead ads that should go straight to the form.
- **Business page** — for awareness ads; the page has Book a demo and Start free buttons.

Optional: add `&utm_content=<ad-name>` to tell ads in one campaign apart
(e.g. `&utm_content=video_kds`). Keep values lowercase, no spaces.

## Restaurants

Demo form:

```
https://tajirpoint.com/book-demo?type=restaurants&utm_source=facebook&utm_medium=paid_social&utm_campaign=demo_restaurants
```

Business page:

```
https://tajirpoint.com/business/restaurants?utm_source=facebook&utm_medium=paid_social&utm_campaign=demo_restaurants
```

## Cafés & bakeries

Demo form:

```
https://tajirpoint.com/book-demo?type=cafes-bakeries&utm_source=facebook&utm_medium=paid_social&utm_campaign=demo_cafes-bakeries
```

Business page:

```
https://tajirpoint.com/business/cafes-bakeries?utm_source=facebook&utm_medium=paid_social&utm_campaign=demo_cafes-bakeries
```

## Cloud kitchens

Demo form:

```
https://tajirpoint.com/book-demo?type=cloud-kitchens&utm_source=facebook&utm_medium=paid_social&utm_campaign=demo_cloud-kitchens
```

Business page:

```
https://tajirpoint.com/business/cloud-kitchens?utm_source=facebook&utm_medium=paid_social&utm_campaign=demo_cloud-kitchens
```

## Retail & fashion

Demo form:

```
https://tajirpoint.com/book-demo?type=retail-fashion&utm_source=facebook&utm_medium=paid_social&utm_campaign=demo_retail-fashion
```

Business page:

```
https://tajirpoint.com/business/retail-fashion?utm_source=facebook&utm_medium=paid_social&utm_campaign=demo_retail-fashion
```

## Grocery & kiryana

Demo form:

```
https://tajirpoint.com/book-demo?type=grocery-kiryana&utm_source=facebook&utm_medium=paid_social&utm_campaign=demo_grocery-kiryana
```

Business page:

```
https://tajirpoint.com/business/grocery-kiryana?utm_source=facebook&utm_medium=paid_social&utm_campaign=demo_grocery-kiryana
```

## Pharmacies

Demo form:

```
https://tajirpoint.com/book-demo?type=pharmacy&utm_source=facebook&utm_medium=paid_social&utm_campaign=demo_pharmacy
```

Business page:

```
https://tajirpoint.com/business/pharmacy?utm_source=facebook&utm_medium=paid_social&utm_campaign=demo_pharmacy
```

## Electronics & mobile

Demo form:

```
https://tajirpoint.com/book-demo?type=electronics-mobile&utm_source=facebook&utm_medium=paid_social&utm_campaign=demo_electronics-mobile
```

Business page:

```
https://tajirpoint.com/business/electronics-mobile?utm_source=facebook&utm_medium=paid_social&utm_campaign=demo_electronics-mobile
```

## Salons & services

Demo form:

```
https://tajirpoint.com/book-demo?type=salons-services&utm_source=facebook&utm_medium=paid_social&utm_campaign=demo_salons-services
```

Business page:

```
https://tajirpoint.com/business/salons-services?utm_source=facebook&utm_medium=paid_social&utm_campaign=demo_salons-services
```

## Distributors & wholesale

Demo form:

```
https://tajirpoint.com/book-demo?type=distributors-wholesale&utm_source=facebook&utm_medium=paid_social&utm_campaign=demo_distributors-wholesale
```

Business page:

```
https://tajirpoint.com/business/distributors-wholesale?utm_source=facebook&utm_medium=paid_social&utm_campaign=demo_distributors-wholesale
```

## Furniture & home

Demo form:

```
https://tajirpoint.com/book-demo?type=furniture-home&utm_source=facebook&utm_medium=paid_social&utm_campaign=demo_furniture-home
```

Business page:

```
https://tajirpoint.com/business/furniture-home?utm_source=facebook&utm_medium=paid_social&utm_campaign=demo_furniture-home
```

## General (no business preselected)

```
https://tajirpoint.com/book-demo?utm_source=facebook&utm_medium=paid_social&utm_campaign=demo_general
```

Data migration offer (the form opens with "Move my data for me" ticked):

```
https://tajirpoint.com/book-demo?migrate=1&utm_source=facebook&utm_medium=paid_social&utm_campaign=demo_migration
```

The short link `https://tajirpoint.com/demo` redirects to `/book-demo` and keeps everything after
the `?`, so `https://tajirpoint.com/demo?type=pharmacy&utm_source=facebook&utm_medium=paid_social&utm_campaign=demo_pharmacy`
works too.

## Set the Facebook Page "Book now" button

1. Open the TajirPoint Facebook Page as a Page admin (facebook.com or Meta Business Suite).
2. Under the cover photo, click the action button (it may read **Add button**, **Contact us** or
   **Send message**) and choose **Edit button** (or **Add action button**).
3. Choose **Book with you → Book now**.
4. When asked how people book, choose **Link to website** (not Facebook appointments).
5. Paste:

   ```
   https://tajirpoint.com/book-demo?utm_source=facebook&utm_medium=page_button&utm_campaign=demo_page_button
   ```

6. Save, then click the button on the Page and check it opens the demo form.

Instagram profile: **Edit profile → Action buttons → Book now → website link**, with
`utm_source=instagram&utm_medium=profile_button&utm_campaign=demo_profile_button`.

Meta renames these menus from time to time; if a label differs, look for the Page's
action button settings and pick the "book" option that links to a website.

## Check a link before an ad goes live

Open the link in a private window, submit a test demo with "TEST" in the name, and confirm it
appears in the platform console's Leads list with source **facebook** and campaign **demo\_<slug>**.
Mark it as spam afterwards.

_Generated from `src/lib/marketing/businesses.ts` (`facebookAdLink`). If a business is added
there, add its links here._
