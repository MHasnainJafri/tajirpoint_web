import type { AddonContent } from "./types";

// Source: domains/dispatch (handler.py seeds the Driver role; models/trip.py
// statuses draft/ready/in_progress/ended/closed/cancelled; services/trip_service.py
// load from source warehouse to vehicle, opening cash, van sales cash/credit
// split, payment collection, trip expenses, returns good/damaged/expired,
// reconcile_goods, reconcile_cash full/partial/none handover + driver khata,
// profit_and_loss, udhaar_report; models/mileage.py + mileage_service.py).
const content: AddonContent = {
  slug: "route-dispatch",
  seoTitle: "Route Dispatch: Van Sales, Truck Loading & Udhaar",
  seoDescription:
    "Load a van from your warehouse, record cash and udhaar sales at every shop on the route, then check stock and cash when the driver returns. For distributors.",
  keywords: [
    "van sales software",
    "route sales app Pakistan",
    "distributor delivery software",
    "truck loading and dispatch",
    "udhaar tracking for distributors",
    "driver cash reconciliation",
  ],
  schemaSubCategory: "Route sales and distribution add-on",
  headline: "Send the van out loaded and know exactly what came back: stock, cash and udhaar.",
  overview: [
    "Route Dispatch is for businesses that load a vehicle every morning and sell to shops along a route: flour mills, FMCG and drinks distributors, wholesalers. Each trip has a driver, a vehicle and the warehouse it is loaded from.",
    "You load the van from your warehouse and stock moves onto the vehicle. On the road the driver records each sale against the shop that bought it, with the cash part and the udhaar part split out. Udhaar goes straight onto that shop's account, and payments collected on the way are recorded too.",
    "When the van comes back, leftover stock goes back to the warehouse and the driver's cash is counted against what it should be. Any shortfall is written to the driver's own account, and you get a profit and loss for the trip.",
  ],
  whoFor: [
    "Flour mills, distributors and wholesalers that deliver to retail shops",
    "Businesses running one or more vans or trucks on fixed routes",
    "Owners who give drivers stock and cash and need it all accounted for",
    "Anyone selling on udhaar to many small shops",
  ],
  problems: [
    {
      problem: "Nobody knows exactly what was loaded on the van and what came back.",
      fix: "Loading moves stock from your warehouse onto the vehicle. At the end, what is left goes back, and TajirPoint checks loaded against sold and returned.",
    },
    {
      problem: "Drivers come back short on cash and the story changes every day.",
      fix: "Every cash sale, payment collected and trip expense is recorded, so the expected cash is known. The counted cash is compared with it, and a shortfall goes on the driver's account.",
    },
    {
      problem: "Udhaar given on the route lives in a driver's notebook.",
      fix: "The credit part of each sale is posted to that shop's account automatically, and the udhaar report shows what every shop still owes.",
    },
    {
      problem: "You cannot tell if a trip actually made money.",
      fix: "Each trip has its own profit and loss: sales, returns, cost of goods, expenses and any stock that went missing.",
    },
  ],
  features: [
    {
      title: "Trips with a driver, vehicle and warehouse",
      body: "Plan a trip, add what to load, and mark it ready. TajirPoint checks the warehouse has the stock before anything moves.",
    },
    {
      title: "Opening cash for the driver",
      body: "Give the driver change or expense money at the start of the trip. It is recorded, so it is counted back at the end.",
    },
    {
      title: "Sales at each shop, cash and udhaar split",
      body: "The driver records what each shop bought and how much they paid in cash. The rest goes on the shop's account. Customer price lists apply, and a price below your floor needs permission.",
    },
    {
      title: "Payments, expenses and returns on the road",
      body: "Collect old balances, record fuel or toll costs, and take back items. Good returns go back into stock; damaged or expired ones are written off.",
    },
    {
      title: "Stock and cash check at the end",
      body: "Leftover stock goes back to the warehouse. Count the cash and choose full, part or no handover; any amount not handed over is written to the driver's account.",
    },
    {
      title: "Trip profit and udhaar reports",
      body: "See profit and loss for each trip, and a report of what each shop owes from van sales and what each driver is short.",
    },
    {
      title: "Mileage and fuel checks",
      body: "Record the odometer and fuel for each trip. If fuel use is far from what the vehicle should do, admins are alerted.",
    },
    {
      title: "A Driver role, ready to use",
      body: "Switching the add-on on creates a Driver role, so you can give drivers access to their trips without opening up the rest of the back office.",
    },
  ],
  howItWorks: [
    {
      title: "Switch it on",
      body: "Install Route Dispatch from the Add-ons page. A Driver role is created for you.",
    },
    {
      title: "Set up your vehicles and drivers",
      body: "Add each van or truck as a vehicle stock location and give your drivers the Driver role.",
    },
    {
      title: "Load the trip",
      body: "Pick the driver, vehicle and source warehouse, add the items, and mark it ready. Stock moves onto the vehicle.",
    },
    {
      title: "Sell along the route",
      body: "The driver records sales, payments, expenses and returns at each shop as the day goes.",
    },
    {
      title: "Close the day",
      body: "End the trip, send leftover stock back, count the cash, and close it. Reports update straight away.",
    },
  ],
  needs: [
    "A TajirPoint account (any plan, including Light)",
    "Your products and stock in TajirPoint, in a warehouse to load from",
    "Your customer shops added as customers",
    "A phone or tablet for each driver to record sales",
  ],
  setup: [
    "You switch it on yourself from the Add-ons page; no outside account is needed.",
    "It is included with the free Light plan.",
    "Uninstalling keeps your trips and records; the Driver role stays in place too.",
  ],
  faqs: [
    {
      q: "Is Route Dispatch included in the free Light plan?",
      a: "Yes. Route Dispatch is one of the add-ons included with Light.",
    },
    {
      q: "Does udhaar from the route show on the customer's account?",
      a: "Yes. The part of a sale not paid in cash is posted to that shop's account, and payments the driver collects reduce it.",
    },
    {
      q: "What happens if the driver comes back short?",
      a: "The counted cash is compared with what is expected. Whatever is not handed over is written to the driver's own account, and shows on the udhaar report under drivers.",
    },
    {
      q: "What happens to stock that was not sold?",
      a: "At the end of the trip, leftover stock is moved back from the vehicle to the warehouse it came from.",
    },
    {
      q: "Can the driver take back damaged goods?",
      a: "Yes. Returns are recorded with a reason and a condition. Good items go back into stock; damaged or expired items are written off, and the shop's balance is adjusted.",
    },
    {
      q: "Can I run more than one van?",
      a: "Yes. Each vehicle is its own stock location, and each trip has its own driver, load and reports. A vehicle can only be on one open trip at a time.",
    },
    {
      q: "Can my customers see what they owe?",
      a: "Yes, if you also use the Customer Portal add-on. Your shops can log in and see their own balance, bills and payments.",
    },
  ],
};

export default content;
