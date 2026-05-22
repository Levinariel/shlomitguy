import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-navy)] text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-start justify-between gap-8 text-sm">
        {/* Brand */}
        <div className="text-right">
          <p className="font-bold text-base mb-1">ד&quot;ר שלומית גיא</p>
          <p className="text-white/70">הרצאות וסמינרים | מחקר ספורט וחברה</p>
          <p className="text-white/70">הוצאת רסיס נהרה</p>
        </div>

        {/* Nav */}
        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-white/80">
          <Link href="/about" className="hover:text-white transition-colors">אודות</Link>
          <Link href="/lectures" className="hover:text-white transition-colors">הרצאות</Link>
          <Link href="/books" className="hover:text-white transition-colors">ספרים</Link>
          <Link href="/press" className="hover:text-white transition-colors">עיתונות</Link>
          <Link href="/blog" className="hover:text-white transition-colors">בלוג</Link>
          <Link href="/contact" className="hover:text-white transition-colors">צרו קשר</Link>
        </nav>

        {/* Social */}
        <div className="text-right text-white/70 space-y-1.5">
          <p className="font-semibold text-white/90 mb-2">עקבו אחרינו</p>
          <a
            href="https://www.youtube.com/channel/UCKZ1VPhJ0Kn-ar9j6W6yoxg"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors block"
          >
            יוטיוב
          </a>
          <a
            href="https://www.linkedin.com/in/shlomit-guy-54707873/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors block"
          >
            לינקדאין
          </a>
          <a
            href="https://www.facebook.com/dr.shlomitguy"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors block"
          >
            פייסבוק
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 text-center text-xs text-white/40 py-3">
        © {new Date().getFullYear()} ד&quot;ר שלומית גיא. כל הזכויות שמורות.
      </div>
    </footer>
  );
}
