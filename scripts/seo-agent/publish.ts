import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { CONFIG } from "./config";

function run(cmd: string): string {
  console.log(`> ${cmd}`);
  return execSync(cmd, { encoding: "utf-8", cwd: process.cwd() }).trim();
}

export function updateSessionLog(
  strategyContent: string,
  summary: string
): string {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const newEntry = `### ${today} — Automated Monthly SEO Agent Run
- **What was done:** ${summary}
- **Run type:** Automated (GitHub Actions)
`;

  const sessionLogMarker = "## Session Log";
  const instructionsEnd =
    "> **Instructions for future sessions:**";

  const markerIndex = strategyContent.indexOf(sessionLogMarker);
  if (markerIndex === -1) {
    return strategyContent + "\n\n" + sessionLogMarker + "\n\n" + newEntry;
  }

  const afterMarker = strategyContent.indexOf(instructionsEnd, markerIndex);
  if (afterMarker !== -1) {
    const nextNewline = strategyContent.indexOf("\n\n", afterMarker);
    const insertPoint = nextNewline !== -1 ? nextNewline + 2 : afterMarker;
    return (
      strategyContent.slice(0, insertPoint) +
      newEntry +
      "\n" +
      strategyContent.slice(insertPoint)
    );
  }

  const headerEnd = strategyContent.indexOf("\n", markerIndex);
  return (
    strategyContent.slice(0, headerEnd + 1) +
    "\n" +
    newEntry +
    "\n" +
    strategyContent.slice(headerEnd + 1)
  );
}

export function publishToMain(
  strategyContent: string,
  blogFilename: string | null,
  blogTitle: string | null,
  blogFilesModified: boolean = false
): void {
  const strategyPath = path.join(process.cwd(), CONFIG.strategyDocPath);
  fs.writeFileSync(strategyPath, strategyContent);

  run('git config user.name "github-actions[bot]"');
  run('git config user.email "41898282+github-actions[bot]@users.noreply.github.com"');

  // Stage strategy doc (rankings + session log)
  run(`git add ${CONFIG.strategyDocPath}`);

  // Stage all blog files if internal links were modified, otherwise just the new post
  if (blogFilesModified) {
    run(`git add ${CONFIG.blogContentDir}/`);
  } else if (blogFilename) {
    run(`git add ${CONFIG.blogContentDir}/${blogFilename}`);
  }

  const status = run("git status --porcelain");
  if (!status) {
    console.log("No changes to commit.");
    return;
  }

  const commitMsg = blogTitle
    ? `chore(seo): monthly update — rankings + new blog post`
    : "chore(seo): monthly update — rankings check";

  // Write commit message to file to avoid shell escaping issues
  const msgFile = path.join(process.cwd(), ".commit-msg.tmp");
  fs.writeFileSync(msgFile, commitMsg);
  try {
    run("git commit -F .commit-msg.tmp");
  } finally {
    if (fs.existsSync(msgFile)) fs.unlinkSync(msgFile);
  }
  run("git pull --rebase origin main");
  run("git push origin main");
  console.log("All changes committed and pushed to main.");
}
