# Interaction checklist

The twenty interaction requirements from the brief, with the file that implements each one and how it was checked. Everything listed passes `pnpm typecheck`, `pnpm lint` and `pnpm build`.

| # | Requirement | Where | Notes |
| --- | --- | --- | --- |
| 1 | Per-route skeletons | `app/(site)/loading.tsx`, `app/(site)/{mission,vision,programs,get-involved,contact}/loading.tsx` | Each skeleton mirrors the page's real rhythm; `main` keeps `aria-busy` through the route transition. |
| 2 | `useOptimistic` for shortlist and newsletter | `components/shortlist-provider.tsx`, `components/newsletter-form.tsx` | The UI changes on click, then reconciles with the server action. Verified add → cookie `sef_shortlist` → undo. |
| 3 | ⌘K command palette | `components/command-menu.tsx`, `content/command.ts` | cmdk, fuzzy search, grouped results, `/` shortcut too. Verified open, filter (“vision”) and Enter navigation. |
| 4 | Keyboard hints hidden on touch | `app/globals.css` → `.kbd` | Shown only under `@media (hover: hover) and (pointer: fine)`, and suppressed below `md` in the header. |
| 5 | Undo toasts | `components/shortlist-button.tsx` (Sonner) | “Added to shortlist.” with an Undo action that restores the previous set. Verified in the browser. |
| 6 | SWR/ISR | `export const revalidate = 3600` on all six pages | Static HTML with hourly revalidation; no client data fetching. |
| 7 | Prefetch on intent | `components/site-header.tsx`, footer, hero and CTA links (`prefetch`) | Route chunks are fetched on hover/focus of navigation links. |
| 8 | Blur placeholders | `lib/blur.ts`, `components/arch-media.tsx`, `campus-image.tsx` | Base64 `blurDataURL` per photograph, `next/image` with AVIF/WebP and explicit `sizes`. |
| 9 | View transitions | `components/view-transition.tsx`, `next.config.mjs` (`viewTransition: true`) | Shared `page-title` name and `program-*` names morph between pages; no-op where unsupported. |
| 10 | vaul swipe sheets | `components/mobile-nav.tsx`, `components/command-menu.tsx` | Drag-to-dismiss menu sheet and a mobile palette drawer, with `Drawer.Title` for screen readers. |
| 11 | Interruptible animation | `components/paper-motion.tsx` | Route tweens are killed and the GSAP context reverted per path; the paper veil has a timeout so it can never trap a backgrounded tab. |
| 12 | Predictive back + focus restore | `lib/hooks.ts` → `useOverlayHistory`, `useFocusRestore` | Overlays push a history entry and close on back; focus returns to the trigger on dismissal. |
| 13 | 44px hit slop | `app/globals.css` → `.tap` | A pseudo-element expands every small control to at least 44×44px without changing layout. |
| 14 | Safe-area insets | `.site-header`, `.safe-bottom`, `.footer-safe`, mobile sheet | `env(safe-area-inset-*)` on the sticky header, footer and bottom sheet. |
| 15 | Six-digit OTP autofill stub | `components/forms/student-form.tsx`, `lib/verification.ts`, `lib/actions.ts` | `autoComplete="one-time-code"`, hashed codes, 10-minute expiry, five attempts, 60-second cooldown. |
| 16 | Tabular numerals | `app/globals.css` → `.tnum`, `.stat-value` | `font-variant-numeric: tabular-nums lining-nums` for stats, counters, years and program numbers. |
| 17 | Balanced headlines | `app/globals.css` → `h1–h6`, `.display-1/2/3` | `text-wrap: balance`; body copy uses `text-wrap: pretty`. |
| 18 | Squircle corners | `app/globals.css` → `@supports (corner-shape: squircle)` | Progressive enhancement only; browsers without support keep the border radius. |
| 19 | Idempotency keys | `lib/idempotency.ts`, `lib/actions.ts`, `lib/hooks.ts` | 24-hour in-memory claim per form; duplicate submits return the previous result instead of creating two enquiries. |
| 20 | Safe triangle | `lib/safe-triangle.ts`, `components/programs-dropdown.tsx` | Pointer path through the gap between trigger and panel keeps the Programs menu open. |

## Paper system (the design pattern)

The paper language is applied on every page, not just the home page.

- **Grain** — one fixed noise layer over every surface (`body::before`, `app/globals.css`).
- **Torn chapter edges** — `components/paper-tear.tsx`, used at the real chapter boundaries on all six pages.
- **Stacked sheets** — `.paper-stack` on forms, the shortlist summary and the newsletter panel; `.card` and `.panel` each carry a single offset backing sheet. Every band below the first gets a soft top-edge shadow (`main > section::before`).
- **Cut-out photography** — every arch and framed photo sits on a white mat with a hairline and a soft shadow, plus a second clay sheet rotated behind it (`components/arch-media.tsx`, `.paper-backdrop`, `.arch-frame`, `.photo-frame`). One corner is folded back (`components/peel-corner.tsx`, `.peel-frame`): the picture is cut along the fold, a shadow falls inside the cut, and the flap opens from 34px to 64px on hover. It is CSS-only, decorative (`aria-hidden`) and has a `none` variant for flat frames.
- **Pinned notes** — quote cards use `.paper-note`, a strip of translucent gold masking tape across the top edge.
- **Wavy hero** — the home hero's photograph is a large circular disc cut with a generated wave polygon, ringed by a wavy white mat and an offset clay sheet; the note shares the same cut language (`components/wave-media.tsx`), and its two rules are wavy cuts (`components/wave-rule.tsx`). Waves are the hero's only decorative shape.
- **Wide shell** — `.shell` caps at `104rem`, with fluid gutters; the home hero headline is held to `12ch` so it keeps its five-line rhythm at the new width.
- **Cut labels** — `.chip` is a squared paper tag with its own backing edge; `.field-input` is a paper form field with an inset rule; icon buttons are paper discs.
- **Motion** — GSAP route veil made of two torn sheets (top paper sheet over a darker under-sheet offset 18px) and ScrollTrigger section reveals (`components/paper-motion.tsx`); fully disabled under `prefers-reduced-motion`.

## Manual checks performed

- `pnpm typecheck`, `pnpm lint`, `pnpm build` — clean; 13 static routes, 1h revalidate.
- Headless Chrome at 1440, 1024, 768, 390 and 320 CSS px: no horizontal overflow; CTA above the fold at 1440 and on mobile.
- Dark mode (`prefers-color-scheme: dark`) on every page; reduced motion leaves all content visible.
- Shortlist add → toast → undo → cookie cleared; command palette filter and Enter navigation; Programs dropdown hover and keyboard focus; the two-sheet route veil covers then lifts in ~1s.
- Peel corners checked at rest and under forced `:hover` (34px → 64px) at 1440 and 390; the cut and shadow stay aligned in dark mode, and the fold is visible without JavaScript.
- Forms: labels, hints, `aria-live` errors, no input cleared on failure; server-side Zod validation.
