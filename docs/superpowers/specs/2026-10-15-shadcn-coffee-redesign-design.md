# shadcn Coffee Redesign Design

## Goal

Make the blog feel distinctive and polished by adopting the editorial structure of
duyet.net (warm paper surfaces, serif headings, mono metadata, hairline lists) with
our own "coffee amber" accent, built on shadcn/ui theme tokens and a small set of
shadcn components.

## Decisions

- Reference: duyet.net — same structure, our own colors (not a copy).
- Accent: Coffee amber.
- Homepage: hero, then a "Featured" grid, then a "Recent writing" list.
- Post page: sticky table of contents on wide screens, collapsible box on mobile.
- Integration: keep Astro 4 + Tailwind 3; add shadcn on top (Tailwind v3 mode).
  No framework upgrades in this project.

## 1. Foundation

### Color tokens

Replace the custom `skin-*` tokens in `src/styles/base.css` and
`tailwind.config.cjs` with shadcn tokens, written as HSL channel triplets under
`:root` / `html[data-theme="light"]` and `html[data-theme="dark"]`:

| Token                         | Light                 | Dark                  |
| ----------------------------- | --------------------- | --------------------- |
| `background`                  | `#f7f7f5`             | `#0a0a0a`             |
| `foreground`                  | `#18181b`             | `#ededed`             |
| `card` / `popover`            | `#ffffff`             | `#141414`             |
| `card-foreground`             | `#18181b`             | `#ededed`             |
| `muted`                       | `#f0f0ed`             | `#1a1a1a`             |
| `muted-foreground`            | `#71717a`             | `#a1a1aa`             |
| `border` / `input`            | `#e8e8e6`             | `#242424`             |
| `primary`                     | `#b8741a`             | `#e6a94f`             |
| `primary-foreground`          | `#ffffff`             | `#1a1206`             |
| `accent`                      | `#f6ecdc`             | `#2a1f10`             |
| `accent-foreground`           | `#955c10`             | `#f0c27e`             |
| `ring`                        | `#b8741a` (35% alpha) | `#e6a94f` (40% alpha) |
| `secondary`                   | `#f0f0ed`             | `#1a1a1a`             |
| `secondary-foreground`        | `#18181b`             | `#ededed`             |
| `destructive` / `-foreground` | `#d23b3b` / `#ffffff` | `#f06464` / `#0a0a0a` |
| `radius`                      | `0.75rem`             | —                     |

Links in prose use `accent-foreground` (`#955c10` light). Every text/background
pair must pass WCAG AA (4.5:1 normal text, 3:1 large text and UI borders that
convey state); any failing amber value is darkened (light) or lightened (dark)
until it passes, and the final values are recorded in `base.css`.

All usages of `skin-*` classes across `src/` are migrated to the new token
classes; no `skin-*` references remain.

### Typography

- Headings (h1–h3, section titles, featured card titles): Libertinus Serif,
  self-hosted from Google Fonts files, weights 400 and 600, `font-display: swap`.
- Body: Geist (unchanged).
- Metadata (dates, reading time, view counts, small uppercase labels): Geist Mono.
- Tailwind `fontFamily`: `sans` = Geist, `serif` = Libertinus Serif, `mono` =
  Geist Mono.
- Long-form prose max line length ≈ 68ch.

### Dark mode

- Set `SITE.lightAndDarkMode = true`.
- Initial theme follows `prefers-color-scheme`; the existing toggle persists the
  choice (current `public/toggle-theme.js` behavior).

### Code highlighting

Switch Shiki from `one-dark-pro` to dual themes
`{ light: "github-light", dark: "github-dark-dimmed" }`, with CSS that selects
the dark variables under `html[data-theme="dark"]`.

### Breakpoints

Add `lg: "1024px"` alongside the existing `sm: "640px"`.

## 2. Pages and components

### Header (`src/components/Header.astro`)

- Sticky, `background` color, hairline bottom border.
- Left: lowercase wordmark `andrew do` (from `SITE.title`, lowercased). Remove the
  typing-cursor animation.
- Right: Posts, Tags, About, ⌘K search trigger, theme toggle. Active link uses
  `foreground`, others `muted-foreground`.
- Mobile (< 640px): existing hamburger menu, restyled.
- Skip-to-content link is kept.

### Home (`src/pages/index.astro`)

- Hero:
  - Mono uppercase role line in `primary`: `SITE.role`, default
    `"Mobile engineer · Android / iOS / Flutter"`.
  - Serif headline: `SITE.headline`, default `"Notes on building mobile apps."`.
  - Intro: existing `SITE.quickIntroduceMySelf`.
  - Primary pill button "Read the blog" → `/posts/`; text link "About me" →
    `/about/`.
  - `role` and `headline` are new fields on `Site` in `src/types.ts` and
    `src/config.ts`.
- Featured: the 4 newest posts with `featured: true`, in a 2-column grid of cards
  (1 column < 640px). Card: mono `tag · N min`, serif title, description.
- Recent writing: the 5 newest posts not shown in Featured, in one rounded `card`
  container with hairline dividers. Row: mono `MMM DD, YYYY · N min`, title,
  one-line clamped description. Header row has "All posts →".
- The selection logic lives in a pure function `src/utils/getHomePosts.ts`
  returning `{ featured, recent }`.
- The `SITE.fact` line moves to the footer.

### Post lists (`src/layouts/Posts.astro`, `src/layouts/TagPosts.astro`)

- Serif page heading + muted description.
- Same hairline list row component as "Recent writing" (shared component
  `PostRow`, replacing `Card.tsx` usage in lists).
- Pagination (`src/components/Pagination.astro`): "← Newer", "Page X of Y",
  "Older →" using `buttonVariants({ variant: "ghost" })` classes.

### Tags index (`src/pages/tags/index.astro`)

- Tags rendered as pill badges (`badgeVariants`, accent colors) with post counts.

### Post page (`src/layouts/PostDetails.astro`)

- Reading-progress bar: 3px, `primary`, fixed top (re-enable the commented code,
  restyled).
- Breadcrumb: `← Posts / <first tag>`.
- Serif title (keeps `transition:name`), description, mono meta line: date ·
  reading time · views (`PostViews`, unchanged data source) · tag badges.
- Table of contents:
  - Built from the post's h2/h3 headings (Astro `headings` from `render()`).
  - ≥ 1024px: right-hand sticky column "On this page"; the section in view is
    highlighted using IntersectionObserver (small inline script, no React).
  - < 1024px: collapsible `<details>` "On this page" above the article.
  - Hidden when a post has fewer than 2 headings.
- Code blocks: rounded `card` surface, hairline border, copy button (existing
  copy logic, restyled, with tooltip text "Copy" / "Copied").
- After the article: tag badges, share links, "Back to top".
- Reading time: new pure function `src/utils/getReadingTime.ts`, word count of
  the raw Markdown body / 200 wpm, rounded up, minimum 1 minute.

### About, 404, Footer

- About and 404: new tokens and fonts, existing structure.
- Footer: hairline top border, social links, `SITE.fact`, copyright.

### OG images (`src/utils/og-templates/`)

- Update colors to the light palette (paper background, amber accent) and
  heading font to Libertinus Serif. Layout unchanged.

## 3. shadcn setup and search

### Setup

- `components.json`: style `new-york`, base color `neutral`, CSS variables on,
  `tailwind.config` = `tailwind.config.cjs`, `css` = `src/styles/base.css`,
  aliases `components` → `@/components`, `ui` → `@/components/ui`, `utils` →
  `@/lib/utils`.
- `tsconfig.json`: add `"@/*": ["./src/*"]` path alias; existing aliases stay.
- Components are added with the Tailwind v3–compatible CLI:
  `npx shadcn@2.3.0 add command dialog button badge tooltip separator`.
- Expected new dependencies: `class-variance-authority`, `clsx`,
  `tailwind-merge`, `tailwindcss-animate`, `lucide-react`, `cmdk`, and the Radix
  packages these components require.

### Usage

| Component           | Where                                            |
| ------------------- | ------------------------------------------------ |
| `Command`, `Dialog` | ⌘K search palette                                |
| `Button`            | Search trigger, theme toggle, 404 "Go back home" |
| `Badge`             | Tags in lists, tags index, post page             |
| `Tooltip`           | Theme toggle, copy-code button                   |
| `Separator`         | Dividers inside React islands                    |

Astro (non-hydrated) markup reuses `buttonVariants` / `badgeVariants` class
strings from the generated files so there is one visual definition without
shipping JavaScript.

### Search

- New island `src/components/SearchPalette.tsx`, mounted in the header with
  `client:idle`.
- Opens on ⌘K / Ctrl+K or the header trigger; closes on Esc.
- Data: build-time endpoint `src/pages/search.json.ts` emitting
  `{ title, description, slug, pubDatetime, tags }[]` for published posts
  (same `postFilter` rules). Fetched on first open and cached in memory.
- Matching: Fuse.js with the current options (keys `title`, `description`,
  threshold 0.5, minMatchCharLength 2).
- Result item: title, mono date, tag badges. Enter / click navigates to
  `/posts/<slug>/`.
- `/search` page remains as a no-JS fallback, restyled, using the same result
  markup.

## Constraints

- No changes to routes, content schema, RSS, sitemap, view transitions,
  Supabase post views, or Jampack.
- No Astro or Tailwind major-version upgrades.
- Touch targets ≥ 44px; visible focus rings using `ring`.

## Verification

- `npm run build`, `npm run lint`, `npm run format:check` pass after each commit.
- A contrast script checks every token text/background pair in both themes.
- `getHomePosts` and `getReadingTime` are checked against the real 14 posts in the
  build output: 4 featured, 5 recent, no overlap, all reading times ≥ 1.
- Visual check via `npm run preview` at 390px and 1280px, light and dark: home, a
  post with code and multiple headings, `/posts`, `/tags`, a tag page, `/search`,
  the ⌘K palette, 404.
- Keyboard check: tab order, focus rings, ⌘K open/Esc close, arrow-key
  navigation in results, skip-to-content.
- Not covered: Lighthouse scoring and non-Chromium browsers.

## Delivery

About six conventional commits: tokens and fonts; shadcn setup; header and
footer; home and lists; post page; search.

## Amendments (2026-10-15, during planning and implementation)

- OG image templates are out of scope: their `GET` handlers are disabled, so
  OG images are not generated.
- Headings use **Newsreader** instead of Libertinus Serif. Libertinus renders
  blanks for Vietnamese characters such as "ể" and "ệ", which appear in several
  post titles. Newsreader loads from Google Fonts alongside Geist (matching the
  existing pattern) instead of being self-hosted.
- The copy-code button keeps its visible "Copy"/"Copied" label; no Tooltip
  (it is created by an inline DOM script, not React).
- Light `primary` is `#9a5f0e` and light `muted-foreground` is `#6b6b73` to
  pass WCAG AA; `ring` uses the primary color, with alpha at use sites.
- Vitest (`npm test`) covers the pure utilities and token contrast.
- `Separator` is not added; no React island needs one.
- Astro is bumped from 4.2.1 to 4.16.19 (same major) because dual Shiki
  themes need a newer 4.x; `tailwind-merge` is pinned to 2.6.0, the
  Tailwind 3-compatible line.
- 2026-10-15 (after launch): headings switched from Newsreader to Geist at the
  owner's request; the site now uses Geist everywhere and Geist Mono for
  metadata. Large headings use tighter letter-spacing.
