#!/usr/bin/env node
/**
 * IndexNow ping: tells Bing (and the other IndexNow engines: Yandex, Seznam,
 * Naver…) which pages changed, so they recrawl them within hours instead of
 * weeks. Google does not use IndexNow; it reads the sitemap.
 *
 * Run AFTER a deploy, once the new pages are live:
 *
 *   INDEXNOW_KEY=<key> node scripts/indexnow-ping.mjs --dry-run
 *   INDEXNOW_KEY=<key> node scripts/indexnow-ping.mjs              # real ping
 *
 * Which URLs: every <loc> in the live sitemap whose <lastmod> is on or after
 * --since (default: 2 days ago). The sitemap's lastmod is the date the page's
 * content last changed (see src/app/sitemap.ts), so this sends only pages
 * that really changed. --all sends every URL; --url <u> (repeatable) sends
 * just those.
 *
 * Options:
 *   --site <origin>      default https://tajirpoint.com (or SITE_URL)
 *   --sitemap <url>      default <site>/sitemap.xml
 *   --since <yyyy-mm-dd> default today minus 2 days
 *   --all                every URL in the sitemap
 *   --url <url>          one URL (repeatable); skips the sitemap
 *   --endpoint <url>     default https://api.indexnow.org/indexnow
 *   --dry-run            print what would be sent; send nothing
 *
 * Before pinging it checks that https://<site>/<key>.txt answers with the
 * key, because the engines reject (and may distrust) pings whose key file is
 * missing. Needs Node 18+ (global fetch). No dependencies.
 */

const MAX_URLS = 10_000; // IndexNow limit per request.

function parseArgs(argv) {
  const opts = { urls: [], dryRun: false, all: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    const next = () => {
      const v = argv[++i];
      if (v === undefined) throw new Error(`${a} needs a value`);
      return v;
    };
    if (a === "--dry-run") opts.dryRun = true;
    else if (a === "--all") opts.all = true;
    else if (a === "--site") opts.site = next();
    else if (a === "--sitemap") opts.sitemap = next();
    else if (a === "--since") opts.since = next();
    else if (a === "--endpoint") opts.endpoint = next();
    else if (a === "--url") opts.urls.push(next());
    else if (a === "--help" || a === "-h") opts.help = true;
    else throw new Error(`Unknown option: ${a}`);
  }
  return opts;
}

function daysAgo(n) {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  return d.toISOString().slice(0, 10);
}

/** [{loc, lastmod}] from a sitemap (or the first level of a sitemap index). */
async function readSitemap(url) {
  const res = await fetch(url, { headers: { "User-Agent": "TajirPoint-IndexNow-ping" } });
  if (!res.ok) throw new Error(`Sitemap ${url} answered ${res.status}`);
  const xml = await res.text();
  const decode = (s) =>
    s
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'");

  if (/<sitemapindex[\s>]/.test(xml)) {
    const children = [
      ...xml.matchAll(/<sitemap>[\s\S]*?<loc>([\s\S]*?)<\/loc>[\s\S]*?<\/sitemap>/g),
    ];
    const all = [];
    for (const m of children) all.push(...(await readSitemap(decode(m[1].trim()))));
    return all;
  }
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => {
    const loc = /<loc>([\s\S]*?)<\/loc>/.exec(m[1])?.[1]?.trim() ?? "";
    const lastmod = /<lastmod>([\s\S]*?)<\/lastmod>/.exec(m[1])?.[1]?.trim() ?? "";
    return { loc: decode(loc), lastmod };
  });
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  if (opts.help) {
    console.log("See the comment at the top of scripts/indexnow-ping.mjs for usage.");
    return;
  }

  const key = (process.env.INDEXNOW_KEY ?? "").trim();
  if (!/^[A-Za-z0-9-]{8,128}$/.test(key)) {
    throw new Error(
      "Set INDEXNOW_KEY (8-128 letters, digits or dashes), the same value as on Vercel."
    );
  }
  const site = new URL(opts.site ?? process.env.SITE_URL ?? "https://tajirpoint.com").origin;
  const host = new URL(site).host;
  const endpoint = opts.endpoint ?? "https://api.indexnow.org/indexnow";
  const keyLocation = `${site}/${key}.txt`;

  let urls;
  if (opts.urls.length) {
    urls = opts.urls;
  } else {
    const entries = await readSitemap(opts.sitemap ?? `${site}/sitemap.xml`);
    const since = opts.since ?? daysAgo(2);
    if (!opts.all && !/^\d{4}-\d{2}-\d{2}$/.test(since))
      throw new Error("--since wants yyyy-mm-dd");
    urls = entries
      .filter((e) => opts.all || (e.lastmod && e.lastmod.slice(0, 10) >= since))
      .map((e) => e.loc);
    console.log(
      `Sitemap: ${entries.length} URLs, ${urls.length} ${opts.all ? "(all)" : `changed since ${since}`}.`
    );
  }

  // IndexNow only accepts URLs on the host the key belongs to.
  const foreign = urls.filter((u) => {
    try {
      return new URL(u).host !== host;
    } catch {
      return true;
    }
  });
  if (foreign.length) {
    console.warn(`Skipping ${foreign.length} URL(s) not on ${host}:`, foreign.slice(0, 5));
  }
  urls = [...new Set(urls.filter((u) => !foreign.includes(u)))];
  if (!urls.length) {
    console.log("Nothing to send.");
    return;
  }
  if (urls.length > MAX_URLS) {
    console.warn(`Sending the first ${MAX_URLS} of ${urls.length} URLs (IndexNow limit).`);
    urls = urls.slice(0, MAX_URLS);
  }

  const body = { host, key, keyLocation, urlList: urls };

  if (opts.dryRun) {
    console.log(`DRY RUN — would POST ${urls.length} URL(s) to ${endpoint}:`);
    console.log(JSON.stringify({ ...body, key: `${key.slice(0, 4)}…` }, null, 2));
    return;
  }

  const keyRes = await fetch(keyLocation);
  const keyBody = keyRes.ok ? (await keyRes.text()).trim() : "";
  if (keyBody !== key) {
    throw new Error(
      `${keyLocation} does not answer with the key (status ${keyRes.status}). Set INDEXNOW_KEY on Vercel and redeploy first.`
    );
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify(body),
  });
  // 200 = accepted, 202 = accepted, key check pending. Anything else is a problem.
  const text = await res.text().catch(() => "");
  if (res.status === 200 || res.status === 202) {
    console.log(`IndexNow accepted ${urls.length} URL(s) (${res.status}).`);
  } else {
    throw new Error(`IndexNow answered ${res.status}: ${text.slice(0, 300)}`);
  }
}

main().catch((err) => {
  console.error(`indexnow-ping: ${err.message}`);
  process.exit(1);
});
