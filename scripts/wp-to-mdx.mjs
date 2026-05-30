// Convert captured WP content (_wp-archive) into MDX for the new Next.js site.
//   - imperia chapter IDs  -> content/imperia/<slug>.mdx  (readable book)
//   - article/committee/guest-lecture/conference -> content/posts/<slug>.mdx
//     with a `category` in frontmatter.
// Skips transactional/admin/book-promo noise (not in the approved scope).

import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const ARC = path.join(ROOT, "_wp-archive");
const manifest = JSON.parse(await readFile(path.join(ARC, "manifest.json"), "utf8"));
const byKey = new Map(manifest.map((m) => [m.key, m]));

// ---- imperia ground truth (ids + ordered titles), from app/books/imperia ----
const IMPERIA = [
  { id: 170, type: "page", group: "front", title: "הקדמה מאת אבי מלר" },
  { id: 312, type: "post", group: "front", title: "תודות" },
  { id: 168, type: "page", group: "front", title: "פרולוג" },
  { id: 1786, type: "post", n: 1, title: "ג'וני של ארסנל, ארסנל של ג'וני" },
  { id: 1803, type: "post", n: 2, title: "אוגוסט–ספטמבר 2007: שכר לימוד" },
  { id: 1811, type: "post", n: 3, title: "להיות אוהד כדורגל סוף המאה העשרים" },
  { id: 1814, type: "post", n: 4, title: "אז איך הם עשו את זה?" },
  { id: 1818, type: "post", n: 5, title: '"ככל שעמוקים יותר היסודות חזקה יותר המצודה"' },
  { id: 1823, type: "post", n: 6, title: "קצת טקטיקה וממשיכים" },
  { id: 1826, type: "post", n: 7, title: "ילדים טובים משחקים כדורגל" },
  { id: 1829, type: "post", n: 8, title: "משפחה טובה" },
  { id: 1832, type: "post", n: 9, title: "יום שמשי אחד" },
  { id: 1842, type: "post", n: 10, title: "חורף, תקופה של מהפכות" },
  { id: 1845, type: "post", n: 11, title: "חג המולד" },
  { id: 1851, type: "post", n: 12, title: "כך בונים אימפריה" },
  { id: 1854, type: "post", n: 13, title: "אין זרים בכדורגל האנגלי (להוציא את כריסטיאנו רונלדו)" },
  { id: 1857, type: "post", n: 14, title: "התחלת הסוף" },
  { id: 1891, type: "post", n: 15, title: "שיר פרידה" },
  { id: 1894, type: "post", n: 16, title: "אימפריות נופלות לאט" },
  { id: 1903, type: "post", n: 17, title: "הגזר" },
  { id: 1907, type: "post", group: "back", title: "אפילוג" },
  { id: 166, type: "page", group: "back", title: 'המלצות דו"ח ועדת טיילור (מתורגם לעברית)' },
];
const imperiaIds = new Set(IMPERIA.map((c) => `${c.type}:${c.id}`));

// ---- category routing (mirrors scripts/categorize-missing.mjs buckets) ----
const has = (s, ...kw) => kw.some((k) => s.includes(k));
function bucket(title) {
  if (has(title, "רכישת", "תשלום", "הרשמה", "צרי עמי קשר", "הזמנת הרצאות")) return "skip";
  if (has(title, "כנס", "סדר היום", "סדר יום", "תקצירי הרצאות", "פאנל")) return "conference";
  // imperia keyword chapters are pulled out earlier by id; any остаток here is noise
  if (has(title, "אימפריה", "ארסנל", "אצטדיון האמירויות", "אוהד כדורגל אנגלי", "אפילוג", "פרק ", "שכר לימוד", "קצת טקטיקה", "חג המולד", "אין זרים")) return "skip";
  if (has(title, "ועדת", 'דו"ח', "המלצות")) return "committee";
  if (has(title, "תזונה", "פציעות", "פעילות גופנית", "פסיכולוג", "משחק ותחרות", "מודלים כלכליים", "הגנה על ילדים")) return "lecture";
  if (has(title, "ספר", "ספרים", "מישקה")) return "skip"; // book-promo (covered by /books)
  if (has(title, "תודות", "נעים להכיר", "נתוני המכירות", "מצגת", "הסתיימו", "התחלה חדשה", "שיר פרידה", "הצעות לשיתוף")) return "skip";
  return "article";
}
const CAT_MAP = { conference: "conference", committee: "committee", lecture: "lecture", article: "article" };

// ---- Hebrew -> latin slug transliteration ----
const HEB = {
  "א": "a", "ב": "b", "ג": "g", "ד": "d", "ה": "h", "ו": "v", "ז": "z",
  "ח": "ch", "ט": "t", "י": "y", "כ": "k", "ך": "k", "ל": "l", "מ": "m",
  "ם": "m", "נ": "n", "ן": "n", "ס": "s", "ע": "a", "פ": "p", "ף": "f",
  "צ": "tz", "ץ": "tz", "ק": "k", "ר": "r", "ש": "sh", "ת": "t",
};
function slugify(title, id) {
  const base = [...title.normalize("NFC")]
    .map((ch) => HEB[ch] ?? (/[a-z0-9]/i.test(ch) ? ch.toLowerCase() : " "))
    .join("")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48)
    .replace(/-$/g, "");
  return `${base || "post"}-${id}`;
}

// ---- entity decode ----
function decode(s) {
  return s
    .replace(/&nbsp;/g, " ").replace(/&#160;/g, " ")
    .replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&#8217;/g, "’")
    .replace(/&#8216;/g, "‘").replace(/&#8211;/g, "–").replace(/&#8212;/g, "—")
    .replace(/&#8230;/g, "…").replace(/&#8220;/g, "“").replace(/&#8221;/g, "”")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(+n))
    .replace(/&hellip;/g, "…").replace(/&laquo;/g, "«").replace(/&raquo;/g, "»");
}

// Injected SEO-spam detector (anchor text or href). The legacy site was hacked
// with shoe/backpack spam links pointing at junk .fr/.de/.es shops.
const SPAM_RE = /kanken|fj[aä]ll|mochila|\bugg\b|nike|adidas|roshe|air[\s-]*max|ultra[\s-]*boost|moncler|canada goose|pas cher|soldes|rucksack|bottes|chaussures|lepetrintoussaint|reseaubase|greenman|ekitech|alkeia|lamusiqueducorps|fjallravenkanken|kankenrucksack|fjallravenrucksack/i;
function isSpam(text, href) {
  return SPAM_RE.test(text) || SPAM_RE.test(href || "");
}
// Remove plain-text spam: any run of consecutive latin words that contains a
// spam term (content is Hebrew, so a latin run with "ugg"/"kanken"/etc. is junk).
function stripSpamText(s) {
  return s
    .replace(/(?:[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9.'’-]*(?:[ \t]+|$)){1,}/g, (run) =>
      SPAM_RE.test(run) ? " " : run
    )
    .replace(/[ \t]{2,}/g, " ")
    .replace(/[ \t]+([.,;:…])/g, "$1");
}

// ---- HTML -> Markdown (tuned for WordPress entry content) ----
function htmlToMd(html) {
  let h = html;
  h = h.replace(/<!\[CDATA\[/g, "").replace(/\]\]>/g, "");
  h = h.replace(/<script[\s\S]*?<\/script>/gi, "")
       .replace(/<style[\s\S]*?<\/style>/gi, "")
       .replace(/<!--[\s\S]*?-->/g, "");
  // youtube/vimeo iframes -> link
  h = h.replace(/<iframe[^>]*\bsrc=["']([^"']+)["'][^>]*><\/iframe>/gi, (_, src) => `\n\n[סרטון]($1)\n\n`);
  // images
  h = h.replace(/<img[^>]*>/gi, (tag) => {
    const src = (tag.match(/\bsrc=["']([^"']+)["']/i) || [])[1] || "";
    const alt = (tag.match(/\balt=["']([^"']*)["']/i) || [])[1] || "";
    if (!src || /spacer|blank|pixel/i.test(src)) return "";
    const abs = src.startsWith("http") ? src : `https://shlomitguy.co.il${src.startsWith("/") ? "" : "/"}${src}`;
    return `\n\n![${alt}](${abs})\n\n`;
  });
  // headings
  h = h.replace(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/gi, (_, lvl, inner) => {
    const hashes = "#".repeat(Math.min(6, Math.max(2, +lvl))); // demote h1->h2 (page h1 is the title)
    return `\n\n${hashes} ${strip(inner)}\n\n`;
  });
  // bold / italic
  h = h.replace(/<(strong|b)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, t) => `**${strip(t)}**`);
  h = h.replace(/<(em|i)\b[^>]*>([\s\S]*?)<\/\1>/gi, (_, __, t) => `*${strip(t)}*`);
  // links — but drop injected SEO spam (the legacy WP site was compromised)
  h = h.replace(/<a\b[^>]*\bhref=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href, t) => {
    const txt = strip(t).trim();
    if (!txt) return "";
    if (isSpam(txt, href)) return ""; // remove text + link entirely
    return `[${txt}](${href})`;
  });
  // blockquote
  h = h.replace(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi, (_, t) =>
    "\n\n" + strip(t).split("\n").filter(Boolean).map((l) => `> ${l}`).join("\n") + "\n\n");
  // lists
  h = h.replace(/<li[^>]*>([\s\S]*?)<\/li>/gi, (_, t) => `\n- ${strip(t).trim()}`);
  h = h.replace(/<\/?(ul|ol)[^>]*>/gi, "\n\n");
  // paragraphs & breaks & block separators
  h = h.replace(/<br\s*\/?>/gi, "  \n");
  h = h.replace(/<\/p>/gi, "\n\n").replace(/<p[^>]*>/gi, "");
  h = h.replace(/<\/?(div|section|article|span|figure|figcaption)[^>]*>/gi, "\n");
  // strip any remaining tags
  h = h.replace(/<[^>]+>/g, "");
  h = decode(h);
  // whitespace cleanup
  h = h.replace(/[ \t]+/g, " ")
       .replace(/ *\n */g, "\n")
       .replace(/\n{3,}/g, "\n\n")
       .replace(/^\s+|\s+$/g, "");
  return stripSpamText(h);
}
function strip(html) {
  return decode(html.replace(/<[^>]+>/g, "")).replace(/\s+/g, " ").trim();
}

// ---- per-source extraction ----
async function rawOf(key) {
  return readFile(path.join(ARC, "raw", `${key}.html`), "utf8");
}
function contentEncoded(rawRss) {
  const m = rawRss.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/);
  return m ? m[1] : "";
}
function pubDate(rawRss) {
  const m = rawRss.match(/<pubDate>([^<]+)<\/pubDate>/);
  if (!m) return "";
  const d = new Date(m[1]);
  return isNaN(d) ? "" : d.toISOString().slice(0, 10);
}
function rssDescription(rawRss) {
  const m = rawRss.match(/<description>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/description>/);
  return m ? strip(m[1]) : "";
}
function entryContent(rawHtml) {
  // grab <div class="entry-content"> ... up to the matching closing region.
  const start = rawHtml.search(/<div[^>]*class=["'][^"']*entry-content[^"']*["']/i);
  if (start === -1) return "";
  const after = rawHtml.slice(start);
  // cut at the footer/comments/sharedaddy markers that follow entry-content
  const end = after.search(/<(div[^>]*class=["'][^"']*(sharedaddy|entry-utility|nav-|comments|widget)|footer|\/article)/i);
  return after.slice(0, end === -1 ? 20000 : end);
}
function pageDate(rawHtml) {
  const m = rawHtml.match(/datetime=["']([0-9]{4}-[0-9]{2}-[0-9]{2})/);
  return m ? m[1] : "";
}

function excerptFrom(md, fallback) {
  let t = stripSpamText(fallback || md).replace(/[#>*_!\[\]()]/g, " ").replace(/https?:\/\/\S+/g, " ").replace(/\s+/g, " ").trim();
  if (t.length <= 160) return t;
  const cut = t.slice(0, 160);
  return cut.slice(0, cut.lastIndexOf(" ")) + "…";
}

const fm = (o) =>
  "---\n" +
  Object.entries(o).map(([k, v]) =>
    typeof v === "number" || typeof v === "boolean"
      ? `${k}: ${v}`
      : `${k}: ${JSON.stringify(v).replace(/^"|"$/g, '"')}`
  ).join("\n") +
  "\n---\n\n";

async function buildBody(m) {
  if (m.type === "post") {
    const raw = await rawOf(m.key);
    return { md: htmlToMd(contentEncoded(raw)), date: pubDate(raw), desc: rssDescription(raw) };
  }
  const raw = await rawOf(m.key);
  return { md: htmlToMd(entryContent(raw)), date: pageDate(raw), desc: "" };
}

async function main() {
  await mkdir(path.join(ROOT, "content/imperia"), { recursive: true });
  const postsDir = path.join(ROOT, "content/posts");

  const written = { imperia: 0, article: 0, committee: 0, lecture: 0, conference: 0 };
  const index = []; // for imperia ordering

  // 1) imperia chapters
  for (let i = 0; i < IMPERIA.length; i++) {
    const c = IMPERIA[i];
    const key = `${c.type === "post" ? "p" : "page"}_${c.id}`;
    const m = byKey.get(key);
    if (!m) { console.warn("missing imperia source", key); continue; }
    const { md } = await buildBody(m);
    const slug = c.n ? `chapter-${String(c.n).padStart(2, "0")}` : `${c.group}-${c.id}`;
    const file = path.join(ROOT, "content/imperia", `${slug}.mdx`);
    await writeFile(file, fm({
      title: c.title, order: i, chapter: c.n ?? null, group: c.group ?? "chapter",
      sourceUrl: m.url,
    }) + md + "\n", "utf8");
    index.push({ slug, ...c });
    written.imperia++;
  }
  await writeFile(path.join(ROOT, "content/imperia/_index.json"), JSON.stringify(index, null, 2), "utf8");

  // 2) blog posts from the approved categories (skip imperia ids + noise)
  const { missing } = JSON.parse(await readFile(path.join(ARC, "diff-report.json"), "utf8"));
  for (const mm of missing) {
    if (mm.type === "home") continue;
    if (imperiaIds.has(`${mm.type}:${mm.id}`)) continue; // handled above
    let b = bucket(mm.title);
    if (mm.type === "page" && b === "article") b = "skip"; // index-style pages -> page-misc
    const cat = CAT_MAP[b];
    if (!cat) continue;
    const m = byKey.get(mm.key);
    const { md, date, desc } = await buildBody(m);
    if (md.split(/\s+/).filter(Boolean).length < 60) continue; // too thin to be a page
    const slug = slugify(mm.title, mm.id);
    await writeFile(path.join(postsDir, `${slug}.mdx`), fm({
      title: mm.title,
      date: date || "2015-01-01",
      excerpt: excerptFrom(md, desc),
      category: cat,
      sourceUrl: m.url,
    }) + md + "\n", "utf8");
    written[cat]++;
  }

  console.log("WROTE:", written);
}
main();
