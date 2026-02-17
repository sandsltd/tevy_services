import { google } from "googleapis";
import fs from "fs";
import path from "path";
import { CONFIG } from "./config";

interface KeywordRanking {
  keyword: string;
  position: number | null;
  clicks: number;
  impressions: number;
  previousPosition: string;
}

interface RankingsResult {
  rankings: KeywordRanking[];
  strategyDocUpdated: string;
}

function getSearchConsoleClient() {
  const keyJson = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (!keyJson) throw new Error("Missing GOOGLE_SERVICE_ACCOUNT_KEY");

  const key = JSON.parse(keyJson);
  const auth = new google.auth.GoogleAuth({
    credentials: key,
    scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
  });

  return google.searchconsole({ version: "v1", auth });
}

function parseKeywordsFromStrategy(strategyContent: string): string[] {
  const keywords: string[] = [];
  const tableRowRegex =
    /\|\s*\d+\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|/g;
  let match;

  while ((match = tableRowRegex.exec(strategyContent)) !== null) {
    const keyword = match[1].trim();
    if (keyword && keyword !== "Keyword" && !keyword.startsWith("---")) {
      keywords.push(keyword);
    }
  }

  return [...new Set(keywords)];
}

function parsePreviousPositions(
  strategyContent: string
): Map<string, string> {
  const positions = new Map<string, string>();
  const tableRowRegex =
    /\|\s*\d+\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|\s*([^|]+?)\s*\|/g;
  let match;

  while ((match = tableRowRegex.exec(strategyContent)) !== null) {
    const keyword = match[1].trim();
    const position = match[2].trim();
    if (keyword && keyword !== "Keyword" && !keyword.startsWith("---")) {
      positions.set(keyword, position);
    }
  }

  return positions;
}

export async function checkRankings(): Promise<RankingsResult> {
  const strategyPath = path.join(process.cwd(), CONFIG.strategyDocPath);
  const strategyContent = fs.readFileSync(strategyPath, "utf-8");

  const keywords = parseKeywordsFromStrategy(strategyContent);
  const previousPositions = parsePreviousPositions(strategyContent);

  console.log(`Checking rankings for ${keywords.length} keywords...`);

  let rankings: KeywordRanking[];

  try {
    const searchConsole = getSearchConsoleClient();

    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 28);

    const response = await searchConsole.searchanalytics.query({
      siteUrl: CONFIG.gscSiteUrl,
      requestBody: {
        startDate: startDate.toISOString().split("T")[0],
        endDate: endDate.toISOString().split("T")[0],
        dimensions: ["query"],
        rowLimit: 1000,
      },
    });

    const rows = response.data.rows || [];
    const gscData = new Map(
      rows.map((row) => [
        row.keys![0].toLowerCase(),
        {
          position: Math.round(row.position! * 10) / 10,
          clicks: row.clicks!,
          impressions: row.impressions!,
        },
      ])
    );

    rankings = keywords.map((keyword) => {
      const data = gscData.get(keyword.toLowerCase());
      return {
        keyword,
        position: data ? data.position : null,
        clicks: data ? data.clicks : 0,
        impressions: data ? data.impressions : 0,
        previousPosition: previousPositions.get(keyword) || "Not indexed yet",
      };
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.warn(`GSC query failed (site may not be verified yet): ${message}`);

    rankings = keywords.map((keyword) => ({
      keyword,
      position: null,
      clicks: 0,
      impressions: 0,
      previousPosition: previousPositions.get(keyword) || "Not indexed yet",
    }));
  }

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  let updatedStrategy = strategyContent;

  for (const ranking of rankings) {
    const positionStr =
      ranking.position !== null
        ? `Position ${ranking.position}`
        : "Not indexed yet";

    const rowRegex = new RegExp(
      `(\\|\\s*\\d+\\s*\\|\\s*${escapeRegex(ranking.keyword)}\\s*\\|)\\s*[^|]+\\s*\\|\\s*[^|]+\\s*\\|`,
      "g"
    );
    updatedStrategy = updatedStrategy.replace(
      rowRegex,
      `$1 ${positionStr} | ${today} |`
    );
  }

  return { rankings, strategyDocUpdated: updatedStrategy };
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
