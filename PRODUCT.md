# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Software developers who read in Vietnamese or English, served equally. Most arrive looking for an explanation of one specific concept or library (Flutter routing, BLoC, `Future.wait`, SOLID principles, Go PubSub, Rust ownership, SwiftUI bindings) and read one post closely. Secondary audiences: employers or clients judging Andrew as a mobile engineer, and people following his personal updates.

## Product Purpose

The personal blog of Andrew Do (Tung), a mobile engineer working with native Android, iOS, and Flutter. It does four jobs at once:

1. **Share knowledge:** clear tutorials and concept explanations that help other developers.
2. **Career / portfolio:** show what Andrew knows and how he thinks as an engineer.
3. **Personal journal:** record what he is learning and his goals (e.g. "ECO 2026 TARGET").
4. **Promote his plugins:** bring attention to his open-source packages.

Success: a developer finds the post they need, understands it, and comes away with a good impression of the author. A hiring reader can quickly see his focus and depth.

## Positioning

A working mobile engineer's notes written in both Vietnamese and English, so local and international developers can read the same material. The writing is honest about his learning path (the About page says he is still early and believes in small efforts adding up), not posing as an authority.

## Operating Context

- Readers arrive mostly from search or shared links to a single post, then may browse by tag, search, or the post archive.
- Posts are long-form technical writing with code blocks. Each post is in one language; the two languages are mixed across the archive.
- Discovery features on the site: featured posts, tag pages, client-side fuzzy search, RSS, pagination (10 per page), table of contents, share links, post views.
- Authoring: Markdown files in `src/content/blog/`, Astro 4 static build, deployed to GitHub Pages at https://tungdevpro.github.io.

## Capabilities and Constraints

- Static site with no server: no comments backend or accounts.
- Content is bilingual, and Vietnamese diacritics must render correctly everywhere: body, headings, OG images, search.
- Social links: GitHub, Facebook, LinkedIn, email (`src/config.ts`).
- Light and dark mode exist today (`lightAndDarkMode: true`). The user did not make this a binding commitment.
- Language: each post's body language is set by `lang` frontmatter (`en` / `vi`). Post lists show a small EN / VI marker on every card and row (decided 2026-11-04). Interface labels stay in English on purpose.
- Undecided: a language filter; where plugins are shown (there is no plugin listing or showcase on the site yet).

## Brand Commitments

- **Name:** "Andrew Do" is the public name of the site and author.
- **Voice:** casual, warm, self-deprecating developer voice: "Addicted to coffee and fixing bugs at 3AM". Keep this tone in UI copy around the posts.

## Evidence on Hand

- 14 published posts in `src/content/blog/`, Vietnamese and English.
- About page: `src/pages/about.md`.
- Self-introduction, role, and headline strings in `src/config.ts`.
- **Absent, do not fabricate:** a list of plugins or packages with names, links, or download stats; testimonials; employer names; project case studies; metrics. Ask Andrew before showing any of these.

## Product Principles

1. **The post is the product.** Reading comfort and code legibility come before decoration.
2. **Both languages are first-class.** Never treat Vietnamese content as secondary or let layout or type break on diacritics.
3. **Honest and personal.** Keep his real voice and learning-in-public stance; no inflated claims.
4. **Show the engineer.** A hiring reader should see his focus (mobile: Android, iOS, Flutter) and depth within seconds, without the site becoming a sales page.
