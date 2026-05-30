// One-off extractor for the legacy WordPress site shlomitguy.co.il
// Strategy:
//   Phase A: paginate the RSS feed (?feed=rss2&paged=N) -> every POST with full
//            content:encoded body. One request per ~10 posts, polite + complete.
//   Phase B: BFS link-crawl from the homepage + RSS posts + Google-found seeds.
//            Extracts EVERY on-domain <a href> from the raw HTML (catches
//            dropdown/submenu pages that JS only hides visually), fetching each
//            page_id / post not already captured.
// Output (under _wp-archive/): raw HTML per URL, extracted .txt per URL, and a
//   manifest.json mapping every URL -> {id, type, title, files}.
//
// Read-only against the live site. Polite: low concurrency + delay.

import { writeFile, mkdir, readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

const ORIGIN = "https://shlomitguy.co.il";
const HOST = "shlomitguy.co.il";
const OUT = path.resolve(process.cwd(), "_wp-archive");
const RAW = path.join(OUT, "raw");
const TXT = path.join(OUT, "txt");
const UA = "Mozilla/5.0 (compatible; content-archive/1.0; one-time owner-authorized export)";
const DELAY_MS = 400;

// Google-index seeds (pages often orphaned from the visible nav).
const SEEDS = [
  "?page_id=2", "?page_id=166", "?page_id=168", "?page_id=170",
  "?page_id=296", "?page_id=581", "?page_id=1228", "?page_id=1513",
  "?page_id=1553", "?p=2152", "?p=2472",
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function get(url) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, {
        headers: { "User-Agent": UA, "Accept-Language": "he-IL,he;q=0.9" },
        redirect: "follow",
      });
      const body = await res.text();
      return { status: res.status, body, finalUrl: res.url };
    } catch (e) {
      if (attempt === 3) return { status: 0, body: "", finalUrl: url, error: String(e) };
      await sleep(500 * attempt);
    }
  }
}

function decodeEntities(s) {
  return s
    .replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#0?39;/g, "'")
    .replace(/&#8217;/g, "’").replace(/&#8211;/g, "–")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n));
}

function htmlToText(html) {
  return decodeEntities(
    html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<!--[\s\S]*?-->/g, "")
      .replace(/<\/(p|div|h[1-6]|li|br|tr|section|article)>/gi, "\n")
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<[^>]+>/g, "")
  ).replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
}

function pickTitle(html) {
  const m = html.match(/<title>([\s\S]*?)<\/title>/i);
  return m ? decodeEntities(m[1]).replace(/\s*-\s*שלומית גיא\s*$/, "").trim() : "";
}

// id key used for filenames + dedupe: ?p=N -> p_N, ?page_id=N -> page_N
function urlKey(u) {
  const m = u.match(/[?&]p=(\d+)/);
  if (m) return { key: `p_${m[1]}`, type: "post", id: +m[1] };
  const pg = u.match(/[?&]page_id=(\d+)/);
  if (pg) return { key: `page_${pg[1]}`, type: "page", id: +pg[1] };
  if (u.replace(/\/$/, "") === ORIGIN) return { key: "home", type: "home", id: 0 };
  return { key: null, type: "other", id: null };
}

function normalize(href, base) {
  try {
    const u = new URL(href, base);
    if (u.hostname !== HOST) return null;
    u.hash = "";
    u.protocol = "https:";
    // skip non-content endpoints
    const bad = /(wp-admin|wp-login|\/feed|attachment_id|\.(jpg|jpeg|png|gif|webp|svg|pdf|zip|mp3|mp4|css|js)(\?|$)|action=|replytocom)/i;
    if (bad.test(u.href)) return null;
    return u.href;
  } catch {
    return null;
  }
}

function extractLinks(html, base) {
  const out = new Set();
  const re = /<a\b[^>]*\bhref\s*=\s*["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html))) {
    const n = normalize(m[1], base);
    if (n) out.add(n);
  }
  return [...out];
}

const manifest = []; // {key, type, id, url, title, rawFile, txtFile, source}
const savedKeys = new Set();

async function save({ key, type, id, url, title, html, contentHtml, source }) {
  if (savedKeys.has(key)) return;
  savedKeys.add(key);
  const rawFile = `raw/${key}.html`;
  const txtFile = `txt/${key}.txt`;
  await writeFile(path.join(OUT, rawFile), html, "utf8");
  const text = htmlToText(contentHtml || html);
  await writeFile(path.join(OUT, txtFile), `# ${title}\n${url}\n\n${text}\n`, "utf8");
  manifest.push({ key, type, id, url, title, rawFile, txtFile, source });
  console.log(`saved ${key.padEnd(10)} ${type.padEnd(5)} ${title.slice(0, 50)}`);
}

// ---- Phase A: RSS feed (all posts, full content) ----
async function phaseRSS() {
  console.log("\n=== Phase A: RSS feed ===");
  for (let paged = 1; paged <= 60; paged++) {
    const { status, body } = await get(`${ORIGIN}/?feed=rss2&paged=${paged}`);
    if (status !== 200) break;
    const items = body.split(/<item>/).slice(1);
    if (items.length === 0) break;
    let any = false;
    for (const raw of items) {
      const block = raw.split(/<\/item>/)[0];
      const link = (block.match(/<link>([^<]+)<\/link>/) || [])[1] || "";
      const titleM = block.match(/<title>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/);
      const contentM = block.match(/<content:encoded>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/content:encoded>/);
      const k = urlKey(link);
      if (!k.key || k.type !== "post") continue;
      any = true;
      const title = titleM ? decodeEntities(titleM[1].trim()) : k.key;
      await save({
        key: k.key, type: "post", id: k.id, url: link, title,
        html: block, contentHtml: contentM ? contentM[1] : block, source: "rss",
      });
    }
    if (!any) break;
    await sleep(DELAY_MS);
  }
}

// ---- Phase B: BFS link crawl ----
async function phaseCrawl() {
  console.log("\n=== Phase B: link crawl ===");
  const queue = [ORIGIN + "/", ...SEEDS.map((s) => ORIGIN + "/" + s)];
  // also re-visit captured posts to harvest their in-body links
  for (const m of manifest) queue.push(m.url);
  const seen = new Set();
  while (queue.length) {
    const url = queue.shift();
    if (seen.has(url)) continue;
    seen.add(url);
    const { status, body, finalUrl } = await get(url);
    await sleep(DELAY_MS);
    if (status !== 200 || !body) continue;
    const k = urlKey(finalUrl);
    if (k.key && !savedKeys.has(k.key)) {
      await save({
        key: k.key, type: k.type, id: k.id, url: finalUrl,
        title: pickTitle(body), html: body, source: "crawl",
      });
    }
    for (const link of extractLinks(body, finalUrl)) {
      if (!seen.has(link)) queue.push(link);
    }
  }
}

async function main() {
  await mkdir(RAW, { recursive: true });
  await mkdir(TXT, { recursive: true });
  await phaseRSS();
  await phaseCrawl();
  manifest.sort((a, b) => (a.type + a.id).localeCompare(b.type + b.id));
  await writeFile(path.join(OUT, "manifest.json"), JSON.stringify(manifest, null, 2), "utf8");
  const posts = manifest.filter((m) => m.type === "post").length;
  const pages = manifest.filter((m) => m.type === "page").length;
  console.log(`\nDONE: ${manifest.length} urls (${posts} posts, ${pages} pages) -> _wp-archive/`);
}

main();
