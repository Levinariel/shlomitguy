import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { getPressItems } from "@/lib/data";

export const metadata: Metadata = {
  title: 'עיתונות | ד"ר שלומית גיא',
  description: 'כיסוי תקשורתי של ד"ר שלומית גיא בהארץ, גלובס, ynet, ערוץ הספורט, רשת ועוד.',
};

const typeColors: Record<string, string> = {
  "כתבה": "bg-blue-100 text-blue-800",
  "ראיון": "bg-green-100 text-green-800",
  "ריאיון טלוויזיה": "bg-purple-100 text-purple-800",
  "ריאיון רדיו": "bg-orange-100 text-orange-800",
};

export default function PressPage() {
  const pressItems = getPressItems();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <SectionHeading title="עיתונות ותקשורת" subtitle="כיסוי תקשורתי בכלי מדיה מובילים" />

      <p className="text-[var(--color-muted)] mb-10 text-sm">
        ד&quot;ר שלומית גיא ועבודותיה קיבלו כיסוי רחב בכלי תקשורת מובילים בישראל ובעולם.
      </p>

      <div className="space-y-4">
        {pressItems.map((item, i) => (
          <div
            key={i}
            className="bg-white border border-[var(--color-surface)] rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            {item.image && (
              <div className="h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-5 flex gap-4 items-start">
              <div className="flex-shrink-0 w-20 text-center">
                <span className="font-bold text-[var(--color-navy)] text-sm block">{item.outlet}</span>
              </div>
              <div className="w-px bg-[var(--color-surface)] self-stretch flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[var(--color-fg)] hover:text-[var(--color-navy)] hover:underline"
                    >
                      {item.title}
                    </a>
                  ) : (
                    <h3 className="font-semibold text-[var(--color-fg)]">{item.title}</h3>
                  )}
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      typeColors[item.type] ?? "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {item.type}
                  </span>
                </div>
                <p className="text-sm text-[var(--color-muted)]">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
