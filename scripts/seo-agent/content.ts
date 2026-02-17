import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import { CONFIG } from "./config";

// Image pool categorised by topic
const IMAGE_POOL: Record<string, string[]> = {
  alloy_wheels: [
    "/images/blog/01-alloy-wheel-closeup.webp",
    "/images/blog/02-silver-wheel-red-brake-caliper.webp",
    "/images/blog/03-black-rim-modern-car.webp",
    "/images/blog/04-black-alloy-wheel-yellow-caliper.webp",
    "/images/blog/05-car-wheel-closeup.webp",
    "/images/blog/06-red-car-gray-wheel.webp",
    "/images/blog/07-wheel-black-rim-closeup.webp",
    "/images/blog/08-lamborghini-alloy-rim.webp",
    "/images/blog/09-fast-rotating-car-wheel.webp",
    "/images/blog/10-car-tire-closeup.webp",
  ],
  mechanic: [
    "/images/blog/11-mechanic-inspecting-vehicle.webp",
    "/images/blog/12-mechanic-fixing-car.webp",
    "/images/blog/13-close-up-fixing-engine.webp",
    "/images/blog/14-mechanic-repairing-car.webp",
    "/images/blog/15-modern-car-service-garage.webp",
    "/images/blog/16-white-car-maintenance-lift.webp",
    "/images/blog/17-man-fixing-car-back.webp",
    "/images/blog/18-auto-mechanic-closeup.webp",
  ],
  tyres: [
    "/images/blog/19-man-standing-beside-tires.webp",
    "/images/blog/20-mechanic-sitting-vehicle-tire.webp",
  ],
};

const ALL_BLOG_IMAGES = Object.values(IMAGE_POOL).flat();

function getUsedImages(): Set<string> {
  const used = new Set<string>();
  const blogDir = path.join(process.cwd(), CONFIG.blogContentDir);
  if (!fs.existsSync(blogDir)) return used;

  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));
  for (const file of files) {
    const content = fs.readFileSync(path.join(blogDir, file), "utf-8");
    const match = content.match(/heroImage:\s*"([^"]+)"/);
    if (match) used.add(match[1]);
  }
  return used;
}

function pickImage(keyword: string): string {
  const usedImages = getUsedImages();
  const kw = keyword.toLowerCase();

  // Map keywords to categories
  const categoryMap: [RegExp, string][] = [
    [/alloy|wheel|rim|diamond cut|curb|kerb|scuff|refurb/, "alloy_wheels"],
    [/tyre|tire|puncture|flat|pressure|tread|balance|alignment/, "tyres"],
    [/repair|fix|mechanic|workshop|garage|service|maintenance|restore/, "mechanic"],
  ];

  // Find matching category
  for (const [pattern, category] of categoryMap) {
    if (pattern.test(kw)) {
      const pool = IMAGE_POOL[category] || [];
      const available = pool.filter((img) => !usedImages.has(img));
      if (available.length > 0) {
        return available[Math.floor(Math.random() * available.length)];
      }
    }
  }

  // Fallback: any unused image
  const available = ALL_BLOG_IMAGES.filter((img) => !usedImages.has(img));
  if (available.length > 0) {
    return available[Math.floor(Math.random() * available.length)];
  }

  // All used — cycle through
  return ALL_BLOG_IMAGES[Math.floor(Math.random() * ALL_BLOG_IMAGES.length)];
}

interface RankingData {
  keyword: string;
  position: number | null;
  previousPosition: string;
}

interface GeneratedPost {
  filename: string;
  title: string;
  slug: string;
  targetKeyword: string;
  mdxContent: string;
  isRefresh: boolean;
  wordCount: number;
  refreshReason: string | null;
  heroImage: string;
}

function calculateWordCount(mdxContent: string): number {
  // Strip frontmatter
  const withoutFrontmatter = mdxContent.replace(/^---[\s\S]*?---/, "").trim();
  // Split on whitespace and filter empty strings
  return withoutFrontmatter.split(/\s+/).filter((w) => w.length > 0).length;
}

interface ExistingPost {
  filename: string;
  title: string;
  slug: string;
  targetKeyword: string;
  publishedAt: string;
}

function getExistingPosts(): {
  keywords: Set<string>;
  titles: string[];
  posts: ExistingPost[];
} {
  const blogDir = path.join(process.cwd(), CONFIG.blogContentDir);
  const keywords = new Set<string>();
  const titles: string[] = [];
  const posts: ExistingPost[] = [];

  if (!fs.existsSync(blogDir)) return { keywords, titles, posts };

  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));
  for (const file of files) {
    const content = fs.readFileSync(path.join(blogDir, file), "utf-8");
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (frontmatterMatch) {
      const fm = frontmatterMatch[1];
      const kwMatch = fm.match(/targetKeyword:\s*"([^"]+)"/);
      if (kwMatch) keywords.add(kwMatch[1].toLowerCase());
      const titleMatch = fm.match(/title:\s*"([^"]+)"/);
      if (titleMatch) titles.push(titleMatch[1]);
      const slugMatch = fm.match(/slug:\s*"([^"]+)"/);
      const dateMatch = fm.match(/publishedAt:\s*"([^"]+)"/);

      posts.push({
        filename: file,
        title: titleMatch?.[1] || "",
        slug: slugMatch?.[1] || "",
        targetKeyword: kwMatch?.[1] || "",
        publishedAt: dateMatch?.[1] || "",
      });
    }
  }

  return { keywords, titles, posts };
}

function pickNextTopic(strategyContent: string): {
  keyword: string;
  context: string;
} | null {
  const { keywords: existingKeywords } = getExistingPosts();

  const contentPriorities: { keyword: string; context: string }[] = [];

  // First check the content priority list
  const contentSection = strategyContent.match(
    /\*\*Content to create \(in priority order\):\*\*([\s\S]*?)(?=\n---|\n##)/
  );
  if (contentSection) {
    const items = contentSection[1].match(/\d+\.\s+(.+)/g);
    if (items) {
      for (const item of items) {
        const text = item.replace(/^\d+\.\s+/, "").trim();
        const quotedMatch = text.match(/"([^"]+)"/);
        const keyword = quotedMatch ? quotedMatch[1] : text.split(":")[0];
        contentPriorities.push({ keyword, context: text });
      }
    }
  }

  // Then check tier keywords that don't have posts yet
  const tierRegex =
    /### Tier \d+ — \w+.*?\n\n((?:\|.*\n)*)/g;
  let tierMatch;
  while ((tierMatch = tierRegex.exec(strategyContent)) !== null) {
    const rows = tierMatch[1].match(
      /\|\s*\d+\s*\|\s*([^|]+?)\s*\|[^|]*\|[^|]*\|([^|]*)\|([^|]*)\|/g
    );
    if (rows) {
      for (const row of rows) {
        const parts = row.split("|").filter((p) => p.trim());
        if (parts.length >= 5) {
          const keyword = parts[1].trim();
          const targetPage = parts[4].trim();
          if (
            keyword !== "Keyword" &&
            targetPage.toLowerCase().includes("blog")
          ) {
            contentPriorities.push({
              keyword,
              context: `Target page: ${targetPage}`,
            });
          }
        }
      }
    }
  }

  for (const topic of contentPriorities) {
    if (!existingKeywords.has(topic.keyword.toLowerCase())) {
      return topic;
    }
  }

  return null;
}

async function generateNewTopic(
  strategyContent: string
): Promise<{ keyword: string; context: string }> {
  const { titles } = getExistingPosts();
  const anthropic = new Anthropic();

  const response = await anthropic.messages.create({
    model: CONFIG.contentModel,
    max_tokens: 1024,
    messages: [
      {
        role: "user",
        content: `You are an SEO strategist for TEVY Services (tevyservices.co.uk), a mobile alloy wheel repair and tyre services company based in Exeter, Devon, UK.

## SEO Strategy
${strategyContent}

## Existing Blog Posts
${titles.length > 0 ? titles.map((t) => `- ${t}`).join("\n") : "None yet."}

## Your Task
Suggest ONE new blog post topic that would be valuable for SEO. Consider:
- Long-tail keywords car owners in Exeter/Devon might search for
- Practical problems vehicle owners face (kerbed alloys, tyre damage, diamond cut wheel repair, scuffed rims)
- Alloy wheel repair methods and techniques (powder coating, diamond cutting, smart repair)
- Tyre-related topics (tyre replacement, puncture repair, seasonal tyres, tread depth, pressure)
- Local Exeter/Devon angles and seasonal trends
- Topics that complement existing posts without duplicating them

Respond in EXACTLY this JSON format, nothing else:
{"keyword": "the target keyword phrase", "context": "A 1-2 sentence description of the article angle and why it's valuable for SEO"}`,
      },
    ],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";
  const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
  const parsed = JSON.parse(cleaned);
  return { keyword: parsed.keyword, context: parsed.context };
}

function findPostToRefresh(
  rankings: RankingData[]
): { post: ExistingPost; reason: string } | null {
  const { posts } = getExistingPosts();
  if (posts.length === 0) return null;

  const now = new Date();

  for (const post of posts) {
    // Only consider posts older than 60 days
    const publishedDate = new Date(post.publishedAt);
    const ageInDays =
      (now.getTime() - publishedDate.getTime()) / (1000 * 60 * 60 * 24);
    if (ageInDays < 60) continue;

    const ranking = rankings.find(
      (r) => r.keyword.toLowerCase() === post.targetKeyword.toLowerCase()
    );
    if (!ranking) continue;

    // Detect declining rankings
    const prevMatch = ranking.previousPosition.match(/Position ([\d.]+)/);
    if (prevMatch && ranking.position !== null) {
      const prev = parseFloat(prevMatch[1]);
      const drop = ranking.position - prev;
      // Position increased by 5+ (dropped in rankings)
      if (drop >= 5) {
        return {
          post,
          reason: `Ranking dropped from #${prev} to #${ranking.position} for "${ranking.keyword}"`,
        };
      }
    }

    // Detect posts that were indexed but are now gone
    if (prevMatch && ranking.position === null) {
      return {
        post,
        reason: `Lost ranking for "${ranking.keyword}" (was Position ${prevMatch[1]}, now not indexed)`,
      };
    }

    // Detect posts older than 4 months that never ranked
    if (ageInDays > 120 && ranking.position === null) {
      return {
        post,
        reason: `Published ${Math.round(ageInDays)} days ago and still not ranking for "${ranking.keyword}"`,
      };
    }
  }

  return null;
}

export async function generateBlogPost(
  strategyContent: string,
  rankings: RankingData[] = []
): Promise<GeneratedPost | null> {
  // Check if any existing post needs refreshing first
  const refreshCandidate = findPostToRefresh(rankings);

  if (refreshCandidate) {
    console.log(
      `Refreshing post: "${refreshCandidate.post.title}" — ${refreshCandidate.reason}`
    );
    return await refreshPost(refreshCandidate.post, refreshCandidate.reason, strategyContent);
  }

  let topic = pickNextTopic(strategyContent);

  if (!topic) {
    console.log(
      "All planned topics covered. Generating a new topic with AI..."
    );
    topic = await generateNewTopic(strategyContent);
    console.log(`AI suggested topic: "${topic.keyword}"`);
  }

  console.log(`Generating blog post for keyword: "${topic.keyword}"`);

  const heroImage = pickImage(topic.keyword);
  console.log(`Selected hero image: ${heroImage}`);

  const anthropic = new Anthropic();

  const today = new Date().toISOString().split("T")[0];

  const prompt = `You are writing a blog post for TEVY Services (tevyservices.co.uk), a mobile alloy wheel repair and tyre services company based in Exeter, Devon, UK. They specialise in diamond cut alloy wheel refurbishment, kerbed wheel repair, powder coating, and tyre fitting/replacement.

## SEO Strategy Context
${strategyContent}

## Your Task
Write a blog post targeting this keyword: "${topic.keyword}"
Context: ${topic.context}

## Requirements
- Length: ${CONFIG.minBlogWordCount}-${CONFIG.maxBlogWordCount} words
- Language: UK English (use "s" not "z" in words like "specialise", "organisation")
- Tone: Professional but approachable. Write for car owners in Exeter/Devon, not automotive engineers.
- Include the target keyword naturally 3-5 times. Don't keyword-stuff.
- Reference TEVY Services' mobile service where relevant (convenience of coming to the customer)
- Include internal links to ${CONFIG.siteUrl} service pages where natural
- Use industry terminology from the strategy doc (diamond cut, powder coating, smart repair, kerbing damage, etc.)
- Structure with clear H2 and H3 headings
- Include a practical, actionable conclusion
- Determine the correct pillar for this topic: "alloy-repair", "tyre-services", or "general"

## Output Format
Return ONLY the MDX file content including frontmatter. No explanation, no code fences. Start with --- and end with the last line of content.

The frontmatter must include:
---
title: "Post Title Here"
slug: "url-friendly-slug"
description: "Meta description under 160 characters targeting the keyword"
keywords: ["${topic.keyword}", "related keyword 1", "related keyword 2"]
publishedAt: "${today}"
targetKeyword: "${topic.keyword}"
author: "TEVY Services"
pillar: "alloy-repair|tyre-services|general"
heroImage: "${heroImage}"
---`;

  const response = await anthropic.messages.create({
    model: CONFIG.contentModel,
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const mdxContent =
    response.content[0].type === "text" ? response.content[0].text : "";

  const slugMatch = mdxContent.match(/slug:\s*"([^"]+)"/);
  const slug = slugMatch ? slugMatch[1] : topic.keyword.toLowerCase().replace(/\s+/g, "-");

  const titleMatch = mdxContent.match(/title:\s*"([^"]+)"/);
  const title = titleMatch ? titleMatch[1] : topic.keyword;

  const datePrefix = today.slice(0, 7);
  const filename = `${datePrefix}-${slug}.mdx`;

  const blogDir = path.join(process.cwd(), CONFIG.blogContentDir);
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }
  fs.writeFileSync(path.join(blogDir, filename), mdxContent);

  console.log(`Blog post written: content/blog/${filename}`);

  return {
    filename,
    title,
    slug,
    targetKeyword: topic.keyword,
    mdxContent,
    isRefresh: false,
    wordCount: calculateWordCount(mdxContent),
    refreshReason: null,
    heroImage,
  };
}

async function refreshPost(
  post: ExistingPost,
  reason: string,
  strategyContent: string
): Promise<GeneratedPost> {
  const anthropic = new Anthropic();
  const blogDir = path.join(process.cwd(), CONFIG.blogContentDir);
  const filePath = path.join(blogDir, post.filename);
  const existingContent = fs.readFileSync(filePath, "utf-8");
  const today = new Date().toISOString().split("T")[0];

  // Preserve existing hero image or pick a new one
  const existingImageMatch = existingContent.match(/heroImage:\s*"([^"]+)"/);
  const heroImage = existingImageMatch ? existingImageMatch[1] : pickImage(post.targetKeyword);

  const prompt = `You are refreshing/rewriting a blog post for TEVY Services (tevyservices.co.uk), a mobile alloy wheel repair and tyre services company based in Exeter, Devon, UK. They specialise in diamond cut alloy wheel refurbishment, kerbed wheel repair, powder coating, and tyre fitting/replacement.

## Why This Post Needs Refreshing
${reason}

## SEO Strategy Context
${strategyContent}

## Current Post Content
${existingContent}

## Your Task
Rewrite and improve this blog post. The goal is to make it rank better for the target keyword: "${post.targetKeyword}"

## What To Improve
- Update any outdated information
- Improve the structure and readability
- Add more practical, actionable advice
- Strengthen the keyword targeting without stuffing
- Add more industry-specific terminology car owners would search for
- Make the introduction more compelling
- Ensure the content is comprehensive and answers searcher intent fully

## Requirements
- Length: ${CONFIG.minBlogWordCount}-${CONFIG.maxBlogWordCount} words
- Language: UK English (use "s" not "z" in words like "specialise", "organisation")
- Tone: Professional but approachable. Write for car owners in Exeter/Devon, not automotive engineers.
- Include the target keyword naturally 3-5 times
- Reference TEVY Services' mobile service where relevant
- Include internal links to ${CONFIG.siteUrl} service pages where natural
- Keep the same slug, but you can update the title and description
- Structure with clear H2 and H3 headings
- Include the pillar field matching the original

## Output Format
Return ONLY the MDX file content including frontmatter. No explanation, no code fences. Start with --- and end with the last line of content.

The frontmatter must include:
---
title: "Updated Post Title"
slug: "${post.slug}"
description: "Updated meta description under 160 characters"
keywords: ["${post.targetKeyword}", "related keyword 1", "related keyword 2"]
publishedAt: "${post.publishedAt}"
updatedAt: "${today}"
targetKeyword: "${post.targetKeyword}"
author: "TEVY Services"
pillar: "alloy-repair|tyre-services|general"
heroImage: "${heroImage}"
---`;

  const response = await anthropic.messages.create({
    model: CONFIG.contentModel,
    max_tokens: 4096,
    messages: [{ role: "user", content: prompt }],
  });

  const mdxContent =
    response.content[0].type === "text" ? response.content[0].text : "";

  const titleMatch = mdxContent.match(/title:\s*"([^"]+)"/);
  const title = titleMatch ? titleMatch[1] : post.title;

  // Overwrite existing file
  fs.writeFileSync(filePath, mdxContent);
  console.log(`Refreshed post: content/blog/${post.filename}`);

  return {
    filename: post.filename,
    title,
    slug: post.slug,
    targetKeyword: post.targetKeyword,
    mdxContent,
    isRefresh: true,
    wordCount: calculateWordCount(mdxContent),
    refreshReason: reason,
    heroImage,
  };
}
