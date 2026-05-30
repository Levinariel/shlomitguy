import fs from "fs";
import path from "path";
import matter from "gray-matter";

const dir = path.join(process.cwd(), "content/imperia");

export interface ChapterMeta {
  slug: string;
  title: string;
  order: number;
  chapter: number | null; // numbered chapter, or null for front/back matter
  group: "front" | "chapter" | "back";
}

export interface Chapter extends ChapterMeta {
  content: string;
}

function read(file: string) {
  const raw = fs.readFileSync(path.join(dir, file), "utf-8");
  const { data, content } = matter(raw);
  return {
    slug: file.replace(/\.(mdx|md)$/, ""),
    title: data.title ?? "",
    order: typeof data.order === "number" ? data.order : 999,
    chapter: typeof data.chapter === "number" ? data.chapter : null,
    group: (data.group as ChapterMeta["group"]) ?? "chapter",
    content,
  } as Chapter;
}

function files(): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));
}

export function getAllChapters(): ChapterMeta[] {
  return files()
    .map((f) => {
      const { content, ...meta } = read(f);
      void content;
      return meta;
    })
    .sort((a, b) => a.order - b.order);
}

export function getChapter(slug: string): Chapter | null {
  const file = files().find((f) => f.replace(/\.(mdx|md)$/, "") === slug);
  return file ? read(file) : null;
}

export function getAllChapterSlugs(): string[] {
  return getAllChapters().map((c) => c.slug);
}

// previous / next in reading order, for in-chapter navigation.
export function getChapterNeighbors(slug: string): { prev?: ChapterMeta; next?: ChapterMeta } {
  const all = getAllChapters();
  const i = all.findIndex((c) => c.slug === slug);
  if (i === -1) return {};
  return { prev: all[i - 1], next: all[i + 1] };
}
