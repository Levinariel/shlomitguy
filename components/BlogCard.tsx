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
    <article className="group flex flex-col">
      <Link href={`/blog/${slug}`} className="block">
        {featuredImage && (
          <div className="overflow-hidden rounded-md mb-4 aspect-[3/2] bg-[var(--color-surface)]">
            <img
              src={featuredImage}
              alt={title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          </div>
        )}
        <time className="text-xs font-medium uppercase tracking-wider text-[var(--color-muted)]">
          {date}
        </time>
        <h3 className="font-serif text-xl font-bold text-[var(--color-ink)] mt-1.5 mb-2 leading-snug group-hover:text-[var(--color-accent)] transition-colors">
          {title}
        </h3>
      </Link>
      <p className="text-sm text-[var(--color-muted)] leading-relaxed line-clamp-3">
        {excerpt}
      </p>
      <Link
        href={`/blog/${slug}`}
        className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-[var(--color-accent)] hover:gap-2 transition-all"
      >
        המשך קריאה <span aria-hidden>&larr;</span>
      </Link>
    </article>
  );
}
