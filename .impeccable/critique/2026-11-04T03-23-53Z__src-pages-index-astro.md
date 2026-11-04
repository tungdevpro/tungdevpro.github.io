---
target: homepage
total_score: 26
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 3
target_identity: "file:/Users/dgt_macmini/workspace/others/tungdevpro.github.io/src/pages/index.astro"
target_fingerprint: "sha256:771c20fdbae606362bb41db8f97fb9e77488875208fc7326e83e8e71e7ea4d1b"
target_path: /Users/dgt_macmini/workspace/others/tungdevpro.github.io/src/pages/index.astro
timestamp: 2026-11-04T03-23-53Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design review sub-agent · B: detector sub-agent)

Target: homepage (src/pages/index.astro). Mode: Persuade-through-writing (hiring reader leads; returning readers second). Checked at 1440/390, light and dark.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Featured cards undated; freshness unclear |
| 2 | Match System / Real World | 2 | "Featured" = newest 4 (all 14 posts featured: true) |
| 3 | User Control and Freedom | 3 | Skip link, ⌘K, plain links |
| 4 | Consistency and Standards | 3 | Cards show tag+time, rows show date+time |
| 5 | Error Prevention | 2 | No language marker; 9 of 14 posts are Vietnamese |
| 6 | Recognition Rather Than Recall | 2 | Empty descriptions: rows are titles only |
| 7 | Flexibility and Efficiency | 3 | ⌘K, tags, RSS; no topic entry points |
| 8 | Aesthetic and Minimalist Design | 3 | Calm but uniform; sections same weight |
| 9 | Error Recovery | 3 | Search palette states fine |
| 10 | Help and Documentation | 2 | No orientation on topics or languages |
| **Total** | | **26/40** | **Acceptable** |

## Design Specificity Verdict
LLM: well-made but interchangeable: stock hero + Featured grid + Recent list; h1 doesn't name Andrew; warmest line is in the footer behind "(fact):".
Detector: source clean; home 390 clean; home 1280: hero-eyebrow-chip (p.role, index.astro:21), line-length ~90 chars (.intro max-w-[62ch], index.astro:83), unbalanced-heading on hero h1 and a featured title. /posts/ clean. Geist ignores applied.

## Priority Issues
1. [P1] Featured makes no choice (all 14 flagged) and shows the weakest posts (ECO 2026 TARGET, "Onwership" Rust). Fix: feature 3-4 mobile-depth posts; date the cards. Command: distill
2. [P1] "Recent writing" starts in Aug 2024 because Featured takes the 4 newest; blog looks abandoned. Fix: Recent = truly latest; or rename/restructure. Command: layout
3. [P1] Empty descriptions leave cards and rows unexplained. Fix: author writes one-liners (content). Command: clarify
4. [P2] Hero is generic: no name in h1, CV-voice intro, eyebrow label (detector + craft-floor ban), intro ~90 chars/line, unbalanced h1, GitHub only in footer. Fix: name + voice in hero, drop eyebrow, 36rem intro, balance, GitHub link. Command: typeset
5. [P2] Post language unlabelled in a bilingual archive. Fix: EN/VI marker on cards and rows (needs author decision). Command: clarify

## Persona Red Flags
Jordan: can't tell cards apart without descriptions; clicks into Vietnamese unexpectedly; Featured vs Recent unclear.
Casey: four full-width featured cards push Recent ~1100px down; nav hidden behind hamburger; socials only at the bottom.
Minh: sees a goals note and a misspelled Rust post as selected work; newest visible date Aug 2024; no GitHub above the fold.

## Minor Observations
SITE.desc ("I often gossip and write around about things…") is the meta/OG description; ogImage is still astropaper-og.jpg; Featured has no "All →" link; cards and rows use different meta; About page has its own typos.

## Questions to Consider
- With 14 posts, does Featured + Recent earn its keep, or would one list grouped by platform show focus better?
- Why is the hero the most corporate copy and the footer the most human?
- Should the homepage say plainly that most writing is Vietnamese, as a strength?
