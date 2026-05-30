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
    alternates: { canonical: `https://rasisnahara.netlify.app/blog/${slug}` },
    openGraph: {
      type: "article",
      publishedTime: post.date,
      authors: ["ד\"ר שלומית גיא"],
      images: post.featuredImage
        ? [{ url: post.featuredImage, alt: post.title }]
        : undefined,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `https://rasisnahara.netlify.app/blog/${slug}`,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: "ד\"ר שלומית גיא",
      url: "https://rasisnahara.netlify.app/about",
    },
    publisher: {
      "@type": "Organization",
      name: "הוצאת רסיס נהרה",
      url: "https://rasisnahara.netlify.app",
    },
    image: post.featuredImage
      ? `https://rasisnahara.netlify.app${post.featuredImage}`
      : "https://rasisnahara.netlify.app/images/profile-main.jpg",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://rasisnahara.netlify.app/blog/${slug}`,
    },
    inLanguage: "he",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "p:first-of-type"],
    },
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
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
