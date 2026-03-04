# Tevy Services SEO Agent Setup — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Set up the full SEO/marketing infrastructure for Tevy Services (alloy wheel repair & tyre services, Exeter) — market research, MDX blog migration, automated SEO agent pipeline, portal integration.

**Architecture:** MDX-based blog (gray-matter + next-mdx-remote/rsc) with 9 existing posts migrated from hardcoded JSX. Automated SEO agent pipeline (9 TypeScript modules) running weekly via GitHub Actions. Integrated into existing SEO portal as `tevyservices`.

**Tech Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, gray-matter, next-mdx-remote, googleapis, @anthropic-ai/sdk, resend, @supabase/supabase-js

**Reference implementation:** `/Users/nick/Documents/code/paperroute_website/scripts/seo-agent/` — adapt all modules from PaperRoute, changing business context from waste collection software to alloy wheel repair/tyre services.

---

## Task 1: Install Dependencies

**Files:**
- Modify: `/Users/nick/Documents/code/tevy_services/package.json`

**Step 1: Install production dependencies**

```bash
cd /Users/nick/Documents/code/tevy_services && npm install gray-matter next-mdx-remote @supabase/supabase-js resend googleapis
```

**Step 2: Install dev dependencies**

```bash
cd /Users/nick/Documents/code/tevy_services && npm install -D @anthropic-ai/sdk tsx
```

**Step 3: Verify installation**

Run: `cd /Users/nick/Documents/code/tevy_services && cat package.json | grep -E "gray-matter|next-mdx-remote|supabase|resend|googleapis|anthropic|tsx"`
Expected: All 7 packages listed

**Step 4: Commit**

```bash
cd /Users/nick/Documents/code/tevy_services && git add package.json package-lock.json && git commit -m "chore: add SEO agent and blog infrastructure dependencies"
```

---

## Task 2: Copy Blog Images to Public Directory

**Files:**
- Create: `public/images/blog/` (50 WebP files)

**Step 1: Create directory and copy images**

```bash
mkdir -p /Users/nick/Documents/code/tevy_services/public/images/blog
cp /Users/nick/Documents/code/images/alloy-repair-exeter/webp/*.webp /Users/nick/Documents/code/tevy_services/public/images/blog/
```

**Step 2: Verify count**

```bash
ls /Users/nick/Documents/code/tevy_services/public/images/blog/*.webp | wc -l
```
Expected: 50

**Step 3: Commit**

```bash
cd /Users/nick/Documents/code/tevy_services && git add public/images/blog/ && git commit -m "chore: add 50 blog hero images for SEO agent"
```

---

## Task 3: Create Blog Library

**Files:**
- Create: `/Users/nick/Documents/code/tevy_services/src/lib/blog.ts`

**Step 1: Create the blog library**

Create `src/lib/blog.ts` following the playbook pattern. Use `gray-matter` to parse MDX frontmatter. The blog directory is `content/blog/`.

```typescript
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
```

**Step 2: Commit**

```bash
cd /Users/nick/Documents/code/tevy_services && git add src/lib/blog.ts && git commit -m "feat: add blog library for MDX content management"
```

---

## Task 4: Migrate Existing Blog Posts to MDX

**Files:**
- Create: `content/blog/` directory with 9 MDX files
- Delete (after migration): all 9 subdirectories under `app/blog/` (the individual post routes)

This is the most labour-intensive task. Each of the 9 existing blog posts must be converted from hardcoded JSX `page.tsx` files into MDX files with frontmatter.

**Existing posts to migrate (9 total):**

| # | Slug | Published | Category |
|---|------|-----------|----------|
| 1 | alloy-wheel-repair-exeter | 2026-01-30 | Wheel Repair |
| 2 | alloy-wheel-refurbishment-near-me | 2026-01-30 | Wheel Refurbishment |
| 3 | mobile-alloy-wheel-repair-guide | 2025-12-19 | Mobile Services |
| 4 | signs-of-alloy-wheel-damage-exeter | 2025-05-30 | Expert Advice |
| 5 | tyre-services-exeter | 2025-04-30 | Tyre Services |
| 6 | complete-guide-alloy-wheel-refurbishment-exeter | 2025-03-30 | Wheel Restoration |
| 7 | choosing-best-alloy-wheel-refurbishment-exeter | 2025-02-28 | Expert Advice |
| 8 | mobile-vs-workshop-alloy-wheel-refurbishment-exeter | 2025-01-30 | Service Comparison |
| 9 | diamond-cut-vs-painted-alloys | 2024-03-15 | Expert Advice |

**Step 1: Create content directory**

```bash
mkdir -p /Users/nick/Documents/code/tevy_services/content/blog
```

**Step 2: For each post, read the existing `page.tsx` and `metadata.ts`**

For each of the 9 posts:
1. Read `app/blog/{slug}/page.tsx` — extract the article content (the actual text, headings, lists)
2. Read `app/blog/{slug}/metadata.ts` — extract title, description, keywords, publishedTime
3. Convert the JSX content into clean MDX markdown (H2/H3 headings, paragraphs, lists)
4. Create `content/blog/{slug}.mdx` with proper frontmatter

**MDX frontmatter format for migrated posts:**

```yaml
---
title: "Title from metadata.ts"
slug: "existing-slug"
description: "Description from metadata.ts"
keywords: ["keyword1", "keyword2", "keyword3"]
publishedAt: "YYYY-MM-DD"
targetKeyword: "primary keyword for this post"
author: "TEVY Services"
pillar: "wheel-repair|tyre-services|expert-advice"
heroImage: "/images/blog/XX-description.webp"
category: "Category from blog listing"
readTime: "X min read"
---
```

**IMPORTANT migration notes:**
- Preserve existing slugs EXACTLY so URLs don't break
- Extract dates from metadata.ts `publishedTime` field (convert to YYYY-MM-DD)
- The JSX content is complex (grids, maps, styled divs) — extract the TEXT content and restructure as clean markdown with H2/H3/lists
- Assign a heroImage from the 50 available images — pick contextually appropriate ones
- Do NOT use the date prefix for migrated posts (only agent-generated posts get `YYYY-MM-` prefix)
- Set `targetKeyword` based on the primary keyword from the metadata.ts `keywords` field
- Set `pillar` categories: "wheel-repair" for repair/refurbishment posts, "tyre-services" for tyre posts, "expert-advice" for guides/comparisons

**Step 3: After all 9 MDX files are created, delete the old route directories**

```bash
cd /Users/nick/Documents/code/tevy_services
rm -rf app/blog/alloy-wheel-repair-exeter
rm -rf app/blog/alloy-wheel-refurbishment-near-me
rm -rf app/blog/mobile-alloy-wheel-repair-guide
rm -rf app/blog/signs-of-alloy-wheel-damage-exeter
rm -rf app/blog/tyre-services-exeter
rm -rf app/blog/complete-guide-alloy-wheel-refurbishment-exeter
rm -rf app/blog/choosing-best-alloy-wheel-refurbishment-exeter
rm -rf app/blog/mobile-vs-workshop-alloy-wheel-refurbishment-exeter
rm -rf app/blog/diamond-cut-vs-painted-alloys
```

**Step 4: Commit**

```bash
cd /Users/nick/Documents/code/tevy_services && git add content/blog/ && git add -A app/blog/ && git commit -m "feat: migrate 9 blog posts from hardcoded JSX to MDX"
```

---

## Task 5: Create Dynamic Blog Routes

**Files:**
- Modify: `app/blog/page.tsx` (rewrite blog listing to use `getAllPosts()`)
- Create: `app/blog/[slug]/page.tsx` (dynamic blog post route)

**Step 1: Rewrite blog listing page**

Replace the hardcoded `blogPosts` array in `app/blog/page.tsx` with dynamic data from `getAllPosts()`. Keep the existing visual design (dark theme, teal accent #3E797F, Navigation/Footer components, featured post section, grid layout). But data now comes from the blog library.

Key changes:
- Import `getAllPosts` from `@/lib/blog`
- Remove hardcoded `blogPosts` array
- Map MDX data to the template (use `heroImage` for cover images, `publishedAt` for dates, etc.)
- Featured post = first post (newest)

**Step 2: Create dynamic blog post page**

Create `app/blog/[slug]/page.tsx` with:
- `generateStaticParams()` using `getAllSlugs()`
- `generateMetadata()` using `getPostBySlug()` — title, description, keywords, OpenGraph with heroImage
- Hero image display (full-width, 320px tall) using `next/image`
- MDX rendering with `MDXRemote` from `next-mdx-remote/rsc`
- JSON-LD Article schema
- Related posts section (3-column grid) using `getRelatedPosts()`
- CTA section linking to `/contact` and services pages
- Style prose with Tailwind prose classes (prose-invert for dark theme)
- Navigation and Footer components (matching existing site style)

**Important:** The existing site uses a dark theme (black/gray-900 background, white/gray text, teal #3E797F accent). The blog post page MUST match this aesthetic. Reference the existing blog listing page style.

**Step 3: Build test**

```bash
cd /Users/nick/Documents/code/tevy_services && npx next build
```
Expected: Build succeeds with blog routes listed

**Step 4: Commit**

```bash
cd /Users/nick/Documents/code/tevy_services && git add app/blog/ && git commit -m "feat: add dynamic MDX blog routes replacing hardcoded posts"
```

---

## Task 6: Update Sitemap for MDX Blog Posts

**Files:**
- Modify or create: `app/sitemap.ts` (if it doesn't exist as a dynamic route)

The site currently has a static `public/sitemap.xml`. We should either:
- **Option A:** Create `app/sitemap.ts` to dynamically generate the sitemap (preferred — auto-includes new blog posts)
- **Option B:** Keep static and document manual updates

**Step 1: Check current sitemap approach**

Read `public/sitemap.xml` to understand existing entries. If there's no `app/sitemap.ts`, create one.

**Step 2: Create dynamic sitemap**

Create `app/sitemap.ts` that:
- Includes all existing static pages (homepage, services, locations, contact)
- Imports `getAllPosts()` from `@/lib/blog` to dynamically add blog posts
- Uses each post's `publishedAt` as `lastModified`
- Delete the static `public/sitemap.xml` after creating the dynamic one

**Step 3: Build test**

```bash
cd /Users/nick/Documents/code/tevy_services && npx next build
```

**Step 4: Commit**

```bash
cd /Users/nick/Documents/code/tevy_services && git add app/sitemap.ts && git rm public/sitemap.xml && git commit -m "feat: dynamic sitemap with MDX blog post auto-discovery"
```

---

## Task 7: Create SEO Strategy Document

**Files:**
- Create: `docs/seo-strategy.md`

**CRITICAL:** The format must exactly match what the rankings module parses. Column order matters. Position format must be `Position X.X` or `Not indexed yet`.

Use the market research data from the design phase. The strategy doc must include:

### Business Overview
- Tevy Services — alloy wheel repair & tyre services in Exeter, Devon
- Target audience: car owners in Exeter, Newton Abbot, Torquay, wider Devon
- Mobile + workshop (Marsh Barton) service model
- Key differentiators: family-owned, same-day repairs from GBP 60, 5-star rated

### Keyword Rankings Tracker (3 tiers)

**Tier 1 — Primary (8-10 keywords):**
- alloy wheel repair exeter
- alloy wheel refurbishment exeter
- diamond cut alloy wheels exeter
- mobile alloy wheel repair exeter
- tyre services exeter
- alloy wheel repair devon
- tyre fitting exeter
- wheel repair exeter

**Tier 2 — Secondary (8-10 keywords):**
- alloy wheel refurbishment near me
- mobile alloy wheel repair near me
- diamond cut alloy wheel repair devon
- alloy wheel painting exeter
- tyre replacement exeter
- kerbed alloy wheel repair exeter
- alloy wheel repair marsh barton
- puncture repair exeter

**Tier 3 — Long-tail / Blog (10-12 keywords):**
- how much does alloy wheel repair cost uk
- diamond cut vs painted alloys
- can you repair diamond cut alloy wheels
- is alloy wheel repair worth it
- mobile vs workshop alloy wheel refurbishment
- signs of alloy wheel damage
- alloy wheel repair before selling car
- does alloy wheel damage affect mot
- lease car alloy wheel repair exeter
- pothole damage alloy wheel repair devon
- how many times can you diamond cut alloy wheel
- ev alloy wheel damage

**All keywords start with:** `Not indexed yet | — |`

### Content Strategy

**Content to create (in priority order):**
1. "alloy wheel repair cost exeter": Complete pricing guide for alloy wheel repair in Exeter
2. "pothole damage alloy wheels": Guide to handling pothole damage to alloy wheels in Devon
3. "lease car alloy wheel repair": How to save money on lease return alloy wheel repairs
4. "ev alloy wheel damage exeter": Why electric cars are more prone to alloy wheel damage
5. "alloy wheel repair vs replacement": When to repair vs replace your alloy wheels
6. "diamond cut alloy wheel repair process": Behind the scenes of diamond cut alloy wheel restoration
7. "winter wheel care devon": Protecting your alloys from winter road salt and potholes
8. "alloy wheel repair diy vs professional": Honest comparison of DIY kits vs professional repair
9. "tesla alloy wheel repair exeter": Tesla and EV alloy wheel repair specialist guide
10. "how to spot bad alloy wheel repair": What to look for in a quality alloy wheel repair

### Competitor Watchlist

| Competitor | Domain | Sitemap URL | Notes |
|-----------|--------|-------------|-------|
| South West Alloys | southwestalloys.com | https://www.southwestalloys.com/sitemap.xml | Marsh Barton, highest-rated, price match |
| Smart World Exeter | smartworldexeter.co.uk | https://www.smartworldexeter.co.uk/sitemap.xml | Body shop + diamond cut, blogs actively |
| South West Wheel Repairs | southwestwheelrepairs.com | https://www.southwestwheelrepairs.com/sitemap.xml | 20+ years experience |
| DA Techs Exeter | datechs.co.uk | https://datechs.co.uk/sitemap.xml | National franchise, mobile CNC |
| Garnish Exeter | garnish-uk.com | https://www.garnish-uk.com/sitemap.xml | 15 years, insurance work |
| Revive Exeter | revive-uk.com | https://revive-uk.com/sitemap.xml | National franchise, mobile-only |

### Technical SEO Checklist
(Include items already done and still to do based on current site state)

### Session Log
(Include instructions blockquote per playbook format)

**Step 1: Write the full strategy document**

Create `docs/seo-strategy.md` with all sections above. Follow the EXACT format the rankings parser expects.

**Step 2: Commit**

```bash
cd /Users/nick/Documents/code/tevy_services && git add docs/seo-strategy.md && git commit -m "feat: add SEO strategy document with keyword tracker"
```

---

## Task 8: Create SEO Agent — config.ts

**Files:**
- Create: `scripts/seo-agent/config.ts`

**Step 1: Create config**

```typescript
export const CONFIG = {
  // Google Search Console
  gscSiteUrl: "sc-domain:tevyservices.co.uk",

  // File paths
  strategyDocPath: "docs/seo-strategy.md",
  blogContentDir: "content/blog",

  // Content generation
  contentModel: "claude-sonnet-4-5-20250929" as const,
  maxBlogWordCount: 1500,
  minBlogWordCount: 1000,

  // Email
  emailFrom: "hello@saunders-simmons.co.uk",
  emailSubjectPrefix: "TEVY Services SEO Report",

  // Site
  siteUrl: "https://www.tevyservices.co.uk",
  siteName: "TEVY Services",
};
```

**Step 2: Commit**

```bash
cd /Users/nick/Documents/code/tevy_services && git add scripts/seo-agent/config.ts && git commit -m "feat: add SEO agent configuration"
```

---

## Task 9: Create SEO Agent — rankings.ts

**Files:**
- Create: `scripts/seo-agent/rankings.ts`

**Step 1: Create rankings module**

Adapt from PaperRoute reference at `/Users/nick/Documents/code/paperroute_website/scripts/seo-agent/rankings.ts`.

Key adaptations:
- Import CONFIG from local config
- **IMPORTANT: Scope keyword parsing to Rankings section only** — do NOT parse the entire document. Slice strategy content between `## Keyword Rankings Tracker` and `## Content Strategy` (or next `##` section) before running the table row regex. This prevents the Competitor Watchlist table from being picked up as keywords.

The core logic is identical to PaperRoute:
- `getSearchConsoleClient()` — authenticate with service account
- `parseKeywordsFromStrategy()` — parse tier tables (SCOPED to rankings section)
- `parsePreviousPositions()` — extract current positions (SCOPED)
- `checkRankings()` — query GSC, compare positions, update strategy doc
- `escapeRegex()` helper
- Fallback: if GSC fails, all keywords get `position: null`
- Date format: `toLocaleDateString("en-GB", ...)` → "17 Feb 2026"
- Position format: `Position ${Math.round(position * 10) / 10}`

**Step 2: Commit**

```bash
cd /Users/nick/Documents/code/tevy_services && git add scripts/seo-agent/rankings.ts && git commit -m "feat: add rankings module with GSC integration"
```

---

## Task 10: Create SEO Agent — content.ts

**Files:**
- Create: `scripts/seo-agent/content.ts`

**Step 1: Create content module**

Adapt from PaperRoute reference at `/Users/nick/Documents/code/paperroute_website/scripts/seo-agent/content.ts`.

Key adaptations:

**IMAGE_POOL** — categorise the 50 Tevy images:
```typescript
const IMAGE_POOL: Record<string, string[]> = {
  wheels: [
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
  mechanics: [
    "/images/blog/11-mechanic-inspecting-vehicle.webp",
    "/images/blog/12-mechanic-fixing-car.webp",
    "/images/blog/13-close-up-fixing-engine.webp",
    "/images/blog/14-mechanic-repairing-car.webp",
    "/images/blog/15-modern-car-service-garage.webp",
    "/images/blog/16-white-car-maintenance-lift.webp",
    "/images/blog/17-man-fixing-car-back.webp",
    "/images/blog/18-auto-mechanic-closeup.webp",
    "/images/blog/19-man-standing-beside-tires.webp",
    "/images/blog/20-mechanic-sitting-vehicle-tire.webp",
  ],
  workshop: [
    "/images/blog/21-welder-working-protective-clothing.webp",
    "/images/blog/22-person-wearing-welding-mask.webp",
    "/images/blog/23-man-welding-window-frame.webp",
    "/images/blog/24-worker-welding-metal-sparks.webp",
    "/images/blog/25-man-doing-metalwork-workshop.webp",
    "/images/blog/26-tools-inside-workshop.webp",
    "/images/blog/27-workshop-sorted-tools-wall.webp",
    "/images/blog/28-engineers-in-workshop.webp",
    "/images/blog/29-tools-on-desk-workplace.webp",
  ],
  detailing: [
    "/images/blog/30-person-waxing-car.webp",
    "/images/blog/46-man-washing-car-pressure.webp",
    "/images/blog/47-carwashed-black-sedan.webp",
  ],
  luxury: [
    "/images/blog/31-two-bmw-m3-parked.webp",
    "/images/blog/32-luxury-cars-parking-area.webp",
    "/images/blog/33-luxury-cars-inside-garage.webp",
    "/images/blog/34-mercedes-benz-parked-row.webp",
    "/images/blog/35-black-mercedes-amg-urban.webp",
    "/images/blog/36-black-bmw-parked-garage.webp",
    "/images/blog/37-white-luxury-car-dealership.webp",
    "/images/blog/38-luxury-bmw-urban-garage.webp",
    "/images/blog/44-red-sports-car-gold-rims.webp",
    "/images/blog/45-white-car-black-wheels.webp",
  ],
  customer: [
    "/images/blog/39-car-dealer-handing-keys.webp",
    "/images/blog/40-person-giving-car-key-handshake.webp",
    "/images/blog/41-woman-buying-car.webp",
    "/images/blog/42-happy-girl-holding-car-keys.webp",
    "/images/blog/43-men-shaking-hands-cars-background.webp",
  ],
  restoration: [
    "/images/blog/48-vintage-car-restoration-garage.webp",
    "/images/blog/49-mechanic-working-truck.webp",
    "/images/blog/50-mechanic-fixing-engine.webp",
  ],
};
```

**categoryMap** for keyword-to-image matching:
```typescript
const categoryMap: [RegExp, string][] = [
  [/wheel|alloy|rim|diamond cut|refurb/, "wheels"],
  [/tyre|tire|puncture|pressure|tpms|fitting/, "mechanics"],
  [/workshop|repair process|restoration|welding|powder coat/, "workshop"],
  [/clean|wash|wax|polish|detail|protect|care/, "detailing"],
  [/bmw|audi|mercedes|tesla|ev|electric|luxury|lease/, "luxury"],
  [/customer|service|quote|price|cost|choose|find/, "customer"],
  [/classic|vintage|restor/, "restoration"],
  [/mobile|mechanic|garage|mot|inspect/, "mechanics"],
];
```

**Content prompt** — change business context:
- "TEVY Services (tevyservices.co.uk), a professional alloy wheel repair and tyre services company based in Exeter, Devon"
- "Write for car owners, not automotive engineers"
- UK English, include internal links to `https://www.tevyservices.co.uk` services
- Reference local Devon/Exeter context where relevant
- Pillar categories: "wheel-repair", "tyre-services", "expert-advice"
- Industry terms: diamond cut, powder coating, kerb damage, refurbishment, TPMS, etc.

**generateNewTopic** — update prompt for alloy wheel repair industry context

Everything else (getExistingPosts, pickNextTopic, findPostToRefresh, refreshPost, calculateWordCount, file naming) is structurally identical to PaperRoute.

**Step 2: Commit**

```bash
cd /Users/nick/Documents/code/tevy_services && git add scripts/seo-agent/content.ts && git commit -m "feat: add content generation module with image pool"
```

---

## Task 11: Create SEO Agent — competitors.ts

**Files:**
- Create: `scripts/seo-agent/competitors.ts`

**Step 1: Create competitors module**

Adapt from `/Users/nick/Documents/code/paperroute_website/scripts/seo-agent/competitors.ts`.

**Change COMPETITORS array to:**
```typescript
const COMPETITORS = [
  { name: "South West Alloys", domain: "southwestalloys.com", sitemapUrl: "https://www.southwestalloys.com/sitemap.xml" },
  { name: "Smart World Exeter", domain: "smartworldexeter.co.uk", sitemapUrl: "https://www.smartworldexeter.co.uk/sitemap.xml" },
  { name: "South West Wheel Repairs", domain: "southwestwheelrepairs.com", sitemapUrl: "https://www.southwestwheelrepairs.com/sitemap.xml" },
  { name: "DA Techs", domain: "datechs.co.uk", sitemapUrl: "https://datechs.co.uk/sitemap.xml" },
  { name: "Garnish Exeter", domain: "garnish-uk.com", sitemapUrl: "https://www.garnish-uk.com/sitemap.xml" },
  { name: "Revive Exeter", domain: "revive-uk.com", sitemapUrl: "https://revive-uk.com/sitemap.xml" },
];
```

**Change User-Agent to:** `"TevyServices-SEO-Agent/1.0"`

Everything else (fetchSitemap, checkCompetitors, sitemap index handling, 10s timeout, error handling) is identical.

**Step 2: Commit**

```bash
cd /Users/nick/Documents/code/tevy_services && git add scripts/seo-agent/competitors.ts && git commit -m "feat: add competitor tracking module"
```

---

## Task 12: Create SEO Agent — linking.ts

**Files:**
- Create: `scripts/seo-agent/linking.ts`

**Step 1: Create linking module**

Copy from `/Users/nick/Documents/code/paperroute_website/scripts/seo-agent/linking.ts` — this module is site-agnostic and needs NO changes except importing from local config.

**Step 2: Commit**

```bash
cd /Users/nick/Documents/code/tevy_services && git add scripts/seo-agent/linking.ts && git commit -m "feat: add internal linking module"
```

---

## Task 13: Create SEO Agent — strategy.ts

**Files:**
- Create: `scripts/seo-agent/strategy.ts`

**Step 1: Create strategy module**

Adapt from `/Users/nick/Documents/code/paperroute_website/scripts/seo-agent/strategy.ts`.

Key changes:
- Update the Claude prompt context: "You are a technical SEO consultant analysing tevyservices.co.uk, an alloy wheel repair and tyre services company targeting car owners in Exeter and Devon"
- Update recommendation context to focus on:
  1. New pages (location pages for more Devon areas, comparison pages, pricing pages)
  2. Technical SEO (schema for automotive services, FAQ schema for common questions)
  3. Content gaps (topics not covered by blog)
  4. Quick wins (keywords close to page 1)
  5. Competitive opportunities (content no competitor has)
- Remove waste collection references, add alloy wheel repair context
- **CRITICAL RULES:** Do NOT recommend things that already exist (the site already has schema markup, service pages, location pages for Newton Abbot & Torquay)

**Step 2: Commit**

```bash
cd /Users/nick/Documents/code/tevy_services && git add scripts/seo-agent/strategy.ts && git commit -m "feat: add SEO strategy recommendation engine"
```

---

## Task 14: Create SEO Agent — publish.ts

**Files:**
- Create: `scripts/seo-agent/publish.ts`

**Step 1: Create publish module**

Adapt from `/Users/nick/Documents/code/paperroute_website/scripts/seo-agent/publish.ts`.

Key changes:
- Update session log entry heading: `"Automated Weekly SEO Agent Run"` (not monthly — Tevy runs weekly)
- Everything else (updateSessionLog, publishToMain, git config, temp file commit message, pull --rebase) is identical

**Step 2: Commit**

```bash
cd /Users/nick/Documents/code/tevy_services && git add scripts/seo-agent/publish.ts && git commit -m "feat: add git publishing module"
```

---

## Task 15: Create SEO Agent — email.ts

**Files:**
- Create: `scripts/seo-agent/email.ts`

**Step 1: Create email module**

Adapt from `/Users/nick/Documents/code/paperroute_website/scripts/seo-agent/email.ts`.

Key changes:
- Header background colour: `#3E797F` (Tevy teal) instead of PaperRoute's `#0c2340`
- Report title: `"TEVY Services SEO Report — ${monthYear}"`
- Footer text: `"TEVY Services SEO Agent · Automated weekly report"`
- All other HTML structure, formatting functions, and Resend integration are identical

**Step 2: Commit**

```bash
cd /Users/nick/Documents/code/tevy_services && git add scripts/seo-agent/email.ts && git commit -m "feat: add email report module"
```

---

## Task 16: Create SEO Agent — supabase.ts

**Files:**
- Create: `scripts/seo-agent/supabase.ts`

**Step 1: Create supabase module**

Adapt from `/Users/nick/Documents/code/paperroute_website/scripts/seo-agent/supabase.ts`.

Key changes:
- `TABLE_NAME = "tevyservices_runs"` (not paperroute_runs)
- Update note-to-self prompt: "You are an SEO agent for TEVY Services (tevyservices.co.uk), an alloy wheel repair and tyre services company in Exeter, Devon"
- Everything else (RunData interface, getSupabaseClient, getPreviousNote, generateNoteToSelf, logRun) is identical

**Step 2: Commit**

```bash
cd /Users/nick/Documents/code/tevy_services && git add scripts/seo-agent/supabase.ts && git commit -m "feat: add Supabase logging module"
```

---

## Task 17: Create SEO Agent — index.ts (Pipeline Orchestrator)

**Files:**
- Create: `scripts/seo-agent/index.ts`

**Step 1: Create pipeline orchestrator**

Adapt from `/Users/nick/Documents/code/paperroute_website/scripts/seo-agent/index.ts`.

Key changes:
- Console log: `"=== TEVY Services Weekly SEO Agent ==="` (not monthly, not PaperRoute)
- Everything else is structurally identical — same 6 stages, same error handling, same Supabase logging

**Step 2: Build test the agent (syntax check only)**

```bash
cd /Users/nick/Documents/code/tevy_services && npx tsx --eval "import './scripts/seo-agent/index'" 2>&1 | head -5
```

This will fail at runtime (no env vars) but should NOT have import/syntax errors.

**Step 3: Commit**

```bash
cd /Users/nick/Documents/code/tevy_services && git add scripts/seo-agent/index.ts && git commit -m "feat: add SEO agent pipeline orchestrator"
```

---

## Task 18: Create GitHub Actions Workflow

**Files:**
- Create: `.github/workflows/seo-agent.yml`

**Step 1: Create workflow**

```yaml
name: SEO Agent (Weekly)

on:
  schedule:
    - cron: '0 9 * * 1'
  workflow_dispatch: {}

permissions:
  contents: write
  pull-requests: write

jobs:
  seo-agent:
    runs-on: ubuntu-latest

    steps:
      - name: Random delay (09:00-15:00 window)
        if: github.event_name == 'schedule'
        run: |
          DELAY=$((RANDOM % 21600))
          echo "Sleeping for $((DELAY / 60)) minutes before starting..."
          sleep $DELAY

      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run SEO Agent
        run: npx tsx scripts/seo-agent/index.ts
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
          GOOGLE_SERVICE_ACCOUNT_KEY: ${{ secrets.GOOGLE_SERVICE_ACCOUNT_KEY }}
          RESEND_API_KEY: ${{ secrets.RESEND_API_KEY }}
          REPORT_EMAIL: ${{ secrets.REPORT_EMAIL }}
          GH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
```

**Step 2: Remove old blog generation workflow if it exists**

Check if `.github/workflows/blog-generation.yml` exists and remove it.

**Step 3: Commit**

```bash
cd /Users/nick/Documents/code/tevy_services && git add .github/workflows/seo-agent.yml && git commit -m "feat: add weekly SEO agent GitHub Actions workflow"
```

---

## Task 19: Register in SEO Portal

**Files (in `/Users/nick/Documents/code/seo-admin`):**
- Modify: `src/lib/sites.ts` — add to KNOWN_SITES
- Modify: `src/lib/workflows.ts` — add to KNOWN_WORKFLOWS
- Modify: `src/app/api/strategy/route.ts` — add to SITE_REPOS

**Step 1: Add to KNOWN_SITES in sites.ts**

Add this entry to the `KNOWN_SITES` dictionary:
```typescript
tevyservices: { name: "TEVY Services", url: "tevyservices.co.uk", color: "#3E797F", repo: "sandsltd/tevy_services", workflowFile: "seo-agent.yml" },
```

**Step 2: Add to KNOWN_WORKFLOWS in workflows.ts**

```typescript
tevyservices: { repo: "sandsltd/tevy_services", workflowFile: "seo-agent.yml" },
```

**Step 3: Add to SITE_REPOS in strategy/route.ts**

```typescript
tevyservices: "sandsltd/tevy_services",
```

**Step 4: Commit portal changes**

```bash
cd /Users/nick/Documents/code/seo-admin && git add src/lib/sites.ts src/lib/workflows.ts src/app/api/strategy/route.ts && git commit -m "feat: register TEVY Services in SEO portal"
```

---

## Task 20: Create Supabase Table

**Files:** None (Supabase SQL)

**Step 1: Provide SQL for user to run in Supabase SQL editor**

```sql
CREATE TABLE tevyservices_runs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  trigger_type TEXT,
  status TEXT,
  duration_seconds INTEGER,
  error_message TEXT,
  keywords_tracked INTEGER,
  avg_position NUMERIC,
  total_clicks INTEGER,
  total_impressions INTEGER,
  rankings_data JSONB,
  blog_post_title TEXT,
  blog_post_keyword TEXT,
  blog_post_slug TEXT,
  blog_post_is_refresh BOOLEAN,
  blog_post_refresh_reason TEXT,
  blog_post_word_count INTEGER,
  links_added INTEGER,
  linking_details JSONB,
  competitor_data JSONB,
  recommendations JSONB,
  session_summary TEXT,
  ai_note_to_self TEXT
);

CREATE INDEX idx_tevyservices_runs_created ON tevyservices_runs(created_at DESC);
```

Also create agent_triggers table if it doesn't exist:
```sql
CREATE TABLE IF NOT EXISTS agent_triggers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  site_slug TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_agent_triggers_slug ON agent_triggers(site_slug, created_at DESC);
```

**Step 2: Tell user which GitHub Secrets need configuring**

| Secret | Description |
|--------|-------------|
| `ANTHROPIC_API_KEY` | Anthropic API key for Claude content generation |
| `GOOGLE_SERVICE_ACCOUNT_KEY` | Full JSON content of GSC service account key |
| `RESEND_API_KEY` | Resend API key for email reports |
| `REPORT_EMAIL` | Email address for reports (hello@saunders-simmons.co.uk) |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key |

---

## Task 21: Final Build Verification

**Step 1: Build the full site**

```bash
cd /Users/nick/Documents/code/tevy_services && npx next build
```

Expected: Build succeeds. Blog listing page and dynamic `[slug]` route are listed.

**Step 2: Verify blog routes work**

Start dev server and check:
- `/blog` — listing page loads, shows all 9 migrated posts with images
- `/blog/alloy-wheel-repair-exeter` — post page loads, MDX renders, hero image shows
- `/blog/diamond-cut-vs-painted-alloys` — oldest post loads correctly

**Step 3: Check sitemap**

```bash
cd /Users/nick/Documents/code/tevy_services && curl http://localhost:3000/sitemap.xml 2>/dev/null | head -50
```

Expected: All blog post URLs included with correct dates.

---

## Task 22: Google Search Console Setup Instructions

This is a manual step for the user. Provide clear instructions:

1. **Create/use a Google Cloud project**
2. **Enable the Google Search Console API** in the project
3. **Create a Service Account** (no special roles needed)
4. **Generate a JSON key** for the service account
5. **Add the service account email** as Owner in GSC for `sc-domain:tevyservices.co.uk`
6. **Store the JSON key** as GitHub secret `GOOGLE_SERVICE_ACCOUNT_KEY`

---

## Summary of All Commits

1. `chore: add SEO agent and blog infrastructure dependencies`
2. `chore: add 50 blog hero images for SEO agent`
3. `feat: add blog library for MDX content management`
4. `feat: migrate 9 blog posts from hardcoded JSX to MDX`
5. `feat: add dynamic MDX blog routes replacing hardcoded posts`
6. `feat: dynamic sitemap with MDX blog post auto-discovery`
7. `feat: add SEO strategy document with keyword tracker`
8. `feat: add SEO agent configuration`
9. `feat: add rankings module with GSC integration`
10. `feat: add content generation module with image pool`
11. `feat: add competitor tracking module`
12. `feat: add internal linking module`
13. `feat: add SEO strategy recommendation engine`
14. `feat: add git publishing module`
15. `feat: add email report module`
16. `feat: add Supabase logging module`
17. `feat: add SEO agent pipeline orchestrator`
18. `feat: add weekly SEO agent GitHub Actions workflow`
19. `feat: register TEVY Services in SEO portal` (in seo-admin repo)
