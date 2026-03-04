# Tevy Services — SEO Agent Setup Design

## Business Context

**Tevy Services** — mobile & workshop-based alloy wheel repair and tyre services in Exeter, Devon (expanding to Newton Abbot, Torquay).

- **Domain:** tevyservices.co.uk
- **Services:** Diamond cut alloy refurbishment, painted alloy repair, tyre repair/replacement, TPMS
- **Location:** Marsh Barton workshop, Exeter + mobile service across Devon
- **Repo:** sandsltd/tevy_services
- **Portal slug:** tevyservices
- **Brand color:** #3E797F (teal)

## Current State

- Next.js 14 App Router, TypeScript, Tailwind CSS
- 10 hardcoded blog posts (individual `app/blog/[title]/page.tsx` routes)
- Full SEO setup: schema markup, sitemap.xml, robots.txt, meta tags, Google Analytics
- Service pages: diamond cut, painted alloys, tyre repair, tyre replacement, TPMS
- Location pages: Newton Abbot, Torquay
- No SEO agent, no MDX infrastructure, no `scripts/` directory

## Target State

- MDX-based blog (all 10 existing posts migrated + dynamic `[slug]` route)
- Automated SEO agent pipeline (9 modules in `scripts/seo-agent/`)
- Weekly GitHub Actions workflow
- Integrated into SEO portal as `tevyservices`
- Supabase logging (`tevyservices_runs` table)
- Weekly email reports to hello@saunders-simmons.co.uk

## Key Decisions

1. **Blog migration:** Convert all 10 existing hardcoded posts to MDX files in `content/blog/`. Replace individual route folders with single dynamic `[slug]/page.tsx`. Preserve all existing URLs.

2. **MDX approach:** `gray-matter` + `next-mdx-remote/rsc` with `src/lib/blog.ts` library (per playbook).

3. **Image pool:** 50 WebP images already prepared at `/Users/nick/Documents/code/images/alloy-repair-exeter/webp/`. Categories:
   - Wheels/rims (01-10)
   - Mechanics/garage (11-20)
   - Welding/workshop (21-29)
   - Car care/detailing (30)
   - Luxury cars (31-38)
   - Customer/sales (39-43)
   - Sports cars (44-45)
   - Car washing (46-47)
   - Restoration (48-50)

4. **Email sender:** hello@saunders-simmons.co.uk
5. **Workflow file:** seo-agent.yml
6. **GSC site URL:** sc-domain:tevyservices.co.uk

## Portal Registration

Update 3 files in `/Users/nick/Documents/code/seo-admin`:
- `src/lib/sites.ts` — add to KNOWN_SITES
- `src/lib/workflows.ts` — add to KNOWN_WORKFLOWS
- `src/app/api/strategy/route.ts` — add to SITE_REPOS

## Phases

| Phase | Description |
|-------|-------------|
| 1 | Market research, keyword strategy, `docs/seo-strategy.md` |
| 2 | GSC setup instructions for user |
| 3 | Blog migration (10 posts to MDX) + infrastructure |
| 4 | SEO agent modules (9 files in `scripts/seo-agent/`) |
| 5 | GitHub Actions workflow |
| 6 | Secrets & environment documentation |
| 7 | Supabase table creation |
| 7a | Portal registration (3 files) |
| 8 | Testing & verification |
