import type { AddonContent } from "./types";

// Source: domains/promotions (models/discount.py time_of_day_start/end,
// day_of_week_mask, ramadan_calendar_linked = stored flag only, "future
// enhancement hook"; services/discount_engine.py window_contains on the shop's
// own clock, crosses midnight; services/addon_gate.py windowed rules belong to
// time-promotions and work without coupons; coupon_service.py honours windows;
// services/line_rules.py applies rules at the till). No templates in code.
const content: AddonContent = {
  slug: "time-promotions",
  seoTitle: "Time-Based Promotions: Happy Hour & Iftar Deals at the Till",
  seoDescription:
    "Run discounts only at set hours or on set days: happy hour, Iftar deals, weekday lunch or weekend offers. The till turns them on and off by itself.",
  keywords: [
    "happy hour POS discount",
    "Iftar deal discount",
    "time based discounts",
    "weekend only discount",
    "lunch deal pricing",
    "day of week promotions",
  ],
  schemaSubCategory: "Time-based promotions add-on for POS",
  headline: "Discounts that start and stop on the clock, without anyone touching the till.",
  overview: [
    "Time-Based Promotions adds hours and days to your discount rules. Set a start time and an end time, pick the days of the week, and the discount only applies inside that window.",
    "It works on the same rules as Coupons & Discounts: a percentage or fixed amount off, or buy one get one, on chosen products or categories. The time is checked on your shop's own clock, so a London, Dubai or Lahore shop all get their happy hour at the right local time.",
    "Late-night windows that run past midnight, like 10pm to 2am, work as you would expect. Coupon codes respect the window too, so an evening-only code will not work in the afternoon.",
  ],
  whoFor: [
    "Restaurants and cafes running happy hour or lunch deals",
    "Bakeries clearing stock with an evening discount",
    "Food businesses with Iftar or Sehri deals in Ramadan",
    "Shops with weekday or weekend-only offers",
  ],
  problems: [
    {
      problem: "Staff forget to start the happy hour, or forget to stop it.",
      fix: "Set the hours once. The discount turns on and off by itself every day.",
    },
    {
      problem: "An evening code gets used at lunchtime.",
      fix: "Coupon codes linked to a timed rule only work inside its hours and days.",
    },
    {
      problem: "A weekend offer keeps running on Monday.",
      fix: "Pick the days of the week. Outside those days the rule simply does not apply.",
    },
  ],
  features: [
    {
      title: "Start and end times",
      body: "Give any discount rule a daily window, such as 5pm to 7pm for an Iftar deal or 3pm to 6pm for happy hour.",
    },
    {
      title: "Days of the week",
      body: "Run a rule only on the days you choose: weekdays, weekends, or just Friday.",
    },
    {
      title: "Windows past midnight",
      body: "Late-night offers like 10pm to 2am are handled correctly across the change of day.",
    },
    {
      title: "Your shop's own time",
      body: "Windows follow the time where your shop is, not a server somewhere else.",
    },
    {
      title: "Applied at the till by itself",
      body: "Inside the window the rule is applied when the sale is rung up; outside it, items sell at the normal price.",
    },
    {
      title: "Works with coupon codes",
      body: "A coupon code on a timed rule only works inside the rule's hours and days.",
    },
  ],
  howItWorks: [
    {
      title: "Switch it on",
      body: "Install Time-Based Promotions from the Add-ons page in the back office.",
    },
    {
      title: "Open a discount rule",
      body: "Create a new rule or edit an existing one: type, amount, products or categories, and dates.",
    },
    {
      title: "Add the hours and days",
      body: "Set the start and end time and tick the days the offer runs.",
    },
    {
      title: "Let it run",
      body: "The till applies the offer inside the window and stops outside it, every day it is set to run.",
    },
  ],
  needs: [
    "A TajirPoint account (any plan, including Light)",
    "Your products and categories set up in TajirPoint",
    "Optional: Coupons & Discounts, if you also want timed coupon codes",
  ],
  setup: [
    "You switch it on yourself from the Add-ons page; it takes a minute.",
    "It is included with the free Light plan.",
    "If you switch it off, timed rules stop applying but are kept, and work again when you switch it back on.",
  ],
  faqs: [
    {
      q: "Is it included in the free Light plan?",
      a: "Yes. Time-Based Promotions is one of the add-ons included with Light.",
    },
    {
      q: "Do I also need Coupons & Discounts?",
      a: "Not for timed rules: they work with this add-on alone. You need Coupons & Discounts as well only if you want coupon codes, including timed ones.",
    },
    {
      q: "Can a window run past midnight?",
      a: "Yes. A window like 10pm to 2am works across the change of day.",
    },
    {
      q: "Which time zone does it use?",
      a: "Your shop's own local time.",
    },
    {
      q: "Can Iftar deals follow the changing Ramadan timings by themselves?",
      a: "Not yet. For now, set the window to your Iftar time and update it as the timings change. Following the Ramadan calendar automatically is planned for later.",
    },
    {
      q: "Does it work on my website or online orders?",
      a: "No. Timed rules apply at your till. Website and order page offers are set up in the Website Builder add-on.",
    },
    {
      q: "Are there ready-made deal templates?",
      a: "Not at the moment. Setting up a happy hour or Iftar deal takes a minute: create a rule and add the hours and days.",
    },
  ],
};

export default content;
