import { useEffect, useState } from "react";
import { supabase } from "@lib/supabase";

interface Props {
  slug: string;
  size?: "sm" | "lg";
}

export default function PostViews({ slug, size = "sm" }: Props) {
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
    <div className={`flex items-center space-x-1 opacity-80`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`${
          size === "sm" ? "scale-90" : "scale-100"
        } inline-block h-6 w-6 min-w-[1.375rem] fill-skin-base`}
        aria-hidden="true"
        viewBox="0 0 24 24"
      >
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
      </svg>
      <span className={`italic ${size === "sm" ? "text-sm" : "text-base"}`}>
        {views == null ? "..." : `${views.toLocaleString()} views`}
      </span>
    </div>
  );
}
