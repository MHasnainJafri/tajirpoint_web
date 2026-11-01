import type { AddonContent } from "./types";

// Source: domains/signage (handler.py seeds a default Main Menu Board layout;
// models/layout.py categories/sections, price list, price style, sold-out
// display, allergens, page rotation, columns, refresh, theme; models/screen.py
// pairing code, device token, revoke, stock location, orientation, public
// board link; models/settings.py provider name/link + shop-wide link switch;
// models/policy.py per-shop screen limits; services/menu_builder.py prices from
// the pricing engine, photos, stock-aware availability, three-state allergens;
// templates/signage/public_board.html). Web: features/signage.
const content: AddonContent = {
  slug: "digital-signage",
  seoTitle: "Digital Menu Boards That Update From Your POS",
  seoDescription:
    "Show your menu on TVs and wall screens. Dishes, photos and prices come from your TajirPoint menu, so the board matches the till and sold-out dishes drop off.",
  keywords: [
    "digital menu board",
    "menu board software for restaurants",
    "TV menu display",
    "digital signage for restaurants",
    "POS menu board",
  ],
  schemaSubCategory: "Digital menu board add-on for restaurant POS",
  headline: "Menu boards on the wall that change the moment your menu does.",
  overview: [
    "Digital Signage puts your menu on TVs and wall screens without anyone redesigning a board. Each screen shows your categories, dishes, photos and prices straight from the menu you already keep in TajirPoint.",
    "Prices on the board come from the same place the till gets them, so the wall and the receipt always agree. When a dish sells out it drops off the board on its own, or stays on marked as unavailable if you prefer a steady layout.",
    "Each screen gets its own board link. Paste it into your signage provider as a web page, or use the data feed if your provider designs its own layout. You can turn any screen's link off in one click, and it goes dark on its next refresh.",
  ],
  whoFor: [
    "Restaurants, cafes and takeaways with menus on the wall",
    "Food courts and kiosks that change prices or specials often",
    "Shops with more than one counter or branch showing the same menu",
    "Businesses already paying a signage company to run their screens",
  ],
  problems: [
    {
      problem: "The menu board shows old prices after we changed them on the till.",
      fix: "The board reads its prices from the same place as the till, so a price change shows on the wall on the next refresh.",
    },
    {
      problem: "Customers order dishes we ran out of an hour ago.",
      fix: "Sold-out dishes drop off the board by themselves, or show as unavailable if you choose that.",
    },
    {
      problem: "Every menu change means paying someone to redesign the board.",
      fix: "The board is built from your menu. Add a dish or change a photo in TajirPoint and the screens follow.",
    },
    {
      problem: "We cannot stop an old screen or a former supplier from showing our menu.",
      fix: "Turn off any screen's link from the screen list, or switch off every link at once. A new link can be made whenever you need one.",
    },
  ],
  features: [
    {
      title: "Built from your menu",
      body: "Categories, dishes, descriptions, photos and prices come from your TajirPoint menu. Show every category, or pick the ones a screen should show and the order they appear in.",
    },
    {
      title: "Same prices as the till",
      body: "Prices come from the same pricing the till uses, including tax-inclusive prices. Show one starting price per dish or every size with its own price.",
    },
    {
      title: "Sold-out items handled for you",
      body: "Dishes that are switched off, or out of stock at the screen's branch, drop off the board or show as unavailable.",
    },
    {
      title: "Allergens shown honestly",
      body: "Turn on allergens and each dish shows what you have declared. A dish nobody has checked is never shown as allergen free.",
    },
    {
      title: "Layouts you control",
      body: "Choose columns, colours, landscape or portrait, and how long each page shows when the menu needs more than one screen.",
    },
    {
      title: "Works with your signage provider",
      body: "Each screen has its own board link to use as a web page item, plus a data feed for providers that design their own layout. Note your provider's name and dashboard link in the back office.",
    },
    {
      title: "Screens you can switch off",
      body: "Screens never use a staff login. Turn off one screen's link, replace it with a new one, or stop every link at once.",
    },
  ],
  howItWorks: [
    {
      title: "Switch it on",
      body: "Install Digital Signage from the Add-ons page in the back office. A default menu board layout is ready straight away.",
    },
    {
      title: "Add a screen",
      body: "Add one entry for each TV or wall screen, with its name, location, orientation and, if you like, the branch whose stock it should follow.",
    },
    {
      title: "Create its board link",
      body: "Make a board link for the screen and paste it into your signage provider as a web page or URL item.",
    },
    {
      title: "Adjust the layout",
      body: "Pick categories, price style, colours and columns. Changes appear on the screen on its next refresh.",
    },
  ],
  needs: [
    "A TajirPoint account on the Shop plan or above",
    "A TV or screen for each board, run by a signage provider or player that can show a web page",
    "Your menu in TajirPoint, ideally with photos",
  ],
  setup: [
    "You switch it on yourself from the Add-ons page.",
    "Digital Signage needs the Shop plan or above.",
    "Your signage provider or screen hardware is your own and is paid to them directly, if they charge.",
    "Uninstalling keeps your screens and layouts, but their links stop showing the menu until you turn it back on.",
  ],
  faqs: [
    {
      q: "Do I need special screens?",
      a: "No. Any screen that your signage provider or player can show a web page on will work. Each screen gets its own board link.",
    },
    {
      q: "How quickly does a price change reach the board?",
      a: "On the screen's next refresh. Each layout sets how often its screens refresh, within a minimum set for your shop.",
    },
    {
      q: "What happens when a dish sells out?",
      a: "It drops off the board on the next refresh. If you prefer, you can keep sold-out dishes on the board marked as unavailable.",
    },
    {
      q: "Can different screens show different things?",
      a: "Yes. Make more than one layout, for example drinks on one screen and food on another, and give each screen its own layout.",
    },
    {
      q: "Is the board link safe to share?",
      a: "Anyone with the link can see your menu, so give it only to your signage provider. You can turn off or replace a link at any time.",
    },
    {
      q: "How many screens can I have?",
      a: "Each shop has a screen limit. If you need more screens, ask us.",
    },
    {
      q: "Is it included in the free Light plan?",
      a: "No. Digital Signage needs the Shop plan or above.",
    },
  ],
};

export default content;
