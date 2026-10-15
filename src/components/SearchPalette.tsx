import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { Search } from "lucide-react";
import { navigate } from "astro:transitions/client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import getSearchStatusMessage, {
  type SearchStatus,
} from "@utils/getSearchStatusMessage";
import type { SearchItem } from "@utils/toSearchItems";
import SearchResultItem from "./SearchResultItem";

const MIN_QUERY = 2;

export default function SearchPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<SearchItem[]>([]);
  const [status, setStatus] = useState<SearchStatus>("loading");
  const [shortcut, setShortcut] = useState("Ctrl K");

  useEffect(() => {
    if (/Mac|iPhone|iPad/.test(navigator.userAgent)) setShortcut("⌘K");
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        setOpen((value) => !value);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open || status === "ready") return;
    setStatus("loading");
    fetch("/search.json")
      .then((response) => {
        if (!response.ok) throw new Error(String(response.status));
        return response.json() as Promise<SearchItem[]>;
      })
      .then((data) => {
        setItems(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, [open]);

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: ["title", "description"],
        minMatchCharLength: MIN_QUERY,
        threshold: 0.5,
      }),
    [items],
  );

  const trimmed = query.trim();
  const results =
    trimmed.length >= MIN_QUERY
      ? fuse.search(trimmed).map(({ item }) => item)
      : items.slice(0, 5);

  const go = (slug: string) => {
    setOpen(false);
    navigate(`/posts/${slug}/`);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="min-h-11 gap-2 rounded-full text-muted-foreground"
          aria-label="Search posts"
        >
          <Search />
          <span className="hidden sm:inline">Search</span>
          <kbd className="hidden rounded border border-border bg-muted px-1.5 font-mono text-[0.65rem] sm:inline">
            {shortcut}
          </kbd>
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden p-0 sm:max-w-xl">
        <DialogTitle className="sr-only">Search posts</DialogTitle>
        <DialogDescription className="sr-only">
          Type to search post titles and descriptions.
        </DialogDescription>
        <Command
          shouldFilter={false}
          className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-3 [&_[cmdk-item]]:py-2.5 [&_[cmdk-item][data-selected=true]]:bg-muted"
        >
          <CommandInput
            placeholder="Search posts…"
            value={query}
            onValueChange={setQuery}
          />
          <CommandList>
            <CommandEmpty>{getSearchStatusMessage(status, query)}</CommandEmpty>
            {results.length > 0 && (
              <CommandGroup
                heading={
                  trimmed.length >= MIN_QUERY ? "Results" : "Recent posts"
                }
              >
                {results.map((item) => (
                  <CommandItem
                    key={item.slug}
                    value={item.slug}
                    onSelect={() => go(item.slug)}
                  >
                    <SearchResultItem item={item} />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
