import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { getPressItems } from "@/lib/data";

export const metadata: Metadata = {
  title: 'עיתונות | ד"ר שלומית גיא',
  description: 'כיסוי תקשורתי של ד"ר שלומית גיא בהארץ, גלובס, ynet, ערוץ הספורט, רשת ועוד.',
  alternates: { canonical: "https://rasisnahara.netlify.app/press" },
};

const badgeClass = "bg-[var(--color-accent-soft)] text-[var(--color-accent)]";

function youtubeId(url: string): string {
  const m = url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
  return m ? m[1] : "";
}

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
            className="bg-[var(--color-card)] border border-[var(--color-line)] rounded-md overflow-hidden hover:border-[var(--color-accent)] transition-colors"
          >
            {item.video && (
              <div className="aspect-video bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId(item.video)}`}
                  title={item.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            )}
            {item.image && !item.video && (
              <div className="bg-[var(--color-surface)] flex justify-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="max-h-[30rem] w-auto max-w-full object-contain"
                />
              </div>
            )}
            <div className="p-5 flex gap-4 items-start">
              <div className="flex-shrink-0 w-20 text-center">
                <span className="font-bold text-[var(--color-accent)] text-sm block">{item.outlet}</span>
              </div>
              <div className="w-px bg-[var(--color-line)] self-stretch flex-shrink-0" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  {item.url ? (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[var(--color-ink)] hover:text-[var(--color-accent)] hover:underline"
                    >
                      {item.title}
                    </a>
                  ) : (
                    <h3 className="font-semibold text-[var(--color-ink)]">{item.title}</h3>
                  )}
                  <span className={`text-xs px-2 py-0.5 rounded-sm font-medium ${badgeClass}`}>
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
