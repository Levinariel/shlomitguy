import fs from "fs";
import path from "path";

const dataDir = path.join(process.cwd(), "content/data");

export interface Book {
  title: string;
  year: string;
  image: string;
  desc: string;
  tag: string;
  free?: boolean;
  freeUrl?: string;
}

export interface PressItem {
  outlet: string;
  title: string;
  desc: string;
  type: string;
  image?: string;
  url?: string;
}

function readJson<T>(filename: string, fallback: T): T {
  const filePath = path.join(dataDir, filename);
  if (!fs.existsSync(filePath)) return fallback;
  try {
    return JSON.parse(fs.readFileSync(filePath, "utf-8")) as T;
  } catch {
    return fallback;
  }
}

export function getBooks(): Book[] {
  const data = readJson<{ items: Book[] }>("books.json", { items: [] });
  return data.items ?? [];
}

export function getPressItems(): PressItem[] {
  const data = readJson<{ items: PressItem[] }>("press.json", { items: [] });
  return data.items ?? [];
}
