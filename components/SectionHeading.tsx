interface Props {
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export default function SectionHeading({ title, subtitle, centered }: Props) {
  return (
    <div className={`mb-10 ${centered ? "text-center" : ""}`}>
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-navy)] mb-2">{title}</h2>
      {subtitle && <p className="text-[var(--color-muted)] text-base">{subtitle}</p>}
      <div className={`mt-3 h-1 w-16 bg-[var(--color-navy)] rounded-full ${centered ? "mx-auto" : ""}`} />
    </div>
  );
}
