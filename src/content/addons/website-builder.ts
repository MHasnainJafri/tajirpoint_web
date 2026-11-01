import type { AddonContent } from "./types";

// Source: domains/storefront (handler.py creates the site, hours, blocks and
// subdomain on install and unpublishes on uninstall; models/website.py
// templates, ordering modes, order_via checkout/WhatsApp; models/domain.py
// subdomain + custom domain with automatic certificate; models/revision.py
// draft/publish; delivery_zone.py, shipping.py, discount.py codes, popup.py,
// upsell.py, content_page.py, submissions.py; services/payment_options.py
// gateways only via a payment add-on; services/ordering_channels.py Google).
const content: AddonContent = {
  slug: "website-builder",
  seoTitle: "Website Builder: Online Shop & Order Page for Your POS",
  seoDescription:
    "Get a website filled from your POS: products, menu, prices and hours. Pick a design, take orders by checkout or WhatsApp, and use your own domain if you like.",
  keywords: [
    "website for my shop",
    "restaurant online ordering website",
    "online store linked to POS",
    "WhatsApp ordering website",
    "website builder Pakistan",
    "shop website with custom domain",
  ],
  schemaSubCategory: "Online store and website builder add-on for POS",
  headline: "A website that already knows your products, prices and opening hours.",
  overview: [
    "Website Builder gives your business its own website, built from what is already in TajirPoint: your products or menu, prices, photos, opening hours and contact details. When you change a price at the till, the website shows the new price.",
    "Pick a design made for your kind of business: several restaurant designs, grocery, electronics, services and bill pay, a mix of products and services, or a simple general shop. Set your colours and logo, edit sections, and publish when you are happy. Changes stay a draft until you publish them.",
    "Customers can order through a cart and checkout, by WhatsApp, or both. Online orders arrive in TajirPoint, and you choose whether you take them all day or only during opening hours. You get a free web address on our domain, and you can connect your own domain too.",
  ],
  whoFor: [
    "Restaurants, cafes and bakeries that want online orders without marketplace commission",
    "Grocery and general shops that deliver to nearby areas",
    "Shops that sell on WhatsApp and want a proper catalogue to share",
    "Salons and service businesses that take bookings",
    "Any business that wants a website without hiring a developer",
  ],
  problems: [
    {
      problem: "Our website shows old prices and items we no longer sell.",
      fix: "The website reads your products and prices from TajirPoint, so it stays up to date with your till.",
    },
    {
      problem: "WhatsApp orders come in as messy messages.",
      fix: "Customers build their order on your website and it arrives in TajirPoint. If you prefer WhatsApp, the site opens a chat with the order already typed in.",
    },
    {
      problem: "We get orders from areas we cannot deliver to.",
      fix: "Set the cities and areas you deliver to. Customers outside them are told before they fill a cart and offered pick-up instead.",
    },
    {
      problem: "Building a website costs too much and takes months.",
      fix: "Your site is created the moment you switch the add-on on. Pick a design, check the details and publish.",
    },
  ],
  features: [
    {
      title: "Filled from your POS",
      body: "Products or menu, prices, photos, opening hours and contact details come from TajirPoint. A fill-in tool can complete empty sections from your shop details and a stock photo library.",
    },
    {
      title: "Designs for your type of business",
      body: "Restaurant designs (including pizza, fine dining and quick service), grocery, electronics, services and bill pay, products plus services, and a simple general layout. Light or dark, your colours and logo.",
    },
    {
      title: "Checkout, WhatsApp or both",
      body: "Take orders through a cart and checkout, send every order to WhatsApp, or offer both. Cash on delivery works out of the box.",
    },
    {
      title: "Delivery areas and shipping",
      body: "Deliver to chosen cities and areas, ship nationwide or abroad, or take service bookings. Add simple shipping options with a free-over amount.",
    },
    {
      title: "Your own address",
      body: "A free subdomain is included. Connect your own domain and TajirPoint checks it and sets up the secure padlock for you.",
    },
    {
      title: "Draft and publish",
      body: "Edit your site without customers seeing half-finished changes, then publish. Earlier published versions are kept.",
    },
    {
      title: "Bookings, reviews and contact forms",
      body: "Take table or service bookings, collect product reviews and receive contact messages in the back office.",
    },
    {
      title: "Offers on the site",
      body: "Discount codes for checkout, an offer pop-up that waits before it appears, add-more suggestions such as spend a little more for free delivery, and your own policy pages.",
    },
  ],
  howItWorks: [
    {
      title: "Switch it on",
      body: "Install Website Builder from the Add-ons page. Your site, opening hours and a free subdomain are set up straight away.",
    },
    {
      title: "Pick a design",
      body: "Choose the design that fits your business and add your logo and colours.",
    },
    {
      title: "Check your details",
      body: "Review your products, photos, hours, delivery areas and how you want to take orders.",
    },
    {
      title: "Publish",
      body: "Publish the site and share the link on WhatsApp, Instagram, Facebook or your shop counter.",
    },
    {
      title: "Take orders",
      body: "Online orders arrive in TajirPoint alongside your other sales.",
    },
  ],
  needs: [
    "A TajirPoint account on the Shop plan or above",
    "Your products or menu in TajirPoint, ideally with photos",
    "Optional: your own domain name, if you want to use it instead of the free subdomain",
    "Optional: a payment add-on such as Stripe, JazzCash or Easypaisa if you want customers to pay online",
  ],
  setup: [
    "You switch it on yourself from the Add-ons page and can publish the same day.",
    "Needs the Shop plan or above. A subdomain is included; your own domain is paid to whoever you bought it from.",
    "Online card or wallet payments need a payment add-on; for most of them our team sets it up with you. Cash on delivery needs nothing extra.",
    "Uninstalling takes the site offline but keeps your design and settings, so you can switch it back on later.",
  ],
  faqs: [
    {
      q: "Do I have to add my products again for the website?",
      a: "No. The website uses the products, prices and photos you already have in TajirPoint.",
    },
    {
      q: "Can I use my own domain?",
      a: "Yes. A subdomain is included, and you can connect a domain you own. Once it points to us, TajirPoint checks it and switches on the secure padlock automatically.",
    },
    {
      q: "Can customers pay online?",
      a: "Cash on delivery works straight away. To take card or mobile wallet payments, you also need one of our payment add-ons; ask us and we will help you set it up.",
    },
    {
      q: "Can I take orders only on WhatsApp?",
      a: "Yes. Choose WhatsApp only and every product and the cart open a WhatsApp chat with the order typed in. You can also offer checkout and WhatsApp together.",
    },
    {
      q: "Can I stop orders when the shop is closed?",
      a: "Yes. Choose to take orders only during your opening hours, or around the clock.",
    },
    {
      q: "Will customers see my changes while I am editing?",
      a: "No. Your edits are a draft until you press publish.",
    },
    {
      q: "Which plan do I need?",
      a: "Website Builder needs the Shop plan or above. It is not part of the free Light plan.",
    },
  ],
};

export default content;
