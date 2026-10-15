import { describe, expect, it } from "vitest";
import { makePost } from "../test/makePost";
import getHomePosts from "./getHomePosts";

const slugs = (posts: { slug: string }[]) => posts.map((p) => p.slug);

describe("getHomePosts", () => {
  it("takes the first 4 featured posts in the given (newest-first) order", () => {
    const posts = ["a", "b", "c", "d", "e", "f"].map((slug) =>
      makePost({ slug, data: { featured: true } }),
    );
    expect(slugs(getHomePosts(posts).featured)).toEqual(["a", "b", "c", "d"]);
  });

  it("fills recent with the next 5 posts not shown in featured", () => {
    const posts = Array.from({ length: 12 }, (_, i) =>
      makePost({ slug: `p${i}`, data: { featured: i % 2 === 0 } }),
    );
    const { featured, recent } = getHomePosts(posts);
    expect(slugs(featured)).toEqual(["p0", "p2", "p4", "p6"]);
    expect(slugs(recent)).toEqual(["p1", "p3", "p5", "p7", "p8"]);
  });

  it("never repeats a post across sections", () => {
    const posts = Array.from({ length: 14 }, (_, i) =>
      makePost({ slug: `p${i}`, data: { featured: true } }),
    );
    const { featured, recent } = getHomePosts(posts);
    const all = [...slugs(featured), ...slugs(recent)];
    expect(new Set(all).size).toBe(all.length);
    expect(featured).toHaveLength(4);
    expect(recent).toHaveLength(5);
  });

  it("returns an empty featured list when nothing is featured", () => {
    const posts = ["a", "b"].map((slug) => makePost({ slug }));
    const { featured, recent } = getHomePosts(posts);
    expect(featured).toEqual([]);
    expect(slugs(recent)).toEqual(["a", "b"]);
  });

  it("handles fewer posts than the limits", () => {
    const posts = [makePost({ slug: "only", data: { featured: true } })];
    const { featured, recent } = getHomePosts(posts);
    expect(slugs(featured)).toEqual(["only"]);
    expect(recent).toEqual([]);
  });
});
