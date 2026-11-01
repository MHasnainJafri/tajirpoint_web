import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config/site";

/**
 * Web app manifest. Chrome on Android wants PNG icons at 192 and 512 (SVG
 * alone does not satisfy "installable"), plus a maskable one whose mark sits
 * inside the circular safe zone — generated from the brand mark into
 * public/brand/png/.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "TajirPoint — POS & Back Office",
    short_name: siteConfig.name,
    description: siteConfig.description,
    lang: "en",
    dir: "ltr",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a0a0a",
    categories: ["business", "productivity", "finance"],
    icons: [
      { src: "/brand/png/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/brand/png/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/brand/png/maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      { src: "/favicon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
    ],
  };
}
