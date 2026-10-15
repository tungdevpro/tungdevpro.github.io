# shadcn Coffee Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the blog into a duyet.net-style editorial layout (warm paper surfaces, serif headings, mono metadata, hairline lists) with a coffee-amber accent, built on shadcn/ui tokens and a few shadcn components.

**Architecture:** shadcn theme tokens (HSL CSS variables in `src/styles/base.css`, registered in `tailwind.config.cjs`) replace the custom `skin-*` tokens everywhere. Static pages stay Astro and reuse shadcn's `buttonVariants`/`badgeVariants` class recipes; only interactive pieces (⌘K search, theme toggle) are React islands using real shadcn components. Small pure utilities (reading time, home-post selection, TOC headings, search items, date formatting) carry the logic and are unit-tested with Vitest.

**Tech Stack:** Astro 4.16, Tailwind CSS 3.4 + `@tailwindcss/typography`, React 18 islands, shadcn/ui (`shadcn@2.3.0` CLI, `new-york` style, Radix), `cmdk`, `lucide-react`, Fuse.js, Vitest 2.1.9.

**Spec:** `docs/superpowers/specs/2026-10-15-shadcn-coffee-redesign-design.md`

## Global Constraints

- No changes to routes, content schema, RSS, sitemap, view transitions, Supabase post views, or Jampack.
- No Astro or Tailwind major-version upgrades (stay on Astro 4, Tailwind 3).
- Add shadcn components only via `npx shadcn@2.3.0 add …` (never hand-copy component source).
- Touch targets ≥ 44px; visible focus rings using the `ring` token.
- All text/background token pairs pass WCAG AA (4.5:1 normal text, 3:1 large text / UI borders).
- No `skin-*` class or `--color-*` legacy variable may remain under `src/` or `public/` after Task 1.
- Commits: conventional commits, explicit `git add <paths>` (never `git add -A`: `dist/`, `.jampack/`, `.astro/astro/`, `.agents/`, `.claude/`, `skills-lock.json` are untracked and must not be committed), each message ending with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.

### Verification commands (used by every task)

The build needs Supabase env vars; locally use placeholders:

```bash
PUBLIC_SUPABASE_URL=https://example.supabase.co PUBLIC_SUPABASE_ANON_KEY=dummy npm run build
npm run lint
npm test
npx prettier --check --plugin=prettier-plugin-astro <files changed in this task>
```

`npm run format:check` already fails on ~200 untouched files at baseline, so only check the files each task changes. Build output ending in `✔ No issues` (Jampack) means success; the `[WARN] [router] No API Route handler exists … .png` lines are pre-existing (OG image routes are disabled) and expected.

### Spec amendments (found while planning — confirm with the user before Task 1)

1. **OG image templates are dropped from scope.** The `GET` handlers in `src/pages/og.png.ts` and `src/pages/posts/[slug]/index.png.ts` are commented out, so OG images are not generated today; restyling the templates would have no visible effect.
2. **Libertinus Serif loads from Google Fonts**, added to the existing Geist `<link>` in `Layout.astro`. Geist is not self-hosted either, so this matches the current pattern.
3. **The copy-code button keeps its visible "Copy"/"Copied" label instead of a shadcn Tooltip.** The button is created by an inline DOM script, not React, so a Radix Tooltip cannot wrap it. The theme toggle does get a real Tooltip.
4. **`muted-foreground` (light) is `#6b6b73` and `primary` (light) is `#9a5f0e`.** The spec's `#71717a` fails AA on `muted` (4.23:1) and white-on-`#b8741a` fails AA (3.78:1). The ring uses the primary color; the 35%/40% alpha is applied at use sites (`ring-ring/35`).
5. **Vitest is added** (`npm test`) for the pure utilities and the contrast check.
6. **`Separator` is not added.** No React island needs a divider; static dividers use `border-border`.
7. **The lockfile is re-synced.** `npm ci` currently fails because `package-lock.json` is out of sync with `package.json`.

## Review Focus

- **Post with fewer than 2 headings, or a "Table of contents" heading:** no TOC at all (no empty sidebar, no empty `<details>`), and a remark-toc "Table of contents" heading never appears as a TOC entry. Pinned by `getTocHeadings` tests in Task 6.
- **Fewer than 4 featured posts, or none:** the Featured section shows only what exists (or is omitted entirely), and Recent still shows 5 non-overlapping posts. Pinned by `getHomePosts` tests in Task 4.
- **Empty or very short post body:** reading time shows "1 min read", never "0 min". Pinned by `getReadingTime` tests in Task 4.
- **`/search.json` fails to load (offline, 404):** the ⌘K palette shows an error message pointing to `/search/`, not an endless "Loading…". Pinned by `getSearchStatusMessage` tests in Task 7.
- **Dates near midnight UTC:** a post published `2024-08-14T22:30:00Z` shows "Aug 14, 2024" regardless of the build machine's timezone. Pinned by `formatDate` tests in Task 4.

---

## File Structure

| File                                                                     | Responsibility                                                              | Task |
| ------------------------------------------------------------------------ | --------------------------------------------------------------------------- | ---- |
| `package.json`, `package-lock.json`                                      | `test` script, Vitest, shadcn deps, lockfile sync                           | 1, 2 |
| `src/styles/base.css`                                                    | shadcn tokens (light/dark), base element styles, prose, shared `.post-list` | 1    |
| `src/styles/theme.test.ts`                                               | Parses `base.css` tokens and asserts WCAG AA contrast                       | 1    |
| `tailwind.config.cjs`                                                    | Token colors, radius, fonts, `lg` breakpoint, dark selector, animate plugin | 1, 2 |
| `astro.config.ts`                                                        | Shiki dual themes                                                           | 1    |
| `src/layouts/Layout.astro`                                               | Font `<link>` (adds Libertinus Serif)                                       | 1    |
| `public/toggle-theme.js`                                                 | Follow system theme; expose `window.__setTheme`                             | 1, 3 |
| `src/config.ts`, `src/types.ts`                                          | `lightAndDarkMode: true`, new `role`, `headline` fields                     | 1, 4 |
| `components.json`, `src/lib/utils.ts`, `src/lib/utils.test.ts`           | shadcn config and `cn()`                                                    | 2    |
| `src/components/ui/*.tsx`                                                | Generated shadcn components (button, badge, command, dialog, tooltip)       | 2    |
| `src/components/ThemeToggle.tsx`                                         | React island: theme toggle button with Tooltip                              | 3    |
| `src/components/Header.astro`, `Footer.astro`, `Socials.astro`           | Site chrome                                                                 | 3    |
| `src/pages/404.astro`, `src/layouts/AboutLayout.astro`                   | Restyled secondary pages                                                    | 3    |
| `src/utils/formatDate.ts` (+ test)                                       | `MMM DD, YYYY` in UTC                                                       | 4    |
| `src/utils/getReadingTime.ts` (+ test)                                   | Minutes from Markdown body                                                  | 4    |
| `src/utils/getHomePosts.ts` (+ test)                                     | `{ featured, recent }` selection                                            | 4    |
| `src/test/makePost.ts`                                                   | Test fixture builder for `CollectionEntry<"blog">`                          | 4    |
| `src/components/PostRow.astro`, `FeaturedCard.astro`                     | List row and featured card                                                  | 4    |
| `src/pages/index.astro`                                                  | Home page                                                                   | 4    |
| `src/layouts/Main.astro`, `Posts.astro`, `TagPosts.astro`                | List page shells                                                            | 5    |
| `src/components/Pagination.astro`, `Tag.astro`, `Breadcrumbs.astro`      | List-page pieces                                                            | 5    |
| `src/pages/tags/index.astro`                                             | Tag index with counts                                                       | 5    |
| `src/utils/getTocHeadings.ts` (+ test)                                   | TOC heading filter                                                          | 6    |
| `src/components/TableOfContents.astro`                                   | Sidebar and inline TOC                                                      | 6    |
| `src/components/PostViews.tsx`                                           | Inline mono view count                                                      | 6    |
| `src/layouts/PostDetails.astro`                                          | Post page                                                                   | 6    |
| `src/utils/toSearchItems.ts` (+ test), `src/pages/search.json.ts`        | Search index                                                                | 7    |
| `src/utils/getSearchStatusMessage.ts` (+ test)                           | Palette empty/loading/error copy                                            | 7    |
| `src/components/SearchResultItem.tsx`, `SearchPalette.tsx`, `Search.tsx` | Search UI                                                                   | 7    |
| `src/components/Card.tsx`, `Datetime.tsx`                                | Deleted (replaced)                                                          | 7    |

---

### Task 1: Theme foundation (tokens, fonts, dark mode, code theme, test runner)

**Files:**

- Modify: `package.json`, `package-lock.json`
- Rewrite: `src/styles/base.css`
- Create: `src/styles/theme.test.ts`
- Modify: `tailwind.config.cjs`, `astro.config.ts`, `src/layouts/Layout.astro:76-82`, `public/toggle-theme.js:1`, `src/config.ts:9`
- Modify (mechanical token rename): every file under `src/` containing `skin-`

**Interfaces:**

- Consumes: nothing.
- Produces: Tailwind color utilities `background, foreground, card, card-foreground, popover, popover-foreground, primary, primary-foreground, secondary, secondary-foreground, muted, muted-foreground, accent, accent-foreground, destructive, destructive-foreground, border, input, ring` (all support `/<alpha>`); `font-serif`, `font-sans`, `font-mono`; `lg:` breakpoint (1024px); `.post-list` component class; `npm test`.

- [ ] **Step 1: Sync the lockfile and add Vitest**

```bash
npm install --no-audit --no-fund
npm install -D --no-audit --no-fund vitest@2.1.9
npm pkg set scripts.test="vitest run"
```

Expected: `package-lock.json` updated; `package.json` has `"test": "vitest run"` and `vitest` in `devDependencies`.

- [ ] **Step 2: Write the failing contrast test**

Create `src/styles/theme.test.ts`:

```ts
import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(new URL("./base.css", import.meta.url), "utf8");

function block(selector: string): Record<string, string> {
  const start = css.indexOf(selector);
  if (start === -1) throw new Error(`Selector not found: ${selector}`);
  const body = css.slice(css.indexOf("{", start) + 1, css.indexOf("}", start));
  const vars: Record<string, string> = {};
  for (const [, name, value] of body.matchAll(/--([a-z-]+):\s*([^;]+);/g)) {
    vars[name] = value.trim();
  }
  return vars;
}

function hslToRgb(value: string): [number, number, number] {
  const [h, s, l] = value.replace(/%/g, "").split(/\s+/).map(Number);
  const sat = s / 100;
  const light = l / 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = sat * Math.min(light, 1 - light);
  const f = (n: number) =>
    light - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return [f(0), f(8), f(4)];
}

function luminance(value: string): number {
  const [r, g, b] = hslToRgb(value).map((c) =>
    c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const TEXT_PAIRS: [string, string][] = [
  ["foreground", "background"],
  ["foreground", "card"],
  ["card-foreground", "card"],
  ["popover-foreground", "popover"],
  ["muted-foreground", "background"],
  ["muted-foreground", "card"],
  ["muted-foreground", "muted"],
  ["primary-foreground", "primary"],
  ["primary", "background"],
  ["primary", "card"],
  ["secondary-foreground", "secondary"],
  ["accent-foreground", "accent"],
  ["accent-foreground", "background"],
  ["accent-foreground", "card"],
  ["destructive-foreground", "destructive"],
];

describe.each([
  // first occurrence of this selector is the `:root, html[data-theme="light"]` block
  ["light", 'html[data-theme="light"]'],
  ["dark", 'html[data-theme="dark"]'],
])("%s theme tokens", (_name, selector) => {
  const tokens = block(selector);

  it.each(TEXT_PAIRS)("%s on %s meets WCAG AA (4.5:1)", (fg, bg) => {
    expect(tokens[fg], `missing --${fg}`).toBeDefined();
    expect(tokens[bg], `missing --${bg}`).toBeDefined();
    expect(contrast(tokens[fg], tokens[bg])).toBeGreaterThanOrEqual(4.5);
  });
});
```

- [ ] **Step 3: Run it to verify it fails**

Run: `npm test`
Expected: FAIL with `Selector not found` or `missing --foreground` (base.css still has the old `--color-*` tokens).

- [ ] **Step 4: Rewrite `src/styles/base.css`**

Replace the whole file with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root,
  html[data-theme="light"] {
    --background: 60 11% 96.5%;
    --foreground: 240 6% 10%;
    --card: 0 0% 100%;
    --card-foreground: 240 6% 10%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 6% 10%;
    --primary: 35 83% 32.9%;
    --primary-foreground: 0 0% 100%;
    --secondary: 60 9% 93.5%;
    --secondary-foreground: 240 6% 10%;
    --muted: 60 9% 93.5%;
    --muted-foreground: 240 4% 43.5%;
    --accent: 37 59% 91.4%;
    --accent-foreground: 34 81% 32.4%;
    --destructive: 0 63% 53%;
    --destructive-foreground: 0 0% 100%;
    --border: 60 4% 90.6%;
    --input: 60 4% 90.6%;
    --ring: 35 83% 32.9%;
    --radius: 0.75rem;
  }
  html[data-theme="dark"] {
    --background: 0 0% 3.9%;
    --foreground: 0 0% 92.9%;
    --card: 0 0% 7.8%;
    --card-foreground: 0 0% 92.9%;
    --popover: 0 0% 7.8%;
    --popover-foreground: 0 0% 92.9%;
    --primary: 36 75% 60.6%;
    --primary-foreground: 36 62% 6.3%;
    --secondary: 0 0% 10.2%;
    --secondary-foreground: 0 0% 92.9%;
    --muted: 0 0% 10.2%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 35 45% 11.4%;
    --accent-foreground: 36 79% 71.8%;
    --destructive: 0 83% 67%;
    --destructive-foreground: 0 0% 3.9%;
    --border: 0 0% 14.1%;
    --input: 0 0% 14.1%;
    --ring: 36 75% 60.6%;
  }
  #sun-svg,
  html[data-theme="dark"] #moon-svg {
    display: none;
  }
  #moon-svg,
  html[data-theme="dark"] #sun-svg {
    display: block;
  }
  body {
    @apply flex min-h-[100svh] flex-col bg-background font-sans text-base leading-7 text-foreground antialiased
    selection:bg-primary selection:text-primary-foreground;
  }
  h1,
  h2,
  h3 {
    @apply font-serif;
  }
  section,
  footer {
    @apply mx-auto w-full max-w-5xl px-4;
  }
  a {
    @apply rounded-sm outline-2 outline-offset-4 outline-ring/40 transition-colors duration-200
    focus-visible:no-underline focus-visible:outline;
  }
  svg:not(.lucide) {
    @apply inline-block h-6 w-6 fill-foreground group-hover:fill-primary;
  }
  svg.icon-tabler {
    @apply inline-block h-6 w-6 scale-125 fill-transparent
    stroke-current stroke-2 opacity-90 group-hover:fill-transparent
    sm:scale-110;
  }
  .prose {
    @apply prose-lg max-w-none prose-headings:!mb-3 prose-headings:scroll-mt-24 prose-headings:font-serif
    prose-headings:font-semibold prose-headings:!text-foreground
    prose-h2:mt-12 prose-h2:border-b prose-h2:border-border prose-h2:pb-2
    prose-h3:mt-8 prose-p:!text-foreground prose-p:leading-8
    prose-a:!text-primary prose-a:underline prose-a:decoration-primary/40 prose-a:underline-offset-4
    hover:prose-a:decoration-primary prose-blockquote:!border-l-primary
    prose-blockquote:border-opacity-50 prose-blockquote:opacity-80
    prose-figcaption:!text-muted-foreground
    prose-strong:!text-foreground
    prose-code:rounded prose-code:bg-muted
    prose-code:px-1.5 prose-code:py-1 prose-code:font-mono prose-code:text-[0.875em]
    prose-code:before:!content-none prose-code:after:!content-none
    prose-ol:!text-foreground
    prose-ul:overflow-x-clip prose-ul:!text-foreground prose-li:marker:!text-primary
    prose-table:text-foreground prose-th:border
    prose-th:border-border prose-td:border
    prose-td:border-border prose-img:!my-8
    prose-img:mx-auto prose-img:rounded-lg prose-img:border
    prose-img:border-border prose-hr:!border-border;
  }
  .prose pre {
    @apply rounded-xl border border-border p-4 font-mono text-sm;
    background-color: hsl(var(--card)) !important;
  }
  html[data-theme="dark"] .astro-code,
  html[data-theme="dark"] .astro-code span {
    color: var(--shiki-dark) !important;
    font-style: var(--shiki-dark-font-style) !important;
    font-weight: var(--shiki-dark-font-weight) !important;
  }
  .prose a {
    @apply break-words;
  }
  .prose thead th:first-child,
  tbody td:first-child,
  tfoot td:first-child {
    padding-left: 0.5714286em;
  }
  .prose h2#table-of-contents {
    @apply mb-2;
  }
  .prose details {
    @apply inline-block cursor-pointer select-none text-foreground;
  }
  .prose summary {
    @apply focus-outline;
  }
  .prose h2#table-of-contents + p {
    @apply hidden;
  }

  /* ===== scrollbar ===== */
  html {
    overflow-y: scroll;
  }
  ::-webkit-scrollbar {
    @apply w-3;
  }
  ::-webkit-scrollbar-track {
    @apply bg-background;
  }
  ::-webkit-scrollbar-thumb {
    @apply rounded-full bg-muted;
  }
  ::-webkit-scrollbar-thumb:hover {
    @apply bg-border;
  }

  code,
  blockquote {
    word-wrap: break-word;
  }
  pre > code {
    white-space: pre;
  }
}

@layer components {
  .display-none {
    @apply hidden;
  }
  .focus-outline {
    @apply rounded-sm outline-2 outline-offset-4 outline-ring/40 focus-visible:no-underline focus-visible:outline;
  }
  .meta-text {
    @apply font-mono text-xs tracking-wide text-muted-foreground;
  }
  .post-list {
    @apply divide-y divide-border overflow-hidden rounded-xl border border-border bg-card;
  }
}
```

- [ ] **Step 5: Update `tailwind.config.cjs`**

Replace the whole file with:

```js
/** @type {import('tailwindcss').Config} */
const token = (name) => `hsl(var(--${name}) / <alpha-value>)`;

module.exports = {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    screens: {
      sm: "640px",
      lg: "1024px",
    },
    extend: {
      colors: {
        border: token("border"),
        input: token("input"),
        ring: token("ring"),
        background: token("background"),
        foreground: token("foreground"),
        primary: {
          DEFAULT: token("primary"),
          foreground: token("primary-foreground"),
        },
        secondary: {
          DEFAULT: token("secondary"),
          foreground: token("secondary-foreground"),
        },
        destructive: {
          DEFAULT: token("destructive"),
          foreground: token("destructive-foreground"),
        },
        muted: {
          DEFAULT: token("muted"),
          foreground: token("muted-foreground"),
        },
        accent: {
          DEFAULT: token("accent"),
          foreground: token("accent-foreground"),
        },
        popover: {
          DEFAULT: token("popover"),
          foreground: token("popover-foreground"),
        },
        card: {
          DEFAULT: token("card"),
          foreground: token("card-foreground"),
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Geist", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Libertinus Serif", "Georgia", "Cambria", "serif"],
        mono: ["Geist Mono", "ui-monospace", "monospace"],
      },
      typography: {
        DEFAULT: {
          css: {
            pre: {
              color: false,
            },
            code: {
              color: false,
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
```

- [ ] **Step 6: Rename every `skin-*` usage**

Run from the repo root (macOS `sed -i ''`; order matters — longer names first):

```bash
grep -rlE 'skin-|--color-' src public | xargs sed -i '' -E \
  -e 's/skin-card-muted/muted/g' \
  -e 's/text-skin-base/text-foreground/g' \
  -e 's/text-skin-accent/text-primary/g' \
  -e 's/text-skin-inverted/text-primary-foreground/g' \
  -e 's/bg-skin-fill/bg-background/g' \
  -e 's/bg-skin-accent/bg-primary/g' \
  -e 's/bg-skin-inverted/bg-foreground/g' \
  -e 's/bg-skin-card/bg-card/g' \
  -e 's/outline-skin-fill/outline-ring/g' \
  -e 's/ring-skin-accent/ring-ring/g' \
  -e 's/border-l-skin-accent/border-l-primary/g' \
  -e 's/border-skin-line/border-border/g' \
  -e 's/border-skin-fill/border-foreground/g' \
  -e 's/border-skin-accent/border-primary/g' \
  -e 's/fill-skin-base/fill-foreground/g' \
  -e 's/fill-skin-accent/fill-primary/g' \
  -e 's/rgb\(var\(--color-fill\)\)/hsl(var(--background))/g'
grep -rnE 'skin-|--color-' src public
```

Expected: the final `grep` prints nothing. If it prints a line, map it by the same rule (base→foreground, accent→primary, fill→background, card→card, card-muted→muted, line→border) and re-run the grep.

- [ ] **Step 7: Add the serif font**

In `src/layouts/Layout.astro`, replace the Google Font stylesheet `href`:

```astro
    <link
      href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;700&family=Libertinus+Serif:wght@400;600&display=swap"
      rel="stylesheet"
    />
```

- [ ] **Step 8: Switch Shiki to dual themes**

In `astro.config.ts`, replace the `shikiConfig` block:

```ts
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark-dimmed",
      },
      wrap: true,
    },
```

- [ ] **Step 9: Turn on dark mode, following the system**

In `src/config.ts` change `lightAndDarkMode: false,` to `lightAndDarkMode: true,`.
In `public/toggle-theme.js` change line 1 to:

```js
const primaryColorScheme = ""; // "light" | "dark" | "" (follow system)
```

- [ ] **Step 10: Run the tests and the build**

```bash
npm test
PUBLIC_SUPABASE_URL=https://example.supabase.co PUBLIC_SUPABASE_ANON_KEY=dummy npm run build
npm run lint
```

Expected: all 30 contrast tests PASS; build ends with `✔ No issues`; lint clean. Then:

```bash
grep -c 'Libertinus' dist/index.html
grep -o 'shiki-dark' dist/posts/flutter-how-to-use-future-wait/index.html | head -1
```

Expected: first prints `1` or more; second prints `shiki-dark`.

- [ ] **Step 11: Format-check and commit**

```bash
npx prettier --write --plugin=prettier-plugin-astro src/styles/base.css src/styles/theme.test.ts tailwind.config.cjs astro.config.ts
git add package.json package-lock.json src/styles/base.css src/styles/theme.test.ts tailwind.config.cjs astro.config.ts src/layouts/Layout.astro public/toggle-theme.js src/config.ts $(git diff --name-only -- src public)
git commit -m "style: replace skin tokens with shadcn coffee amber theme

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 2: shadcn setup and components

**Files:**

- Create: `components.json`, `src/lib/utils.ts`, `src/lib/utils.test.ts`
- Create (generated): `src/components/ui/button.tsx`, `badge.tsx`, `command.tsx`, `dialog.tsx`, `tooltip.tsx`
- Modify: `tsconfig.json`, `tailwind.config.cjs` (plugin), `package.json`, `package-lock.json`, `src/components/ui/badge.tsx` (add `tag` variant)

**Interfaces:**

- Consumes: Task 1 tokens.
- Produces:

  - `cn(...inputs: ClassValue[]): string` from `@/lib/utils`
  - `Button`, `buttonVariants({ variant?: "default"|"destructive"|"outline"|"secondary"|"ghost"|"link", size?: "default"|"sm"|"lg"|"icon" })` from `@/components/ui/button`
  - `Badge`, `badgeVariants({ variant?: "default"|"secondary"|"destructive"|"outline"|"tag" })` from `@/components/ui/badge`
  - `Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem` from `@/components/ui/command`
  - `Dialog, DialogContent, DialogTitle, DialogDescription` from `@/components/ui/dialog`
  - `Tooltip, TooltipTrigger, TooltipContent, TooltipProvider` from `@/components/ui/tooltip`

- [ ] **Step 1: Add the `@/*` alias**

In `tsconfig.json`, add as the first entry of `paths`:

```json
      "@/*": ["*"],
```

(`baseUrl` is `src`, so `@/lib/utils` resolves to `src/lib/utils`.)

- [ ] **Step 2: Create `components.json`**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.cjs",
    "css": "src/styles/base.css",
    "baseColor": "neutral",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "iconLibrary": "lucide"
}
```

- [ ] **Step 3: Write the failing `cn` test**

Create `src/lib/utils.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("merges conflicting tailwind classes, last wins", () => {
    expect(cn("px-2 text-sm", "px-4")).toBe("text-sm px-4");
  });

  it("drops falsy values", () => {
    expect(cn("a", false && "b", undefined, "c")).toBe("a c");
  });
});
```

Run: `npm test -- src/lib/utils.test.ts`
Expected: FAIL — `Failed to resolve import "./utils"`.

- [ ] **Step 4: Install shadcn base deps and create `cn`**

```bash
npm install --no-audit --no-fund class-variance-authority clsx tailwind-merge tailwindcss-animate lucide-react
```

Create `src/lib/utils.ts`:

```ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

In `tailwind.config.cjs` change the plugins line to:

```js
  plugins: [require("@tailwindcss/typography"), require("tailwindcss-animate")],
```

Run: `npm test -- src/lib/utils.test.ts`
Expected: PASS (2 tests).

- [ ] **Step 5: Add the components with the Tailwind v3 CLI**

```bash
npx -y shadcn@2.3.0 add button badge command dialog tooltip --yes
git status --short
```

Expected: new files in `src/components/ui/` (`button.tsx`, `badge.tsx`, `command.tsx`, `dialog.tsx`, `tooltip.tsx`); `cmdk` and `@radix-ui/*` packages added to `package.json`. If the CLI prompts to overwrite `base.css` or `tailwind.config.cjs`, answer **no**; if it modified either anyway, restore them with `git checkout -- src/styles/base.css tailwind.config.cjs` and re-apply only the plugin line from Step 4.

- [ ] **Step 6: Add the `tag` badge variant**

In `src/components/ui/badge.tsx`, inside `variants.variant`, add after `outline`:

```ts
        tag: "border-transparent bg-accent text-accent-foreground hover:bg-accent/70",
```

- [ ] **Step 7: Verify and commit**

```bash
npm test
PUBLIC_SUPABASE_URL=https://example.supabase.co PUBLIC_SUPABASE_ANON_KEY=dummy npm run build
npm run lint
npx prettier --check --plugin=prettier-plugin-astro components.json src/lib tsconfig.json tailwind.config.cjs
```

Expected: tests PASS; build `✔ No issues`; lint clean (if ESLint flags generated `src/components/ui/*` files, fix only lint errors, not style); prettier clean (run `--write` on these paths if not).

```bash
git add components.json tsconfig.json tailwind.config.cjs package.json package-lock.json src/lib/utils.ts src/lib/utils.test.ts src/components/ui
git commit -m "feat: set up shadcn/ui with tailwind v3

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 3: Site chrome — header, theme toggle, footer, 404, about

**Files:**

- Create: `src/components/ThemeToggle.tsx`
- Rewrite: `src/components/Header.astro`, `src/components/Footer.astro`, `src/components/Socials.astro`, `src/pages/404.astro`
- Modify: `public/toggle-theme.js`, `src/env.d.ts`, `src/layouts/AboutLayout.astro`, `src/styles/base.css` (remove `footer` from the `section, footer` rule)

**Interfaces:**

- Consumes: `Button`, `buttonVariants`, `Tooltip*`, `cn` (Task 2); tokens (Task 1).
- Produces: `window.__setTheme(theme: "light" | "dark"): void` (defined in `toggle-theme.js`); `<ThemeToggle />` island; header element `.nav-actions` that Task 7 inserts `SearchPalette` into; `Header` still accepts `activeNav?: "posts" | "tags" | "about" | "search"`.

- [ ] **Step 1: Expose a theme setter and drop the old click wiring**

In `public/toggle-theme.js`, replace the whole `window.onload = () => { … };` block with:

```js
window.__setTheme = (theme) => {
  themeValue = theme;
  setPreference();
};

window.onload = () => {
  reflectPreference();
  // Runs on view transitions navigation
  document.addEventListener("astro:after-swap", reflectPreference);
};
```

In `src/env.d.ts` append:

```ts
interface Window {
  __setTheme?: (theme: "light" | "dark") => void;
}
```

- [ ] **Step 2: Create `src/components/ThemeToggle.tsx`**

```tsx
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Theme = "light" | "dark";

const readTheme = (): Theme =>
  document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    setTheme(readTheme());
    const observer = new MutationObserver(() => setTheme(readTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const next: Theme = theme === "dark" ? "light" : "dark";
  const label = `Switch to ${next} mode`;

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-11"
            aria-label={label}
            onClick={() => window.__setTheme?.(next)}
          >
            {theme === "dark" ? <Sun /> : <Moon />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```

- [ ] **Step 3: Rewrite `src/components/Header.astro`**

```astro
---
import { SITE } from "@config";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

export interface Props {
  activeNav?: "posts" | "tags" | "about" | "search";
}

const { activeNav } = Astro.props;

const navItems = [
  { key: "posts", href: "/posts/", label: "Posts" },
  { key: "tags", href: "/tags/", label: "Tags" },
  { key: "about", href: "/about/", label: "About" },
] as const;
---

<header class="site-header">
  <a id="skip-to-content" href="#main-content">Skip to content</a>
  <div class="nav-container">
    <a href="/" class="wordmark">{SITE.title.toLowerCase()}</a>
    <nav id="nav-menu" aria-label="Main">
      <ul id="menu-items" class="display-none sm:flex">
        {
          navItems.map(item => (
            <li>
              <a
                href={item.href}
                class:list={["nav-link", { active: activeNav === item.key }]}
                aria-current={activeNav === item.key ? "page" : undefined}
              >
                {item.label}
              </a>
            </li>
          ))
        }
      </ul>
    </nav>
    <div class="nav-actions">
      <a
        href="/search/"
        class={cn(buttonVariants({ variant: "ghost", size: "icon" }), "size-11")}
        aria-label="Search"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="lucide"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
          ><circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"
          ></path></svg
        >
      </a>
      {SITE.lightAndDarkMode && <ThemeToggle client:idle />}
      <button
        class={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "hamburger-menu size-11 sm:hidden",
        )}
        aria-label="Open Menu"
        aria-expanded="false"
        aria-controls="menu-items"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="menu-icon lucide"
        >
          <line x1="7" y1="12" x2="21" y2="12" class="line"></line>
          <line x1="3" y1="6" x2="21" y2="6" class="line"></line>
          <line x1="12" y1="18" x2="21" y2="18" class="line"></line>
          <line x1="18" y1="6" x2="6" y2="18" class="close"></line>
          <line x1="6" y1="6" x2="18" y2="18" class="close"></line>
        </svg>
      </button>
    </div>
  </div>
</header>

<style>
  #skip-to-content {
    @apply absolute -top-full left-4 z-50 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-all focus:top-4;
  }
  .site-header {
    @apply sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75;
  }
  .nav-container {
    @apply mx-auto flex min-h-16 max-w-5xl flex-wrap items-center gap-x-4 px-4;
  }
  .wordmark {
    @apply flex min-h-11 items-center text-[0.95rem] font-semibold tracking-tight text-foreground;
  }
  nav {
    @apply order-last w-full sm:order-none sm:ml-auto sm:w-auto;
  }
  #menu-items {
    @apply flex-col gap-1 pb-3 sm:flex-row sm:pb-0;
  }
  .nav-link {
    @apply flex min-h-11 items-center rounded-full px-3 text-sm text-muted-foreground hover:text-foreground;
  }
  .nav-link.active {
    @apply text-foreground;
  }
  .nav-actions {
    @apply ml-auto flex items-center gap-1 sm:ml-0;
  }
  .hamburger-menu svg {
    @apply size-5;
  }
  .menu-icon line {
    @apply transition-opacity duration-75 ease-in-out;
  }
  .menu-icon .close {
    opacity: 0;
  }
  .menu-icon.is-active .line {
    @apply opacity-0;
  }
  .menu-icon.is-active .close {
    @apply opacity-100;
  }
</style>

<script>
  function toggleNav() {
    const menuBtn = document.querySelector(".hamburger-menu");
    const menuIcon = document.querySelector(".menu-icon");
    const menuItems = document.querySelector("#menu-items");
    if (!menuBtn || menuBtn instanceof HTMLElement === false) return;
    if (menuBtn.dataset.navReady === "true") return;
    menuBtn.dataset.navReady = "true";

    menuBtn.addEventListener("click", () => {
      const menuExpanded = menuBtn.getAttribute("aria-expanded") === "true";
      menuIcon?.classList.toggle("is-active");
      menuBtn.setAttribute("aria-expanded", menuExpanded ? "false" : "true");
      menuBtn.setAttribute(
        "aria-label",
        menuExpanded ? "Open Menu" : "Close Menu",
      );
      menuItems?.classList.toggle("display-none");
    });
  }

  toggleNav();

  // Runs on view transitions navigation
  document.addEventListener("astro:after-swap", toggleNav);
</script>
```

- [ ] **Step 4: Rewrite `src/components/Socials.astro`**

```astro
---
import { SOCIALS } from "@config";
import socialIcons from "@assets/socialIcons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
---

<div class="social-icons">
  {
    SOCIALS.filter(social => social.active).map(social => (
      <a
        href={social.href}
        class={cn(
          buttonVariants({ variant: "ghost", size: "icon" }),
          "group size-11",
        )}
        title={social.linkTitle}
        aria-label={social.linkTitle}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Fragment set:html={socialIcons[social.name]} />
      </a>
    ))
  }
</div>

<style>
  .social-icons {
    @apply flex flex-wrap items-center justify-center gap-1;
  }
  .social-icons :global(svg) {
    @apply size-5 scale-100;
  }
</style>
```

- [ ] **Step 5: Rewrite `src/components/Footer.astro`**

```astro
---
import { SITE } from "@config";
import Socials from "./Socials.astro";

const currentYear = new Date().getFullYear();

export interface Props {
  noMarginTop?: boolean;
}

const { noMarginTop = false } = Astro.props;
---

<footer class:list={["site-footer", { "mt-auto": !noMarginTop }]}>
  <div class="footer-inner">
    <div class="footer-copy">
      <p>{SITE.fact}</p>
      <p>&#169; {currentYear} {SITE.title}. All rights reserved.</p>
    </div>
    <Socials />
  </div>
</footer>

<style>
  .site-footer {
    @apply w-full border-t border-border;
  }
  .footer-inner {
    @apply mx-auto flex max-w-5xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between;
  }
  .footer-copy {
    @apply flex flex-col items-center gap-1 text-center text-sm text-muted-foreground sm:items-start sm:text-left;
  }
</style>
```

In `src/styles/base.css`, change the rule `section,\n  footer {` to just `section {` (the footer now owns its width).

- [ ] **Step 6: Rewrite `src/pages/404.astro`**

```astro
---
import { SITE } from "@config";
import Layout from "@layouts/Layout.astro";
import Header from "@components/Header.astro";
import Footer from "@components/Footer.astro";
import { buttonVariants } from "@/components/ui/button";
---

<Layout title={`404 Not Found | ${SITE.title}`}>
  <Header />

  <main id="main-content">
    <div class="not-found-wrapper">
      <p class="meta-text">Error 404</p>
      <h1>Page not found</h1>
      <p class="not-found-copy">
        The page you're looking for doesn't exist or has moved.
      </p>
      <a href="/" class={buttonVariants({ size: "lg" })}>Go back home</a>
    </div>
  </main>

  <Footer />
</Layout>

<style>
  #main-content {
    @apply mx-auto flex w-full max-w-5xl flex-1 items-center justify-center px-4;
  }
  .not-found-wrapper {
    @apply mb-14 flex flex-col items-center gap-4 text-center;
  }
  .not-found-wrapper h1 {
    @apply text-5xl font-semibold sm:text-6xl;
  }
  .not-found-copy {
    @apply text-muted-foreground;
  }
</style>
```

- [ ] **Step 7: About page heading**

In `src/layouts/AboutLayout.astro`, change the `<h1 class=…>` to:

```astro
      <h1 class="font-serif text-4xl font-semibold sm:text-5xl">
```

- [ ] **Step 8: Verify**

```bash
PUBLIC_SUPABASE_URL=https://example.supabase.co PUBLIC_SUPABASE_ANON_KEY=dummy npm run build
npm run lint
npm test
grep -c 'andrew do' dist/index.html
grep -c 'theme-btn\|logo-text' dist/index.html
```

Expected: build `✔ No issues`; lint clean; tests PASS; first grep ≥ 1; second grep `0`.

Then `npm run preview` and open `http://localhost:4321/`: click the theme toggle → page switches dark/light and the tooltip reads "Switch to … mode"; reload → choice persists; at 390px wide the hamburger opens/closes the link list; Tab from page load focuses "Skip to content" first with a visible ring.

- [ ] **Step 9: Format and commit**

```bash
npx prettier --write --plugin=prettier-plugin-astro src/components/Header.astro src/components/Footer.astro src/components/Socials.astro src/components/ThemeToggle.tsx src/pages/404.astro src/layouts/AboutLayout.astro src/env.d.ts public/toggle-theme.js
git add src/components/Header.astro src/components/Footer.astro src/components/Socials.astro src/components/ThemeToggle.tsx src/pages/404.astro src/layouts/AboutLayout.astro src/env.d.ts public/toggle-theme.js src/styles/base.css
git commit -m "feat: restyle header, footer and theme toggle

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 4: Home page (featured grid, recent list, utilities)

**Files:**

- Create: `src/test/makePost.ts`
- Create: `src/utils/formatDate.ts`, `src/utils/formatDate.test.ts`
- Create: `src/utils/getReadingTime.ts`, `src/utils/getReadingTime.test.ts`
- Create: `src/utils/getHomePosts.ts`, `src/utils/getHomePosts.test.ts`
- Create: `src/components/PostRow.astro`, `src/components/FeaturedCard.astro`
- Rewrite: `src/pages/index.astro`
- Modify: `src/types.ts`, `src/config.ts`

**Interfaces:**

- Consumes: `buttonVariants` (Task 2); `.post-list`, `.meta-text` (Task 1).
- Produces:

  - `formatDate(date: Date, locales?: string | string[]): string` → e.g. `"Aug 14, 2024"` (always UTC)
  - `getReadingTime(markdown: string): number` (whole minutes, ≥ 1)
  - `getHomePosts(sortedPosts: CollectionEntry<"blog">[], featuredLimit = 4, recentLimit = 5): { featured: CollectionEntry<"blog">[]; recent: CollectionEntry<"blog">[] }`
  - `makePost(overrides?: { slug?: string; body?: string; data?: Partial<CollectionEntry<"blog">["data"]> }): CollectionEntry<"blog">`
  - `<PostRow post={CollectionEntry<"blog">} headingLevel?: "h2" | "h3" />` (renders an `<li>`; wrap in `<ul class="post-list">`)
  - `<FeaturedCard post={CollectionEntry<"blog">} />` (renders an `<li>`)
  - `SITE.role: string`, `SITE.headline: string`

- [ ] **Step 1: Create the test fixture `src/test/makePost.ts`**

```ts
import type { CollectionEntry } from "astro:content";

type Post = CollectionEntry<"blog">;

export function makePost(
  overrides: {
    slug?: string;
    body?: string;
    data?: Partial<Post["data"]>;
  } = {},
): Post {
  const slug = overrides.slug ?? "post";
  return {
    id: `${slug}.md`,
    slug,
    body: overrides.body ?? "Some words here.",
    collection: "blog",
    data: {
      author: "andrewdo",
      pubDatetime: new Date("2024-01-01T00:00:00Z"),
      title: `Title ${slug}`,
      description: `Description ${slug}`,
      tags: ["others"],
      ...overrides.data,
    },
  } as unknown as Post;
}
```

- [ ] **Step 2: Write failing tests for the three utilities**

`src/utils/formatDate.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import formatDate from "./formatDate";

describe("formatDate", () => {
  it("formats as MMM DD, YYYY", () => {
    expect(formatDate(new Date("2026-07-20T15:30:00Z"))).toBe("Jul 20, 2026");
  });

  it("uses UTC so late-evening UTC posts keep their date", () => {
    expect(formatDate(new Date("2024-08-14T22:30:00Z"))).toBe("Aug 14, 2024");
    expect(formatDate(new Date("2024-08-14T00:30:00Z"))).toBe("Aug 14, 2024");
  });

  it("pads single-digit days", () => {
    expect(formatDate(new Date("2024-09-07T20:31:00Z"))).toBe("Sep 07, 2024");
  });
});
```

`src/utils/getReadingTime.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import getReadingTime from "./getReadingTime";

const words = (n: number) => Array.from({ length: n }, () => "word").join(" ");

describe("getReadingTime", () => {
  it("returns at least 1 minute for an empty body", () => {
    expect(getReadingTime("")).toBe(1);
    expect(getReadingTime("   \n\n ")).toBe(1);
  });

  it("returns 1 minute for exactly 200 words", () => {
    expect(getReadingTime(words(200))).toBe(1);
  });

  it("rounds up partial minutes", () => {
    expect(getReadingTime(words(201))).toBe(2);
    expect(getReadingTime(words(950))).toBe(5);
  });

  it("counts words split by any whitespace", () => {
    expect(getReadingTime(`${words(150)}\n\n${words(150)}\t`)).toBe(2);
  });
});
```

`src/utils/getHomePosts.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { makePost } from "../test/makePost";
import getHomePosts from "./getHomePosts";

const slugs = (posts: { slug: string }[]) => posts.map((p) => p.slug);

describe("getHomePosts", () => {
  it("takes the first 4 featured posts in the given (newest-first) order", () => {
    const posts = ["a", "b", "c", "d", "e", "f"].map((slug) =>
      makePost({ slug, data: { featured: true } }),
    );
    expect(slugs(getHomePosts(posts).featured)).toEqual(["a", "b", "c", "d"]);
  });

  it("fills recent with the next 5 posts not shown in featured", () => {
    const posts = Array.from({ length: 12 }, (_, i) =>
      makePost({ slug: `p${i}`, data: { featured: i % 2 === 0 } }),
    );
    const { featured, recent } = getHomePosts(posts);
    expect(slugs(featured)).toEqual(["p0", "p2", "p4", "p6"]);
    expect(slugs(recent)).toEqual(["p1", "p3", "p5", "p7", "p8"]);
  });

  it("never repeats a post across sections", () => {
    const posts = Array.from({ length: 14 }, (_, i) =>
      makePost({ slug: `p${i}`, data: { featured: true } }),
    );
    const { featured, recent } = getHomePosts(posts);
    const all = [...slugs(featured), ...slugs(recent)];
    expect(new Set(all).size).toBe(all.length);
    expect(featured).toHaveLength(4);
    expect(recent).toHaveLength(5);
  });

  it("returns an empty featured list when nothing is featured", () => {
    const posts = ["a", "b"].map((slug) => makePost({ slug }));
    const { featured, recent } = getHomePosts(posts);
    expect(featured).toEqual([]);
    expect(slugs(recent)).toEqual(["a", "b"]);
  });

  it("handles fewer posts than the limits", () => {
    const posts = [makePost({ slug: "only", data: { featured: true } })];
    const { featured, recent } = getHomePosts(posts);
    expect(slugs(featured)).toEqual(["only"]);
    expect(recent).toEqual([]);
  });
});
```

- [ ] **Step 3: Run them to verify they fail**

Run: `npm test -- src/utils`
Expected: FAIL — `Failed to resolve import "./formatDate"` (and the same for the other two).

- [ ] **Step 4: Implement the utilities**

`src/utils/formatDate.ts`:

```ts
const formatDate = (date: Date, locales: string | string[] = "en-US") =>
  date.toLocaleDateString(locales, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  });

export default formatDate;
```

`src/utils/getReadingTime.ts`:

```ts
const WORDS_PER_MINUTE = 200;

const getReadingTime = (markdown: string) => {
  const words = markdown.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
};

export default getReadingTime;
```

`src/utils/getHomePosts.ts`:

```ts
import type { CollectionEntry } from "astro:content";

type Post = CollectionEntry<"blog">;

const getHomePosts = (
  sortedPosts: Post[],
  featuredLimit = 4,
  recentLimit = 5,
) => {
  const featured = sortedPosts
    .filter(({ data }) => data.featured)
    .slice(0, featuredLimit);
  const featuredIds = new Set(featured.map(({ id }) => id));
  const recent = sortedPosts
    .filter(({ id }) => !featuredIds.has(id))
    .slice(0, recentLimit);
  return { featured, recent };
};

export default getHomePosts;
```

- [ ] **Step 5: Run the tests to verify they pass**

Run: `npm test -- src/utils`
Expected: PASS (12 tests). Note: `formatDate` passes `"en-US"` in tests; `LOCALE.langTag` is `["en-EN"]`, and `"en-EN"` produces the same `MMM DD, YYYY` shape. Verify with `node -e 'console.log(new Date("2024-09-07T20:31:00Z").toLocaleDateString(["en-EN"],{year:"numeric",month:"short",day:"2-digit",timeZone:"UTC"}))'` → `Sep 07, 2024`.

- [ ] **Step 6: Add `role` and `headline` to the site config**

In `src/types.ts`, add to `Site` after `fact: string,`:

```ts
role: string;
headline: string;
```

In `src/config.ts`, add to `SITE` after the `fact` line:

```ts
  role: "Mobile engineer · Android / iOS / Flutter",
  headline: "Notes on building mobile apps.",
```

- [ ] **Step 7: Create `src/components/PostRow.astro`**

```astro
---
import type { CollectionEntry } from "astro:content";
import { LOCALE } from "@config";
import formatDate from "@utils/formatDate";
import getReadingTime from "@utils/getReadingTime";
import { slugifyStr } from "@utils/slugify";

export interface Props {
  post: CollectionEntry<"blog">;
  headingLevel?: "h2" | "h3";
}

const { post, headingLevel = "h3" } = Astro.props;
const { title, description, pubDatetime } = post.data;
const Heading = headingLevel;
---

<li>
  <a href={`/posts/${post.slug}/`} class="post-row group">
    <p class="meta-text">
      <time datetime={pubDatetime.toISOString()}>
        {formatDate(pubDatetime, LOCALE.langTag)}
      </time>
      <span aria-hidden="true"> · </span>
      {getReadingTime(post.body)} min read
    </p>
    <Heading
      class="post-row-title"
      style={`view-transition-name: ${slugifyStr(title)}`}
    >
      {title}
    </Heading>
    <p class="post-row-desc">{description}</p>
  </a>
</li>

<style>
  .post-row {
    @apply flex min-h-11 flex-col gap-1 px-5 py-4 hover:bg-muted/60 focus-visible:outline-offset-[-2px];
  }
  .post-row-title {
    @apply font-sans text-base font-medium tracking-tight text-foreground group-hover:text-primary;
  }
  .post-row-desc {
    @apply line-clamp-1 text-sm text-muted-foreground;
  }
</style>
```

- [ ] **Step 8: Create `src/components/FeaturedCard.astro`**

```astro
---
import type { CollectionEntry } from "astro:content";
import getReadingTime from "@utils/getReadingTime";
import { slugifyStr } from "@utils/slugify";

export interface Props {
  post: CollectionEntry<"blog">;
}

const { post } = Astro.props;
const { title, description, tags } = post.data;
---

<li>
  <a href={`/posts/${post.slug}/`} class="featured-card group">
    <p class="meta-text">
      {tags[0]}<span aria-hidden="true"> · </span>{getReadingTime(post.body)} min
      read
    </p>
    <h3
      class="featured-title"
      style={`view-transition-name: ${slugifyStr(title)}`}
    >
      {title}
    </h3>
    <p class="featured-desc">{description}</p>
  </a>
</li>

<style>
  .featured-card {
    @apply flex h-full flex-col gap-2 rounded-xl border border-border bg-card p-5 transition-colors hover:border-primary/50;
  }
  .featured-title {
    @apply text-xl font-semibold leading-snug text-foreground group-hover:text-primary;
  }
  .featured-desc {
    @apply line-clamp-2 text-sm text-muted-foreground;
  }
</style>
```

- [ ] **Step 9: Rewrite `src/pages/index.astro`**

```astro
---
import { getCollection } from "astro:content";
import Layout from "@layouts/Layout.astro";
import Header from "@components/Header.astro";
import Footer from "@components/Footer.astro";
import FeaturedCard from "@components/FeaturedCard.astro";
import PostRow from "@components/PostRow.astro";
import getSortedPosts from "@utils/getSortedPosts";
import getHomePosts from "@utils/getHomePosts";
import { SITE } from "@config";
import { buttonVariants } from "@/components/ui/button";

const posts = await getCollection("blog");
const { featured, recent } = getHomePosts(getSortedPosts(posts));
---

<Layout>
  <Header />
  <main id="main-content">
    <section id="hero">
      <p class="role">{SITE.role}</p>
      <h1>{SITE.headline}</h1>
      <p class="intro">{SITE.quickIntroduceMySelf}</p>
      <div class="hero-actions">
        <a
          href="/posts/"
          class={buttonVariants({ className: "min-h-11 rounded-full px-5" })}
        >
          Read the blog
        </a>
        <a href="/about/" class="about-link">About me</a>
      </div>
    </section>

    {
      featured.length > 0 && (
        <section id="featured" aria-labelledby="featured-heading">
          <div class="section-heading">
            <h2 id="featured-heading">Featured</h2>
          </div>
          <ul class="featured-grid">
            {featured.map(post => (
              <FeaturedCard post={post} />
            ))}
          </ul>
        </section>
      )
    }

    {
      recent.length > 0 && (
        <section id="recent-posts" aria-labelledby="recent-heading">
          <div class="section-heading">
            <h2 id="recent-heading">Recent writing</h2>
            <a href="/posts/" class="all-link">
              All posts →
            </a>
          </div>
          <ul class="post-list">
            {recent.map(post => (
              <PostRow post={post} />
            ))}
          </ul>
        </section>
      )
    }
  </main>

  <Footer />
</Layout>

<style>
  #hero {
    @apply pb-8 pt-14 sm:pb-12 sm:pt-24;
  }
  .role {
    @apply font-mono text-xs uppercase tracking-[0.08em] text-primary;
  }
  #hero h1 {
    @apply mt-3 max-w-3xl text-4xl font-semibold leading-[1.1] sm:text-6xl;
  }
  .intro {
    @apply mt-5 max-w-[62ch] text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8;
  }
  .hero-actions {
    @apply mt-7 flex flex-wrap items-center gap-4;
  }
  .about-link {
    @apply inline-flex min-h-11 items-center border-b border-border text-sm text-muted-foreground hover:border-foreground hover:text-foreground;
  }
  #featured,
  #recent-posts {
    @apply pb-8 pt-6;
  }
  .section-heading {
    @apply mb-4 flex items-baseline justify-between gap-3;
  }
  .section-heading h2 {
    @apply text-2xl font-semibold;
  }
  .all-link {
    @apply inline-flex min-h-11 items-center text-sm text-primary hover:underline;
  }
  .featured-grid {
    @apply grid gap-3 sm:grid-cols-2;
  }
  main {
    @apply pb-12;
  }
</style>
```

- [ ] **Step 10: Verify with the real posts**

```bash
npm test
PUBLIC_SUPABASE_URL=https://example.supabase.co PUBLIC_SUPABASE_ANON_KEY=dummy npm run build
npm run lint
grep -o 'class="featured-card' dist/index.html | wc -l
grep -o 'class="post-row' dist/index.html | wc -l
grep -o '0 min read' dist/index.html | wc -l
```

Expected: tests PASS; build `✔ No issues`; counts `4`, `5`, `0`. Open `npm run preview` → home: hero in serif, amber role line, 2-column featured grid (1 column at 390px), recent list with hairline dividers.

- [ ] **Step 11: Format and commit**

```bash
npx prettier --write --plugin=prettier-plugin-astro src/test src/utils/formatDate.ts src/utils/formatDate.test.ts src/utils/getReadingTime.ts src/utils/getReadingTime.test.ts src/utils/getHomePosts.ts src/utils/getHomePosts.test.ts src/components/PostRow.astro src/components/FeaturedCard.astro src/pages/index.astro src/types.ts src/config.ts
git add src/test src/utils/formatDate.ts src/utils/formatDate.test.ts src/utils/getReadingTime.ts src/utils/getReadingTime.test.ts src/utils/getHomePosts.ts src/utils/getHomePosts.test.ts src/components/PostRow.astro src/components/FeaturedCard.astro src/pages/index.astro src/types.ts src/config.ts
git commit -m "feat: redesign home page with featured grid and recent list

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 5: Post lists, tags, pagination

**Files:**

- Modify: `src/layouts/Main.astro` (styles), `src/layouts/Posts.astro`, `src/layouts/TagPosts.astro`, `src/components/Breadcrumbs.astro` (styles)
- Rewrite: `src/components/Pagination.astro`, `src/components/Tag.astro`, `src/pages/tags/index.astro`

**Interfaces:**

- Consumes: `PostRow` (Task 4); `badgeVariants` with `variant: "tag"`, `buttonVariants`, `cn` (Task 2).
- Produces: `<Tag tag: string; count?: number; size?: "sm" | "lg" />` (renders an `<li>`); used by Task 6.

- [ ] **Step 1: Restyle `src/layouts/Main.astro`**

Replace its `<style>` block with:

```astro
<style>
  #main-content {
    @apply mx-auto w-full max-w-5xl px-4 pb-12;
  }
  .page-heading {
    @apply mb-8 pt-6 sm:pt-10;
  }
  #main-content h1 {
    @apply text-4xl font-semibold leading-tight sm:text-5xl;
  }
  .page-heading p {
    @apply mt-3 max-w-2xl text-base leading-7 text-muted-foreground;
  }
</style>
```

- [ ] **Step 2: Restyle `src/components/Breadcrumbs.astro`**

Replace its `<style>` block with:

```astro
<style>
  .breadcrumb {
    @apply mx-auto mb-1 mt-6 w-full max-w-5xl px-4 font-mono text-xs text-muted-foreground;
  }
  .breadcrumb ul li {
    @apply inline;
  }
  .breadcrumb ul li a {
    @apply rounded-sm capitalize hover:text-primary;
  }
</style>
```

- [ ] **Step 3: Use `PostRow` in `Posts.astro` and `TagPosts.astro`**

In both files replace `import Card from "@components/Card";` with `import PostRow from "@components/PostRow.astro";`, and replace the `<ul>…</ul>` block with:

```astro
    <ul class="post-list">
      {paginatedPosts.map(post => <PostRow post={post} headingLevel="h2" />)}
    </ul>
```

- [ ] **Step 4: Rewrite `src/components/Pagination.astro`**

```astro
---
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface Props {
  currentPage: number;
  totalPages: number;
  prevUrl: string;
  nextUrl: string;
}

const { currentPage, totalPages, prevUrl, nextUrl } = Astro.props;

const hasPrev = currentPage > 1;
const hasNext = currentPage < totalPages;
const linkClass = cn(buttonVariants({ variant: "ghost" }), "min-h-11");
---

{
  totalPages > 1 && (
    <nav class="pagination-wrapper" aria-label="Pagination">
      {hasPrev ? (
        <a href={prevUrl} class={linkClass} rel="prev">
          ← Newer
        </a>
      ) : (
        <span class={cn(linkClass, "pointer-events-none opacity-40")} aria-disabled="true">
          ← Newer
        </span>
      )}
      <span class="meta-text">
        Page {currentPage} of {totalPages}
      </span>
      {hasNext ? (
        <a href={nextUrl} class={linkClass} rel="next">
          Older →
        </a>
      ) : (
        <span class={cn(linkClass, "pointer-events-none opacity-40")} aria-disabled="true">
          Older →
        </span>
      )}
    </nav>
  )
}

<style>
  .pagination-wrapper {
    @apply mx-auto mb-8 mt-auto flex w-full max-w-5xl items-center justify-between gap-3 px-4;
  }
</style>
```

- [ ] **Step 5: Rewrite `src/components/Tag.astro`**

```astro
---
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export interface Props {
  tag: string;
  count?: number;
  size?: "sm" | "lg";
}

const { tag, count, size = "sm" } = Astro.props;
---

<li class="inline-block">
  <a
    href={`/tags/${tag}/`}
    transition:name={tag}
    class={cn(
      badgeVariants({ variant: "tag" }),
      "tag-pill",
      size === "lg" && "px-3 py-1 text-sm",
    )}
  >
    #{tag}
    {count !== undefined && <span class="tag-count">{count}</span>}
  </a>
</li>

<style>
  .tag-pill {
    @apply relative gap-1.5 font-normal;
  }
  /* enlarge the hit area to ≥ 44px without enlarging the pill */
  .tag-pill::after {
    content: "";
    @apply absolute -inset-y-3 inset-x-0;
  }
  .tag-count {
    @apply font-mono text-[0.7rem] opacity-70;
  }
</style>
```

- [ ] **Step 6: Tag counts on the tags index**

Rewrite `src/pages/tags/index.astro`:

```astro
---
import { getCollection } from "astro:content";
import Header from "@components/Header.astro";
import Footer from "@components/Footer.astro";
import Layout from "@layouts/Layout.astro";
import Main from "@layouts/Main.astro";
import Tag from "@components/Tag.astro";
import getUniqueTags from "@utils/getUniqueTags";
import getPostsByTag from "@utils/getPostsByTag";
import { SITE } from "@config";

const posts = await getCollection("blog");

const tags = getUniqueTags(posts).map(({ tag }) => ({
  tag,
  count: getPostsByTag(posts, tag).length,
}));
---

<Layout title={`Tags | ${SITE.title}`}>
  <Header activeNav="tags" />
  <Main pageTitle="Tags" pageDesc="All the tags used in posts.">
    <ul class="flex flex-wrap gap-x-2 gap-y-4">
      {tags.map(({ tag, count }) => <Tag {tag} {count} size="lg" />)}
    </ul>
  </Main>
  <Footer />
</Layout>
```

- [ ] **Step 7: Verify**

```bash
PUBLIC_SUPABASE_URL=https://example.supabase.co PUBLIC_SUPABASE_ANON_KEY=dummy npm run build
npm run lint
npm test
grep -o 'class="post-row' dist/posts/index.html | wc -l
grep -o 'tag-count' dist/tags/index.html | wc -l
grep -rl '@components/Card' src/layouts src/pages || echo "no Card in layouts/pages"
```

Expected: build `✔ No issues`; first count `10` (`postPerPage`); second count equals the number of tags (> 0); last prints `no Card in layouts/pages`. Preview `/posts/`, `/posts/2/`, `/tags/`, `/tags/flutter/` at 390px and 1280px.

- [ ] **Step 8: Format and commit**

```bash
npx prettier --write --plugin=prettier-plugin-astro src/layouts/Main.astro src/layouts/Posts.astro src/layouts/TagPosts.astro src/components/Breadcrumbs.astro src/components/Pagination.astro src/components/Tag.astro src/pages/tags/index.astro
git add src/layouts/Main.astro src/layouts/Posts.astro src/layouts/TagPosts.astro src/components/Breadcrumbs.astro src/components/Pagination.astro src/components/Tag.astro src/pages/tags/index.astro
git commit -m "feat: restyle post lists, tags and pagination

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 6: Post page with sticky table of contents

**Files:**

- Create: `src/utils/getTocHeadings.ts`, `src/utils/getTocHeadings.test.ts`, `src/components/TableOfContents.astro`
- Rewrite: `src/layouts/PostDetails.astro`
- Modify: `src/components/PostViews.tsx`

**Interfaces:**

- Consumes: `formatDate`, `getReadingTime` (Task 4); `Tag` (Task 5); `buttonVariants`, `cn` (Task 2).
- Produces: `getTocHeadings(headings: MarkdownHeading[]): MarkdownHeading[]`; `<TableOfContents headings={MarkdownHeading[]} variant: "sidebar" | "inline" />`; `<PostViews slug: string />` (the `size` prop is removed).

- [ ] **Step 1: Write the failing TOC test**

`src/utils/getTocHeadings.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import getTocHeadings from "./getTocHeadings";

const h = (depth: number, slug: string) => ({ depth, slug, text: slug });

describe("getTocHeadings", () => {
  it("keeps only h2 and h3", () => {
    const result = getTocHeadings([
      h(1, "title"),
      h(2, "intro"),
      h(3, "detail"),
      h(4, "deep"),
      h(2, "outro"),
    ]);
    expect(result.map((x) => x.slug)).toEqual(["intro", "detail", "outro"]);
  });

  it("returns nothing when fewer than 2 headings remain", () => {
    expect(getTocHeadings([h(2, "only")])).toEqual([]);
    expect(getTocHeadings([])).toEqual([]);
    expect(getTocHeadings([h(1, "a"), h(4, "b"), h(2, "c")])).toEqual([]);
  });

  it("drops a remark-toc 'Table of contents' heading", () => {
    const result = getTocHeadings([
      h(2, "table-of-contents"),
      h(2, "intro"),
      h(2, "outro"),
    ]);
    expect(result.map((x) => x.slug)).toEqual(["intro", "outro"]);
  });
});
```

Run: `npm test -- src/utils/getTocHeadings.test.ts`
Expected: FAIL — `Failed to resolve import "./getTocHeadings"`.

- [ ] **Step 2: Implement `src/utils/getTocHeadings.ts`**

```ts
import type { MarkdownHeading } from "astro";

const MIN_HEADINGS = 2;

const getTocHeadings = (headings: MarkdownHeading[]) => {
  const toc = headings.filter(
    ({ depth, slug }) =>
      (depth === 2 || depth === 3) && slug !== "table-of-contents",
  );
  return toc.length >= MIN_HEADINGS ? toc : [];
};

export default getTocHeadings;
```

Run: `npm test -- src/utils/getTocHeadings.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 3: Create `src/components/TableOfContents.astro`**

```astro
---
import type { MarkdownHeading } from "astro";

export interface Props {
  headings: MarkdownHeading[];
  variant: "sidebar" | "inline";
}

const { headings, variant } = Astro.props;

const list = (
  <ol class="toc-list">
    {headings.map(({ depth, slug, text }) => (
      <li class:list={[{ "pl-3": depth === 3 }]}>
        <a href={`#${slug}`} class="toc-link" data-toc-link={slug}>
          {text}
        </a>
      </li>
    ))}
  </ol>
);
---

{
  variant === "sidebar" ? (
    <nav class="toc-sidebar" aria-label="On this page">
      <p class="meta-text toc-heading">On this page</p>
      {list}
    </nav>
  ) : (
    <details class="toc-inline">
      <summary class="meta-text">On this page</summary>
      {list}
    </details>
  )
}

<style>
  .toc-sidebar {
    @apply sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto border-l border-border pl-4;
  }
  .toc-heading {
    @apply mb-2 uppercase;
  }
  .toc-inline {
    @apply mb-8 rounded-xl border border-border bg-card px-4 py-3;
  }
  .toc-inline summary {
    @apply flex min-h-11 cursor-pointer items-center uppercase;
  }
  .toc-list {
    @apply flex flex-col text-sm;
  }
  .toc-link {
    @apply -ml-[17px] block border-l-2 border-transparent py-1.5 pl-[15px] text-muted-foreground hover:text-foreground;
  }
  .toc-inline .toc-link {
    @apply ml-0 border-l-0 pl-0;
  }
  .toc-link[data-active="true"] {
    @apply border-primary font-medium text-primary;
  }
</style>
```

- [ ] **Step 4: Make `PostViews` an inline mono count**

Replace the `return (…)` in `src/components/PostViews.tsx` and the `Props`/signature:

```tsx
interface Props {
  slug: string;
}

export default function PostViews({ slug }: Props) {
```

```tsx
return (
  <span>{views == null ? "… views" : `${views.toLocaleString()} views`}</span>
);
```

(Keep the `useEffect` that calls `supabase.rpc("increment_view", …)` unchanged.)

- [ ] **Step 5: Rewrite the markup and styles of `src/layouts/PostDetails.astro`**

Replace the frontmatter imports and the `const { Content } = await post.render();` line with:

```astro
---
import Layout from "@layouts/Layout.astro";
import Header from "@components/Header.astro";
import Footer from "@components/Footer.astro";
import Tag from "@components/Tag.astro";
import TableOfContents from "@components/TableOfContents.astro";
import type { CollectionEntry } from "astro:content";
import { slugifyStr } from "@utils/slugify";
import ShareLinks from "@components/ShareLinks.astro";
import PostViews from "@components/PostViews";
import formatDate from "@utils/formatDate";
import getReadingTime from "@utils/getReadingTime";
import getTocHeadings from "@utils/getTocHeadings";
import { LOCALE, SITE } from "@config";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
```

and (keeping the `Props`, `post.data` destructuring, `ogUrl` and `layoutProps` code as-is):

```ts
const { Content, headings } = await post.render();
const tocHeadings = getTocHeadings(headings);
const readingTime = getReadingTime(post.body);
const isUpdated = modDatetime && modDatetime > pubDatetime;
```

Replace everything from `<Layout {...layoutProps}>` to the closing `</style>` with:

```astro
<Layout {...layoutProps}>
  <Header />
  <main id="main-content">
    <nav class="post-crumb meta-text" aria-label="breadcrumb">
      <a href="/posts/">← Posts</a>
      {
        tags[0] && (
          <>
            <span aria-hidden="true"> / </span>
            <a href={`/tags/${slugifyStr(tags[0])}/`}>{slugifyStr(tags[0])}</a>
          </>
        )
      }
    </nav>
    <header class="post-header">
      <h1 transition:name={slugifyStr(title)} class="post-title">{title}</h1>
      <p class="post-description">{description}</p>
      <p class="post-meta meta-text">
        <time datetime={pubDatetime.toISOString()}>
          {formatDate(pubDatetime, LOCALE.langTag)}
        </time>
        {
          isUpdated && (
            <span>
              · updated{" "}
              <time datetime={modDatetime.toISOString()}>
                {formatDate(modDatetime, LOCALE.langTag)}
              </time>
            </span>
          )
        }
        <span aria-hidden="true">·</span>
        <span>{readingTime} min read</span>
        <span aria-hidden="true">·</span>
        <PostViews slug={post.slug} client:load />
      </p>
      <ul class="post-tags">
        {tags.map(tag => <Tag tag={slugifyStr(tag)} />)}
      </ul>
    </header>

    <div class:list={["post-layout", { "has-toc": tocHeadings.length > 0 }]}>
      <div class="min-w-0">
        {
          tocHeadings.length > 0 && (
            <div class="lg:hidden">
              <TableOfContents headings={tocHeadings} variant="inline" />
            </div>
          )
        }
        <article id="article" role="article" class="prose">
          <Content />
        </article>
      </div>
      {
        tocHeadings.length > 0 && (
          <aside class="hidden lg:block">
            <TableOfContents headings={tocHeadings} variant="sidebar" />
          </aside>
        )
      }
    </div>

    <footer class="post-footer">
      <ul class="post-tags">
        {tags.map(tag => <Tag tag={slugifyStr(tag)} />)}
      </ul>
      <div class="post-footer-row">
        <ShareLinks />
        <button
          id="back-to-top"
          type="button"
          class={cn(buttonVariants({ variant: "ghost" }), "min-h-11")}
        >
          ↑ Back to top
        </button>
      </div>
    </footer>
  </main>
  <Footer />
</Layout>

<style>
  main {
    @apply mx-auto w-full max-w-5xl px-4 pb-12;
  }
  .post-crumb {
    @apply mt-8;
  }
  .post-crumb a {
    @apply hover:text-primary;
  }
  .post-header {
    @apply max-w-3xl pt-4;
  }
  .post-title {
    @apply text-4xl font-semibold leading-[1.1] sm:text-5xl;
  }
  .post-description {
    @apply mt-4 text-lg leading-8 text-muted-foreground;
  }
  .post-meta {
    @apply mt-5 flex flex-wrap items-center gap-x-2 gap-y-1;
  }
  .post-tags {
    @apply mt-4 flex flex-wrap gap-2;
  }
  .post-layout {
    @apply mt-10 border-t border-border pt-10;
  }
  .post-layout.has-toc {
    @apply lg:grid lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-12;
  }
  .post-layout .prose {
    @apply max-w-[68ch];
  }
  .post-footer {
    @apply mt-12 max-w-[68ch] border-t border-border pt-6;
  }
  .post-footer-row {
    @apply mt-6 flex flex-col-reverse items-center justify-between gap-4 sm:flex-row;
  }
</style>
```

- [ ] **Step 6: Update the inline script**

In the `<script is:inline>` block of `PostDetails.astro`:

(a) Replace the body of `createProgressBar()` with:

```js
const progressContainer = document.createElement("div");
progressContainer.className =
  "progress-container fixed top-0 z-30 h-[3px] w-full bg-transparent";
const progressBar = document.createElement("div");
progressBar.className = "progress-bar h-full w-0 bg-primary";
progressBar.id = "myBar";
progressContainer.appendChild(progressBar);
document.body.appendChild(progressContainer);
```

(b) In `addHeadingLinks()`, change the selector to `"#article h2, #article h3, #article h4, #article h5, #article h6"` so TOC/page headings outside the article don't get `#` links.

(c) In `attachCopyButtons()`, change `copyButton.className` to:

```js
copyButton.className =
  "copy-code focus-outline absolute right-3 top-3 inline-flex min-h-8 items-center rounded-md border border-border bg-background px-2.5 font-sans text-xs font-medium text-muted-foreground transition hover:text-foreground";
```

(d) Append before the closing `</script>`:

```js
/** Highlights the TOC entry for the heading currently in view. */
function spyToc() {
  const links = Array.from(document.querySelectorAll("[data-toc-link]"));
  if (links.length === 0) return;
  const targets = links
    .map((link) => document.getElementById(link.dataset.tocLink))
    .filter(Boolean);
  const setActive = (id) =>
    links.forEach((link) =>
      link.setAttribute("data-active", String(link.dataset.tocLink === id)),
    );
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    },
    { rootMargin: "-80px 0px -70% 0px" },
  );
  targets.forEach((target) => observer.observe(target));
}
spyToc();
```

- [ ] **Step 7: Verify**

```bash
npm test
PUBLIC_SUPABASE_URL=https://example.supabase.co PUBLIC_SUPABASE_ANON_KEY=dummy npm run build
npm run lint
P=dist/posts/mastering-state-management-in-flutter-a-bloc-pattern-guide/index.html
grep -o 'data-toc-link' $P | wc -l
grep -o 'min read' $P | head -1
for f in dist/posts/*/index.html; do printf "%s %s\n" "$(grep -o 'data-toc-link' "$f" | wc -l)" "$f"; done | sort -n | head -3
```

Expected: tests PASS; build `✔ No issues`; the BLoC post has an even, non-zero count (each heading appears in the inline and sidebar TOCs); `min read` present; posts with 0 links have fewer than 2 h2/h3 headings (open one and confirm no "On this page" box). In `npm run preview` at 1280px: sticky TOC on the right highlights while scrolling; at 390px: collapsible "On this page" box above the article; code blocks use light colors in light mode and dim-dark colors in dark mode; Copy shows "Copied".

- [ ] **Step 8: Format and commit**

```bash
npx prettier --write --plugin=prettier-plugin-astro src/utils/getTocHeadings.ts src/utils/getTocHeadings.test.ts src/components/TableOfContents.astro src/components/PostViews.tsx src/layouts/PostDetails.astro
git add src/utils/getTocHeadings.ts src/utils/getTocHeadings.test.ts src/components/TableOfContents.astro src/components/PostViews.tsx src/layouts/PostDetails.astro
git commit -m "feat: redesign post page with sticky table of contents

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 7: ⌘K search palette and search page

**Files:**

- Create: `src/utils/toSearchItems.ts`, `src/utils/toSearchItems.test.ts`, `src/utils/getSearchStatusMessage.ts`, `src/utils/getSearchStatusMessage.test.ts`, `src/pages/search.json.ts`, `src/components/SearchResultItem.tsx`, `src/components/SearchPalette.tsx`
- Modify: `src/components/Search.tsx`, `src/pages/search.astro`, `src/components/Header.astro` (swap the search link for the palette)
- Delete: `src/components/Card.tsx`, `src/components/Datetime.tsx` (only if no imports remain)

**Interfaces:**

- Consumes: `makePost` (Task 4), `formatDate` (Task 4), `Dialog*`, `Command*`, `Button`, `Badge` (Task 2), `.nav-actions` in Header (Task 3).
- Produces:

  - `type SearchItem = { title: string; description: string; slug: string; pubDatetime: string; tags: string[] }`
  - `toSearchItems(posts: CollectionEntry<"blog">[]): SearchItem[]`
  - `type SearchStatus = "loading" | "error" | "ready"`; `getSearchStatusMessage(status: SearchStatus, query: string): string`
  - `GET /search.json` → `SearchItem[]`
  - `<SearchResultItem item={SearchItem} />`, `<SearchPalette />`

- [ ] **Step 1: Write failing tests**

`src/utils/toSearchItems.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { makePost } from "../test/makePost";
import toSearchItems from "./toSearchItems";

describe("toSearchItems", () => {
  it("keeps only the fields the palette needs, in input order", () => {
    const posts = [
      makePost({
        slug: "b",
        data: {
          title: "Bloc",
          description: "State",
          pubDatetime: new Date("2025-03-26T21:45:00Z"),
          tags: ["flutter", "bloc"],
        },
      }),
      makePost({ slug: "a" }),
    ];
    const items = toSearchItems(posts);
    expect(items[0]).toEqual({
      title: "Bloc",
      description: "State",
      slug: "b",
      pubDatetime: "2025-03-26T21:45:00.000Z",
      tags: ["flutter", "bloc"],
    });
    expect(items.map((i) => i.slug)).toEqual(["b", "a"]);
  });

  it("returns an empty list for no posts", () => {
    expect(toSearchItems([])).toEqual([]);
  });
});
```

`src/utils/getSearchStatusMessage.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import getSearchStatusMessage from "./getSearchStatusMessage";

describe("getSearchStatusMessage", () => {
  it("shows loading while the index is fetched", () => {
    expect(getSearchStatusMessage("loading", "flu")).toBe("Loading posts…");
  });

  it("points to the search page when the index fails to load", () => {
    expect(getSearchStatusMessage("error", "")).toBe(
      "Couldn't load search. Try the search page at /search/.",
    );
  });

  it("names the query when nothing matches", () => {
    expect(getSearchStatusMessage("ready", "kotlin")).toBe(
      'No posts found for "kotlin".',
    );
  });

  it("falls back to a generic message for an empty query", () => {
    expect(getSearchStatusMessage("ready", "  ")).toBe("No posts yet.");
  });
});
```

Run: `npm test -- src/utils/toSearchItems.test.ts src/utils/getSearchStatusMessage.test.ts`
Expected: FAIL — unresolved imports.

- [ ] **Step 2: Implement the utilities**

`src/utils/toSearchItems.ts`:

```ts
import type { CollectionEntry } from "astro:content";

export type SearchItem = {
  title: string;
  description: string;
  slug: string;
  pubDatetime: string;
  tags: string[];
};

const toSearchItems = (posts: CollectionEntry<"blog">[]): SearchItem[] =>
  posts.map(({ slug, data }) => ({
    title: data.title,
    description: data.description,
    slug,
    pubDatetime: data.pubDatetime.toISOString(),
    tags: data.tags,
  }));

export default toSearchItems;
```

`src/utils/getSearchStatusMessage.ts`:

```ts
export type SearchStatus = "loading" | "error" | "ready";

const getSearchStatusMessage = (status: SearchStatus, query: string) => {
  if (status === "loading") return "Loading posts…";
  if (status === "error")
    return "Couldn't load search. Try the search page at /search/.";
  const trimmed = query.trim();
  return trimmed ? `No posts found for "${trimmed}".` : "No posts yet.";
};

export default getSearchStatusMessage;
```

Run the two tests again. Expected: PASS (6 tests).

- [ ] **Step 3: Create the index endpoint `src/pages/search.json.ts`**

```ts
import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import getSortedPosts from "@utils/getSortedPosts";
import toSearchItems from "@utils/toSearchItems";

export const GET: APIRoute = async () => {
  const posts = getSortedPosts(await getCollection("blog"));
  return new Response(JSON.stringify(toSearchItems(posts)), {
    headers: { "Content-Type": "application/json" },
  });
};
```

- [ ] **Step 4: Create `src/components/SearchResultItem.tsx`**

```tsx
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
```

- [ ] **Step 5: Create `src/components/SearchPalette.tsx`**

```tsx
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
    if (/Mac|iPhone|iPad/.test(navigator.platform)) setShortcut("⌘K");
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
    <>
      <Button
        variant="outline"
        size="sm"
        className="min-h-11 gap-2 rounded-full text-muted-foreground"
        onClick={() => setOpen(true)}
        aria-label="Search posts"
      >
        <Search />
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden rounded border border-border bg-muted px-1.5 font-mono text-[0.65rem] sm:inline">
          {shortcut}
        </kbd>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="overflow-hidden p-0 sm:max-w-xl">
          <DialogTitle className="sr-only">Search posts</DialogTitle>
          <DialogDescription className="sr-only">
            Type to search post titles and descriptions.
          </DialogDescription>
          <Command
            shouldFilter={false}
            className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-input-wrapper]_svg]:size-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-3 [&_[cmdk-item]]:py-2.5"
          >
            <CommandInput
              placeholder="Search posts…"
              value={query}
              onValueChange={setQuery}
            />
            <CommandList>
              <CommandEmpty>
                {getSearchStatusMessage(status, query)}
              </CommandEmpty>
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
    </>
  );
}
```

- [ ] **Step 6: Put the palette in the header**

In `src/components/Header.astro`: add `import SearchPalette from "./SearchPalette";`, then replace the whole `<a href="/search/" …>…</a>` element inside `.nav-actions` with:

```astro
      <SearchPalette client:idle />
      <noscript>
        <a href="/search/" class="nav-link">Search</a>
      </noscript>
```

- [ ] **Step 7: Move the `/search` page to `SearchItem` and the shared result row**

In `src/components/Search.tsx`:

- Replace `import Card from "@components/Card";` and `import type { CollectionEntry } from "astro:content";` with:

```tsx
import SearchResultItem from "@components/SearchResultItem";
import type { SearchItem } from "@utils/toSearchItems";
```

- Delete the local `export type SearchItem = { … };` block.
- Replace the `<input className=…>` value with:

```tsx
className =
  "block min-h-12 w-full rounded-xl border border-input bg-card py-3 pl-12 pr-4 placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring/35";
```

- Replace the results `<ul className="mt-4">…</ul>` with:

```tsx
{
  searchResults && searchResults.length > 0 && (
    <ul className="post-list mt-4">
      {searchResults.map(({ item, refIndex }) => (
        <li key={`${refIndex}-${item.slug}`}>
          <a
            href={`/posts/${item.slug}/`}
            className="flex min-h-11 px-5 py-4 hover:bg-muted/60"
          >
            <SearchResultItem item={item} />
          </a>
        </li>
      ))}
    </ul>
  );
}
```

In `src/pages/search.astro`, replace the `searchList` construction with:

```astro
import toSearchItems from "@utils/toSearchItems";
…
const searchList = toSearchItems(sortedPosts);
```

- [ ] **Step 8: Delete the replaced components**

```bash
grep -rn "@components/Card\|from \"./Card\"\|@components/Datetime\|from \"./Datetime\"" src
```

Expected: no output. Then:

```bash
git rm src/components/Card.tsx src/components/Datetime.tsx
```

- [ ] **Step 9: Verify**

```bash
npm test
PUBLIC_SUPABASE_URL=https://example.supabase.co PUBLIC_SUPABASE_ANON_KEY=dummy npm run build
npm run lint
node -e 'const d=require("./dist/search.json");console.log(d.length, Object.keys(d[0]).join(","))'
```

Expected: tests PASS; build `✔ No issues`; prints `14 title,description,slug,pubDatetime,tags`. In `npm run preview`: ⌘K (or Ctrl+K) opens the palette with 5 recent posts; typing `flutter` lists Flutter posts; ↑/↓ moves the selection; Enter opens the post; Esc closes and focus returns to the trigger. Stop the preview server, delete `dist/search.json`, restart `npm run preview`, open the palette → message "Couldn't load search. Try the search page at /search/." `/search/?q=solid` lists SOLID posts as rows.

- [ ] **Step 10: Format and commit**

```bash
npx prettier --write --plugin=prettier-plugin-astro src/utils/toSearchItems.ts src/utils/toSearchItems.test.ts src/utils/getSearchStatusMessage.ts src/utils/getSearchStatusMessage.test.ts src/pages/search.json.ts src/components/SearchResultItem.tsx src/components/SearchPalette.tsx src/components/Search.tsx src/pages/search.astro src/components/Header.astro
git add src/utils/toSearchItems.ts src/utils/toSearchItems.test.ts src/utils/getSearchStatusMessage.ts src/utils/getSearchStatusMessage.test.ts src/pages/search.json.ts src/components/SearchResultItem.tsx src/components/SearchPalette.tsx src/components/Search.tsx src/pages/search.astro src/components/Header.astro
git commit -m "feat: add command palette search

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```

---

### Task 8: Visual and keyboard verification, spec sync

**Files:**

- Modify: `docs/superpowers/specs/2026-10-15-shadcn-coffee-redesign-design.md` (record the amendments)
- Fix-ups in any file from Tasks 1–7 found by this pass

**Interfaces:**

- Consumes: the whole site.
- Produces: screenshots in the scratchpad, a short verification report.

- [ ] **Step 1: Full checks**

```bash
npm test
PUBLIC_SUPABASE_URL=https://example.supabase.co PUBLIC_SUPABASE_ANON_KEY=dummy npm run build
npm run lint
grep -rnE 'skin-|--color-' src public || echo "no legacy tokens"
```

Expected: all pass; `no legacy tokens`.

- [ ] **Step 2: Screenshot matrix**

Start `npm run preview` (port 4321) in the background, then:

```bash
npx -y playwright@1.48.2 install chromium
OUT=<scratchpad>/screens; mkdir -p "$OUT"
for path in / /posts/ /tags/ /tags/flutter/ /posts/mastering-state-management-in-flutter-a-bloc-pattern-guide/ /search/?q=flutter /about/ /nope/; do
  name=$(echo "$path" | tr '/?=' '___')
  for vp in 390,844 1280,900; do
    npx -y playwright@1.48.2 screenshot --full-page --viewport-size=$vp --color-scheme=light "http://localhost:4321$path" "$OUT/${name}_${vp/,/x}_light.png"
    npx -y playwright@1.48.2 screenshot --full-page --viewport-size=$vp --color-scheme=dark "http://localhost:4321$path" "$OUT/${name}_${vp/,/x}_dark.png"
  done
done
```

Open each screenshot and compare against the approved mockups (`.superpowers/brainstorm/*/content/accent-color.html`, `home-layout.html` option B, `post-layout.html` option B). Check: no horizontal scroll at 390px; serif headings; amber accent only on links/buttons/pills; hairline lists; dark mode has no light-colored panels (code blocks included).

- [ ] **Step 3: Keyboard pass (manual, in the preview)**

Tab from page load: skip link → wordmark → nav links → search → theme toggle; all show a visible focus ring. ⌘K opens, Esc closes, arrows move, Enter navigates. On a post page Tab reaches the TOC links and they jump to the right heading under the sticky header (not hidden behind it).

- [ ] **Step 4: Record the spec amendments**

Append to the spec:

```markdown
## Amendments (2026-10-15, during planning)

- OG image templates are out of scope: their `GET` handlers are disabled, so
  OG images are not generated.
- Libertinus Serif loads from Google Fonts alongside Geist (matching the
  existing pattern) instead of being self-hosted.
- The copy-code button keeps its visible "Copy"/"Copied" label; no Tooltip
  (it is created by an inline DOM script, not React).
- Light `primary` is `#9a5f0e` and light `muted-foreground` is `#6b6b73` to
  pass WCAG AA; `ring` uses the primary color, with alpha at use sites.
- Vitest (`npm test`) covers the pure utilities and token contrast.
- `Separator` is not added; no React island needs one.
```

- [ ] **Step 5: Commit**

```bash
npx prettier --write docs/superpowers/specs/2026-10-15-shadcn-coffee-redesign-design.md
git add docs/superpowers/specs/2026-10-15-shadcn-coffee-redesign-design.md <any fix-up files>
git commit -m "docs: record redesign spec amendments

Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>"
```
