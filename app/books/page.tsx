import type { Metadata } from "next";
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
      <div className="mb-12 rounded-2xl overflow-hidden relative bg-[var(--color-navy)] text-white">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/book_hootza_mehekshero.jpg')" }}
        />
        <div className="relative p-10 md:p-14 text-right">
          <p className="text-sm font-semibold uppercase tracking-widest text-white/60 mb-2">הוצאת בוטיק</p>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">רסיס נהרה</h1>
          <p className="text-white/80 max-w-xl leading-relaxed mb-4">
            הוצאת בוטיק המתמחה בספרי ספורט וילדים. מאז 2024 הוצאנו לאור ספרים פורצי דרך ומיוחדים – מחקר, עיון וספרות ילדים.
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-[var(--color-navy)] px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[var(--color-surface)] transition-colors"
          >
            צרו קשר להוצאה לאור
          </a>
        </div>
      </div>

      <SectionHeading title="הספרים שלנו" subtitle="פרסומים מחקריים, ספרי עיון וספרי ילדים" />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.title}
            className="bg-white rounded-2xl shadow-sm border border-[var(--color-surface)] overflow-hidden flex flex-col"
          >
            <div className="h-52 bg-[var(--color-surface)] overflow-hidden">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="bg-[var(--color-surface)] text-[var(--color-navy)] text-xs font-semibold px-3 py-0.5 rounded-full">
                  {book.tag}
                </span>
                <span className="text-xs text-[var(--color-muted)]">{book.year}</span>
              </div>
              <h3 className="font-bold text-[var(--color-navy)] text-base mb-2 leading-snug">{book.title}</h3>
              <p className="text-sm text-[var(--color-fg)] leading-relaxed flex-1">{book.desc}</p>
              {book.free && book.freeUrl && (
                <a
                  href={book.freeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-block bg-[var(--color-navy)] text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-[var(--color-navy-light)] transition-colors"
                >
                  קראו בחינם
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-[var(--color-surface)] rounded-2xl p-8 text-center">
        <p className="text-[var(--color-navy)] font-bold text-lg mb-2">יש לכם ספר לפרסם?</p>
        <p className="text-sm text-[var(--color-muted)] mb-5">
          אם אתם בשלבי כתיבה או שכבר יש ספר מוכן – צרו קשר. אנחנו נועד לכם לטובת הוצאתו לאור.
        </p>
        <a
          href="/contact"
          className="inline-block border border-[var(--color-navy)] text-[var(--color-navy)] px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-[var(--color-navy)] hover:text-white transition-colors"
        >
          צרו קשר
        </a>
      </div>
    </div>
  );
}
