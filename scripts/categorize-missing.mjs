// Categorize the "missing" items from diff-report.json into priority buckets,
// using title keywords + extracted-text word counts (signal of substance).
import { readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const { missing } = JSON.parse(await readFile(path.join(ROOT, "_wp-archive/diff-report.json"), "utf8"));

async function words(rec) {
  try {
    const t = await readFile(path.join(ROOT, "_wp-archive", rec.txtFile), "utf8");
    // drop the 2 header lines (title + url)
    const body = t.split("\n").slice(2).join(" ");
    return body.split(/\s+/).filter(Boolean).length;
  } catch { return 0; }
}

const has = (s, ...kw) => kw.some((k) => s.includes(k));

function bucket(title) {
  if (has(title, "רכישת", "תשלום", "הרשמה", "צרי עמי קשר", "הזמנת הרצאות")) return "skip-transactional";
  if (has(title, "כנס", "סדר היום", "סדר יום", "תקצירי הרצאות", "פאנל")) return "conference";
  // אימפריה serialized chapters (London-football narrative, ids ~1786-1911 + prologue)
  if (has(title, "אימפריה", "ארסנל", "אצטדיון האמירויות", "אוהד כדורגל אנגלי", "אפילוג", "פרק ", "שכר לימוד", "קצת טקטיקה", "חג המולד", "אין זרים")) return "imperia-chapter";
  if (has(title, "ועדת", "דו\"ח", "המלצות")) return "committee-report";
  if (has(title, "תזונה", "פציעות", "פעילות גופנית", "פסיכולוג", "משחק ותחרות", "מודלים כלכליים", "הגנה על ילדים")) return "guest-lecture";
  if (has(title, "ספר", "ספרים", "מישקה")) return "books-meta";
  if (has(title, "תודות", "נעים להכיר", "נתוני המכירות", "מצגת", "הסתיימו", "התחלה חדשה", "שיר פרידה", "הצעות לשיתוף")) return "admin-misc";
  return "article";
}

const groups = {};
for (const m of missing) {
  const wc = await words(m);
  const b = m.type === "page" && bucket(m.title) === "article" ? "page-misc" : bucket(m.title);
  (groups[b] ||= []).push({ title: m.title, url: m.url, words: wc });
}

const order = ["article", "committee-report", "guest-lecture", "conference", "imperia-chapter", "books-meta", "page-misc", "admin-misc", "skip-transactional"];
for (const g of order) {
  const items = (groups[g] || []).sort((a, b) => b.words - a.words);
  if (!items.length) continue;
  const total = items.reduce((s, i) => s + i.words, 0);
  console.log(`\n## ${g}  (${items.length} items, ${total} words total)`);
  for (const i of items) console.log(`  ${String(i.words).padStart(4)}w  ${i.title}  —  ${i.url}`);
}
