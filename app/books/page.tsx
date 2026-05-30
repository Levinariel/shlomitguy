import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { getBooks } from "@/lib/data";

export const metadata: Metadata = {
  title: 'הוצאת רסיס נהרה | ד"ר שלומית גיא',
  description: 'ספריה של הוצאת רסיס נהרה מבית שלומית גיא – ספרי ספורט, מחקר וספרי ילדים.',
  alternates: { canonical: "https://rasisnahara.netlify.app/books" },
};

const bookSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "כולם ידעו ואף אחד לא עשה דבר",
    author: { "@type": "Person", name: "ד\"ר שלומית גיא", url: "https://rasisnahara.netlify.app/about" },
    publisher: { "@type": "Organization", name: "הוצאת רסיס נהרה", url: "https://rasisnahara.netlify.app" },
    datePublished: "2026",
    inLanguage: "he",
    image: "https://rasisnahara.netlify.app/images/book-koolam-yadoo.jpg",
    description: "הספר מתעד 13 ראיונות עם ספורטאים ומציג את הספורטאי ההישגי, קורבן הזניחה והמאמנים המנצלים. מבוסס על מחקר עומק של 5 שנים (2020–2025) ו-27 ראיונות.",
    genre: ["מחקר", "ספורט", "חברה"],
    url: "https://rasisnahara.netlify.app/books",
  },
  {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "אימפריה",
    alternateName: "Empire",
    author: { "@type": "Person", name: "ד\"ר שלומית גיא", url: "https://rasisnahara.netlify.app/about" },
    publisher: { "@type": "Organization", name: "הוצאת רסיס נהרה", url: "https://rasisnahara.netlify.app" },
    datePublished: "2010",
    inLanguage: "he",
    image: "https://rasisnahara.netlify.app/images/book-imperia.jpg",
    description: "תיעוד שנת מחקר שטח בלונדון בין קהילות אוהדי כדורגל. הספר עוסק בזהות, שייכות ופנאטיות ספורטיבית. זכה בתואר ספר הספורט של השנה מטעם גלובס.",
    genre: ["ספר מחקר", "אנתרופולוגיה", "ספורט"],
    url: "https://rasisnahara.netlify.app/books",
  },
  {
    "@context": "https://schema.org",
    "@type": "Book",
    name: "לא טריוויאלי – 207 שאלות על ספורט וחברה",
    author: { "@type": "Person", name: "ד\"ר שלומית גיא", url: "https://rasisnahara.netlify.app/about" },
    publisher: { "@type": "Organization", name: "הוצאת רסיס נהרה", url: "https://rasisnahara.netlify.app" },
    datePublished: "2022",
    inLanguage: "he",
    image: "https://rasisnahara.netlify.app/images/book-lo-trivialit.jpg",
    description: "משחק טריוויה ייחודי על ספורט וחברה – 207 שאלות מרתקות שחוצות את גבולות ספורט ונוגעות בחיים עצמם.",
    genre: ["ספרי ספורט ומשחקים"],
    url: "https://rasisnahara.netlify.app/books",
  },
];

export default function BooksPage() {
  const books = getBooks();

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(bookSchemas) }}
      />
      {/* Publishing house hero */}
      <div className="mb-14 rounded-md overflow-hidden relative bg-[var(--color-accent)] text-[var(--color-card)]">
        <div
          className="absolute inset-0 opacity-15 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/book_hootza_mehekshero.jpg')" }}
        />
        <div className="relative p-10 md:p-14 text-right">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60 mb-2">הוצאת בוטיק</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3">רסיס נהרה</h1>
          <p className="text-white/80 max-w-xl leading-relaxed mb-6">
            הוצאת בוטיק המתמחה בספרי ספורט וילדים. מאז 2024 הוצאנו לאור ספרים פורצי דרך ומיוחדים – מחקר, עיון וספרות ילדים.
          </p>
          <a
            href="/contact"
            className="inline-block bg-[var(--color-card)] text-[var(--color-accent)] px-7 py-3 rounded-sm font-semibold text-sm hover:bg-white transition-colors active:scale-[0.98]"
          >
            צרו קשר להוצאה לאור
          </a>
        </div>
      </div>

      <SectionHeading title="הספרים שלנו" subtitle="פרסומים מחקריים, ספרי עיון וספרי ילדים" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {books.map((book) => {
          const cover = (
            <div className="aspect-[3/4] rounded-md bg-[var(--color-surface)] overflow-hidden mb-4">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            </div>
          );
          return (
            <div key={book.title} className="group flex flex-col">
              {book.page ? <Link href={book.page}>{cover}</Link> : cover}
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="bg-[var(--color-accent-soft)] text-[var(--color-accent)] text-xs font-semibold px-2.5 py-0.5 rounded-sm">
                  {book.tag}
                </span>
                <span className="text-xs text-[var(--color-muted)]">{book.year}</span>
              </div>
              <h3 className="font-bold text-[var(--color-ink)] text-lg mb-2 leading-snug">
                {book.page ? (
                  <Link href={book.page} className="hover:text-[var(--color-accent)] transition-colors">
                    {book.title}
                  </Link>
                ) : (
                  book.title
                )}
              </h3>
              <p className="text-sm text-[var(--color-muted)] leading-relaxed flex-1">{book.desc}</p>
              {book.page ? (
                <Link
                  href={book.page}
                  className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-semibold text-[var(--color-accent)] hover:gap-2 transition-all"
                >
                  לעמוד הספר ולקריאה חופשית <span aria-hidden>←</span>
                </Link>
              ) : (
                book.free &&
                book.freeUrl && (
                  <a
                    href={book.freeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex w-fit items-center bg-[var(--color-accent)] text-[var(--color-card)] px-5 py-2 rounded-sm text-sm font-semibold hover:bg-[var(--color-accent-hover)] transition-colors active:scale-[0.98]"
                  >
                    קראו בחינם
                  </a>
                )
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-16 bg-[var(--color-surface)] rounded-md p-8 text-center border border-[var(--color-line)]">
        <p className="text-[var(--color-ink)] font-bold text-lg mb-2">יש לכם ספר לפרסם?</p>
        <p className="text-sm text-[var(--color-muted)] mb-5">
          אם אתם בשלבי כתיבה או שכבר יש ספר מוכן – צרו קשר. אנחנו נועד לכם לטובת הוצאתו לאור.
        </p>
        <a
          href="/contact"
          className="inline-block border border-[var(--color-accent)] text-[var(--color-accent)] px-7 py-3 rounded-sm font-semibold text-sm hover:bg-[var(--color-accent)] hover:text-[var(--color-card)] transition-colors"
        >
          צרו קשר
        </a>
      </div>
    </div>
  );
}
