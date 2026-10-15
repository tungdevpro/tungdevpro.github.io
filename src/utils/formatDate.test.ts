import { describe, expect, it } from "vitest";
import formatDate from "./formatDate";

describe("formatDate", () => {
  it("formats as MMM DD, YYYY", () => {
    expect(formatDate(new Date("2026-07-20T15:30:00Z"))).toBe("Jul 20, 2026");
  });

  it("uses UTC so late-evening UTC posts keep their date", () => {
    expect(formatDate(new Date("2024-08-14T22:30:00Z"))).toBe("Aug 14, 2024");
    expect(formatDate(new Date("2024-08-14T00:30:00Z"))).toBe("Aug 14, 2024");
  });

  it("pads single-digit days", () => {
    expect(formatDate(new Date("2024-09-07T20:31:00Z"))).toBe("Sep 07, 2024");
  });
});
