import type { Metadata } from "next";
import Link from "next/link";
import { getAllChapters } from "@/lib/imperia";

export const metadata: Metadata = {
  title: 'אימפריה | ד"ר שלומית גיא',
  description:
    'הספר "אימפריה" מאת ד"ר שלומית גיא – שנת מחקר שטח בין קהילות אוהדי הכדורגל באנגליה. לקריאה חופשית, פרק אחר פרק.',
  alternates: { canonical: "https://rasisnahara.netlify.app/books/imperia" },
};

const SITE = "https://shlomitguy.co.il";

function ChapterRow({ n, label, slug }: { n?: string; label: string; slug: string }) {
  return (
    <Link
      href={`/books/imperia/${slug}`}
      className="group flex items-baseline gap-4 md:gap-6 border-b border-[var(--color-line)] py-4 hover:bg-[var(--color-surface)]/50 transition-colors"
    >
      <span className="text-sm font-semibold text-[var(--color-accent)] tabular-nums w-8 shrink-0">
        {n ?? "•"}
      </span>
      <span className="text-[var(--color-ink)] leading-relaxed group-hover:text-[var(--color-accent)] transition-colors">
        {label}
      </span>
    </Link>
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
          {getAllChapters().map((c) => (
            <ChapterRow
              key={c.slug}
              slug={c.slug}
              label={c.title}
              n={c.chapter != null ? String(c.chapter).padStart(2, "0") : undefined}
            />
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
