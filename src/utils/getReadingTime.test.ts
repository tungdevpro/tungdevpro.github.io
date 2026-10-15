import { describe, expect, it } from "vitest";
import getReadingTime from "./getReadingTime";

const words = (n: number) => Array.from({ length: n }, () => "word").join(" ");

describe("getReadingTime", () => {
  it("returns at least 1 minute for an empty body", () => {
    expect(getReadingTime("")).toBe(1);
    expect(getReadingTime("   \n\n ")).toBe(1);
  });

  it("returns 1 minute for exactly 200 words", () => {
    expect(getReadingTime(words(200))).toBe(1);
  });

  it("rounds up partial minutes", () => {
    expect(getReadingTime(words(201))).toBe(2);
    expect(getReadingTime(words(950))).toBe(5);
  });

  it("counts words split by any whitespace", () => {
    expect(getReadingTime(`${words(150)}\n\n${words(150)}\t`)).toBe(2);
  });
});
