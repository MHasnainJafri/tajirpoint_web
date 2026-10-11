# Marketing media

Images and videos for the `/business/<slug>` pages live here, one folder per
business: `public/media/business/<slug>/`. Each folder has a README listing its
slots (the file names the page looks for). `MEDIA-CHECKLIST.md` at the repo
root lists every slot and which are filled.

## How a slot is filled

Name the file after the slot, drop it in the business folder, rebuild. The
build (`scripts/media.mjs`) writes `src/lib/media/manifest.json`, and the page
picks, in order:

1. a local video — `<slot>.mp4` and/or `<slot>.webm`, with `<slot>-poster.jpg`
2. a YouTube or Vimeo id set on the slot in `src/lib/marketing/businesses.ts`
   (`youtube: "<id>"` / `vimeo: "<id>"`) — loads only when the visitor presses play
3. a local image — `<slot>.webp`, `.avif`, `.jpg`, `.jpeg` or `.png`
4. a branded placeholder (nothing breaks while a file is missing)

After adding files, `pnpm media:docs` refreshes the READMEs and the checklist.

## Formats

| Kind                   | Size                 | Format                    | Notes                                   |
| ---------------------- | -------------------- | ------------------------- | --------------------------------------- |
| Screen / photo (16:10) | 1600 × 1000          | WebP (quality ~80) or JPG | under ~300 KB                           |
| Phone screen (4:5)     | 1080 × 1350          | WebP or PNG               | portrait; crop the status bar           |
| Video (16:10)          | 1920 × 1200 or 1080p | MP4 (H.264), muted        | 10–30 s, under ~8 MB, plus a poster JPG |

Compress video with, for example:

```
ffmpeg -i in.mov -vf "scale=1920:-2" -c:v libx264 -crf 26 -preset slow -an -movflags +faststart <slot>.mp4
ffmpeg -i <slot>.mp4 -frames:v 1 -q:v 3 <slot>-poster.jpg
```

Use real screens from the product with demo data — no real customer names,
phone numbers or balances.
