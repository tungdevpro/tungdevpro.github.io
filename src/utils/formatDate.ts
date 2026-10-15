const formatDate = (date: Date, locales: Intl.LocalesArgument = "en-US") =>
  date.toLocaleDateString(locales, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  });

export default formatDate;
