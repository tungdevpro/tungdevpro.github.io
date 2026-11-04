---
name: Andrew Do
description: A mobile engineer's bilingual notebook — warm paper, near-black ink, one roast-amber accent.
colors:
  stone-paper: "#f7f7f5"
  ink: "#18181b"
  card-white: "#ffffff"
  roast-amber: "#9a600e"
  on-amber: "#ffffff"
  milk-foam: "#f6ecdc"
  roast-amber-text: "#965c10"
  oat: "#f0f0ed"
  graphite: "#6a6a73"
  hairline: "#e8e8e6"
  error-red: "#d33c3c"
  espresso-black: "#0a0a0a"
  steam: "#ededed"
  night-card: "#141414"
  crema: "#e6aa4f"
  on-crema: "#1a1206"
  dark-roast-tint: "#2a1f10"
  crema-text: "#f0c27e"
  charcoal: "#1a1a1a"
  ash: "#a1a1aa"
  night-hairline: "#242424"
  night-error: "#f16565"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 6vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.035em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.5rem"
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: "-0.025em"
  title-sm:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.375
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: "2rem"
  body-ui:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
  label:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 400
    lineHeight: 1rem
    letterSpacing: "0.025em"
  code:
    fontFamily: "Geist Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
rounded:
  xs: "4px"
  sm: "8px"
  md: "10px"
  lg: "12px"
  full: "9999px"
spacing:
  gutter: "16px"
  gap: "12px"
  card: "20px"
  row-y: "16px"
  container: "1024px"
  measure: "36rem"
components:
  button-primary:
    backgroundColor: "{colors.roast-amber}"
    textColor: "{colors.on-amber}"
    rounded: "{rounded.md}"
    padding: "8px 16px"
    height: "36px"
  button-primary-cta:
    backgroundColor: "{colors.roast-amber}"
    textColor: "{colors.on-amber}"
    rounded: "{rounded.full}"
    padding: "0 20px"
    height: "44px"
  button-ghost:
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    size: "36px"
  button-ghost-hover:
    backgroundColor: "{colors.milk-foam}"
    textColor: "{colors.roast-amber-text}"
  tag:
    backgroundColor: "{colors.milk-foam}"
    textColor: "{colors.roast-amber-text}"
    rounded: "{rounded.full}"
    typography: "{typography.label}"
    padding: "2px 10px"
  featured-card:
    backgroundColor: "{colors.card-white}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "{spacing.card}"
  post-list:
    backgroundColor: "{colors.card-white}"
    rounded: "{rounded.lg}"
  post-row:
    textColor: "{colors.ink}"
    padding: "16px 20px"
  nav-link:
    textColor: "{colors.graphite}"
    rounded: "{rounded.full}"
    padding: "0 12px"
    height: "44px"
  nav-link-active:
    textColor: "{colors.ink}"
  code-block:
    backgroundColor: "{colors.card-white}"
    rounded: "{rounded.lg}"
    typography: "{typography.code}"
    padding: "44px 16px 16px"
  end-nav:
    backgroundColor: "{colors.card-white}"
    rounded: "{rounded.lg}"
  end-nav-link:
    textColor: "{colors.ink}"
    padding: "16px 20px"
  share-button:
    textColor: "{colors.graphite}"
    rounded: "{rounded.md}"
    size: "44px"
  search-trigger:
    backgroundColor: "{colors.stone-paper}"
    textColor: "{colors.graphite}"
    rounded: "{rounded.full}"
    padding: "0 12px"
    height: "44px"
  search-dialog:
    backgroundColor: "{colors.stone-paper}"
    rounded: "{rounded.lg}"
    width: "576px"
  search-item-selected:
    backgroundColor: "{colors.oat}"
    padding: "10px 12px"
  toc-link:
    textColor: "{colors.graphite}"
    padding: "6px 0 6px 15px"
  toc-link-active:
    textColor: "{colors.roast-amber}"
  footer:
    textColor: "{colors.graphite}"
    padding: "32px 16px"
---

# Design System: Andrew Do

## Overview

**Creative North Star: "The Coffee-Stained Logbook"**

This is an engineer's working logbook: plain pages of notes, written down as things get built, with one warm coffee mark as the only colour. The page is near-white stone paper with near-black ink. A single roast-amber accent marks what you can act on: links, the current hover target, list markers, the call to action. Everything else stays neutral, so the long technical posts and their code blocks get the reader's full attention.

The system is quiet and exact. Surfaces are flat and separated by hairline borders, not shadows. Hover states change colour, never position. One sans family, Geist, does all the writing; its mono sibling appears only where something is a measurement (dates, reading time, tag counts) or code. Dark mode is the same logbook at 3AM: espresso-black page, steam-white ink, and the amber turns into a lighter crema so it still glows against the dark.

Density is relaxed in the reading column (18px body on a 32px line, 36rem measure) and compact in lists and navigation, where rows are scanned rather than read.

**Key Characteristics:**
- One accent hue (amber, ~35°) across both themes; every other surface is neutral.
- Flat surfaces with 1px hairline borders; shadows are almost absent.
- Geist for everything; Geist Mono only for metadata and code.
- 12px corners on containers, full pills on small controls.
- Light and dark themes are designed as pairs, token for token.

## Colors

A warm-neutral paper-and-ink palette with exactly one coffee-coloured accent, re-tuned for each theme.

### Primary
- **Roast Amber** (light theme): links, primary buttons, list markers, focus rings, hover title colour, text selection background. Deep enough to pass contrast as text on stone paper.
- **Crema** (dark theme): the same roles in dark mode. Lighter and more saturated so it reads as a warm glow on espresso black; paired with **On-Crema** near-black text when it fills a button.
- **Milk Foam** / **Dark-Roast Tint**: the accent's pale (light) and deep (dark) tint, used as the fill for tag pills and ghost-button hover. Text on it is **Roast Amber Text** / **Crema Text**.

### Neutral
- **Stone Paper** / **Espresso Black**: the page background. Stone paper carries a faint warm-yellow cast (60° hue) so it never reads as clinical white.
- **Card White** / **Night Card**: one step above the page; used for the post list, featured cards, and code blocks.
- **Ink** / **Steam**: all primary text, headings, and body copy.
- **Graphite** / **Ash**: secondary text — descriptions, metadata, inactive nav links, figure captions.
- **Oat** / **Charcoal**: muted fills — inline code background, row hover tint, scrollbar thumb.
- **Hairline** / **Night Hairline**: every border and divider, including the h2 underline in posts.
- **Error Red** / **Night Error**: destructive states only. Currently unused in shipped UI.

### Named Rules
**The One Roast Rule.** Amber is the only hue in the system. No second accent, no blue links, no gradient. If something needs emphasis and isn't interactive, use weight or size, not colour.

**The Paired Token Rule.** Every colour exists as a light/dark pair under the same CSS variable (`--primary`, `--muted`, etc. in `src/styles/base.css`, stored as HSL channels). New colours are added as a pair or not at all.

## Typography

**Display Font:** Geist (with ui-sans-serif, system-ui)
**Body Font:** Geist (same family)
**Label/Mono Font:** Geist Mono (with ui-monospace)

**Character:** A single modern grotesk does all the work at different weights, so the page reads as one voice. Geist Mono marks anything that is data — when a post was written, how long it takes — like entries in a log.

### Hierarchy
- **Display** (600, 2.25rem → 3.75rem at ≥640px, line-height 1.1, -0.035em): the homepage headline only.
- **Headline** (600, 2.25rem → 3rem, line-height 1.1, -0.035em): post titles.
- **Title** (600, 1.5rem, tight tracking): section headings ("Featured", "Recent writing") and h2 inside posts, which also get a hairline underline and 48px of space above.
- **Title Small** (600, 1.25rem, snug): featured-card titles. Post-list row titles drop to 1rem / 500.
- **Body** (400, 1.125rem on a 2rem / 32px line, max 36rem ≈ 72–75 characters): post prose, wrapped with `text-wrap: pretty`. Interface copy outside posts uses 1rem / 1.75.
- **Label** (Geist Mono 400, 0.75rem, +0.025em, Graphite): dates, reading time, tag counts, and the EN / VI language marker (slightly darker, 70% Ink). No uppercase eyebrow labels above headings.
- **Code** (Geist Mono, 0.875em inline / 0.875rem blocks).

### Named Rules
**The Mono Means Measured Rule.** Geist Mono appears only for dates, durations, counts, and code. It is never used to make plain text look "technical".

**The Measure Rule.** Prose lines stay under 80 characters. Measure the column in rem, not `ch`: Geist's zero is wide, so 68ch came out at about 95 characters. Headings use `text-wrap: balance`.

**The Diacritics Rule.** All type must render Vietnamese diacritics cleanly; tight negative tracking (-0.035em) is reserved for 2.25rem and larger, where stacked accents still have room.

## Layout

One centred column, max 1024px wide with 16px side gutters, used by every page section and the header. Posts narrow the prose and the post footer further to a 36rem measure. At ≥1024px a post with a table of contents becomes a two-column grid: prose plus a 14rem sticky TOC rail with a 48px gap.

The homepage stacks: hero (56px top padding → 96px at ≥640px) with the headline, the intro and the coffee line at a 36rem measure, then a two-column featured grid (one column on mobile, 12px gap) of four hand-picked posts (`featured: true`), then a single bordered list of the newest other posts. Two breakpoints only: 640px (`sm`) and 1024px (`lg`).

Interactive targets are at least 44px tall throughout — nav links, the CTA, post rows, and tag pills (enlarged with an invisible hit area).

## Elevation & Depth

The system is flat. Depth comes from tone and hairlines: the page is stone paper, containers are one step lighter (card white), and every container has a 1px hairline border. In-page shadows are limited to the faint ones shadcn buttons ship with. The sticky header is the one translucent layer: page background at 75–90% opacity with a backdrop blur, so content scrolls under it. The search dialog is the one true overlay: it sits above an 80% black backdrop with a large soft shadow, because it interrupts the page on purpose.

### Shadow Vocabulary
- **Button lift** (`box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`): filled primary buttons only.
- **Control hairline** (`box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05)`): outline and secondary buttons, including the search trigger.
- **Overlay** (`box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)`): the search dialog only, over a `rgb(0 0 0 / 0.8)` backdrop.

### Named Rules
**The Ink-on-Paper Rule.** Surfaces in the page never float. Separate things with a hairline or a tone step, not a shadow. Hover changes colour (border to 50% amber, row to a muted tint), never elevation or position. Only a modal overlay, which sits above the page rather than in it, gets a real shadow.

## Shapes

Gently rounded and consistent. Containers — cards, the post list, code blocks, images in posts — use 12px corners. Buttons use 10px; small focus outlines 8px; inline code 4px. Small controls that sit in a row — tags, nav links, the hero CTA — are full pills. Borders are always 1px Hairline.

## Components

### Buttons
Quiet, filled once per view.
- **Shape:** 10px corners (gently rounded); the homepage CTA is a full pill at 44px height with 20px side padding.
- **Primary:** Roast Amber fill, white text, 14px/500, 36px tall. Hover drops to 90% opacity.
- **Ghost:** no fill; hover fills with Milk Foam and turns the text amber. Used for the icon buttons in the header (theme toggle, menu).
- **Focus:** 1px ring in the accent colour.

### Tags
- **Style:** full pill, Milk Foam fill, Roast Amber Text, `#` prefix, normal weight; optional mono count at 70% opacity.
- **State:** hover lightens the fill to 70%. A large variant (14px, 4px × 12px padding) is used on the tags index.

### Cards / Containers
- **Post meta line** (shared by featured cards, post rows, `/posts/` and tag pages): mono "date · N min read · EN|VI". The language marker is hidden from screen readers and replaced by "in English" / "in Vietnamese"; titles carry the post's `lang`.
- **Featured card:** 12px corners, Card White, 1px Hairline, 20px padding. The shared meta line, a 1.25rem balanced title, two-line clamped description. Hover: border shifts to 50% amber, title turns amber.
- **Post list:** a single Card White container with 12px corners and a Hairline border; rows divided by hairlines. Each row: mono date · reading time, 1rem/500 title, one-line description. Hover: muted row tint, amber title.
- **Code block:** Card White fill (not the page tone), 1px Hairline, 12px corners, 16px padding with a 44px top band: the language in mono Graphite on the left (omitted for untagged code), Copy on the right, so the button never covers code. In a post, code may run wider than the prose, up to 46rem, while keeping the prose's left edge. Long lines scroll sideways (never wrap, so indentation stays intact); a 48px right-edge fade appears only while more code is out of view. Each block is a named, focusable region ("Dart code") with a matching "Copy dart code" button. Geist Mono 14px. Copying is announced to screen readers; on failure the code is selected and the button says "Press Ctrl+C". Syntax colours come from Shiki with a separate dark theme.

### Navigation
- **Header:** sticky, translucent and blurred, hairline bottom border, 64px tall. Lowercase wordmark ("andrew do", 15px/600) on the left; nav links, search palette, theme toggle on the right.
- **Nav links:** 14px Graphite, pill-shaped hit area 44px tall; hover and the active page switch to Ink. No underline or fill for the active state.
- **Mobile:** below 640px the links collapse behind a ghost icon button and stack vertically under the header row.

### Search palette
A keyboard-first command palette (⌘K / Ctrl K) that searches post titles and descriptions.
- **Trigger:** an outline pill in the header, 44px tall, Graphite text with a search icon. At ≥640px it shows the word "Search" and a small mono key hint (`⌘K`) in an Oat box with a Hairline border and 4px corners; on mobile it is icon-only.
- **Dialog:** 576px wide, Stone Paper, 1px Hairline, 12px corners at ≥640px (full width with square corners on mobile), Overlay shadow. Opens and closes with a 200ms fade plus a slight zoom (95% → 100%).
- **Input:** 48px tall, no border of its own; a Hairline underline separates it from results. Placeholder "Search posts…" in Graphite.
- **Results:** a mono group label ("Recent posts" before typing, "Results" after two characters). Each item has a medium-weight Ink title, truncated to one line, plus a mono date and tag pills. The keyboard-selected item gets an Oat fill; there is no amber here, so the palette stays calm.
- **Empty / loading / error:** one centred line of 14px text from `getSearchStatusMessage`.

### Table of contents
Shown on posts that have headings.
- **Sidebar (≥1024px):** a sticky rail 96px from the top, with a Hairline left border. "On this page" is a mono uppercase label. Links are 14px Graphite and turn Ink on hover. h3 entries are indented 12px.
- **Active section:** the link turns Roast Amber and medium weight, and a 2px amber bar replaces the hairline beside it. This is the only place a coloured left bar is used, and it marks position, not decoration.
- **Inline (<1024px):** a collapsible `details` box in Card White with a Hairline border and 12px corners. Every row is 44px tall.

### Footer
- A full-width Hairline top border, then the 1024px container with 32px vertical padding.
- Left: the copyright in Graphite 14px. (The coffee line lives in the homepage hero.)
- Right: social links as 44px ghost icon buttons; icons are 20px Ink and turn Roast Amber on hover.
- On mobile everything stacks and centres.

### Post ending
The last screen of a post belongs to the author and the next read, in this order:
- **Author line:** "Written by Andrew Do, usually over coffee at 3AM. More about me", in the author's voice; only "More about me" is a link (to About).
- **Next read:** a mono label ("Part 2 of 4 · SOLID principles" for a series, otherwise "Keep reading") over a post-list-style container with up to two cells: previous on the left, next on the right (stacked on mobile). Series come from `series: { name, part }` frontmatter; other posts link to the older and newer post by publish date.
- **Utility row:** a mono "Share" label, a "Copy link" ghost button, Facebook and LinkedIn as 44px ghost icon buttons (Graphite, amber on hover, no movement), and "Back to top" at the right edge. Back to top also moves keyboard focus to the main content.
- Tags appear once, under the title, not again at the end.

### Post prose
- Links: amber text with a 40%-amber underline offset by 4px; underline goes full amber on hover. Focus outlines are the full ring colour (2px, offset 4px), never translucent.
- Section links (`#`) after each heading appear on hover for mouse users. They are hidden from assistive tech and the tab order, so headings keep clean accessible names; keyboard users navigate by the table of contents.
- The post body carries `lang` from frontmatter (`en` or `vi`); interface labels stay in English on purpose.
- Blockquotes: amber left border at 50% opacity, text at 80% opacity.
- List markers are amber. Images get 12px corners, a hairline border, and 32px vertical margin.

## Do's and Don'ts

### Do:
- **Do** use the CSS variables in `src/styles/base.css` through Tailwind tokens (`bg-card`, `text-primary`, `border-border`); never hard-code a hex.
- **Do** define every new colour as a light/dark pair.
- **Do** separate surfaces with a 1px Hairline border and a tone step.
- **Do** keep prose at a 36rem measure and 18px on a 32px line.
- **Do** keep interactive targets at least 44px tall.
- **Do** keep Geist Mono for dates, durations, counts, and code only.

### Don't:
- **Don't** introduce a second accent hue or gradients; amber is the only colour.
- **Don't** add shadows to cards or lift elements on hover; hover changes colour only. The Overlay shadow is for modal dialogs alone.
- **Don't** use any typeface other than Geist and Geist Mono.
- **Don't** apply tight negative tracking to text smaller than 2.25rem.
