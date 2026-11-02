import type { Guide } from "./types";

// UK facts checked on gov.uk on 2 Nov 2026: food business registration at
// least 28 days before trading (gov.uk/food-business-registration); VAT
// threshold £90,000 over 12 months or expected in the next 30 days
// (gov.uk/vat-registration); premises/personal licences and late night
// refreshment 11pm-5am (gov.uk/guidance/alcohol-licensing); allergen guidance
// (gov.uk publication, the FSA page redirects there).
// Pakistan: registration via FBR IRIS; provincial authorities named without
// fees or deadlines, and readers are told to confirm locally.
const guide: Guide = {
  slug: "restaurant-opening-checklist",
  category: "Restaurants",
  title: "Opening a restaurant or takeaway: a checklist for Pakistan and the UK",
  seoTitle: "Opening a Restaurant or Takeaway: Checklist",
  seoDescription:
    "A step-by-step checklist for opening a restaurant or takeaway in Pakistan or the UK: registration, food safety, tax, licences, staff, systems, a 12-week plan.",
  keywords: [
    "how to open a restaurant",
    "restaurant opening checklist",
    "open a takeaway UK",
    "restaurant licence Pakistan",
    "register a food business",
    "takeaway startup checklist",
    "restaurant business plan Pakistan",
  ],
  summary:
    "Everything to sort before your first order, in the right order: registrations, food safety, tax, licences, staff, systems and marketing, for Pakistan and the UK.",
  shortAnswer:
    "To open a restaurant or takeaway, register the business and for tax, get your food safety registration or licence, sort any alcohol or late-night licence, plan your menu and costs, hire and train staff, and set up your POS, kitchen and delivery. In the UK you must register with your council at least 28 days before trading. In Pakistan, register with FBR and your province's food and revenue authorities.",
  keyPoints: [
    "The paperwork for Pakistan and for the UK, side by side",
    "Menu costing before you print a single menu",
    "Systems, staff and a soft opening",
    "A 12-week countdown you can follow",
  ],
  sections: [
    {
      id: "before-you-start",
      heading: "Before you start: concept, numbers and location",
      blocks: [
        {
          type: "list",
          items: [
            "**Concept.** Dine-in, takeaway, delivery-only (cloud kitchen) or a mix. This decides your space, staff and systems.",
            "**Numbers.** Write down start-up costs (rent deposit, fit-out, kitchen equipment, first stock, licences) and monthly costs (rent, salaries, utilities, ingredients, delivery fees). Keep three months of running costs in reserve.",
            "**Location.** Check footfall at the hours you will open, parking, delivery reach, and whether the building is allowed to be used as a restaurant or hot food takeaway.",
            "**Menu size.** A short menu is faster to cook, easier to cost, and wastes less. You can always add dishes later.",
          ],
        },
      ],
    },
    {
      id: "pakistan",
      heading: "Pakistan: registrations and licences",
      blocks: [
        {
          type: "note",
          tone: "info",
          text: "Rules differ by province and city, and they change. Use this as a list of what to ask about, and confirm each item with the authority or a local tax adviser.",
        },
        {
          type: "list",
          ordered: true,
          items: [
            "**Business and NTN.** Register with FBR on [IRIS](https://iris.fbr.gov.pk) for your NTN. If you set up a company, register it with the SECP first.",
            "**Sales tax on services.** Restaurants pay sales tax on services to their province: PRA (Punjab), SRB (Sindh), KPRA (Khyber Pakhtunkhwa) or BRA (Balochistan). Islamabad falls under FBR. Register before you open.",
            "**POS reporting.** FBR's FAQs say restaurants must integrate their POS, and provincial authorities may have their own systems. Read our [FBR POS integration guide](/guides/fbr-pos-integration).",
            "**Food licence.** Apply to your provincial food authority (for example the Punjab Food Authority). Expect an inspection of the kitchen, storage and cleanliness.",
            "**Staff health.** Food authorities usually expect food handlers to have medical certificates and basic hygiene training. Keep the records at the restaurant.",
            "**Local permits.** Ask your municipal corporation or cantonment board about trade licences, signboards and outdoor seating.",
            "**Fire safety.** Extinguishers, a clear exit and safe gas lines in the kitchen. Some areas inspect before opening.",
            "**Staff registration.** Ask your adviser about registering employees with EOBI and provincial social security.",
          ],
        },
      ],
    },
    {
      id: "uk",
      heading: "UK: registrations and licences",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "**Register your food business** with your local council **at least 28 days before you start trading** ([gov.uk](https://www.gov.uk/food-business-registration)). If you trade from premises in more than one council area, register with each. The council will inspect you and give you a food hygiene rating.",
            "**Food safety management.** You need a written food safety system based on HACCP principles. Many small businesses use the Food Standards Agency's Safer Food, Better Business pack. Staff who handle food need hygiene training.",
            "**Allergens.** You must be able to tell customers about the 14 major allergens in every dish, and prepacked-for-direct-sale food needs a full ingredients label with allergens highlighted ([allergen guidance](https://www.gov.uk/government/publications/allergen-guidance-for-food-businesses)).",
            "**Licences.** Selling alcohol needs a premises licence and a designated premises supervisor with a personal licence. Selling hot food or drink between **11pm and 5am** needs a late night refreshment licence ([alcohol licensing](https://www.gov.uk/guidance/alcohol-licensing)).",
            "**Planning.** Check with the council that your premises can be used as a restaurant or hot food takeaway, and ask about extraction and signage.",
            "**HMRC.** Register as a sole trader or set up a company. Register for VAT once taxable turnover goes over **£90,000** in 12 months, or is expected to within the next 30 days ([VAT registration](https://www.gov.uk/vat-registration)). Hot food and most takeaway food is standard-rated, so plan your prices with VAT in mind.",
            "**Employing staff.** Right-to-work checks, PAYE payroll, a workplace pension, and employers' liability insurance.",
            "**Business rates and waste.** Contact the council about business rates, and arrange a licensed commercial waste collection.",
          ],
        },
      ],
    },
    {
      id: "menu-costing",
      heading: "Cost your menu before you print it",
      blocks: [
        {
          type: "p",
          text: "Work out the cost of every dish from its recipe: each ingredient's cost for the amount used, plus packaging for takeaway. Then set the price so food cost is a sensible share of it.",
        },
        {
          type: "table",
          caption: "Example: costing one burger",
          head: ["Item", "Cost"],
          rows: [
            ["Bun", "Rs 40"],
            ["Patty (150 g)", "Rs 210"],
            ["Cheese, sauce, salad", "Rs 60"],
            ["Box and bag (takeaway)", "Rs 35"],
            ["Total cost", "Rs 345"],
            ["Price at 35% food cost (345 ÷ 0.35)", "about Rs 990"],
          ],
        },
        {
          type: "p",
          text: "The numbers are an example only; use your own supplier prices. Repeat for every dish and every size. Delivery apps take a commission, so check your margin on app orders separately.",
        },
      ],
    },
    {
      id: "systems",
      heading: "Systems: POS, kitchen and delivery",
      blocks: [
        {
          type: "list",
          items: [
            "**POS** that handles your service style, modifiers and deals, works offline and gives a Z-report per register. Our [restaurant POS checklist](/guides/choose-restaurant-pos) has 12 points to test.",
            "**Kitchen tickets** on a screen per station, or kitchen printers.",
            "**Receipt printer, cash drawer and card terminal.**",
            "**Online orders:** your own order link for Instagram, Facebook and WhatsApp, and delivery apps if you use them.",
            "**Recipes and stock** set up from day one, so you know your food cost in week one, not month three. See our [stock counting guide](/guides/stock-counting).",
            "**Accounts:** a separate business bank account and a simple way to record expenses.",
          ],
        },
      ],
    },
    {
      id: "staff-and-soft-opening",
      heading: "Staff, training and a soft opening",
      blocks: [
        {
          type: "list",
          items: [
            "Hire your head cook first and build the menu with them.",
            "Write down recipes with exact quantities and a photo of the finished plate.",
            "Train everyone on the POS before opening day, including voids and refunds.",
            "Give each person their own POS login and role.",
            "Run a **soft opening**: two or three days for friends, family and neighbours, with a smaller menu. Fix what breaks before the public opening.",
          ],
        },
      ],
    },
    {
      id: "countdown",
      heading: "A 12-week countdown",
      blocks: [
        {
          type: "table",
          caption: "What to do, and when",
          head: ["When", "What to do"],
          rows: [
            [
              "12 weeks before",
              "Sign the premises, register the business, start licence and planning applications",
            ],
            ["10 weeks", "Fit-out and kitchen equipment ordered; food safety system written"],
            ["8 weeks", "Menu and recipes tested and costed; suppliers chosen"],
            [
              "6 weeks",
              "UK: register the food business with the council (at least 28 days before). PK: food authority and tax registrations done",
            ],
            ["4 weeks", "POS, printers and kitchen screens set up; menu loaded; staff hired"],
            [
              "2 weeks",
              "Staff training; online order page and social accounts live; first stock ordered",
            ],
            ["1 week", "Soft opening; fix problems; final cleaning and checks"],
            ["Opening day", "Count opening stock, open the register, and enjoy it"],
          ],
        },
      ],
    },
    {
      id: "tajirpoint",
      heading: "Setting up your systems with TajirPoint",
      blocks: [
        {
          type: "p",
          text: "TajirPoint covers the systems part of this list in one place: a counter POS, tables and a waiter app, kitchen screens or printed tickets, your own online order page, an order board, a rider app, recipes and kitchen stock, and day-end reports. It runs on web, Windows and Android and keeps selling offline.",
        },
        {
          type: "p",
          text: "The Light plan is free for 3 months with no card, so you can set everything up before you open. See the [restaurant POS](/business/restaurants), the [cloud kitchen](/business/cloud-kitchens) set-up, or [ask for a call back](/get-a-call) and we will help you plan it.",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "How early must I register a food business in the UK?",
      a: "At least 28 days before you start trading, with your local council. Registration is done through gov.uk.",
    },
    {
      q: "Do I need a licence to sell takeaway food late at night in the UK?",
      a: "Yes. Selling hot food or drink to the public between 11pm and 5am needs a late night refreshment licence from the council, as part of a premises licence.",
    },
    {
      q: "When does a UK restaurant have to register for VAT?",
      a: "When taxable turnover goes over £90,000 in the last 12 months, or you expect it to within the next 30 days.",
    },
    {
      q: "Which tax authority does a restaurant in Pakistan deal with?",
      a: "Usually FBR for income tax and the provincial authority for sales tax on services (PRA, SRB, KPRA or BRA). In Islamabad, FBR. Confirm with a local tax adviser.",
    },
    {
      q: "Does a restaurant in Pakistan need to integrate its POS with FBR?",
      a: "FBR's POS FAQs say all restaurants, snack bars and cafes must integrate their POS. Read our FBR POS integration guide for details and sources.",
    },
    {
      q: "What food cost percentage should I aim for?",
      a: "Many restaurants aim for roughly 28-35% food cost, but it depends on your concept and prices. Cost every dish from its recipe and check it monthly.",
    },
  ],
  sources: [
    {
      label: "Register a food business",
      url: "https://www.gov.uk/food-business-registration",
      publisher: "GOV.UK",
    },
    { label: "Register for VAT", url: "https://www.gov.uk/vat-registration", publisher: "GOV.UK" },
    {
      label: "Alcohol licensing (incl. late night refreshment)",
      url: "https://www.gov.uk/guidance/alcohol-licensing",
      publisher: "GOV.UK",
    },
    {
      label: "Allergen guidance for food businesses",
      url: "https://www.gov.uk/government/publications/allergen-guidance-for-food-businesses",
      publisher: "GOV.UK / Food Standards Agency",
    },
    { label: "IRIS: NTN and tax registration", url: "https://iris.fbr.gov.pk", publisher: "FBR" },
  ],
  checked: "2 November 2026",
  links: [
    {
      label: "Restaurant POS",
      href: "/business/restaurants",
      note: "Tables, KDS, waiter app, online orders and delivery",
    },
    {
      label: "Cloud kitchens",
      href: "/business/cloud-kitchens",
      note: "Several brands from one kitchen",
    },
    { label: "Add-ons", href: "/extensions", note: "Payments, accounting, delivery and more" },
    { label: "Pricing", href: "/pricing", note: "Light is free for 3 months, no card" },
    { label: "Get a call back", href: "/get-a-call", note: "We help you plan your set-up" },
  ],
  related: ["choose-restaurant-pos", "fbr-pos-integration", "stock-counting"],
  datePublished: "2026-11-02",
  dateModified: "2026-11-02",
  og: {
    eyebrow: "Guide · Opening checklist",
    title: "Opening a restaurant or takeaway? Start here.",
    sub: "Registrations, licences, food safety, menu costing and a 12-week plan, for Pakistan and the UK.",
    pills: ["Pakistan", "UK", "Licences", "12-week plan"],
  },
};

export default guide;
