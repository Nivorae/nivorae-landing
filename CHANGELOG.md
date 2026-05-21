# Changelog

## 0.2.8

- Changed `Zeabur` two-service deploy configuration and dropped `Prisma` migrations

## 0.2.7

- Fixed `LINE` field label to use display name in `PrivacyPage` and contact form

## 0.2.6

- Fixed `PrivacyPage` hosting reference from `Vercel` to `Zeabur`

## 0.2.5

- Added partnership program section to `PlansPage` with zero-cost collaboration offer
- Fixed landing copy across all pages to align with content audit

## 0.2.4

- Added hamburger drawer to header for tablet and mobile
- Added landing pages overhaul with RWD layout and `typo.webp` wordmark branding
- Added fluid typography tokens, CSS animation keyframes, and `PageHero` component
- Fixed footer switching to 2-col at tablet, 4-col at desktop
- Fixed contact form fields stacking on mobile below `sm` breakpoint
- Fixed process step tabs using 2-col grid on small screens
- Fixed `AppShowcase` scale and marquee deferred to `lg` breakpoint
- Fixed laptop mockup hidden at tablet, portfolio layout switched to `md:flex-row`
- Fixed nav drawer closing on ESC key and lang switch
- Changed logo assets added to `public/logo/` and favicon updated
- Changed lockfile to remove `sharp` dependency

## 0.2.3

- Added 404 not found and privacy policy pages
- Added `i18n` support to all example sections
- Improved landing copy centralization into `JSON` and extracted `iconMap`

## 0.2.2

- Added redesigned landing process section with interactive step flow
- Changed `playwright-mcp` ignored and `ExHero` position tracking simplified
- Added image-backed cards to specialty carousel
- Added interactive QA page with infinite scroll and card deck

## 0.2.1

- Fixed `TeamPage` OKLCH rendering, dark mode circles, and schema cleanup
- Improved color tokens by migrating from RGB to OKLCH
- Changed CI action SHA pins, `axios` upgrade, ReDoS patch, and `sortBy` enum constraint

## 0.2.0

- Added plans page with pricing tiers and portfolio sections
- Added team photo cards to portfolio
- Added landing page content sections below hero
- Added testimonials section with snap-scroll layout
- Added real member photos in team cards
- Fixed `useEffect` replacing broken IIFE in `ExHero` animation loop
- Updated `README` with planning skills and review workflow
- Added commit hygiene check and `apply-review` command
- Changed CI job to grant `contents: write` permission for auto-fix push
- Changed header logo shrunk and page title updated
- Changed `git-commit` tooling to enforce one-line rule
- Changed testimonials section removed

## 0.1.2

- Added redesigned landing page with video background and static 3D card display
- Added `Team` page with member cards and specialty carousel
- Added landing page with 3D panoramic `marquee` and bilingual hero section
- Changed favicon and header logo to custom icon
- Changed LF line endings across all packages

## 0.1.1

- Changed `/git:branch`, `/git:commit`, `/git:changelog` skills and `changelog-validator` hook for stricter conventions
- Updated `README.md` to document the `feature/* → develop → main` workflow

## 0.1.0

- Initial landing page release baseline
