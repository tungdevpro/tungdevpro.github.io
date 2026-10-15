import { useEffect, useState } from "react";
import { supabase } from "@lib/supabase";

interface Props {
  slug: string;
}

export default function PostViews({ slug }: Props) {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    async function trackView() {
      const { data, error } = await supabase.rpc("increment_view", {
        post_slug: slug,
      });

      if (!error && data != null) {
        setViews(data as number);
      }
    }

    trackView();
  }, [slug]);

  return (
    <span>{views == null ? "… views" : `${views.toLocaleString()} views`}</span>
  );
}
