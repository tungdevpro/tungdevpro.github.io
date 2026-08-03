# All Posts Arrow Visibility Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Keep the home-page All Posts arrow visible at rest and animate it slightly to the right on hover.

**Architecture:** Preserve the shared `LinkButton` and global SVG rules. Add an explicit class and accessibility attribute to the home-page arrow, then scope its contrasting fill and transform transition to `src/pages/index.astro`.

**Tech Stack:** Astro 4, TypeScript, Tailwind CSS, Node.js assertions against rendered output

## Global Constraints

- Only `src/pages/index.astro` production code changes.
- The arrow remains visible in default and hover states in light and dark themes.
- The arrow moves slightly to the right on hover.
- Shared SVG and `LinkButton` behavior remains unchanged.
- The decorative arrow is hidden from assistive technology.

---

### Task 1: Correct and animate the All Posts arrow

**Files:**

- Modify: `src/pages/index.astro:94-98`
- Modify: `src/pages/index.astro:150-152`

**Interfaces:**

- Consumes: the existing `LinkButton` group hover state and Tailwind skin color tokens
- Produces: an `all-posts-arrow` SVG whose default fill is inverted and whose hover state translates right

- [x] **Step 1: Start Astro and run the rendered regression assertion**

Run:

```bash
npm run dev -- --host 127.0.0.1
node --input-type=module -e 'import assert from "node:assert/strict"; const html = await fetch("http://127.0.0.1:4321/").then(response => response.text()); const style = html.match(/<style[^>]*src\/pages\/index\.astro[^>]*>([\s\S]*?)<\/style>/)?.[1] ?? ""; assert.match(html, /<svg[^>]*class="all-posts-arrow[^>]*aria-hidden="true"/); assert.match(style, /\.all-posts-arrow[^}]*fill:rgb\(var\(--color-fill\)\)[^}]*transition-property:transform[^}]*transition-duration:200ms/); assert.match(style, /--tw-translate-x:\s*0\.25rem/); assert.ok((style.match(/fill:rgb\(var\(--color-fill\)\)/g) ?? []).length >= 2);'
```

Expected before implementation: FAIL because the rendered SVG does not have the `all-posts-arrow` class and the compiled component CSS does not contain its contrast and hover rules.

- [x] **Step 2: Add the semantic marker and minimal scoped styles**

Change the arrow markup to:

```astro
<svg
  xmlns="http://www.w3.org/2000/svg"
  class="all-posts-arrow"
  aria-hidden="true"
>
  <path
    d="m11.293 17.293 1.414 1.414L19.414 12l-6.707-6.707-1.414 1.414L15.586 11H6v2h9.586z"
  ></path>
</svg>
```

Add this scoped rule next to `.all-posts-btn`:

```css
.all-posts-arrow {
  fill: rgb(var(--color-fill));
  @apply transition-transform duration-200;
}
.all-posts-btn:hover .all-posts-arrow {
  fill: rgb(var(--color-fill));
  @apply translate-x-1;
}
```

- [x] **Step 3: Re-run the rendered regression assertion and verify it passes**

Run the Step 1 command again.

Expected: command exits successfully with status 0.

- [x] **Step 4: Run repository verification**

Run:

```bash
npm run lint
npm run format:check
npm run build
```

Expected: all commands exit successfully. If Prettier reports only the edited files, run `npx prettier --write src/pages/index.astro docs/superpowers/plans/2026-08-03-all-posts-arrow-visibility.md`, then repeat the checks.

- [x] **Step 5: Commit the implementation**

```bash
git add src/pages/index.astro docs/superpowers/plans/2026-08-03-all-posts-arrow-visibility.md
git commit -m "fix: show all posts arrow before hover"
```
