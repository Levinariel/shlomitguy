import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPost } from "@/lib/posts";
import Link from "next/link";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} | ד"ר שלומית גיא`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <Link
        href="/blog"
        className="text-sm text-[var(--color-navy)] hover:underline mb-8 block"
      >
        &larr; חזרה לבלוג
      </Link>

      {post.featuredImage && (
        <img
          src={post.featuredImage}
          alt={post.title}
          className="w-full rounded-2xl mb-8 object-cover max-h-80"
        />
      )}

      <time className="text-xs text-[var(--color-muted)] block mb-3">{post.date}</time>
      <h1 className="text-3xl font-bold text-[var(--color-navy)] mb-8 leading-tight">{post.title}</h1>

      <div className="prose">
        <MDXRemote source={post.content} />
      </div>

      <div className="mt-12 pt-8 border-t border-[var(--color-surface)]">
        <Link
          href="/blog"
          className="text-sm text-[var(--color-navy)] hover:underline"
        >
          &larr; חזרה לבלוג
        </Link>
      </div>
    </div>
  );
}
