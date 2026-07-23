import { slugifyStr } from "@utils/slugify";
import Datetime from "./Datetime";
import type { CollectionEntry } from "astro:content";

export interface Props {
  href?: string;
  frontmatter: CollectionEntry<"blog">["data"];
  secHeading?: boolean;
}

export default function Card({ href, frontmatter, secHeading = true }: Props) {
  const { title, pubDatetime, modDatetime, description } = frontmatter;

  const headerProps = {
    style: { viewTransitionName: slugifyStr(title) },
    className:
      "text-xl font-semibold leading-snug text-skin-base transition-colors duration-200 group-hover:text-skin-accent",
  };

  return (
    <li className="my-4">
      <a
        href={href}
        className="group block rounded-lg border border-skin-line bg-skin-card p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-skin-accent hover:shadow-md focus-visible:no-underline sm:p-6"
      >
        <article>
          {secHeading ? (
            <h2 {...headerProps}>{title}</h2>
          ) : (
            <h3 {...headerProps}>{title}</h3>
          )}
          <Datetime
            pubDatetime={pubDatetime}
            modDatetime={modDatetime}
            className="mt-3"
          />
          <p className="mt-3 leading-7 opacity-80">{description}</p>
        </article>
      </a>
    </li>
  );
}
