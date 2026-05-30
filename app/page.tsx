import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import BlogCard from "@/components/BlogCard";
import { getRecentPosts } from "@/lib/posts";

export const metadata: Metadata = {
  alternates: { canonical: "https://rasisnahara.netlify.app" },
};

const lectureTopics = [
  {
    n: "01",
    title: "מניעת אלימות בספורט",
    desc: "כלים מעשיים להפחתת אלימות בקרב ילדים ומבוגרים בהכשרות ספורטיביות.",
  },
  {
    n: "02",
    title: "ספורט וחינוך",
    desc: "כיצד הספורט יכול לשמש כלי חינוכי יעיל ולפתח מיומנויות חיים.",
  },
  {
    n: "03",
    title: "מנהיגות בספורט",
    desc: "פיתוח מנהיגות, ניהול קבוצות ובניית תרבות ארגונית בריאה.",
  },
];

const stats = [
  { num: "20+", label: "שנות מחקר" },
  { num: "8+", label: "ספרים שפורסמו" },
  { num: "100+", label: "הרצאות" },
  { num: "PhD", label: "מחקר אנתרופולוגי" },
];

export default async function Home() {
  const recentPosts = await getRecentPosts(3);

  return (
    <>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="text-right order-2 md:order-1">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-accent)]">
              חוקרת · סופרת · מרצה
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--color-ink)] leading-[1.05]">
              ד&quot;ר שלומית גיא
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-[var(--color-ink)]/80 leading-snug">
              ספורט וחברה — מחקר, כתיבה והרצאות.
            </p>
            <p className="mt-4 text-base text-[var(--color-muted)] leading-relaxed max-w-md">
              הרצאות וסמינרים למנהלים, מאמנים וארגונים · מניעת אלימות בספורט הישגי · הוצאת רסיס נהרה לספרי ספורט וילדים.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/lectures"
                className="bg-[var(--color-accent)] text-[var(--color-card)] px-7 py-3 rounded-sm font-semibold hover:bg-[var(--color-accent-hover)] transition-colors active:scale-[0.98]"
              >
                הזמנת הרצאה
              </Link>
              <Link
                href="/about"
                className="px-7 py-3 rounded-sm font-semibold text-[var(--color-ink)] border border-[var(--color-line)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
              >
                קצת עליי
              </Link>
            </div>
          </div>

          <div className="order-1 md:order-2 relative">
            {/* offset accent block for editorial depth */}
            <div className="absolute -bottom-4 -left-4 w-full h-full rounded-md bg-[var(--color-accent)]/10 hidden md:block" />
            <div className="relative aspect-[4/5] rounded-md overflow-hidden bg-[var(--color-surface)] shadow-[0_20px_60px_-25px_rgba(31,61,52,0.45)]">
              <img
                src="/images/profile-main.jpg"
                alt='ד"ר שלומית גיא'
                className="w-full h-full object-cover object-[center_25%]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Two main activities */}
      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Publishing house */}
          <Link
            href="/books"
            className="group relative rounded-md overflow-hidden min-h-72 flex flex-col justify-end text-[var(--color-card)]"
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
              style={{ backgroundImage: "url('/images/book_hootza_mehekshero.jpg')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-accent)] via-[var(--color-accent)]/70 to-[var(--color-accent)]/10" />
            <div className="relative p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70 mb-2">הוצאת ספרים</p>
              <h2 className="text-2xl font-extrabold mb-2">רסיס נהרה</h2>
              <p className="text-white/80 text-sm leading-relaxed mb-4 max-w-sm">
                הוצאת בוטיק המתמחה בספרי ספורט וילדים. שמונה ספרים פורצי דרך בין השנים 2024–2026.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all">
                לכל הספרים <span aria-hidden>←</span>
              </span>
            </div>
          </Link>

          {/* Lectures – violence prevention */}
          <Link
            href="/lectures"
            className="group relative rounded-md overflow-hidden min-h-72 flex flex-col justify-end bg-[var(--color-card)] border border-[var(--color-line)] hover:border-[var(--color-accent)] transition-colors"
          >
            <div className="relative p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-2">הרצאות</p>
              <h2 className="text-2xl font-extrabold mb-2 text-[var(--color-ink)]">מניעת אלימות בספורט</h2>
              <p className="text-[var(--color-muted)] text-sm leading-relaxed mb-4 max-w-sm">
                הרצאות מבוססות מחקר למאמנים, הורים וארגוני ספורט. כלים מעשיים לשינוי תרבות האימון.
              </p>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-accent)] group-hover:gap-2 transition-all">
                לפרטים ולהזמנה <span aria-hidden>←</span>
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* About teaser */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-line)]">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-20 grid md:grid-cols-[1.3fr_1fr] gap-12 items-center">
          <div>
            <SectionHeading title="מי אני?" kicker="אודות" />
            <p className="text-lg text-[var(--color-ink)]/85 leading-relaxed mb-4 max-w-xl">
              ד&quot;ר שלומית גיא היא חוקרת, סופרת ומרצה בתחום ספורט וחברה, בעלת תואר דוקטור מהמחלקה לאנתרופולוגיה וסוציולוגיה באוניברסיטת בן גוריון. מחקריה עוסקים בקהילות אוהדים, אלימות בספורט הישגי, וכוחו של הספורט כמנוע חברתי וחינוכי.
            </p>
            <p className="text-base text-[var(--color-muted)] leading-relaxed mb-7 max-w-xl">
              בשנת 2024 רכשה את הוצאת רסיס נהרה וכיום מנהלת הוצאת בוטיק המתמחה בספרי ספורט וילדים, לצד המשך פעילות המחקר וההרצאות.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-1 font-semibold text-[var(--color-accent)] hover:gap-2 transition-all"
            >
              קראו עוד <span aria-hidden>←</span>
            </Link>
          </div>
          <dl className="grid grid-cols-2 gap-x-8 gap-y-8">
            {stats.map((s) => (
              <div key={s.label} className="border-t border-[var(--color-line)] pt-3">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-4xl font-extrabold text-[var(--color-accent)]">{s.num}</dd>
                <p className="text-sm text-[var(--color-muted)] mt-1">{s.label}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Lectures teaser — numbered editorial list */}
      <section className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <SectionHeading
          title="הרצאות וסמינרים"
          kicker="לארגונים ולמערכת החינוך"
          subtitle="הרצאות מרתקות למנהלים, מאמנים, ארגוני ספורט ומערכת החינוך — על ניצול הפוטנציאל של הספורט לשינוי חברתי."
        />
        <div className="border-t border-[var(--color-line)]">
          {lectureTopics.map((t) => (
            <div
              key={t.n}
              className="group flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 border-b border-[var(--color-line)] py-6"
            >
              <span className="text-sm font-semibold text-[var(--color-accent)] tabular-nums md:w-12">{t.n}</span>
              <h3 className="text-2xl font-bold text-[var(--color-ink)] md:w-72 shrink-0 group-hover:text-[var(--color-accent)] transition-colors">
                {t.title}
              </h3>
              <p className="text-[var(--color-muted)] leading-relaxed">{t.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Link
            href="/lectures"
            className="inline-block bg-[var(--color-accent)] text-[var(--color-card)] px-7 py-3 rounded-sm font-semibold hover:bg-[var(--color-accent-hover)] transition-colors active:scale-[0.98]"
          >
            לפרטים ולהזמנה
          </Link>
        </div>
      </section>

      {/* Recent blog posts */}
      {recentPosts.length > 0 && (
        <section className="bg-[var(--color-surface)] border-y border-[var(--color-line)]">
          <div className="max-w-6xl mx-auto px-4 py-16 md:py-20">
            <SectionHeading title="מהבלוג" kicker="מאמרים" subtitle="מחשבות, מחקר ועדכונים." />
            <div className="grid md:grid-cols-3 gap-x-8 gap-y-12">
              {recentPosts.map((post) => (
                <BlogCard key={post.slug} {...post} />
              ))}
            </div>
            <div className="mt-12">
              <Link
                href="/blog"
                className="inline-block px-7 py-3 rounded-sm font-semibold text-[var(--color-ink)] border border-[var(--color-line)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
              >
                כל הפוסטים
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Press strip */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <p className="text-xs uppercase tracking-[0.25em] text-[var(--color-muted)] mb-6 text-center">כפי שהופיע ב</p>
        <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 text-[var(--color-ink)]/55 font-semibold text-lg">
          {["הארץ", "גלובס", "ynet", "ערוץ הספורט", "רשת", "NRG", "לאישה"].map((m) => (
            <span key={m} className="hover:text-[var(--color-accent)] transition-colors">{m}</span>
          ))}
        </div>
      </section>
    </>
  );
}
