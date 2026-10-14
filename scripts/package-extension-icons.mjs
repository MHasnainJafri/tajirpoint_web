import fs from "node:fs/promises";
import path from "node:path";
import os from "node:os";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");
const output = path.resolve(
  process.argv[2] ||
    path.join(os.homedir(), "Downloads", "TajirPoint-extension-icons-2026-10-14.zip")
);
const stage = await fs.mkdtemp(path.join(os.tmpdir(), "tajirpoint-extension-icons-"));
const bundle = path.join(stage, "TajirPoint-extension-icons");
await fs.mkdir(path.join(bundle, "png"), { recursive: true });
await fs.mkdir(path.join(bundle, "originals"), { recursive: true });

// Slugs come from the backend seed migrations, not the shorter website IDs.
const entries = [
  ["restaurant", "extension-restaurant"],
  ["route-dispatch", "extension-route-dispatch"],
  ["pharmacy-pack", "extension-pharmacy"],
  ["hrm", "extension-hr-payroll"],
  ["cloud-kitchen", "extension-cloud-kitchen"],
  ["website-builder", "extension-website-builder"],
  ["stripe-payments", "brand-stripe"],
  ["jazzcash-payments", "brand-jazzcash"],
  ["easypaisa-payments", "brand-easypaisa"],
  ["hbl-payments", "brand-hbl"],
  ["paypal-payments", "brand-paypal"],
  ["razorpay-payments", "brand-razorpay"],
  ["square-payments", "brand-square"],
  ["accounting-gl", "extension-accounting-gl"],
  ["cash-management", "extension-cash-management"],
  ["quickbooks-accounting", "brand-quickbooks"],
  ["fbr-integration", "brand-fbr"],
  ["age-verification", "extension-age-verification"],
  ["shopify-sync", "brand-shopify"],
  ["woocommerce-sync", "brand-woocommerce"],
  ["magento-sync", "brand-magento"],
  ["wix-sync", "brand-wix"],
  ["bigcommerce-sync", "brand-bigcommerce"],
  ["courier-leopards", "brand-leopards"],
  ["courier-tcs", "brand-tcs"],
  ["courier-postex", "brand-postex"],
  ["customer-portal", "extension-customer-portal"],
  ["delivery-aggregator", "extension-delivery-aggregator"],
  ["coupons", "extension-coupons"],
  ["time-promotions", "extension-time-promos"],
  ["whatsapp-ai", "brand-whatsapp"],
  ["ai-phone-ordering", "extension-ai-phone-ordering"],
  ["restaurant-toolbox", "extension-restaurant-toolbox"],
  ["digital-signage", "extension-signage"],
];
const source = await fs.readFile(path.join(root, "src/components/design/Icon.tsx"), "utf8");
const assets = new Map(
  [...source.matchAll(/"([^"]+)": "(\/(?:design\/icons|icons)\/[^"]+)"/g)].map((m) => [m[1], m[2]])
);
const manifest = [];
for (const [slug, icon] of entries) {
  const asset = assets.get(icon);
  if (!asset) throw new Error(`No website asset for ${slug}`);
  const input = path.join(root, "public", asset);
  // Preserve the original geometry, colors and alpha. PostEx's official
  // white wordmark gets the same dark backing used on the website.
  await sharp(input, { density: 192 })
    .resize(512, 512, {
      fit: "contain",
      background: icon === "brand-postex" ? "#111827" : { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png()
    .toFile(path.join(bundle, "png", `${slug}.png`));
  const original = `${slug}${path.extname(asset)}`;
  await fs.copyFile(input, path.join(bundle, "originals", original));
  manifest.push({
    backendSlug: slug,
    websiteIcon: icon,
    source: asset,
    png: `png/${slug}.png`,
    original: `originals/${original}`,
  });
}
await fs.copyFile(
  path.join(root, "public/icons/sources.json"),
  path.join(bundle, "brand-sources.json")
);
await fs.copyFile(
  path.join(root, "public/icons/SIMPLE-ICONS-LICENSE.txt"),
  path.join(bundle, "SIMPLE-ICONS-LICENSE.txt")
);
await fs.writeFile(path.join(bundle, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
await fs.writeFile(
  path.join(bundle, "README.txt"),
  `TajirPoint extension icons\n\n34 icons: 31 marketplace extensions plus AI phone ordering, Restaurant Toolbox and Digital Signage.\n\npng/: square 512 x 512 PNG files named exactly for the backend Extension.slug.\noriginals/: the website artwork, including original platform logos and custom transparent WebP illustrations.\nmanifest.json: mapping between backend slug and website asset.\n\nBackend usage (run from your backend environment after extracting):\n  python manage.py sync_extension_icons --dir /path/to/TajirPoint-extension-icons/png --dry-run\n  python manage.py sync_extension_icons --dir /path/to/TajirPoint-extension-icons/png\n\nThe second command uploads files and updates icon_url. Review the dry run first.\nBrand marks retain their original geometry and colors. A dark background is provided for PostEx's white wordmark.\nPNG exports of custom artwork are resampled from the optimized website assets; originals are included.\nNo database, credentials or customer information is included.\n`
);
await fs.mkdir(path.dirname(output), { recursive: true });
execFileSync("python3", [
  "-c",
  "import pathlib,sys,zipfile; root=pathlib.Path(sys.argv[1]); out=sys.argv[2]; z=zipfile.ZipFile(out,'w',zipfile.ZIP_DEFLATED); [z.write(p,p.relative_to(root.parent)) for p in sorted(root.rglob('*')) if p.is_file()]; z.close()",
  bundle,
  output,
]);
await fs.rm(stage, { recursive: true, force: true });
console.log(`Saved ${entries.length} extension icons to ${output}`);
