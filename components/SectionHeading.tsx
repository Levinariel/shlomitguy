interface Props {
  title: string;
  subtitle?: string;
  kicker?: string;
  centered?: boolean;
}

export default function SectionHeading({ title, subtitle, kicker, centered }: Props) {
  return (
    <div className={`mb-10 ${centered ? "text-center" : ""}`}>
      {kicker && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
          {kicker}
        </p>
      )}
      <h2 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-ink)]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-[var(--color-muted)] text-base md:text-lg max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
