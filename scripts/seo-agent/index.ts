import fs from "fs";
import path from "path";
import { CONFIG } from "./config";
import { checkRankings } from "./rankings";
import { generateBlogPost } from "./content";
import { addInternalLinks } from "./linking";
import { checkCompetitors } from "./competitors";
import { generateRecommendations } from "./strategy";
import { updateSessionLog, publishToMain } from "./publish";
import { sendReport } from "./email";
import { getPreviousNote, generateNoteToSelf, logRun, type RunData } from "./supabase";

async function main() {
  const startTime = Date.now();
  let caughtError: Error | null = null;

  // Data collected across stages for Supabase logging
  let rankings: { keyword: string; position: number | null; clicks: number; impressions: number; previousPosition: string }[] = [];
  let blogPost: Awaited<ReturnType<typeof generateBlogPost>> = null;
  let linkingResult = { total: 0, details: [] as { postTitle: string; linksAdded: number }[] };
  let competitorReport = { competitors: [] as any[] };
  let recommendations: any[] = [];
  let previousNote: string | null = null;
  let sessionSummary = "";

  try {
    console.log("=== TEVY Services Monthly SEO Agent ===\n");

    const strategyPath = path.join(process.cwd(), CONFIG.strategyDocPath);

    if (!fs.existsSync(strategyPath)) {
      throw new Error(`Strategy doc not found: ${strategyPath}`);
    }

    // Fetch previous AI note before starting
    previousNote = await getPreviousNote();
    if (previousNote) {
      console.log(`Previous AI note: ${previousNote}\n`);
    }

    // --- Stage 1: Rankings Check ---
    console.log("--- Stage 1: Checking keyword rankings ---\n");
    const rankingsResult = await checkRankings();
    rankings = rankingsResult.rankings;
    const strategyDocUpdated = rankingsResult.strategyDocUpdated;

    const indexedCount = rankings.filter((r) => r.position !== null).length;
    console.log(
      `\nRankings checked: ${indexedCount}/${rankings.length} keywords indexed.\n`
    );

    // --- Stage 2: Content Generation (new or refresh) ---
    console.log("--- Stage 2: Generating/refreshing blog content ---\n");
    blogPost = await generateBlogPost(strategyDocUpdated, rankings);

    // --- Stage 3: Internal Linking ---
    console.log("--- Stage 3: Adding internal links ---\n");
    linkingResult = await addInternalLinks();
    console.log(`Internal linking: ${linkingResult.total} links added.\n`);

    // --- Stage 4: Competitor Tracking ---
    console.log("--- Stage 4: Checking competitor websites ---\n");
    competitorReport = await checkCompetitors();

    // --- Stage 5: SEO Strategy Analysis ---
    console.log("\n--- Stage 5: Analysing SEO strategy ---\n");
    recommendations = await generateRecommendations(
      strategyDocUpdated,
      rankings
    );
    console.log(`Generated ${recommendations.length} recommendations.\n`);

    // --- Stage 6: Publish & Report ---
    console.log("--- Stage 6: Publishing and reporting ---\n");

    const summaryParts: string[] = [];
    summaryParts.push(
      `Checked rankings for ${rankings.length} keywords (${indexedCount} indexed)`
    );

    if (blogPost) {
      const action = blogPost.isRefresh ? "Refreshed" : "Generated";
      summaryParts.push(
        `${action} blog post: "${blogPost.title}" targeting "${blogPost.targetKeyword}"`
      );
    } else {
      summaryParts.push("No new blog post needed — all planned topics covered");
    }

    if (linkingResult.total > 0) {
      summaryParts.push(`Added ${linkingResult.total} internal links across blog posts`);
    }

    const activeCompetitors = competitorReport.competitors.filter(
      (c: any) => c.recentPages.length > 0
    );
    if (activeCompetitors.length > 0) {
      summaryParts.push(
        `${activeCompetitors.length} competitors have published new content recently`
      );
    }

    summaryParts.push(
      `Generated ${recommendations.length} SEO recommendations`
    );

    sessionSummary = summaryParts.join(". ") + ".";

    // Update session log and publish everything to main
    const finalStrategy = updateSessionLog(strategyDocUpdated, sessionSummary);

    publishToMain(
      finalStrategy,
      blogPost ? blogPost.filename : null,
      blogPost ? blogPost.title : null,
      linkingResult.total > 0
    );

    // Send email report
    await sendReport({
      rankings,
      blogPost: blogPost
        ? {
            title: blogPost.title,
            targetKeyword: blogPost.targetKeyword,
            prUrl: null,
            isRefresh: blogPost.isRefresh,
          }
        : null,
      competitorReport,
      recommendations,
      linksAdded: linkingResult.total,
      sessionSummary,
    });

    console.log("\n=== SEO Agent complete ===");
  } catch (error) {
    caughtError = error instanceof Error ? error : new Error(String(error));
    console.error("SEO Agent failed:", caughtError);
  }

  // --- Supabase Logging (always runs, even after error) ---
  try {
    const durationSeconds = Math.round((Date.now() - startTime) / 1000);
    const triggerType: "scheduled" | "manual" =
      process.env.GITHUB_EVENT_NAME === "schedule" ? "scheduled" : "manual";

    const indexedRankings = rankings.filter((r) => r.position !== null);
    const avgPosition =
      indexedRankings.length > 0
        ? Math.round(
            (indexedRankings.reduce((sum, r) => sum + r.position!, 0) /
              indexedRankings.length) *
              10
          ) / 10
        : null;
    const totalClicks = rankings.reduce((sum, r) => sum + r.clicks, 0);
    const totalImpressions = rankings.reduce((sum, r) => sum + r.impressions, 0);

    // Build context for note-to-self
    const rankingsSummary = rankings
      .map((r) => {
        const pos = r.position !== null ? `#${r.position}` : "Not indexed";
        return `${r.keyword}: ${pos} (prev: ${r.previousPosition}, clicks: ${r.clicks}, impr: ${r.impressions})`;
      })
      .join("\n");

    const whatWasPublished = blogPost
      ? `${blogPost.isRefresh ? "Refreshed" : "Published new"}: "${blogPost.title}" targeting "${blogPost.targetKeyword}" (${blogPost.wordCount} words)${blogPost.refreshReason ? ` — reason: ${blogPost.refreshReason}` : ""}`
      : "No post published this run.";

    const competitorActivity = competitorReport.competitors
      .map((c: any) => `${c.name}: ${c.recentPages?.length || 0} recent pages`)
      .join("\n") || "No competitor data.";

    const recommendationsSummary = recommendations
      .map((r: any) => `[${r.priority}] ${r.title}: ${r.description}`)
      .join("\n") || "No recommendations.";

    const aiNote = await generateNoteToSelf({
      rankingsSummary,
      whatWasPublished,
      competitorActivity: competitorActivity,
      recommendations: recommendationsSummary,
      previousNote,
    });

    if (aiNote) {
      console.log(`\nAI Note to Self: ${aiNote}`);
    }

    const runData: RunData = {
      trigger_type: triggerType,
      status: caughtError ? "error" : "success",
      duration_seconds: durationSeconds,
      error_message: caughtError ? caughtError.message : null,

      keywords_tracked: rankings.length,
      avg_position: avgPosition,
      total_clicks: totalClicks,
      total_impressions: totalImpressions,
      rankings_data: rankings.length > 0 ? rankings : null,

      blog_post_title: blogPost?.title || null,
      blog_post_keyword: blogPost?.targetKeyword || null,
      blog_post_slug: blogPost?.slug || null,
      blog_post_is_refresh: blogPost?.isRefresh ?? null,
      blog_post_refresh_reason: blogPost?.refreshReason || null,
      blog_post_word_count: blogPost?.wordCount || null,

      links_added: linkingResult.total,
      linking_details: linkingResult.details.length > 0 ? linkingResult.details : null,

      competitor_data: competitorReport.competitors.length > 0 ? competitorReport.competitors : null,

      recommendations: recommendations.length > 0 ? recommendations : null,

      session_summary: sessionSummary,
      ai_note_to_self: aiNote,
    };

    await logRun(runData);
  } catch (loggingError) {
    console.warn("Supabase logging failed (non-fatal):", loggingError);
  }

  if (caughtError) {
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("SEO Agent failed:", error);
  process.exit(1);
});
