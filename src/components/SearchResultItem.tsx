import { Badge } from "@/components/ui/badge";
import formatDate from "@utils/formatDate";
import type { SearchItem } from "@utils/toSearchItems";

export default function SearchResultItem({ item }: { item: SearchItem }) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <span className="truncate font-medium text-foreground">{item.title}</span>
      <span className="flex flex-wrap items-center gap-2">
        <time
          dateTime={item.pubDatetime}
          className="font-mono text-xs text-muted-foreground"
        >
          {formatDate(new Date(item.pubDatetime))}
        </time>
        {item.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="tag" className="font-normal">
            #{tag}
          </Badge>
        ))}
      </span>
    </div>
  );
}
