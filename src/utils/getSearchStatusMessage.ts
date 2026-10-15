export type SearchStatus = "loading" | "error" | "ready";

const getSearchStatusMessage = (status: SearchStatus, query: string) => {
  if (status === "loading") return "Loading posts…";
  if (status === "error")
    return "Couldn't load search. Try the search page at /search/.";
  const trimmed = query.trim();
  return trimmed ? `No posts found for "${trimmed}".` : "No posts yet.";
};

export default getSearchStatusMessage;
