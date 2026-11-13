export const STORAGE_KEY = "theranos-vault-v1";
export const SETTINGS_KEY = "theranos-settings-v1";
export const normalize = (value: string) =>
  value
    .trim()
    .toUpperCase()
    .replace(/\s*-\s*/g, "-");
export const expected = [
  "ALL",
  "TT3",
  "SEVERAL",
  "60-108",
  "NO",
  "6-AC",
  "K7Q-51-108-07-38",
];
export function wireFinding(count: string, conclusions: string[]) {
  return `${normalize(count)}-${[...new Set(conclusions)].sort().join("")}`;
}
export const stageForStep = (step: number) =>
  step < 2 ? 0 : step === 2 ? 1 : step < 5 ? 2 : step === 5 ? 3 : 4;
export const completedCount = (step: number) =>
  [2, 3, 5, 6].filter((n) => step >= n).length;
export type Game = {
  team: string;
  members: string;
  duration: number;
  startedAt: number;
  step: number;
  hints: number;
  hintLog: string[];
  completedAt: number | null;
  briefingSeen?: boolean;
  pendingDebrief?: number | null;
  answers: Record<string, string>;
  events: string[];
};
export function newGame(
  team: string,
  members: string,
  duration: number,
  now = Date.now(),
): Game {
  return {
    team: team.trim(),
    members: members.trim(),
    duration,
    startedAt: now,
    step: 0,
    hints: 2,
    hintLog: [],
    completedAt: null,
    briefingSeen: false,
    pendingDebrief: null,
    answers: {},
    events: ["Temporary clearance issued. Investigation started."],
  };
}
export function submit(
  game: Game,
  value: string,
  stage: number,
  now = Date.now(),
): Game {
  if (
    game.completedAt ||
    stage !== stageForStep(game.step) ||
    normalize(value) !== expected[game.step]
  )
    return game;
  return {
    ...game,
    step: game.step + 1,
    answers: { ...game.answers, [game.step]: value },
    completedAt: game.step === 6 ? now : null,
    pendingDebrief: game.step < 6 ? game.step : null,
    events: [
      ...game.events,
      game.step === 6
        ? "Executive override accepted. Evidence secured."
        : `Verification ${game.step + 1} accepted.`,
    ],
  };
}
export const hints = [
  "Focus on the company’s claim about the range of tests, not the blood sample size.",
  "Scan the % failures column and identify the row with the maximum value.",
  "Find the bullet about replacing the claim that Theranos could do every test. Read the two alternatives in order.",
  "Subtract the revised 2015 forecast from the earlier forecast. Then find the historical 2014 figure allegedly presented to an investor.",
  "An estimate about the future is different from a claim about money already earned.",
  "Keep the dates in view. Separate what the bank row shows from what the charging paragraph and earlier emails add.",
  "Follow the order on the physical card. Preserve the leading zero in your knowledge / intent fragment.",
];
export function takeHint(game: Game): Game {
  if (game.hints <= 0 || game.completedAt) return game;
  return {
    ...game,
    hints: game.hints - 1,
    hintLog: [...game.hintLog, hints[game.step]],
    events: [...game.events, "Whistleblower assistance requested."],
  };
}
export function loadGame(): Game | null {
  try {
    const g = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    return g &&
      typeof g.team === "string" &&
      Number.isFinite(g.startedAt) &&
      Number.isFinite(g.duration) &&
      g.duration > 0 &&
      Number.isInteger(g.step) &&
      g.step >= 0 &&
      g.step <= 7 &&
      Array.isArray(g.events) &&
      Array.isArray(g.hintLog)
      ? g
      : null;
  } catch {
    return null;
  }
}
export function durationSetting(): number {
  const n = Number(new URLSearchParams(location.search).get("duration"));
  if ([10, 12, 15].includes(n)) return n;
  try {
    const s = Number(localStorage.getItem(SETTINGS_KEY));
    return [10, 12, 15].includes(s) ? s : 10;
  } catch {
    return 10;
  }
}
export function clock(seconds: number) {
  return `${Math.floor(Math.max(0, seconds) / 60)
    .toString()
    .padStart(
      2,
      "0",
    )}:${(Math.max(0, seconds) % 60).toString().padStart(2, "0")}`;
}
