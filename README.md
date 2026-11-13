# Theranos: The Evidence Vault

A complete static classroom escape room built with React, TypeScript, and Vite. No database, credentials, API keys, analytics, or backend are required. Progress stays in localStorage on each team's device. All necessary evidence excerpts, tables, and the original warning-email scans are bundled locally. Original PDFs remain linked for provenance.

## Run

Install Node.js 22 or later, then:

```sh
npm ci
npm run dev
```

Open the printed localhost URL. Build with `npm run build`, and inspect the production output with `npm run preview`. Deploy the **contents of `dist/`** to any static host. `npm test` runs game logic tests. `npx playwright install chromium` followed by `npm run test:e2e` runs the browser happy path and mobile checks.

For the already-built copy in this workspace, `sh scripts/preview.sh` starts a local preview. It can use the temporary Node runtime downloaded for verification on this machine; a normal Node.js installation is recommended for ongoing development.

## GitHub Pages

1. Push this project to a GitHub repository on the `main` branch. If your branch uses a different name, update `.github/workflows/pages.yml`.
2. In repository **Settings → Pages**, choose **GitHub Actions** as the build source.
3. The included workflow installs from the lockfile, tests, builds, and deploys `dist/`. The Actions run shows the public URL.

Vite uses relative asset paths, so repository subdirectories work. The presenter uses a hash route (`https://YOUR-NAME.github.io/YOUR-REPO/#/presenter`), so direct links and refreshes work without server rewrite rules. For Netlify or Vercel use build command `npm run build` and output directory `dist`.

## Before class

Open `#/presenter` and confirm the spoiler gate. Print the **override card** and **blank paper worksheet** using their individual buttons. Tape one or more identical cards under the front lip of the podium where a runner can safely read them without touching electronics or moving furniture. Keep the presenter screen off the student projector.

Choose 10, 12, or 15 minutes and copy the student link from presenter tools. Settings persist only on the presenter device; use the supplied `?duration=12` (or 10/15) link to configure other devices. An existing investigation retains its original duration.

Make teams of 4–5. Give the live introduction separately from the game timer. Students enter a team name and wait for “Go” before pressing **Enter database / start**. No synchronization server is needed. Ask each team to use one browser tab/device. A refresh preserves the start timestamp and progress; the timer continues while away. There are two optional hint credits. At zero the game retains evidence and allows completion; verbally decide whether to stop or continue. The first team to show the success screen wins. There is no shared leaderboard.

On first entry, a short whistleblower message reminds teams of the mission. Dismissing it is saved with the session. The archive opens at its root directory: teams open folders and documents themselves. Findings update access permissions, including the QC record inside the first folder; newly available files never open automatically. Teams can return to the root through the breadcrumb or sidebar. Puzzles use indirect investigative prompts, and source text and figures have neutral typography. Case 04 asks teams to identify the transaction and evaluate several conclusions against the timeline, the table, and the charging paragraph. Both the count and the exact set of supported conclusions must be right; there is no arithmetic task. Detailed guidance is available through optional hints; evidence explanations sit in expandable context after a case is solved.

Each correct evidence finding also opens a short case-context popup connecting the specific answer to its legal or evidentiary significance. It identifies relevant sources and preserves the distinctions between internal records, allegations, and proof of fraud. Close it with **Return to files** or Escape; it stays open until dismissed so teams can read at their own pace. An unread popup survives refresh. These notes never reveal unsolved findings or the physical credential. The final credential leads directly to the victory screen.

## Rehearse (spoilers)

1. Case 01: `ALL`, then `TT3` → F fragment `51`.
2. Case 02: `SEVERAL` → I fragment `07`.
3. Case 03: `60-108`, then **No** → M fragment `108`.
4. Case 04: identify Count `6` and select the conclusions that the payment followed the marketing warnings and that the charging paragraph places it in the alleged scheme. Reject the later-model cause and the claim that the table reveals what the investor was told. This unlocks W fragment `38`.
5. Physical card: token `K7Q`, order F–M–I–W. Final input: `K7Q-51-108-07-38`.

Case is ignored, surrounding whitespace is trimmed, and spaces around hyphens are accepted. Group structure and the leading zero are required. The final credential works only after all stages. Solved documents stay readable; the evidence notebook can be printed during play or after completion. “Start over” asks for confirmation and clears that device's session. Presenter reset does the same. Two views of the same session should not be played simultaneously.

## Historical and legal framing

The archive begins with internal records from 2013–2015, then introduces later SEC and federal-court filings. Source dates, excerpts, data, allegations, charges, and adjudicated outcomes are identified. QC failures are **not patient error rates**. F/M/I/W are simplified pedagogical categories, not complete jury instructions. The instructor includes a 3–5 minute debrief and the complete source registry. No claim is made that each exhibit individually caused a conviction.

The original Exhibit 3981 pages were downloaded from the Northern District of California court source and rendered locally with `scripts/render-exhibit.py` (PyMuPDF). Both financial tables were checked against Exhibit 2623, pages 1 and 2. They include all four years and all eleven columns, with the model's original values. The linked originals are authoritative. Source metadata, financial data, and links live in `src/data.ts`.

## Static-site limits

The presenter gate prevents accidental viewing; it is not authentication. Answers and instructor content are necessarily inspectable in static source code. Students should follow the classroom rules. The UI never reveals the card's token or ordering on student screens. No personal information is transmitted; optional member names remain in this browser's storage. Browser storage must be available for refresh persistence. Downloaded source images work without external services; external links and optional web fonts need connectivity (system-font fallbacks are provided).
