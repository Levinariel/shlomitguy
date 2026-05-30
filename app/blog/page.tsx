import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import BlogCard from "@/components/BlogCard";
import { getAllPosts, CATEGORY_ORDER, CATEGORY_LABELS } from "@/lib/posts";

export const metadata: Metadata = {
  title: 'בלוג | ד"ר שלומית גיא',
  description: "מאמרים ומחשבות על ספורט, חברה, חינוך ואלימות מנקודת מבט מחקרית.",
  alternates: { canonical: "https://rasisnahara.netlify.app/blog" },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const groups = CATEGORY_ORDER.map((cat) => ({
    cat,
    label: CATEGORY_LABELS[cat],
    posts: posts.filter((p) => p.category === cat),
  })).filter((g) => g.posts.length > 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <SectionHeading title="בלוג" subtitle="מאמרים, מחשבות ועדכונים" />

      {posts.length === 0 ? (
        <p className="text-[var(--color-muted)] text-center py-16">אין פוסטים עדיין.</p>
      ) : (
        <div className="space-y-16">
          {groups.map((group) => (
            <section key={group.cat}>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[var(--color-ink)] mb-1">
                {group.label}
              </h2>
              <div className="h-px bg-[var(--color-line)] mb-8" />
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.posts.map((post) => (
                  <BlogCard key={post.slug} {...post} />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
