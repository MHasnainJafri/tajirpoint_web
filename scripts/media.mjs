#!/usr/bin/env node
// Media manifest + docs generator.
//
//   node scripts/media.mjs          writes src/lib/media/manifest.json
//                                   (runs before every `pnpm build` / `pnpm dev`)
//   node scripts/media.mjs --docs   also rewrites public/media/business/*/README.md
//                                   and MEDIA-CHECKLIST.md from the catalog
//
// The catalog is TypeScript; Node 22.18+/24 strips the types on import, which
// is why src/lib/marketing/businesses.ts must not import anything at runtime.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { buildManifest, listFiles, renderBusinessReadme, renderChecklist } from "./media-lib.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mediaDir = path.join(root, "public", "media");
const manifestPath = path.join(root, "src", "lib", "media", "manifest.json");

const files = listFiles(mediaDir);
const manifest = buildManifest(files);
const json = `${JSON.stringify(manifest, null, 2)}\n`;
const current = fs.existsSync(manifestPath) ? fs.readFileSync(manifestPath, "utf8") : "";
if (current !== json) {
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  fs.writeFileSync(manifestPath, json);
}
console.log(`[media] manifest: ${manifest.files.length} file(s)`);

if (process.argv.includes("--docs")) {
  const catalogUrl = pathToFileURL(path.join(root, "src", "lib", "marketing", "businesses.ts"));
  const { BUSINESSES } = await import(catalogUrl.href);
  for (const b of BUSINESSES) {
    const dir = path.join(mediaDir, "business", b.slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "README.md"), renderBusinessReadme(b));
  }
  fs.writeFileSync(path.join(root, "MEDIA-CHECKLIST.md"), renderChecklist(BUSINESSES, manifest.files));
  console.log(`[media] docs: ${BUSINESSES.length} business READMEs + MEDIA-CHECKLIST.md`);
}
