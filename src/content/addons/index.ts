import type { AddonContent } from "./types";
import accountingGl from "./accounting-gl";
import ageVerification from "./age-verification";
import aiPhoneOrdering from "./ai-phone-ordering";
import bigcommerceSync from "./bigcommerce-sync";
import cashManagement from "./cash-management";
import cloudKitchen from "./cloud-kitchen";
import coupons from "./coupons";
import courierLeopards from "./courier-leopards";
import courierNash from "./courier-nash";
import courierPostex from "./courier-postex";
import courierTcs from "./courier-tcs";
import customerPortal from "./customer-portal";
import deliveryAggregator from "./delivery-aggregator";
import digitalSignage from "./digital-signage";
import easypaisaPayments from "./easypaisa-payments";
import fbrIntegration from "./fbr-integration";
import hblPayments from "./hbl-payments";
import hrm from "./hrm";
import hubrise from "./hubrise";
import jazzcashPayments from "./jazzcash-payments";
import magentoSync from "./magento-sync";
import paypalPayments from "./paypal-payments";
import pharmacyPack from "./pharmacy-pack";
import quickbooksAccounting from "./quickbooks-accounting";
import razorpayPayments from "./razorpay-payments";
import restaurant from "./restaurant";
import restaurantToolbox from "./restaurant-toolbox";
import routeDispatch from "./route-dispatch";
import shopifySync from "./shopify-sync";
import squarePayments from "./square-payments";
import stripePayments from "./stripe-payments";
import timePromotions from "./time-promotions";
import websiteBuilder from "./website-builder";
import whatsappAi from "./whatsapp-ai";
import wixSync from "./wix-sync";
import woocommerceSync from "./woocommerce-sync";

/**
 * The site's write-up for every add-on, keyed by the API slug. A slug the API
 * sends that is not here still gets a page, built from the API row alone
 * (see `lib/marketing/addons.ts`).
 */
export const ADDON_CONTENT: Record<string, AddonContent> = Object.fromEntries(
  [
    accountingGl,
    ageVerification,
    aiPhoneOrdering,
    bigcommerceSync,
    cashManagement,
    cloudKitchen,
    coupons,
    courierLeopards,
    courierNash,
    courierPostex,
    courierTcs,
    customerPortal,
    deliveryAggregator,
    digitalSignage,
    easypaisaPayments,
    fbrIntegration,
    hblPayments,
    hrm,
    hubrise,
    jazzcashPayments,
    magentoSync,
    paypalPayments,
    pharmacyPack,
    quickbooksAccounting,
    razorpayPayments,
    restaurant,
    restaurantToolbox,
    routeDispatch,
    shopifySync,
    squarePayments,
    stripePayments,
    timePromotions,
    websiteBuilder,
    whatsappAi,
    wixSync,
    woocommerceSync,
  ].map((c) => [c.slug, c])
);

export type { AddonContent } from "./types";
