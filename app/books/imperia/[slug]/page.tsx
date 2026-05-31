import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { getAllChapterSlugs, getChapter, getChapterNeighbors } from "@/lib/imperia";
import { mdxComponents } from "@/components/mdx";

const BASE = "https://rasisnahara.netlify.app";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllChapterSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const ch = getChapter(slug);
  if (!ch) return {};
  return {
    title: `${ch.title} | אימפריה | ד"ר שלומית גיא`,
    description: `${ch.title} – מתוך הספר "אימפריה" מאת ד"ר שלומית גיא, לקריאה חופשית.`,
    alternates: { canonical: `https://rasisnahara.netlify.app/books/imperia/${slug}` },
  };
}

export default async function ChapterPage({ params }: Props) {
  const { slug } = await params;
  const ch = getChapter(slug);
  if (!ch) notFound();

  const { prev, next } = getChapterNeighbors(slug);
  const kicker =
    ch.chapter != null ? `פרק ${ch.chapter}` : ch.group === "front" ? "פתח דבר" : "נספח";

  const chapterSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: ch.title,
    url: `${BASE}/books/imperia/${slug}`,
    inLanguage: "he",
    author: { "@type": "Person", name: 'ד"ר שלומית גיא', url: `${BASE}/about` },
    isPartOf: {
      "@type": "Book",
      name: "אימפריה",
      author: { "@type": "Person", name: 'ד"ר שלומית גיא' },
      url: `${BASE}/books/imperia`,
      inLanguage: "he",
    },
  };
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ספרים", item: `${BASE}/books` },
      { "@type": "ListItem", position: 2, name: "אימפריה", item: `${BASE}/books/imperia` },
      { "@type": "ListItem", position: 3, name: ch.title, item: `${BASE}/books/imperia/${slug}` },
    ],
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([chapterSchema, breadcrumb]) }}
      />
      <Link
        href="/books/imperia"
        className="text-sm text-[var(--color-accent)] hover:underline mb-8 block"
      >
        &larr; חזרה לאימפריה
      </Link>

      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)] mb-2">
        אימפריה · {kicker}
      </p>
      <h1 className="text-3xl md:text-4xl font-extrabold text-[var(--color-ink)] mb-8 leading-tight">
        {ch.title}
      </h1>

      <div className="prose">
        <MDXRemote source={ch.content} components={mdxComponents} />
      </div>

      <nav className="mt-12 pt-8 border-t border-[var(--color-line)] flex justify-between gap-4 text-sm">
        {prev ? (
          <Link href={`/books/imperia/${prev.slug}`} className="text-[var(--color-accent)] hover:underline">
            &rarr; {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/books/imperia/${next.slug}`} className="text-[var(--color-accent)] hover:underline text-left">
            {next.title} &larr;
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
