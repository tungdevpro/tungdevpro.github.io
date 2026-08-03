# Geist Typography Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Google Sans with Geist for site text and Geist Mono for code and monospace content.

**Architecture:** Keep the current Google Fonts delivery mechanism and change only its requested families. Update Tailwind's central sans and mono mappings so existing global and component utilities adopt the new typography without component-level edits.

**Tech Stack:** Astro 4, Tailwind CSS 3, Google Fonts, Node.js assertions against rendered output

## Global Constraints

- Load Geist and Geist Mono from Google Fonts at weights 400, 500, and 700 with `display=swap`.
- Preserve system sans-serif and monospace fallbacks.
- Modify only `src/layouts/Layout.astro` and `tailwind.config.cjs` in production code.
- Add no local font assets or package dependencies.
- Preserve the current development server workflow.

---

### Task 1: Replace the site typography mappings

**Files:**

- Modify: `src/layouts/Layout.astro:87-92`
- Modify: `tailwind.config.cjs:61-64`

**Interfaces:**

- Consumes: the existing Google Fonts `<link>` elements and Tailwind `fontFamily` configuration
- Produces: rendered CSS that maps sans text to Geist and monospace text to Geist Mono

- [x] **Step 1: Run the rendered regression assertion and verify it fails**

With `npm run dev -- --host 127.0.0.1` running, execute:

```bash
node --input-type=module -e 'import assert from "node:assert/strict"; const html = await fetch("http://127.0.0.1:4321/").then(response => response.text()); assert.match(html, /family=Geist:wght@400;500;700&family=Geist\+Mono:wght@400;500;700&display=swap/); assert.match(html, /font-family:\s*Geist,\s*ui-sans-serif,\s*system-ui,\s*sans-serif/); assert.match(html, /font-family:\s*Geist Mono,\s*ui-monospace,\s*monospace/); assert.doesNotMatch(html, /Google\+Sans|font-family:\s*Google Sans/);'
```

Expected: FAIL because the rendered font link and CSS still reference Google Sans.

- [x] **Step 2: Update the Google Fonts request**

Replace the font stylesheet URL in `src/layouts/Layout.astro` with:

```astro
<link
  href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;700&family=Geist+Mono:wght@400;500;700&display=swap"
  rel="stylesheet"
/>
```

- [x] **Step 3: Update the Tailwind font stacks**

Replace the `fontFamily` mappings in `tailwind.config.cjs` with:

```js
fontFamily: {
  sans: ["Geist", "ui-sans-serif", "system-ui", "sans-serif"],
  mono: ["Geist Mono", "ui-monospace", "monospace"],
},
```

- [x] **Step 4: Re-run the rendered regression assertion**

Run the Step 1 assertion again.

Expected: command exits successfully with status 0.

- [x] **Step 5: Run repository verification**

```bash
npm run lint
npx prettier --check src/layouts/Layout.astro tailwind.config.cjs docs/superpowers/plans/2026-08-03-geist-typography.md --plugin=prettier-plugin-astro
npm run build
```

Expected: all commands exit successfully. Existing build hints about unused OG route imports may remain, but no new errors may be introduced.

- [x] **Step 6: Commit the implementation**

```bash
git add src/layouts/Layout.astro tailwind.config.cjs docs/superpowers/plans/2026-08-03-geist-typography.md
git commit -m "style: replace Google Sans with Geist"
```
