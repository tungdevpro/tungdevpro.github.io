import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import getSortedPosts from "@utils/getSortedPosts";
import toSearchItems from "@utils/toSearchItems";

export const GET: APIRoute = async () => {
  const posts = getSortedPosts(await getCollection("blog"));
  return new Response(JSON.stringify(toSearchItems(posts)), {
    headers: { "Content-Type": "application/json" },
  });
};
