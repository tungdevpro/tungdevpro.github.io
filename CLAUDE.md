# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start dev server at localhost:4321
npm run build        # Type-check + build + optimize with jampack
npm run preview      # Preview production build locally
npm run lint         # ESLint
npm run format       # Prettier (auto-fix)
npm run format:check # Prettier (check only)
npm run sync         # Regenerate Astro TypeScript types
```

Commits use conventional commits via `npm run cz` (commitizen + husky hooks run Prettier on staged files).

## Architecture

This is an **Astro 4** static blog site deployed to GitHub Pages. Key architectural decisions:

- **Content**: Blog posts live in `src/content/blog/` as Markdown files. Astro's Content Collections API handles type-safe frontmatter via the schema in `src/content/config.ts`.
- **Routing**: File-based. Dynamic routes at `src/pages/posts/[slug]/` and `src/pages/tags/[tag]/` are generated at build time from blog content.
- **Config**: Site-wide settings (author, metadata, socials, pagination) are in `src/config.ts`. Change things here first before touching components.
- **OG Images**: Auto-generated at build time via Satori + resvg. Logic in `src/utils/generateOgImages.tsx` with templates in `src/utils/og-templates/`.
- **Search**: Client-side fuzzy search using FuseJS, implemented in `src/components/Search.tsx` (React island).
- **Styling**: TailwindCSS with `@tailwindcss/typography` for markdown rendering. Global styles in `src/styles/base.css`.

### Data flow for blog posts

1. Markdown file in `src/content/blog/` with frontmatter (title, date, tags, draft, etc.)
2. `postFilter.ts` filters out drafts and future-scheduled posts (respects `scheduledPostMargin` from config)
3. `getSortedPosts.ts` sorts by publication date
4. Posts render via `src/layouts/PostDetails.astro`

### Adding a blog post

Create a `.md` file in `src/content/blog/`. Required frontmatter fields are defined in `src/content/config.ts`. Posts with `draft: true` are excluded from production builds. Posts with a future `pubDatetime` are excluded unless within the `scheduledPostMargin` window.
