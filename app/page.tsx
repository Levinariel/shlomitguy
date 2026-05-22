import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import BlogCard from "@/components/BlogCard";
import { getRecentPosts } from "@/lib/posts";

export default async function Home() {
  const recentPosts = await getRecentPosts(3);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-[var(--color-navy)] text-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-10 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/profile-alt.jpg')" }}
        />
        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1 text-center md:text-right">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              ד&quot;ר שלומית גיא
            </h1>
            <p className="text-xl md:text-2xl text-white/80 mb-2">
              חוקרת, סופרת ומרצה בתחום ספורט וחברה
            </p>
            <p className="text-white/60 mb-8 max-w-lg">
              הרצאות וסמינרים למנהלים, מאמנים וארגונים | מניעת אלימות בספורט הישגי | הוצאת רסיס נהרה – ספרי ספורט וילדים
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link
                href="/lectures"
                className="bg-white text-[var(--color-navy)] px-7 py-3 rounded-full font-bold hover:bg-[var(--color-surface)] transition-colors text-sm"
              >
                הזמנת הרצאה
              </Link>
              <Link
                href="/about"
                className="border border-white/50 text-white px-7 py-3 rounded-full font-semibold hover:bg-white/10 transition-colors text-sm"
              >
                אודות
              </Link>
            </div>
          </div>
          <div className="w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/30 shadow-xl flex-shrink-0">
            <img
              src="/images/profile-main-jpg.JPG"
              alt='ד"ר שלומית גיא'
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured boxes – two main activities */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Publishing house */}
          <Link
            href="/books"
            className="group relative rounded-2xl overflow-hidden bg-[var(--color-navy)] text-white min-h-64 flex flex-col justify-end hover:shadow-xl transition-shadow"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-40 transition-opacity"
              style={{ backgroundImage: "url('/images/book_hootza_mehekshero.jpg')" }}
            />
            <div className="relative p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-1">הוצאת ספרים</p>
              <h2 className="text-2xl font-bold mb-2">רסיס נהרה</h2>
              <p className="text-white/75 text-sm leading-relaxed mb-4">
                הוצאת בוטיק המתמחה בספרי ספורט וילדים. 8 ספרים פורצי דרך בין השנים 2024–2026.
              </p>
              <span className="inline-block bg-white text-[var(--color-navy)] px-5 py-2 rounded-full text-sm font-bold group-hover:bg-[var(--color-surface)] transition-colors">
                לכל הספרים ←
              </span>
            </div>
          </Link>

          {/* Lectures – violence prevention */}
          <Link
            href="/lectures"
            className="group relative rounded-2xl overflow-hidden bg-[#2A1A3E] text-white min-h-64 flex flex-col justify-end hover:shadow-xl transition-shadow"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#2A1A3E] via-[#2A1A3E]/80 to-transparent" />
            <div className="relative p-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-1">הרצאות</p>
              <h2 className="text-2xl font-bold mb-2">מניעת אלימות בספורט</h2>
              <p className="text-white/75 text-sm leading-relaxed mb-4">
                הרצאות מבוססות מחקר למאמנים, הורים וארגוני ספורט. כלים מעשיים לשינוי תרבות האימון.
              </p>
              <span className="inline-block bg-white text-[#2A1A3E] px-5 py-2 rounded-full text-sm font-bold group-hover:bg-[var(--color-surface)] transition-colors">
                לפרטים ולהזמנה ←
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* About teaser */}
      <section className="max-w-6xl mx-auto px-4 pb-16">
        <div className="bg-[var(--color-surface)] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <SectionHeading title="מי אני?" />
            <p className="text-[var(--color-fg)] leading-relaxed mb-4">
              ד&quot;ר שלומית גיא היא חוקרת, סופרת ומרצה בתחום ספורט וחברה, בעלת תואר דוקטור מהמחלקה לאנתרופולוגיה וסוציולוגיה באוניברסיטת בן גוריון. מחקריה עוסקים בקהילות אוהדים, אלימות בספורט הישגי, וכוחו של הספורט כמנוע חברתי וחינוכי.
            </p>
            <p className="text-[var(--color-fg)] leading-relaxed mb-6">
              בשנת 2024 רכשה את הוצאת רסיס נהרה וכיום מנהלת הוצאת בוטיק המתמחה בספרי ספורט וילדים, לצד המשך פעילות המחקר וההרצאות.
            </p>
            <Link
              href="/about"
              className="inline-block bg-[var(--color-navy)] text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[var(--color-navy-light)] transition-colors"
            >
              קראו עוד
            </Link>
          </div>
          <div className="hidden md:block w-px h-32 bg-[var(--color-navy)]/20" />
          <div className="flex-1 grid grid-cols-2 gap-4 text-center">
            {[
              { num: "20+", label: "שנות מחקר" },
              { num: "8+", label: "ספרים שפורסמו" },
              { num: "100+", label: "הרצאות" },
              { num: "PhD", label: "מחקר אנתרופולוגי" },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm">
                <p className="text-3xl font-bold text-[var(--color-navy)]">{s.num}</p>
                <p className="text-xs text-[var(--color-muted)] mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lectures teaser */}
      <section className="bg-[var(--color-navy)] text-white py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">הרצאות וסמינרים</h2>
          <p className="text-white/70 mb-8 max-w-2xl mx-auto">
            הרצאות מרתקות למנהלים, מאמנים, ארגוני ספורט ומערכת החינוך – על ניצול הפוטנציאל של הספורט לשינוי חברתי
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { title: "מניעת אלימות בספורט", desc: "כלים מעשיים להפחתת אלימות בקרב ילדים ומבוגרים בהכשרות ספורטיביות" },
              { title: "ספורט וחינוך", desc: "כיצד הספורט יכול לשמש כלי חינוכי יעיל ולפתח מיומנויות חיים" },
              { title: "מנהיגות בספורט", desc: "פיתוח מנהיגות, ניהול קבוצות ובניית תרבות ארגונית בריאה" },
            ].map((item) => (
              <div key={item.title} className="bg-white/10 rounded-xl p-6 text-right">
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <Link
            href="/lectures"
            className="bg-white text-[var(--color-navy)] px-8 py-3 rounded-full font-bold hover:bg-[var(--color-surface)] transition-colors text-sm"
          >
            לפרטים ולהזמנה
          </Link>
        </div>
      </section>

      {/* Recent blog posts */}
      {recentPosts.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 py-16">
          <SectionHeading title="מהבלוג" subtitle="מאמרים, מחשבות ועדכונים" />
          <div className="grid md:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <BlogCard key={post.slug} {...post} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/blog"
              className="inline-block border border-[var(--color-navy)] text-[var(--color-navy)] px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[var(--color-navy)] hover:text-white transition-colors"
            >
              כל הפוסטים
            </Link>
          </div>
        </section>
      )}

      {/* Press strip */}
      <section className="bg-[var(--color-surface)] py-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-xs uppercase tracking-widest text-[var(--color-muted)] mb-6">כפי שהופיע ב</p>
          <div className="flex flex-wrap justify-center gap-6 text-[var(--color-navy)] font-bold text-lg opacity-60">
            {["הארץ", "גלובס", "ynet", "ערוץ הספורט", "רשת", "NRG", "לאישה"].map((m) => (
              <span key={m} className="px-3">{m}</span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
