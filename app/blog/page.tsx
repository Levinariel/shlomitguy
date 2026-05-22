import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import BlogCard from "@/components/BlogCard";
import { getAllPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: 'בלוג | ד"ר שלומית גיא',
  description: "מאמרים ומחשבות על ספורט, חברה, חינוך ואלימות מנקודת מבט מחקרית.",
  alternates: { canonical: "https://rasisnahara.netlify.app/blog" },
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <SectionHeading title="בלוג" subtitle="מאמרים, מחשבות ועדכונים" />

      {posts.length === 0 ? (
        <p className="text-[var(--color-muted)] text-center py-16">אין פוסטים עדיין.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <BlogCard key={post.slug} {...post} />
          ))}
        </div>
      )}
    </div>
  );
}
