import type { MarkdownHeading } from "astro";

const MIN_HEADINGS = 2;

const getTocHeadings = (headings: MarkdownHeading[]) => {
  const toc = headings.filter(
    ({ depth, slug }) =>
      (depth === 2 || depth === 3) && slug !== "table-of-contents",
  );
  return toc.length >= MIN_HEADINGS ? toc : [];
};

export default getTocHeadings;
