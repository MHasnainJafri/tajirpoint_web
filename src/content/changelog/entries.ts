/**
 * "What's new" — the public changelog at /changelog.
 *
 * Rules for every entry (owner, 2 Nov 2026):
 * - Only work that is RELEASED and live for shops. Nothing that is still on a
 *   branch, waiting for a decision, or only in a test build of an app.
 * - Plain words for shop and restaurant owners. No version numbers, ticket
 *   codes, branch names, client names or technical terms.
 * - Say who it is for. If a feature is switched off until a shop turns it on,
 *   or needs an add-on, say so.
 * - Newest month first, newest item first inside a month.
 *
 * Source: the release log in `Claude Shift/PENDING.md` (lines marked LIVE),
 * October and November 2026. Bump CHANGELOG_UPDATED (it feeds the sitemap)
 * in the same commit that adds an entry.
 */

export type ChangelogAudience = "Everyone" | "Restaurants" | "Shops" | "Website";

export interface ChangelogItem {
  title: string;
  body: string;
  audience: ChangelogAudience;
}

export interface ChangelogMonth {
  /** yyyy-mm, used as the anchor (#2026-11). */
  id: string;
  label: string;
  /** One sentence on the month as a whole. */
  summary: string;
  items: ChangelogItem[];
}

/** The date of the newest entry (yyyy-mm-dd). */
export const CHANGELOG_UPDATED = "2026-11-02";

export const CHANGELOG: ChangelogMonth[] = [
  {
    id: "2026-11",
    label: "November 2026",
    summary:
      "Kitchen stock for restaurants, a cleaner counter screen, closing the register with cash paid out, and books that tie out.",
    items: [
      {
        audience: "Everyone",
        title: "Accounting that ties out",
        body: "More of your daily work now posts to the books on its own, including manual khata adjustments. Big amounts show in short form; tap one to see the full figure. Printed amounts are exact.",
      },
      {
        audience: "Everyone",
        title: "Close the register with cash paid out",
        body: "When you close the drawer, list the cash you paid out during the day — tea for guests, a courier, small supplies — so the count balances. Drawer cash handed over shows as Received or Not received on the Registers page.",
      },
      {
        audience: "Restaurants",
        title: "A cleaner counter screen",
        body: "Search comes first, extra actions sit in one More menu, tables and pickup times are quicker to pick, and the cart shows each line on two rows with room for notes.",
      },
      {
        audience: "Restaurants",
        title: "Kitchen screen improvements",
        body: "Untick a dish marked ready by mistake, and see the order note and pickup time on the ticket.",
      },
      {
        audience: "Restaurants",
        title: "Ingredient prices and history",
        body: "Record what you pay for each ingredient, see how the price changed, receive stock with the amount paid and set a minimum level. Home shows ingredient use, and closing the register shows what is left in the kitchen.",
      },
      {
        audience: "Everyone",
        title: "Add-on groups you build once",
        body: "Build a group of choices once — extra toppings, or RAM and storage upgrades — and use it on many items instead of typing it again for each one.",
      },
      {
        audience: "Restaurants",
        title: "Kitchen stock on one page",
        body: "See each ingredient's opening stock, what came in, what was used and what is left. Record what the kitchen prepared, count the kitchen, and get a day report. Low-stock alerts take your closing time into account.",
      },
      {
        audience: "Everyone",
        title: "Clearer lists in the back office",
        body: "Customers show when they last bought and how much they have spent. Purchases and online orders show their items, payments show what was paid for, and settings are grouped so they are easier to find.",
      },
      {
        audience: "Everyone",
        title: "The web app opens faster",
        body: "Fonts and languages now load in the background, so the app is ready to use sooner.",
      },
      {
        audience: "Website",
        title: "Ask for a call back, and a page for every add-on",
        body: "Leave your business name and number and our team calls you within one working day. Every add-on now has its own page that says whether it is ready to switch on, set up by our team, or coming soon.",
      },
    ],
  },
  {
    id: "2026-10",
    label: "October 2026",
    summary:
      "Selling without internet, a new kitchen display, sizes and add-ons on dishes, phone and tablet layouts, and tools for laptop and mobile shops.",
    items: [
      {
        audience: "Everyone",
        title: "A full security review",
        body: "We reviewed the whole of TajirPoint for security problems and fixed what we found.",
      },
      {
        audience: "Restaurants",
        title: "Reject is now separate from Cancel",
        body: "An online order you do not accept is marked Rejected, so it is no longer mixed up with orders cancelled later.",
      },
      {
        audience: "Restaurants",
        title: "Delivery app orders ring until someone answers",
        body: "With the HubRise add-on, orders from delivery apps wait in New and keep ringing until someone taps Got it. You can also set a different menu price for each delivery app.",
      },
      {
        audience: "Everyone",
        title: "Clear messages when a connection fails",
        body: "If a connection to another service fails, you see what went wrong and what to do next, instead of just “try again”. Our team is told as well, so we can help you fix it.",
      },
      {
        audience: "Everyone",
        title: "Add-ons our team sets up for you",
        body: "Some add-ons now say Contact us. Ask for one from the Add-ons page and our team sets it up with you.",
      },
      {
        audience: "Restaurants",
        title: "Ingredient alerts that never block a sale",
        body: "A short ingredient never stops an order. Ingredients can have a shelf life, and you get low-stock and use-first alerts.",
      },
      {
        audience: "Restaurants",
        title: "Keep selling without internet",
        body: "Open the register, sell and take payments when the internet is down; everything syncs when it comes back. Kitchen screens and waiters keep working over the shop Wi-Fi, and each cashier can unlock the till with their own PIN while offline.",
      },
      {
        audience: "Everyone",
        title: "Phone and tablet layouts",
        body: "The back office was reworked for phones and tablets: bigger buttons, lists that fit the screen, and a delivery page made for a phone.",
      },
      {
        audience: "Restaurants",
        title: "A new kitchen display and order board",
        body: "The kitchen screen responds to every tap at once and shows cleaner tickets. The customer order board (the “now ready” screen) shows your logo and your own message.",
      },
      {
        audience: "Restaurants",
        title: "Packing checklist",
        body: "Packers tick off every item, see what is inside each deal, and can add a photo before the bag goes out.",
      },
      {
        audience: "Restaurants",
        title: "Order by QR, pay at the counter",
        body: "Walk-in customers can scan a QR code, order from their phone and pay at the counter. It stays off until you switch it on in your table settings.",
      },
      {
        audience: "Restaurants",
        title: "Sizes and add-ons on dishes",
        body: "Give a dish sizes (pick one) and add-ons (pick any), with a limit if you want one. The size shows on the kitchen ticket, the bill and the packing slip.",
      },
      {
        audience: "Shops",
        title: "Tools for laptop and mobile shops",
        body: "Split one sale across several payment methods, reprice stock when the dollar rate changes, send a price list on WhatsApp, track post-dated cheques with reminders, see cost per purchase lot, return faulty units to the supplier, pay staff commission, keep a day book, and add trade-in photos and the customer's CNIC to invoices.",
      },
      {
        audience: "Shops",
        title: "Reusable product versions",
        body: "Save a set of versions once — for example sizes, or RAM and storage — and use it on any product.",
      },
      {
        audience: "Restaurants",
        title: "Start cooking when the driver is coming",
        body: "Choose when delivery orders start cooking: straight away, when a driver accepts, or when the driver is close enough.",
      },
      {
        audience: "Shops",
        title: "A shop website for electronics",
        body: "Shop websites have a new layout for electronics shops, with ordering over WhatsApp.",
      },
      {
        audience: "Everyone",
        title: "Report a problem from the app",
        body: "Send us a problem report from inside the app, so we can see what went wrong and fix it faster.",
      },
      {
        audience: "Everyone",
        title: "Show the bill on a second screen",
        body: "Open the customer display link on a second screen so customers can follow their bill as you ring it up.",
      },
      {
        audience: "Shops",
        title: "Cleaner invoices you can share",
        body: "New A4 and receipt invoices that print well in black and white, and a link to send an invoice on WhatsApp.",
      },
      {
        audience: "Everyone",
        title: "Better printing on small printers",
        body: "A compact receipt for 58 mm paper, more paper sizes, and a “find my paper size” check. Each device remembers its own printer setup, and a new device can copy the setup of another.",
      },
    ],
  },
];
