import Anthropic from "@anthropic-ai/sdk";
import fs from "fs";
import path from "path";
import { CONFIG } from "./config";

export interface LinkingResult {
  total: number;
  details: { postTitle: string; linksAdded: number }[];
}

interface PostInfo {
  filename: string;
  title: string;
  slug: string;
  targetKeyword: string;
  description: string;
}

function getAllPosts(): PostInfo[] {
  const blogDir = path.join(process.cwd(), CONFIG.blogContentDir);
  if (!fs.existsSync(blogDir)) return [];

  const files = fs.readdirSync(blogDir).filter((f) => f.endsWith(".mdx"));
  const posts: PostInfo[] = [];

  for (const filename of files) {
    const content = fs.readFileSync(path.join(blogDir, filename), "utf-8");
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) continue;

    const fm = frontmatterMatch[1];
    const title = fm.match(/title:\s*"([^"]+)"/)?.[1] || "";
    const slug = fm.match(/slug:\s*"([^"]+)"/)?.[1] || "";
    const targetKeyword = fm.match(/targetKeyword:\s*"([^"]+)"/)?.[1] || "";
    const description = fm.match(/description:\s*"([^"]+)"/)?.[1] || "";

    if (title && slug) {
      posts.push({ filename, title, slug, targetKeyword, description });
    }
  }

  return posts;
}

export async function addInternalLinks(): Promise<LinkingResult> {
  const posts = getAllPosts();
  const details: { postTitle: string; linksAdded: number }[] = [];

  if (posts.length < 2) {
    console.log("Not enough posts for internal linking.");
    return { total: 0, details };
  }

  const anthropic = new Anthropic();
  const blogDir = path.join(process.cwd(), CONFIG.blogContentDir);

  let totalLinksAdded = 0;

  for (const post of posts) {
    const filePath = path.join(blogDir, post.filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // Split frontmatter and body
    const fmEnd = fileContent.indexOf("---", 4);
    if (fmEnd === -1) continue;
    const frontmatter = fileContent.slice(0, fmEnd + 3);
    const body = fileContent.slice(fmEnd + 3);

    // Check how many internal blog links already exist
    const existingLinks = (body.match(/\[([^\]]+)\]\(\/blog\//g) || []).length;
    if (existingLinks >= 3) {
      continue;
    }

    // Get other posts (not this one)
    const otherPosts = posts.filter((p) => p.slug !== post.slug);
    if (otherPosts.length === 0) continue;

    const otherPostsList = otherPosts
      .map(
        (p) =>
          `- Title: "${p.title}" | URL: /blog/${p.slug} | Keyword: "${p.targetKeyword}"`
      )
      .join("\n");

    const response = await anthropic.messages.create({
      model: CONFIG.contentModel,
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: `You are adding internal links to a blog post. The goal is to naturally link to related posts where it makes sense contextually.

## Current Post
Title: "${post.title}"
Target keyword: "${post.targetKeyword}"

## Post Body (MDX)
${body}

## Other Posts Available to Link To
${otherPostsList}

## Existing Internal Links
This post already has ${existingLinks} internal blog links.

## Rules
- Add ${Math.max(1, 3 - existingLinks)} internal links to other blog posts where contextually relevant
- Use natural anchor text that fits the sentence (not "click here" or the full title)
- Use markdown link format: [anchor text](/blog/slug)
- Only link where it genuinely makes sense — don't force links
- Do NOT change any other content — keep everything exactly the same
- Do NOT modify existing links
- Do NOT add links to external sites
- Return the COMPLETE post body with links added. No frontmatter, no code fences, no explanation.
- If no natural linking opportunities exist, return the body unchanged`,
        },
      ],
    });

    const newBody =
      response.content[0].type === "text" ? response.content[0].text : "";

    // Count new links added
    const newLinkCount = (newBody.match(/\[([^\]]+)\]\(\/blog\//g) || [])
      .length;
    const linksAdded = newLinkCount - existingLinks;

    if (linksAdded > 0) {
      fs.writeFileSync(filePath, frontmatter + "\n" + newBody.trim() + "\n");
      totalLinksAdded += linksAdded;
      details.push({ postTitle: post.title, linksAdded });
      console.log(
        `Added ${linksAdded} internal links to "${post.title}"`
      );
    }
  }

  return { total: totalLinksAdded, details };
}
