# Repository Guidelines

## Project Structure & Module Organization

This is an Astro 4 static blog based on AstroPaper. Source files live in `src/`.
Pages and routes are in `src/pages/`, layouts in `src/layouts/`, reusable UI in
`src/components/`, utilities in `src/utils/`, and global styles in
`src/styles/base.css`. Blog posts are Markdown files in `src/content/blog/` and
must satisfy the schema in `src/content/config.ts`. Public static assets belong
in `public/`; code-imported assets belong in `src/assets/`.

## Build, Test, and Development Commands

- `npm run dev` or `npm start`: start the local Astro dev server.
- `npm run build`: run `astro check`, build the static site into `dist/`, then
  optimize output with Jampack.
- `npm run preview`: preview the production build locally.
- `npm run lint`: run ESLint across the project.
- `npm run format:check`: check Prettier formatting.
- `npm run format`: apply Prettier formatting.
- `npm run sync`: regenerate Astro type definitions.

There is no dedicated `npm test` script currently; use `npm run build` plus
`npm run lint` as the main verification path.

## Coding Style & Naming Conventions

Use TypeScript, Astro components, React islands, and Tailwind utilities following
the existing patterns. Prefer two-space indentation and keep imports grouped and
readable. Use PascalCase for Astro/React components such as `Header.astro` and
`Search.tsx`; use camelCase for utilities such as `getSortedPosts.ts`. Blog
filenames should be lowercase, descriptive, and hyphen-separated, for example
`flutter-how-to-use-future-wait.md`.

## Content Guidelines

Add posts under `src/content/blog/` with required frontmatter: `title`,
`pubDatetime`, `description`, and `tags`. Optional fields include `author`,
`modDatetime`, `featured`, `draft`, `ogImage`, and `canonicalURL`. Draft posts
with `draft: true` are filtered from production output. Future-dated posts are
excluded until their publish time, with the configured scheduling margin.

## Commit & Pull Request Guidelines

The project uses conventional commits through Commitizen. Prefer messages like
`feat: add post view counter`, `fix: correct publication date`, or
`content: update personal introduction`. Use `npm run cz` for guided commits.

For pull requests, include a short summary, verification commands run, and any
screenshots for visible UI changes. Link related issues when applicable and note
required environment variables, such as `PUBLIC_SUPABASE_URL` and
`PUBLIC_SUPABASE_ANON_KEY`, when touching Supabase-backed features.

## Security & Configuration Tips

Keep secrets out of the repository. Only public client-side values should use the
`PUBLIC_` prefix. Site metadata, social links, pagination, and scheduling
behavior should be changed first in `src/config.ts` before editing components.
