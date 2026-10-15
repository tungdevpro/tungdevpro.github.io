import type { CollectionEntry } from "astro:content";

type Post = CollectionEntry<"blog">;

const getHomePosts = (
  sortedPosts: Post[],
  featuredLimit = 4,
  recentLimit = 5,
) => {
  const featured = sortedPosts
    .filter(({ data }) => data.featured)
    .slice(0, featuredLimit);
  const featuredIds = new Set(featured.map(({ id }) => id));
  const recent = sortedPosts
    .filter(({ id }) => !featuredIds.has(id))
    .slice(0, recentLimit);
  return { featured, recent };
};

export default getHomePosts;
