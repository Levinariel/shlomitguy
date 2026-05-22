import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: 'הרצאות | ד"ר שלומית גיא',
  description: 'הרצאות וסמינרים של ד"ר שלומית גיא למנהלים, מאמנים וארגוני ספורט. מניעת אלימות, חינוך וספורט, מנהיגות.',
};

const topics = [
  {
    title: "מניעת אלימות בספורט הישגי",
    audience: "מאמנים, הורים, מנהלי קבוצות ילדים",
    desc: 'בהתבסס על מחקר ממשי ו-13 ראיונות עם ספורטאים, ההרצאה חושפת את המנגנונים שמאפשרים אלימות בהכשרות ילדים ומציגה כלים מעשיים לשינוי. מבוסס על הספר "כולם ידעו ואף אחד לא עשה דבר".',
  },
  {
    title: "ספורט ככלי חינוכי",
    audience: "מחנכים, מנהלי בתי ספר, אנשי חינוך",
    desc: "כיצד ניתן לרתום את עולם הספורט לחיזוק ערכים, פיתוח מיומנויות חיים וקידום תלמידים. הרצאה עם דוגמאות מהשטח ומחקר עדכני.",
  },
  {
    title: "מנהיגות ותרבות ארגונית בספורט",
    audience: "מנהלים בכירים, מאמנים, ארגוני ספורט",
    desc: "בניית תרבות ארגונית בריאה בקבוצות ספורט, ניהול קונפליקטים, פיתוח מנהיגות ואחריות ספורטאים – לקחים מהמחקר ומהשטח.",
  },
  {
    title: "אוהדים, זהות וקהילה",
    audience: "חוקרים, אנשי תרבות, ארגוני ספורט",
    desc: 'מחקר על קהילות אוהדי כדורגל בישראל ובאנגליה – מי הם, מה מניע אותם, ומה ניתן ללמוד מהם. מבוסס על ספר המחקר "אימפריה".',
  },
];

export default function LecturesPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <SectionHeading title="הרצאות וסמינרים" subtitle="הזמינו הרצאה מותאמת אישית לארגון שלכם" />

      <p className="text-[var(--color-fg)] leading-relaxed mb-10 text-base">
        ד&quot;ר שלומית גיא מעבירה הרצאות וסמינרים מבוססי מחקר לארגוני ספורט, מוסדות חינוך, מנהלים ומאמנים. ההרצאות משלבות ממצאי מחקר עדכניים, סיפורים מהשטח וכלים פרקטיים שניתן ליישם מיד.
      </p>

      <div className="grid md:grid-cols-2 gap-6 mb-14">
        {topics.map((topic) => (
          <div key={topic.title} className="bg-white border border-[var(--color-surface)] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-[var(--color-navy)] text-lg mb-1">{topic.title}</h3>
            <p className="text-xs text-[var(--color-muted)] mb-3">קהל יעד: {topic.audience}</p>
            <p className="text-sm text-[var(--color-fg)] leading-relaxed">{topic.desc}</p>
          </div>
        ))}
      </div>

      {/* Contact form */}
      <div className="bg-[var(--color-surface)] rounded-2xl p-8">
        <h2 className="text-xl font-bold text-[var(--color-navy)] mb-2">הזמינו הרצאה</h2>
        <p className="text-[var(--color-muted)] text-sm mb-6">
          אשמח לשמוע מכם – שלחו פנייה ואחזור אליכם בהקדם.
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
            <span className="text-2xl">✉️</span>
            <div>
              <p className="text-xs text-[var(--color-muted)]">דוא&quot;ל</p>
              <a
                href="mailto:guyshlomit1@gmail.com"
                className="font-semibold text-[var(--color-navy)] hover:underline"
              >
                guyshlomit1@gmail.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white rounded-xl p-4 shadow-sm">
            <span className="text-2xl">👥</span>
            <div>
              <p className="text-xs text-[var(--color-muted)]">פייסבוק</p>
              <a
                href="https://www.facebook.com/dr.shlomitguy/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[var(--color-navy)] hover:underline"
              >
                ד&quot;ר שלומית גיא – מניעת אלימות בספורט
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
