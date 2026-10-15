import { describe, expect, it } from "vitest";
import { makePost } from "../test/makePost";
import toSearchItems from "./toSearchItems";

describe("toSearchItems", () => {
  it("keeps only the fields the palette needs, in input order", () => {
    const posts = [
      makePost({
        slug: "b",
        data: {
          title: "Bloc",
          description: "State",
          pubDatetime: new Date("2025-03-26T21:45:00Z"),
          tags: ["flutter", "bloc"],
        },
      }),
      makePost({ slug: "a" }),
    ];
    const items = toSearchItems(posts);
    expect(items[0]).toEqual({
      title: "Bloc",
      description: "State",
      slug: "b",
      pubDatetime: "2025-03-26T21:45:00.000Z",
      tags: ["flutter", "bloc"],
    });
    expect(items.map((i) => i.slug)).toEqual(["b", "a"]);
  });

  it("returns an empty list for no posts", () => {
    expect(toSearchItems([])).toEqual([]);
  });
});
