import Link from "next/link";

interface Props {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  featuredImage?: string;
}

export default function BlogCard({ slug, title, date, excerpt, featuredImage }: Props) {
  return (
    <article className="bg-white rounded-xl shadow-sm border border-[var(--color-surface)] overflow-hidden hover:shadow-md transition-shadow group">
      {featuredImage && (
        <div className="overflow-hidden h-44">
          <img
            src={featuredImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      <div className="p-5">
        <time className="text-xs text-[var(--color-muted)] mb-2 block">{date}</time>
        <h3 className="font-bold text-[var(--color-navy)] text-lg mb-2 leading-snug">
          <Link href={`/blog/${slug}`} className="hover:underline">
            {title}
          </Link>
        </h3>
        <p className="text-sm text-[var(--color-fg)] opacity-75 leading-relaxed line-clamp-3">{excerpt}</p>
        <Link
          href={`/blog/${slug}`}
          className="mt-4 inline-block text-sm font-semibold text-[var(--color-navy)] hover:underline"
        >
          המשך קריאה &larr;
        </Link>
      </div>
    </article>
  );
}
