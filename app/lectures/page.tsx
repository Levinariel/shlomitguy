import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: 'הרצאות | ד"ר שלומית גיא',
  description: 'הרצאות וסמינרים של ד"ר שלומית גיא למנהלים, מאמנים וארגוני ספורט. מניעת אלימות, חינוך וספורט, מנהיגות.',
  alternates: { canonical: "https://rasisnahara.netlify.app/lectures" },
};

const topics = [
  {
    n: "01",
    title: "הגזר במקום המקל",
    desc: "מניעת אלימות דרך שימוש בתיאוריית החלונות השבורים ובדוגמה של הכדורגל האנגלי.",
  },
  {
    n: "02",
    title: "ארסנל פינת באר שבע",
    desc: "תיאוריות וכלים פרקטיים לניהול קהל אוהדים.",
  },
  {
    n: "03",
    title: "לרוץ עם נעלי עקב",
    desc: "האם נשים בספורט אי פעם תגענה לשוויון?",
  },
  {
    n: "04",
    title: "כולם ידעו ואף אחד לא עשה דבר",
    desc: "אלימות של צוותי אימון בילדות ובילדים בספורט ההישגי.",
  },
];

export default function LecturesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <SectionHeading title="הרצאות וסמינרים" subtitle="הזמינו הרצאה מותאמת אישית לארגון שלכם" />

      <p className="text-[var(--color-fg)] leading-relaxed mb-10 text-base">
        ד&quot;ר שלומית גיא מעבירה הרצאות וסמינרים מבוססי מחקר לארגוני ספורט, מוסדות חינוך, מנהלים ומאמנים. ההרצאות משלבות ממצאי מחקר עדכניים, סיפורים מהשטח וכלים פרקטיים שניתן ליישם מיד.
      </p>

      <div className="border-t border-[var(--color-line)] mb-14">
        {topics.map((topic) => (
          <div
            key={topic.title}
            className="group flex flex-col md:flex-row gap-2 md:gap-8 border-b border-[var(--color-line)] py-6"
          >
            <span className="text-sm font-semibold text-[var(--color-accent)] tabular-nums md:w-12 shrink-0 md:pt-1">
              {topic.n}
            </span>
            <div className="md:flex-1">
              <h3 className="font-bold text-[var(--color-ink)] text-xl mb-2 group-hover:text-[var(--color-accent)] transition-colors">
                {topic.title}
              </h3>
              <p className="text-sm text-[var(--color-ink)]/80 leading-relaxed max-w-2xl">{topic.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Contact details */}
      <div className="bg-[var(--color-surface)] rounded-md p-8 border border-[var(--color-line)]">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-1">צרו קשר</p>
        <h2 className="text-2xl font-extrabold text-[var(--color-ink)] mb-2">הזמינו הרצאה</h2>
        <p className="text-[var(--color-muted)] text-sm mb-6">
          אשמח לשמוע מכם – שלחו פנייה ואחזור אליכם בהקדם.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="bg-[var(--color-card)] rounded-md p-4 border border-[var(--color-line)]">
            <p className="text-xs text-[var(--color-muted)] mb-1">דוא&quot;ל</p>
            <a
              href="mailto:guyshlomit1@gmail.com"
              className="font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] hover:underline break-all"
            >
              guyshlomit1@gmail.com
            </a>
          </div>
          <div className="bg-[var(--color-card)] rounded-md p-4 border border-[var(--color-line)]">
            <p className="text-xs text-[var(--color-muted)] mb-1">פייסבוק</p>
            <a
              href="https://www.facebook.com/dr.shlomitguy/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] hover:underline"
            >
              ד&quot;ר שלומית גיא – מניעת אלימות בספורט
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
