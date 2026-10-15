const WORDS_PER_MINUTE = 200;

const getReadingTime = (markdown: string) => {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
};

export default getReadingTime;
