import type { CollectionEntry } from "astro:content";

export type SearchItem = {
  title: string;
  description: string;
  slug: string;
  pubDatetime: string;
  tags: string[];
};

const toSearchItems = (posts: CollectionEntry<"blog">[]): SearchItem[] =>
  posts.map(({ slug, data }) => ({
    title: data.title,
    description: data.description,
    slug,
    pubDatetime: data.pubDatetime.toISOString(),
    tags: data.tags,
  }));

export default toSearchItems;
