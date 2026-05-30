"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navLinks = [
  { href: "/", label: "דף הבית" },
  { href: "/about", label: "אודות" },
  { href: "/lectures", label: "הרצאות" },
  { href: "/books", label: "ספרים" },
  { href: "/press", label: "עיתונות" },
  { href: "/blog", label: "בלוג" },
  { href: "/contact", label: "צרו קשר" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-line)] bg-[var(--color-paper)]/85 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link
          href="/"
          className="font-serif text-xl font-bold text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors"
        >
          ד&quot;ר שלומית גיא
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 text-sm">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`relative py-1 transition-colors ${
                isActive(l.href)
                  ? "text-[var(--color-accent)] font-semibold"
                  : "text-[var(--color-ink)]/70 hover:text-[var(--color-accent)]"
              }`}
            >
              {l.label}
              {isActive(l.href) && (
                <span className="absolute -bottom-0.5 right-0 left-0 h-px bg-[var(--color-accent)]" />
              )}
            </Link>
          ))}
          <Link
            href="/lectures"
            className="bg-[var(--color-accent)] text-[var(--color-card)] px-5 py-2 rounded-sm font-semibold hover:bg-[var(--color-accent-hover)] transition-colors"
          >
            הזמנת הרצאה
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded"
          onClick={() => setOpen(!open)}
          aria-label="תפריט"
          aria-expanded={open}
        >
          <span className="block w-5 h-0.5 bg-[var(--color-ink)] mb-1" />
          <span className="block w-5 h-0.5 bg-[var(--color-ink)] mb-1" />
          <span className="block w-5 h-0.5 bg-[var(--color-ink)]" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[var(--color-line)] bg-[var(--color-paper)] px-4 pb-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={isActive(l.href) ? "page" : undefined}
              className={`block py-2.5 text-sm border-b border-[var(--color-line)] transition-colors ${
                isActive(l.href)
                  ? "text-[var(--color-accent)] font-semibold"
                  : "text-[var(--color-ink)]/80 hover:text-[var(--color-accent)]"
              }`}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/lectures"
            className="mt-3 block text-center bg-[var(--color-accent)] text-[var(--color-card)] px-4 py-2.5 rounded-sm font-semibold text-sm"
            onClick={() => setOpen(false)}
          >
            הזמנת הרצאה
          </Link>
        </div>
      )}
    </header>
  );
}
