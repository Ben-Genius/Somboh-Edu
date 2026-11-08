# SEF Ghana — website

A production-ready marketing site for the **Somboh Educational Foundation (SEF Ghana)**: twelve routes — seven pages and five program pages — three involvement forms, a contact form, and a newsletter sign-up.

Built with Next.js 15 (App Router), React 19, TypeScript in strict mode, and Tailwind CSS v4. Pages are statically generated and revalidated hourly, so the site runs without a database.

---

## Contents

- [Getting started](#getting-started)
- [Environment variables](#environment-variables)
- [Forms and email](#forms-and-email)
- [Editing content](#editing-content)
- [Design system](#design-system)
- [Motion and transitions](#motion-and-transitions)
- [Photography](#photography)
- [Accessibility](#accessibility)
- [Performance and SEO](#performance-and-seo)
- [Deployment](#deployment)
- [Project structure](#project-structure)
- [Credits](#credits)

---

## Getting started

Requires Node 20 or newer and pnpm 9+.

```bash
pnpm install
pnpm dev            # http://localhost:3000
```

Other scripts:

```bash
pnpm build          # production build (must pass with zero errors)
pnpm start          # serve the production build
pnpm typecheck      # tsc --noEmit
pnpm lint           # eslint .
```

The first `pnpm build` also fetches the Google fonts through `next/font`; the fonts are then self-hosted from the build output.

## Environment variables

Copy `.env.example` to `.env.local`. All three variables are optional for local work: without them the forms fall back to a development stub and the site uses a placeholder canonical URL.

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin, used for metadata, sitemap, robots and JSON-LD. Set this in production. |
| `RESEND_API_KEY` | Resend API key for contact and form notifications. |
| `CONTACT_TO_EMAIL` | Inbox that receives every submission. |

Nothing else is required. There is no database, no CMS, and no third-party client script.

## Forms and email

The four forms (student interest, partner, donor, contact) and the newsletter all submit through React Server Actions in `lib/actions.ts`. Each is validated on the server with Zod (`lib/schemas.ts`) and protected by a 24-hour idempotency key held in memory (`lib/idempotency.ts`), so a double submit cannot create two enquiries.

- **Email delivery** uses the Resend REST API directly (`lib/email.ts`). When `RESEND_API_KEY` or `CONTACT_TO_EMAIL` is missing, submissions are accepted and logged instead of being emailed, and the response says so — no form pretends to have sent mail.
- **Newsletter** subscriptions go to the same inbox until a list provider is configured. The placeholder lives in `lib/site-config.ts` (`newsletterProvider`).
- **Email verification** for the student form is a self-contained stub: `requestEmailCode` hashes a six-digit code, stores it for ten minutes with a five-attempt limit and a sixty-second cooldown, and `verifyEmailCode` checks it (`lib/verification.ts`). In development the code is returned in the action result so the flow can be tested without email; in production the code must be delivered by the email provider. In-memory state resets when the server restarts; for a multi-instance deployment swap the maps in `lib/idempotency.ts` and `lib/verification.ts` for Upstash Redis (same interfaces).

No submission is written to disk.

## Editing content

All copy lives in typed objects under `content/`, not in JSX:

| File | Page |
| --- | --- |
| `content/home.ts` | Home |
| `content/mission.ts` | Mission |
| `content/vision.ts` | Vision |
| `content/programs.ts` | The five programs and their detail pages |
| `content/faq.ts` | The FAQ page and its structured data |
| `content/involve.ts` | Get involved |
| `content/contact.ts` | Contact |
| `content/site.ts` | Navigation and footer |
| `content/sources.ts` | Statistics sources |
| `content/ui.ts` | Form labels and interface strings |

**Every unverified organisational detail is a placeholder in `lib/site-config.ts`** — email, phone, address, registration number, social links, payment link, newsletter provider, partner logos, photography, and counts. They are written as `[Add …]` and rendered as visibly muted text. Fill them in, then delete the matching line in `TODO.md` and the placeholder note on the contact page. Do not add facts, testimonials, or numbers that the foundation has not supplied.

## Design system

- **Ground:** warm paper `#FAF7F0`, white surfaces, clay `#EFE7D6`, forest `#0F3D2E`, gold `#C8962E`, ink `#17201B`.
- **Type:** Archivo (display and numbers) + Inter (body), both self-hosted through `next/font`. Headlines use `text-wrap: balance`; figures use tabular numerals.
- **Material:** one fine paper-grain layer sits above every section. Cards and panels carry a second sheet peeking out at the bottom-right, photographs sit on a white mat with a slightly askew clay sheet behind them, quote cards are pinned with a strip of masking tape, and chips and inputs read as small cut labels rather than UI chrome. Torn edges (`components/paper-tear.tsx`) separate chapter-like section changes. Every framed and arch photograph also carries one folded paper corner (`components/peel-corner.tsx`): the picture is cut along the diagonal fold, a corner-aligned shadow falls inside the cut, and the folded-back triangle rests over it, opening from 34px to 64px on hover. It is pure CSS, so it reads without JavaScript. The arch remains the recurring “door” motif for photography outside the home hero.
- **Hero shape language:** the home hero is cut from wavy paper only. The photograph is a large hand-cut circular disc (`components/wave-media.tsx`), ringed by a wavy white mat and an offset clay sheet; the “who we serve” note uses the same wavy edge language; the two hairline rules above and below the hero copy are wavy cuts (`components/wave-rule.tsx`). No arch or hard-edged rectangle remains in the hero.
- **Width:** the page shell is capped at `104rem` (`app/globals.css` → `.shell`), with `clamp(1.25rem, 3.8vw, 3.5rem)` gutters, so the layout fills a 1440px screen and keeps expanding on wider displays.
- **Dark mode** follows `prefers-color-scheme`; all token pairs meet WCAG 2.2 AA contrast in both schemes.

Tokens and utilities are in `app/globals.css`. Components use the `.card`, `.panel`, `.btn`, `.chip`, `.eyebrow`, `.display-*` utilities rather than ad-hoc values.

## Motion and transitions

Motion is handled by **GSAP 3** in `components/paper-motion.tsx`:

- On every route change two stacked paper sheets lift out of the viewport, torn edge first: a warm top sheet over a darker under-sheet offset by 18px, so the rip reads as layered paper rather than a rectangle sliding away. The new page settles beneath it.
- Each section's inner column rises and fades in once as it enters the viewport (`ScrollTrigger`), giving a page-to-section rhythm without hijacking scroll.
- `prefers-reduced-motion: reduce` disables all of it. Without JavaScript the page is fully visible, because GSAP only hides content after mount.
- Shared-element page-title and program-title transitions use the View Transitions API (`components/view-transition.tsx`), with a no-op fallback in unsupported browsers.
- Hover states, the safe-triangle programs menu, the ⌘K palette, sheets and toasts remain CSS- or library-driven; GSAP is not used for anything that CSS can do reliably.

## Photography

The photographs in `public/images/` are **temporary stand-ins**, not SEF program photography. Each caption names the photographer, the licence, and says plainly that the image is not an SEF program image. Replace them with the foundation's own photographs and written permission, update the captions in the pages that use them, then remove the photography line from `TODO.md`.

| File | Subject | Credit |
| --- | --- | --- |
| `students-portrait.jpg` | Students at KNUST, Kumasi | Enyonam Caroline, CC BY 4.0 |
| `classroom-ghana.jpg` | Classroom session, Kumasi | Asamoah Daniel Kwame Oware, CC0 |
| `school-courtyard.jpg` | Secondary school courtyard, Ghana | Hakamal, CC0 |
| `community-planting.jpg` | Students planting trees | Otuo-Akyampong Boakye, CC BY-SA 4.0 |
| `balme-library.jpg` | Balme Library, University of Ghana | Cca Raheem, CC BY 4.0 |
| `knust-great-hall.jpg` | Great Hall, KNUST | Pnlarbi, CC BY 4.0 |
| `founder-slot.jpg` | Abstract portrait placeholder | Generated for this build |

Blur placeholders are generated in `lib/blur.ts`; add a key there when you add an image.

## Accessibility

- Skip link, one `<h1>` per page, ordered headings, landmark regions and visible breadcrumb JSON-LD.
- 2px focus rings on every interactive element; 44×44px minimum targets (`.tap`), safe-area insets on the header, footer and mobile sheet.
- Forms use real labels, `aria-describedby` hints and errors, `aria-live` status regions, and never clear a user's input on failure.
- Keyboard support for the command palette, programs dropdown (safe triangle), tabs (arrow/Home/End), and mobile sheet (Escape, focus restore).
- Layout holds at 320px and at 200% zoom; motion, transforms and smooth scrolling respect reduced-motion.

## Performance and SEO

- Static generation with `revalidate = 3600` on every page (ISR), no client-side data fetching.
- Server Components by default; client code is limited to the header, palette, forms, tabs, shortlist and motion.
- `next/image` with AVIF/WebP, explicit sizes, blur placeholders, and priority only on the home hero.
- Per-page metadata with 150–158 character descriptions, canonical URLs, Open Graph and Twitter cards, a generated OG image, `sitemap.xml`, `robots.txt`, and Organization, Breadcrumb, FAQPage and Course JSON-LD.

## Deployment

The site deploys to Vercel with no extra configuration:

1. Import the repository and set `NEXT_PUBLIC_SITE_URL`, `RESEND_API_KEY`, and `CONTACT_TO_EMAIL`.
2. Build with `pnpm build`; output is fully static plus hourly ISR.
3. Point the domain at the deployment and update `NEXT_PUBLIC_SITE_URL` to the final origin so canonical URLs and the sitemap are correct.

Any Node host that supports `next start` works too. The in-memory idempotency and OTP stores assume a single instance; use Redis before scaling horizontally.

## Project structure

```
app/
  (site)/            seven pages plus five /programs/[slug] pages, layout, loading and error states
  layout.tsx         fonts, metadata, viewport, organization JSON-LD
  globals.css        tokens, paper material, components, dark mode
  icon.svg, opengraph-image.tsx, robots.ts, sitemap.ts
components/          header, footer, palette, tabs, forms, motion, paper tear, wave cuts
content/             all copy as typed objects
lib/                 actions, schemas, email, verification, metadata, blur
public/images/       temporary photography
TODO.md              every placeholder that must be filled before launch
```

## Credits

- Visual direction explored with the DesignFarm reference library (Awwwards, Land-book and Creative Vaani captures) for layout rhythm, capsule navigation, and the paper material grammar.
- Type: [Archivo](https://fonts.google.com/specimen/Archivo) and [Inter](https://fonts.google.com/specimen/Inter), SIL Open Font License.
- Photography: Wikimedia Commons contributors listed above, under the licences shown.
