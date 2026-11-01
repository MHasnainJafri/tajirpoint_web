import type { AddonContent } from "./types";

// Source: domains/restaurants (handler.py seeds Main Floor, Main Kitchen station,
// default void reasons, waiter/kitchen roles, TERM_MAP en/ur; models ticket,
// floor_plan, kitchen_station, modifier.py non-stock vs stock-tracked options +
// ingredients, reservation, split_bill, table_qr_order, waiter_call, recipe,
// hygiene; services kds_service, routing_service, printer_service ESC/POS network
// printers, menu_course_service, split_bill_service equal/item/seat/round/manual,
// qr_order_service, fee_rules service charge + tips, void_reasons; api/urls.py).
const content: AddonContent = {
  slug: "restaurant",
  seoTitle: "Restaurant POS Add-on: Tables, Kitchen Screen and Tickets",
  seoDescription:
    "Turn TajirPoint into a restaurant POS: tables, kitchen display, kitchen ticket printing, modifiers, courses and split bills for dine-in, takeaway and delivery.",
  keywords: [
    "restaurant POS software",
    "kitchen display system",
    "restaurant billing software Pakistan",
    "table management POS",
    "KOT printing software",
    "cafe POS system",
  ],
  schemaSubCategory: "Restaurant POS add-on",
  headline: "Tables, kitchen screen and kitchen tickets added to your TajirPoint till.",
  overview: [
    "The Restaurant add-on turns TajirPoint into a restaurant POS. Orders become tickets for dine-in, takeaway or delivery, and the words on screen change to suit a restaurant: menu items, tickets and Send to Kitchen.",
    "Each ticket goes to the right kitchen station, shows on the kitchen display as it happens and prints on the station's kitchen printer. Dishes can have modifier groups like sizes, toppings and spice level, and toppings can take their own ingredients from stock.",
    "For dine-in, set up your floor and tables, fire starters, mains and desserts as courses, and split the bill equally, by item, by seat or by amount. Guests can also order from a QR code on the table, and call a waiter from their phone.",
  ],
  whoFor: [
    "Restaurants, cafes, dhabas and takeaways",
    "Fast food outlets and pizza shops with a busy kitchen",
    "Restaurants with more than one kitchen station, like a grill and a bar",
    "Dine-in restaurants with tables, waiters and split bills",
    "Owners who want menus and kitchen tickets in English and Urdu",
  ],
  problems: [
    {
      problem: "Kitchen slips get lost and orders are made late or not at all.",
      fix: "Every ticket shows on the kitchen display and prints on the right station's printer, so the kitchen sees each order the moment it is sent.",
    },
    {
      problem: "The grill gets the drinks and the bar gets the burgers.",
      fix: "Set a kitchen station for each dish, and its part of the order goes only to that station's screen and printer.",
    },
    {
      problem: "Splitting the bill for a table of six takes forever.",
      fix: "Split a bill equally, by item, by seat, by order round, or by the amount each guest pays.",
    },
    {
      problem: "Extra cheese and toppings never come off the stock.",
      fix: "Make a topping stock-tracked and set what it uses, and it is taken off stock with every order.",
    },
  ],
  features: [
    {
      title: "Kitchen display",
      body: "Orders appear on the kitchen screen as they are sent, grouped by station, so cooks can mark items as they go.",
    },
    {
      title: "Kitchen ticket printing",
      body: "Kitchen tickets print on each station's network thermal printer, with a log of what was printed.",
    },
    {
      title: "Floor plan and tables",
      body: "Lay out your floors and tables, see which are free or occupied, and assign waiters to tables.",
    },
    {
      title: "Modifiers and toppings",
      body: "Add modifier groups like size, crust, toppings or spice level. Options can just change the price, or take ingredients from stock.",
    },
    {
      title: "Courses",
      body: "Give dishes a course, starter, main or dessert, and send each course to the kitchen when the table is ready. Set courses for a whole category at once.",
    },
    {
      title: "Split bills",
      body: "Split a ticket equally, by item, by seat, by order round or by the amount each guest pays.",
    },
    {
      title: "Table QR ordering and waiter calls",
      body: "Guests scan the code on their table to order, and the order goes straight to the kitchen. They can also call a waiter or ask for the bill from their phone.",
    },
    {
      title: "English and Urdu",
      body: "Restaurant words on screen come in English and Urdu, and dishes and modifiers can have a second name.",
    },
  ],
  howItWorks: [
    {
      title: "Switch it on",
      body: "Install the Restaurant add-on from the Add-ons page in the back office. A main floor, a main kitchen station and standard void reasons are set up for you.",
    },
    {
      title: "Set up your kitchen and tables",
      body: "Add your kitchen stations and their printers, then lay out your floors and tables.",
    },
    {
      title: "Build your menu",
      body: "Add dishes with their station, course and modifier groups.",
    },
    {
      title: "Take orders",
      body: "Open tickets for dine-in, takeaway or delivery and send them to the kitchen. The kitchen screen and printers take it from there.",
    },
    {
      title: "Settle the bill",
      body: "Split the bill if needed, take payment, and the sale, stock and reports update as normal.",
    },
  ],
  needs: [
    "A TajirPoint account (any plan, including Light)",
    "A screen or tablet in the kitchen for the kitchen display (optional)",
    "A network thermal printer for kitchen tickets (optional)",
    "Your menu, with sizes and toppings if you have them",
  ],
  setup: [
    "You switch it on yourself from the Add-ons page; it takes a minute.",
    "The Restaurant add-on is included with the Light plan.",
    "Shops that sign up as a restaurant or cafe get it switched on from the start.",
    "Uninstalling keeps your tables, tickets and menu settings.",
  ],
  faqs: [
    {
      q: "Do I need a kitchen display screen?",
      a: "No. You can print kitchen tickets only, use the kitchen screen only, or both. Any screen or tablet that can open TajirPoint works as a kitchen display.",
    },
    {
      q: "Which printers work for kitchen tickets?",
      a: "Network thermal receipt printers. Each kitchen station can have its own printer.",
    },
    {
      q: "Can I have more than one kitchen station?",
      a: "Yes. Add stations like grill, fryer or bar, and set which station each dish goes to.",
    },
    {
      q: "Can guests order from their table?",
      a: "Yes. Each table can have its own QR code. Guests scan it, order from their phone, and the order goes to the kitchen.",
    },
    {
      q: "Does it handle takeaway and delivery as well?",
      a: "Yes. Tickets can be dine-in, takeaway or delivery, and the till handles all three.",
    },
    {
      q: "What is the difference between Restaurant and Restaurant Toolbox?",
      a: "Restaurant adds tables, the kitchen display and kitchen printing to TajirPoint. Restaurant Toolbox is a separate full-screen restaurant terminal. Both are included with Light, so you can try both.",
    },
    {
      q: "Is it included in the free Light plan?",
      a: "Yes. The Restaurant add-on is one of the add-ons included with Light.",
    },
  ],
};

export default content;
