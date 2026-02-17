import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDir = path.join(process.cwd(), "content", "blog");

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  keywords: string[];
  publishedAt: string;
  targetKeyword: string;
  author: string;
  pillar: string;
  heroImage?: string;
  category?: string;
  readTime?: string;
}

export interface BlogPostWithContent extends BlogPost {
  content: string;
}

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogDir)) return [];
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));
  const posts = files.map((filename) => {
    const filePath = path.join(blogDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data } = matter(fileContent);
    return {
      slug: data.slug || filename.replace(".mdx", ""),
      title: data.title || "Untitled",
      description: data.description || "",
      keywords: data.keywords || [],
      publishedAt: data.publishedAt || "",
      targetKeyword: data.targetKeyword || "",
      author: data.author || "TEVY Services",
      pillar: data.pillar || "general",
      heroImage: data.heroImage || undefined,
      category: data.category || undefined,
      readTime: data.readTime || undefined,
    };
  });
  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getPostBySlug(slug: string): BlogPostWithContent | null {
  if (!fs.existsSync(blogDir)) return null;
  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));
  for (const filename of files) {
    const filePath = path.join(blogDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);
    const postSlug = data.slug || filename.replace(".mdx", "");
    if (postSlug === slug) {
      return {
        slug: postSlug,
        title: data.title || "Untitled",
        description: data.description || "",
        keywords: data.keywords || [],
        publishedAt: data.publishedAt || "",
        targetKeyword: data.targetKeyword || "",
        author: data.author || "TEVY Services",
        pillar: data.pillar || "general",
        heroImage: data.heroImage || undefined,
        category: data.category || undefined,
        readTime: data.readTime || undefined,
        content,
      };
    }
  }
  return null;
}

export function getAllSlugs(): string[] {
  return getAllPosts().map((p) => p.slug);
}

export function getRelatedPosts(
  currentSlug: string,
  currentKeywords: string[],
  count: number = 3
): BlogPost[] {
  const allPosts = getAllPosts().filter((p) => p.slug !== currentSlug);
  if (allPosts.length === 0) return [];
  const currentKw = new Set(currentKeywords.map((k) => k.toLowerCase()));
  const scored = allPosts.map((post) => {
    const postKw = post.keywords.map((k) => k.toLowerCase());
    const overlap = postKw.filter((k) => currentKw.has(k)).length;
    const currentWords = new Set(
      currentKeywords.join(" ").toLowerCase().split(/\s+/)
    );
    const titleWords = post.title.toLowerCase().split(/\s+/);
    const titleOverlap = titleWords.filter((w) => currentWords.has(w)).length;
    return { post, score: overlap * 3 + titleOverlap };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, count).map((s) => s.post);
}
