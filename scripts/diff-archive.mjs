// Diff the legacy WP archive (_wp-archive/manifest.json) against content already
// in the new Next.js site (MDX posts + books.json + press.json), matching by
// normalized Hebrew title. Reports what's MISSING from the new site.

import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();

// Normalize a Hebrew title for comparison: strip punctuation/quotes/niqqud,
// collapse whitespace, drop the trailing "- שלומית גיא" site suffix.
function norm(s) {
  return (s || "")
    .replace(/[֑-ׇ]/g, "")               // niqqud / cantillation
    .replace(/\s*[-–|]\s*שלומית גיא\s*$/u, "")
    .replace(/["'“”’`׳״]/g, "")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const tokens = (s) => new Set(norm(s).split(" ").filter((w) => w.length > 1));
function overlap(a, b) {
  const ta = tokens(a), tb = tokens(b);
  if (!ta.size || !tb.size) return 0;
  let hit = 0;
  for (const t of ta) if (tb.has(t)) hit++;
  return hit / Math.min(ta.size, tb.size); // fraction of smaller set covered
}

async function loadNewSiteTitles() {
  const out = []; // {title, source}
  const postsDir = path.join(ROOT, "content/posts");
  for (const f of await readdir(postsDir)) {
    if (!/\.(mdx?|md)$/.test(f)) continue;
    const { data } = matter(await readFile(path.join(postsDir, f), "utf8"));
    if (data.title) out.push({ title: data.title, source: `post:${f}` });
  }
  const books = JSON.parse(await readFile(path.join(ROOT, "content/data/books.json"), "utf8"));
  for (const b of books.items || []) out.push({ title: b.title, source: "books.json" });
  const press = JSON.parse(await readFile(path.join(ROOT, "content/data/press.json"), "utf8"));
  for (const p of press.items || []) out.push({ title: p.title, source: "press.json" });
  return out;
}

function bestMatch(title, pool) {
  const n = norm(title);
  let best = { score: 0, item: null };
  for (const item of pool) {
    const ni = norm(item.title);
    let score = 0;
    if (ni && (ni === n || ni.includes(n) || n.includes(ni))) score = 1;
    else score = overlap(title, item.title);
    if (score > best.score) best = { score, item };
  }
  return best;
}

const MATCH = 0.6; // token-overlap threshold for "already present"

async function main() {
  const manifest = JSON.parse(
    await readFile(path.join(ROOT, "_wp-archive/manifest.json"), "utf8")
  );
  const newTitles = await loadNewSiteTitles();

  const present = [], missing = [];
  for (const m of manifest) {
    if (m.type === "home" || !m.title || !norm(m.title)) continue; // skip home/empty
    const b = bestMatch(m.title, newTitles);
    const rec = { ...m, match: b.item?.title, matchSrc: b.item?.source, score: +b.score.toFixed(2) };
    if (b.score >= MATCH) present.push(rec);
    else missing.push(rec);
  }

  missing.sort((a, b) => a.type.localeCompare(b.type) || a.id - b.id);

  console.log(`New-site entries: ${newTitles.length} (${newTitles.filter(t=>t.source.startsWith("post")).length} posts, books+press)`);
  console.log(`Archive items compared: ${present.length + missing.length}`);
  console.log(`  already on new site: ${present.length}`);
  console.log(`  MISSING: ${missing.length}\n`);

  console.log("===== MISSING FROM NEW SITE =====");
  for (const m of missing) {
    console.log(`[${m.type}] ${m.title}`);
    console.log(`        ${m.url}  (best guess: "${m.match}" ${m.score})`);
  }

  await writeFile(
    path.join(ROOT, "_wp-archive/diff-report.json"),
    JSON.stringify({ present, missing }, null, 2),
    "utf8"
  );
  console.log(`\nFull report -> _wp-archive/diff-report.json`);
}

main();
