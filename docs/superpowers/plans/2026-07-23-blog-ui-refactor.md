# Blog UI Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Polish the Astro blog layout and UI into a clearer, more professional content-first developer blog.

**Architecture:** Keep the existing AstroPaper file structure and route model. Centralize visual changes in global CSS and shared components, then apply route-level layout polish where the page structure needs stronger hierarchy.

**Tech Stack:** Astro 4, TypeScript, React islands, Tailwind CSS, `@tailwindcss/typography`.

## Global Constraints

- Do not add dependencies.
- Preserve existing routes and content schema.
- Keep UI accessible with visible focus states and 44px minimum touch targets for interactive controls.
- Use existing verification commands: `npm run format:check`, `npm run build`, and `npm run lint`.

---

### Task 1: Global Theme And Layout Tokens

**Files:**

- Modify: `src/styles/base.css`
- Modify: `src/layouts/Layout.astro`
- Modify: `src/layouts/Main.astro`

**Interfaces:**

- Consumes: existing Tailwind skin tokens.
- Produces: consistent global surfaces, typography, focus states, and page shell spacing.

- [ ] Update CSS variables for a neutral palette with one blue accent.
- [ ] Improve base body, links, prose, code, table, and scrollbar styling.
- [ ] Update viewport metadata to `width=device-width, initial-scale=1`.
- [ ] Give `Main.astro` stronger page heading and description rhythm.

### Task 2: Shared Navigation And Controls

**Files:**

- Modify: `src/components/Header.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/components/LinkButton.astro`
- Modify: `src/components/Tag.astro`
- Modify: `src/components/Hr.astro`

**Interfaces:**

- Consumes: existing `SITE`, `SOCIALS`, and component props.
- Produces: stable navigation, touch-friendly controls, consistent links, and lighter dividers.

- [ ] Refactor header spacing, logo, mobile menu, active nav, search, and theme controls.
- [ ] Keep existing menu JavaScript and logo typing behavior, but make it more resilient for Astro swaps.
- [ ] Normalize link button, tag, footer, and divider styling.

### Task 3: Content Surfaces

**Files:**

- Modify: `src/pages/index.astro`
- Modify: `src/components/Card.tsx`
- Modify: `src/components/Search.tsx`
- Modify: `src/layouts/PostDetails.astro`
- Modify: `src/components/Datetime.tsx`

**Interfaces:**

- Consumes: existing blog frontmatter and route slugs.
- Produces: polished homepage, post list cards, search results, article header, metadata, and controls.

- [ ] Refactor homepage hero and post sections.
- [ ] Turn post cards into full-width clickable article rows.
- [ ] Improve search input semantics and result count copy.
- [ ] Improve article layout, meta row wrapping, progress bar, copy button, and heading links.

### Task 4: Verification

**Files:**

- No source files expected unless formatters update touched files.

**Interfaces:**

- Consumes: completed UI edits.
- Produces: verified build and lint status.

- [ ] Run `npm run format:check`.
- [ ] If formatting fails, run `npm run format`.
- [ ] Run `npm run build`.
- [ ] Run `npm run lint`.
- [ ] Review `git diff --check` for whitespace problems.
