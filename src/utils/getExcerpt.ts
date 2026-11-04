/**
 * Plain-text summary from the first prose paragraph of a Markdown body.
 * Used for meta/OG descriptions when a post's `description` is empty.
 */
const getExcerpt = (body: string, maxLength = 160): string => {
  const paragraph = body
    .replace(/```[\s\S]*?```/g, "") // fenced code
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .find(
      (block) =>
        block.length > 0 && !/^(#|>|\||[-*+] |\d+\. |!\[|<|---)/.test(block), // headings, quotes, tables, lists, images, html, rules
    );
  if (!paragraph) return "";

  const text = paragraph
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // links -> text
    .replace(/[`*_~]/g, "") // inline markup
    .replace(/\s+/g, " ")
    .trim();

  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:]$/, "")}…`;
};

export default getExcerpt;
