import type { ArtId } from "@/components/marketing/landing/ProductArt";
import type { IconName } from "./landing";

/**
 * Hero demo: the till + invoice rotate through these businesses so the first
 * screen says "any trade", not "a grocery shop". Like the other mock data it is
 * simulated app chrome, so it is deliberately not translated.
 */
export type ShowcaseProduct = {
  id: string;
  name: string;
  price: number;
  stock: string;
  cat: string;
  /** Real photograph under /images/hero-pos/, or an illustration id. */
  photo?: string;
  art?: ArtId;
};

export type ShowcaseBusiness = {
  id: string;
  label: string;
  icon: IconName;
  shop: string;
  place: string;
  customer: string;
  register: string;
  cashier: string;
  searchHint: string;
  scanLabel: string;
  taxRate: number;
  invoiceNo: string;
  cats: string[];
  payments: [string, string, string, string];
  defaultPayment: number;
  products: ShowcaseProduct[];
  /** product id → starting quantity */
  cart: Record<string, number>;
};

export const SHOWCASE: ShowcaseBusiness[] = [
  {
    id: "restaurant",
    label: "Restaurants",
    icon: "utensils",
    shop: "Brasa Kitchen & Café",
    place: "Dine-in · Table 4",
    customer: "Table 4",
    register: "Counter 01",
    cashier: "Maya",
    searchHint: "Search menu…",
    scanLabel: "KDS",
    taxRate: 0.1,
    invoiceNo: "INV-3104",
    cats: ["All", "Mains", "Sides", "Drinks", "Dessert"],
    payments: ["Cash", "Card", "Split bill", "Tab"],
    defaultPayment: 1,
    products: [
      { id: "burger", name: "Smash cheeseburger", price: 11.5, stock: "Kitchen", cat: "Mains", photo: "burger" },
      { id: "pizza", name: "Margherita pizza", price: 13, stock: "Kitchen", cat: "Mains", photo: "pizza" },
      { id: "salad", name: "Chicken Caesar", price: 9.5, stock: "Kitchen", cat: "Mains", photo: "salad" },
      { id: "fries", name: "Loaded fries", price: 5, stock: "Kitchen", cat: "Sides", photo: "fries" },
      { id: "latte", name: "Iced latte", price: 4.5, stock: "Bar", cat: "Drinks", photo: "latte" },
      { id: "cake", name: "Chocolate cake", price: 6, stock: "12 left", cat: "Dessert", photo: "cake" },
    ],
    cart: { burger: 2, fries: 1, latte: 2 },
  },
  {
    id: "retail",
    label: "Retail & grocery",
    icon: "cart",
    shop: "Northgate Market",
    place: "Supermarket · Aisle scan",
    customer: "Walk-in customer",
    register: "Reg 01",
    cashier: "Sam",
    searchHint: "Search items or scan barcode…",
    scanLabel: "SCAN",
    taxRate: 0.1,
    invoiceNo: "INV-1042",
    cats: ["All", "Pantry", "Fresh", "Bakery"],
    payments: ["Cash", "Card", "Wallet", "Credit"],
    defaultPayment: 1,
    products: [
      { id: "oil", name: "Olive oil 1 L", price: 16.5, stock: "24 in stock", cat: "Pantry", photo: "oil" },
      { id: "coffee", name: "Coffee beans 500 g", price: 5.9, stock: "16 in stock", cat: "Pantry", photo: "coffee" },
      { id: "tea", name: "Green tea 250 g", price: 10, stock: "32 in stock", cat: "Pantry", photo: "tea" },
      { id: "bread", name: "Sourdough loaf", price: 4.5, stock: "18 in stock", cat: "Bakery", photo: "bread" },
      { id: "orange", name: "Oranges 1 kg", price: 3.2, stock: "60 in stock", cat: "Fresh", photo: "orange" },
      { id: "honey", name: "Wild honey 350 g", price: 7.4, stock: "21 in stock", cat: "Pantry", photo: "honey" },
    ],
    cart: { oil: 1, coffee: 2, orange: 1 },
  },
  {
    id: "laptops",
    label: "Laptop shops",
    icon: "monitor",
    shop: "ByteHub Computers",
    place: "Showroom · Serial tracked",
    customer: "Nova Studio",
    register: "Desk 02",
    cashier: "Ali",
    searchHint: "Search products or serial no…",
    scanLabel: "SERIAL",
    taxRate: 0.1,
    invoiceNo: "INV-2217",
    cats: ["All", "Laptops", "Accessories", "Displays"],
    payments: ["Cash", "Card", "Installments", "Credit"],
    defaultPayment: 2,
    products: [
      { id: "ultrabook", name: 'Ultrabook 14" i7', price: 1149, stock: "6 in stock", cat: "Laptops", art: "ultrabook" },
      { id: "gaming", name: 'Gaming laptop 15.6"', price: 1399, stock: "3 in stock", cat: "Laptops", art: "gaming" },
      { id: "monitor", name: '27" 4K monitor', price: 289, stock: "9 in stock", cat: "Displays", art: "monitor" },
      { id: "keyboard", name: "Mechanical keyboard", price: 79, stock: "22 in stock", cat: "Accessories", art: "keyboard" },
      { id: "mouse", name: "Wireless mouse", price: 24, stock: "40 in stock", cat: "Accessories", art: "mouse" },
      { id: "hub", name: "USB-C dock 8-in-1", price: 59, stock: "15 in stock", cat: "Accessories", art: "hub" },
    ],
    cart: { ultrabook: 1, mouse: 1, hub: 1 },
  },
  {
    id: "mobiles",
    label: "Mobile shops",
    icon: "phone",
    shop: "Pocket Mobiles",
    place: "Counter · IMEI tracked",
    customer: "Walk-in customer",
    register: "Reg 03",
    cashier: "Zara",
    searchHint: "Search products or IMEI…",
    scanLabel: "IMEI",
    taxRate: 0.1,
    invoiceNo: "INV-0873",
    cats: ["All", "Phones", "Audio", "Accessories"],
    payments: ["Cash", "Card", "Installments", "Wallet"],
    defaultPayment: 1,
    products: [
      { id: "flagship", name: "Flagship 256 GB", price: 899, stock: "5 in stock", cat: "Phones", art: "flagship" },
      { id: "phone", name: "Smartphone 128 GB", price: 349, stock: "14 in stock", cat: "Phones", art: "phone" },
      { id: "watch", name: "Smartwatch 44 mm", price: 179, stock: "8 in stock", cat: "Accessories", art: "watch" },
      { id: "earbuds", name: "Wireless earbuds", price: 59, stock: "30 in stock", cat: "Audio", art: "earbuds" },
      { id: "charger", name: "65 W fast charger", price: 29, stock: "44 in stock", cat: "Accessories", art: "charger" },
      { id: "case", name: "Protective case", price: 14, stock: "70 in stock", cat: "Accessories", art: "case" },
    ],
    cart: { phone: 1, case: 1, charger: 1 },
  },
];
