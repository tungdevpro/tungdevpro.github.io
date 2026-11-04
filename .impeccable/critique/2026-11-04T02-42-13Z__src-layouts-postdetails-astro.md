---
target: post detail page
total_score: 28
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
target_identity: "file:/Users/dgt_macmini/workspace/others/tungdevpro.github.io/src/layouts/PostDetails.astro"
target_fingerprint: "sha256:c4ead553c95f47dd76d2cb60ed5e08f5c2475e2f5361e9f2c1d5495fa5144092"
target_path: /Users/dgt_macmini/workspace/others/tungdevpro.github.io/src/layouts/PostDetails.astro
timestamp: 2026-11-04T02-42-13Z
slug: src-layouts-postdetails-astro
---
Method: dual-agent (A: design review sub-agent · B: detector sub-agent)

Target: post detail page (src/layouts/PostDetails.astro), Read mode. Pages: Future.wait (EN), BLoC (EN), auto_route (VI), SOLID SRP (VI, series) at 1440/390, light and dark.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Long code lines cut off with no scroll hint; mobile shows no current section |
| 2 | Match System / Real World | 3 | Breadcrumb shows raw tag slugs ("solid-srp") |
| 3 | User Control and Freedom | 3 | Mobile TOC unreachable once reading |
| 4 | Consistency and Standards | 3 | SRP post has a second h1 in its body; header button styles differ |
| 5 | Error Prevention | 3 | Little to get wrong; copy failure selects the code |
| 6 | Recognition Rather Than Recall | 2 | No language marker on posts or next-read cards; no code language label |
| 7 | Flexibility and Efficiency | 3 | ⌘K, section links, copy buttons |
| 8 | Aesthetic and Minimalist Design | 3 | Empty 48px band on every code block; flat ending |
| 9 | Error Recovery | 3 | Copy errors are clear and announced |
| 10 | Help and Documentation | 2 | No summary under the title |
| **Total** | | **28/40** | **Good** |

## Design Specificity Verdict
LLM: careful and calm, still template-like; bilingual nature and Dart-heavy code not reflected in the UI; UI copy lacks the casual voice PRODUCT.md asks for.
Detector: source scan clean (0); rendered scans 6/8 clean; 2 findings = skipped-heading on SRP post (content: in-body `#` h1 then `###`). Geist/Geist Mono overused-font suppressed by project config.

## Priority Issues
1. [P1] Section link aria-label inside each heading pollutes heading names ("X Link to section: X") — regression from last pass. Fix: aria-hidden + tabindex=-1 on the link, or move it outside the heading. Command: harden
2. [P1] Code blocks clip long lines (base.css:152 white-space: pre) with no scroll hint and stay at 36rem despite free space. Fix: wider code at ≥1024px, edge fade, language label + Copy in the top band. Command: layout
3. [P2] Mobile outline lost after the top; no current-section cue. Fix: sticky section bar opening the TOC. Command: adapt
4. [P2] Language invisible where readers choose; date-neighbour next reads cross languages. Fix: EN/VI tag on cards and meta; prefer same-language, same-tag neighbour. Command: clarify
5. [P3] Ending is 8 equal-weight choices; author line cold. Fix: make next read primary; warmer sign-off; Back to top on the share row on mobile. Command: distill

## Persona Red Flags
Sam: polluted heading names; double h1 + h1→h3 on SRP post; code blocks are unnamed tab stops; every copy button named just "Copy"; dead toggle-theme.js aria-label code.
Casey: clipped code needs sideways swipes; TOC unreachable mid-post; Back to top alone on its own line; tag pills ~20px with narrow horizontal hit area.
Linh: no on-page summary; no TOC on auto_route post (one h2); SRP in-body h1 competes with the title.

## Minor Observations
langTag "en-EN" not a real locale; zero-padded dates; breadcrumb repeats first tag as a slug; title wider than prose without a TOC; one-line code blocks mostly padding; many hairline rules on short posts; PostViews loads React + Supabase client even without env vars; detector measures Geist Mono at 74% of text on code-heavy posts.

## Questions to Consider
- Why does code stop at 36rem when code is what readers came to copy?
- Is a date neighbour ever the right next read for a search visitor?
- Where on the page does the reader feel Andrew, other than his own "<3"?
