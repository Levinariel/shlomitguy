import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDir = path.join(process.cwd(), "content/posts");

export type Category = "article" | "committee" | "lecture" | "conference";

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  featuredImage?: string;
  category: Category;
}

export interface Post extends PostMeta {
  content: string;
}

// Display order + Hebrew labels for the blog category groupings.
export const CATEGORY_ORDER: Category[] = ["article", "committee", "lecture", "conference"];
export const CATEGORY_LABELS: Record<Category, string> = {
  article: "מאמרים ומחקר",
  committee: "ועדות ודוחות",
  lecture: "הרצאות ומומחים",
  conference: "כנס שלום הילד בספורט",
};

function normCategory(c: unknown): Category {
  return c === "committee" || c === "lecture" || c === "conference" ? c : "article";
}

function ensureDir() {
  if (!fs.existsSync(postsDir)) fs.mkdirSync(postsDir, { recursive: true });
}

export async function getAllPosts(): Promise<PostMeta[]> {
  ensureDir();
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
  const posts = files.map((file) => {
    const raw = fs.readFileSync(path.join(postsDir, file), "utf-8");
    const { data } = matter(raw);
    return {
      slug: file.replace(/\.(mdx|md)$/, ""),
      title: data.title ?? "",
      date: data.date ?? "",
      excerpt: data.excerpt ?? "",
      featuredImage: data.featuredImage,
      category: normCategory(data.category),
    } as PostMeta;
  });
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getRecentPosts(count: number): Promise<PostMeta[]> {
  const all = await getAllPosts();
  return all.slice(0, count);
}

export async function getPost(slug: string): Promise<Post | null> {
  ensureDir();
  const filePath = [
    path.join(postsDir, `${slug}.mdx`),
    path.join(postsDir, `${slug}.md`),
  ].find((p) => fs.existsSync(p));
  if (!filePath) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  return {
    slug,
    title: data.title ?? "",
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    featuredImage: data.featuredImage,
    category: normCategory(data.category),
    content,
  };
}

export async function getAllSlugs(): Promise<string[]> {
  ensureDir();
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.(mdx|md)$/, ""));
}
