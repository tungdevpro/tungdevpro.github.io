# Geist Typography Design

## Goal

Replace Google Sans across the site with the font families used by the
referenced blog: Geist for primary text and Geist Mono for code and monospace
content.

## Design

Keep the existing Google Fonts delivery approach. Update the font stylesheet in
`src/layouts/Layout.astro` to request Geist and Geist Mono at weights 400, 500,
and 700 with `display=swap`. These weights cover the site's current normal,
medium, and bold typography without downloading unused variants.

Update the Tailwind font mappings in `tailwind.config.cjs`:

- `font-sans`: `Geist`, followed by `ui-sans-serif`, `system-ui`, and
  `sans-serif` fallbacks.
- `font-mono`: `Geist Mono`, followed by `ui-monospace` and `monospace`
  fallbacks.

No component-level font classes or global layout rules need to change because
the body already uses `font-sans`, and code-oriented content can consume the
existing `font-mono` mapping.

## Scope

Only `src/layouts/Layout.astro` and `tailwind.config.cjs` will contain production
changes. Font files will not be added to the repository, and no package
dependency will be introduced.

## Verification

- Demonstrate that rendered output initially loads Google Sans rather than
  Geist.
- Verify the rendered font link requests both Geist families and the generated
  CSS uses Geist for the sans and mono mappings.
- Run `npm run lint`, focused Prettier checks for changed files, and
  `npm run build`.
- Preserve the existing development server workflow and system-font fallbacks.
