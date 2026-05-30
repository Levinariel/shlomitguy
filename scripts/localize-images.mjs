// Download every shlomitguy.co.il inline image referenced by the ported MDX into
// public/images/wp/, then rewrite the MDX to point at the local copies. Makes the
// new site self-contained so it survives the old WordPress site being retired.
// Idempotent: already-downloaded files are skipped; re-running re-rewrites URLs.

import { readFile, writeFile, mkdir, readdir, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const ROOT = process.cwd();
const OUT = path.join(ROOT, "public/images/wp");
const UA = "Mozilla/5.0 (compatible; content-archive/1.0; one-time owner-authorized export)";
const CONTENT_DIRS = ["content/posts", "content/imperia"];
const URL_RE = /(https:\/\/shlomitguy\.co\.il\/[^)\s]+\.(?:jpe?g|png|gif|webp))/gi;

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function localName(url) {
  const clean = url.split("?")[0];
  const base = decodeURIComponent(clean.split("/").pop() || "img")
    .replace(/[‎‏‪-‮]/g, "")   // strip RTL/LTR marks
    .replace(/[^A-Za-z0-9._-]/g, "_")
    .replace(/_+/g, "_");
  const hash = createHash("sha1").update(url).digest("hex").slice(0, 8);
  const ext = (base.match(/\.[a-z0-9]+$/i) || [".jpg"])[0];
  const stem = base.replace(/\.[a-z0-9]+$/i, "").slice(0, 40) || "img";
  return `${hash}-${stem}${ext}`;
}

async function collectUrls() {
  const urls = new Set();
  for (const dir of CONTENT_DIRS) {
    for (const f of await readdir(path.join(ROOT, dir))) {
      if (!f.endsWith(".mdx")) continue;
      const s = await readFile(path.join(ROOT, dir, f), "utf8");
      for (const m of s.matchAll(URL_RE)) urls.add(m[1]);
    }
  }
  return [...urls];
}

async function exists(p) {
  try { await stat(p); return true; } catch { return false; }
}

async function download(url, dest) {
  if (await exists(dest)) return "skip";
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA } });
      if (!res.ok) return `HTTP ${res.status}`;
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 100) return "empty";
      await writeFile(dest, buf);
      return "ok";
    } catch (e) {
      if (attempt === 3) return String(e.message || e);
      await sleep(400 * attempt);
    }
  }
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const urls = await collectUrls();
  console.log(`found ${urls.length} unique image URLs`);

  const map = new Map();   // url -> /images/wp/<name>
  const failed = [];
  let ok = 0, skip = 0;
  for (const url of urls) {
    const name = localName(url);
    const res = await download(url, path.join(OUT, name));
    if (res === "ok" || res === "skip") {
      map.set(url, `/images/wp/${name}`);
      res === "ok" ? ok++ : skip++;
      if (res === "ok") await sleep(150);
    } else {
      failed.push({ url, res });
    }
  }
  console.log(`downloaded ${ok}, already had ${skip}, failed ${failed.length}`);
  if (failed.length) failed.slice(0, 30).forEach((f) => console.log(`  FAIL ${f.res}  ${f.url}`));

  // rewrite MDX (only URLs we successfully localized)
  let rewritten = 0;
  for (const dir of CONTENT_DIRS) {
    for (const f of await readdir(path.join(ROOT, dir))) {
      if (!f.endsWith(".mdx")) continue;
      const p = path.join(ROOT, dir, f);
      let s = await readFile(p, "utf8");
      let changed = false;
      s = s.replace(URL_RE, (m) => {
        const local = map.get(m);
        if (local) { changed = true; return local; }
        return m;
      });
      if (changed) { await writeFile(p, s, "utf8"); rewritten++; }
    }
  }
  console.log(`rewrote ${rewritten} MDX files`);
}
main();
