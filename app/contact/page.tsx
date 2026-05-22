"use client";

import { useState } from "react";
import SectionHeading from "@/components/SectionHeading";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
    });

    setLoading(false);
    setSubmitted(true);
    form.reset();
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <SectionHeading title="צרו קשר" subtitle="אשמח לשמוע מכם" />

      <p className="text-[var(--color-muted)] mb-8 text-sm leading-relaxed">
        להזמנת הרצאה, שאלות על הוצאת רסיס נהרה, שיתופי פעולה או כל דבר אחר – מלאו את הטופס ואחזור אליכם בהקדם.
      </p>

      {submitted ? (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
          <p className="text-2xl mb-2">✓</p>
          <p className="font-bold text-green-800 text-lg mb-1">ההודעה נשלחה בהצלחה!</p>
          <p className="text-green-700 text-sm">אחזור אליכם בהקדם האפשרי.</p>
        </div>
      ) : (
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          {/* Hidden field required for Netlify Forms */}
          <input type="hidden" name="form-name" value="contact" />

          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-[var(--color-fg)] mb-1.5">
              שם מלא <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="ישראל ישראלי"
              className="w-full border border-[var(--color-surface)] rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-navy)] text-right"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-[var(--color-fg)] mb-1.5">
              כתובת מייל <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="name@example.com"
              className="w-full border border-[var(--color-surface)] rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-navy)] text-right"
              dir="ltr"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-semibold text-[var(--color-fg)] mb-1.5">
              נושא
            </label>
            <select
              id="subject"
              name="subject"
              className="w-full border border-[var(--color-surface)] rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-navy)] text-right"
            >
              <option value="">בחרו נושא</option>
              <option value="הזמנת הרצאה">הזמנת הרצאה</option>
              <option value="הוצאה לאור">הוצאה לאור – רסיס נהרה</option>
              <option value="שאלה כללית">שאלה כללית</option>
              <option value="אחר">אחר</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-[var(--color-fg)] mb-1.5">
              הודעה <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              placeholder="כתבו את הודעתכם כאן..."
              className="w-full border border-[var(--color-surface)] rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[var(--color-navy)] text-right resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-navy)] text-white py-3 rounded-full font-bold text-sm hover:bg-[var(--color-navy-light)] transition-colors disabled:opacity-60"
          >
            {loading ? "שולח..." : "שלחו הודעה"}
          </button>
        </form>
      )}

      <div className="mt-10 pt-8 border-t border-[var(--color-surface)] flex flex-wrap gap-6 justify-center text-sm text-[var(--color-muted)]">
        <a
          href="https://www.youtube.com/channel/UCKZ1VPhJ0Kn-ar9j6W6yoxg"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--color-navy)] transition-colors"
        >
          יוטיוב
        </a>
        <a
          href="https://www.linkedin.com/in/shlomit-guy-54707873/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--color-navy)] transition-colors"
        >
          לינקדאין
        </a>
        <a
          href="https://www.facebook.com/dr.shlomitguy"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--color-navy)] transition-colors"
        >
          פייסבוק
        </a>
      </div>
    </div>
  );
}
