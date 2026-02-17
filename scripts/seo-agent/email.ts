import { Resend } from "resend";
import { CONFIG } from "./config";
import type { Recommendation } from "./strategy";
import type { CompetitorReport } from "./competitors";

interface RankingChange {
  keyword: string;
  position: number | null;
  previousPosition: string;
  clicks: number;
  impressions: number;
}

interface EmailReportData {
  rankings: RankingChange[];
  blogPost: {
    title: string;
    targetKeyword: string;
    prUrl: string | null;
    isRefresh: boolean;
  } | null;
  competitorReport: CompetitorReport;
  recommendations: Recommendation[];
  linksAdded: number;
  sessionSummary: string;
}

function formatPositionChange(
  current: number | null,
  previous: string
): string {
  if (current === null && previous === "Not indexed yet") return "—";
  if (current === null) return "Lost";
  if (previous === "Not indexed yet") return `NEW #${current}`;

  const prevMatch = previous.match(/Position ([\d.]+)/);
  if (!prevMatch) return `#${current}`;

  const prev = parseFloat(prevMatch[1]);
  const diff = prev - current;

  if (diff > 0) return `#${current} ▲${diff.toFixed(1)}`;
  if (diff < 0) return `#${current} ▼${Math.abs(diff).toFixed(1)}`;
  return `#${current} —`;
}

function buildCompetitorSection(report: CompetitorReport): string {
  if (report.competitors.length === 0) return "";

  const sections = report.competitors
    .map((comp) => {
      const statusColor = comp.error ? "#dc2626" : "#16a34a";
      const statusText = comp.error
        ? `Could not check: ${comp.error}`
        : `${comp.totalPages} pages indexed`;

      let recentHtml = "";
      if (comp.recentPages.length > 0) {
        const pageRows = comp.recentPages
          .map((p) => {
            const date = p.lastmod
              ? new Date(p.lastmod).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                })
              : "—";
            const pagePath = p.url.replace(/https?:\/\/[^/]+/, "") || "/";
            return `<tr>
              <td style="padding:4px 8px;border-bottom:1px solid #f3f4f6;font-size:12px;color:#4b5563;word-break:break-all;">${pagePath}</td>
              <td style="padding:4px 8px;border-bottom:1px solid #f3f4f6;font-size:12px;color:#6b7280;white-space:nowrap;">${date}</td>
            </tr>`;
          })
          .join("");

        recentHtml = `
          <p style="margin:8px 0 4px;font-size:12px;color:#374151;font-weight:600;">Recent/updated pages:</p>
          <table style="width:100%;border-collapse:collapse;">
            ${pageRows}
          </table>`;
      } else if (!comp.error) {
        recentHtml = `<p style="margin:8px 0 0;font-size:12px;color:#6b7280;">No new pages in the last 3 months.</p>`;
      }

      return `<div style="margin:12px 0;padding:12px 16px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <h3 style="margin:0;font-size:14px;color:#111827;">${comp.name}</h3>
          <span style="font-size:12px;color:${statusColor};">${statusText}</span>
        </div>
        <p style="margin:2px 0 0;font-size:12px;color:#9ca3af;">${comp.domain}</p>
        ${recentHtml}
      </div>`;
    })
    .join("");

  return `<div style="margin:24px 0;">
    <h2 style="margin:0 0 16px;font-size:16px;">Competitor Activity</h2>
    ${sections}
  </div>`;
}

function buildHtml(data: EmailReportData): string {
  const monthYear = new Date().toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  const rankingRows = data.rankings
    .map((r) => {
      const change = formatPositionChange(r.position, r.previousPosition);
      const posColor = change.includes("▲")
        ? "#16a34a"
        : change.includes("▼")
          ? "#dc2626"
          : change.includes("NEW")
            ? "#2563eb"
            : "#6b7280";

      return `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;">${r.keyword}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:${posColor};font-weight:600;">${change}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${r.clicks}</td>
        <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;text-align:center;">${r.impressions}</td>
      </tr>`;
    })
    .join("\n");

  let blogSection: string;
  if (data.blogPost) {
    const action = data.blogPost.isRefresh
      ? "Blog Post Refreshed"
      : "New Blog Post Created";
    const bgColor = data.blogPost.isRefresh ? "#eff6ff" : "#f0fdf4";
    const borderColor = data.blogPost.isRefresh ? "#3b82f6" : "#16a34a";
    const textColor = data.blogPost.isRefresh ? "#1e40af" : "#166534";
    blogSection = `<div style="margin:24px 0;padding:16px;background:${bgColor};border-radius:8px;border-left:4px solid ${borderColor};">
        <h3 style="margin:0 0 8px;color:${textColor};">${action}</h3>
        <p style="margin:0;"><strong>${data.blogPost.title}</strong></p>
        <p style="margin:4px 0 0;color:#6b7280;">Target keyword: ${data.blogPost.targetKeyword}</p>
      </div>`;
  } else {
    blogSection = `<div style="margin:24px 0;padding:16px;background:#fef9c3;border-radius:8px;border-left:4px solid #ca8a04;">
        <p style="margin:0;color:#854d0e;">No new blog post this month — all planned topics have been published.</p>
      </div>`;
  }

  const linkingSection =
    data.linksAdded > 0
      ? `<div style="margin:24px 0;padding:16px;background:#f0fdf4;border-radius:8px;border-left:4px solid #16a34a;">
        <h3 style="margin:0 0 4px;color:#166534;font-size:14px;">Internal Linking</h3>
        <p style="margin:0;font-size:14px;color:#4b5563;">Added ${data.linksAdded} internal cross-links between blog posts to improve SEO.</p>
      </div>`
      : "";

  const competitorSection = buildCompetitorSection(data.competitorReport);

  const recommendationsSection =
    data.recommendations.length > 0
      ? `<div style="margin:24px 0;">
        <h2 style="margin:0 0 16px;font-size:16px;">SEO Recommendations</h2>
        ${data.recommendations
          .map((r) => {
            const priorityColor =
              r.priority === "high"
                ? "#dc2626"
                : r.priority === "medium"
                  ? "#ca8a04"
                  : "#6b7280";
            const priorityBg =
              r.priority === "high"
                ? "#fef2f2"
                : r.priority === "medium"
                  ? "#fef9c3"
                  : "#f9fafb";
            const priorityBorder =
              r.priority === "high"
                ? "#fca5a5"
                : r.priority === "medium"
                  ? "#fde68a"
                  : "#e5e7eb";
            return `<div style="margin:12px 0;padding:14px 16px;background:${priorityBg};border:1px solid ${priorityBorder};border-radius:8px;">
            <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
              <span style="display:inline-block;padding:2px 8px;background:${priorityColor};color:#fff;border-radius:4px;font-size:11px;font-weight:600;text-transform:uppercase;">${r.priority}</span>
              <span style="font-size:12px;color:#6b7280;">${r.category}</span>
            </div>
            <h3 style="margin:0 0 4px;font-size:14px;color:#111827;">${r.title}</h3>
            <p style="margin:0;font-size:13px;color:#4b5563;line-height:1.5;">${r.description}</p>
          </div>`;
          })
          .join("\n")}
      </div>`
      : "";

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f9fafb;padding:24px;">
  <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">
    <div style="background:#3E797F;padding:20px 24px;">
      <h1 style="margin:0;color:#ffffff;font-size:18px;">TEVY Services SEO Report — ${monthYear}</h1>
    </div>
    <div style="padding:24px;">
      <h2 style="margin:0 0 16px;font-size:16px;">Keyword Rankings</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <thead>
          <tr style="background:#f8fafc;">
            <th style="padding:8px 12px;text-align:left;border-bottom:2px solid #e5e7eb;">Keyword</th>
            <th style="padding:8px 12px;text-align:left;border-bottom:2px solid #e5e7eb;">Position</th>
            <th style="padding:8px 12px;text-align:center;border-bottom:2px solid #e5e7eb;">Clicks</th>
            <th style="padding:8px 12px;text-align:center;border-bottom:2px solid #e5e7eb;">Impr.</th>
          </tr>
        </thead>
        <tbody>
          ${rankingRows}
        </tbody>
      </table>

      ${blogSection}

      ${linkingSection}

      ${competitorSection}

      ${recommendationsSection}

      <div style="margin-top:24px;padding:16px;background:#f8fafc;border-radius:8px;">
        <h3 style="margin:0 0 8px;font-size:14px;color:#374151;">Session Summary</h3>
        <p style="margin:0;font-size:14px;color:#6b7280;">${data.sessionSummary}</p>
      </div>
    </div>
    <div style="padding:16px 24px;background:#f3f4f6;font-size:13px;color:#6b7280;">
      TEVY Services SEO Agent &middot; Automated monthly report
    </div>
  </div>
</body>
</html>`;
}

export async function sendReport(data: EmailReportData): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const reportEmail = process.env.REPORT_EMAIL;

  if (!apiKey || !reportEmail) {
    console.warn("Missing RESEND_API_KEY or REPORT_EMAIL — skipping email.");
    return;
  }

  const resend = new Resend(apiKey);
  const monthYear = new Date().toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });

  const result = await resend.emails.send({
    from: CONFIG.emailFrom,
    to: reportEmail,
    subject: `${CONFIG.emailSubjectPrefix} — ${monthYear}`,
    html: buildHtml(data),
  });

  console.log("Resend response:", JSON.stringify(result));
  console.log(`Report email sent to ${reportEmail}`);
}
