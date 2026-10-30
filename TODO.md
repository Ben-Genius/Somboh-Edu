# TODO — before launch

Everything below is a placeholder or an unverified detail. Each item points at where it is set. Nothing in this list should be invented; ask the foundation.

## Organisation details (`lib/site-config.ts`)

- [ ] Contact email — `contact.email` (currently `[Add email]`)
- [ ] Phone number — `contact.phone` (currently `[Add phone]`)
- [ ] WhatsApp number — `contact.whatsapp` (currently `[Add WhatsApp number]`)
- [ ] Street address — `contact.addressLine` (currently `[Add street address]`)
- [ ] City — `contact.city` (currently `[Add city]`)
- [ ] Region — `contact.region` (currently `[Add region]`)
- [ ] Instagram URL — `social.instagram` (currently `[Add Instagram URL]`)
- [ ] LinkedIn URL — `social.linkedin` (currently `[Add LinkedIn URL]`)
- [ ] X URL — `social.x` (currently `[Add X URL]`)
- [ ] Registration number — `registrationNumber` (currently `[Add registration number]`)
- [ ] Donation / payment link — `paymentLink` (currently `[Add payment link]`)
- [ ] Newsletter provider — `newsletterProvider` (currently `[Add newsletter provider]`)
- [ ] Partner logos and written permission — `partnerLogos` (currently `[Add partner logos and written permissions]`)
- [ ] Photography licence / own photography — `photography` (currently `[Add photography]`)
- [ ] Students served — `unverifiedCounts.studentsServed` (currently `[Add student count]`)
- [ ] Scholarships secured — `unverifiedCounts.scholarshipsSecured` (currently `[Add scholarship total]`)

After filling these in, remove the placeholder note at `content/contact.ts` → `channels.placeholderNote` (“These details are placeholders…”), and delete the matching lines above.

## Content and assets

- [ ] Replace the temporary photography in `public/images/` with the foundation's own images and written permission. Update every caption that says “Placeholder photograph”, and remove the photography item above. Credit table is in `README.md`.
- [ ] Replace the generated abstract founder portrait (`founder-slot.jpg`) with a real photograph and update `homePage.founder.imageAlt` / `imageCaption` in `content/home.ts`.
- [ ] Add a partner/university list only when permission is confirmed. Do not add logos or names before then.
- [ ] Have the founder's note, mission statement and vision text re-checked against the current source PDFs (`SEF_Ghana_Founders_Mission.pdf`, `SEF_Ghana_Vision.pdf`).
- [ ] Confirm the statistics and their source links in `content/sources.ts` are current, and that the footnote wording matches.
- [ ] Decide whether to keep the temporary “not SEF program photography” wording once real photographs are in place.

## Forms and email

- [ ] Set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and `NEXT_PUBLIC_SITE_URL` in the hosting environment (see `.env.example`).
- [ ] Verify the sending domain in Resend and update the from-address in `lib/email.ts` if it is not the shared test sender.
- [ ] Connect the newsletter to a real list provider (Buttondown, Mailchimp, Resend Audiences) and record the choice in `site-config.ts`.
- [ ] Replace the in-memory idempotency and OTP stores (`lib/idempotency.ts`, `lib/verification.ts`) with Redis (Upstash) before running more than one server instance.
- [ ] Wire a real email delivery step for the six-digit OTP; today it is returned only in development (`lib/actions.ts`).
- [ ] Confirm the donor flow: the form records intent, it does not take payment. Either add a payment provider or make the “payment link” copy explicit.
- [ ] Add spam protection appropriate to the host (rate limiting at the edge or a Turnstile-style check) if the forms attract abuse.

## Legal and metadata

- [ ] Add a privacy notice covering form submissions, email addresses and newsletter consent, and link it from the footer.
- [ ] Confirm the organisation name, abbreviation and legal form used in metadata and JSON-LD.
- [ ] Set the production domain and re-check `robots.txt`, `sitemap.xml`, canonical URLs and the OG image.
- [ ] Confirm dark mode is acceptable for launch; it currently follows the operating system setting.

## Quality gate

- [ ] `pnpm typecheck`, `pnpm lint`, `pnpm build` pass with no errors.
- [ ] Check at 320px, 360px, 768px, 1024px and 1440px, at 200% zoom, with keyboard only, and with reduced motion enabled.
- [ ] Run Lighthouse (accessibility, SEO, best practices) on the production build and fix anything below 95.
- [ ] Test every form once against the production email configuration.
