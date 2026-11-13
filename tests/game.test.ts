import { describe, it, expect } from "vitest";
import {
  newGame,
  submit,
  normalize,
  stageForStep,
  completedCount,
  takeHint,
  wireFinding,
} from "../src/game";
describe("classroom investigation", () => {
  it("normalizes case and whitespace without dropping hyphens or leading zeroes", () => {
    expect(normalize("  k7q - 51 - 108 - 07 - 38  ")).toBe("K7Q-51-108-07-38");
    expect(normalize("6 AC")).not.toBe("6-AC");
    expect(normalize("K7Q-51-108-7-38")).not.toBe("K7Q-51-108-07-38");
  });
  it("rejects skipped stages, wrong findings, and early final credentials", () => {
    const g = newGame("Test", "", 10, 1000);
    expect(submit(g, "SEVERAL", 1)).toBe(g);
    expect(submit(g, "ALL", 3)).toBe(g);
    expect(submit(g, "K7Q-51-108-07-38", 0)).toBe(g);
    expect(completedCount(1)).toBe(0);
  });
  it("completes the full sequence, gates fragments, and freezes completion", () => {
    let g = newGame("Test", "", 12, 1000);
    const answers = [
      " all ",
      "tt3",
      " several ",
      "60 - 108",
      "no",
      "6 - ac",
      "k7q-51-108-07-38",
    ];
    const counts = [0, 1, 2, 2, 3, 4, 4];
    answers.forEach((answer, i) => {
      const old = g;
      g = submit(g, answer, stageForStep(g.step), 2000 + i);
      expect(g).not.toBe(old);
      expect(completedCount(g.step)).toBe(counts[i]);
      expect(g.startedAt).toBe(1000);
      expect(g.pendingDebrief).toBe(i < 6 ? i : null);
    });
    expect(g.completedAt).toBe(2006);
    expect(submit(g, answers[6], 4, 9000)).toBe(g);
  });
  it("requires both revenue figures and the judgment before awarding materiality", () => {
    let g = { ...newGame("Test", "", 10), step: 3 };
    expect(submit(g, "60", 2)).toBe(g);
    expect(submit(g, "108", 2)).toBe(g);
    g = submit(g, "60-108", 2);
    expect(completedCount(g.step)).toBe(2);
    expect(submit(g, "YES", 2)).toBe(g);
    g = submit(g, "NO", 2);
    expect(completedCount(g.step)).toBe(3);
  });
  it("spends exactly two hints and keeps an audit trail", () => {
    let g = newGame("Test", "", 10);
    g = takeHint(g);
    expect(g.hints).toBe(1);
    expect(g.hintLog).toHaveLength(1);
    g = takeHint(g);
    expect(g.hints).toBe(0);
    expect(takeHint(g)).toBe(g);
  });
  it("requires the right transfer and all supported conclusions, with no unsupported extras", () => {
    const game = { ...newGame("Review", "", 10), step: 5 };
    expect(submit(game, "6-38", 3)).toBe(game);
    expect(submit(game, wireFinding("6", ["A"]), 3)).toBe(game);
    expect(submit(game, wireFinding("6", ["A", "B", "C"]), 3)).toBe(game);
    expect(submit(game, wireFinding("7", ["A", "C"]), 3)).toBe(game);
    expect(submit(game, wireFinding("6", ["C", "A"]), 3).step).toBe(6);
  });
});
