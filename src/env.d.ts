/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

// eslint-disable-next-line no-unused-vars -- global augmentation for public/toggle-theme.js
interface Window {
  // eslint-disable-next-line no-unused-vars
  __setTheme?: (theme: "light" | "dark") => void;
}
