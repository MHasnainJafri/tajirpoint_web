import type { AddonContent } from "./types";
import { BRAND_NAME } from "@/lib/config/brand";

// Source: domains/restaurant_toolbox (handler.py seeds 2 floors / 9 tables,
// settings prep target, mark table for cleaning on settle, recent orders rail;
// models menu.py deals/sizes/add-ons/extras/diet/tags, table.py free/reserved/
// occupied/needs cleaning/out of service, ticket.py dine-in/take-away/delivery/
// table + rounds, reservation.py booked/seated/no-show; services ticket_service
// settle through SaleService.create_sale with split tenders + credit permission,
// kds_service new/kitchen/delayed/done, print_service KOT without prices +
// ESC/POS bill, packing_photo_service phone photo handoff). Menu = catalog
// products (no separate menu to keep).
const content: AddonContent = {
  slug: "restaurant-toolbox",
  seoTitle: "Restaurant Terminal: Menu, Tables and Kitchen on One Screen",
  seoDescription:
    "A full-screen restaurant terminal: menu with deals and add-ons, live tickets, a table board with open tabs, a kitchen board with timers, and reservations.",
  keywords: [
    "restaurant terminal software",
    "restaurant POS screen",
    "table tab POS",
    "kitchen order board",
    "restaurant reservations POS",
    "fast food POS Pakistan",
  ],
  schemaSubCategory: "Restaurant terminal add-on for POS",
  headline: "One full-screen workspace for the counter: menu, tickets, tables, kitchen and orders.",
  overview: [
    "Restaurant Toolbox is a restaurant terminal that opens in its own full-screen workspace, separate from the shop till. The counter gets everything on one screen: the menu, the ticket being built, the tables, the kitchen board and the list of orders.",
    `The menu comes from your ${BRAND_NAME} products, laid out as a grid with deals, sizes, add-ons and extras. A dine-in table keeps one ticket open across several rounds, so the second round of drinks joins the same bill instead of starting a new one.`,
    `The kitchen board shows every order with a prep timer and flags the ones running late. When the guest pays, the ticket is settled as a normal ${BRAND_NAME} sale, so stock, khata and your reports stay exactly as they are everywhere else.`,
  ],
  whoFor: [
    "Fast food, pizza and burger outlets with a busy counter",
    "Cafes and family restaurants that run table tabs",
    "Restaurants that take bookings and want them next to the tables",
    "Owners who want a simple restaurant screen without setting up a full kitchen system",
  ],
  problems: [
    {
      problem: "A second round of drinks ends up on a separate bill.",
      fix: "Each table keeps one open ticket. New rounds are added to it and sent to the kitchen, and the guest pays once at the end.",
    },
    {
      problem: "Staff jump between screens to take an order, check a table and see the kitchen.",
      fix: "Menu, ticket, tables, kitchen board and orders all live in one full-screen workspace.",
    },
    {
      problem: "Nobody notices an order has been waiting too long.",
      fix: "Every ticket on the kitchen board has a prep timer, and late orders move to their own Delayed column.",
    },
    {
      problem: "We do not know which tables are free, booked or still dirty.",
      fix: "The table board shows each table as free, reserved, occupied, needs cleaning or out of service.",
    },
  ],
  features: [
    {
      title: "Full-screen restaurant terminal",
      body: "Its own workspace for the counter, separate from the shop till, with the menu, the current ticket and recent orders side by side.",
    },
    {
      title: "Menu grid with deals and add-ons",
      body: "Dishes from your products, with sizes, add-ons, extras and deal choices priced from your menu. Show veg or non-veg and tags like Must Try or Best Value.",
    },
    {
      title: "Kitchen notes on every item",
      body: "Add a note to any item, such as no onions or extra spicy, and it prints on the kitchen ticket.",
    },
    {
      title: "Table board with open tabs",
      body: "Floors and tables with their status. Seat a party, add rounds to its open ticket, and the table is marked for cleaning after the bill is settled.",
    },
    {
      title: "Kitchen board with timers",
      body: "Orders in New, Kitchen, Delayed and Done columns, each with a prep timer and a mark-ready button.",
    },
    {
      title: "Every order type",
      body: "Dine-in, take-away, delivery and table orders from the same screen.",
    },
    {
      title: "Reservations with seat-now",
      body: "Take bookings with the guest's name, phone and party size. When they arrive, seat them at a table in one tap, or mark them as a no-show.",
    },
    {
      title: "Settles as a normal sale",
      body: "Take one or more payments, or leave a balance on the customer's khata if the cashier is allowed to. Stock, khata and reports update as for any other sale.",
    },
  ],
  howItWorks: [
    {
      title: "Switch it on",
      body: "Install Restaurant Toolbox from the Add-ons page in the back office. Two floors with sample tables are set up so the table board is ready to use.",
    },
    {
      title: "Check your menu and tables",
      body: "Your products appear on the menu grid. Add sizes, add-ons and deals to dishes, and rename or add tables to match your floor.",
    },
    {
      title: "Take orders",
      body: "Open the terminal, build a ticket for dine-in, take-away, delivery or a table, and send it to the kitchen.",
    },
    {
      title: "Cook and serve",
      body: "The kitchen works from the kitchen board and printed tickets, and marks orders ready.",
    },
    {
      title: "Settle the bill",
      body: "Take payment and the ticket becomes a normal sale. The table is freed for cleaning.",
    },
  ],
  needs: [
    `A ${BRAND_NAME} account (any plan, including Light)`,
    "A laptop, desktop or tablet at the counter, ideally with a large screen",
    "A thermal printer for kitchen tickets and bills (optional; the terminal can show or browser-print them without one)",
  ],
  setup: [
    "You switch it on yourself from the Add-ons page; it takes a minute.",
    "Restaurant Toolbox is included with the Light plan.",
    "It does not need the Restaurant add-on, but you can use both.",
    "Uninstalling only hides the terminal. Your tickets and tables come back if you switch it on again.",
  ],
  faqs: [
    {
      q: "Do I need to build a separate menu for the terminal?",
      a: `No. The menu grid uses your ${BRAND_NAME} products. You only add restaurant extras like sizes, add-ons, deals and prep time.`,
    },
    {
      q: "Can a table order more than once on the same bill?",
      a: "Yes. A table keeps one ticket open across rounds. Each new round goes to the kitchen and joins the same bill.",
    },
    {
      q: "Do kitchen tickets show prices?",
      a: "No. Kitchen tickets show only dishes, options and notes. The guest's bill is printed in the same style as your other receipts.",
    },
    {
      q: "Does it update my stock and khata?",
      a: "Yes. Settling a ticket creates a normal sale, so stock, khata and your reports work exactly as they do at the till.",
    },
    {
      q: "What is the difference between Restaurant Toolbox and the Restaurant add-on?",
      a: `Restaurant Toolbox is an all-in-one restaurant terminal in its own screen. The Restaurant add-on adds tables, the kitchen display and kitchen printing to ${BRAND_NAME} itself. Both are included with Light.`,
    },
    {
      q: "Can I take bookings?",
      a: "Yes. Record a booking with the guest's details and party size, and seat them at a table when they arrive.",
    },
    {
      q: "Is it included in the free Light plan?",
      a: "Yes. Restaurant Toolbox is one of the add-ons included with Light.",
    },
  ],
};

export default content;
