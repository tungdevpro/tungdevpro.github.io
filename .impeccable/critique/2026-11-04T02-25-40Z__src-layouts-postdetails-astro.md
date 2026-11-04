---
target: post detail page
total_score: 25
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
target_identity: "file:/Users/dgt_macmini/workspace/others/tungdevpro.github.io/src/layouts/PostDetails.astro"
target_fingerprint: "sha256:5ce0eab561b8eb9a415475c8f5d87ded1c358fa42fdd50155609ca7b6afdaf7a"
target_path: /Users/dgt_macmini/workspace/others/tungdevpro.github.io/src/layouts/PostDetails.astro
timestamp: 2026-11-04T02-25-40Z
slug: src-layouts-postdetails-astro
closed: true
---
Method: dual-agent (A: design review sub-agent · B: detector sub-agent)

Target: post detail page (src/layouts/PostDetails.astro), Read mode. Pages checked: Future.wait (EN), BLoC guide (EN), auto_route (VI) at 1440px and 390px.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 2 | View counter shows "… views" forever when its request fails (PostViews.tsx:26); "Copied" not announced |
| 2 | Match System / Real World | 3 | English dates and labels on Vietnamese posts |
| 3 | User Control and Freedom | 3 | No previous/next post; back-to-top doesn't move keyboard focus |
| 4 | Consistency and Standards | 2 | Share icons rotate on hover (ShareLinks.astro:66) against DESIGN.md; italic label; tags shown twice |
| 5 | Error Prevention | 3 | Empty description paragraph and meta description on all 14 posts |
| 6 | Recognition Rather Than Recall | 3 | Mobile TOC box gives no sign it expands (summary display:flex) |
| 7 | Flexibility and Efficiency | 3 | ⌘K and copy buttons are good; heading anchors are hover-only |
| 8 | Aesthetic and Minimalist Design | 3 | Clean reading column; cluttered end of post |
| 9 | Error Recovery | 1 | Failed view request looks like endless loading |
| 10 | Help and Documentation | 2 | No author or post context (series part, versions) |
| **Total** | | **25/40** | **Acceptable** |

## Design Specificity Verdict
LLM: competent and calm, but the structure is the AstroPaper starter with new tokens. The logbook idea, bilingual nature and author presence don't show inside a post.
Detector: source scan 1 finding + 3 advisories; rendered scans 1–5 findings per page (overused-font, line-length, skipped-heading, straggler). No contrast or layout findings. overused-font on Geist is a false positive (documented brand font).

## Priority Issues
1. [P1] Posts end in a dead end: no next/previous, no series link, no author line. The auto_route post promises "phần sau…" with no link to the existing follow-up. Fix: author card + one primary next step; optional series/part frontmatter. Command: shape
2. [P1] Vietnamese posts are marked lang="en" (Layout.astro:38) and all chrome is English. Fix: lang frontmatter field → html/article lang; localise date format and the ~6 chrome strings. Command: harden
3. [P2] Prose line length ~90–100 characters on desktop (detector) because 68ch in Geist runs wide; DESIGN.md also says line-height 2.0 but CSS renders ~1.78. Fix: measure ~62ch or 40rem, align doc and CSS. Command: typeset
4. [P2] View counter never resolves on failure. Fix: render nothing until a number arrives; hide on error/timeout; client:visible. Command: harden
5. [P2] End-of-post clutter: duplicate tags, 6 share networks incl. Pinterest, rotate hover, ~36px targets. Fix: copy link + 2 networks, 44px ghost buttons, drop the bottom tag list. Command: distill

## Persona Red Flags
Sam: lang mismatch; 40%-opacity focus outline; "Copied" not announced; hover-only heading anchors; back-to-top keeps focus at bottom; TOC active state has no aria-current; h1→h3 skip on auto_route post (detector agrees); "… views" read aloud.
Casey: Copy button overlaps first line of short code blocks at 390px; TOC box shows no expand cue; share targets ~36px; no scroll hint on wide code.
Linh: empty meta description → poor search snippet; English chrome; no TOC on auto_route post; promised next part not linked; percent-encoded anchor links.

## Minor Observations
Empty description <p> renders on every post; redundant role="article"; smooth scroll ignores reduced motion; breadcrumb shows only the first tag; footer shows raw "(fact):" prefix; "Posts" nav not marked current on post pages; Geist Mono is 71–78% of visible text on English posts (code-heavy — check it's code, not chrome); off-ramp font sizes 0.95rem/0.7rem/0.65rem; content typos in headings (Onwership, mangement, Mở bát).

## Questions to Consider
- Why does a post's last screen belong to six social networks instead of Andrew's next post, About page, or plugins?
- Should a Vietnamese post's chrome be Vietnamese, or English on purpose? Today it's an accident.
- Is a view counter worth a React island and a Supabase dependency? What would a logbook show instead: "part 1 of 2", the Flutter version used?
