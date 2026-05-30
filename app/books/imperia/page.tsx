import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'אימפריה | ד"ר שלומית גיא',
  description:
    'הספר "אימפריה" מאת ד"ר שלומית גיא – שנת מחקר שטח בין קהילות אוהדי הכדורגל באנגליה. לקריאה חופשית, פרק אחר פרק.',
  alternates: { canonical: "https://rasisnahara.netlify.app/books/imperia" },
};

const SITE = "https://shlomitguy.co.il";

const frontMatter = [
  { label: "הקדמה מאת אבי מלר", url: `${SITE}/?page_id=170` },
  { label: "תודות", url: `${SITE}/?p=312` },
  { label: "פרולוג", url: `${SITE}/?page_id=168` },
];

const chapters = [
  { n: "01", label: "ג'וני של ארסנל, ארסנל של ג'וני", url: `${SITE}/?p=1786` },
  { n: "02", label: "אוגוסט–ספטמבר 2007: שכר לימוד", url: `${SITE}/?p=1803` },
  { n: "03", label: "להיות אוהד כדורגל סוף המאה העשרים", url: `${SITE}/?p=1811` },
  {
    n: "04",
    label: "להיות אוהד כדורגל מסוף המאה העשרים, או: אז איך הם עשו את זה?",
    url: `${SITE}/?p=1814`,
  },
  {
    n: "05",
    label:
      '"ככל שעמוקים יותר היסודות חזקה יותר המצודה" (הכיתוב בכניסת השחקנים לאצטדיון האמירויות)',
    url: `${SITE}/?p=1818`,
  },
  { n: "06", label: "קצת טקטיקה וממשיכים", url: `${SITE}/?p=1823` },
  { n: "07", label: "ילדים טובים משחקים כדורגל", url: `${SITE}/?p=1826` },
  { n: "08", label: "משפחה טובה", url: `${SITE}/?p=1829` },
  { n: "09", label: "יום שמשי אחד", url: `${SITE}/?p=1832` },
  { n: "10", label: "חורף, תקופה של מהפכות", url: `${SITE}/?p=1842` },
  { n: "11", label: "חג המולד", url: `${SITE}/?p=1845` },
  { n: "12", label: "כך בונים אימפריה", url: `${SITE}/?p=1851` },
  {
    n: "13",
    label: "אין זרים בכדורגל האנגלי (להוציא את כריסטיאנו רונלדו)",
    url: `${SITE}/?p=1854`,
  },
  { n: "14", label: "התחלת הסוף", url: `${SITE}/?p=1857` },
  { n: "15", label: "שיר פרידה", url: `${SITE}/?p=1891` },
  { n: "16", label: "אימפריות נופלות לאט", url: `${SITE}/?p=1894` },
  { n: "17", label: "הגזר", url: `${SITE}/?p=1903` },
];

const backMatter = [
  { label: "אפילוג", url: `${SITE}/?p=1907` },
  { label: 'המלצות דו"ח ועדת טיילור (מתורגם לעברית)', url: `${SITE}/?p=1907` },
];

function ChapterRow({ n, label, url }: { n?: string; label: string; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-baseline gap-4 md:gap-6 border-b border-[var(--color-line)] py-4 hover:bg-[var(--color-surface)]/50 transition-colors"
    >
      <span className="text-sm font-semibold text-[var(--color-accent)] tabular-nums w-8 shrink-0">
        {n ?? "•"}
      </span>
      <span className="text-[var(--color-ink)] leading-relaxed group-hover:text-[var(--color-accent)] transition-colors">
        {label}
      </span>
    </a>
  );
}

export default function ImperiaPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <Link
        href="/books"
        className="text-sm text-[var(--color-accent)] hover:underline mb-8 block"
      >
        &larr; חזרה לספרים
      </Link>

      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-2">
        ספר מחקר · 8 באוקטובר 2010
      </p>
      <h1 className="text-4xl md:text-5xl font-extrabold text-[var(--color-ink)] mb-8 leading-tight">
        אימפריה
      </h1>

      <div className="prose">
        <p>
          אימפריה נכתב ונערך במשך שלוש שנים: שנה אחת במהלך שהותי באנגליה ועוד שנתיים בישראל. הוא מספר את
          סיפורם של ג&apos;וני ומשפחתו, שהיו אוהדי ארסנל &quot;מסורתיים&quot; מבני מעמד הפועלים, שכעת לא יכולים
          להרשות לעצמם לרכוש כרטיסים לאצטדיון האמירויות. הוא מספר את סיפורו של דיוויד, שחקן צעיר באקדמיה של
          ארסנל שחולם לעלות בשנה הבאה לקבוצה הבוגרת של ארסן ונגר, אבל נתקל כל העת בקשיים, והוא מספר את סיפורם
          של מאות ילדים ובני נוער המתאמנים חמש פעמים בשבוע וחולמים להיות כוכבים. אימפריה מספר את הסיפור של
          המאמן הישראלי המצליח ביותר באנגליה, והדרך בה התייחסו לאברם גרנט לאורך כל התקופה שלו בצ&apos;לסי. אבל
          חשוב אולי יותר מכל אלה, אימפריה מספר את סיפורו של הכדורגל האנגלי והדרך שלו להפוך מספורט המוני ואלים
          למערבי ותרבותי. מבושה לאימפריה.
        </p>
        <p>
          מהיום ניתן לקרוא את &quot;אימפריה&quot; בחינם דרך הקישורים שלהלן. בכל שבוע התפרסם פרק אחד. אם אהבתם
          ואתם מאמינים שהספר חשוב לכל מאמן ומדריך ילדים, שתפו את החברים שלכם. תמיד אשמח לשמוע הערות. אה…
          וקריאה נעימה!
        </p>
      </div>

      {/* Chapter index */}
      <div className="mt-12">
        <h2 className="text-2xl font-extrabold text-[var(--color-ink)] mb-4">הספר לקריאה חופשית</h2>
        <div className="border-t border-[var(--color-line)]">
          {frontMatter.map((c) => (
            <ChapterRow key={c.label} {...c} />
          ))}
          {chapters.map((c) => (
            <ChapterRow key={c.n} {...c} />
          ))}
          {backMatter.map((c) => (
            <ChapterRow key={c.label} {...c} />
          ))}
        </div>
      </div>

      {/* Buy hardcopy */}
      <div className="mt-12 bg-[var(--color-surface)] rounded-md p-8 border border-[var(--color-line)]">
        <h2 className="text-xl font-bold text-[var(--color-ink)] mb-2">
          מעדיפים לקרוא את &quot;אימפריה&quot; כעותק קשיח?
        </h2>
        <p className="text-sm text-[var(--color-muted)] leading-relaxed mb-5">
          התשלום מתבצע באמצעות PayPal ודורש הרשמה קצרה. לאחר התשלום הספר יישלח לביתכם.
        </p>
        <a
          href={`${SITE}/?page_id=672`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-[var(--color-accent)] text-[var(--color-card)] px-7 py-3 rounded-sm font-semibold text-sm hover:bg-[var(--color-accent-hover)] transition-colors active:scale-[0.98]"
        >
          לרכישת הספר
        </a>
      </div>
    </div>
  );
}
