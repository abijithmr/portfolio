# Design System — Abijith Rajeevan Portfolio

Inspired by 21st.dev (dense registry of cards, tight geometric sans, developer-tool feel), Apple's macOS / iOS materials (frosted glass floating over solid content, capsule buttons, confident tight type), and the solid-color, content-first portfolios in emmabostian/developer-portfolios. The result is the client's own: a developer portfolio built from flat solid color blocks, with glass reserved for floating chrome.

## Product context
- Single-page personal portfolio for Abijith Rajeevan, Software Engineer, final-year B.Tech CSE student at Sahrdaya College of Engineering and Technology (Autonomous), KTU, Kodakara, Kerala. Graduating 2027.
- Audience: recruiters, hiring managers, engineers skimming quickly on desktop and phone.
- Jobs to be done: understand who he is in 5 seconds; see real work (live GitHub repos); see the stack; contact him (email, resume, GitHub, LinkedIn).
- Sections in order: floating nav, hero, projects (live from GitHub API, sortable by stars / recent), tech stack, contact + footer.
- Real data: avatar from https://github.com/abijithmr.png. Repos include PROJECT-CERP-y (Python, 2 stars, "Computer automation for disabled people"), portfolio, ubport_bangkk, Surface-Sync-Miniproject (Python).

## Color: SOLID schemes only (no gradients, no glows, no aurora, no blobs)
Reference: content-first portfolios from github.com/emmabostian/developer-portfolios (brittanychiang.com's single solid navy field; paco.fyi's bento of solid-colored tiles). Every surface is a flat solid fill. Hierarchy comes from solid color blocks, type and spacing, never from gradients or light effects. Two palettes are being explored; each draft uses exactly ONE.

### Palette A: Navy and amber (dark)
| Token | Hex | Use |
|---|---|---|
| navy | #0E1A2B | page background |
| navy-raised | #15253A | tiles / cards (solid) |
| navy-line | #22344D | 1px borders, dividers |
| text | #E6EDF5 | primary text |
| muted | #8BA0B8 | secondary text |
| amber | #F2B33D | the one accent: primary button fill (navy text), links, active states, one solid accent tile |

### Palette B: Paper and cobalt (light)
| Token | Hex | Use |
|---|---|---|
| canvas | #E9ECEF | page background (cool light gray) |
| tile | #FFFFFF | cards / tiles (solid) |
| ink | #121417 | primary text, solid dark tile, primary button fill |
| slate | #5B6470 | secondary text |
| line | #D5DAE0 | 1px borders |
| cobalt | #1F45D3 | accent: one solid feature tile (white text), links, focus |
| sun | #FFC93C | small secondary accent: status dot, one small tile, highlights; never text |

Rules: no gradients of any kind (text, background or border). No blurred blobs, glows or colored shadows. Accents are solid blocks.

## Typography
- Family: **Geist** (sans) for everything; **Geist Mono** only for genuinely code-like strings (e.g. `github.com/abijithmr`, repo language/stat rows).
- Weights: 500 for display and UI, 400 for body.
- Scale: display 72–96px / lh 1.0 / ls -0.04em; h2 44px / lh 1.1 / ls -0.03em; body 17px / lh 1.55; small 14–15px.
- Sentence case everywhere. No all-caps eyebrows. No single-word colored or italic accents.

## Glass material (Apple-inspired, used sparingly)
Glass only appears where it floats OVER solid colored content, as on iOS/macOS: the sticky nav capsule, the segmented control, and small floating badges over solid tiles or the photo. Cards and tiles are solid, not glass.
- Glass recipe: translucent fill of the page color at ~70% (dark: rgba(14,26,43,0.7); light: rgba(255,255,255,0.7)), `backdrop-filter: saturate(1.8) blur(20px)`, 1px border in the line color, top inner highlight `inset 0 1px 0 rgba(255,255,255,0.12)`.
- Shadows: subtle and neutral only, e.g. `0 1px 2px rgba(0,0,0,0.12)`. No colored glow shadows.
- Radii: tiles 20px, inner media 14px, controls/pills 9999px.

## Components
- Nav: floating centered glass capsule (not full-bleed), 48px tall, brand "Abijith.dev" left, links Projects / Stack / Contact, white capsule "Resume" button right.
- Primary button: solid white capsule, near-black text, 44px. Secondary: glass capsule, white text, 44px. Accent button (one per view max): electric blue capsule.
- Project card: glass, 20px radius, name (500, 18px), description (muted), topics chips, mono stat row (language dot, stars, forks, updated), whole card clickable.
- Stack: bento grid of glass tiles; chips are small glass capsules.
- Segmented control: iOS-style glass capsule with a sliding white thumb.

## Layout
- 1152px max container, 24px gutters (16px on mobile), 120–140px section padding desktop, 80px mobile.
- Left-aligned content; hero may be centered.
- Mobile-first, fully responsive; no horizontal scroll.

## Motion
- One orchestrated hero load sequence (blur-to-sharp rise, staggered).
- Hovers: color 150ms cubic-bezier(0.4,0,0.2,1); transforms 300ms cubic-bezier(0.23,1,0.32,1).
- Sort change: cards glide to new positions (layout animation).
- Respect prefers-reduced-motion.
