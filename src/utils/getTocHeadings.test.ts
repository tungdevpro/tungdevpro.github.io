import { describe, expect, it } from "vitest";
import getTocHeadings from "./getTocHeadings";

const h = (depth: number, slug: string) => ({ depth, slug, text: slug });

describe("getTocHeadings", () => {
  it("keeps only h2 and h3", () => {
    const result = getTocHeadings([
      h(1, "title"),
      h(2, "intro"),
      h(3, "detail"),
      h(4, "deep"),
      h(2, "outro"),
    ]);
    expect(result.map((x) => x.slug)).toEqual(["intro", "detail", "outro"]);
  });

  it("returns nothing when fewer than 2 headings remain", () => {
    expect(getTocHeadings([h(2, "only")])).toEqual([]);
    expect(getTocHeadings([])).toEqual([]);
    expect(getTocHeadings([h(1, "a"), h(4, "b"), h(2, "c")])).toEqual([]);
  });

  it("drops a remark-toc 'Table of contents' heading", () => {
    const result = getTocHeadings([
      h(2, "table-of-contents"),
      h(2, "intro"),
      h(2, "outro"),
    ]);
    expect(result.map((x) => x.slug)).toEqual(["intro", "outro"]);
  });
});
