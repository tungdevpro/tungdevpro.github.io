# Blog UI Refactor Design

## Goal

Refactor the Astro blog UI into a more polished, content-first developer blog while preserving the current information architecture, static rendering model, and AstroPaper patterns.

## Design Direction

Use a restrained neutral interface with one consistent blue accent, clearer content hierarchy, readable long-form typography, and subtle motion. The visual system should feel like a technical writing site rather than a marketing page.

## Scope

- Refine global theme tokens and base typography.
- Improve header layout, active navigation, mobile menu behavior, and touch targets.
- Make homepage sections clearer without adding new content requirements.
- Turn post list items into accessible card-like rows with consistent spacing and hover/focus states.
- Improve article page readability, metadata layout, progress bar, code copy button, and back/top controls.
- Improve search input and result presentation.

## Constraints

- Do not add new dependencies.
- Keep existing routes, content schema, and config shape.
- Preserve existing social links, post data, tags, view transitions, and Supabase-backed post views.
- Keep the refactor scoped to shared layout/UI files and directly affected pages.
- Use accessible focus states, 44px minimum touch targets, and readable mobile layouts.

## Verification

Run `npm run format:check`, `npm run build`, and `npm run lint`. If formatting fails due changed files, run `npm run format` and repeat verification.
