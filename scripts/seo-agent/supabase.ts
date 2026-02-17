import { createClient } from "@supabase/supabase-js";
import Anthropic from "@anthropic-ai/sdk";
import { CONFIG } from "./config";

const TABLE_NAME = "tevy_services_runs";

export interface RunData {
  trigger_type: "scheduled" | "manual";
  status: "success" | "error";
  duration_seconds: number;
  error_message: string | null;

  // Rankings
  keywords_tracked: number;
  avg_position: number | null;
  total_clicks: number;
  total_impressions: number;
  rankings_data: Record<string, unknown>[] | null;

  // Content
  blog_post_title: string | null;
  blog_post_keyword: string | null;
  blog_post_slug: string | null;
  blog_post_is_refresh: boolean | null;
  blog_post_refresh_reason: string | null;
  blog_post_word_count: number | null;

  // Linking
  links_added: number;
  linking_details: { postTitle: string; linksAdded: number }[] | null;

  // Competitors
  competitor_data: Record<string, unknown>[] | null;

  // Recommendations
  recommendations: Record<string, unknown>[] | null;

  // Summary
  session_summary: string;
  ai_note_to_self: string | null;
}

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    return null;
  }

  return createClient(url, key);
}

export async function getPreviousNote(): Promise<string | null> {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      console.warn("Supabase not configured — skipping previous note fetch.");
      return null;
    }

    const { data, error } = await supabase
      .from(TABLE_NAME)
      .select("ai_note_to_self")
      .not("ai_note_to_self", "is", null)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      console.warn("No previous AI note found:", error?.message || "no data");
      return null;
    }

    return data.ai_note_to_self;
  } catch (err) {
    console.warn("Failed to fetch previous note:", err);
    return null;
  }
}

export async function generateNoteToSelf(context: {
  rankingsSummary: string;
  whatWasPublished: string;
  competitorActivity: string;
  recommendations: string;
  previousNote: string | null;
}): Promise<string | null> {
  try {
    const anthropic = new Anthropic();

    const response = await anthropic.messages.create({
      model: CONFIG.contentModel,
      max_tokens: 512,
      messages: [
        {
          role: "user",
          content: `You are an SEO agent for TEVY Services (tevyservices.co.uk), a mobile alloy wheel repair and tyre services company in Exeter, Devon. You run monthly and log a strategic note to yourself for the next run.

Write a concise note (2-4 sentences) for your future self focusing on:
- What to prioritise next run
- Any competitor moves worth responding to
- Keyword momentum or decline to watch
- Any unfinished work or follow-ups needed

## This Run's Context

### Rankings Summary
${context.rankingsSummary}

### What Was Published
${context.whatWasPublished}

### Competitor Activity
${context.competitorActivity}

### Recommendations Generated
${context.recommendations}

### Previous Note To Self
${context.previousNote || "No previous note (first run)."}

Respond with ONLY the note text, no preamble or formatting.`,
        },
      ],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";
    return text.trim() || null;
  } catch (err) {
    console.warn("Failed to generate note-to-self:", err);
    return null;
  }
}

export async function logRun(data: RunData): Promise<void> {
  try {
    const supabase = getSupabaseClient();
    if (!supabase) {
      console.warn("Supabase not configured — skipping run logging.");
      return;
    }

    const { error } = await supabase.from(TABLE_NAME).insert(data);

    if (error) {
      console.warn("Failed to log run to Supabase:", error.message);
    } else {
      console.log("Run logged to Supabase successfully.");
    }
  } catch (err) {
    console.warn("Failed to log run to Supabase:", err);
  }
}
