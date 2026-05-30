import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'אודות | ד"ר שלומית גיא',
  description: 'ד"ר שלומית גיא – חוקרת, סופרת ומרצה בתחום ספורט וחברה. קראו על הרקע האקדמי, המחקרים והפעילות שלה.',
  alternates: { canonical: "https://rasisnahara.netlify.app/about" },
};

const timeline = [
  { year: "2006", event: "הגשת תזה לתואר שני – מחקר קהילות אוהדי כדורגל בישראל" },
  { year: "2006", event: "מחקר שטח ראשון בלונדון – פגישות עם ראשי האקדמיות של צ'לסי, ארסנל וקווינס פארק ריינג'רס" },
  { year: "2010", event: "הגשת עבודת דוקטורט – מחלקת אנתרופולוגיה וסוציולוגיה, אוניברסיטת בן גוריון" },
  { year: "2010", event: "פרסום הספר \"אימפריה\" (הוצאת רסיס נהרה)" },
  {
    year: "2010–2024",
    event:
      "הרצאות וסדנאות למחלקות נוער של קבוצות ספורט ולהכשרת מורים; ייעוץ לוועדות ממשלתיות (המועצה למניעת אלימות בספורט, ועדת צור, ועדת זליכה); ייעוץ אסטרטגי למכבי באר שבע, הפועל פתח תקווה ומכבי חיפה",
  },
  {
    year: "2020–2025",
    event:
      "מחקר עומק על אלימות צוותי אימון כלפי ילדות וילדים בספורט ההישגי – 27 ראיונות עם ספורטאים וספורטאיות",
  },
  { year: "2026", event: "פרסום הספר \"כולם ידעו ואף אחד לא עשה דבר\" (רסיס נהרה)" },
  { year: "2024", event: "רכישת הוצאת רסיס נהרה – הוצאת בוטיק לספרי ספורט וילדים" },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <SectionHeading title="אודות" subtitle='ד"ר שלומית גיא' />

      <div className="flex flex-col md:flex-row gap-10 items-start mb-14">
        <div className="w-full md:w-64 flex-shrink-0 relative">
          <div className="absolute -bottom-3 -left-3 w-full h-full rounded-md bg-[var(--color-accent)]/10 hidden md:block" />
          <img
            src="/images/profile-main.jpg"
            alt='ד"ר שלומית גיא'
            className="relative rounded-md w-full object-cover shadow-[0_18px_50px_-25px_rgba(31,61,52,0.45)]"
          />
        </div>
        <div className="flex-1 leading-relaxed space-y-4 text-[var(--color-fg)]">
          <p>
            תמיד אהבתי ספורט – בעיקר כדורסל, טניס, אתלטיקה ושחייה. סיפור האהבה שלי עם הכדורגל התחיל במהלך לימודי התואר השני שלי באוניברסיטת בן גוריון ולאחר שאחי הקטן, אלי, לקח אותי לראשונה לצפות במשחק כדורגל של הפועל באר שבע נגד הפועל תל אביב. החוויה הראשונה הייתה קשה. אני בעיקר זוכרת את הקריאות &quot;הוא חולה סרטן&quot; שצעקו אוהדי הפועל באר שבע כלפי הקוון, שהיה, מה לעשות, קרח. יצאתי מזועזעת. אבל סקרנית.
          </p>
          <p>
            אחרי שלוש שנים של מחקר התאהבתי בקהילות האוהדים בישראל והפעולות שקהילות אלה עושות כדי לעצב ולהשפיע על הקבוצה אותה הם אוהבים. המסקנות שלי התפרסמו בעבודת תזה שהוגשה בשנת 2006 לאוניברסיטה ובמספר מאמרים. במקביל, הפקתי וביימתי סרט בשם &quot;משחק המלכים&quot;, העוסק בקשר שבין כדורגל ודת. הסרט הוצג בקולנוע &quot;נגטיב&quot; באוניברסיטת בן גוריון, בסינמטק שדרות והשתתף בפסטיבל הסרטים הבינלאומי &quot;עין יהודית&quot;.
          </p>
          <p>
            עבור עבודת הדוקטורט שלי רציתי לחקור את הכדורגל הטוב בעולם. ביולי 2006 נסעתי לראשונה לאנגליה כדי להיפגש עם ראשי האקדמיות של צ&apos;לסי, ארסנל וקווינס פארק ריינג&apos;רס. את הסיפור המלא אפשר לקרוא בספר <em>אימפריה</em>, שפרסמתי בעקבות השנה בה חייתי בלונדון (הוצאת רסיס נהרה, 2010).
          </p>
          <p>
            המחקר שלי עסק בצד ההיסטורי והחברתי של משחק הכדורגל. עד שנות השמונים של המאה העשרים הייתה נפוצה באנגליה תופעה של חוליגניות בכדורגל. לאורך שנות התשעים, ובעקבות פעולות אקטיביות של ועדה ממשלתית, הנהלת הליגה, המועדונים עצמם ואמצעי התקשורת, נעלמה לחלוטין התופעה וכעת משחקי כדורגל אנגלי מזכירים יותר מהכול בילוי בתיאטרון.
          </p>
          <p>
            באוקטובר 2010 הגשתי גם את עבודת הדוקטורט שלי למחלקה לאנתרופולוגיה וסוציולוגיה באוניברסיטת בן גוריון. מאז אני מעבירה סדנאות והרצאות במחלקות נוער של קבוצות ספורט בישראל ובמסגרות של הכשרת מורים. ייעצתי לוועדות ממשלתיות (המועצה למניעת אלימות בספורט, ועדת צור, ועדת זליכה) ושימשתי כיועצת אסטרטגית במועדוני הכדורגל מכבי באר שבע, הפועל פתח תקווה ומכבי חיפה.
          </p>
          <p>
            בין השנים 2020–2025 ערכתי מחקר עומק נוסף שעסק באלימות של צוותי אימון כלפי ילדות וילדים בספורט ההישגי. במהלך המחקר ראיינו 27 ספורטאים וספורטאיות, רובם המכריע דיווח על ביטויי אלימות מילולית, נפשית, פיזית, כלכלית ומינית בתהליך ההכשרה. 13 ראיונות התפרסמו כלשונם בספר <em>&quot;כולם ידעו ואף אחד לא עשה דבר&quot;</em> (רסיס נהרה, 2026).
          </p>
          <p>
            לבסוף, בשנת 2024, רכשתי את הוצאת רסיס נהרה, ההוצאה בה פירסמתי את ספרי הראשון (<em>אימפריה</em>, 2010). כיום רסיס נהרה מבית שלומית גיא היא הוצאת בוטיק המתמחה בספרי ספורט וילדים. בין השנים 2024–2026 הוצאנו לאור שמונה ספרים פורצי דרך ומיוחדים.{" "}
            <Link href="/books" className="text-[var(--color-accent)] font-semibold underline underline-offset-2 hover:text-[var(--color-accent-hover)]">
              לרשימת הספרים ולעמוד ההוצאה לחצו כאן.
            </Link>
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="mb-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-1">ציר זמן</p>
        <h2 className="text-2xl font-extrabold text-[var(--color-ink)] mb-6">עיקרי הקריירה</h2>
        <div className="border-t border-[var(--color-line)]">
          {timeline.map((item) => (
            <div
              key={item.event}
              className="flex flex-col md:flex-row md:items-baseline gap-1 md:gap-8 border-b border-[var(--color-line)] py-5"
            >
              <span className="text-sm font-semibold text-[var(--color-accent)] tabular-nums md:w-28 shrink-0">
                {item.year}
              </span>
              <p className="text-[var(--color-ink)]/85 leading-relaxed">{item.event}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[var(--color-surface)] rounded-md p-8 text-center border border-[var(--color-line)]">
        <p className="text-[var(--color-ink)] font-semibold text-lg mb-5">מעוניינים להזמין הרצאה?</p>
        <Link
          href="/contact"
          className="inline-block bg-[var(--color-accent)] text-[var(--color-card)] px-7 py-3 rounded-sm font-semibold hover:bg-[var(--color-accent-hover)] transition-colors active:scale-[0.98]"
        >
          צרו קשר
        </Link>
      </div>
    </div>
  );
}
