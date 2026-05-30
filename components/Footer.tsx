import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--color-accent)] text-[var(--color-card)] mt-20">
      <div className="max-w-6xl mx-auto px-4 py-14 flex flex-col md:flex-row items-start justify-between gap-10 text-sm">
        {/* Brand */}
        <div className="text-right max-w-xs">
          <p className="font-serif font-bold text-xl mb-2">ד&quot;ר שלומית גיא</p>
          <p className="text-white/70 leading-relaxed">הרצאות וסמינרים | מחקר ספורט וחברה</p>
          <p className="text-white/70">הוצאת רסיס נהרה</p>
        </div>

        {/* Nav */}
        <nav className="flex flex-col gap-2.5 text-white/80">
          <Link href="/about" className="hover:text-white transition-colors w-fit">אודות</Link>
          <Link href="/lectures" className="hover:text-white transition-colors w-fit">הרצאות</Link>
          <Link href="/books" className="hover:text-white transition-colors w-fit">ספרים</Link>
          <Link href="/press" className="hover:text-white transition-colors w-fit">עיתונות</Link>
          <Link href="/blog" className="hover:text-white transition-colors w-fit">בלוג</Link>
          <Link href="/contact" className="hover:text-white transition-colors w-fit">צרו קשר</Link>
        </nav>

        {/* Social */}
        <div className="text-right text-white/70 space-y-2.5">
          <p className="font-semibold text-white/90 mb-1">עקבו אחרינו</p>
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

      <div className="border-t border-white/15 text-center text-xs text-white/50 py-4">
        © {new Date().getFullYear()} ד&quot;ר שלומית גיא. כל הזכויות שמורות.
      </div>
    </footer>
  );
}
