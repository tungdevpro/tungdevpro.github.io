import { useEffect, useState } from "react";
import { supabase } from "@lib/supabase";

interface Props {
  slug: string;
}

/** Give up on a slow counter rather than leave a placeholder in the meta line. */
const TIMEOUT_MS = 5000;

/**
 * Counts this visit and shows the total. Renders nothing until a real number
 * arrives, and stays hidden if Supabase is missing, errors, or times out.
 */
export default function PostViews({ slug }: Props) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    if (!supabase) return;
    let cancelled = false;
    const timeout = new Promise<null>((resolve) =>
      setTimeout(() => resolve(null), TIMEOUT_MS),
    );

    // rpc() returns a PromiseLike without .catch, so lift it into a Promise.
    const request = Promise.resolve(
      supabase.rpc("increment_view", { post_slug: slug }),
    )
      .then(({ data, error }) =>
        !error && typeof data === "number" ? data : null,
      )
      .catch(() => null);

    Promise.race([request, timeout]).then((count) => {
      if (!cancelled && count != null) setViews(count);
    });

    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (views == null) return null;

  return (
    <>
      <span aria-hidden="true">·</span>
      <span>
        {views.toLocaleString("en-US")} {views === 1 ? "view" : "views"}
      </span>
    </>
  );
}
