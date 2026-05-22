"use client";

import Link from "next/link";
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

  return (
    <header className="bg-[var(--color-navy)] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="text-lg font-bold tracking-wide hover:opacity-80 transition-opacity">
          ד&quot;ר שלומית גיא
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="hover:text-[var(--color-surface)] transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/lectures"
            className="bg-white text-[var(--color-navy)] px-4 py-1.5 rounded-full font-semibold hover:bg-[var(--color-surface)] transition-colors"
          >
            הזמנת הרצאה
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded"
          onClick={() => setOpen(!open)}
          aria-label="תפריט"
        >
          <span className="block w-5 h-0.5 bg-white mb-1" />
          <span className="block w-5 h-0.5 bg-white mb-1" />
          <span className="block w-5 h-0.5 bg-white" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-[var(--color-navy-light)] px-4 pb-4">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-2 text-sm border-b border-white/20 hover:text-[var(--color-surface)] transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/lectures"
            className="mt-3 block text-center bg-white text-[var(--color-navy)] px-4 py-2 rounded-full font-semibold text-sm"
            onClick={() => setOpen(false)}
          >
            הזמנת הרצאה
          </Link>
        </div>
      )}
    </header>
  );
}
