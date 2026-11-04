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
    "restaurant-opening-checklist",
    "fbr-pos-integration",
  ],
  "/business/cafes-bakeries": ["choose-restaurant-pos", "restaurant-opening-checklist"],
  "/business/cloud-kitchens": ["choose-restaurant-pos", "restaurant-opening-checklist"],
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

  "/pos/pakistan": ["fbr-pos-integration", "digital-khata", "choose-restaurant-pos"],
  "/pos/lahore": ["fbr-pos-integration", "digital-khata", "choose-restaurant-pos"],
  "/pos/karachi": ["fbr-pos-integration", "digital-khata", "choose-restaurant-pos"],
  "/pos/islamabad-rawalpindi": ["fbr-pos-integration", "digital-khata", "choose-restaurant-pos"],
  "/pos/faisalabad": ["fbr-pos-integration", "digital-khata", "stock-counting"],
  "/pos/uk": ["choose-restaurant-pos", "restaurant-opening-checklist", "stock-counting"],

  "/compare/tajirpoint-vs-paper-khata": ["digital-khata", "excel-to-pos"],
  "/compare/tajirpoint-vs-excel": ["excel-to-pos", "stock-counting"],
  "/compare/tajirpoint-vs-cash-register": ["excel-to-pos", "stock-counting"],
  "/compare/tajirpoint-vs-corn-pos": ["fbr-pos-integration", "choose-restaurant-pos"],
  "/compare/tajirpoint-vs-foodics": ["choose-restaurant-pos", "restaurant-opening-checklist"],
  "/compare/tajirpoint-vs-loyverse": ["choose-restaurant-pos", "stock-counting"],
  "/compare/tajirpoint-vs-square": ["choose-restaurant-pos", "stock-counting"],

  "/extensions/fbr-integration": ["fbr-pos-integration"],
  "/extensions/restaurant": ["choose-restaurant-pos", "restaurant-opening-checklist"],
  "/extensions/restaurant-toolbox": ["choose-restaurant-pos"],
  "/extensions/cloud-kitchen": ["choose-restaurant-pos"],
};
