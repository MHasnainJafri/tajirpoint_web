import type { Guide } from "./types";
import { BRAND_NAME } from "@/lib/config/brand";

// Sources fetched and read on 5 Nov 2026: NRA medians (restaurant.org, 2025
// Restaurant Operations Data Abstract: limited-service 32.4%, full-service
// 32.0% of sales in 2024, "not intended to represent standards or goals");
// JWU Online (28-35%, price = cost ÷ target %); Escoffier (goal 30% or less);
// FSR Magazine (opening + purchases − closing = use; food only; count prep);
// BCcampus open textbook (five standards: specs, recipes, yields, portions,
// portion costs); WRAP 2013 (920,000 t, 75% avoidable, 21/45/34 split,
// £2.5bn, ~£10,000 per outlet); FSA Safer Food Better Business stock control
// (first in, first out "helps to avoid waste").
//
// Tajir Point claims, checked in code on 5 Nov 2026: recipe editor with
// portions, Waste %, cost per portion, margin and food cost (web
// features/restaurant/recipes, backend recipe_service.recipe_costing; cost =
// moving average purchase cost, else purchase price); recipes per size + copy
// to sizes; toppings deduct (ModifierOptionIngredient). Kitchen stock page
// (live web 19-87 / backend 19-86): start / in / used / wasted / count / now,
// Record waste with reasons (went off, dropped, burnt, sent back) or a whole
// dish, Make prep batches, blind count + "count every day", day report with
// sales, food cost, food cost %, dishes sold, should-have-used vs actually-used,
// order list by supplier with Send on WhatsApp, low level / fill-up-to / shelf
// life "use first". Void reasons (some need a manager) + Void report by
// reason, staff and day (restaurants void_reasons, settings hub). No claim of
// a menu-engineering report or supplier price alerts: none found.
const guide: Guide = {
  slug: "restaurant-food-cost",
  category: "Restaurants",
  title: "Restaurant food cost: how to calculate it and bring it down",
  seoTitle: "Restaurant Food Cost: Calculate It and Cut It",
  seoDescription:
    "How to calculate restaurant food cost % for one dish and for a month, what a good food cost is, and 10 practical ways to bring it down, with worked examples.",
  keywords: [
    "restaurant food cost",
    "food cost percentage",
    "how to calculate food cost",
    "food cost formula",
    "plate cost",
    "theoretical vs actual food cost",
    "reduce food cost restaurant",
    "recipe costing",
  ],
  summary:
    "Food cost is the biggest cost you can control every day. Here is how to work it out for one dish and for the whole kitchen, what the numbers mean, and ten ways to bring it down.",
  shortAnswer:
    "Food cost % = cost of food used ÷ food sales × 100. For a week or month, food used = opening stock + purchases − closing stock. For one dish, divide the ingredient cost of one plate by its menu price before tax. Many restaurants land around 28-35%. Bring it down by costing every recipe, fixing portions, logging waste and counting stock.",
  keyPoints: [
    "The food cost formula, with worked examples for one dish and one month",
    "What a good food cost percentage is, and why one number does not fit everyone",
    "Theoretical vs actual food cost: how to find where the money goes",
    "Ten practical ways to bring food cost down without cutting quality",
  ],
  sections: [
    {
      id: "formula",
      heading: "How do you calculate food cost percentage?",
      blocks: [
        {
          type: "p",
          text: "Food cost percentage tells you how much of every sale goes on the food itself. If your food cost is 30%, then for every 100 you take in food sales, 30 went on ingredients.",
        },
        {
          type: "p",
          text: "**Food cost % = cost of food used ÷ food sales × 100**",
        },
        {
          type: "p",
          text: "For a week or a month, you work out the food you used from your stock counts and purchases:",
        },
        {
          type: "p",
          text: "**Food used = opening stock + purchases − closing stock**",
        },
        {
          type: "table",
          caption: "Worked example: one month in a small restaurant (works in any currency)",
          head: ["Line", "Amount"],
          rows: [
            ["Opening stock (counted on the 1st)", "4,200"],
            ["+ Food purchases during the month", "11,800"],
            ["− Closing stock (counted on the last day)", "3,600"],
            ["= Food used", "12,400"],
            ["Food sales for the month, before tax", "38,000"],
            ["Food cost % (12,400 ÷ 38,000 × 100)", "32.6%"],
          ],
        },
        {
          type: "h3",
          text: "Four rules that keep the number honest",
        },
        {
          type: "list",
          items: [
            "**Use the same period for everything.** Stock, purchases and sales must cover exactly the same days.",
            "**Count food only.** Leave out packaging, cleaning supplies, napkins and equipment. They are real costs, but not food cost.",
            "**Use sales before tax.** Sales tax or VAT is not your money. Including it makes food cost look lower than it is.",
            "**Count everything on the shelf,** including prep in the fridge (sauces, marinated meat, dough). A missed shelf gives you a falsely high food cost.",
          ],
        },
        {
          type: "note",
          tone: "warn",
          title: "Purchases are not food cost",
          text: "Dividing a month's purchases by sales is a common mistake. If you bought a lot at the end of the month, the number looks terrible; if you ran stock down, it looks great. Only stock counts at both ends tell you what you actually used.",
        },
      ],
    },
    {
      id: "plate-cost",
      heading: "Plate cost vs period food cost",
      blocks: [
        {
          type: "p",
          text: "There are two food cost numbers, and you need both:",
        },
        {
          type: "list",
          items: [
            "**Plate cost** (or dish food cost) is what the ingredients for one portion should cost, worked out from the recipe. You use it to set prices.",
            "**Period food cost** is what the kitchen actually used over a week or month, from your stock counts. It shows what really happened.",
          ],
        },
        {
          type: "p",
          text: "To cost a plate, list every ingredient in the recipe with the amount in one portion, multiply each by what you pay per unit, and add them up. Add a small allowance for trim and cooking loss. Then divide by the menu price before tax.",
        },
        {
          type: "table",
          caption: "Worked example: costing one chicken burger with fries",
          head: ["Ingredient", "Amount per plate", "Price paid", "Cost"],
          rows: [
            ["Bun", "1", "0.40 each", "0.40"],
            ["Chicken fillet", "150 g", "9.00 per kg", "1.35"],
            ["Cheese slice", "1", "0.25 each", "0.25"],
            ["Lettuce, tomato, onion", "-", "-", "0.20"],
            ["Burger sauce", "30 g", "6.00 per kg", "0.18"],
            ["Fries", "150 g", "2.40 per kg", "0.36"],
            ["Subtotal", "", "", "2.74"],
            ["+ 5% trim and cooking loss", "", "", "0.14"],
            ["Plate cost", "", "", "2.88"],
            ["Menu price before tax", "", "", "9.50"],
            ["Food cost % (2.88 ÷ 9.50 × 100)", "", "", "30.3%"],
          ],
        },
        {
          type: "p",
          text: "Ingredient prices change, so plate costs go out of date. Re-cost your dishes whenever a main ingredient changes price, and at least every few months. Try your own numbers in the free [food cost calculator](/tools/food-cost-calculator).",
        },
      ],
    },
    {
      id: "good-food-cost",
      heading: "What is a good food cost percentage?",
      blocks: [
        {
          type: "p",
          text: "There is no single right number. It depends on your menu, your prices, your rent and your labour. But it helps to know where others land.",
        },
        {
          type: "table",
          caption: "Food cost benchmarks and what moves them",
          head: ["Type of restaurant", "What the data says", "What pushes it up or down"],
          rows: [
            [
              "Full-service (sit-down)",
              "Median 32.0% of sales in 2024 (US survey, food and non-alcohol drinks)",
              "Premium proteins and large portions push it up; higher menu prices pull it down",
            ],
            [
              "Limited-service (quick service, takeaway, counter)",
              "Median 32.4% of sales in 2024 (same US survey)",
              "Low prices and combo deals push it up; cheap staples like bread, rice and potatoes pull it down",
            ],
            [
              "Cafés and coffee shops",
              "No reliable public median",
              "Drinks usually cost less per sale than food; cakes and sandwiches cost more",
            ],
            [
              "Cloud kitchens and delivery-led",
              "No reliable public median",
              "Packaging and delivery-app commission are not food cost, but they eat the same margin, so price for them",
            ],
            [
              "Fine dining",
              "No reliable public median",
              "Expensive ingredients push it up; high prices and set menus pull it down",
            ],
          ],
        },
        {
          type: "p",
          text: "The two medians come from the [National Restaurant Association's 2025 Restaurant Operations Data Abstract](https://www.restaurant.org/research-and-media/research/restaurant-economic-insights/analysis-commentary/restaurant-operators-kept-food-cost-ratios-in-check-in-2024/), based on more than 900 US operators. The Association says plainly that these figures are not standards or goals for any single restaurant. Hospitality schools such as Johnson & Wales University give 28-35% as the usual range for a profitable restaurant, and many owners aim for 30% or less.",
        },
        {
          type: "h3",
          text: "Set your own target",
        },
        {
          type: "p",
          text: "Work backwards from your costs. If rent, labour and everything else take 60% of sales and you want 8% left as profit, food can take at most 32%. Then watch the trend. A food cost that creeps up a point every month matters more than how you compare to someone else.",
        },
        {
          type: "note",
          tone: "info",
          title: "Lower is not always better",
          text: "A steak at 35% food cost can leave more money per plate than a burger at 25%. Food cost % tells you how efficient a dish is; the margin in money (price minus plate cost) tells you how much it pays towards your bills. Look at both.",
        },
      ],
    },
    {
      id: "theoretical-vs-actual",
      heading: "Theoretical vs actual food cost: finding the gap",
      blocks: [
        {
          type: "p",
          text: "**Theoretical food cost** is what you should have used: every dish sold multiplied by its recipe. It assumes perfect portions, no waste and no theft.",
        },
        {
          type: "p",
          text: "**Actual food cost** is what you really used, from opening stock + purchases − closing stock.",
        },
        {
          type: "p",
          text: "The difference is your **variance**. It is the food that left the kitchen without being paid for in a plate.",
        },
        {
          type: "table",
          caption: "Worked example: the same month as above",
          head: ["Line", "Amount", "% of food sales"],
          rows: [
            ["Theoretical (dishes sold × recipes)", "11,600", "30.5%"],
            ["Actual (from stock counts)", "12,400", "32.6%"],
            ["Variance", "800", "2.1 points"],
          ],
        },
        {
          type: "p",
          text: "In this example, 800 of food went missing in one month. Over a year that is 9,600, most of a month's food purchases. The usual causes are:",
        },
        {
          type: "list",
          items: [
            "**Over-portioning:** an extra scoop of rice, a heavier hand with cheese",
            "**Waste:** food that went off, was burnt, dropped or sent back, and was never written down",
            "**Recipes that are out of date:** the kitchen changed the dish but the recipe did not change",
            "**Price changes:** suppliers charge more than the recipe cost assumes",
            "**Unrecorded food:** staff meals, free items for friends, tastings",
            "**Theft:** stock that leaves by the back door",
            "**Counting mistakes:** a missed shelf, or kilos entered as grams",
          ],
        },
        {
          type: "p",
          text: "Recipes are never exact, so a small gap is normal. Look at the gap ingredient by ingredient, start with the expensive ones, and watch whether it grows or shrinks month to month.",
        },
      ],
    },
    {
      id: "ten-ways",
      heading: "10 practical ways to lower your food cost",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "**Cost every recipe.** Write each dish down with exact amounts, how many portions it makes, and the cost per portion. A Canadian cooking textbook (BCcampus) lists the five standards behind food cost control: purchase specifications, recipes, yields, portion sizes and portion costs. You cannot control a dish you have not costed.",
            "**Fix the portions.** Use scales, measured ladles and scoops, and a photo of each finished plate on the kitchen wall. If one cook serves 150 g of chicken and another 200 g, that is a third more chicken on every plate from the second cook.",
            "**Keep a waste log.** Write down everything thrown away, with how much and why: went off, burnt, dropped, sent back. In a UK study by WRAP, 45% of restaurant and catering food waste came from preparation, 21% from spoilage and 34% from customers' plates, and three quarters of it could have been eaten.",
            "**Check supplier prices and deliveries.** Compare prices every few weeks, ask for a written price list, and check each delivery against the order for weight, count and quality before you sign. A short delivery you paid for in full is food cost with nothing to show for it.",
            "**Engineer your menu.** Put every dish on two scales: how many you sell, and how much money each plate leaves after its food cost. Keep and promote the dishes that sell well and earn well, re-price or re-work the ones that sell well but earn little, and drop the ones that do neither.",
            "**Count your stock regularly.** Count expensive ingredients (meat, chicken, cheese, oil) daily or weekly, and everything else at least monthly. Count blind, without seeing the expected number. See our [stock counting guide](/guides/stock-counting).",
            "**Use the oldest stock first.** Follow first in, first out (FIFO): put new deliveries behind the old, label everything with the date, and set a shelf life for fresh items. The UK Food Standards Agency's guidance for caterers says FIFO helps to avoid waste.",
            "**Plan your prep.** Make sauces, marinades and dough in batches sized to what you will sell, based on the same day in past weeks. Over-prep is the most common source of waste that nobody sees.",
            "**Control voids, comps and staff meals.** Give each staff member their own login, make voids and free items need a reason and a manager, and ring up staff meals. Check voids and comps by staff member every week.",
            "**Price from your target.** Menu price = plate cost ÷ target food cost %. A dish costing 2.88 at a 28% target should sell for about 10.29 before tax. Re-price when costs rise, rather than quietly shrinking portions.",
          ],
        },
        {
          type: "note",
          tone: "info",
          title: "Start with the top five",
          text: "Most food cost sits in a few ingredients. Pick the five you spend most on, and the five dishes you sell most. Get those recipes, portions and counts right first, and you will have fixed most of the problem.",
        },
      ],
    },
    {
      id: "routine",
      heading: "A simple weekly food cost routine",
      blocks: [
        {
          type: "list",
          ordered: true,
          items: [
            "**Daily:** record waste before closing; count the few most expensive ingredients.",
            "**Weekly:** enter every supplier invoice; compare theoretical and actual use for your top ingredients; check voids and comps.",
            "**Monthly:** do a full count at month end; work out actual food cost %; compare it to last month and to your target.",
            "**When prices change:** re-cost the dishes that use that ingredient and decide whether to re-price.",
          ],
        },
      ],
    },
    {
      id: "tajirpoint",
      heading: `How ${BRAND_NAME} helps`,
      blocks: [
        {
          type: "p",
          text: `${BRAND_NAME} keeps the food cost numbers up to date as you sell, so you do not have to rebuild them in a spreadsheet:`,
        },
        {
          type: "list",
          items: [
            "Recipes from the dish form, per size, with a waste % for trim and cooking loss",
            "Cost per portion, margin and food cost % next to the menu price, worked out from what you paid for each ingredient",
            "Every sale takes its ingredients off stock, including toppings and extras",
            "A kitchen stock page showing what you started with, what came in, what was used, what was thrown away, your count and what is left",
            "Record waste with a reason (went off, dropped, burnt, sent back), or write off a whole dish in one step",
            "Make prep in batches: sauces, marinated chicken or dough come off their ingredients and go into stock as prep items",
            "Blind counts, with the items you count every day shown first",
            "A day report with sales, food cost and food cost %, dish by dish, and what the kitchen should have used against what it actually used",
            "Low-stock and use-first alerts, and an order list grouped by supplier that you can send on WhatsApp",
            "Void reasons, with a manager needed for some, and a void report by reason, staff member and day",
          ],
        },
        {
          type: "p",
          text: "See the [restaurant POS page](/business/restaurants) or [book a demo](/book-demo) with your own menu. The Light plan is free for 3 months; see [pricing](/pricing).",
        },
      ],
    },
  ],
  faqs: [
    {
      q: "What is the formula for food cost percentage?",
      a: "Food cost % = cost of food used ÷ food sales × 100. For a period, food used = opening stock + purchases − closing stock. For one dish, divide the ingredient cost of one portion by the menu price before tax.",
    },
    {
      q: "What is a good food cost percentage for a restaurant?",
      a: "Many restaurants land between about 28% and 35%. A US industry survey found medians of 32.0% for full-service and 32.4% for limited-service restaurants in 2024. Your own target depends on your prices, rent and labour.",
    },
    {
      q: "Should packaging and drinks be in food cost?",
      a: "Keep packaging out of food cost and track it on its own, because it is a big cost for takeaway and delivery. Many restaurants also track drinks separately, since drinks usually have a very different cost from food.",
    },
    {
      q: "How often should I calculate food cost?",
      a: "Work out actual food cost at least monthly, from a full stock count. Check your most expensive ingredients weekly or even daily, so problems show up in days, not months.",
    },
    {
      q: "Why is my actual food cost higher than my recipe costs?",
      a: "Recipe costs assume perfect portions and no waste. The gap usually comes from over-portioning, unrecorded waste, staff meals, supplier price rises, outdated recipes, counting mistakes or theft. Compare ingredient by ingredient to find it.",
    },
    {
      q: "Does a lower food cost always mean more profit?",
      a: "No. A dish with a higher food cost % can still leave more money per plate. Look at food cost % and the margin in money together, and at how many you sell.",
    },
    {
      q: `Can ${BRAND_NAME} work out my food cost?`,
      a: "Yes. Give each dish a recipe and it shows the cost per portion and food cost % next to the price. The kitchen stock day report shows food cost % for the day, and what the kitchen should have used against what it actually used.",
    },
  ],
  sources: [
    {
      label: "Restaurant operators kept food cost ratios in check in 2024",
      url: "https://www.restaurant.org/research-and-media/research/restaurant-economic-insights/analysis-commentary/restaurant-operators-kept-food-cost-ratios-in-check-in-2024/",
      publisher: "National Restaurant Association",
    },
    {
      label: "Menu pricing: how to price a restaurant menu",
      url: "https://online.jwu.edu/blog/how-price-restaurant-menu-profitability/",
      publisher: "Johnson & Wales University",
    },
    {
      label: "How to price a menu to improve profitability for your restaurant",
      url: "https://www.escoffier.edu/blog/food-entrepreneurship/how-to-price-a-menu-to-improve-profitability-for-your-restaurant/",
      publisher: "Auguste Escoffier School of Culinary Arts",
    },
    {
      label: "Learn the right way to calculate restaurant food cost",
      url: "https://www.fsrmagazine.com/feature/learn-right-way-calculate-restaurant-food-cost/",
      publisher: "FSR Magazine",
    },
    {
      label: "Controlling food costs (Basic Kitchen and Food Service Management)",
      url: "https://opentextbc.ca/basickitchenandfoodservicemanagement/chapter/controlling-food-costs/",
      publisher: "BCcampus",
    },
    {
      label: "Overview of waste in the hospitality and food service sector",
      url: "https://www.wrap.ngo/resources/report/overview-waste-hospitality-and-food-service-sector",
      publisher: "WRAP",
    },
    {
      label: "The true cost of waste in hospitality and food service",
      url: "https://wrap.ngo/resources/report/true-cost-waste-hospitality-and-food-service",
      publisher: "WRAP",
    },
    {
      label: "Safer food, better business for caterers (Stock control)",
      url: "https://www.gov.uk/government/publications/safer-food-better-business-for-caterers",
      publisher: "Food Standards Agency",
    },
  ],
  checked: "5 November 2026",
  links: [
    {
      label: "Food cost calculator",
      href: "/tools/food-cost-calculator",
      note: "Free: food cost % for a dish or a month, and the price for your target",
    },
    {
      label: "Stock counting guide",
      href: "/guides/stock-counting",
      note: "Full and cycle counts, variances and controls",
    },
    {
      label: "Profit margin calculator",
      href: "/tools/profit-margin-calculator",
      note: "Margin and markup from cost and price",
    },
    {
      label: "Restaurant POS",
      href: "/business/restaurants",
      note: "Recipes, kitchen stock and day-end reports",
    },
    {
      label: "Cafés & bakeries",
      href: "/business/cafes-bakeries",
      note: "Recipes that deduct ingredients as you sell",
    },
    {
      label: "Cloud kitchens",
      href: "/business/cloud-kitchens",
      note: "Several brands, one kitchen",
    },
    { label: "Book a demo", href: "/book-demo", note: "See your own menu costed" },
  ],
  related: ["stock-counting", "choose-restaurant-pos", "restaurant-opening-checklist"],
  datePublished: "2026-11-05",
  dateModified: "2026-11-05",
  og: {
    eyebrow: "Guide · Food cost",
    title: "Work out your food cost, then bring it down.",
    sub: "The formula, worked examples, theoretical vs actual, and ten practical fixes.",
    pills: ["Food cost %", "Plate cost", "Waste", "Recipes"],
  },
};

export default guide;
