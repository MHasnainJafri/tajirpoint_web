/**
 * Which guides each page links to in its "Related guides" block
 * (components/marketing/guides/RelatedGuides.tsx). The guides are the site's
 * most useful pages and were reached almost only from the footer and the
 * /guides hub (SEO audit 4 Nov 2026); these links carry visitors and crawl
 * weight to them from the pages people land on. Order = order on the page.
 */
export const GUIDE_PLACEMENT: Readonly<Record<string, readonly string[]>> = {
  "/business/restaurants": [
    "choose-restaurant-pos",
    "restaurant-food-cost",
    "restaurant-opening-checklist",
  ],
  "/business/cafes-bakeries": [
    "restaurant-food-cost",
    "choose-restaurant-pos",
    "restaurant-opening-checklist",
  ],
  "/business/cloud-kitchens": [
    "restaurant-food-cost",
    "choose-restaurant-pos",
    "restaurant-opening-checklist",
  ],
  "/business/grocery-kiryana": ["digital-khata", "stock-counting", "excel-to-pos"],
  "/business/retail-fashion": ["stock-counting", "excel-to-pos", "fbr-pos-integration"],
  "/business/pharmacy": ["stock-counting", "fbr-pos-integration"],
  "/business/electronics-mobile": ["stock-counting", "digital-khata"],
  "/business/distributors-wholesale": ["digital-khata", "stock-counting"],
  "/business/furniture-home": ["excel-to-pos", "digital-khata"],
  "/business/factories-mills": ["stock-counting", "digital-khata"],
  "/business/salons-services": ["excel-to-pos", "digital-khata"],
  "/business/transport-delivery": ["excel-to-pos"],

  "/features/e-invoicing": ["fbr-pos-integration"],
  "/features/khata": ["digital-khata"],
  "/features/accounting": ["excel-to-pos", "digital-khata"],
  "/features/offline": ["choose-restaurant-pos"],
  "/features/van-sales": ["digital-khata", "stock-counting"],

  "/pos/pakistan": ["best-pos-software-pakistan", "fbr-pos-integration", "digital-khata"],
  "/pos/lahore": ["best-pos-software-pakistan", "fbr-pos-integration", "digital-khata"],
  "/pos/karachi": ["best-pos-software-pakistan", "fbr-pos-integration", "digital-khata"],
  "/pos/islamabad-rawalpindi": [
    "best-pos-software-pakistan",
    "fbr-pos-integration",
    "digital-khata",
  ],
  "/pos/faisalabad": ["best-pos-software-pakistan", "fbr-pos-integration", "digital-khata"],
  "/pos/uk": ["choose-restaurant-pos", "restaurant-food-cost", "restaurant-opening-checklist"],

  "/compare/tajirpoint-vs-paper-khata": ["digital-khata", "excel-to-pos"],
  "/compare/tajirpoint-vs-excel": ["excel-to-pos", "stock-counting"],
  "/compare/tajirpoint-vs-cash-register": ["excel-to-pos", "stock-counting"],
  "/compare/tajirpoint-vs-corn-pos": [
    "best-pos-software-pakistan",
    "fbr-pos-integration",
    "choose-restaurant-pos",
  ],
  "/compare/tajirpoint-vs-oscar": [
    "best-pos-software-pakistan",
    "fbr-pos-integration",
    "choose-restaurant-pos",
  ],
  "/compare/tajirpoint-vs-foodics": ["choose-restaurant-pos", "restaurant-opening-checklist"],
  "/compare/tajirpoint-vs-loyverse": ["choose-restaurant-pos", "stock-counting"],
  "/compare/tajirpoint-vs-square": ["choose-restaurant-pos", "stock-counting"],

  "/tools/food-cost-calculator": ["restaurant-food-cost", "stock-counting"],
  "/tools/profit-margin-calculator": ["restaurant-food-cost", "excel-to-pos"],
  "/tools/break-even-calculator": ["restaurant-food-cost", "restaurant-opening-checklist"],

  "/extensions/fbr-integration": ["fbr-pos-integration"],
  "/extensions/restaurant": [
    "choose-restaurant-pos",
    "restaurant-food-cost",
    "restaurant-opening-checklist",
  ],
  "/extensions/restaurant-toolbox": ["restaurant-food-cost", "choose-restaurant-pos"],
  "/extensions/cloud-kitchen": ["restaurant-food-cost", "choose-restaurant-pos"],
};
