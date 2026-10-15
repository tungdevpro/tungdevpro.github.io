import { describe, expect, it } from "vitest";
import getSearchStatusMessage from "./getSearchStatusMessage";

describe("getSearchStatusMessage", () => {
  it("shows loading while the index is fetched", () => {
    expect(getSearchStatusMessage("loading", "flu")).toBe("Loading posts…");
  });

  it("points to the search page when the index fails to load", () => {
    expect(getSearchStatusMessage("error", "")).toBe(
      "Couldn't load search. Try the search page at /search/.",
    );
  });

  it("names the query when nothing matches", () => {
    expect(getSearchStatusMessage("ready", "kotlin")).toBe(
      'No posts found for "kotlin".',
    );
  });

  it("falls back to a generic message for an empty query", () => {
    expect(getSearchStatusMessage("ready", "  ")).toBe("No posts yet.");
  });
});
