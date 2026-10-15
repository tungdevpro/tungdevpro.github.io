import type { CollectionEntry } from "astro:content";

type Post = CollectionEntry<"blog">;

export function makePost(
  overrides: {
    slug?: string;
    body?: string;
    data?: Partial<Post["data"]>;
  } = {},
): Post {
  const slug = overrides.slug ?? "post";
  return {
    id: `${slug}.md`,
    slug,
    body: overrides.body ?? "Some words here.",
    collection: "blog",
    data: {
      author: "andrewdo",
      pubDatetime: new Date("2024-01-01T00:00:00Z"),
      title: `Title ${slug}`,
      description: `Description ${slug}`,
      tags: ["others"],
      ...overrides.data,
    },
  } as unknown as Post;
}
