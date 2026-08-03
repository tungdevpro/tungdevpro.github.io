# All Posts Arrow Visibility Design

## Problem

The arrow in the home-page **All Posts** button is not visible in its default
state. The button uses an inverted foreground and background, while the global
SVG rule gives the arrow the normal page foreground color. That arrow color
matches the button background, so the icon appears only after its hover styling
changes.

## Design

Keep the existing button structure and scope the correction to its arrow. The
arrow will use the same inverted foreground color as the button label so it has
clear contrast in both light and dark themes. It will remain visible while the
button is hovered.

Add a short transform transition to the arrow and move it slightly to the right
when the button is hovered. This preserves contrast while providing directional
feedback. Mark the decorative arrow as hidden from assistive technology because
the **All Posts** label already describes the link.

## Scope

Only `src/pages/index.astro` will change. Shared SVG and `LinkButton` styles will
remain untouched so pagination, navigation, social links, and other icons retain
their current behavior.

## Verification

- Add a focused regression check that asserts the home-page button arrow has an
  explicit high-contrast default fill and a hover transform.
- Run that check before and after the change to demonstrate the regression and
  fix.
- Run `npm run lint`, `npm run format:check`, and `npm run build`.
- Inspect the rendered button in default and hover states in both light and dark
  themes when browser tooling is available.
