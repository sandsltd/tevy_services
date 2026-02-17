import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import { CONFIG } from "./config";

interface RankingData {
  keyword: string;
  position: number | null;
  previousPosition: string;
  clicks: number;
  impressions: number;
}

export interface Recommendation {
  priority: "high" | "medium" | "low";
  category: string;
  title: string;
  description: string;
}

export async function generateRecommendations(
  strategyContent: string,
  rankings: RankingData[]
): Promise<Recommendation[]> {
  const anthropic = new Anthropic();

  // Gather existing blog posts
  const blogDir = path.join(process.cwd(), CONFIG.blogContentDir);
  const existingPosts: string[] = [];
  if (fs.existsSync(blogDir)) {
    const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));
    for (const file of files) {
      const content = fs.readFileSync(path.join(blogDir, file), "utf-8");
      const titleMatch = content.match(/title:\s*"([^"]+)"/);
      if (titleMatch) existingPosts.push(titleMatch[1]);
    }
  }

  // Gather site pages
  const appDir = path.join(process.cwd(), "src/app");
  const sitePages: string[] = [];
  function scanPages(dir: string, prefix: string) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (entry.name.startsWith("(") || entry.name === "api") continue;
        const pagePath = path.join(dir, entry.name, "page.tsx");
        if (fs.existsSync(pagePath)) {
          sitePages.push(`${prefix}/${entry.name}`);
        }
        scanPages(path.join(dir, entry.name), `${prefix}/${entry.name}`);
      }
    }
  }
  sitePages.push("/");
  scanPages(appDir, "");

  const rankingSummary = rankings
    .map((r) => {
      const pos = r.position !== null ? `#${r.position}` : "Not indexed";
      return `- "${r.keyword}": ${pos} (prev: ${r.previousPosition}, clicks: ${r.clicks}, impressions: ${r.impressions})`;
    })
    .join("\n");

  const response = await anthropic.messages.create({
    model: CONFIG.contentModel,
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: `You are a technical SEO consultant analysing the current state of tevyservices.co.uk, a mobile alloy wheel repair and tyre services company based in Exeter, Devon, UK. They specialise in diamond cut alloy wheel refurbishment, kerbed wheel repair, powder coating, and tyre fitting/replacement.

## Current SEO Strategy
${strategyContent}

## Current Keyword Rankings
${rankingSummary}

## Existing Blog Posts
${existingPosts.length > 0 ? existingPosts.map((t) => `- ${t}`).join("\n") : "None yet."}

## Current Site Pages
${sitePages.map((p) => `- ${p}`).join("\n")}

## Your Task
Analyse the current SEO state and provide 3-5 actionable recommendations. Think about:

1. **New pages to create** — Are there keywords that need dedicated service pages, location pages, or comparison pages rather than blog posts? (e.g. "alloy wheel repair Exeter", dedicated service area pages for Exmouth, Tiverton, Torquay, etc.)
2. **Technical SEO improvements** — Missing structured data (LocalBusiness, Service schema), meta tag improvements, internal linking gaps, page speed concerns, new schema markup opportunities
3. **Content gaps** — Topics or angles not covered by existing blog posts that would build authority in the alloy wheel repair and tyre services space
4. **Quick wins** — Low-effort changes that could improve rankings for specific keywords (e.g. a keyword that's close to page 1 and just needs a content tweak)
5. **Competitive opportunities** — Based on the Exeter/Devon competitor landscape, what should we prioritise?

Important:
- Be specific and actionable — "Add LocalBusiness schema to the homepage" is better than "Improve on-page SEO"
- Reference specific keywords and their current rankings
- Consider local SEO opportunities (Google Business Profile, local citations, service area pages)
- Prioritise by impact — what will move the needle most?
- These recommendations are for the site owner to action manually, so they need enough detail to be useful
- Use UK English

Respond in EXACTLY this JSON format, nothing else:
[
  {
    "priority": "high",
    "category": "Category Name",
    "title": "Short actionable title",
    "description": "2-3 sentences explaining what to do and why. Be specific about which pages, keywords, or technical elements to change."
  }
]`,
      },
    ],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";

  try {
    const cleaned = text.replace(/```json\n?/g, "").replace(/```\n?/g, "").trim();
    return JSON.parse(cleaned);
  } catch {
    console.warn("Failed to parse recommendations JSON, skipping.");
    return [];
  }
}
