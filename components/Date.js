import { parseISO, format } from "date-fns";
import cn from "classnames";

export default function Date({ dateString }) {
  const date = parseISO(dateString);
  return (
    <time
      style={{ fontWeight: "bold", textTransform: "uppercase" }}
      className={cn("hairline-small")}
      dateTime={dateString}
    >
      {format(date, "LLLL d")}
    </time>
  );
}
